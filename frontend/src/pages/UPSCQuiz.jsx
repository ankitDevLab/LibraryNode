import React, { useState } from "react";
import { Link } from "react-router-dom";
import SEOHead from "../components/SEOHead";
import PublicNavbar from "../components/PublicNavbar";
import PublicFooter from "../components/PublicFooter";

function UPSCQuiz() {
  const [selectedTopic, setSelectedTopic] = useState("all");

  const sampleQuestions = [
    {
      id: 1,
      topic: "polity",
      question: "Which feature of the Indian Constitution was borrowed from the Constitution of Ireland?",
      options: [
        "Directive Principles of State Policy (DPSP)",
        "Fundamental Rights",
        "Preamble",
        "Cabinet System of Government"
      ],
      answer: 0,
      explanation: "The Directive Principles of State Policy (DPSP) in Part IV of the Indian Constitution were inspired by the Constitution of Ireland (which had copied it from Spain)."
    },
    {
      id: 2,
      topic: "history",
      question: "With reference to ancient Indian history, who among the following authored the famous work 'Arthashastra'?",
      options: [
        "Megasthenes",
        "Chanakya (Kautilya)",
        "Banabhatta",
        "Kalidasa"
      ],
      answer: 1,
      explanation: "Chanakya (also known as Kautilya or Vishnugupta), the Prime Minister of Chandragupta Maurya, authored the 'Arthashastra', a classic treatise on statecraft and economic policy."
    },
    {
      id: 3,
      topic: "economy",
      question: "Which body in India formulates the Monetary Policy?",
      options: [
        "Ministry of Finance",
        "Reserve Bank of India (Monetary Policy Committee)",
        "NITI Aayog",
        "Securities and Exchange Board of India (SEBI)"
      ],
      answer: 1,
      explanation: "The Monetary Policy Committee (MPC) of the Reserve Bank of India (RBI) is responsible for fixing the benchmark policy interest rate in India."
    }
  ];

  const filteredQuestions = selectedTopic === "all"
    ? sampleQuestions
    : sampleQuestions.filter(q => q.topic === selectedTopic);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans text-slate-800">
      <SEOHead
        title="UPSC Quiz & Practice Mock Tests for CSE Prelims"
        description="Practice UPSC Civil Services Prelims mock quizzes, GS Paper 1 MCQs, Current Affairs, History, Polity, Economy, and Geography practice questions."
        canonicalPath="/upsc-quiz"
      />

      <PublicNavbar activePage="/quiz" />

      {/* Hero Header */}
      <section className="bg-gradient-to-b from-blue-950 via-slate-900 to-indigo-950 text-white py-14 px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto space-y-5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-blue-500/20 border border-blue-400/30 rounded-full text-blue-300 text-xs font-semibold uppercase tracking-wider">
            🏛️ Educational Resource • UPSC CSE Practice
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            UPSC Civil Services Prelims Quiz & Practice MCQs
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Test your knowledge across Indian Polity, Ancient & Modern History, Indian Economy, Geography, Environment, and General Studies Paper 1 for UPSC CSE Prelims.
          </p>

          <div className="flex justify-center gap-4 pt-2">
            <Link
              to="/upsc-pyq"
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-md text-xs sm:text-sm transition"
            >
              📖 Explore UPSC PYQ Solved Sets ➔
            </Link>
          </div>
        </div>
      </section>

      {/* Subjects Overview */}
      <section className="py-12 px-4 max-w-7xl mx-auto w-full">
        <h2 className="text-2xl font-extrabold text-slate-900 text-center mb-8">
          General Studies Prelims Subject Coverage
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 text-center">
          <button
            onClick={() => setSelectedTopic("all")}
            className={`p-4 rounded-2xl border text-xs sm:text-sm font-bold transition ${
              selectedTopic === "all"
                ? "bg-blue-600 text-white border-blue-600 shadow-md"
                : "bg-white text-slate-700 border-slate-200 hover:border-blue-300"
            }`}
          >
            All Subjects
          </button>

          <button
            onClick={() => setSelectedTopic("polity")}
            className={`p-4 rounded-2xl border text-xs sm:text-sm font-bold transition ${
              selectedTopic === "polity"
                ? "bg-blue-600 text-white border-blue-600 shadow-md"
                : "bg-white text-slate-700 border-slate-200 hover:border-blue-300"
            }`}
          >
            Indian Polity
          </button>

          <button
            onClick={() => setSelectedTopic("history")}
            className={`p-4 rounded-2xl border text-xs sm:text-sm font-bold transition ${
              selectedTopic === "history"
                ? "bg-blue-600 text-white border-blue-600 shadow-md"
                : "bg-white text-slate-700 border-slate-200 hover:border-blue-300"
            }`}
          >
            History & Culture
          </button>

          <button
            onClick={() => setSelectedTopic("economy")}
            className={`p-4 rounded-2xl border text-xs sm:text-sm font-bold transition ${
              selectedTopic === "economy"
                ? "bg-blue-600 text-white border-blue-600 shadow-md"
                : "bg-white text-slate-700 border-slate-200 hover:border-blue-300"
            }`}
          >
            Indian Economy
          </button>

          <div className="p-4 rounded-2xl border bg-white text-slate-400 border-slate-200 text-xs sm:text-sm font-bold opacity-75">
            Geography
          </div>

          <div className="p-4 rounded-2xl border bg-white text-slate-400 border-slate-200 text-xs sm:text-sm font-bold opacity-75">
            Environment
          </div>
        </div>
      </section>

      {/* Interactive Sample Practice Section */}
      <section className="bg-white py-12 px-4 border-y border-slate-200">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center">
            <h2 className="text-2xl font-extrabold text-slate-900">
              Sample UPSC Practice Questions & Explanations
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm mt-1">
              Review model questions curated for Prelims self-evaluation.
            </p>
          </div>

          <div className="space-y-6">
            {filteredQuestions.map((q, idx) => (
              <div key={q.id} className="p-6 bg-slate-50 rounded-2xl border border-slate-200 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-bold uppercase">
                    Q{idx + 1} • {q.topic}
                  </span>
                  <span className="text-xs font-semibold text-slate-400">GS Paper 1 Concept</span>
                </div>

                <h3 className="font-bold text-slate-900 text-base leading-snug">
                  {q.question}
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm">
                  {q.options.map((opt, oIdx) => (
                    <div
                      key={oIdx}
                      className={`p-3 rounded-xl border font-medium ${
                        oIdx === q.answer
                          ? "bg-green-50 border-green-300 text-green-900 font-bold"
                          : "bg-white border-slate-200 text-slate-700"
                      }`}
                    >
                      <span className="font-bold mr-2">{String.fromCharCode(65 + oIdx)}.</span> {opt}
                    </div>
                  ))}
                </div>

                <div className="pt-2 border-t border-slate-200 text-xs text-slate-600 space-y-1">
                  <p className="font-bold text-slate-800">💡 Explanation:</p>
                  <p className="leading-relaxed">{q.explanation}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Internal Navigation & Disclaimer */}
      <section className="py-12 px-4 max-w-5xl mx-auto w-full space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link
            to="/upsc-pyq"
            className="p-6 bg-white rounded-2xl border border-slate-200 shadow-xs hover:border-blue-400 transition space-y-2"
          >
            <h4 className="font-bold text-slate-900 text-base">📖 UPSC Previous Year Questions (PYQ)</h4>
            <p className="text-xs text-slate-600">Solve topic-wise previous year question sets and analyze answer strategies.</p>
          </Link>

          <Link
            to="/ssc-quiz"
            className="p-6 bg-white rounded-2xl border border-slate-200 shadow-xs hover:border-blue-400 transition space-y-2"
          >
            <h4 className="font-bold text-slate-900 text-base">📊 SSC Practice Quizzes</h4>
            <p className="text-xs text-slate-600">Try quantitative aptitude, reasoning, and English mock quizzes for SSC exams.</p>
          </Link>
        </div>

        <div className="p-4 bg-slate-100 rounded-xl text-slate-500 text-xs text-center">
          Note: Library Node provides independent self-study educational content. Not affiliated with or endorsed by UPSC or government bodies.
        </div>
      </section>

      <PublicFooter />
    </div>
  );
}

export default UPSCQuiz;
