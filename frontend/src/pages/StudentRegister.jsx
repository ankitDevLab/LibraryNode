import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import { toast } from "react-hot-toast";

function StudentRegister() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [aadhar, setAadhar] = useState("");
  const [photo, setPhoto] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSlow, setIsSlow] = useState(false);
  const slowTimerRef = useRef(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // Clean up timer on unmount
  useEffect(() => {
    return () => {
      if (slowTimerRef.current) clearTimeout(slowTimerRef.current);
    };
  }, []);

  const handlePhoto = async (e) => {
    try {
      const file = e.target.files[0];
      if (!file) return;

      const formData = new FormData();
      formData.append("photo", file);

      const response = await API.post(
        "/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setPhoto(response.data.imageUrl);
      toast.success("Photo Uploaded Successfully");
    } catch (error) {
      console.error(error);
      toast.error("Photo Upload Failed");
    }
  };

  const registerStudent = async () => {
    try {
      if (!name || !mobile || !photo) {
        toast.error("Please fill the name, mobile and upload a photo.");
        return;
      }

      setLoading(true);
      setIsSlow(false);

      // Start a 5s timer — if the request hasn't resolved, show cold-start warning
      slowTimerRef.current = setTimeout(() => setIsSlow(true), 5000);

      const response = await API.post(
        "/students",
        {
          name,
          mobile,
          email,
          aadhar,
          photo,
        }
      );

      localStorage.setItem(
        "studentProfile",
        JSON.stringify(response.data.student)
      );

      clearTimeout(slowTimerRef.current);
      setShowSuccessModal(true);
    } catch (error) {
      clearTimeout(slowTimerRef.current);
      console.error(error);
      toast.error(
        error.response?.data?.message ||
        "Registration Failed"
      );
    } finally {
      setLoading(false);
      setIsSlow(false);
    }
  };
  return (
    <div className="min-h-screen bg-slate-100 py-8 px-4">
      <div className="max-w-xl mx-auto bg-white rounded-2xl shadow-lg p-8">

        <button
          onClick={() => navigate("/student-login")}
          className="text-blue-600 mb-6 hover:underline"
        >
          ← Back
        </button>

        <h2 className="text-3xl font-bold text-center">
          Student Registration
        </h2>

        <p className="text-center text-slate-500 mt-2 mb-8">
          Create your Library Node account
        </p>

        <div className="space-y-4">

        <input
          type="file"
          accept="image/*"
          onChange={handlePhoto}
          className="w-full border rounded-xl p-3"
        />
        {photo && (
            <img
              src={photo}
              alt="Student"
              className="w-24 h-24 rounded-full object-cover mx-auto mt-4"
            />
          )}

        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border rounded-xl p-3"
        />

          <input
            type="tel"
            placeholder="Phone Number"
            value={mobile}
            onChange={(e)=> setMobile(e.target.value)}
            className="w-full border rounded-xl p-3"
          />

          <input
            type="email"
            placeholder="Email (Optional)"
            value={email}
            onChange={(e)=> setEmail(e.target.value)}
            className="w-full border rounded-xl p-3"
          />

          <input
            type="text"
            placeholder="Aadhaar Number (Optional)"
            value={aadhar}
            onChange={(e)=>setAadhar(e.target.value)}
            className="w-full border rounded-xl p-3"
          />

          <select className="w-full border rounded-xl p-3">
            <option>Select Gender</option>
            <option>Male</option>
            <option>Female</option>
          </select>

          <textarea
            rows="4"
            placeholder="Address"
            className="w-full border rounded-xl p-3"
          />

          <button
                onClick={registerStudent}
                disabled={loading}
                
                className={`w-full py-3 rounded-xl text-white font-semibold transition-all ${
                  loading
                    ? "bg-blue-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
          >
            {loading ? (
              <>
                <span className="auth-spinner" />
                Registering...
              </>
            ) : (
              "Register"
            )}
          </button>

          {/* Cold-start warning — appears after 5s of waiting */}
          {isSlow && (
            <div className="cold-start-warning">
              <span className="cold-start-icon">⏳</span>
              <span>
                First request may take up to a minute while the server wakes up. Please wait...
              </span>
            </div>
          )}

        </div>
      </div>

      {showSuccessModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl text-center border border-slate-100 transition transform hover:scale-[1.01]">
            <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl text-green-600">
              ✅
            </div>

            <h3 className="text-2xl font-black text-slate-800 mb-2 tracking-tight">
              Registration Successful
            </h3>

            <p className="text-xl font-bold text-blue-600 mb-4">
              {name}
            </p>

            <p className="text-slate-500 font-medium leading-relaxed mb-8">
              Your account has been registered successfully. Welcome to Library Node!
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
    </div>
  );
}

export default StudentRegister;