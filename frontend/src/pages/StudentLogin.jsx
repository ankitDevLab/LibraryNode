import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

function StudentLogin() {
  const navigate = useNavigate();

  const [mobile, setMobile] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [studentName, setStudentName] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const loginStudent = async () => {
    try {
      const response = await API.post(
        "/students/login",
        {
          mobile,
        }
      );

      localStorage.setItem(
        "studentProfile",
        JSON.stringify(response.data.student)
      );

      setStudentName(response.data.student.name || "");
      setShowSuccessModal(true);
    } catch (error) {
      console.error(error);

      console.log(
        "SERVER ERROR:",
        error.response?.data
      );

      setErrorMsg(
        error.response?.data?.message ||
        "Your login ID or credentials are not valid. Please check and try again."
      );
      setShowErrorModal(true);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-5">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">

        <button
          onClick={() => navigate("/")}
          className="mb-6 text-blue-600 hover:underline"
        >
          ← Back
        </button>
        <div className="flex items-center justify-between px-6 py-4 bg-white shadow">

  <div className="flex items-center gap-3">

    <img
      src="/logo.png"
      alt="LibrarySphere"
      className="w-12 h-12 object-contain"
    />

    <div>
      <h1 className="text-2xl font-bold text-blue-600">
        LibrarySphere
      </h1>

      <p className="text-xs text-slate-500">
        Library Booking Platform
      </p>
    </div>

  </div>

</div>
        <h2 className="text-3xl font-bold text-center">
          Student Login
        </h2>

        <p className="text-center text-slate-500 mt-2 mb-6">
          Login to your account
        </p>

        <input
  type="tel"
  placeholder="Mobile Number"
  value={mobile}
  onChange={(e) => setMobile(e.target.value)}

          className="w-full border border-slate-300 rounded-xl p-3 mb-4"
        />

        <button
          onClick={loginStudent}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl"
        >
          Login
        </button>

        <p className="text-center mt-6 text-slate-600">
          New Student?
        </p>

        <button
          onClick={() =>
            navigate("/student-register")
          }
          className="w-full mt-2 border border-blue-600 text-blue-600 py-3 rounded-xl hover:bg-blue-50"
        >
          Register Account
        </button>

      </div>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl text-center border border-slate-100 transition transform hover:scale-[1.01]">
            <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl text-green-600">
              ✅
            </div>

            <h3 className="text-2xl font-black text-slate-800 mb-2 tracking-tight">
              Login Successful
            </h3>

            {studentName && (
              <p className="text-xl font-bold text-blue-600 mb-4">
                {studentName}
              </p>
            )}

            <p className="text-slate-500 font-medium leading-relaxed mb-8">
              Your login was successful. Welcome back to LibrarySphere!
            </p>

            <button
              onClick={() => navigate("/student-dashboard")}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl font-bold transition-all shadow-md hover:shadow-lg"
            >
              Continue to Dashboard
            </button>
          </div>
        </div>
      )}

      {/* Error Modal */}
      {showErrorModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl text-center border border-slate-100 transition transform hover:scale-[1.01]">
            <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl text-red-500">
              🚫
            </div>

            <h3 className="text-2xl font-black text-slate-800 mb-2 tracking-tight">
              Login Failed
            </h3>

            <p className="text-slate-500 font-medium leading-relaxed mb-8 text-sm">
              {errorMsg}
            </p>

            <button
              onClick={() => setShowErrorModal(false)}
              className="w-full bg-slate-800 hover:bg-slate-900 text-white py-4 rounded-2xl font-bold transition-all shadow-md hover:shadow-lg"
            >
              Try Again
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default StudentLogin;