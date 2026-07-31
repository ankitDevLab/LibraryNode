import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import API from "../api/axios";

function AvailableSeats() {
  const navigate = useNavigate();
  const { state } = useLocation();

  const [seats, setSeats] = useState([]);
  const [loading, setLoading] = useState(true);

  const student =
    JSON.parse(localStorage.getItem("studentProfile")) || {};

  useEffect(() => {
    if (!state?.libraryId) return;
    fetchSeats();
  }, []);

  const fetchSeats = async () => {
    try {
      const response = await API.get(
        `/seats/${state.libraryId}`
      );
      setSeats(response.data.seats);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const isSeatAvailable = (seat) => {
    if (!seat.isActive) return false;
    if (!state?.slotId) return true;

    const slotEntry = seat.slotAvailability?.find(
      (s) => String(s.slotId) === String(state.slotId)
    );

    // If no entry found, slot is available
    if (!slotEntry) return true;

    return slotEntry.status === "available";
  };

  const bookSeat = (seat) => {
    navigate("/booking-status", {
      state: {
        studentId: student._id,

        libraryId: state.libraryId,
        libraryName: state.libraryName,

        seatId: seat._id,
        seatNumber: seat.seatNumber,

        slotId: state.slotId,
        slotSnapshot: state.slotSnapshot,

        planDuration: 1,
        amount: state.slotPrice,

        startDate: state.startDate,
        endDate: state.endDate,

        status: "Pending",
      },
    });
  };

  if (!state?.libraryId) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-2xl shadow text-center">
          <h2 className="text-2xl font-bold text-red-600">
            No Library Selected
          </h2>
          <button
            onClick={() => navigate("/libraries")}
            className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-xl"
          >
            Browse Libraries
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 p-5">
      <div className="max-w-5xl mx-auto">

        <div className="flex justify-between items-center mb-6">
          <h1 className="text-4xl font-bold">Available Seats</h1>
          <button
            onClick={() => navigate(-1)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg"
          >
            Back
          </button>
        </div>

        {state?.slotTime && (
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
            <strong>Selected Slot:</strong> {state.slotTime} &nbsp;|&nbsp;
            <strong>Price:</strong> ₹{state.slotPrice}/month
          </div>
        )}

        {loading ? (
          <p className="text-center text-slate-500">Loading seats...</p>
        ) : seats.length === 0 ? (
          <div className="bg-white p-8 rounded-2xl shadow text-center">
            <h2 className="text-xl font-bold">No Seats Found</h2>
          </div>
        ) : (
          <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-8 gap-3">
            {seats.map((seat) => {
              const available = isSeatAvailable(seat);
              return (
                <button
                  key={seat._id}
                  onClick={() => available && bookSeat(seat)}
                  disabled={!available}
                  className={`p-3 rounded-xl font-bold text-sm transition ${
                    available
                      ? "bg-green-100 text-green-700 hover:bg-green-200 cursor-pointer"
                      : "bg-red-100 text-red-500 cursor-not-allowed"
                  }`}
                >
                  {seat.seatNumber}
                </button>
              );
            })}
          </div>
        )}

        <div className="mt-6 flex gap-6 text-sm">
          <span className="flex items-center gap-2">
            <span className="w-4 h-4 rounded bg-green-100 inline-block" />
            Available
          </span>
          <span className="flex items-center gap-2">
            <span className="w-4 h-4 rounded bg-red-100 inline-block" />
            Booked / Pending
          </span>
        </div>

      </div>
    </div>
  );
}

export default AvailableSeats;