import { useState } from "react";

function StudentManagement() {
  const bookings =
    JSON.parse(localStorage.getItem("bookings")) || [];

  const profile =
    JSON.parse(localStorage.getItem("studentProfile")) || {};

  const [search, setSearch] = useState("");

  const students = bookings.filter((student) =>
    (
      student.studentName ||
      profile.name ||
      ""
    )
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
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="w-full border p-3 rounded-xl mb-6"
        />

        <div className="grid gap-4">

          {students.length === 0 ? (
            <div className="bg-white p-5 rounded-xl shadow">
              No Students Found
            </div>
          ) : (
            students.map((student) => (
              <div
                key={student.id}
                className="bg-white p-5 rounded-xl shadow"
              >
                <h2 className="text-xl font-bold">
                  {student.studentName ||
                    profile.name}
                </h2>

                <p>
                  <strong>Mobile:</strong>{" "}
                  {profile.mobile}
                </p>

                <p>
                  <strong>Library:</strong>{" "}
                  {student.libraryName}
                </p>

                <p>
                  <strong>Seat:</strong>{" "}
                  {student.seatNumber}
                </p>

                <p>
                  <strong>Slot:</strong>{" "}
                  {student.slotTime}
                </p>

                <p>
                  <strong>Status:</strong>{" "}
                  {student.status}
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