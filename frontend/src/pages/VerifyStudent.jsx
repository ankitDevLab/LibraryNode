import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Html5QrcodeScanner } from "html5-qrcode";
import API from "../api/axios";

function VerifyStudent() {
  const navigate = useNavigate();
  const [student, setStudent] = useState(null);
  const [invalid, setInvalid] = useState(false);

  useEffect(() => {
    const scanner = new Html5QrcodeScanner(
      "reader",
      {
        fps: 10,
        qrbox: { width: 250, height: 250 },
      },
      false
    );

    scanner.render(
      (decodedText) => {
        try {
          const scanned = JSON.parse(decodedText);
          if (!scanned.mobile) {
            setStudent(null);
            setInvalid(true);
            return;
          }

          const libraryId = localStorage.getItem("libraryId");
          if (!libraryId) {
            setStudent(null);
            setInvalid(true);
            return;
          }

          API.get(`/bookings?libraryId=${libraryId}`)
            .then((response) => {
              const bookings = response.data.bookings;
              const approvedBooking = bookings.find(
                (b) =>
                  b.status === "Approved" &&
                  b.studentId &&
                  String(b.studentId.mobile) === String(scanned.mobile)
              );

              if (approvedBooking) {
                const today = new Date().toLocaleDateString();
                const time = new Date().toLocaleTimeString();

                // Fetch attendance for this library to check if already marked
                API.get(`/attendance?libraryId=${libraryId}`)
                  .then((attResponse) => {
                    const alreadyMarked = attResponse.data.attendance.find(
                      (a) =>
                        a.studentId?._id === approvedBooking.studentId._id &&
                        a.date === today
                    );

                    if (!alreadyMarked) {
                      API.post("/attendance", {
                        studentId: approvedBooking.studentId._id,
                        libraryId,
                        seatNumber: approvedBooking.seatNumber,
                        date: today,
                        time: time,
                      }).catch((err) => console.error("Failed to post attendance:", err));
                    }
                  })
                  .catch((err) => console.error("Failed to check attendance:", err));

                setStudent({
                  name: approvedBooking.studentId.name,
                  mobile: approvedBooking.studentId.mobile,
                  email: approvedBooking.studentId.email || "N/A",
                  college: approvedBooking.studentId.college || "N/A",
                  course: approvedBooking.studentId.course || "N/A",
                  library: approvedBooking.libraryName,
                  seat: approvedBooking.seatNumber,
                  slot: approvedBooking.slotSnapshot?.name || approvedBooking.slot,
                  status: approvedBooking.status,
                });
                setInvalid(false);
              } else {
                setStudent(null);
                setInvalid(true);
              }
            })
            .catch((err) => {
              console.error(err);
              setStudent(null);
              setInvalid(true);
            });
        } catch {
          setStudent(null);
          setInvalid(true);
        }
      },
      () => {}
    );

    return () => {
      scanner.clear().catch(() => {});
    };
  }, []);

  return (
    <div className="min-h-screen bg-slate-100 p-5">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow">

        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">
            QR Student Verification
          </h1>
          <button
            onClick={() => navigate("/librarian-dashboard")}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg"
          >
            Back
          </button>
        </div>

        <div
          id="reader"
          style={{
            width: "100%",
            minHeight: "400px",
          }}
        />

        {student && (
          <div className="mt-6 bg-green-50 border border-green-300 rounded-xl p-5">
            <h2 className="text-2xl font-bold text-green-700 mb-4">
              Student Verified ✅
            </h2>

            <p><strong>Name:</strong> {student.name}</p>
            <p><strong>Mobile:</strong> {student.mobile}</p>
            <p><strong>Email:</strong> {student.email}</p>
            <p><strong>College:</strong> {student.college}</p>
            <p><strong>Course:</strong> {student.course}</p>

            <hr className="my-4" />

            <p><strong>Library:</strong> {student.library}</p>
            <p><strong>Seat:</strong> {student.seat}</p>
            <p><strong>Slot:</strong> {student.slot}</p>
            <p><strong>Status:</strong> {student.status}</p>
          </div>
        )}

        {invalid && (
          <div className="mt-6 bg-red-50 border border-red-300 rounded-xl p-5">
            <h2 className="text-2xl font-bold text-red-700">
              Invalid Student ❌
            </h2>

            <p className="mt-2">
              Student record not found.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default VerifyStudent;