import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import StudentLogin from "./pages/StudentLogin";
import LibrarianLogin from "./pages/LibrarianLogin";
import StudentRegister from "./pages/StudentRegister";
import StudentDashboard from "./pages/StudentDashboard";
import LibrarianDashboard from "./pages/LibrarianDashboard";
import BookingStatus from "./pages/BookingStatus";
import Libraries from "./pages/Libraries";
import LibraryDetails from "./pages/LibraryDetails";
import LibrarianRegister from "./pages/LibrarianRegister";
import StudentProfile from "./pages/StudentProfile";
import StudentIDCard from "./pages/StudentIDCard";
import BookingHistory from "./pages/BookingHistory";
import Notifications from "./pages/Notifications";
import VerifyStudent from "./pages/VerifyStudent";
import StudentManagement from "./pages/StudentManagement";
import Attendance from "./pages/Attendance";
import StudentPass from "./pages/StudentPass";
import AttendanceScanner from "./pages/AttendanceScanner";
import AvailableSeats from "./pages/AvailableSeats";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/student-login" element={<StudentLogin />} />
        <Route path="/librarian-login" element={<LibrarianLogin />} />
        <Route path="/student-register" element={<StudentRegister />} />
        <Route path="/student-dashboard" element={<StudentDashboard />} />
        <Route path="/librarian-dashboard" element={<LibrarianDashboard />} />
        <Route path="/booking-status" element={<BookingStatus />} />
        <Route path="/libraries" element={<Libraries />} />
        <Route path="/library-details/:id" element={<LibraryDetails />} />
        <Route path="/librarian-register" element={<LibrarianRegister />} />
        <Route path="/student-profile" element={<StudentProfile />} />
        <Route path="/student-id-card" element={<StudentIDCard />} />
        <Route path="/booking-history" element={<BookingHistory />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/verify-student" element={<VerifyStudent />} />
        <Route path="/student-management" element={<StudentManagement />} />
        <Route path="/attendance" element={<Attendance />} />
        <Route path="/student-pass" element={<StudentPass />} />
        <Route path="/attendance-scanner" element={<AttendanceScanner />} />
        <Route path="/available-seats" element={<AvailableSeats />} />
      </Routes>
      
    </BrowserRouter>
  );
}

export default App;