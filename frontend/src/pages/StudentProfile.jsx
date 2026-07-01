import { useNavigate } from "react-router-dom";

function StudentProfile() {
  const navigate = useNavigate();

  const student =
    JSON.parse(localStorage.getItem("studentProfile")) || {};

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
            LibrarySphere Student
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

          <div className="bg-slate-50 rounded-xl p-4">
            <h3 className="font-semibold text-slate-500">
              Email
            </h3>

            <p className="text-lg">
              {student.email}
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

        </div>

      </div>
    </div>
  );
}

export default StudentProfile;