import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function Practice() {
  const { exam } = useParams();
  const navigate = useNavigate();

  // In the future, when actual exams are added:
  // const examsData = getExamsFor(exam);
  // if (examsData && examsData.length > 0) {
  //   return <RealExamsList data={examsData} />;
  // }
  // Currently, no exams exist, so show the Coming Soon card.
  
  const formattedExam = exam ? exam.toUpperCase() : "Quiz";

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col">
      <Navbar title={`${formattedExam} Practice`} />

      <div className="flex-1 flex items-center justify-center p-5">
        <div className="max-w-md w-full bg-white rounded-3xl p-8 shadow-xl text-center border border-slate-100 transition transform hover:scale-[1.01]">
          <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl text-blue-600 animate-bounce">
            📝
          </div>

          <h2 className="text-3xl font-black text-slate-800 mb-3 tracking-tight">
            Coming Soon
          </h2>

          <p className="text-slate-500 font-medium leading-relaxed mb-8">
            {formattedExam} exams and question sets will be available soon. Our team is working hard to bring you the best practice materials.
          </p>

          <button
            onClick={() => navigate("/student-dashboard")}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3.5 rounded-2xl font-bold transition-all shadow-md hover:shadow-lg"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}

export default Practice;
