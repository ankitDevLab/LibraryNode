import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import API from "../api/axios";
import AIQuizAttempt from "./AIQuizAttempt";
import SEOHead from "../components/SEOHead";

const BANKING_DOMAINS = [
  {
    key: "po_mt",
    label: "PO / Management Trainee",
    sub: "SBI PO, IBPS PO, IBPS RRB PO",
    icon: "🏛️",
  },
  {
    key: "clerk",
    label: "Clerical Cadre / Junior Associate",
    sub: "SBI Clerk, IBPS Clerk, RBI Assistant",
    icon: "📋",
  },
  {
    key: "so",
    label: "Specialist Officer (SO)",
    sub: "IT, Law, HR, Marketing, AFO",
    icon: "👨‍💼",
  },
  {
    key: "regulatory",
    label: "Regulatory Body Officer",
    sub: "RBI Grade B, NABARD, SIDBI, SEBI",
    icon: "⚖️",
  },
  {
    key: "special",
    label: "Other Special Posts",
    sub: "SBI CBO, IBPS RRB Scale II/III",
    icon: "🌟",
  },
];

function Practice() {
  const { exam } = useParams();
  const navigate = useNavigate();

  const getSEOData = () => {
    const examLower = exam?.toLowerCase() || "";
    if (examLower === "jee") {
      return {
        title: "JEE Questions & Practice — AI Question Generator",
        description: "Generate and practice custom JEE questions using AI. Access mock test series, physics, chemistry, mathematics MCQs, and prepare for JEE Main & Advanced.",
      };
    }
    if (examLower === "neet") {
      return {
        title: "NEET Questions & Practice — AI Question Generator",
        description: "Generate and practice custom NEET questions using AI. Mock tests for physics, chemistry, biology, and interactive exam practice.",
      };
    }
    if (examLower === "banking") {
      return {
        title: "Banking Exam Questions & Practice — AI Question Generator",
        description: "Generate and practice custom Banking exam questions using AI. Access mock tests for PO, Clerk, Specialist Officer, and regulatory exams.",
      };
    }
    if (examLower === "ssc") {
      return {
        title: "SSC Questions & Practice — AI Question Generator",
        description: "Generate and practice custom SSC questions using AI. Tailored mock tests for CGL, CHSL, MTS, GK, reasoning, math, and English.",
      };
    }
    if (examLower === "upsc") {
      return {
        title: "UPSC Questions & Practice — AI Question Generator",
        description: "Generate and practice custom UPSC Civil Services questions using AI. Access Prelims General Studies (GS) Paper 1 & 2 mock tests.",
      };
    }
    return {
      title: `${formattedExam} Exam Questions & Practice — AI Question Generator`,
      description: `Generate and practice custom ${formattedExam} exam questions using AI. Access mock tests and interactive competitive exam preparation.`,
    };
  };

  const formattedExam = exam ? exam.toUpperCase() : "Quiz";
  const seo = getSEOData();

  const student = JSON.parse(localStorage.getItem("studentProfile") || "{}");
  const studentId = student?._id;

  // Steps: "domain-select" | "exam-options" | "quiz-config" | "quiz"
  const [step, setStep] = useState("loading");
  const [bankingDomain, setBankingDomain] = useState("");
  const [loadingPrefs, setLoadingPrefs] = useState(true);
  const [savingDomain, setSavingDomain] = useState(false);

  // Quiz config
  const [numQuestions, setNumQuestions] = useState(25);
  const [level, setLevel] = useState("medium");

  // On mount, check if banking domain is needed
  useEffect(() => {
    const checkPreferences = async () => {
      if (!studentId) {
        setLoadingPrefs(false);
        setStep("exam-options");
        return;
      }

      if (exam?.toLowerCase() === "banking") {
        try {
          const res = await API.get(`/students/${studentId}/exam-preferences`);
          const domain = res.data?.examPreferences?.banking?.domain;
          if (domain) {
            setBankingDomain(domain);
            setStep("exam-options");
          } else {
            setStep("domain-select");
          }
        } catch (err) {
          console.error("Failed to load exam preferences:", err);
          setStep("domain-select");
        }
      } else {
        setStep("exam-options");
      }

      setLoadingPrefs(false);
    };

    checkPreferences();
  }, [exam, studentId]);

  const saveBankingDomain = async (domainKey) => {
    setSavingDomain(true);
    const domainObj = BANKING_DOMAINS.find((d) => d.key === domainKey);
    const domainLabel = domainObj?.label || domainKey;

    try {
      if (studentId) {
        await API.put(`/students/${studentId}/exam-preferences`, {
          banking: { domain: domainLabel },
        });
      }
      setBankingDomain(domainLabel);
      setStep("exam-options");
    } catch (err) {
      console.error("Failed to save banking domain:", err);
      // Still proceed even if save fails
      setBankingDomain(domainLabel);
      setStep("exam-options");
    } finally {
      setSavingDomain(false);
    }
  };

  const handleChangeDomain = () => {
    setStep("domain-select");
  };

  // --- Loading Screen ---
  if (step === "loading" || loadingPrefs) {
    return (
      <div className="min-h-screen bg-slate-100 flex flex-col">
        <SEOHead title={seo.title} description={seo.description} canonicalPath={`/quiz/${exam}`} />
        <Navbar title={`${formattedExam} Practice`} />
        <div className="flex-1 flex items-center justify-center p-5">
          <div className="w-10 h-10 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin" />
        </div>
      </div>
    );
  }

  // --- Domain Selection (Banking Only) ---
  if (step === "domain-select") {
    return (
      <div className="min-h-screen bg-slate-100 flex flex-col">
        <SEOHead title={seo.title} description={seo.description} canonicalPath={`/quiz/${exam}`} />
        <Navbar title="Banking — Select Your Post" />

        <div className="flex-1 p-4 sm:p-6">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-3xl shadow-lg p-6 sm:p-8 mb-6">
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-2">
                🏦 Choose Your Banking Post
              </h2>
              <p className="text-slate-500 font-medium text-sm sm:text-base mb-8">
                Select the post category you're preparing for. This helps us generate
                relevant questions. You can change this later.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {BANKING_DOMAINS.map((domain) => (
                  <button
                    key={domain.key}
                    onClick={() => saveBankingDomain(domain.key)}
                    disabled={savingDomain}
                    className="bg-gradient-to-br from-green-50 to-emerald-50 hover:from-green-100 hover:to-emerald-100 border-2 border-green-200 hover:border-green-400 rounded-2xl p-5 sm:p-6 text-left transition-all hover:scale-[1.02] hover:shadow-lg disabled:opacity-60"
                  >
                    <div className="text-3xl sm:text-4xl mb-3">{domain.icon}</div>
                    <h3 className="text-base sm:text-lg font-bold text-slate-800 mb-1">
                      {domain.label}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-500">{domain.sub}</p>
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => navigate("/student-dashboard")}
              className="text-slate-500 hover:text-slate-700 font-semibold text-sm transition"
            >
              ← Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  // --- Exam Options Screen ---
  if (step === "exam-options") {
    return (
      <div className="min-h-screen bg-slate-100 flex flex-col">
        <SEOHead title={seo.title} description={seo.description} canonicalPath={`/quiz/${exam}`} />
        <Navbar title={`${formattedExam} Practice`} />

        <div className="flex-1 p-4 sm:p-6">
          <div className="max-w-3xl mx-auto">
            {/* Exam Header */}
            <div className="bg-white rounded-3xl shadow-lg p-6 sm:p-8 mb-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-slate-800">
                    {formattedExam} Practice
                  </h2>
                  {exam?.toLowerCase() === "banking" && bankingDomain && (
                    <div className="flex items-center gap-2 mt-1">
                      <p className="text-slate-500 text-sm font-medium">
                        Post: <span className="text-green-600 font-semibold">{bankingDomain}</span>
                      </p>
                      <button
                        onClick={handleChangeDomain}
                        className="text-blue-600 hover:text-blue-700 text-xs font-bold underline underline-offset-2 transition"
                      >
                        Change
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Practice Quiz Card */}
                <button
                  onClick={() => setStep("quiz-config")}
                  className="bg-gradient-to-br from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-2xl p-6 sm:p-8 text-left transition-all hover:scale-[1.02] hover:shadow-xl shadow-lg"
                >
                  <div className="text-4xl sm:text-5xl mb-4">🧠</div>
                  <h3 className="text-xl sm:text-2xl font-bold mb-2">Practice Quiz</h3>
                  <p className="text-blue-100 text-sm sm:text-base">
                    AI-generated questions tailored to your exam. Choose difficulty and number of questions.
                  </p>
                  <div className="mt-4 inline-flex items-center gap-2 bg-white/20 rounded-full px-4 py-1.5 text-xs sm:text-sm font-semibold">
                    Start Now →
                  </div>
                </button>

                {/* PYQ Card — Coming Soon */}
                <div className="bg-white rounded-2xl p-6 sm:p-8 border-2 border-dashed border-slate-200 text-center flex flex-col items-center justify-center">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl sm:text-4xl text-blue-600 animate-bounce">
                    📝
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-800 mb-2">
                    PYQ (Previous Year)
                  </h3>
                  <p className="text-slate-500 font-medium text-sm leading-relaxed">
                    Previous year questions will be available soon. Our team is working on it.
                  </p>
                  <span className="mt-4 inline-block bg-slate-100 text-slate-500 px-4 py-1.5 rounded-full text-xs sm:text-sm font-bold">
                    Coming Soon
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={() => navigate("/student-dashboard")}
              className="text-slate-500 hover:text-slate-700 font-semibold text-sm transition"
            >
              ← Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  // --- Quiz Config Screen ---
  if (step === "quiz-config") {
    return (
      <div className="min-h-screen bg-slate-100 flex flex-col">
        <SEOHead title={seo.title} description={seo.description} canonicalPath={`/quiz/${exam}`} />
        <Navbar title={`${formattedExam} — Quiz Setup`} />

        <div className="flex-1 p-4 sm:p-6">
          <div className="max-w-lg mx-auto">
            <div className="bg-white rounded-3xl shadow-lg p-6 sm:p-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-2">
                ⚙️ Configure Your Quiz
              </h2>
              <p className="text-slate-500 text-sm sm:text-base mb-8">
                Customize the quiz to match your preparation level.
              </p>

              {/* Number of Questions */}
              <div className="mb-6">
                <label className="block text-sm font-bold text-slate-700 mb-3">
                  Number of Questions
                </label>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setNumQuestions(Math.max(5, numQuestions - 5))}
                    className="w-12 h-12 bg-slate-100 hover:bg-slate-200 rounded-xl flex items-center justify-center text-xl font-bold text-slate-600 transition"
                  >
                    −
                  </button>
                  <input
                    type="number"
                    min="5"
                    max="50"
                    value={numQuestions}
                    onChange={(e) => {
                      const val = parseInt(e.target.value) || 5;
                      setNumQuestions(Math.min(50, Math.max(5, val)));
                    }}
                    className="flex-1 text-center text-2xl font-bold border-2 border-slate-200 rounded-xl py-3 focus:border-blue-500 focus:outline-none transition [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  />
                  <button
                    onClick={() => setNumQuestions(Math.min(50, numQuestions + 5))}
                    className="w-12 h-12 bg-slate-100 hover:bg-slate-200 rounded-xl flex items-center justify-center text-xl font-bold text-slate-600 transition"
                  >
                    +
                  </button>
                </div>
                <p className="text-xs text-slate-400 mt-2 text-center">Min: 5 • Max: 50</p>
              </div>

              {/* Difficulty Level */}
              <div className="mb-8">
                <label className="block text-sm font-bold text-slate-700 mb-3">
                  Difficulty Level
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { key: "low", label: "Easy", emoji: "🟢", color: "green" },
                    { key: "medium", label: "Medium", emoji: "🟡", color: "yellow" },
                    { key: "high", label: "Hard", emoji: "🔴", color: "red" },
                  ].map((d) => (
                    <button
                      key={d.key}
                      onClick={() => setLevel(d.key)}
                      className={`p-4 rounded-xl border-2 text-center font-bold text-sm transition-all ${
                        level === d.key
                          ? d.color === "green"
                            ? "bg-green-50 border-green-500 text-green-700 shadow-md"
                            : d.color === "yellow"
                            ? "bg-yellow-50 border-yellow-500 text-yellow-700 shadow-md"
                            : "bg-red-50 border-red-500 text-red-700 shadow-md"
                          : "bg-white border-slate-200 text-slate-600 hover:border-slate-300"
                      }`}
                    >
                      <div className="text-2xl mb-1">{d.emoji}</div>
                      {d.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Start Quiz Button */}
              <button
                onClick={() => setStep("quiz")}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl font-bold text-lg transition-all shadow-lg hover:shadow-xl"
              >
                🚀 Start Quiz
              </button>
            </div>

            <button
              onClick={() => setStep("exam-options")}
              className="mt-4 text-slate-500 hover:text-slate-700 font-semibold text-sm transition block"
            >
              ← Back to Options
            </button>
          </div>
        </div>
      </div>
    );
  }

  // --- Quiz Taking (step === "quiz") ---
  if (step === "quiz") {
    return (
      <div className="min-h-screen bg-slate-100 flex flex-col">
        <SEOHead title={seo.title} description={seo.description} canonicalPath={`/quiz/${exam}`} />
        <Navbar title={`${formattedExam} Quiz`} />

        <div className="flex-1">
          <div className="max-w-4xl mx-auto">
            <AIQuizAttempt
              exam={exam?.toLowerCase()}
              domain={exam?.toLowerCase() === "banking" ? bankingDomain : ""}
              numQuestions={numQuestions}
              level={level}
              studentId={studentId}
              onBack={() => setStep("exam-options")}
            />
          </div>
        </div>
      </div>
    );
  }

  return null;
}

export default Practice;
