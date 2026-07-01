import { useEffect, useState } from "react";
import API from "../api/axios";
import { Html5QrcodeScanner } from "html5-qrcode";

function AttendanceScanner() {
  const [attendance, setAttendance] = useState(null);
  const [error, setError] = useState("");

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
      async (decodedText) => {
        try {
          const qrData = JSON.parse(decodedText);

          console.log("QR DATA:", qrData);
          
          const response = await API.post(
            "/attendance",
            {
              studentId: qrData.studentId,
              libraryId: qrData.libraryId,
              seatNumber: Number(qrData.seatNumber),
              date: new Date().toLocaleDateString(),
              time: new Date().toLocaleTimeString(),
            }
          );

          setAttendance(response.data);
          setError("");

          alert("Attendance Marked Successfully ✅");

          scanner.clear();
        } catch (err) {
          console.error(err);

          setError(
            err.response?.data?.message ||
              "Failed to mark attendance"
          );
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
          Attendance Scanner
        </h1>

        <div
          id="reader"
          style={{
            width: "100%",
            minHeight: "400px",
          }}
        />

        {attendance && (
          <div className="mt-6 bg-green-50 border border-green-300 rounded-xl p-5">

            <h2 className="text-2xl font-bold text-green-700">
              Attendance Marked ✅
            </h2>

            <p className="mt-3">
              Student attendance saved successfully.
            </p>

          </div>
        )}

        {error && (
          <div className="mt-6 bg-red-50 border border-red-300 rounded-xl p-5">

            <h2 className="text-xl font-bold text-red-700">
              Error ❌
            </h2>

            <p className="mt-2">{error}</p>

          </div>
        )}

      </div>
    </div>
  );
}

export default AttendanceScanner;