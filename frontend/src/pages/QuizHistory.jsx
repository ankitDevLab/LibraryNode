import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import Navbar from "../components/Navbar";

function QuizHistory() {
  const navigate = useNavigate();
  const student = JSON.parse(localStorage.getItem("studentProfile") || "{}");
  const studentId = student?._id;

  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!studentId) {
      setError("Please login to view your quiz history.");
      setLoading(false);
      return;
    }
    fetchHistory();
  }, [studentId]);

  const fetchHistory = async () => {
    try {
      const response = await API.get(`/quiz/history/${studentId}`);
      if (!response.data.success) {
        throw new Error(response.data.message || "Failed to fetch quiz history.");
      }
      setHistory(response.data.history || []);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || err.message || "Failed to load history.");
    } finally {
      setLoading(false);
    }
  };

  // Prepare graph data (oldest to newest for plotting left-to-right)
  const graphData = [...history].reverse();

  // Draw SVG Chart Helper Coordinates
  const getChartElements = () => {
    if (graphData.length === 0) return null;

    const paddingLeft = 40;
    const paddingRight = 20;
    const paddingTop = 20;
    const paddingBottom = 30;
    const chartWidth = 500 - paddingLeft - paddingRight;
    const chartHeight = 200 - paddingTop - paddingBottom;

    // Calculate coordinates
    const points = graphData.map((item, idx) => {
      const x =
        graphData.length === 1
          ? paddingLeft + chartWidth / 2
          : paddingLeft + (idx / (graphData.length - 1)) * chartWidth;
      const y = paddingTop + chartHeight - (item.percentage / 100) * chartHeight;
      return { x, y, ...item };
    });

    // Create polyline points string
    const polylinePoints = points.map((p) => `${p.x},${p.y}`).join(" ");

    // Create fill path (closing the area under the line to form a filled polygon)
    const firstPoint = points[0];
    const lastPoint = points[points.length - 1];
    const fillPath = firstPoint && lastPoint
      ? `M ${firstPoint.x} ${paddingTop + chartHeight} ` +
        points.map((p) => `L ${p.x} ${p.y}`).join(" ") +
        ` L ${lastPoint.x} ${paddingTop + chartHeight} Z`
      : "";

    return { points, polylinePoints, fillPath, chartHeight, chartWidth, paddingLeft, paddingTop };
  };

  const chart = getChartElements();

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans">
      <Navbar title="Performance & History" />

      <div className="flex-1 p-4 sm:p-6">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-800">
                📊 Practice History & Improvement
              </h2>
              <p className="text-slate-500 font-medium text-sm sm:text-base mt-1">
                Track your AI quiz scores and monitor your learning progress.
              </p>
            </div>

            <button
              onClick={() => navigate("/student-dashboard")}
              className="bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 px-5 py-2.5 rounded-xl font-bold transition shadow-sm self-start"
            >
              ← Back to Dashboard
            </button>
          </div>

          {loading ? (
            <div className="bg-white rounded-3xl p-12 text-center shadow-md flex items-center justify-center">
              <div className="w-10 h-10 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin" />
            </div>
          ) : error ? (
            <div className="bg-white rounded-3xl p-8 text-center shadow-md border border-slate-100">
              <p className="text-red-500 font-bold mb-4">{error}</p>
              <button
                onClick={() => navigate("/student-login")}
                className="bg-blue-600 text-white px-6 py-2.5 rounded-xl font-bold hover:bg-blue-700"
              >
                Go to Login
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Improvement Graph Card */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-md border border-slate-50">
                <h3 className="text-lg sm:text-xl font-black text-slate-800 mb-4 flex items-center gap-2">
                  📈 Improvement Graph
                </h3>

                {history.length === 0 ? (
                  <div className="py-12 text-center text-slate-400">
                    <span className="text-4xl block mb-3">📊</span>
                    <p className="font-semibold text-sm">No quiz attempts yet.</p>
                    <p className="text-xs text-slate-400 mt-1">
                      Complete your first practice quiz to see your performance graph!
                    </p>
                  </div>
                ) : (
                  <div>
                    {/* SVG Chart */}
                    <div className="relative w-full overflow-hidden bg-slate-50 rounded-2xl p-2 sm:p-4 border border-slate-100">
                      <svg
                        viewBox="0 0 500 200"
                        className="w-full h-auto overflow-visible"
                        style={{ minHeight: "160px" }}
                      >
                        {/* Definitions for Gradient Fill */}
                        <defs>
                          <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
                            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.0" />
                          </linearGradient>
                        </defs>

                        {/* Y-Axis Grid Lines & Labels */}
                        {[0, 25, 50, 75, 100].map((val) => {
                          const y =
                            chart.paddingTop +
                            chart.chartHeight -
                            (val / 100) * chart.chartHeight;
                          return (
                            <g key={val}>
                              <line
                                x1={chart.paddingLeft}
                                y1={y}
                                x2={500 - chart.paddingLeft + 20}
                                y2={y}
                                stroke="#e2e8f0"
                                strokeDasharray="3,3"
                                strokeWidth="1"
                              />
                              <text
                                x={chart.paddingLeft - 8}
                                y={y + 4}
                                fill="#94a3b8"
                                fontSize="9"
                                fontWeight="bold"
                                textAnchor="end"
                              >
                                {val}%
                              </text>
                            </g>
                          );
                        })}

                        {/* Chart Area Fill */}
                        {chart.fillPath && (
                          <path d={chart.fillPath} fill="url(#chartGrad)" />
                        )}

                        {/* Chart Area Line */}
                        {chart.polylinePoints && (
                          <polyline
                            fill="none"
                            stroke="#2563eb"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            points={chart.polylinePoints}
                          />
                        )}

                        {/* Data Points */}
                        {chart.points.map((p, idx) => (
                          <g key={idx} className="group cursor-pointer">
                            <circle
                              cx={p.x}
                              cy={p.y}
                              r="5"
                              fill="#2563eb"
                              stroke="#ffffff"
                              strokeWidth="2"
                              className="transition-all duration-200 hover:r-7"
                            />
                            {/* Simple SVG Tooltip on Hover */}
                            <title>
                              {p.exam.toUpperCase()} ({p.percentage}%)&#10;
                              Score: {p.score}/{p.totalQuestions}&#10;
                              Date: {new Date(p.createdAt).toLocaleDateString()}
                            </title>
                          </g>
                        ))}
                      </svg>
                    </div>

                    <p className="text-xs text-slate-400 mt-3 text-center italic">
                      💡 Hover over the dots to see details of each attempt. Oldest attempts plot
                      on the left, newest on the right.
                    </p>
                  </div>
                )}
              </div>

              {/* History Table / Cards */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-md border border-slate-50">
                <h3 className="text-lg sm:text-xl font-black text-slate-800 mb-6 flex items-center gap-2">
                  📋 Past Practice Sessions
                </h3>

                {history.length === 0 ? (
                  <p className="text-slate-400 text-center py-6 font-medium text-sm">
                    No attempts found. Start practicing to populate this table!
                  </p>
                ) : (
                  <div className="overflow-x-auto rounded-2xl border border-slate-100">
                    <table className="w-full text-left border-collapse min-w-[600px]">
                      <thead>
                        <tr className="bg-slate-50 border-b border-slate-100 text-xs font-bold uppercase text-slate-400">
                          <th className="py-4 px-6">Date</th>
                          <th className="py-4 px-6">Exam & Details</th>
                          <th className="py-4 px-6">Difficulty</th>
                          <th className="py-4 px-6">Questions</th>
                          <th className="py-4 px-6 text-right">Score</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 text-slate-700 text-sm">
                        {history.map((item) => {
                          const dateStr = new Date(item.createdAt).toLocaleDateString("en-IN", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          });

                          const levelColor =
                            item.level === "high"
                              ? "bg-red-50 text-red-700 border-red-100"
                              : item.level === "medium"
                              ? "bg-yellow-50 text-yellow-700 border-yellow-100"
                              : "bg-green-50 text-green-700 border-green-100";

                          const scoreColor =
                            item.percentage >= 70
                              ? "text-green-600 font-bold"
                              : item.percentage >= 40
                              ? "text-yellow-600 font-bold"
                              : "text-red-500 font-bold";

                          return (
                            <tr key={item._id} className="hover:bg-slate-50/50 transition">
                              <td className="py-4.5 px-6 font-medium text-slate-500">{dateStr}</td>
                              <td className="py-4.5 px-6">
                                <div className="font-bold text-slate-800 capitalize">
                                  {item.exam}
                                </div>
                                {item.domain && (
                                  <div className="text-xs text-slate-400 font-semibold mt-0.5">
                                    Post: {item.domain}
                                  </div>
                                )}
                              </td>
                              <td className="py-4.5 px-6">
                                <span
                                  className={`px-3 py-1 rounded-full text-xs font-bold uppercase border ${levelColor}`}
                                >
                                  {item.level}
                                </span>
                              </td>
                              <td className="py-4.5 px-6 font-semibold text-slate-500">
                                {item.numQuestions} Qs
                              </td>
                              <td className="py-4.5 px-6 text-right">
                                <div className={`text-base ${scoreColor}`}>
                                  {item.score}/{item.totalQuestions}
                                </div>
                                <div className="text-xs text-slate-400 font-semibold mt-0.5">
                                  {item.percentage}%
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default QuizHistory;
