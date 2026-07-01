import { useEffect, useState } from "react";
import axios from "axios";

function Attendance() {
  const [attendance, setAttendance] = useState([]);

  useEffect(() => {
    fetchAttendance();
  }, []);

  const fetchAttendance = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/attendance"
      );

      setAttendance(response.data.attendance);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 p-5">
      <div className="max-w-6xl mx-auto">

        <h1 className="text-3xl font-bold mb-6">
          Attendance Records
        </h1>

        {attendance.length === 0 ? (
          <div className="bg-white p-5 rounded-xl shadow">
            No Attendance Found
          </div>
        ) : (
          attendance.map((item) => (
            <div
              key={item._id}
              className="bg-white p-5 rounded-xl shadow mb-4"
            >
              <h2 className="text-xl font-bold">
                {item.studentId?.name}
              </h2>

              <p>Seat: {item.seatNumber}</p>

              <p>Date: {item.date}</p>

              <p>Time: {item.time}</p>
            </div>
          ))
        )}

      </div>
    </div>
  );
}

export default Attendance;