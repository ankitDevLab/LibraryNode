import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import LibraryNodeBrand from "../components/LibraryNodeBrand";

function LibrarianLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSlow, setIsSlow] = useState(false);
  const slowTimerRef = useRef(null);

  // Clean up timer on unmount
  useEffect(() => {
    return () => {
      if (slowTimerRef.current) clearTimeout(slowTimerRef.current);
    };
  }, []);

  const loginLibrarian = async () => {
    try {
      setErrorMessage("");
      setLoading(true);
      setIsSlow(false);

      const cleanEmail = email.trim().toLowerCase();
      if (!cleanEmail || !password) {
        setErrorMessage("Please enter both email and password.");
        return;
      }

      // Start a 5s timer — if the request hasn't resolved, show cold-start warning
      slowTimerRef.current = setTimeout(() => setIsSlow(true), 5000);

      const response = await API.post("/librarians/login", {
        email: cleanEmail,
        password,
      });

      clearTimeout(slowTimerRef.current);
      const lib = response.data.librarian;
      localStorage.setItem("librarian", JSON.stringify(lib));

      const rawLibraryId = lib?.libraryId;
      const libraryId = typeof rawLibraryId === "object" ? rawLibraryId?._id : rawLibraryId;

      if (libraryId) {
        localStorage.setItem("libraryId", String(libraryId));
      }

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
      }

      navigate("/librarian-dashboard");
    } catch (error) {
      clearTimeout(slowTimerRef.current);
      console.error("Librarian login error:", error);

      setErrorMessage(
        error.response?.data?.message ||
        "You are not a valid librarian. Please contact Library Node Administration."
      );
    } finally {
      setLoading(false);
      setIsSlow(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 p-5">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
        {/* Logo */}
        <div className="flex items-center justify-center mb-8">
          <LibraryNodeBrand size="lg" showSubtitle subtitleText="Library Booking Platform" />
        </div>

        <h2 className="text-3xl font-bold text-center mb-6">
          Librarian Login
        </h2>

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border rounded-lg p-3 mb-4"
        />

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border rounded-lg p-3 mb-4"
        />

        <button
          onClick={loginLibrarian}
          disabled={loading}
          className={`w-full py-3 rounded-lg text-white font-semibold transition-all ${
            loading
              ? "bg-blue-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading ? (
            <>
              <span className="auth-spinner" />
              Logging in...
            </>
          ) : (
            "Login"
          )}
        </button>

        {/* Cold-start warning — appears after 5s of waiting */}
        {isSlow && (
          <div className="cold-start-warning">
            <span className="cold-start-icon">⏳</span>
            <span>
              First login may take up to a minute while the server wakes up. Please wait...
            </span>
          </div>
        )}

        {/* Error Message */}
        {errorMessage && (
          <div className="mt-6 border border-red-200 bg-red-50 rounded-2xl p-5">
            <div className="flex items-start gap-3">
              <div className="text-3xl">🚫</div>

              <div>
                <h3 className="text-lg font-bold text-red-700">
                  Access Denied
                </h3>

                <p className="text-gray-700 mt-2">
                  {errorMessage}
                </p>
              </div>
            </div>

            <a
              href="https://wa.me/917520960847"
              target="_blank"
              rel="noreferrer"
              className="mt-5 flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold transition"
            >
              💬 Contact on WhatsApp
            </a>
          </div>
        )}

        <p className="text-center text-sm text-slate-500 mt-8">
          Only authorized librarians can access the dashboard.
        </p>

        {/* Register Library Box */}
        <div className="mt-6 border border-blue-200 bg-blue-50/70 rounded-2xl p-5 space-y-3">
          <button
            type="button"
            onClick={() => navigate("/librarian-register")}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-bold transition shadow-sm text-center flex items-center justify-center gap-2"
          >
            ➕ Register New Library Account
          </button>

          <a
            href="https://wa.me/917520960847"
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white py-2.5 rounded-xl font-semibold transition text-center text-sm"
          >
            💬 Contact on WhatsApp Support
          </a>
        </div>
      </div>
    </div>
  );
}

export default LibrarianLogin;