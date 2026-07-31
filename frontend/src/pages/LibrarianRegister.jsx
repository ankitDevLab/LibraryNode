import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import { toast } from "react-hot-toast";

function LibrarianRegister() {
    const navigate = useNavigate();
    const [libraryPhoto, setLibraryPhoto] = useState("");
    const [ownerName, setOwnerName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [libraryName, setLibraryName] = useState("");
    const [stateName, setStateName] = useState("");
    const [district, setDistrict] = useState("");
    const [city, setCity] = useState("");
    const [address, setAddress] = useState("");
    const [mobile, setMobile] = useState("");
    const [totalSeats, setTotalSeats] = useState("");
    const [slot1Price, setSlot1Price] = useState("");
    const [slot2Price, setSlot2Price] = useState("");
    const [slot3Price, setSlot3Price] = useState("");
    const [slot4Price, setSlot4Price] = useState("");
    const [loading, setLoading] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
const createLibrary = async () => {
  try {
    if (
      !ownerName ||
      !email ||
      !password ||
      !libraryName ||
      !mobile ||
      !totalSeats
    ) {
      return toast.error("Please fill all required fields");
    }

    setLoading(true);  
    const response = await API.post(
      "/libraries",
      {
        name: libraryName,
        state: stateName,
        district,
        city,
        address,
        mobile,
        totalSeats: Number(totalSeats),

    slot1Price: Number(slot1Price),
    slot2Price: Number(slot2Price),
    slot3Price: Number(slot3Price),
    slot4Price: Number(slot4Price),
  }
);

const librarianResponse = await API.post(
  "/librarians/register",
  {
    ownerName,
    email,
    password,
    libraryId: response.data.library._id,
  }
);
localStorage.setItem(
  "librarian",
  JSON.stringify(librarianResponse.data.librarian)
);
    localStorage.setItem(
      "libraryId",
      response.data.library._id
    );
    toast.success("Library Created Successfully! Your library has been created successfully.", {
      duration: 4000,
    });

    setShowSuccessModal(true);
  } catch (error) {
    console.error(error);

    toast.error(
      error.response?.data?.message ||
      "Failed to Create Library"
    );
  } finally {
    setLoading(false);
  }
};
  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-5">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-2xl">

        <h1 className="text-3xl font-bold text-center mb-6">
          Create Library Account
        </h1>

        <div className="grid md:grid-cols-2 gap-4">

          <input
          type="text"
          placeholder="Owner Name"
          value={ownerName}
          onChange={(e) => setOwnerName(e.target.value)}
          className="border p-3 rounded-lg"
        />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border p-3 rounded-lg"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border p-3 rounded-lg"
          />

        <input
        type="text"
        placeholder="Library Name"
        value={libraryName}
        onChange={(e) => setLibraryName(e.target.value)}
        className="border p-3 rounded-lg"
        />

          <input
            type="text"
            placeholder="State"
            value={stateName}
            onChange={(e) => setStateName(e.target.value)} 
            className="border p-3 rounded-lg"
          />

          <input
            type="text"
            placeholder="District"
            value={district}
            onChange={(e) => setDistrict(e.target.value)}
            className="border p-3 rounded-lg"
          />

            <input
            type="text"
            placeholder="City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="border p-3 rounded-lg"
            />

          <input
            type="text"
            placeholder="Mobile Number"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            className="border p-3 rounded-lg"
          />

        </div>

        <textarea
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="border p-3 rounded-lg w-full mt-4"
          rows="3"
        />

        <input
          type="number"
          placeholder="Total Seats"
          value={totalSeats}
          onChange={(e) => setTotalSeats(e.target.value)}
          className="border p-3 rounded-lg w-full mt-4"
        />
        <div className="mt-6">
  <h2 className="text-xl font-bold mb-4">
    Slot Pricing
  </h2>

  <div className="space-y-3">

    <input
      type="number"
      placeholder="Morning Slot Price (06:00 AM - 11:00 AM)"
      value={slot1Price}
      onChange={(e) => setSlot1Price(e.target.value)}
      className="border p-3 rounded-lg w-full"
    />

    <input
      type="number"
      placeholder="Afternoon Slot Price (11:00 AM - 04:00 PM)"
      value={slot2Price}
      onChange={(e) => setSlot2Price(e.target.value)}
      className="border p-3 rounded-lg w-full"
    />

    <input
      type="number"
      placeholder="Evening Slot Price (04:00 PM - 09:00 PM)"
      value={slot3Price}
      onChange={(e) => setSlot3Price(e.target.value)}
      className="border p-3 rounded-lg w-full"
    />

    <input
      type="number"
      placeholder="Night Slot Price (09:00 PM - 06:00 AM)"
      value={slot4Price}
      onChange={(e) => setSlot4Price(e.target.value)}
      className="border p-3 rounded-lg w-full"
    />

  </div>
</div>
<div className="mt-4">

  {/* <label className="font-semibold">
    Library Photo
  </label> */}
{/* 
  <input
    type="file"
    accept="image/*"
    onChange={handlePhoto}
    className="w-full mt-2"
  />

  {libraryPhoto && (
    <img
      src={libraryPhoto}
      alt="Library"
      className="w-full h-48 object-cover rounded-xl mt-3"
    />
  )} */}

</div>

    <button
  onClick={createLibrary}
  disabled={loading}
  className="w-full mt-6 bg-blue-600 text-white py-3 rounded-lg"
>
  {loading ? "Creating..." : "Create Library"}
</button>

      </div>

      {showSuccessModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl text-center border border-slate-100 transition transform hover:scale-[1.01]">
            <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl text-green-600">
              ✅
            </div>

            <h3 className="text-2xl font-black text-slate-800 mb-2 tracking-tight">
              Library Registered Successfully
            </h3>

            <div className="bg-slate-50 rounded-2xl p-5 mb-6 text-left space-y-2.5 text-sm border border-slate-100">
              <div>
                <span className="font-bold text-slate-500 mr-2">Library Name:</span>
                <span className="font-extrabold text-slate-800">{libraryName}</span>
              </div>
              <div>
                <span className="font-bold text-slate-500 mr-2">Owner:</span>
                <span className="font-extrabold text-slate-800">{ownerName}</span>
              </div>
            </div>

            <p className="text-slate-500 font-medium leading-relaxed mb-8">
              Your library has been registered successfully. Welcome to LibrarySphere!
            </p>

            <button
              onClick={() => navigate("/librarian-dashboard")}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl font-bold transition-all shadow-md hover:shadow-lg"
            >
              Continue to Library Desktop
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default LibrarianRegister;