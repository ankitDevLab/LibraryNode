import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

function Notifications() {
  const navigate = useNavigate();

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const student = JSON.parse(
        localStorage.getItem("studentProfile")
      );

      if (!student?._id) {
        setLoading(false);
        return;
      }

      const response = await API.get(`/bookings?studentId=${student._id}`);

      const myBookings = response.data.bookings;

      // Sort by newest first
      myBookings.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );

      setBookings(myBookings);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "Approved":
        return "✅";
      case "Rejected":
        return "❌";
      case "Pending":
        return "⏳";
      default:
        return "📋";
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Approved":
        return "bg-green-50 border-green-200";
      case "Rejected":
        return "bg-red-50 border-red-200";
      case "Pending":
        return "bg-yellow-50 border-yellow-200";
      default:
        return "bg-slate-50 border-slate-200";
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 p-5">

      <div className="max-w-4xl mx-auto">

        <div className="flex justify-between mb-6">

          <h1 className="text-3xl font-bold">
            Notifications
          </h1>

          <button
            onClick={() =>
              navigate("/student-dashboard")
            }
            className="bg-blue-600 text-white px-4 py-2 rounded-lg"
          >
            Back
          </button>

        </div>

        {loading ? (
          <div className="bg-white p-5 rounded-xl shadow">
            Loading notifications...
          </div>
        ) : bookings.length === 0 ? (
          <div className="bg-white p-5 rounded-xl shadow">
            No Notifications
          </div>
        ) : (
          bookings.map((booking) => (
            <div
              key={booking._id}
              className={`border rounded-xl p-4 shadow-sm mb-3 ${getStatusColor(
                booking.status
              )}`}
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl">
                  {getStatusIcon(booking.status)}
                </span>

                <div className="flex-1">
                  <p className="font-semibold">
                    Booking {booking.status}
                  </p>

                  <p className="text-slate-600 mt-1">
                    {booking.libraryName} — Seat{" "}
                    {booking.seatNumber} —{" "}
                    {booking.slotSnapshot?.name || booking.slot}
                  </p>

                  <p className="text-slate-400 text-sm mt-1">
                    {new Date(
                      booking.updatedAt || booking.createdAt
                    ).toLocaleString()}
                  </p>
                </div>

                <span
                  className={`px-3 py-1 rounded-full text-xs font-bold ${
                    booking.status === "Approved"
                      ? "bg-green-100 text-green-700"
                      : booking.status === "Rejected"
                      ? "bg-red-100 text-red-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {booking.status || "Pending"}
                </span>
              </div>
            </div>
          ))
        )}

      </div>

    </div>
  );
}

export default Notifications;