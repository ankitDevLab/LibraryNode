import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
function StudentRegister() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [aadhar, setAadhar] = useState("");
  const [photo, setPhoto] = useState("");
  const [loading, setLoading] = useState(false);
  const handlePhoto = async (e) => {
  try {
    const file = e.target.files[0];

    if (!file) return;

    const formData = new FormData();

    // This must match upload.single("photo") in the backend
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

    // Save Cloudinary URL
    setPhoto(response.data.imageUrl);

    alert("Photo Uploaded Successfully");
  } catch (error) {
    console.error(error);

    alert("Photo Upload Failed");
  }
};
  const registerStudent = async () => {
  try {
    if (!name || !mobile || !photo) {
      return alert("Please fill the name,mobile and upload a photo.");
    }

    setLoading(true);

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

    alert("Registration Successful");

    navigate("/student-dashboard");
  } catch (error) {
    console.error(error);

    alert(
      error.response?.data?.message ||
      "Registration Failed"
    );
  } finally {
    setLoading(false);
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
          Create your LibrarySphere account
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
                
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl"
          >
            {loading ? "Registering..." : "Register"}
          </button>

        </div>
      </div>
    </div>
  );
}

export default StudentRegister;