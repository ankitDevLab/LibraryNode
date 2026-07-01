import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
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
      return alert("Please fill all required fields");
    }

    setLoading(true);  
    const response = await axios.post(
  "http://localhost:5000/api/libraries",
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

const librarianResponse = await axios.post(
  "http://localhost:5000/api/librarians/register",
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
alert("Library Created Successfully");

navigate("/librarian-dashboard");
  } catch (error) {
    console.error(error);

    alert(
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
      placeholder="6 AM - 6 PM Price"
      value={slot1Price}
      onChange={(e) => setSlot1Price(e.target.value)}
      className="border p-3 rounded-lg w-full"
    />

    <input
      type="number"
      placeholder="8 AM - 6 PM Price"
      value={slot2Price}
      onChange={(e) => setSlot2Price(e.target.value)}
      className="border p-3 rounded-lg w-full"
    />

    <input
      type="number"
      placeholder="10 PM - 6 AM Price"
      value={slot3Price}
      onChange={(e) => setSlot3Price(e.target.value)}
      className="border p-3 rounded-lg w-full"
    />

    <input
      type="number"
      placeholder="4 PM - 10 AM Price"
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
    </div>
  );
}

export default LibrarianRegister;