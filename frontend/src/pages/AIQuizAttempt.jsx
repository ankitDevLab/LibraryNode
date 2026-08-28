import React, { useState, useEffect } from "react";
import API from "../api/axios";

function AIQuizAttempt({ exam, domain, numQuestions, level, studentId, onBack }) {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    generateQuestions();
  }, []);

  const generateQuestions = async () => {
    setLoading(true);
    setError("");
    setQuestions([]);
    setAnswers({});
    setSubmitted(false);
    setCurrentIndex(0);

    try {
      const response = await API.post("/quiz/generate", {
        exam,
        domain: domain || undefined,
        numQuestions,
        level,
        studentId,
      });

      if (!response.data.success) {
        throw new Error(response.data.message || "Failed to generate questions.");
      }

      setQuestions(response.data.questions);
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const selectAnswer = (questionIdx, optionIdx) => {
    if (submitted) return;
    setAnswers((prev) => ({ ...prev, [questionIdx]: optionIdx }));
  };

  const getScore = () => {
    let correct = 0;
    questions.forEach((q, idx) => {
      if (answers[idx] === q.answer) correct++;
    });
    return correct;
  };

  const handleSubmit = async () => {
    const finalScore = getScore();
    setSubmitted(true);

    // Save to history asynchronously
    try {
      await API.post("/quiz/history", {
        studentId,
        exam,
        domain: domain || "",
        numQuestions,
        level,
        score: finalScore,
      });
      console.log("Quiz history saved successfully");
    } catch (err) {
      console.warn("Failed to save quiz history to DB:", err.response?.data?.message || err.message);
    }
  };


  const formattedExam = exam ? exam.toUpperCase() : "Quiz";

  // --- Loading State ---
  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-5">
        <div className="max-w-md w-full text-center">
          <div className="w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin" />
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-3">
            Generating Questions...
          </h2>

          <p className="text-slate-500 font-medium leading-relaxed mb-4">
            AI is creating {numQuestions} {level}-difficulty {formattedExam} questions for you.
            This may take 10–30 seconds.
          </p>

          <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
            <div className="bg-blue-600 h-2 rounded-full animate-pulse" style={{ width: "60%" }} />
          </div>
        </div>
      </div>
    );
  }

  // --- Error State ---
  if (error) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-5">
        <div className="max-w-md w-full bg-white rounded-3xl p-8 shadow-xl text-center border border-slate-100">
          <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl text-red-500">
            ⚠️
          </div>

          <h2 className="text-2xl font-bold text-slate-800 mb-3">
            Generation Failed
          </h2>

          <p className="text-slate-500 font-medium leading-relaxed mb-6 text-sm">
            {error}
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={generateQuestions}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3.5 rounded-2xl font-bold transition-all shadow-md hover:shadow-lg"
            >
              🔄 Try Again
            </button>

            <button
              onClick={onBack}
              className="flex-1 bg-slate-200 hover:bg-slate-300 text-slate-700 py-3.5 rounded-2xl font-bold transition-all"
            >
              ← Go Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  // --- Results State ---
  if (submitted) {
    const score = getScore();
    const total = questions.length;
    const pct = Math.round((score / total) * 100);
    const scoreColor = pct >= 70 ? "text-green-600" : pct >= 40 ? "text-yellow-600" : "text-red-500";
    const scoreBg = pct >= 70 ? "bg-green-50" : pct >= 40 ? "bg-yellow-50" : "bg-red-50";

    return (
      <div className="p-4 sm:p-6">
        {/* Score Card */}
        <div className={`${scoreBg} rounded-3xl p-6 sm:p-8 text-center mb-6 shadow-lg`}>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-2">Quiz Results</h2>
          <p className="text-slate-500 mb-4 text-sm sm:text-base">{formattedExam} Practice Quiz{domain ? ` — ${domain}` : ""}</p>

          <div className={`text-5xl sm:text-6xl font-black ${scoreColor} mb-2`}>
            {score}/{total}
          </div>

          <p className={`text-lg sm:text-xl font-bold ${scoreColor}`}>
            {pct}% {pct >= 70 ? "🎉 Excellent!" : pct >= 40 ? "👍 Good Effort!" : "📚 Keep Practicing!"}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 mb-8">
          <button
            onClick={() => {
              setSubmitted(false);
              setAnswers({});
              setCurrentIndex(0);
              generateQuestions();
            }}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3.5 rounded-2xl font-bold transition-all shadow-md"
          >
            🔄 Try New Quiz
          </button>

          <button
            onClick={onBack}
            className="flex-1 bg-slate-200 hover:bg-slate-300 text-slate-700 py-3.5 rounded-2xl font-bold transition-all"
          >
            ← Back to Options
          </button>
        </div>

        {/* Detailed Review */}
        <h3 className="text-xl sm:text-2xl font-bold text-slate-800 mb-4">📋 Detailed Review</h3>

        <div className="space-y-4">
          {questions.map((q, idx) => {
            const studentAnswer = answers[idx];
            const isCorrect = studentAnswer === q.answer;

            return (
              <div key={idx} className="bg-white rounded-2xl p-5 sm:p-6 shadow-md border border-slate-100">
                <div className="flex items-start gap-3 mb-4">
                  <span className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white ${isCorrect ? "bg-green-500" : "bg-red-500"}`}>
                    {idx + 1}
                  </span>
                  <p className="font-semibold text-slate-800 text-sm sm:text-base leading-snug">{q.question}</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
                  {q.options.map((opt, oIdx) => {
                    let optClasses = "p-3 sm:p-4 rounded-xl border text-sm font-medium transition";

                    if (oIdx === q.answer) {
                      optClasses += " bg-green-50 border-green-400 text-green-900 font-bold";
                    } else if (oIdx === studentAnswer && oIdx !== q.answer) {
                      optClasses += " bg-red-50 border-red-400 text-red-900";
                    } else {
                      optClasses += " bg-slate-50 border-slate-200 text-slate-600";
                    }

                    return (
                      <div key={oIdx} className={optClasses}>
                        <span className="font-bold mr-2">{String.fromCharCode(65 + oIdx)}.</span>
                        {opt}
                        {oIdx === q.answer && <span className="ml-2">✅</span>}
                        {oIdx === studentAnswer && oIdx !== q.answer && <span className="ml-2">❌</span>}
                      </div>
                    );
                  })}
                </div>

                <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
                  <p className="font-bold text-blue-800 text-xs sm:text-sm mb-1">💡 Explanation:</p>
                  <p className="text-blue-700 text-xs sm:text-sm leading-relaxed">{q.explanation}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // --- Quiz-Taking State ---
  const currentQuestion = questions[currentIndex];
  const answeredCount = Object.keys(answers).length;
  const allAnswered = answeredCount === questions.length;

  return (
    <div className="p-4 sm:p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-800">
            {formattedExam} Practice Quiz
          </h2>
          <p className="text-slate-500 text-sm">
            {answeredCount}/{questions.length} answered
          </p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={onBack}
            className="px-4 py-2 bg-slate-200 hover:bg-slate-300 rounded-xl font-semibold text-sm transition"
          >
            ✕ Exit
          </button>

          <button
            onClick={handleSubmit}
            disabled={!allAnswered}
            className={`px-5 py-2 rounded-xl font-bold text-sm transition shadow-md ${
              allAnswered
                ? "bg-green-600 hover:bg-green-700 text-white"
                : "bg-slate-200 text-slate-400 cursor-not-allowed"
            }`}
          >
            Submit Quiz
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-slate-200 rounded-full h-2 mb-4">
        <div
          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
          style={{ width: `${(answeredCount / questions.length) * 100}%` }}
        />
      </div>

      {/* Question Navigation Pills */}
      <div className="flex flex-wrap gap-2 mb-6">
        {questions.map((_, idx) => {
          const isActive = idx === currentIndex;
          const isAnswered = answers[idx] !== undefined;

          let pillClasses = "w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-xs sm:text-sm font-bold transition cursor-pointer";

          if (isActive) {
            pillClasses += " bg-blue-600 text-white shadow-md scale-110";
          } else if (isAnswered) {
            pillClasses += " bg-blue-100 text-blue-700 border-2 border-blue-300";
          } else {
            pillClasses += " bg-slate-100 text-slate-500 border border-slate-200 hover:bg-slate-200";
          }

          return (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={pillClasses}
            >
              {idx + 1}
            </button>
          );
        })}
      </div>

      {/* Current Question */}
      <div className="bg-white rounded-2xl p-5 sm:p-8 shadow-lg border border-slate-100 mb-6">
        <div className="flex items-center justify-between mb-4">
          <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-bold">
            Question {currentIndex + 1} of {questions.length}
          </span>
          <span className="text-xs font-semibold text-slate-400 capitalize">{level} difficulty</span>
        </div>

        <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug mb-6">
          {currentQuestion.question}
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {currentQuestion.options.map((opt, oIdx) => {
            const isSelected = answers[currentIndex] === oIdx;

            return (
              <button
                key={oIdx}
                onClick={() => selectAnswer(currentIndex, oIdx)}
                className={`p-4 sm:p-5 rounded-xl border-2 text-left text-sm sm:text-base font-medium transition-all ${
                  isSelected
                    ? "bg-blue-50 border-blue-500 text-blue-900 shadow-md"
                    : "bg-white border-slate-200 text-slate-700 hover:border-blue-300 hover:bg-blue-50/50"
                }`}
              >
                <span className="font-bold mr-3 text-blue-600">{String.fromCharCode(65 + oIdx)}.</span>
                {opt}
              </button>
            );
          })}
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between gap-3">
        <button
          onClick={() => setCurrentIndex(Math.max(0, currentIndex - 1))}
          disabled={currentIndex === 0}
          className={`px-5 py-3 rounded-xl font-bold text-sm transition ${
            currentIndex === 0
              ? "bg-slate-100 text-slate-300 cursor-not-allowed"
              : "bg-slate-200 hover:bg-slate-300 text-slate-700"
          }`}
        >
          ← Previous
        </button>

        {currentIndex < questions.length - 1 ? (
          <button
            onClick={() => setCurrentIndex(currentIndex + 1)}
            className="px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-sm transition shadow-md"
          >
            Next →
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            disabled={!allAnswered}
            className={`px-5 py-3 rounded-xl font-bold text-sm transition shadow-md ${
              allAnswered
                ? "bg-green-600 hover:bg-green-700 text-white"
                : "bg-slate-200 text-slate-400 cursor-not-allowed"
            }`}
          >
            Submit Quiz ✓
          </button>
        )}
      </div>
    </div>
  );
}

export default AIQuizAttempt;
