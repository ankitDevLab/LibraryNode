import React from "react";
import { useNavigate, Link } from "react-router-dom";
import SEOHead from "../components/SEOHead";
import PublicNavbar from "../components/PublicNavbar";
import PublicFooter from "../components/PublicFooter";

function LibrarySeatBooking() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans text-slate-800">
      <SEOHead
        title="Library Seat Booking Online | Find & Reserve Study Seats"
        description="Book library study seats online with Library Node. Discover quiet study spaces, check real-time seat availability, select preferred time slots, and reserve your seat instantly."
        canonicalPath="/library-seat-booking"
      />

      <PublicNavbar activePage="/library-seat-booking" />

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-blue-900 via-blue-800 to-slate-900 text-white py-16 px-4 sm:px-6 lg:px-8 text-center relative overflow-hidden">
        <div className="max-w-4xl mx-auto space-y-6 relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-500/20 border border-blue-400/30 rounded-full text-blue-300 text-xs font-semibold uppercase tracking-wider">
            ⚡ Instant Online Study Seat Booking
          </div>
          
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            Online Library Seat Booking & Study Space Reservation
          </h1>

          <p className="text-base sm:text-xl text-blue-100 max-w-2xl mx-auto leading-relaxed">
            Reserve your quiet study seat in top libraries across India. Check real-time seat status, pick your ideal shift, and receive instant digital entry passes.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={() => navigate("/libraries")}
              className="w-full sm:w-auto px-8 py-4 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-2xl shadow-lg hover:shadow-xl transition transform hover:-translate-y-0.5 text-base"
            >
              🔍 Browse Available Libraries
            </button>
            <button
              onClick={() => navigate("/student-register")}
              className="w-full sm:w-auto px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-bold rounded-2xl border border-white/30 backdrop-blur-sm transition text-base"
            >
              🎓 Register Student Account
            </button>
          </div>
        </div>
      </section>

      {/* Key Benefits */}
      <section className="py-16 px-4 max-w-7xl mx-auto w-full">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Why Book Your Study Seat with Library Node?
          </h2>
          <p className="text-slate-600 mt-2 text-sm sm:text-base">
            No more early morning rush or lost seats. Book your study environment from anywhere.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 hover:shadow-md transition">
            <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center text-2xl font-bold mb-5">
              🪑
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">
              Real-Time Seat Availability
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              View live seat matrix before stepping out of home. Know exactly which desks are available in your favorite reading room.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 hover:shadow-md transition">
            <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center text-2xl font-bold mb-5">
              ⏰
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">
              Flexible Shift & Slot Options
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Choose from Morning, Afternoon, Evening, or Night shifts tailored for competitive exam aspirants preparing for UPSC, SSC, NEET, or JEE.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 hover:shadow-md transition">
            <div className="w-14 h-14 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center text-2xl font-bold mb-5">
              📱
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">
              Instant Digital Pass & QR Attendance
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Get an official digital seat pass on your phone with instant QR check-in when entering the library building.
            </p>
          </div>
        </div>
      </section>

      {/* How it Works Step-by-Step */}
      <section className="bg-white py-16 px-4 border-y border-slate-200">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              3 Simple Steps to Reserve Your Library Seat
            </h2>
            <p className="text-slate-600 mt-2 text-sm">
              Quick, hassle-free study seat booking in under 2 minutes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="space-y-4">
              <div className="w-12 h-12 bg-blue-600 text-white font-black text-xl rounded-full flex items-center justify-center mx-auto shadow-md">
                1
              </div>
              <h3 className="text-lg font-bold text-slate-900">Search Nearby Libraries</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed px-4">
                Explore verified study libraries in your city with details on seat count, monthly fees, and available amenities.
              </p>
            </div>

            <div className="space-y-4">
              <div className="w-12 h-12 bg-blue-600 text-white font-black text-xl rounded-full flex items-center justify-center mx-auto shadow-md">
                2
              </div>
              <h3 className="text-lg font-bold text-slate-900">Choose Slot & Desk</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed px-4">
                Select your preferred study timing (Morning, Afternoon, Evening, Night) and reserve your preferred seat.
              </p>
            </div>

            <div className="space-y-4">
              <div className="w-12 h-12 bg-blue-600 text-white font-black text-xl rounded-full flex items-center justify-center mx-auto shadow-md">
                3
              </div>
              <h3 className="text-lg font-bold text-slate-900">Study Without Distraction</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed px-4">
                Present your digital library ID card upon arrival and focus on your exam preparation in peace.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Cities & Locations */}
      <section className="py-16 px-4 max-w-7xl mx-auto w-full">
        <div className="bg-gradient-to-r from-slate-900 to-blue-900 rounded-3xl p-8 sm:p-12 text-white text-center space-y-6">
          <h2 className="text-2xl sm:text-4xl font-extrabold">
            Find Library Seats in Major Educational Hubs
          </h2>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto">
            Library Node connects students with top reading rooms in Patna, Delhi, Kota, Jaipur, Prayagraj, Lucknow, Indore, and across India.
          </p>
          <div className="flex flex-wrap justify-center gap-3 pt-2">
            <Link to="/libraries" className="px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl text-xs sm:text-sm font-semibold transition">
              Patna Libraries
            </Link>
            <Link to="/libraries" className="px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl text-xs sm:text-sm font-semibold transition">
              Delhi Libraries
            </Link>
            <Link to="/libraries" className="px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl text-xs sm:text-sm font-semibold transition">
              Kota Libraries
            </Link>
            <Link to="/libraries" className="px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl text-xs sm:text-sm font-semibold transition">
              Jaipur Libraries
            </Link>
            <Link to="/libraries" className="px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl text-xs sm:text-sm font-semibold transition">
              Prayagraj Libraries
            </Link>
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="bg-white py-16 px-4 border-t border-slate-200">
        <div className="max-w-4xl mx-auto space-y-8">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 text-center">
            Frequently Asked Questions (FAQs)
          </h2>

          <div className="space-y-6">
            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200">
              <h3 className="font-bold text-slate-900 text-base mb-2">
                How do I book a library seat online on Library Node?
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Simply register or login as a student, browse available libraries in your city, choose your desired time slot (morning, afternoon, evening, or night), and confirm your reservation to generate your instant digital pass.
              </p>
            </div>

            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200">
              <h3 className="font-bold text-slate-900 text-base mb-2">
                Can I choose a specific shift or timing?
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Yes! Libraries listed on Library Node provide flexible shift options such as Morning (06:00 AM - 11:00 AM), Afternoon (11:00 AM - 04:00 PM), Evening (04:00 PM - 09:00 PM), and Night (09:00 PM - 06:00 AM).
              </p>
            </div>

            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200">
              <h3 className="font-bold text-slate-900 text-base mb-2">
                Is Library Node free for students?
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Student account creation and searching libraries on Library Node is completely free. Seat fees are set directly by individual library owners.
              </p>
            </div>
          </div>
        </div>
      </section>

      <PublicFooter />
    </div>
  );
}

export default LibrarySeatBooking;
