import { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import API from "../api/axios";

function BookingStatus() {
  const navigate = useNavigate();
  const { state: booking } = useLocation();

  const saved = useRef(false);

  useEffect(() => {
    if (!booking || saved.current) return;

    saved.current = true;

    const saveBooking = async () => {
      try {
        const response = await API.post("/bookings", booking);

        console.log(response.data);

      } catch (err) {
        console.error(err);
      }
    };

    saveBooking();
  }, [booking]);

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center">

      <div className="bg-white rounded-3xl shadow-xl p-8 w-[420px]">

        <h1 className="text-3xl font-bold text-center">
          Booking Pending
        </h1>

        <p className="text-center text-slate-500 mt-2">
          Waiting for librarian approval.
        </p>

        {booking && (

          <div className="mt-6 space-y-2">

            <p>
              <strong>Library:</strong> {booking.libraryName}
            </p>

            <p>
              <strong>Seat:</strong> {booking.seatNumber}
            </p>

            <p>
              <strong>Slot:</strong> {booking.slotSnapshot.name}
            </p>

            <p>
              <strong>Amount:</strong> ₹{booking.amount}
            </p>

            <div className="pt-3">

              <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full">
                Pending
              </span>

            </div>

          </div>

        )}

        <button
          onClick={() => navigate("/student-dashboard")}
          className="mt-8 w-full bg-blue-600 text-white py-3 rounded-xl"
        >
          Back to Dashboard
        </button>

      </div>

    </div>
  );
}

export default BookingStatus;