import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function LibraryDetails() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [selectedSlot, setSelectedSlot] = useState(null);
  const [showCustomTiming, setShowCustomTiming] = useState(false);

  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [message, setMessage] = useState("");

const [library, setLibrary] = useState(null);

useEffect(() => {
  fetchLibrary();
}, [id]);

const fetchLibrary = async () => {
  try {
    const response = await axios.get(
      "http://localhost:5000/api/libraries"
    );

    console.log("URL ID:", id);

    const foundLibrary =
      response.data.libraries.find(
        (lib) => String(lib._id) === String(id)
      );

    console.log("FOUND:", foundLibrary);

    setLibrary(foundLibrary);
    console.log("Library Data:", foundLibrary);

  } catch (error) {
    console.error(error);
  }
};
  console.log("CURRENT LIBRARY:", library);
  if (!library) {
    return (
      <div className="p-10 text-center text-2xl font-bold">
        Library Not Found
      </div>
    );
  }

const slots = [
  {
    id: 1,
    startTime: "06:00 Am",
    endTime: "11:00 Am",
    price: library.slot1Price,
  },
  {
    id: 2,
    startTime: "11:00 Am",
    endTime: "04:00 Pm" ,
    price: library.slot2Price,
  },
  {
    id: 3,
    startTime: "04:00 Pm",
    endTime: "09:00 Pm",
    price: library.slot3Price,
  },
  {
    id: 4,
    startTime: "09:00 Pm",
    endTime: "06:00 AM",
    price: library.slot4Price,
  },
].filter(slot => slot.price > 0);

  const sendCustomRequest = () => {
    const existingRequests =
      JSON.parse(localStorage.getItem("customRequests")) || [];

    const newRequest = {
      id: Date.now(),
      studentName: "Student",
      libraryId: library._id,
      libraryName: library.name,
      startTime,
      endTime,
      message,
      status: "Pending",
    };

    existingRequests.push(newRequest);

    localStorage.setItem(
      "customRequests",
      JSON.stringify(existingRequests)
    );

    alert("Custom Timing Request Sent Successfully");

    setStartTime("");
    setEndTime("");
    setMessage("");
  };

  return (
    <div className="min-h-screen bg-slate-100 p-5">
      <div className="max-w-5xl mx-auto">

        <div className="bg-white p-6 rounded-2xl shadow mb-6">
          {library.photo && (
            <img
              src={library.photo}
              alt={library.name}
              className="w-full h-72 object-cover rounded-2xl mb-6"
            />
          )}
          <h1 className="text-4xl font-bold">
            {library.name}
          </h1>

          <p className="text-slate-500 mt-2">
            {library.city}, {library.district}, {library.state}
          </p>

          <p className="mt-2">
            {library.address}
          </p>

          <p className="mt-2">
            📞 {library.mobile}
          </p>

          <p className="mt-2">
            💺 {library.totalSeats || library.seats} Seats
          </p>

        </div>

        <h2 className="text-2xl font-bold mb-5">
          Select Time Slot
        </h2>

        <div className="grid md:grid-cols-2 gap-5">

          {slots.map((slot) => (
            <div
              key={slot.id}
              onClick={() => {
                setSelectedSlot(slot);
                setShowCustomTiming(false);
              }}
              className={`cursor-pointer rounded-2xl p-6 border-2 transition
              ${
                selectedSlot?.id === slot.id
                  ? "border-blue-600 bg-blue-50"
                  : "border-slate-200 bg-white hover:border-blue-300"
              }`}
            >
              <h3 className="text-xl font-bold">
                {slot.startTime} - {slot.endTime}
              </h3>

              <p className="mt-3 text-2xl font-bold text-blue-600">
                ₹{slot.price}
              </p>

              <p className="text-slate-500">
                Monthly
              </p>
            </div>
          ))}

          <div
            onClick={() => {
              setSelectedSlot(null);
              setShowCustomTiming(true);
            }}
            className="cursor-pointer rounded-2xl p-6 border-2 border-orange-300 bg-orange-50 hover:border-orange-500"
          >
            <h3 className="text-xl font-bold">
              Other Timing
            </h3>

            <p className="mt-3 text-orange-600 font-semibold">
              Contact Librarian
            </p>

            <p className="text-slate-500 mt-2">
              Request your own timing
            </p>
          </div>

        </div>

        {selectedSlot && (
          <div className="mt-8">

            <div className="bg-green-50 border border-green-200 p-4 rounded-xl mb-5">
              Selected Slot:
              <strong className="ml-2">
                {selectedSlot.startTime} - {selectedSlot.endTime}
              </strong>
            </div>

            <button
                onClick={() =>
                navigate("/available-seats", {
                  state: {
                    libraryId: library._id,
                    libraryName: library.name,
                    slotId: selectedSlot.id,
                    slotTime: `${selectedSlot.startTime} - ${selectedSlot.endTime}`,
                    slotPrice: selectedSlot.price,
                  },
                })
              }
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl"
            >
              See Available Seats
            </button>

          </div>
        )}

        {showCustomTiming && (
          <div className="mt-8 bg-white p-6 rounded-2xl shadow">

            <h2 className="text-2xl font-bold mb-4">
              Custom Timing Request
            </h2>

            <div className="grid md:grid-cols-2 gap-4">

              <input
                type="time"
                value={startTime}
                onChange={(e) =>
                  setStartTime(e.target.value)
                }
                className="border rounded-xl p-3"
              />

              <input
                type="time"
                value={endTime}
                onChange={(e) =>
                  setEndTime(e.target.value)
                }
                className="border rounded-xl p-3"
              />

            </div>

            <textarea
              placeholder="Message for Librarian"
              rows="4"
              value={message}
              onChange={(e) =>
                setMessage(e.target.value)
              }
              className="border rounded-xl p-3 w-full mt-4"
            />

            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mt-4">

              <p>
                <strong>Contact Librarian:</strong>
              </p>

              <p className="mt-2">
                📞 {library.mobile}
              </p>

            </div>

            <button
              onClick={sendCustomRequest}
              className="mt-5 bg-orange-600 hover:bg-orange-700 text-white px-8 py-3 rounded-xl"
            >
              Send Request
            </button>

          </div>
        )}

      </div>
    </div>
  );
}

export default LibraryDetails;