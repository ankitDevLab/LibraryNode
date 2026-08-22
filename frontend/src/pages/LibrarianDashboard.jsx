import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import { toast } from "react-hot-toast";
import LibraryNodeBrand from "../components/LibraryNodeBrand";

function LibrarianDashboard() {
  const navigate = useNavigate();
  const [requests, setRequests] = useState([]);
  const [attendanceList, setAttendanceList] = useState([]);
  const [librarian, setLibrarian] = useState(
    JSON.parse(localStorage.getItem("librarian")) || {}
  );

  // Profile & Password Modal State
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [editOwnerName, setEditOwnerName] = useState(librarian.ownerName || "");
  const [photoUrl, setPhotoUrl] = useState(librarian.photo || "");
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const [savingProfile, setSavingProfile] = useState(false);

  // Change Password State
  const [showChangePasswordSection, setShowChangePasswordSection] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [changingPassword, setChangingPassword] = useState(false);

  const handleChangePassword = async (e) => {
    e.preventDefault();

    if (!currentPassword || !newPassword || !confirmPassword) {
      toast.error("All password fields are required.");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("New password and confirmation password must be the same.");
      return;
    }

    if (newPassword.length < 8) {
      toast.error("New password must be at least 8 characters long.");
      return;
    }

    try {
      setChangingPassword(true);
      const librarianId = librarian._id || librarian.id;
      const response = await API.put(`/librarians/${librarianId}/change-password`, {
        currentPassword,
        newPassword,
        confirmPassword,
      });

      if (response.data.success) {
        toast.success(response.data.message || "Your password has been changed successfully.");
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
        setShowChangePasswordSection(false);
      }
    } catch (error) {
      const errMsg = error.response?.data?.message || "Failed to update password.";
      toast.error(errMsg);
    } finally {
      setChangingPassword(false);
    }
  };

  useEffect(() => {
    if (librarian) {
      setEditOwnerName(librarian.ownerName || "");
      setPhotoUrl(librarian.photo || "");
    }
  }, [librarian]);

  const fetchLibrarianProfile = async () => {
    try {
      if (!librarian?._id) return;
      const response = await API.get(`/librarians/${librarian._id}`);
      if (response.data.success) {
        const freshLibrarian = response.data.librarian;
        setLibrarian(freshLibrarian);
        localStorage.setItem("librarian", JSON.stringify(freshLibrarian));
        if (freshLibrarian.libraryId?._id) {
          localStorage.setItem("libraryId", freshLibrarian.libraryId._id);
        }
      }
    } catch (error) {
      console.error("Failed to load fresh librarian profile:", error);
    }
  };

  const fetchSeats = async () => {
    try {
      const libraryId = localStorage.getItem("libraryId");
      if (!libraryId) return;

      const response = await API.get(`/seats/${libraryId}`);
      setLibrarySeats(response.data.seats);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchAttendance = async () => {
    try {
      const libraryId = localStorage.getItem("libraryId");
      if (!libraryId) return;

      const response = await API.get(`/attendance?libraryId=${libraryId}`);
      setAttendanceList(response.data.attendance);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchCustomRequests = async () => {
    try {
      const libraryId = librarian.libraryId?._id || localStorage.getItem("libraryId");
      if (!libraryId) return;

      const response = await API.get(`/custom-requests?libraryId=${libraryId}`);
      setCustomRequests(response.data.customRequests);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (!librarian?._id) {
      navigate("/librarian-login", { replace: true });
      return;
    }

    fetchLibrarianProfile();
    fetchBookings();
    fetchSeats();
    fetchAttendance();
    fetchCustomRequests();

    const interval = setInterval(() => {
      fetchBookings();
      fetchSeats();
      fetchAttendance();
      fetchCustomRequests();
    }, 30000);

    return () => clearInterval(interval);
  }, []);

const fetchBookings = async () => {
  try {
    const libraryId = localStorage.getItem("libraryId");
    if (!libraryId) return;

    const response = await API.get(`/bookings?libraryId=${libraryId}`);

    setRequests(response.data.bookings);
  } catch (error) {
    console.error(error);
  }
};

const pendingRequests = requests.filter((r) => r.status === "Pending");
const approvedRequests = requests.filter((r) => r.status === "Approved");
const rejectedRequests = requests.filter((r) => r.status === "Rejected");

const [librarySeats, setLibrarySeats] = useState([]);

const [seatNumber, setSeatNumber] = useState("");
const [customRequests, setCustomRequests] = useState([]);

const totalRevenue = requests
  .filter((r) => r.status === "Approved")
  .reduce(
    (sum, booking) =>
      sum + Number(booking.amount || 0),
    0
  );

const occupiedSeats = librarySeats.filter(
  (seat) => seat.slotAvailability?.some(
    (s) => s.status === "booked"
  )
).length;
const totalSeats = librarySeats.length;

const occupancyPercentage =
  totalSeats > 0
    ? Math.round((occupiedSeats / totalSeats) * 100)
    : 0;

const totalStudents = requests.length;
const today =
  new Date().toLocaleDateString();

const presentToday = attendanceList.filter(
  (a) => a.date === today
).length;

const uniqueStudents =
  new Set(
    attendanceList.map((a) => a.studentId?.mobile).filter(Boolean)
  ).size;

const totalAttendance =
  attendanceList.length;
  // Booking Approval
const updateStatus = async (id, status) => {
  try {
    console.log("===========");
    console.log("Button Clicked");
    console.log("Booking ID:", id);
    console.log("Status:", status);

    if (status === "Approved") {
      const response = await API.patch(
        `/bookings/${id}/approve`
      );

      console.log("Approve Success");
      console.log(response.data);
    } else {
      const response = await API.patch(
        `/bookings/${id}/reject`
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
  const updateCustomStatus = async (id, status) => {
    try {
      const response = await API.patch(`/custom-requests/${id}`, { status });
      if (response.data.success) {
        toast.success(`Custom request ${status.toLowerCase()} successfully`);
        fetchCustomRequests();
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to update custom request status");
    }
  };

  // Add Seat
  const addSeat = async () => {
    try {
      const libraryId = librarian.libraryId?._id || localStorage.getItem("libraryId");

      if (!libraryId) {
        toast.error("Library ID Missing");
        return;
      }

      await API.post(
        "/seats",
        {
          libraryId,
          seatNumber: Number(seatNumber),
        }
      );

      setSeatNumber("");
      toast.success("Seat added successfully");
      fetchSeats();

    } catch (error) {
      console.error(error);
      toast.error("Failed to add seat");
    }
  };

  const handlePhotoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("photo", file);

    try {
      setUploadingPhoto(true);
      const res = await API.post("/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setPhotoUrl(res.data.imageUrl);
      toast.success("Photo uploaded successfully");
    } catch (err) {
      console.error(err);
      toast.error("Failed to upload photo");
    } finally {
      setUploadingPhoto(false);
    }
  };

  const saveProfile = async () => {
    try {
      if (!librarian?._id) return;
      setSavingProfile(true);

      const response = await API.put(`/librarians/${librarian._id}`, {
        ownerName: editOwnerName,
        photo: photoUrl,
      });

      if (response.data.success) {
        setLibrarian(response.data.librarian);
        localStorage.setItem("librarian", JSON.stringify(response.data.librarian));
        toast.success("Profile updated successfully");
        setShowProfileModal(false);
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to update profile");
    } finally {
      setSavingProfile(false);
    }
  };

  const handleLibrarianLogout = () => {
    localStorage.removeItem("librarian");
    localStorage.removeItem("libraryId");
    navigate("/librarian-login", { replace: true });
  };

  return (
    
    <div className="min-h-screen bg-slate-100">
      <div className="bg-white shadow border-b">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between gap-4">
          {/* Left Side: Brand Logo and Name */}
          <div className="shrink-0">
            <LibraryNodeBrand size="md" />
          </div>

          {/* Center: Library Name (Visual Focus) */}
          <div className="text-center flex-1 min-w-0">
            <span className="inline-block px-4 py-2 rounded-full bg-blue-50 text-blue-800 font-extrabold text-base md:text-lg border border-blue-100 shadow-sm truncate max-w-full">
              🏫 {librarian.libraryId?.name || "Library Desktop"}
            </span>
          </div>

          {/* Right Side: Owner Identity and Profile Photo */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="text-right hidden sm:block">
              <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">
                Library Desktop
              </p>
              <p className="text-sm text-slate-700">
                <strong>Owner:</strong> <span className="font-bold text-slate-900">{librarian.ownerName || "Owner"}</span>
              </p>
            </div>
            
            <button
              onClick={() => setShowProfileModal(true)}
              className="focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-full transition"
            >
              <img
                src={
                  librarian.photo ||
                  "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                }
                alt="Owner Profile"
                className="w-10 h-10 rounded-full border border-slate-200 hover:scale-105 transition object-cover"
              />
            </button>
          </div>
        </div>
      </div>
      <div className="max-w-6xl mx-auto p-5">
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
        {/* Pending Booking Requests */}
        <div className="bg-white rounded-2xl shadow p-5 mb-6">
          <h2 className="text-xl font-bold text-yellow-600 mb-4">
            ⏳ Pending Requests
          </h2>
          {pendingRequests.length === 0 ? (
            <p className="text-slate-500 text-sm">No Pending Booking Requests</p>
          ) : (
            pendingRequests.map((request) => (
              <div
                key={request._id || request.id}
                className="border border-yellow-200 bg-yellow-50/30 rounded-xl p-4 mb-4"
              >
                <p className="font-semibold text-lg text-slate-800">
                  {request.studentId?.name || "Unknown Student"}
                </p>
                <p className="text-slate-600 text-sm mt-1">
                  <strong>Mobile:</strong> {request.studentId?.mobile || "N/A"}
                </p>
                <p className="text-slate-600 text-sm">
                  <strong>Seat:</strong> {request.seatNumber} &nbsp;|&nbsp;
                  <strong>Slot:</strong> {request.slotSnapshot?.name || request.slot}
                </p>
                <p className="text-slate-600 text-sm">
                  <strong>Plan:</strong> {request.planDuration} Month &nbsp;|&nbsp;
                  <strong>Amount:</strong> ₹{request.amount}
                </p>
                <div className="flex gap-3 mt-4">
                  <button
                    onClick={() =>
                      updateStatus(
                        request._id || request.id,
                        "Approved"
                      )
                    }
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition"
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
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition"
                  >
                    Reject
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Approved / Active Records */}
        <div className="bg-white rounded-2xl shadow p-5 mb-6">
          <h2 className="text-xl font-bold text-green-600 mb-4">
            ✅ Approved / Active Records
          </h2>
          {approvedRequests.length === 0 ? (
            <p className="text-slate-500 text-sm">No Approved Active Bookings</p>
          ) : (
            approvedRequests.map((request) => (
              <div
                key={request._id || request.id}
                className="border border-green-200 bg-green-50/30 rounded-xl p-4 mb-4"
              >
                <p className="font-semibold text-lg text-slate-800">
                  {request.studentId?.name || "Unknown Student"}
                </p>
                <p className="text-slate-600 text-sm mt-1">
                  <strong>Mobile:</strong> {request.studentId?.mobile || "N/A"}
                </p>
                <p className="text-slate-600 text-sm">
                  <strong>Seat:</strong> {request.seatNumber} &nbsp;|&nbsp;
                  <strong>Slot:</strong> {request.slotSnapshot?.name || request.slot}
                </p>
                <p className="text-slate-600 text-sm">
                  <strong>Plan:</strong> {request.planDuration} Month &nbsp;|&nbsp;
                  <strong>Amount:</strong> ₹{request.amount}
                </p>
              </div>
            ))
          )}
        </div>

        {/* Rejected / History Records */}
        <div className="bg-white rounded-2xl shadow p-5 mb-6">
          <h2 className="text-xl font-bold text-red-600 mb-4">
            ❌ Rejected / History Records
          </h2>
          {rejectedRequests.length === 0 ? (
            <p className="text-slate-500 text-sm">No Rejected History Records</p>
          ) : (
            rejectedRequests.map((request) => (
              <div
                key={request._id || request.id}
                className="border border-red-200 bg-red-50/30 rounded-xl p-4 mb-4"
              >
                <p className="font-semibold text-lg text-slate-800">
                  {request.studentId?.name || "Unknown Student"}
                </p>
                <p className="text-slate-600 text-sm mt-1">
                  <strong>Mobile:</strong> {request.studentId?.mobile || "N/A"}
                </p>
                <p className="text-slate-600 text-sm">
                  <strong>Seat:</strong> {request.seatNumber} &nbsp;|&nbsp;
                  <strong>Slot:</strong> {request.slotSnapshot?.name || request.slot}
                </p>
                <p className="text-slate-600 text-sm">
                  <strong>Plan:</strong> {request.planDuration} Month &nbsp;|&nbsp;
                  <strong>Amount:</strong> ₹{request.amount}
                </p>
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

      {/* Profile Edit Modal */}
      {showProfileModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-8 max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl relative">
            <button
              onClick={() => setShowProfileModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 text-xl font-bold"
            >
              ✕
            </button>

            <h2 className="text-2xl font-bold mb-6 text-slate-800">
              Owner Profile Settings
            </h2>

            <div className="flex flex-col items-center mb-6">
              <img
                src={
                  photoUrl ||
                  "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                }
                alt="Profile"
                className="w-28 h-28 rounded-full border-4 border-blue-500 object-cover shadow"
              />

              <label className="mt-3 bg-blue-50 hover:bg-blue-100 text-blue-600 px-4 py-2 rounded-xl text-sm font-semibold cursor-pointer transition">
                {uploadingPhoto ? "Uploading..." : "Change Photo"}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  disabled={uploadingPhoto}
                  className="hidden"
                />
              </label>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">
                  Owner Name
                </label>
                <input
                  type="text"
                  value={editOwnerName}
                  onChange={(e) => setEditOwnerName(e.target.value)}
                  className="w-full border border-slate-200 rounded-xl p-3 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-500 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  value={librarian.email || ""}
                  disabled
                  className="w-full border border-slate-100 bg-slate-50 rounded-xl p-3 text-slate-500 cursor-not-allowed"
                />
              </div>

              <div className="border-t pt-4">
                <h3 className="font-bold text-slate-700 mb-2">Library Details</h3>

                <div className="grid grid-cols-2 gap-4 text-sm text-slate-600">
                  <div>
                    <span className="block font-semibold text-slate-500">Library Name</span>
                    <span>{librarian.libraryId?.name || "N/A"}</span>
                  </div>
                  <div>
                    <span className="block font-semibold text-slate-500">Library ID</span>
                    <span className="font-mono text-xs">{librarian.libraryId?._id || "N/A"}</span>
                  </div>
                  <div>
                    <span className="block font-semibold text-slate-500">Contact Mobile</span>
                    <span>{librarian.libraryId?.mobile || "N/A"}</span>
                  </div>
                  <div>
                    <span className="block font-semibold text-slate-500">Total Seats</span>
                    <span>{librarian.libraryId?.totalSeats || "N/A"}</span>
                  </div>
                </div>

                <div className="mt-2 text-sm text-slate-600">
                  <span className="block font-semibold text-slate-500">Address</span>
                  <span>
                    {librarian.libraryId?.address || ""}, {librarian.libraryId?.city || ""}, {librarian.libraryId?.district || ""}, {librarian.libraryId?.state || ""}
                  </span>
                </div>
              </div>

              {/* Change Password Section */}
              <div className="border-t pt-4">
                {!showChangePasswordSection ? (
                  <button
                    type="button"
                    onClick={() => setShowChangePasswordSection(true)}
                    className="w-full bg-blue-50 hover:bg-blue-100 text-blue-600 font-bold py-3 rounded-xl transition flex items-center justify-center gap-2 border border-blue-200"
                  >
                    🔑 Change Password
                  </button>
                ) : (
                  <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-3">
                    <div className="flex justify-between items-center mb-1">
                      <h4 className="font-bold text-slate-800 text-sm flex items-center gap-1.5">
                        🔒 Change Password
                      </h4>
                      <button
                        type="button"
                        onClick={() => {
                          setShowChangePasswordSection(false);
                          setCurrentPassword("");
                          setNewPassword("");
                          setConfirmPassword("");
                        }}
                        className="text-xs text-slate-400 hover:text-slate-600 font-semibold"
                      >
                        Cancel
                      </button>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Current Password
                      </label>
                      <input
                        type="password"
                        placeholder="Enter current password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        className="w-full border border-slate-200 rounded-xl p-2.5 text-sm bg-white focus:outline-none focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        New Password
                      </label>
                      <input
                        type="password"
                        placeholder="Enter new password (min 8 chars)"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="w-full border border-slate-200 rounded-xl p-2.5 text-sm bg-white focus:outline-none focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Confirm New Password
                      </label>
                      <input
                        type="password"
                        placeholder="Confirm new password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full border border-slate-200 rounded-xl p-2.5 text-sm bg-white focus:outline-none focus:border-blue-500"
                      />
                    </div>

                    <div className="flex gap-2 pt-2">
                      <button
                        type="button"
                        onClick={handleChangePassword}
                        disabled={changingPassword}
                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-sm py-2.5 rounded-xl font-bold transition disabled:opacity-50"
                      >
                        {changingPassword ? "Updating..." : "Update Password"}
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setShowChangePasswordSection(false);
                          setCurrentPassword("");
                          setNewPassword("");
                          setConfirmPassword("");
                        }}
                        className="bg-slate-200 hover:bg-slate-300 text-slate-700 text-sm px-4 py-2.5 rounded-xl font-semibold transition"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-3 mt-8">
              <div className="flex gap-3">
                <button
                  onClick={saveProfile}
                  disabled={savingProfile || uploadingPhoto}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-bold transition disabled:opacity-50"
                >
                  {savingProfile ? "Saving..." : "Save Changes"}
                </button>
                <button
                  onClick={() => setShowProfileModal(false)}
                  className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 py-3 rounded-xl font-bold transition"
                >
                  Cancel
                </button>
              </div>

              <button
                onClick={handleLibrarianLogout}
                className="w-full bg-red-500 hover:bg-red-600 text-white py-3.5 rounded-xl font-bold transition shadow"
              >
                🚪 Logout from Library Desktop
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default LibrarianDashboard;