import React from "react";
import { useNavigate, Link } from "react-router-dom";
import SEOHead from "../components/SEOHead";
import PublicNavbar from "../components/PublicNavbar";
import PublicFooter from "../components/PublicFooter";

function QuizHub() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans text-slate-800">
      <SEOHead
        title="Free AI Quiz Practice & PYQ Mock Tests for UPSC, SSC, JEE, NEET | LibraryNode"
        description="Practice free mock quizzes, AI-generated test series, and previous year question (PYQ) sets for UPSC, SSC, JEE, NEET, and Banking exams on LibraryNode."
        canonicalPath="/quiz"
      />

      <PublicNavbar activePage="/quiz" />

      {/* Hero Header */}
      <section className="bg-gradient-to-b from-indigo-900 via-slate-900 to-blue-950 text-white py-16 px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-indigo-500/20 border border-indigo-400/30 rounded-full text-indigo-300 text-xs font-semibold uppercase tracking-wider">
            📚 Exam Preparation & Practice Hub
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            Competitive Exam Quizzes & PYQ Practice Center
          </h1>

          <p className="text-base sm:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Boost your exam preparation with topic-wise practice quizzes, sample MCQs, and previous year question breakdowns for UPSC Civil Services and SSC examinations.
          </p>
        </div>
      </section>

      {/* Main Categories Section */}
      <section className="py-16 px-4 max-w-7xl mx-auto w-full">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Select Your Target Examination
          </h2>
          <p className="text-slate-600 text-sm mt-2">
            Explore dedicated practice modules designed for serious aspirants.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* UPSC Box */}
          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm hover:shadow-md transition space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-16 h-16 bg-blue-50 text-blue-700 rounded-2xl flex items-center justify-center text-3xl font-black">
                🏛️
              </div>
              <h3 className="text-2xl font-black text-slate-900">
                UPSC CSE Preparation
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Practice UPSC Civil Services Prelims mock test series, GS Paper 1 MCQs, Polity, History, Economy, Geography, and Environment practice questions.
              </p>

              <div className="pt-2 flex flex-wrap gap-2 text-xs font-semibold text-blue-600">
                <span className="px-3 py-1 bg-blue-50 rounded-lg">General Studies</span>
                <span className="px-3 py-1 bg-blue-50 rounded-lg">Current Affairs</span>
                <span className="px-3 py-1 bg-blue-50 rounded-lg">PYQ Analysis</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 border-t border-slate-100">
              <Link
                to="/upsc-quiz"
                className="w-full py-3 px-4 text-center text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition shadow-xs"
              >
                UPSC Practice Quiz ➔
              </Link>
              <Link
                to="/upsc-pyq"
                className="w-full py-3 px-4 text-center text-xs font-bold text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-xl transition"
              >
                UPSC PYQ Sets ➔
              </Link>
            </div>
          </div>

          {/* SSC Box */}
          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm hover:shadow-md transition space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-16 h-16 bg-emerald-50 text-emerald-700 rounded-2xl flex items-center justify-center text-3xl font-black">
                📊
              </div>
              <h3 className="text-2xl font-black text-slate-900">
                SSC Exam Preparation
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Prepare for SSC CGL, CHSL, MTS, and CPO exams with quantitative aptitude MCQs, logical reasoning, English comprehension, and general awareness quizzes.
              </p>

              <div className="pt-2 flex flex-wrap gap-2 text-xs font-semibold text-emerald-600">
                <span className="px-3 py-1 bg-emerald-50 rounded-lg">Quantitative Aptitude</span>
                <span className="px-3 py-1 bg-emerald-50 rounded-lg">Reasoning</span>
                <span className="px-3 py-1 bg-emerald-50 rounded-lg">English & GK</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 border-t border-slate-100">
              <Link
                to="/ssc-quiz"
                className="w-full py-3 px-4 text-center text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl transition shadow-xs"
              >
                SSC Practice Quiz ➔
              </Link>
              <Link
                to="/ssc-pyq"
                className="w-full py-3 px-4 text-center text-xs font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-xl transition"
              >
                SSC PYQ Sets ➔
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Highlights */}
      <section className="bg-white py-16 px-4 border-y border-slate-200">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Why Practice Quizzes on Library Node?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 space-y-2">
              <div className="text-2xl">🎯</div>
              <h3 className="font-bold text-slate-900">Exam-Oriented Question Sets</h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                Curated questions structured around the latest examination patterns of UPSC CSE and SSC CGL/CHSL.
              </p>
            </div>

            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 space-y-2">
              <div className="text-2xl">💡</div>
              <h3 className="font-bold text-slate-900">Topic-Wise Revision</h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                Focus on weak subjects like Indian Polity, History, Arithmetic, or English Grammar with target quizzes.
              </p>
            </div>

            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 space-y-2">
              <div className="text-2xl">📖</div>
              <h3 className="font-bold text-slate-900">Self-Paced Practice</h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                Practice anytime from your mobile or while studying at your Library Node reserved desk.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Educational Disclaimer */}
      <section className="py-12 px-4 max-w-5xl mx-auto w-full">
        <div className="p-6 bg-blue-50 border border-blue-200 rounded-2xl text-slate-700 text-xs sm:text-sm space-y-2">
          <h4 className="font-bold text-blue-900 text-base">
            📌 Educational Resource Disclaimer
          </h4>
          <p className="leading-relaxed">
            Library Node provides practice quizzes, educational self-study questions, and study space booking tools to support competitive exam preparation. Library Node is an independent platform and is not affiliated with, authorized, or endorsed by the Union Public Service Commission (UPSC), Staff Selection Commission (SSC), or any official examination board.
          </p>
        </div>
      </section>

      <PublicFooter />
    </div>
  );
}

export default QuizHub;
