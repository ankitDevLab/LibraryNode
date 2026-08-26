import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import API from "../api/axios";

function BookingStatus() {
  const navigate = useNavigate();
  const { state: navigationBooking } = useLocation();

  const [displayBooking, setDisplayBooking] = useState(navigationBooking || null);
  const saved = useRef(false);

  useEffect(() => {
    // 1. If booking came via navigation state, submit it once
    if (navigationBooking && !saved.current) {
      saved.current = true;
      const saveBooking = async () => {
        try {
          const response = await API.post("/bookings", navigationBooking);
          if (response.data?.booking) {
            setDisplayBooking(response.data.booking);
          }
        } catch (err) {
          console.error("Booking creation error:", err);
        }
      };
      saveBooking();
      return;
    }

    // 2. If direct access/refresh without state, attempt to fetch student's latest booking
    if (!navigationBooking) {
      const fetchLatestBooking = async () => {
        try {
          const student = JSON.parse(localStorage.getItem("studentProfile"));
          if (!student?._id) return;

          const res = await API.get(`/bookings?studentId=${student._id}`);
          const bookings = res.data?.bookings || [];
          if (bookings.length > 0) {
            // Pick most recent pending or approved booking
            const latest = bookings[bookings.length - 1];
            setDisplayBooking(latest);
          }
        } catch (err) {
          console.error("Failed to load booking details:", err);
        }
      };
      fetchLatestBooking();
    }
  }, [navigationBooking]);

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center">
          Booking Status
        </h1>

        <p className="text-center text-slate-500 mt-2">
          {displayBooking?.status === "Approved"
            ? "Your seat booking is approved!"
            : "Waiting for librarian approval."}
        </p>

        {displayBooking ? (
          <div className="mt-6 space-y-2">
            <p>
              <strong>Library:</strong> {displayBooking.libraryName}
            </p>

            <p>
              <strong>Seat:</strong> {displayBooking.seatNumber}
            </p>

            <p>
              <strong>Slot:</strong>{" "}
              {displayBooking.slotSnapshot?.name || displayBooking.slotId || "Standard"}
            </p>

            <p>
              <strong>Amount:</strong> ₹{displayBooking.amount}
            </p>

            <div className="pt-3">
              <span
                className={`px-3 py-1 rounded-full text-sm font-semibold ${
                  displayBooking.status === "Approved"
                    ? "bg-green-100 text-green-700"
                    : displayBooking.status === "Rejected"
                    ? "bg-red-100 text-red-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {displayBooking.status || "Pending"}
              </span>
            </div>
          </div>
        ) : (
          <div className="mt-6 text-center text-slate-400 py-4">
            No active booking selection found.
          </div>
        )}

        <button
          onClick={() => navigate("/student-dashboard")}
          className="mt-8 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-bold transition"
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  );
}

export default BookingStatus;