import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

function LibrarianLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const loginLibrarian = async () => {
    try {
      setErrorMessage("");

      const cleanEmail = email.trim().toLowerCase();
      if (!cleanEmail || !password) {
        setErrorMessage("Please enter both email and password.");
        return;
      }

      const response = await API.post("/librarians/login", {
        email: cleanEmail,
        password,
      });

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
      console.error("Librarian login error:", error);

      setErrorMessage(
        error.response?.data?.message ||
        "You are not a valid librarian. Please contact LibrarySphere Administration."
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 p-5">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
        {/* Logo */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center gap-3">
            <img
              src="/logo.png"
              alt="LibrarySphere"
              className="w-20 h-20 object-contain"
            />

            <div>
              <h1 className="text-2xl font-bold text-blue-600">
                LibrarySphere
              </h1>
              <p className="text-sm text-slate-500">
                Library Booking Platform
              </p>
            </div>
          </div>
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
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold"
        >
          Login
        </button>

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
        <div className="mt-6 border border-blue-200 bg-blue-50 rounded-2xl p-5">
          <a
            href="https://wa.me/917520960847"
            target="_blank"
            rel="noreferrer"
            className="flex flex-col items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold transition text-center"
          >
            <span>💬 Contact on WhatsApp</span>
            <span>If you want to register your library</span>
          </a>
        </div>
      </div>
    </div>
  );
}

export default LibrarianLogin;