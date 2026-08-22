import React from "react";
import { Link } from "react-router-dom";
import SEOHead from "../components/SEOHead";
import PublicNavbar from "../components/PublicNavbar";
import PublicFooter from "../components/PublicFooter";

function UPSCPyq() {
  const pyqModules = [
    {
      subject: "Indian Polity & Governance",
      years: "2015 - 2024",
      count: "180+ Questions",
      topics: "Constitutional Framework, Preamble, Fundamental Rights, Judiciary, Panchayati Raj, Federal System."
    },
    {
      subject: "Modern Indian History & Freedom Struggle",
      years: "2015 - 2024",
      count: "150+ Questions",
      topics: "1857 Revolt, Indian National Congress, Gandhian Movement, Governor Generals, Socio-Religious Reforms."
    },
    {
      subject: "Indian Economy & Development",
      years: "2015 - 2024",
      count: "160+ Questions",
      topics: "Banking & RBI, Monetary Policy, Inflation, Budgeting, Balance of Payments, Agriculture & Subsidies."
    },
    {
      subject: "Environment & Ecology",
      years: "2015 - 2024",
      count: "190+ Questions",
      topics: "Biodiversity Hotspots, Wildlife Protection Act, National Parks, Climate Change Conventions, Ramsar Sites."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans text-slate-800">
      <SEOHead
        title="UPSC PYQ Previous Year Question Practice & Analysis"
        description="Solve UPSC CSE Prelims previous year questions (PYQ), subject-wise question banks, and detailed explanations for revision."
        canonicalPath="/upsc-pyq"
      />

      <PublicNavbar activePage="/quiz" />

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-slate-900 via-indigo-950 to-blue-900 text-white py-14 px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto space-y-5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-indigo-500/20 border border-indigo-400/30 rounded-full text-indigo-300 text-xs font-semibold uppercase tracking-wider">
            📜 Educational Resource • UPSC Prelims PYQ
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            UPSC CSE Prelims Previous Year Questions (PYQ)
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Master the core concepts of UPSC Civil Services Examination by analyzing trends, solving previous year question patterns, and practicing subject-wise PYQ sets.
          </p>

          <div className="flex justify-center gap-4 pt-2">
            <Link
              to="/upsc-quiz"
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-md text-xs sm:text-sm transition"
            >
              🎯 Practice UPSC Prelims Quiz ➔
            </Link>
          </div>
        </div>
      </section>

      {/* PYQ Subject Breakdown */}
      <section className="py-12 px-4 max-w-7xl mx-auto w-full">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <h2 className="text-2xl font-extrabold text-slate-900">
            Subject-Wise UPSC Prelims PYQ Coverage
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm mt-1">
            Systematic organization of past decade question patterns for effective revision.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {pyqModules.map((m, idx) => (
            <div key={idx} className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-lg text-xs font-bold">
                  {m.years}
                </span>
                <span className="text-xs font-bold text-slate-500">{m.count}</span>
              </div>

              <h3 className="text-lg font-bold text-slate-900">{m.subject}</h3>

              <p className="text-xs text-slate-600 leading-relaxed">
                <span className="font-semibold text-slate-800">Key Focus Areas:</span> {m.topics}
              </p>

              <div className="pt-2">
                <Link
                  to="/upsc-quiz"
                  className="inline-block text-xs font-bold text-blue-600 hover:underline"
                >
                  Start Practice Questions ➔
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Sample Solved PYQ Example */}
      <section className="bg-white py-12 px-4 border-y border-slate-200">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="text-center">
            <h2 className="text-2xl font-extrabold text-slate-900">
              Sample Solved UPSC PYQ Pattern
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Sample question format illustrating conceptual application.
            </p>
          </div>

          <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between text-xs">
              <span className="px-3 py-1 bg-amber-100 text-amber-900 rounded-full font-bold">
                UPSC CSE Prelims • Sample Question
              </span>
              <span className="text-slate-400">Indian Polity</span>
            </div>

            <h3 className="font-bold text-slate-900 text-base leading-snug">
              Consider the following statements regarding the Right to Equality under Article 14 of the Constitution of India:
            </h3>

            <ol className="list-decimal list-inside text-xs sm:text-sm text-slate-700 space-y-1 pl-2">
              <li>It guarantees equality before the law and equal protection of the laws to all persons within the territory of India.</li>
              <li>It applies to legal entities such as corporations as well as citizens and non-citizens.</li>
            </ol>

            <p className="text-xs font-bold text-slate-800">Which of the statements given above is/are correct?</p>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 bg-white border rounded-lg">A) 1 only</div>
              <div className="p-2.5 bg-white border rounded-lg">B) 2 only</div>
              <div className="p-2.5 bg-green-50 border-green-300 font-bold text-green-900 rounded-lg">C) Both 1 and 2</div>
              <div className="p-2.5 bg-white border rounded-lg">D) Neither 1 nor 2</div>
            </div>

            <div className="pt-2 border-t border-slate-200 text-xs text-slate-600 space-y-1">
              <p className="font-bold text-slate-800">💡 Explanation:</p>
              <p className="leading-relaxed">
                Both statements are correct. Article 14 extends equal protection of laws to all persons, including legal entities like companies, citizens, and foreigners.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Internal Navigation & Educational Disclaimer */}
      <section className="py-12 px-4 max-w-5xl mx-auto w-full space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link
            to="/ssc-pyq"
            className="p-6 bg-white rounded-2xl border border-slate-200 shadow-xs hover:border-blue-400 transition space-y-2"
          >
            <h4 className="font-bold text-slate-900 text-base">📊 SSC PYQ Practice</h4>
            <p className="text-xs text-slate-600">Solve previous year question sets for SSC CGL, CHSL, and MTS examinations.</p>
          </Link>

          <Link
            to="/library-seat-booking"
            className="p-6 bg-white rounded-2xl border border-slate-200 shadow-xs hover:border-blue-400 transition space-y-2"
          >
            <h4 className="font-bold text-slate-900 text-base">🪑 Book a Study Seat</h4>
            <p className="text-xs text-slate-600">Find a quiet library seat near you to focus on your UPSC preparation.</p>
          </Link>
        </div>

        <div className="p-4 bg-slate-100 rounded-xl text-slate-500 text-xs text-center">
          Disclaimer: Educational self-assessment resource for Civil Services aspirants. Library Node is not connected with UPSC or official government bodies.
        </div>
      </section>

      <PublicFooter />
    </div>
  );
}

export default UPSCPyq;
