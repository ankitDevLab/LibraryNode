import { useEffect, useState } from "react";
import API from "../api/axios";

function StudentManagement() {
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await API.get("/bookings");

      setStudents(response.data.bookings);
    } catch (error) {
      console.error(error);
    }
  };

  const filteredStudents = students.filter((student) =>
    (student.studentId?.name || "")
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-100 p-5">
      <div className="max-w-6xl mx-auto">

        <h1 className="text-3xl font-bold mb-6">
          Student Management
        </h1>

        <input
          type="text"
          placeholder="Search Student..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border p-3 rounded-xl mb-6"
        />

        <div className="grid gap-4">

          {filteredStudents.length === 0 ? (
            <div className="bg-white p-5 rounded-xl shadow">
              No Students Found
            </div>
          ) : (
            filteredStudents.map((student) => (
              <div
                key={student._id}
                className="bg-white rounded-xl shadow p-5"
              >
                <h2 className="text-xl font-bold">
                  {student.studentId?.name || "Unknown"}
                </h2>

                <p className="mt-2">
                  <strong>Email:</strong>{" "}
                  {student.studentId?.email || "-"}
                </p>

                <p className="mt-2">
                  <strong>Mobile:</strong>{" "}
                  {student.studentId?.mobile || "-"}
                </p>

                <p className="mt-2">
                  <strong>Library:</strong>{" "}
                  {student.libraryName}
                </p>

                <p className="mt-2">
                  <strong>Seat:</strong>{" "}
                  {student.seatNumber}
                </p>

                <p className="mt-2">
                  <strong>Plan:</strong>{" "}
                  {student.planDuration} Month
                </p>

                <p className="mt-2">
                  <strong>Amount:</strong> ₹
                  {student.amount}
                </p>

                <p className="mt-2">
                  <strong>Status:</strong>

                  <span
                    className={`ml-2 px-3 py-1 rounded-full text-sm font-semibold ${
                      student.status === "Approved"
                        ? "bg-green-100 text-green-700"
                        : student.status === "Rejected"
                        ? "bg-red-100 text-red-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {student.status || "Pending"}
                  </span>
                </p>
              </div>
            ))
          )}

        </div>

      </div>
    </div>
  );
}

export default StudentManagement;