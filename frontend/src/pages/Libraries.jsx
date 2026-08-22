import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import SEOHead from "../components/SEOHead";
import PublicNavbar from "../components/PublicNavbar";
import PublicFooter from "../components/PublicFooter";

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
    <div className="min-h-screen flex flex-col justify-between bg-slate-50 font-sans">
      <SEOHead
        title="Find & Book Study Libraries Near You"
        description="Browse verified reading libraries on Library Node. Check total study seats, city locations, shift pricing, and book your study space."
        canonicalPath="/libraries"
      />

      <PublicNavbar activePage="/libraries" />

      <div className="flex-1 max-w-6xl mx-auto px-4 py-8 w-full">
        <h1 className="text-3xl sm:text-4xl font-bold mb-2 text-slate-900">
          Study Libraries & Reading Rooms
        </h1>

        <p className="text-slate-600 mb-8 text-sm sm:text-base">
          Select a verified library to view seat map, shift timings, and reserve your desk.
        </p>

        {loading ? (
          <p className="text-center text-slate-500 text-lg py-12">Loading libraries...</p>
        ) : allLibraries.length === 0 ? (
          <div className="bg-white p-8 rounded-2xl shadow-xs text-center border border-slate-200">
            <h2 className="text-xl font-bold text-slate-800">No Libraries Found</h2>
            <p className="text-slate-500 mt-2 text-sm">
              No libraries have been registered yet in the database.
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {allLibraries.map((library) => (
              <div
                key={library._id}
                className="bg-white p-6 rounded-2xl shadow-xs border border-slate-200 hover:shadow-md transition"
              >
                {library.photos?.[0] && (
                  <img
                    src={library.photos[0]}
                    alt={library.name}
                    className="w-full h-48 object-cover rounded-xl mb-4"
                  />
                )}

                <h2 className="text-2xl font-bold text-slate-900">
                  {library.name} {library.ownerName ? `/ ${library.ownerName}` : ""}
                </h2>

                <p className="text-slate-500 mt-2 text-sm">
                  📍 {library.city}, {library.district}, {library.state}
                </p>

                <p className="text-slate-500 mt-1 text-xs">
                  {library.address}
                </p>

                <div className="mt-4 flex justify-between items-center text-sm border-t border-slate-100 pt-3">
                  <span className="font-medium text-slate-700">
                    Total Seats: {library.totalSeats}
                  </span>

                  <span className="font-bold text-blue-600">
                    Starting ₹{
                      (library.slots || []).find((s) => s.isActive)?.price || 0
                    }/month
                  </span>
                </div>

                <button
                  onClick={() =>
                    navigate(`/library-details/${library._id}`)
                  }
                  className="mt-5 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-bold transition shadow-xs"
                >
                  See Seats & Book
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <PublicFooter />
    </div>
  );
}

export default Libraries;