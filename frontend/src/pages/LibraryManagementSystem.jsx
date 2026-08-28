import React from "react";
import { useNavigate, Link } from "react-router-dom";
import SEOHead from "../components/SEOHead";
import PublicNavbar from "../components/PublicNavbar";
import PublicFooter from "../components/PublicFooter";

function LibraryManagementSystem() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans text-slate-800">
      <SEOHead
        title="Smart Library Management System & Seat Booking Software | LibraryNode"
        description="All-in-one digital library management system for study library owners. Manage seats, track student attendance via QR code, set slot pricing, and grow your library."
        canonicalPath="/library-management-system"
      />

      <PublicNavbar activePage="/library-management-system" />

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-slate-900 via-slate-800 to-blue-950 text-white py-16 px-4 sm:px-6 lg:px-8 text-center relative overflow-hidden">
        <div className="max-w-4xl mx-auto space-y-6 relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-emerald-500/20 border border-emerald-400/30 rounded-full text-emerald-300 text-xs font-semibold uppercase tracking-wider">
            🏫 Software Solution for Study Library Owners
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            Smart Library Management System & Digital Seat Automation
          </h1>

          <p className="text-base sm:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Eliminate manual registers, double-booked seats, and lost student fees. Manage your reading room, seat allocations, QR attendance, and monthly pricing effortless from any device.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={() => navigate("/librarian-register")}
              className="w-full sm:w-auto px-8 py-4 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-2xl shadow-lg transition transform hover:-translate-y-0.5 text-base"
            >
              ➕ Register New Library Account
            </button>
            <button
              onClick={() => navigate("/librarian-login")}
              className="w-full sm:w-auto px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-bold rounded-2xl border border-white/30 backdrop-blur-sm transition text-base"
            >
              🔑 Librarian Portal Login
            </button>
          </div>
        </div>
      </section>

      {/* Main Features Grid */}
      <section className="py-16 px-4 max-w-7xl mx-auto w-full">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Complete Toolkit for Library Owners & Managers
          </h2>
          <p className="text-slate-600 mt-2 text-sm sm:text-base">
            Everything you need to automate daily library operations in one central dashboard.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 space-y-3">
            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center text-xl font-bold">
              🪑
            </div>
            <h3 className="text-lg font-bold text-slate-900">Seat Allocation & Layout</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Configure total library seats, assign reserved desks, and prevent double-booking automatically with real-time seat tracking.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 space-y-3">
            <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center text-xl font-bold">
              📷
            </div>
            <h3 className="text-lg font-bold text-slate-900">QR Code Attendance Scanner</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Scan student digital passes upon entry using mobile or web scanner. Maintain automated, tamper-proof daily attendance logs.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 space-y-3">
            <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center text-xl font-bold">
              💵
            </div>
            <h3 className="text-lg font-bold text-slate-900">Multi-Slot Price Management</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Set custom pricing for Morning, Afternoon, Evening, and Night shifts according to demand in your area.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 space-y-3">
            <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center text-xl font-bold">
              👥
            </div>
            <h3 className="text-lg font-bold text-slate-900">Student Directory & Profiles</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Store student photos, contact numbers, Aadhaar details, active passes, and booking history safely in cloud storage.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 space-y-3">
            <div className="w-12 h-12 bg-rose-50 text-rose-600 rounded-2xl flex items-center justify-center text-xl font-bold">
              🔔
            </div>
            <h3 className="text-lg font-bold text-slate-900">Custom Requests & Notifications</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Receive seat change requests, shift updates, and renewal notifications directly on your librarian dashboard.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 space-y-3">
            <div className="w-12 h-12 bg-cyan-50 text-cyan-600 rounded-2xl flex items-center justify-center text-xl font-bold">
              🌐
            </div>
            <h3 className="text-lg font-bold text-slate-900">Public Listing & Visibility</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Gain online visibility for your study library. Allow students searching online to discover your library and book available seats.
            </p>
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="bg-white py-16 px-4 border-y border-slate-200">
        <div className="max-w-5xl mx-auto space-y-8">
          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Manual Register vs. Library Node System
            </h2>
            <p className="text-slate-600 text-sm mt-2">
              Upgrade your reading room operations from pen-and-paper to digital excellence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 rounded-3xl bg-red-50/60 border border-red-200 space-y-3">
              <h3 className="text-lg font-bold text-red-900 flex items-center gap-2">
                ❌ Traditional Manual Register
              </h3>
              <ul className="space-y-2 text-xs sm:text-sm text-red-800">
                <li>• Lost attendance notebooks and damaged paper logs</li>
                <li>• Frequent seat disputes and double-bookings</li>
                <li>• Difficult to track shift timing compliance</li>
                <li>• Zero online discovery by new students</li>
              </ul>
            </div>

            <div className="p-8 rounded-3xl bg-emerald-50/60 border border-emerald-200 space-y-3">
              <h3 className="text-lg font-bold text-emerald-900 flex items-center gap-2">
                ✅ Library Node Digital Software
              </h3>
              <ul className="space-y-2 text-xs sm:text-sm text-emerald-800">
                <li>• Cloud-backed student profiles & QR attendance</li>
                <li>• Real-time automated seat allocation map</li>
                <li>• Flexible slot pricing and shift controls</li>
                <li>• Instant online listing to attract new students</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4 max-w-7xl mx-auto w-full">
        <div className="bg-gradient-to-r from-blue-900 to-slate-900 rounded-3xl p-8 sm:p-12 text-white text-center space-y-6">
          <h2 className="text-2xl sm:text-4xl font-extrabold">
            Ready to Digitization Your Reading Library?
          </h2>
          <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto">
            Register your library on Library Node today and start managing seats efficiently in minutes.
          </p>
          <div className="pt-2">
            <button
              onClick={() => navigate("/librarian-register")}
              className="px-8 py-4 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-2xl shadow-lg transition text-base"
            >
              ➕ Register Your Library Now
            </button>
          </div>
        </div>
      </section>

      <PublicFooter />
    </div>
  );
}

export default LibraryManagementSystem;
