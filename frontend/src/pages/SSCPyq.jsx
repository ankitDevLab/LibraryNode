import React from "react";
import { Link } from "react-router-dom";
import SEOHead from "../components/SEOHead";
import PublicNavbar from "../components/PublicNavbar";
import PublicFooter from "../components/PublicFooter";

function SSCPyq() {
  const sscPyqModules = [
    {
      exam: "SSC CGL (Combined Graduate Level)",
      tier: "Tier-1 & Tier-2",
      count: "250+ PYQ Sets",
      description: "Arithmetic, Advanced Maths, Data Interpretation, Logical Reasoning, English Grammar & General Awareness past year questions."
    },
    {
      exam: "SSC CHSL (Combined Higher Secondary Level)",
      tier: "Tier-1",
      count: "180+ PYQ Sets",
      description: "Simplification, Percentage, Ratio & Proportion, Sentence Improvement, Error Spotting, and General Knowledge PYQs."
    },
    {
      exam: "SSC MTS (Multi-Tasking Staff)",
      tier: "Numerical & Reasoning",
      count: "120+ PYQ Sets",
      description: "Basic mathematics, reasoning puzzles, general English, and current affairs previous year questions."
    },
    {
      exam: "SSC CPO (Central Police Organization)",
      tier: "Paper-1 & Paper-2",
      count: "100+ PYQ Sets",
      description: "General Intelligence, Quantitative Aptitude, and English Language comprehension PYQs."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans text-slate-800">
      <SEOHead
        title="SSC PYQ Previous Year Questions Practice CGL & CHSL"
        description="Practice SSC CGL, CHSL, MTS previous year questions (PYQ). Subject-wise solved questions, shortcut tricks for Maths, and English practice."
        canonicalPath="/ssc-pyq"
      />

      <PublicNavbar activePage="/quiz" />

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-slate-900 via-teal-950 to-emerald-950 text-white py-14 px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto space-y-5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-teal-500/20 border border-teal-400/30 rounded-full text-teal-300 text-xs font-semibold uppercase tracking-wider">
            📜 Educational Resource • SSC PYQ Solved Papers
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            SSC CGL, CHSL & MTS Previous Year Questions (PYQ)
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Solve real past exam questions from Staff Selection Commission (SSC) tests. Master calculation shortcuts, grammar rules, and high-frequency GK questions.
          </p>

          <div className="flex justify-center gap-4 pt-2">
            <Link
              to="/ssc-quiz"
              className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-md text-xs sm:text-sm transition"
            >
              🎯 Practice SSC Speed Quiz ➔
            </Link>
          </div>
        </div>
      </section>

      {/* Exam PYQ Modules */}
      <section className="py-12 px-4 max-w-7xl mx-auto w-full">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <h2 className="text-2xl font-extrabold text-slate-900">
            Exam-Wise SSC Previous Year Question Collection
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm mt-1">
            Categorized PYQ practice resources for comprehensive exam preparation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {sscPyqModules.map((item, idx) => (
            <div key={idx} className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 bg-emerald-50 text-emerald-700 rounded-lg text-xs font-bold">
                  {item.tier}
                </span>
                <span className="text-xs font-bold text-slate-500">{item.count}</span>
              </div>

              <h3 className="text-lg font-bold text-slate-900">{item.exam}</h3>

              <p className="text-xs text-slate-600 leading-relaxed">
                {item.description}
              </p>

              <div className="pt-2">
                <Link
                  to="/ssc-quiz"
                  className="inline-block text-xs font-bold text-emerald-600 hover:underline"
                >
                  Start Solved Practice ➔
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Sample Solved SSC PYQ */}
      <section className="bg-white py-12 px-4 border-y border-slate-200">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="text-center">
            <h2 className="text-2xl font-extrabold text-slate-900">
              Sample Solved SSC CGL Math Question
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Sample PYQ calculation technique for competitive advantage.
            </p>
          </div>

          <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between text-xs">
              <span className="px-3 py-1 bg-teal-100 text-teal-900 rounded-full font-bold">
                SSC CGL Tier-1 • Quantitative Aptitude PYQ
              </span>
              <span className="text-slate-400">Ratio & Proportion</span>
            </div>

            <h3 className="font-bold text-slate-900 text-base leading-snug">
              If A : B = 2 : 3 and B : C = 4 : 5, then find the combined ratio A : B : C.
            </h3>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 bg-white border rounded-lg">A) 8 : 12 : 15</div>
              <div className="p-2.5 bg-emerald-50 border-emerald-300 font-bold text-emerald-900 rounded-lg">B) 8 : 12 : 15</div>
              <div className="p-2.5 bg-white border rounded-lg">C) 6 : 9 : 15</div>
              <div className="p-2.5 bg-white border rounded-lg">D) 2 : 4 : 5</div>
            </div>

            <div className="pt-2 border-t border-slate-200 text-xs text-slate-600 space-y-1">
              <p className="font-bold text-slate-800">💡 Shortcut Formula:</p>
              <p className="leading-relaxed">
                To equalize B: Multiply A:B by 4 to get 8:12. Multiply B:C by 3 to get 12:15. Combined Ratio A:B:C = 8 : 12 : 15.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Internal Navigation & Educational Disclaimer */}
      <section className="py-12 px-4 max-w-5xl mx-auto w-full space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link
            to="/upsc-pyq"
            className="p-6 bg-white rounded-2xl border border-slate-200 shadow-xs hover:border-emerald-400 transition space-y-2"
          >
            <h4 className="font-bold text-slate-900 text-base">🏛️ UPSC PYQ Practice</h4>
            <p className="text-xs text-slate-600">Explore past years question papers for UPSC CSE Prelims.</p>
          </Link>

          <Link
            to="/library-seat-booking"
            className="p-6 bg-white rounded-2xl border border-slate-200 shadow-xs hover:border-emerald-400 transition space-y-2"
          >
            <h4 className="font-bold text-slate-900 text-base">🪑 Reserve Study Seat</h4>
            <p className="text-xs text-slate-600">Find and book quiet study space in nearby libraries for exam preparation.</p>
          </Link>
        </div>

        <div className="p-4 bg-slate-100 rounded-xl text-slate-500 text-xs text-center">
          Educational Disclaimer: Self-study question resource. Library Node is an independent platform and has no affiliation with the Staff Selection Commission (SSC).
        </div>
      </section>

      <PublicFooter />
    </div>
  );
}

export default SSCPyq;
