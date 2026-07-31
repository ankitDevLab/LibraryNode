import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

function StudentDashboard() {
  const navigate = useNavigate();

  const [activeModule, setActiveModule] = useState("library");
  const [currentBooking, setCurrentBooking] = useState(null);

  const [student, setStudent] = useState(
    JSON.parse(localStorage.getItem("studentProfile")) || {}
  );

  const logout = () => {
    localStorage.removeItem("studentProfile");
    navigate("/");
  };

  // Fetch current booking and fresh student profile from MongoDB on mount
  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        if (!student?._id) return;

        // Fetch fresh profile info
        const profileRes = await API.get(`/students/${student._id}`);
        if (profileRes.data.success) {
          const freshStudent = profileRes.data.student;
          setStudent(freshStudent);
          localStorage.setItem("studentProfile", JSON.stringify(freshStudent));
        }

        // Fetch current booking (filtered by studentId on backend)
        const bookingsRes = await API.get(`/bookings?studentId=${student._id}`);
        const myBookings = bookingsRes.data.bookings;

        // Prioritize Approved, then Pending
        const approved = myBookings.find(
          (b) => b.status === "Approved"
        );
        const pending = myBookings.find(
          (b) => b.status === "Pending"
        );

        setCurrentBooking(approved || pending || null);
      } catch (error) {
        console.error("Failed to load dashboard data:", error);
      }
    };

    loadDashboardData();
  }, []);

  return (
    <div className="min-h-screen bg-slate-100">

      <div className="max-w-6xl mx-auto p-5">

        {/* Header */}
        <div className="bg-white shadow-sm rounded-2xl px-6 py-4 flex justify-between items-center mb-6">

          <div className="flex items-center gap-3">

            <img
              src="/logo.png"
              alt="LibrarySphere"
              className="w-12 h-12"
            />

            <h1 className="text-3xl font-bold text-blue-600">
              LibrarySphere
            </h1>

          </div>

          <button onClick={() => navigate("/student-profile")}>
            <img
              src={
                student.photo ||
                "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
              }
              alt="Profile"
              className="w-12 h-12 rounded-full border-2 border-slate-200 hover:scale-105 transition"
            />
          </button>

        </div>

        {/* Welcome Card */}
        <div className="bg-white rounded-3xl shadow-lg p-6 mb-6">

          <h2 className="text-3xl font-bold">
            Welcome, {student.name || "Student"} 👋
          </h2>

          <p className="text-slate-500 mt-2">
            Explore libraries, book seats, and manage your bookings with ease.
          </p>

        </div>

        {/* Module Switch */}
        <div className="flex justify-center gap-4 my-6">

          <button
            onClick={() => setActiveModule("library")}
            className={`px-6 py-3 rounded-xl font-semibold transition ${activeModule === "library"
              ? "bg-blue-600 text-white"
              : "bg-white border border-blue-600 text-blue-600"
              }`}
          >
            📚 Library Booking
          </button>

          <button
            onClick={() => setActiveModule("quiz")}
            className={`px-6 py-3 rounded-xl font-semibold transition ${activeModule === "quiz"
              ? "bg-blue-600 text-white"
              : "bg-white border border-blue-600 text-blue-600"
              }`}
          >
            📝 Quiz Practice
          </button>

        </div>

        {activeModule === "library" && (
          <>

            {/* Hero Card */}
            <div className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-3xl p-8 shadow-lg mb-6">

              <h2 className="text-4xl font-bold">
                Book a Library
              </h2>

              <p className="mt-2 text-lg opacity-90">
                Find and reserve your perfect study space.
              </p>

              <button
                onClick={() => navigate("/libraries")}
                className="mt-5 bg-white text-blue-600 px-6 py-3 rounded-xl font-bold"
              >
                View Libraries
              </button>

            </div>

            {/* Action Cards */}

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">

              <button
                onClick={() => navigate("/notifications")}
                className="bg-orange-500 text-white rounded-2xl p-5 shadow-lg hover:scale-105 transition"
              >
                <div className="text-3xl">🔔</div>

                <p className="mt-2 font-semibold">
                  Notifications
                </p>
              </button>

              <button
                onClick={() => navigate("/booking-history")}
                className="bg-purple-600 text-white rounded-2xl p-5 shadow-lg hover:scale-105 transition"
              >
                <div className="text-3xl">📖</div>

                <p className="mt-2 font-semibold">
                  My Bookings
                </p>
              </button>

              <button
                onClick={() => navigate("/student-id-card")}
                className="bg-green-600 text-white rounded-2xl p-5 shadow-lg hover:scale-105 transition"
              >
                <div className="text-3xl">🪪</div>

                <p className="mt-2 font-semibold">
                  ID Card
                </p>
              </button>

            </div>

            {/* Current Library */}

            {currentBooking && (
              <div className="bg-white rounded-3xl shadow-lg p-6">

                <h2 className="text-2xl font-bold mb-4">
                  Current Library
                </h2>

                <p>
                  <strong>Library:</strong> {currentBooking.libraryName}
                </p>

                <p className="mt-2">
                  <strong>Seat:</strong> {currentBooking.seatNumber}
                </p>

                <p className="mt-2">
                  <strong>Slot:</strong>{" "}
                  {currentBooking.slotSnapshot?.name || currentBooking.slot}
                </p>

                <p className="mt-2">
                  <strong>Status:</strong>

                  <span
                    className={`font-bold ml-2 ${currentBooking.status === "Approved"
                      ? "text-green-600"
                      : "text-yellow-600"
                      }`}
                  >
                    {currentBooking.status}
                  </span>

                </p>

                <button
                  onClick={() => navigate("/booking-history")}
                  className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-xl"
                >
                  {currentBooking.status === "Approved"
                    ? "View Pass"
                    : "View Details"}
                </button>

              </div>
            )}

          </>
        )}

        {activeModule === "quiz" && (
          <>

            {/* Quiz Header */}
            <div className="bg-white rounded-3xl shadow-lg p-6">

              <div className="flex justify-between items-center mb-8">

                <div>
                  <h2 className="text-3xl font-bold text-blue-600">
                    📝 Quiz Practice
                  </h2>

                  <p className="text-slate-500 mt-1">
                    Practice competitive exam questions.
                  </p>
                </div>

                <button
                  onClick={() => navigate("/quiz-history")}
                  className="bg-slate-200 hover:bg-slate-300 px-5 py-3 rounded-xl font-semibold"
                >
                  📊 History
                </button>

              </div>

              {/* Exam Cards */}

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                <button
                  onClick={() => navigate("/quiz/ssc")}
                  className="bg-blue-600 hover:bg-blue-700 text-white rounded-2xl p-8 transition transform hover:scale-105 shadow-lg"
                >
                  <div className="text-5xl mb-4">
                    🎯
                  </div>

                  <h3 className="text-2xl font-bold">
                    SSC
                  </h3>

                  <p className="mt-2 opacity-90">
                    CGL • CHSL • MTS • GD
                  </p>

                </button>

                <button
                  onClick={() => navigate("/quiz/banking")}
                  className="bg-green-600 hover:bg-green-700 text-white rounded-2xl p-8 transition transform hover:scale-105 shadow-lg"
                >
                  <div className="text-5xl mb-4">
                    🏦
                  </div>

                  <h3 className="text-2xl font-bold">
                    Banking
                  </h3>

                  <p className="mt-2 opacity-90">
                    SBI • IBPS • RBI
                  </p>

                </button>

                <button
                  onClick={() => navigate("/quiz/upsc")}
                  className="bg-purple-600 hover:bg-purple-700 text-white rounded-2xl p-8 transition transform hover:scale-105 shadow-lg"
                >
                  <div className="text-5xl mb-4">
                    🇮🇳
                  </div>

                  <h3 className="text-2xl font-bold">
                    UPSC
                  </h3>

                  <p className="mt-2 opacity-90">
                    IAS • IPS • IFS
                  </p>

                </button>

              </div>

              {/* Coming Soon */}

              <div className="mt-10 bg-slate-100 rounded-2xl p-6 text-center">

                <h3 className="text-xl font-bold">
                  🚀 More Exams Coming Soon
                </h3>

                <p className="text-slate-500 mt-2">
                  Railway • BPSC • Bihar Police • NDA • CDS • CUET • JEE • NEET
                </p>

              </div>

            </div>

          </>
        )}

      </div>

    </div>
  );
}

export default StudentDashboard;