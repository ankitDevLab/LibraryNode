import { useLocation } from "react-router-dom";
import { QRCodeCanvas } from "qrcode.react";
import jsPDF from "jspdf";

function StudentPass() {
  const location = useLocation();

  const booking =
    location.state ||
    JSON.parse(
      localStorage.getItem("currentBooking")
    );

  console.log("BOOKING DATA:", booking);

  const qrData = {
    bookingId: booking?._id,
    studentId:
      booking?.studentId?._id ||
      booking?.studentId,
    libraryId:
      booking?.libraryId?._id ||
      booking?.libraryId,
    seatNumber: booking?.seatNumber,
    libraryName: booking?.libraryName,
    slot: booking?.slot,
    status: booking?.status,
  };

  console.log("QR DATA:", qrData);

  const downloadPass = () => {
    const doc = new jsPDF();

    doc.setFontSize(20);
    doc.text("Library Entry Pass", 20, 20);

    doc.setFontSize(12);
    doc.text(
      `Library: ${booking.libraryName}`,
      20,
      40
    );
    doc.text(
      `Seat: ${booking.seatNumber}`,
      20,
      50
    );
    doc.text(
      `Slot: ${booking.slot}`,
      20,
      60
    );
    doc.text(
      `Status: ${booking.status}`,
      20,
      70
    );

    doc.text(
      `Pass ID: LP-${booking._id?.slice(-6)}`,
      20,
      80
    );

    doc.save("LibraryPass.pdf");
  };

  if (!booking) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        No Pass Found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-5">
      <div className="bg-white p-8 rounded-2xl shadow-lg text-center max-w-md w-full">

        <div className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-2xl p-5 mb-6">
          <h1 className="text-3xl font-bold">
            LibrarySphere
          </h1>

          <p>
            Student Entry Pass
          </p>
        </div>

        <QRCodeCanvas
          value={JSON.stringify(qrData)}
          size={220}
        />

        <p className="mt-3 text-slate-500">
          Show this QR code at library entry
        </p>

        <div className="mt-6 text-left">

          <p>
            <strong>Library:</strong>{" "}
            {booking.libraryName}
          </p>

          <p className="mt-2">
            <strong>Seat:</strong>{" "}
            {booking.seatNumber}
          </p>

          <p className="mt-2">
            <strong>Slot:</strong>{" "}
            {booking.slot}
          </p>

          <div className="mt-3">
            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full font-bold">
              {booking.status}
            </span>
          </div>

          <p className="text-center mt-4 text-slate-500">
            Pass ID:
            <strong>
              {" "}
              LP-{booking._id?.slice(-6)}
            </strong>
          </p>

        </div>

        <button
          onClick={downloadPass}
          className="mt-6 w-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white py-3 rounded-xl font-bold hover:scale-105 transition"
        >
          Download Pass PDF
        </button>

      </div>
    </div>
  );
}

export default StudentPass;