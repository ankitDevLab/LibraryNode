import React, { useState } from "react";

function SupportWidget() {
  const [isOpen, setIsOpen] = useState(false);

  const supportNumber = "917520960847";
  const whatsappUrl = `https://wa.me/${supportNumber}`;

  return (
    <div className="fixed bottom-6 right-6 z-[9999] font-sans">
      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-full flex items-center justify-center shadow-2xl transition-all transform hover:scale-105 active:scale-95 focus:outline-none"
        title="Help & Support"
      >
        {isOpen ? (
          <span className="text-xl font-bold">✕</span>
        ) : (
          <span className="text-2xl">💬</span>
        )}
      </button>

      {/* Small Support Card/Modal Overlay */}
      {isOpen && (
        <div className="absolute bottom-20 right-0 w-72 bg-white rounded-3xl p-6 shadow-2xl border border-slate-100 animate-fadeIn">
          <h3 className="text-lg font-extrabold text-slate-800 mb-1.5 flex items-center gap-1.5">
            🤝 Need Help?
          </h3>
          <p className="text-xs text-slate-500 font-semibold leading-relaxed mb-5">
            Have a question, problem, or suggestion? Contact our support team.
          </p>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl text-sm font-bold shadow-md hover:shadow-lg transition-all"
            onClick={() => setIsOpen(false)}
          >
            Chat on WhatsApp
          </a>
        </div>
      )}
    </div>
  );
}

export default SupportWidget;
