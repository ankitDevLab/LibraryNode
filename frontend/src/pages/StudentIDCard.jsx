import { jsPDF } from "jspdf";
import { QRCodeCanvas } from "qrcode.react";;

function StudentIDCard() {
  const profile =
    JSON.parse(localStorage.getItem("studentProfile")) || {};

  const bookings =
    JSON.parse(localStorage.getItem("bookings")) || [];

  const approvedBooking =
    bookings.find((b) => b.status === "Approved") || null;

  const qrData = JSON.stringify({
    name: profile?.name || "",
    mobile: profile?.mobile || "",
    library: approvedBooking?.libraryName || "",
    seat: approvedBooking?.seatNumber || "",
    slot: approvedBooking?.slotTime || "",
    status: approvedBooking?.status || "",
  });

  const downloadPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(22);
    doc.text("LibrarySphere", 70, 20);

    doc.setFontSize(14);

    doc.text(`Name: ${profile.name || ""}`, 20, 40);
    doc.text(`Mobile: ${profile.mobile || ""}`, 20, 50);
    doc.text(`Email: ${profile.email || ""}`, 20, 60);

    if (approvedBooking) {
      doc.text(
        `Library: ${approvedBooking.libraryName}`,
        20,
        80
      );

      doc.text(
        `Seat: ${approvedBooking.seatNumber}`,
        20,
        90
      );

      doc.text(
        `Slot: ${approvedBooking.slotTime}`,
        20,
        100
      );

      doc.text(
        `Plan: ${approvedBooking.planDuration} Month`,
        20,
        110
      );

      doc.text(
        `Status: ${approvedBooking.status}`,
        20,
        120
      );
    }

    doc.save("LibrarySphere-IDCard.pdf");
  };

  return (
    <div className="min-h-screen bg-slate-100 flex justify-center items-center p-5">
    <div className="bg-white p-8 rounded-3xl shadow-xl w-full max-w-md border">

<div className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-2xl p-5 mb-6">

  <h1 className="text-3xl font-bold">
    LibrarySphere
  </h1>

  <p className="opacity-90">
    Digital Membership Card
  </p>

</div>

        {profile.photo && (
          <img
            src={
              profile.photo ||
              "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            }
            alt="Student"
            className="w-32 h-32 rounded-full mx-auto object-cover border-4 border-blue-200"
          />
        )}

        <div className="mt-5 space-y-2">

          <p>
            <strong>Name:</strong> {profile.name}
          </p>

          <p>
            <strong>Mobile:</strong> {profile.mobile}
          </p>

          <p>
            <strong>Email:</strong> {profile.email}
          </p>
          <p>
            <strong>Member ID:</strong>{" "}
            LS-{profile.mobile?.slice(-4)}
          </p>

          {approvedBooking && (
            <>
      <div className="bg-slate-50 rounded-2xl p-4 mt-4">

        <h3 className="font-bold text-lg mb-3">
          Active Membership
        </h3>

        <p>
          📚 {approvedBooking.libraryName}
        </p>

        <p>
          💺 Seat {approvedBooking.seatNumber}
        </p>

        <p>
          ⏰ {approvedBooking.slotTime}
        </p>

      </div>

            <div className="mt-2">
              <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full font-bold">
                {approvedBooking.status}
              </span>
            </div>
            </>
          )}

        </div>
<div className="flex justify-center mt-6">
  <QRCodeCanvas
    value={qrData}
    size={180}
  />
</div>

          <div className="text-center mt-3">

            <p className="font-semibold">
              Student Verification QR
            </p>

            <p className="text-slate-500 text-sm">
              Scan to verify library membership
            </p>

          </div>

        <button
          onClick={downloadPDF}
          className="mt-6 w-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white py-3 rounded-xl font-bold hover:scale-105 transition"
        >
          Download PDF
        </button>

      </div>
    </div>
  );
}

export default StudentIDCard;