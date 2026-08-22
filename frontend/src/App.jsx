import React, { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import SupportWidget from "./components/SupportWidget";

// Route-based lazy loading to split the production bundle into small, on-demand chunks
const Home = lazy(() => import("./pages/Home"));
const StudentLogin = lazy(() => import("./pages/StudentLogin"));
const LibrarianLogin = lazy(() => import("./pages/LibrarianLogin"));
const StudentRegister = lazy(() => import("./pages/StudentRegister"));
const StudentDashboard = lazy(() => import("./pages/StudentDashboard"));
const LibrarianDashboard = lazy(() => import("./pages/LibrarianDashboard"));
const BookingStatus = lazy(() => import("./pages/BookingStatus"));
const Libraries = lazy(() => import("./pages/Libraries"));
const LibraryDetails = lazy(() => import("./pages/LibraryDetails"));
const LibrarianRegister = lazy(() => import("./pages/LibrarianRegister"));
const StudentProfile = lazy(() => import("./pages/StudentProfile"));
const StudentIDCard = lazy(() => import("./pages/StudentIDCard"));
const BookingHistory = lazy(() => import("./pages/BookingHistory"));
const Notifications = lazy(() => import("./pages/Notifications"));
const VerifyStudent = lazy(() => import("./pages/VerifyStudent"));
const StudentManagement = lazy(() => import("./pages/StudentManagement"));
const Attendance = lazy(() => import("./pages/Attendance"));
const StudentPass = lazy(() => import("./pages/StudentPass"));
const AttendanceScanner = lazy(() => import("./pages/AttendanceScanner"));
const AvailableSeats = lazy(() => import("./pages/AvailableSeats"));
const Practice = lazy(() => import("./pages/Practice"));

function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-center" />
      <Suspense
        fallback={
          <div className="min-h-screen flex items-center justify-center text-slate-500 font-bold">
            Loading...
          </div>
        }
      >
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
          <Route path="/quiz/:exam" element={<Practice />} />
          <Route path="/quiz-history" element={<Practice />} />
        </Routes>
      </Suspense>
      <SupportWidget />
    </BrowserRouter>
  );
}

export default App;