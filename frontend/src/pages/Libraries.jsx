import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

function Libraries() {
  const navigate = useNavigate();

  const [allLibraries, setAllLibraries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLibraries();
  }, []);

  const fetchLibraries = async () => {
    try {
      let response;
      try {
        response = await API.get("/libraries/with-owners");
      } catch (err) {
        console.warn("with-owners request failed, falling back to /libraries endpoint:", err);
        response = await API.get("/libraries");
      }

      if (response?.data?.libraries) {
        setAllLibraries(response.data.libraries);
      }
    } catch (error) {
      console.error("Failed to fetch libraries:", error);
    } finally {
      setLoading(false);
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

        {loading ? (
          <p className="text-center text-slate-500 text-lg">Loading libraries...</p>
        ) : allLibraries.length === 0 ? (
          <div className="bg-white p-8 rounded-2xl shadow text-center">
            <h2 className="text-xl font-bold">No Libraries Found</h2>
            <p className="text-slate-500 mt-2">
              No libraries have been registered yet.
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">

            {allLibraries.map((library) => (
              <div
                key={library._id}
                className="bg-white p-6 rounded-2xl shadow hover:shadow-xl transition"
              >
                {library.photos?.[0] && (
                  <img
                    src={library.photos[0]}
                    alt={library.name}
                    className="w-full h-48 object-cover rounded-xl mb-4"
                  />
                )}

                <h2 className="text-2xl font-bold">
                  {library.name} / {library.ownerName}
                </h2>

                <p className="text-slate-500 mt-2">
                  {library.city}, {library.district}, {library.state}
                </p>

                <p className="text-slate-500 mt-1">
                  {library.address}
                </p>

                <div className="mt-4 flex justify-between">

                  <span>
                    Seats: {library.totalSeats}
                  </span>

                  <span className="font-semibold text-blue-600">
                    Starting ₹{
                      (library.slots || []).find((s) => s.isActive)?.price || 0
                    }/month
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
        )}

      </div>
    </div>
  );
}

export default Libraries;