import { useState, useEffect } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";

function BookingHistory() {
  const navigate = useNavigate();

  const [filter, setFilter] = useState("All");
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const student = JSON.parse(
        localStorage.getItem("studentProfile")
      );
      if (!student?._id) return;

      const response = await API.get(`/bookings?studentId=${student._id}`);

      setBookings(response.data.bookings);
    } catch (error) {
      console.error(error);
    }
  };

  const currentBooking =
    bookings.find((b) => b.status === "Approved") || null;

  const filteredBookings = (
    filter === "All"
      ? bookings
      : bookings.filter(
          (booking) =>
            (booking.status || "Pending") === filter
        )
  ).filter(
    (booking) => booking._id !== currentBooking?._id
  );

  return (
    <div className="min-h-screen bg-slate-100 p-5">
      <div className="max-w-5xl mx-auto">

        {/* Header */}

        <div className="flex justify-between items-center mb-6">

          <h1 className="text-4xl font-bold">
            Booking History
          </h1>

          <button
            onClick={() => navigate("/student-dashboard")}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg"
          >
            Back
          </button>

        </div>

        {/* Current Library */}

        {currentBooking && (

          <div className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-3xl p-6 mb-6">

            <h2 className="text-2xl font-bold">
              Current Library
            </h2>

            <p className="mt-3">
              📚 {currentBooking.libraryName}
            </p>

            <p>
              💺 Seat {currentBooking.seatNumber}
            </p>

            <p>
              ⏰{" "}
              {currentBooking.slotSnapshot?.name ||
                currentBooking.slot}
            </p>

            <p className="mt-2 font-bold text-green-200">
              ✅ Approved
            </p>

            <button
              onClick={() =>
                navigate("/student-pass", {
                  state: currentBooking,
                })
              }
              className="mt-4 bg-white text-blue-600 px-4 py-2 rounded-xl font-semibold"
            >
              View QR Pass
            </button>

          </div>

        )}

        {/* Filter */}

        <div className="flex gap-3 mb-6 flex-wrap">

          {[
            "All",
            "Approved",
            "Pending",
            "Rejected",
          ].map((status) => (

            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded-lg ${
                filter === status
                  ? "bg-blue-600 text-white"
                  : "bg-white"
              }`}
            >
              {status}
            </button>

          ))}

        </div>

        {/* Booking Cards */}

        {filteredBookings.length === 0 ? (

          <div className="bg-white p-8 rounded-2xl shadow text-center">

            <h2 className="text-xl font-bold">
              No Bookings Found
            </h2>

            <button
              onClick={() => navigate("/libraries")}
              className="mt-5 bg-blue-600 text-white px-5 py-2 rounded-lg"
            >
              Browse Libraries
            </button>

          </div>

        ) : (

          filteredBookings.map((booking) => (

            <div
              key={booking._id}
              className="bg-white rounded-3xl shadow-lg p-6 mb-5"
            >

              <p>
                <strong>Library:</strong>{" "}
                {booking.libraryName}
              </p>

              <p className="mt-2">
                <strong>Seat:</strong>{" "}
                {booking.seatNumber}
              </p>

              <p className="mt-2">
                <strong>Slot:</strong>{" "}
                {booking.slotSnapshot?.name ||
                  booking.slot}
              </p>

              <p className="mt-2">
                <strong>Plan:</strong>{" "}
                {booking.planDuration} Month
              </p>

              <p className="mt-2">
                <strong>Amount:</strong> ₹
                {booking.amount}
              </p>

              <div className="mt-4">

                <span
                  className={`px-3 py-1 rounded-full font-bold text-sm ${
                    (booking.status || "Pending") ===
                    "Approved"
                      ? "bg-green-100 text-green-700"
                      : (booking.status ||
                          "Pending") ===
                        "Rejected"
                      ? "bg-red-100 text-red-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {booking.status || "Pending"}
                </span>

              </div>

              {(booking.status || "Pending") ===
                "Approved" && (

                <button
                  onClick={() =>
                    navigate("/student-pass", {
                      state: booking,
                    })
                  }
                  className="mt-4 bg-green-600 text-white px-4 py-2 rounded-lg"
                >
                  View QR Pass
                </button>

              )}

            </div>

          ))

        )}

      </div>
    </div>
  );
}

export default BookingHistory;