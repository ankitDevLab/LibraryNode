import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

function StudentProfile() {
  const navigate = useNavigate();

  const stored =
    JSON.parse(localStorage.getItem("studentProfile")) || {};

  const [student, setStudent] = useState(stored);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);

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

      </div>
    </div>
  );
}

export default StudentProfile;