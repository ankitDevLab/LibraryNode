import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import { toast } from "react-hot-toast";

function StudentProfile() {
  const navigate = useNavigate();

  const stored =
    JSON.parse(localStorage.getItem("studentProfile")) || {};

  const [student, setStudent] = useState(stored);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);

  // Delete account modal states
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [confirmMobile, setConfirmMobile] = useState("");
  const [confirmPhrase, setConfirmPhrase] = useState("");
  const [deletingAccount, setDeletingAccount] = useState(false);

  const handleDeleteAccount = async () => {
    if (confirmPhrase !== "DELETE") {
      toast.error("Please type the confirmation phrase exactly: DELETE");
      return;
    }
    if (!confirmMobile) {
      toast.error("Please enter your mobile number.");
      return;
    }

    try {
      setDeletingAccount(true);
      const response = await API.delete(`/students/${student._id}`, {
        data: {
          mobile: confirmMobile,
          confirmation: confirmPhrase,
        },
      });

      if (response.data.success) {
        toast.success("Account deleted successfully.");
        localStorage.removeItem("studentProfile");
        setShowDeleteModal(false);
        navigate("/", { replace: true });
      }
    } catch (error) {
      console.error(error);
      const errMsg = error.response?.data?.message || "Failed to delete account.";
      toast.error(errMsg);
    } finally {
      setDeletingAccount(false);
    }
  };

  // Editable fields
  const [name, setName] = useState(student.name || "");
  const [email, setEmail] = useState(student.email || "");
  const [college, setCollege] = useState(student.college || "");
  const [course, setCourse] = useState(student.course || "");

  const handleLogout = () => {
    localStorage.removeItem("studentProfile");
    navigate("/", { replace: true });
  };

  useEffect(() => {
    if (!student?._id) {
      navigate("/student-login", { replace: true });
      return;
    }

    const fetchFreshProfile = async () => {
      try {
        const response = await API.get(`/students/${student._id}`);
        if (response.data.success) {
          const freshStudent = response.data.student;
          setStudent(freshStudent);
          setName(freshStudent.name || "");
          setEmail(freshStudent.email || "");
          setCollege(freshStudent.college || "");
          setCourse(freshStudent.course || "");
          localStorage.setItem("studentProfile", JSON.stringify(freshStudent));
        }
      } catch (error) {
        console.error("Failed to load fresh student profile:", error);
      }
    };
    fetchFreshProfile();
  }, []);

  const saveProfile = async () => {
    try {
      if (!student._id) return alert("Student ID missing");

      setSaving(true);

      const response = await API.put(
        `/students/${student._id}`,
        { name, email, college, course }
      );

      const updated = response.data.student;

      // Update localStorage with fresh data
      localStorage.setItem(
        "studentProfile",
        JSON.stringify(updated)
      );

      setStudent(updated);
      setEditing(false);

      alert("Profile Updated Successfully");
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
        "Failed to update profile"
      );
    } finally {
      setSaving(false);
    }
  };

  const cancelEdit = () => {
    setName(student.name || "");
    setEmail(student.email || "");
    setCollege(student.college || "");
    setCourse(student.course || "");
    setEditing(false);
  };

  return (
    <div className="min-h-screen bg-slate-100 p-5">
      <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-lg p-8">

        <button
          onClick={() => navigate("/student-dashboard")}
          className="mb-6 text-blue-600 hover:underline"
        >
          ← Back
        </button>

        <div className="flex flex-col items-center">

          <img
            src={
              student.photo ||
              "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            }
            alt="Student"
            className="w-32 h-32 rounded-full object-cover border-4 border-blue-500"
          />

          <h1 className="text-3xl font-bold mt-4">
            {student.name}
          </h1>

          <p className="text-slate-500">
            Library Node Student
          </p>

        </div>

        <div className="grid md:grid-cols-2 gap-6 mt-10">

          <div className="bg-slate-50 rounded-xl p-4">
            <h3 className="font-semibold text-slate-500">
              Mobile
            </h3>
            <p className="text-lg">
              {student.mobile}
            </p>
          </div>

          {editing ? (
            <>
              <div className="bg-slate-50 rounded-xl p-4">
                <h3 className="font-semibold text-slate-500 mb-1">
                  Email
                </h3>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border rounded-lg p-2"
                />
              </div>

              <div className="bg-slate-50 rounded-xl p-4">
                <h3 className="font-semibold text-slate-500 mb-1">
                  Name
                </h3>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border rounded-lg p-2"
                />
              </div>

              <div className="bg-slate-50 rounded-xl p-4">
                <h3 className="font-semibold text-slate-500 mb-1">
                  College
                </h3>
                <input
                  type="text"
                  value={college}
                  onChange={(e) => setCollege(e.target.value)}
                  placeholder="Enter college name"
                  className="w-full border rounded-lg p-2"
                />
              </div>

              <div className="bg-slate-50 rounded-xl p-4">
                <h3 className="font-semibold text-slate-500 mb-1">
                  Course
                </h3>
                <input
                  type="text"
                  value={course}
                  onChange={(e) => setCourse(e.target.value)}
                  placeholder="Enter course name"
                  className="w-full border rounded-lg p-2"
                />
              </div>
            </>
          ) : (
            <>
              <div className="bg-slate-50 rounded-xl p-4">
                <h3 className="font-semibold text-slate-500">
                  Email
                </h3>
                <p className="text-lg">
                  {student.email || "Not Added"}
                </p>
              </div>

              <div className="bg-slate-50 rounded-xl p-4">
                <h3 className="font-semibold text-slate-500">
                  College
                </h3>
                <p className="text-lg">
                  {student.college || "Not Added"}
                </p>
              </div>

              <div className="bg-slate-50 rounded-xl p-4">
                <h3 className="font-semibold text-slate-500">
                  Course
                </h3>
                <p className="text-lg">
                  {student.course || "Not Added"}
                </p>
              </div>
            </>
          )}

        </div>

        <div className="mt-6 flex justify-center gap-3">
          {editing ? (
            <>
              <button
                onClick={saveProfile}
                disabled={saving}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-semibold"
              >
                {saving ? "Saving..." : "Save Changes"}
              </button>

              <button
                onClick={cancelEdit}
                className="bg-slate-200 hover:bg-slate-300 px-6 py-3 rounded-xl font-semibold"
              >
                Cancel
              </button>
            </>
          ) : (
            <div className="flex gap-3">
              <button
                onClick={() => setEditing(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition"
              >
                ✏️ Edit Profile
              </button>
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-xl font-semibold transition"
              >
                🚪 Logout
              </button>
            </div>
          )}
        </div>

        {/* Danger Zone */}
        {!editing && (
          <>
            <hr className="my-8 border-slate-200" />
            <div className="bg-red-50 rounded-2xl p-6 border border-red-100">
              <h3 className="text-lg font-bold text-red-800 mb-1 flex items-center gap-2">
                ⚠️ Danger Zone
              </h3>
              <p className="text-xs sm:text-sm text-red-600 mb-4 leading-relaxed font-medium">
                Once you delete your account, there is no going back. All your library bookings, attendance logs, and quiz practice history will be permanently deleted from our database.
              </p>
              <button
                onClick={() => setShowDeleteModal(true)}
                className="bg-red-600 hover:bg-red-700 text-white px-5 py-2.5 rounded-xl font-bold transition text-xs sm:text-sm shadow-md"
              >
                Delete My Account
              </button>
            </div>
          </>
        )}

      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/60 z-[99999] flex items-center justify-center p-4 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-slate-100 transition transform hover:scale-[1.01]">
            <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-5 text-3xl text-red-600">
              🚨
            </div>

            <h3 className="text-xl sm:text-2xl font-black text-slate-800 mb-2 tracking-tight text-center">
              Are you absolutely sure?
            </h3>

            <p className="text-slate-500 font-medium text-xs sm:text-sm leading-relaxed mb-6 text-center">
              This action <span className="text-red-600 font-bold">cannot</span> be undone. Please confirm by entering your credentials below.
            </p>

            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase tracking-wider">
                  Registered Mobile Number
                </label>
                <input
                  type="tel"
                  placeholder="Enter mobile number"
                  value={confirmMobile}
                  onChange={(e) => setConfirmMobile(e.target.value)}
                  className="w-full border border-slate-200 rounded-xl p-3 text-sm focus:border-red-500 focus:outline-none transition"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase tracking-wider">
                  Type <span className="text-red-600 font-black">DELETE</span> to confirm
                </label>
                <input
                  type="text"
                  placeholder="DELETE"
                  value={confirmPhrase}
                  onChange={(e) => setConfirmPhrase(e.target.value)}
                  className="w-full border border-slate-200 rounded-xl p-3 text-sm focus:border-red-500 focus:outline-none transition"
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleDeleteAccount}
                disabled={deletingAccount || confirmPhrase !== "DELETE" || !confirmMobile}
                className={`flex-1 py-3.5 rounded-2xl font-bold text-sm transition-all shadow-md ${
                  deletingAccount || confirmPhrase !== "DELETE" || !confirmMobile
                    ? "bg-red-300 text-white cursor-not-allowed"
                    : "bg-red-600 hover:bg-red-700 text-white hover:shadow-lg"
                }`}
              >
                {deletingAccount ? "Deleting..." : "Permanently Delete"}
              </button>

              <button
                onClick={() => {
                  setShowDeleteModal(false);
                  setConfirmMobile("");
                  setConfirmPhrase("");
                }}
                disabled={deletingAccount}
                className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 py-3.5 rounded-2xl font-bold text-sm transition-all"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default StudentProfile;