import { useEffect, useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";

function VerifyStudent() {
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

          const profile =
            JSON.parse(localStorage.getItem("studentProfile")) || {};

          const bookings =
            JSON.parse(localStorage.getItem("bookings")) || [];

        const approvedBooking = bookings.find(
          (b) =>
            b.status === "Approved"
        );
console.log("Profile Mobile:", profile.mobile);
console.log("Scanned Mobile:", scanned.mobile);
console.log("Approved Booking:", approvedBooking);
if (
  approvedBooking &&
  String(profile.mobile) === String(scanned.mobile)
){

  const attendance =
    JSON.parse(
      localStorage.getItem("attendance")
    ) || [];

  const today =
    new Date().toLocaleDateString();

  const alreadyMarked = attendance.find(
    (a) =>
      a.mobile === scanned.mobile &&
      a.date === today
  );

      if (!alreadyMarked) {
        attendance.push({
          name: scanned.name,
          mobile: scanned.mobile,
          library: scanned.library,
          seat: scanned.seat,
          date: today,
          time: new Date().toLocaleTimeString(),
        });

        localStorage.setItem(
          "attendance",
          JSON.stringify(attendance)
        );
      }

      setStudent({
        ...scanned,
        email: profile.email,
        college: profile.college,
        course: profile.course,
      });

      setInvalid(false);
          } else {
            setStudent(null);
            setInvalid(true);
          }
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

        <h1 className="text-3xl font-bold mb-6">
          QR Student Verification
        </h1>

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