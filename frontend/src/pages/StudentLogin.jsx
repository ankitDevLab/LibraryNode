import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

function StudentLogin() {
  const navigate = useNavigate();

  const [mobile, setMobile] = useState("");

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

      alert("Login Successful");

      navigate("/student-dashboard");
    } catch (error) {
  console.error(error);

  console.log(
    "SERVER ERROR:",
    error.response?.data
  );

  alert(
    error.response?.data?.message ||
    "Login Failed"
  );
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
    </div>
  );
}

export default StudentLogin;