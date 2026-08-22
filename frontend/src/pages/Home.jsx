import { useNavigate } from "react-router-dom";
import LibraryNodeBrand from "../components/LibraryNodeBrand";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col justify-between items-center p-6 relative overflow-hidden font-sans">
      <div className="flex-1 flex flex-col items-center justify-center z-10 w-full relative max-w-2xl py-10">
        {/* Main Card */}
        <div className="w-full max-w-md bg-white rounded-[2rem] shadow-xl border border-slate-100 p-8 text-center mb-8">
          {/* Logo & Branding */}
          <div className="flex flex-col items-center mb-8">
            <LibraryNodeBrand size="xl" stacked showSubtitle />
            <p className="text-sm font-semibold text-blue-600/80 mt-3 italic">
              Find your space. Book your seat. Focus better.
            </p>
          </div>

          {/* Action Login Buttons */}
          <div className="space-y-4">
            {/* Student Login Button */}
            <button
              onClick={() => navigate("/student-login")}
              className="w-full flex items-center justify-between gap-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl p-4 text-left transition transform hover:scale-[1.01] hover:shadow shadow-md group focus:outline-none"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl bg-blue-500 rounded-xl p-2.5 flex items-center justify-center">
                  🎓
                </span>
                <div>
                  <h3 className="text-base font-bold leading-tight">
                    Student Login
                  </h3>
                  <p className="text-[11px] text-blue-100 mt-0.5">
                    Book seats, manage your bookings
                  </p>
                </div>
              </div>
              <span className="text-lg font-bold group-hover:translate-x-1 transition mr-1">
                ➔
              </span>
            </button>

            {/* Librarian Login Button */}
            <button
              onClick={() => navigate("/librarian-login")}
              className="w-full flex items-center justify-between gap-4 bg-white hover:bg-slate-50 text-blue-600 border border-blue-600/30 hover:border-blue-600 rounded-2xl p-4 text-left transition transform hover:scale-[1.01] hover:shadow-sm group focus:outline-none"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl bg-blue-50 rounded-xl p-2.5 flex items-center justify-center text-slate-700">
                  🏫
                </span>
                <div>
                  <h3 className="text-base font-bold leading-tight text-slate-800">
                    Librarian Login
                  </h3>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Manage library, seats and bookings
                  </p>
                </div>
              </div>
              <span className="text-lg font-bold group-hover:translate-x-1 transition mr-1 text-blue-600">
                ➔
              </span>
            </button>

            {/* Register New Library Button */}
            <button
              onClick={() => navigate("/librarian-register")}
              className="w-full flex items-center justify-between gap-4 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 rounded-2xl p-4 text-left transition transform hover:scale-[1.01] hover:shadow-sm group focus:outline-none"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl bg-white rounded-xl p-2.5 flex items-center justify-center text-emerald-600 shadow-sm">
                  ➕
                </span>
                <div>
                  <h3 className="text-base font-bold leading-tight text-emerald-900">
                    Register New Library
                  </h3>
                  <p className="text-[11px] text-emerald-600 mt-0.5">
                    Create a new library account & start listing seats
                  </p>
                </div>
              </div>
              <span className="text-lg font-bold group-hover:translate-x-1 transition mr-1 text-emerald-600">
                ➔
              </span>
            </button>
          </div>
        </div>

        {/* Feature Row */}
        <div className="w-full max-w-lg bg-white rounded-2xl p-4 border border-slate-100 shadow-sm">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center sm:text-left">
            <div className="sm:border-r border-slate-200/50 sm:pr-3 last:border-0">
              <h4 className="text-xs font-bold text-slate-800 mb-0.5">
                ⚡ Smart Seat Booking
              </h4>
              <p className="text-[10px] text-slate-500 leading-tight">
                Book your favorite seat in real time
              </p>
            </div>

            <div className="sm:border-r border-slate-200/50 sm:px-3 last:border-0">
              <h4 className="text-xs font-bold text-slate-800 mb-0.5">
                🛡️ Secure & Reliable
              </h4>
              <p className="text-[10px] text-slate-500 leading-tight">
                Your data and bookings are safe
              </p>
            </div>

            <div className="sm:pl-3">
              <h4 className="text-xs font-bold text-slate-800 mb-0.5">
                📈 Better Management
              </h4>
              <p className="text-[10px] text-slate-500 leading-tight">
                Efficient library and seat management
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full text-center py-4 z-10 mt-auto">
        <p className="text-xs text-slate-400 font-medium">
          © 2025 Library Node. All rights reserved.
        </p>
      </footer>
    </div>
  );
}

export default Home;