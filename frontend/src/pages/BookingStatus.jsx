import { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import API from "../api/axios";
function BookingStatus() {
  const location = useLocation();
  const navigate = useNavigate();

  const booking = location.state;
  console.log(booking);
const savedRef = useRef(false);

useEffect(() => {
  if (savedRef.current) return;

  savedRef.current = true;

  const saveBooking = async () => {
    try {
      console.log("BOOKING DATA:", booking);

      if (!booking) return;
      console.log("BOOKING OBJECT:", booking);
  const response = await API.get(
  "/bookings",
  {
    studentId: booking.studentId,
    libraryId: booking.libraryId,
    libraryName: booking.libraryName,
    seatNumber: booking.seatNumber,
    slot: booking.slotTime,
    planDuration: booking.planDuration,
    amount: booking.amount,
  }
);

      console.log("BOOKING RESPONSE:", response.data);
    } catch (error) {
      console.error("BOOKING ERROR:", error);
      console.log(error.response?.data);
    }
  };

  saveBooking();
}, [booking]);
  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-5">
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full">

        <div className="text-center">
          <div className="text-6xl mb-4">
            ⏳
          </div>

          <h1 className="text-3xl font-bold">
            Booking Pending
          </h1>

          <p className="text-slate-500 mt-3">
            Waiting for librarian approval.
          </p>
        </div>

        {booking && (
          <div className="mt-6 border rounded-xl p-4">

            <p>
              <strong>Library:</strong>{" "}
              {booking.libraryName}
            </p>

            <p className="mt-2">
              <strong>Slot:</strong>{" "}
              {booking.slotTime}
            </p>

            <p className="mt-2">
              <strong>Seat:</strong>{" "}
              {booking.seatNumber}
            </p>

            <p className="mt-2">
              <strong>Plan:</strong>{" "}
              {booking.planDuration} Month
            </p>

            <p className="mt-2">
              <strong>Amount:</strong> ₹
              {booking.amount}
            </p>

          </div>
        )}

        <button
          onClick={() => navigate("/")}
          className="mt-6 w-full bg-blue-600 text-white py-3 rounded-xl"
        >
          Back Home
        </button>

      </div>
    </div>
  );
}

export default BookingStatus;