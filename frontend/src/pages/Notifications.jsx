import { useNavigate } from "react-router-dom";

function Notifications() {
  const navigate = useNavigate();

  const notifications =
    JSON.parse(
      localStorage.getItem("notifications")
    ) || [];

  return (
    <div className="min-h-screen bg-slate-100 p-5">

      <div className="max-w-4xl mx-auto">

        <div className="flex justify-between mb-6">

          <h1 className="text-3xl font-bold">
            Notifications
          </h1>

          <button
            onClick={() =>
              navigate("/student-dashboard")
            }
            className="bg-blue-600 text-white px-4 py-2 rounded-lg"
          >
            Back
          </button>

        </div>

        {notifications.length === 0 ? (
          <div className="bg-white p-5 rounded-xl shadow">
            No Notifications
          </div>
        ) : (
          notifications.map((item) => (
            <div
              key={item.id}
              className="bg-white p-4 rounded-xl shadow mb-3"
            >
              <p>{item.message}</p>

              <p className="text-slate-500 text-sm mt-2">
                {item.time}
              </p>
            </div>
          ))
        )}

      </div>

    </div>
  );
}

export default Notifications;