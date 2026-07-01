import { useState } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import { useEffect } from "react";
function LibrarianDashboard() {
const [requests, setRequests] = useState([]);
  const navigate = useNavigate();
  const fetchSeats = async () => {
  try {
    const libraryId =
      localStorage.getItem("libraryId");

      const response = await API.get(
        `/seats/${libraryId}`
      );

          setLibrarySeats(response.data.seats);

        } catch (error) {
          console.error(error);
        }
      };
useEffect(() => {
  fetchBookings();
  fetchSeats();

  const interval = setInterval(() => {
    fetchBookings();
    fetchSeats();
  }, 3000);

  return () => clearInterval(interval);
}, []);

const fetchBookings = async () => {
  try {
  const response = await API.get(
        "/bookings"
      );

    const libraryId =
  localStorage.getItem("libraryId");

const filtered =
  response.data.bookings.filter(
    (booking) =>
      String(
        booking.libraryId?._id ||
        booking.libraryId
      ) === String(libraryId)
  );
  console.log("My Library:", libraryId);
console.log(response.data.bookings);
console.log(filtered);
setRequests(filtered);
  } catch (error) {
    console.error(error);
  }
};

const [librarySeats, setLibrarySeats] = useState([]);

const [seatNumber, setSeatNumber] = useState("");
const [customRequests, setCustomRequests] = useState(
  JSON.parse(localStorage.getItem("customRequests")) || []
);

const totalRevenue = requests
  .filter((r) => r.status === "Approved")
  .reduce(
    (sum, booking) =>
      sum + Number(booking.amount || 0),
    0
  );

const occupiedSeats = librarySeats.filter(
  (seat) => seat.status === "booked"
).length;
const totalSeats = librarySeats.length;

const occupancyPercentage =
  totalSeats > 0
    ? Math.round((occupiedSeats / totalSeats) * 100)
    : 0;

const totalStudents = requests.length;
const attendance =
  JSON.parse(localStorage.getItem("attendance")) || [];

const today =
  new Date().toLocaleDateString();

const presentToday = attendance.filter(
  (a) => a.date === today
).length;

const uniqueStudents =
  new Set(
    attendance.map((a) => a.mobile)
  ).size;

const totalAttendance =
  attendance.length;
  // Booking Approval
const updateStatus = async (id, status) => {
  try {
    console.log("===========");
    console.log("Button Clicked");
    console.log("Booking ID:", id);
    console.log("Status:", status);

    if (status === "Approved") {
      const response = await axios.patch(
        `http://localhost:5000/api/bookings/${id}/approve`
      );

      console.log("Approve Success");
      console.log(response.data);
    } else {
      const response = await axios.patch(
        `http://localhost:5000/api/bookings/${id}/reject`
      );

      console.log(response.data);
    }

    await fetchBookings();
    await fetchSeats();

  } catch (error) {
    console.log("PATCH ERROR");
    console.log(error.response?.data);
    console.log(error);
  }
};

// Custom Request Approval
  const updateCustomStatus = (id, status) => {
    const updated = customRequests.map((request) =>
      request._id === id
        ? { ...request, status }
        : request
    );

    setCustomRequests(updated);

    localStorage.setItem(
      "customRequests",
      JSON.stringify(updated)
    );
  };

  // Add Seat
const addSeat = async () => {
  try {
    const libraryId =
      localStorage.getItem("libraryId");

    if (!libraryId) {
      alert("Library ID Missing");
      return;
    }

    await axios.post(
      "http://localhost:5000/api/seats",
      {
        libraryId,
        seatNumber: Number(seatNumber),
        floor: 1,
        plans: [
          {
            duration: 1,
            price: 500,
          },
          {
            duration: 3,
            price: 1400,
          },
          {
            duration: 6,
            price: 2600,
          },
        ],
      }
    );

    setSeatNumber("");

    fetchSeats();

  } catch (error) {
    console.error(error);
  }
};

  return (
    
    <div className="min-h-screen bg-slate-100">
      <Navbar title="Librarian Dashboard" />
      <div className="flex items-center justify-between px-6 py-4 bg-white shadow">

  <div className="flex items-center gap-3">

    <img
      src="/logo.png"
      alt="LibrarySphere"
      className="w-12 h-12 object-contain"
    />

    <div>
      <h1 className="text-2xl font-bold text-blue-600">
        LibrarySphere
      </h1>

      <p className="text-xs text-slate-500">
        Library Booking Platform
      </p>
    </div>

  </div>

</div>
      <div className="max-w-6xl mx-auto p-5">

        <h1 className="text-3xl font-bold mb-6">
          Librarian Dashboard
        </h1>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">

  <div className="bg-white p-5 rounded-2xl shadow">
    <p className="text-slate-500">Students</p>
    <h2 className="text-3xl font-bold">
      {totalStudents}
    </h2>
  </div>

  <div className="bg-white p-5 rounded-2xl shadow">
    <p className="text-slate-500">Revenue</p>
    <h2 className="text-3xl font-bold text-green-600">
      ₹{totalRevenue}
    </h2>
  </div>

  <div className="bg-white p-5 rounded-2xl shadow">
    <p className="text-slate-500">Present Today</p>
    <h2 className="text-3xl font-bold text-blue-600">
      {presentToday}
    </h2>
  </div>

  <div className="bg-white p-5 rounded-2xl shadow">
    <p className="text-slate-500">Occupancy</p>
    <h2 className="text-3xl font-bold text-purple-600">
      {occupancyPercentage}%
    </h2>
  </div>

</div>
        <div className="grid grid-cols-2 md:flex gap-3 mb-6">

          <button
            onClick={() => navigate("/verify-student")}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg"
          >
            Verify Student
          </button>
         <button
            onClick={() =>
              navigate("/student-management")
            }
            className="bg-blue-600 text-white px-4 py-2 rounded-lg"
          >
            Student Management
          </button> 
          <button
  onClick={() =>
    navigate("/attendance-scanner")
  }
  className="bg-purple-600 text-white px-4 py-2 rounded-lg"
>
  Mark Attendance
</button>
        </div>
       <div className="bg-white p-6 rounded-2xl shadow mb-6">
  <h2 className="text-xl font-bold mb-4">
    Seat Occupancy Analytics
  </h2>

  <div className="flex justify-between mb-2">
    <span>Occupancy Rate</span>
    <span>{occupancyPercentage}%</span>
  </div>

  <div className="w-full bg-slate-200 rounded-full h-6">
    <div
      className="bg-green-600 h-6 rounded-full transition-all"
      style={{
        width: `${occupancyPercentage}%`,
      }}
    ></div>
  </div>

  <div className="grid grid-cols-3 gap-4 mt-6">

    <div className="bg-slate-50 p-4 rounded-xl">
      <p className="text-slate-500">Total Seats</p>
      <p className="text-2xl font-bold">
        {totalSeats}
      </p>
    </div>

    <div className="bg-slate-50 p-4 rounded-xl">
      <p className="text-slate-500">Occupied</p>
      <p className="text-2xl font-bold text-red-600">
        {occupiedSeats}
      </p>
    </div>

    <div className="bg-slate-50 p-4 rounded-xl">
      <p className="text-slate-500">Available</p>
      <p className="text-2xl font-bold text-green-600">
        {totalSeats - occupiedSeats}
      </p>
    </div>

  </div>
</div>

{/* Attendance Analytics */}
<div className="bg-white p-6 rounded-2xl shadow mb-6">
  <h2 className="text-xl font-bold mb-4">
    Attendance Analytics
  </h2>

  <div className="grid md:grid-cols-3 gap-4">

    <div className="bg-green-50 p-5 rounded-xl">
      <p className="text-slate-500">
        Present Today
      </p>

      <p className="text-3xl font-bold text-green-700">
        {presentToday}
      </p>
    </div>

    <div className="bg-blue-50 p-5 rounded-xl">
      <p className="text-slate-500">
        Total Attendance
      </p>

      <p className="text-3xl font-bold text-blue-700">
        {totalAttendance}
      </p>
    </div>

    <div className="bg-purple-50 p-5 rounded-xl">
      <p className="text-slate-500">
        Unique Students
      </p>

      <p className="text-3xl font-bold text-purple-700">
        {uniqueStudents}
      </p>
    </div>

  </div>

</div>
        {/* Booking Requests */}
        <div className="bg-white rounded-2xl shadow p-5 mb-6">

          <h2 className="text-xl font-bold mb-4">
            Booking Requests
          </h2>

          {requests.length === 0 ? (
            <p>No Booking Requests Found</p>
          ) : (
            requests.map((request) => (
              <div
                key={request._id || request.id}
                className="border rounded-xl p-4 mb-4"
              >
                <p className="font-semibold">
                  {request.studentId?.name}
                </p>

                <p>
                  Library: {request.libraryName}
                </p>

                <p>
                  Seat: {request.seatNumber}
                </p>

                <p>
                  Slot: {request.slot}
                </p>

                <p>
                  Plan: {request.planDuration} Month
                </p>

                <p>
                  Amount: ₹{request.amount}
                </p>

                <p className="font-bold mt-2">
                  {request.status}
                </p>

                {request.status === "Pending" && (
                  <div className="flex gap-3 mt-4">

                    <button
                      onClick={() =>
                        updateStatus(
                          request._id || request.id,
                          "Approved"
                        )
                      }
                      className="bg-green-600 text-white px-4 py-2 rounded-lg"
                    >
                      Approve
                    </button>

                    <button
                      onClick={() =>
                        updateStatus(
                          request._id || request.id,
                          "Rejected"
                        )
                      }
                      className="bg-red-600 text-white px-4 py-2 rounded-lg"
                    >
                      Reject
                    </button>

                  </div>
                )}
              </div>
            ))
          )}

        </div>

        {/* Custom Timing Requests */}
        <div className="bg-white rounded-2xl shadow p-5 mb-6">

          <h2 className="text-xl font-bold mb-4">
            Custom Timing Requests
          </h2>

          {customRequests.length === 0 ? (
            <p>No Custom Requests Found</p>
          ) : (
            customRequests.map((request) => (
              <div
                key={request._id || request.id}
                className="border rounded-xl p-4 mb-4"
              >
                <p className="font-semibold">
                  {request.studentName}
                </p>

                <p>
                  Library: {request.libraryName}
                </p>

                <p>
                  Time: {request.startTime} - {request.endTime}
                </p>

                <p>
                  Message: {request.message}
                </p>

                <p className="font-bold mt-2">
                  {request.status}
                </p>

                {request.status === "Pending" && (
                  <div className="flex gap-3 mt-4">

                    <button
                      onClick={() =>
                          updateCustomStatus(
                            request._id || request.id,
                            "Approved"
                          )
                      }
                      className="bg-green-600 text-white px-4 py-2 rounded-lg"
                    >
                      Approve
                    </button>

                    <button
                      onClick={() =>
                        updateCustomStatus(
                          request._id || request.id,
                          "Rejected"
                        )
                      }
                      className="bg-red-600 text-white px-4 py-2 rounded-lg"
                    >
                      Reject
                    </button>

                  </div>
                )}
              </div>
            ))
          )}

        </div>

        {/* Seat Management */}

      </div>
    </div>
  );
}

export default LibrarianDashboard;