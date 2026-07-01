import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
function Home() {
  const navigate = useNavigate();
  return (
    
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-5">
      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-xl p-8 md:p-12 text-center">

<div className="bg-white rounded-3xl shadow p-5 flex justify-between items-center">

  <div className="flex items-center gap-3">

    <img
      src="/logo.png"
      alt="LibrarySphere"
      className="w-12 h-12"
    />

    <div>
      <h1 className="text-2xl font-bold text-blue-600">
        LibrarySphere
      </h1>

      <p className="text-sm text-slate-500">
        Librarian Dashboard
      </p>
    </div>

  </div>

</div>

        <p className="mt-4 text-lg md:text-xl text-slate-500">
          Smart Library Seat Management System
        </p>

        <div className="mt-10 space-y-4 max-w-md mx-auto">
        <Button onClick={() => navigate("/student-login")}>
            Student Login
        </Button>

        <Button
            variant="secondary"
            onClick={() => navigate("/librarian-login")}
        >
            Librarian Login
        </Button>
        </div>

      </div>
    </div>
  );
}

export default Home;