import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LibraryNodeBrand from "./LibraryNodeBrand";

function PublicNavbar({ activePage = "" }) {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Seat Booking", path: "/library-seat-booking" },
    { name: "Library Software", path: "/library-management-system" },
    { name: "Browse Libraries", path: "/libraries" },
    { name: "Practice Quizzes", path: "/quiz" },
  ];

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand */}
        <Link to="/" className="flex items-center">
          <LibraryNodeBrand size="sm" />
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`transition-colors ${
                activePage === link.path
                  ? "text-blue-600 font-bold border-b-2 border-blue-600 pb-1"
                  : "text-slate-600 hover:text-blue-600"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Action Buttons */}
        <div className="hidden lg:flex items-center space-x-3">
          <button
            onClick={() => navigate("/student-login")}
            className="px-4 py-2 text-sm font-semibold text-blue-600 border border-blue-600/30 hover:bg-blue-50 rounded-xl transition"
          >
            Student Login
          </button>
          <button
            onClick={() => navigate("/librarian-register")}
            className="px-4 py-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-xs transition"
          >
            Register Library
          </button>
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="flex md:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-600 hover:text-slate-900 focus:outline-none"
            aria-label="Toggle menu"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3 shadow-lg">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-semibold text-slate-700 hover:text-blue-600 py-1.5"
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-3 border-t border-slate-100 flex flex-col space-y-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                navigate("/student-login");
              }}
              className="w-full py-2.5 text-center text-sm font-bold text-blue-600 border border-blue-600/30 rounded-xl"
            >
              Student Login
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                navigate("/librarian-register");
              }}
              className="w-full py-2.5 text-center text-sm font-bold text-white bg-blue-600 rounded-xl"
            >
              Register Library
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

export default PublicNavbar;
