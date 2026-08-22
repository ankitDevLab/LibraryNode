import React, { useState } from "react";
import { Link } from "react-router-dom";
import SEOHead from "../components/SEOHead";
import PublicNavbar from "../components/PublicNavbar";
import PublicFooter from "../components/PublicFooter";

function SSCQuiz() {
  const [activeSection, setActiveSection] = useState("all");

  const sscQuestions = [
    {
      id: 1,
      section: "math",
      question: "If a shopkeeper marks an item 20% above cost price and allows a discount of 10%, what is his profit percentage?",
      options: ["8%", "10%", "12%", "15%"],
      answer: 0,
      explanation: "Let CP = 100. Marked Price = 120. Selling Price = 120 - (10% of 120) = 108. Profit % = ((108 - 100) / 100) * 100 = 8%."
    },
    {
      id: 2,
      section: "reasoning",
      question: "Select the related letter-pair from the given alternatives: BCD : EFG :: HIJ : ?",
      options: ["KLM", "LMN", "NOP", "OPQ"],
      answer: 0,
      explanation: "Each letter is incremented by +3 positions in the alphabet: B(+3)=E, C(+3)=F, D(+3)=G. Similarly, H(+3)=K, I(+3)=L, J(+3)=M -> KLM."
    },
    {
      id: 3,
      section: "english",
      question: "Select the synonym of the given word: 'METICULOUS'",
      options: ["Careless", "Precise / Thorough", "Lazy", "Hasty"],
      answer: 1,
      explanation: "'Meticulous' means taking extreme care and showing great attention to detail. Synonym: Precise, Thorough, Careful."
    }
  ];

  const filtered = activeSection === "all"
    ? sscQuestions
    : sscQuestions.filter(q => q.section === activeSection);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans text-slate-800">
      <SEOHead
        title="SSC Quiz Practice Questions for CGL, CHSL, MTS & CPO"
        description="Free SSC practice quizzes, mock test series, Quantitative Aptitude MCQs, Reasoning, English, and General Awareness practice questions for SSC CGL & CHSL."
        canonicalPath="/ssc-quiz"
      />

      <PublicNavbar activePage="/quiz" />

      {/* Hero Header */}
      <section className="bg-gradient-to-b from-emerald-950 via-slate-900 to-teal-950 text-white py-14 px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto space-y-5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-emerald-500/20 border border-emerald-400/30 rounded-full text-emerald-300 text-xs font-semibold uppercase tracking-wider">
            📊 Educational Resource • SSC Practice Tests
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            SSC CGL, CHSL & MTS Quiz Practice Hub
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Practice section-wise MCQs for Staff Selection Commission (SSC) exams including Quantitative Aptitude, Reasoning Ability, English Language, and General Awareness.
          </p>

          <div className="flex justify-center gap-4 pt-2">
            <Link
              to="/ssc-pyq"
              className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-md text-xs sm:text-sm transition"
            >
              📖 Explore SSC PYQ Solved Sets ➔
            </Link>
          </div>
        </div>
      </section>

      {/* Section Filter Buttons */}
      <section className="py-12 px-4 max-w-7xl mx-auto w-full">
        <h2 className="text-2xl font-extrabold text-slate-900 text-center mb-8">
          SSC Exam Tier-1 Sectional Practice
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center max-w-4xl mx-auto">
          <button
            onClick={() => setActiveSection("all")}
            className={`p-4 rounded-2xl border text-xs sm:text-sm font-bold transition ${
              activeSection === "all"
                ? "bg-emerald-600 text-white border-emerald-600 shadow-md"
                : "bg-white text-slate-700 border-slate-200 hover:border-emerald-300"
            }`}
          >
            All Sections
          </button>

          <button
            onClick={() => setActiveSection("math")}
            className={`p-4 rounded-2xl border text-xs sm:text-sm font-bold transition ${
              activeSection === "math"
                ? "bg-emerald-600 text-white border-emerald-600 shadow-md"
                : "bg-white text-slate-700 border-slate-200 hover:border-emerald-300"
            }`}
          >
            Quantitative Aptitude
          </button>

          <button
            onClick={() => setActiveSection("reasoning")}
            className={`p-4 rounded-2xl border text-xs sm:text-sm font-bold transition ${
              activeSection === "reasoning"
                ? "bg-emerald-600 text-white border-emerald-600 shadow-md"
                : "bg-white text-slate-700 border-slate-200 hover:border-emerald-300"
            }`}
          >
            Reasoning Ability
          </button>

          <button
            onClick={() => setActiveSection("english")}
            className={`p-4 rounded-2xl border text-xs sm:text-sm font-bold transition ${
              activeSection === "english"
                ? "bg-emerald-600 text-white border-emerald-600 shadow-md"
                : "bg-white text-slate-700 border-slate-200 hover:border-emerald-300"
            }`}
          >
            English Comprehension
          </button>
        </div>
      </section>

      {/* Sample SSC MCQs */}
      <section className="bg-white py-12 px-4 border-y border-slate-200">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center">
            <h2 className="text-2xl font-extrabold text-slate-900">
              Sample SSC Practice Questions & Shortcut Solutions
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm mt-1">
              Test your speed and accuracy with model practice questions.
            </p>
          </div>

          <div className="space-y-6">
            {filtered.map((q, idx) => (
              <div key={q.id} className="p-6 bg-slate-50 rounded-2xl border border-slate-200 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-xs font-bold uppercase">
                    Q{idx + 1} • {q.section}
                  </span>
                  <span className="text-xs font-semibold text-slate-400">SSC CGL / CHSL Standard</span>
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
                          ? "bg-emerald-50 border-emerald-300 text-emerald-900 font-bold"
                          : "bg-white border-slate-200 text-slate-700"
                      }`}
                    >
                      <span className="font-bold mr-2">{String.fromCharCode(65 + oIdx)}.</span> {opt}
                    </div>
                  ))}
                </div>

                <div className="pt-2 border-t border-slate-200 text-xs text-slate-600 space-y-1">
                  <p className="font-bold text-slate-800">💡 Shortcut Solution:</p>
                  <p className="leading-relaxed">{q.explanation}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Internal Linking & Disclaimer */}
      <section className="py-12 px-4 max-w-5xl mx-auto w-full space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link
            to="/ssc-pyq"
            className="p-6 bg-white rounded-2xl border border-slate-200 shadow-xs hover:border-emerald-400 transition space-y-2"
          >
            <h4 className="font-bold text-slate-900 text-base">📖 SSC PYQ Solved Papers</h4>
            <p className="text-xs text-slate-600">Explore past years question papers for SSC CGL, CHSL & MTS exams.</p>
          </Link>

          <Link
            to="/upsc-quiz"
            className="p-6 bg-white rounded-2xl border border-slate-200 shadow-xs hover:border-emerald-400 transition space-y-2"
          >
            <h4 className="font-bold text-slate-900 text-base">🏛️ UPSC Practice Quizzes</h4>
            <p className="text-xs text-slate-600">Practice General Studies GS Paper 1 MCQs for UPSC Prelims.</p>
          </Link>
        </div>

        <div className="p-4 bg-slate-100 rounded-xl text-slate-500 text-xs text-center">
          Educational Disclaimer: Practice questions designed for student self-study. Library Node is not affiliated with the Staff Selection Commission (SSC).
        </div>
      </section>

      <PublicFooter />
    </div>
  );
}

export default SSCQuiz;
