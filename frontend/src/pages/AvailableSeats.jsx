import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

function AvailableSeats() {
  const navigate = useNavigate();
  const { state } = useLocation();

  const [seats, setSeats] = useState([]);

  const student = JSON.parse(
    localStorage.getItem("studentProfile")
  );

  useEffect(() => {
    fetchSeats();
  }, []);

  const fetchSeats = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/seats/${state.libraryId}`
      );

      setSeats(response.data.seats);
    } catch (error) {
      console.error(error);
    }
  };

  const bookSeat = (seat) => {
    navigate("/booking-status", {
      state: {
        studentId: student._id,
        libraryId: state.libraryId,
        libraryName: state.libraryName,
        seatNumber: seat.seatNumber,
        slotTime: state.slotTime,
        planDuration: 1,
        amount: state.slotPrice,
      },
    });
  };

  return (
    <div className="min-h-screen bg-slate-100 p-5">
      <div className="max-w-6xl mx-auto">

        <h1 className="text-3xl font-bold mb-6">
          Available Seats
        </h1>

        <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">

          {seats.map((seat) => (
            <button
              key={seat._id}
              disabled={seat.status !== "available"}
              onClick={() => bookSeat(seat)}
              className={`p-5 rounded-xl font-bold shadow transition
              ${
                seat.status === "available"
                  ? "bg-green-500 text-white hover:bg-green-600"
                  : seat.status === "pending"
                  ? "bg-yellow-500 text-white cursor-not-allowed"
                  : "bg-red-500 text-white cursor-not-allowed"
              }`}
            >
              {seat.seatNumber}
            </button>
          ))}

        </div>

      </div>
    </div>
  );
}

export default AvailableSeats;