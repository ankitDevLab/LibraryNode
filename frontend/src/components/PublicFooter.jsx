import React from "react";
import { Link } from "react-router-dom";
import LibraryNodeBrand from "./LibraryNodeBrand";

function PublicFooter() {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-12 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-5 grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
        {/* Brand Column */}
        <div className="space-y-4 md:col-span-1">
          <div className="bg-white/10 p-3 rounded-2xl inline-block backdrop-blur-sm">
            <LibraryNodeBrand size="md" />
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Library Node is India's premier study space reservation and digital library seat management platform. Empowering students with quiet study seats and library owners with smart seat automation.
          </p>
          <div className="pt-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></span>
              Live Seat Reservation System
            </span>
          </div>
        </div>

        {/* Library Solutions */}
        <div>
          <h4 className="text-white font-bold text-sm mb-4 tracking-wide uppercase">
            Library Solutions
          </h4>
          <ul className="space-y-2.5 text-xs text-slate-400">
            <li>
              <Link to="/library-seat-booking" className="hover:text-blue-400 transition">
                Library Seat Booking
              </Link>
            </li>
            <li>
              <Link to="/library-management-system" className="hover:text-blue-400 transition">
                Library Management System
              </Link>
            </li>
            <li>
              <Link to="/libraries" className="hover:text-blue-400 transition">
                Find Study Libraries
              </Link>
            </li>
            <li>
              <Link to="/student-login" className="hover:text-blue-400 transition">
                Student Portal Login
              </Link>
            </li>
            <li>
              <Link to="/librarian-register" className="hover:text-blue-400 transition">
                Register New Library
              </Link>
            </li>
          </ul>
        </div>

        {/* Practice & Quizzes */}
        <div>
          <h4 className="text-white font-bold text-sm mb-4 tracking-wide uppercase">
            Exam Prep & Quizzes
          </h4>
          <ul className="space-y-2.5 text-xs text-slate-400">
            <li>
              <Link to="/quiz" className="hover:text-blue-400 transition">
                All Practice Quizzes
              </Link>
            </li>
            <li>
              <Link to="/upsc-quiz" className="hover:text-blue-400 transition">
                UPSC Mock Quizzes
              </Link>
            </li>
            <li>
              <Link to="/upsc-pyq" className="hover:text-blue-400 transition">
                UPSC PYQ Practice
              </Link>
            </li>
            <li>
              <Link to="/ssc-quiz" className="hover:text-blue-400 transition">
                SSC Exam Quizzes
              </Link>
            </li>
            <li>
              <Link to="/ssc-pyq" className="hover:text-blue-400 transition">
                SSC PYQ Practice
              </Link>
            </li>
          </ul>
        </div>

        {/* Search Intent & Topics */}
        <div>
          <h4 className="text-white font-bold text-sm mb-4 tracking-wide uppercase">
            Popular Topics
          </h4>
          <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-400">
            <Link to="/library-seat-booking" className="px-2.5 py-1 bg-slate-800 rounded-md hover:bg-blue-600 hover:text-white transition">
              Online Seat Booking
            </Link>
            <Link to="/library-management-system" className="px-2.5 py-1 bg-slate-800 rounded-md hover:bg-blue-600 hover:text-white transition">
              Seat Software
            </Link>
            <Link to="/libraries" className="px-2.5 py-1 bg-slate-800 rounded-md hover:bg-blue-600 hover:text-white transition">
              Study Space Finder
            </Link>
            <Link to="/upsc-quiz" className="px-2.5 py-1 bg-slate-800 rounded-md hover:bg-blue-600 hover:text-white transition">
              UPSC Prelims MCQs
            </Link>
            <Link to="/ssc-pyq" className="px-2.5 py-1 bg-slate-800 rounded-md hover:bg-blue-600 hover:text-white transition">
              SSC CGL Practice
            </Link>
          </div>
          <p className="text-[11px] text-slate-500 mt-4 leading-normal">
            Disclaimer: Library Node provides educational practice & library software services. Not affiliated with government agencies.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-5 pt-6 border-t border-slate-800/80 text-center text-xs text-slate-500 flex flex-col sm:flex-row justify-between items-center gap-3">
        <p>© 2025-2026 Library Node. All rights reserved.</p>
        <p className="text-[11px]">
          https://librarynode.online • Smart Library Booking & Practice Platform
        </p>
      </div>
    </footer>
  );
}

export default PublicFooter;
