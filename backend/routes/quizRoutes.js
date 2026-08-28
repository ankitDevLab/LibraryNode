const express = require("express");
const mongoose = require("mongoose");
const Student = require("../models/Student");
const QuizHistory = require("../models/QuizHistory");

const router = express.Router();

const ALLOWED_EXAMS = ["ssc", "banking", "upsc", "jee", "neet"];
const ALLOWED_LEVELS = ["low", "medium", "high"];
const MAX_QUESTIONS = 50;

/**
 * Build the prompt for the AI model to generate exam questions.
 */
function buildPrompt(exam, domain, numQuestions, level) {
  const examLabels = {
    ssc: "SSC (Staff Selection Commission — CGL, CHSL, MTS, GD)",
    banking: "Banking",
    upsc: "UPSC Civil Services Prelims (General Studies)",
    jee: "JEE (Joint Entrance Examination — Mains & Advanced, Physics/Chemistry/Maths)",
    neet: "NEET (National Eligibility cum Entrance Test — Physics/Chemistry/Biology)",
  };

  let examContext = examLabels[exam] || exam.toUpperCase();

  if (exam === "banking" && domain) {
    examContext += ` — specifically for the "${domain}" post category`;
  }

  const levelDescriptions = {
    low: "easy, foundational-level",
    medium: "moderate, standard exam-level",
    high: "difficult, advanced exam-level",
  };

  const levelDesc = levelDescriptions[level] || "moderate";

  return `You are an expert Indian competitive exam question generator.

Generate exactly ${numQuestions} multiple-choice questions for: ${examContext}

Difficulty: ${levelDesc}

RULES:
1. Each question must have exactly 4 options.
2. The "answer" field must be the 0-based index (0, 1, 2, or 3) of the correct option.
3. The "explanation" field must briefly explain WHY the correct answer is right.
4. Questions should be diverse across relevant subjects/topics for this exam.
5. Questions must be factually accurate and exam-appropriate.
6. Return ONLY a valid JSON array — no markdown, no code fences, no extra text.

Return this exact JSON structure (an array of ${numQuestions} objects):
[
  {
    "question": "Question text here?",
    "options": ["Option A", "Option B", "Option C", "Option D"],
    "answer": 0,
    "explanation": "Explanation of why Option A is correct."
  }
]

IMPORTANT: Output ONLY the JSON array. No other text before or after it.`;
}

/**
 * Parse and validate the AI response into a clean questions array.
 */
function parseAndValidateQuestions(rawText, expectedCount) {
  // Strip markdown code fences if the model wrapped the JSON
  let cleaned = rawText.trim();
  cleaned = cleaned.replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/i, "");
  cleaned = cleaned.trim();

  let questions;
  try {
    questions = JSON.parse(cleaned);
  } catch (e) {
    throw new Error("AI response was not valid JSON. Please try again.");
  }

  if (!Array.isArray(questions)) {
    throw new Error("AI response was not a JSON array. Please try again.");
  }

  if (questions.length !== expectedCount) {
    // Accept if we got at least some questions (AI sometimes generates fewer)
    if (questions.length === 0) {
      throw new Error("AI generated zero questions. Please try again.");
    }
    // Truncate if too many
    if (questions.length > expectedCount) {
      questions = questions.slice(0, expectedCount);
    }
  }

  // Validate each question object
  for (let i = 0; i < questions.length; i++) {
    const q = questions[i];

    if (!q.question || typeof q.question !== "string" || q.question.trim() === "") {
      throw new Error(`Question ${i + 1} has an empty or missing question text.`);
    }

    if (!Array.isArray(q.options) || q.options.length !== 4) {
      throw new Error(`Question ${i + 1} must have exactly 4 options.`);
    }

    for (let j = 0; j < 4; j++) {
      if (!q.options[j] || typeof q.options[j] !== "string" || q.options[j].trim() === "") {
        throw new Error(`Question ${i + 1}, option ${j + 1} is empty.`);
      }
    }

    const answerIdx = Number(q.answer);
    if (isNaN(answerIdx) || answerIdx < 0 || answerIdx > 3 || !Number.isInteger(answerIdx)) {
      throw new Error(`Question ${i + 1} has an invalid answer index (must be 0-3).`);
    }
    q.answer = answerIdx;

    if (!q.explanation || typeof q.explanation !== "string" || q.explanation.trim() === "") {
      q.explanation = "No explanation provided.";
    }
  }

  return questions;
}

/**
 * POST /api/quiz/generate
 * Generate AI-powered exam questions via OpenRouter.
 */
