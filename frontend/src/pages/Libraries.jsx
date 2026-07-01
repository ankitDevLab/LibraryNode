import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
function Libraries() {
  const navigate = useNavigate();

const [allLibraries, setAllLibraries] = useState([]);

useEffect(() => {
  fetchLibraries();
}, []);

const fetchLibraries = async () => {
  try {
    const response = await axios.get(
      "http://localhost:5000/api/libraries"
    );

    setAllLibraries(
      response.data.libraries
    );

    console.log(
      "LIBRARIES:",
      response.data.libraries
    );
  } catch (error) {
    console.error(error);
  }
};

  return (
    <div className="min-h-screen bg-slate-100 p-5">
      <div className="max-w-6xl mx-auto">

        <h1 className="text-4xl font-bold mb-2">
          Libraries
        </h1>

        <p className="text-slate-500 mb-8">
          Select a library to continue
        </p>

        <div className="grid md:grid-cols-2 gap-6">

          {allLibraries.map((library) => (
            <div
              key={library._id}
              className="bg-white p-6 rounded-2xl shadow hover:shadow-xl transition"
            >
              {library.photo && (
                <img
                  src={library.photo}
                  alt={library.name}
                  className="w-full h-48 object-cover rounded-xl mb-4"
                />
              )}
              <h2 className="text-2xl font-bold">
                {library.name}
              </h2>

              <p className="text-slate-500 mt-2">
                {library.city}, {library.district}, {library.state}
              </p>

              <p className="text-slate-500 mt-1">
                {library.address}
              </p>

              <div className="mt-4 flex justify-between">

                <span>
                  Seats: {library.totalSeats || library.seats}
                </span>

              <span className="font-semibold text-blue-600">
                Starting ₹{library.slot1Price || 0}/month
              </span>

              </div>

              <button
                onClick={() =>
                  navigate(`/library-details/${library._id}`)
                }
                className="mt-5 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl"
              >
                See Seats
              </button>

            </div>
          ))}

        </div>

      </div>
    </div>
  );
}

export default Libraries;