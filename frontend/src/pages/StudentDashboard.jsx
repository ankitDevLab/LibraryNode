import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";

function StudentDashboard() {
const navigate = useNavigate();
const location = useLocation();
  const student =
    JSON.parse(localStorage.getItem("studentProfile")) || {};
const logout = () => {
  localStorage.removeItem("studentProfile");

  navigate("/");
};
  const bookingData =
  location.state ||
  JSON.parse(
    localStorage.getItem("currentBooking")
  );
  return (
    <div className="min-h-screen bg-slate-100">
      <Navbar title="Student Dashboard" />

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

 <button
  onClick={() => navigate("/student-profile")}
>
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

{/* Action Cards (3 in One Line) */}

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
{/* {bookingData && (
  <div className="bg-white rounded-3xl shadow-lg p-6">

    <h2 className="text-2xl font-bold mb-4">
      Current Library
    </h2>

    <p>
      <strong>Library:</strong> {bookingData.libraryName}
    </p>

    <p className="mt-2">
      <strong>Slot:</strong> {bookingData.slotTime}
    </p>

    <p className="mt-2">
      <strong>Status:</strong>

      <span className="text-green-600 font-bold ml-2">
        Approved
      </span>
    </p>
    <button
  onClick={() => navigate("/booking-history")}
  className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-xl"
>
  View Pass
</button> */}

  {/* </div>
)} */}

      </div>
    </div>
  );
}
export default StudentDashboard;