router.post("/generate", async (req, res) => {
  try {
    const { exam, domain, numQuestions, level, studentId } = req.body;

    // --- Validate inputs ---
    if (!exam || !ALLOWED_EXAMS.includes(exam.toLowerCase())) {
      return res.status(400).json({
        success: false,
        message: `Invalid exam. Allowed: ${ALLOWED_EXAMS.join(", ")}`,
      });
    }

    if (!studentId || !mongoose.Types.ObjectId.isValid(studentId)) {
      return res.status(400).json({
        success: false,
        message: "Valid studentId is required.",
      });
    }

    // Verify student exists
    const student = await Student.findById(studentId).select("_id");
    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found.",
      });
    }

    const questionCount = Math.min(Math.max(Number(numQuestions) || 25, 1), MAX_QUESTIONS);
    const difficulty = ALLOWED_LEVELS.includes(level?.toLowerCase()) ? level.toLowerCase() : "medium";

    // --- Check API key ---
    const apiKey = process.env.OPENROUTER_API_KEY;
    if (!apiKey) {
      return res.status(500).json({
        success: false,
        message: "OpenRouter API key not configured on server.",
      });
    }

    const model = process.env.OPENROUTER_MODEL || "openrouter/free";
    const clientUrl = process.env.CLIENT_URL || "http://localhost:5173";

    // --- Build prompt and call OpenRouter ---
    const prompt = buildPrompt(exam.toLowerCase(), domain, questionCount, difficulty);

    console.log(`\n📝 [QUIZ GENERATE] Generating ${questionCount} ${difficulty} questions for ${exam.toUpperCase()}${domain ? ` (${domain})` : ""}`);
    console.time("[QUIZ GENERATE] OpenRouter API call");

    const openRouterResponse = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
        "HTTP-Referer": clientUrl,
        "X-Title": "LibraryNode",
      },
      body: JSON.stringify({
        model,
        messages: [
          {
            role: "system",
            content: "You are a JSON-only question generator. You output only valid JSON arrays with no additional text, markdown, or formatting.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.7,
        max_tokens: 4096,
      }),
    });

    console.timeEnd("[QUIZ GENERATE] OpenRouter API call");

    if (!openRouterResponse.ok) {
      const errorBody = await openRouterResponse.text();
      console.error(`❌ [QUIZ GENERATE] OpenRouter API error: ${openRouterResponse.status}`, errorBody);
      return res.status(502).json({
        success: false,
        message: "Failed to generate questions. The AI service returned an error. Please try again.",
      });
    }

    const data = await openRouterResponse.json();

    if (!data.choices || !data.choices[0] || !data.choices[0].message?.content) {
      console.error("❌ [QUIZ GENERATE] Unexpected OpenRouter response structure:", JSON.stringify(data).substring(0, 500));
      return res.status(502).json({
        success: false,
        message: "AI returned an unexpected response. Please try again.",
      });
    }

    const rawContent = data.choices[0].message.content;

    // --- Parse and validate ---
    const questions = parseAndValidateQuestions(rawContent, questionCount);

    console.log(`✅ [QUIZ GENERATE] Successfully generated ${questions.length} questions`);

    return res.status(200).json({
      success: true,
      questions,
    });
  } catch (error) {
    console.error("❌ [QUIZ GENERATE] Error:", error.message);
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to generate questions. Please try again.",
    });
  }
});

/**
 * POST /api/quiz/history
 * Save a quiz attempt history.
 */
router.post("/history", async (req, res) => {
  try {
    const { studentId, exam, domain, numQuestions, level, score } = req.body;

    if (!studentId || !mongoose.Types.ObjectId.isValid(studentId)) {
      return res.status(400).json({
        success: false,
        message: "Valid studentId is required.",
      });
    }

    if (!exam || !ALLOWED_EXAMS.includes(exam.toLowerCase())) {
      return res.status(400).json({
        success: false,
        message: `Invalid exam.`,
      });
    }

    const totalQuestions = Number(numQuestions) || 25;
    const scoreVal = Number(score) || 0;
    const percentage = Math.round((scoreVal / totalQuestions) * 100);

    const history = await QuizHistory.create({
      student: studentId,
      exam: exam.toLowerCase(),
      domain: domain || "",
      numQuestions: totalQuestions,
      level: level || "medium",
      score: scoreVal,
      totalQuestions,
      percentage,
    });

    return res.status(201).json({
      success: true,
      history,
    });
  } catch (error) {
    console.error("❌ [QUIZ HISTORY SAVE] Error:", error.message);
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to save quiz history.",
    });
  }
});

/**
 * GET /api/quiz/history/:studentId
 * Get quiz history for a student.
 */
router.get("/history/:studentId", async (req, res) => {
  try {
    const { studentId } = req.params;

    if (!studentId || !mongoose.Types.ObjectId.isValid(studentId)) {
      return res.status(400).json({
        success: false,
        message: "Valid studentId is required.",
      });
    }

    const history = await QuizHistory.find({ student: studentId })
      .sort({ createdAt: -1 })
      .limit(50); // Limit to last 50 attempts

    return res.status(200).json({
      success: true,
      history,
    });
  } catch (error) {
    console.error("❌ [QUIZ HISTORY FETCH] Error:", error.message);
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch quiz history.",
    });
  }
});

module.exports = router;
