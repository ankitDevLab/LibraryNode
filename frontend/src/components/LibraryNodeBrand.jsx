import React from "react";

function LibraryNodeBrand({
  size = "md", // "sm", "md", "lg", "xl"
  showLogo = true,
  showSubtitle = false,
  subtitleText = "Smart Library Seat Management System",
  className = "",
  stacked = false,
  onClick,
}) {
  const sizeClasses = {
    sm: {
      text: "text-lg font-bold",
      nodeText: "font-extrabold text-blue-600",
      logo: "w-8.5 h-8.5 md:w-9 md:h-9",
      sub: "text-[10px]",
      gap: "gap-2.5",
    },
    md: {
      text: "text-xl font-black",
      nodeText: "font-black bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent",
      logo: "w-11 h-11",
      sub: "text-xs",
      gap: "gap-3",
    },
    lg: {
      text: "text-3xl font-black",
      nodeText: "font-black bg-gradient-to-r from-blue-600 via-cyan-500 to-teal-400 bg-clip-text text-transparent drop-shadow-sm",
      logo: "w-14 h-14",
      sub: "text-xs",
      gap: "gap-3.5",
    },
    xl: {
      text: "text-4xl font-black tracking-tight",
      nodeText: "font-black bg-gradient-to-r from-blue-600 via-cyan-500 to-teal-400 bg-clip-text text-transparent drop-shadow-md",
      logo: "w-20 h-20 mb-1",
      sub: "text-xs tracking-wider uppercase font-semibold",
      gap: "gap-4",
    },
  };

  const currentSize = sizeClasses[size] || sizeClasses.md;

  return (
    <div
      onClick={onClick}
      className={`inline-flex ${
        stacked ? "flex-col items-center text-center" : "items-center"
      } ${currentSize.gap} ${onClick ? "cursor-pointer" : ""} ${className}`}
    >
      {showLogo && (
        <img
          src="/logo.png"
          alt="Library Node Logo"
          className={`${currentSize.logo} object-contain filter drop-shadow-sm transition-transform duration-300 hover:scale-105`}
        />
      )}
      <div className={stacked ? "flex flex-col items-center" : ""}>
        <h1 className={`${currentSize.text} leading-none tracking-tight`}>
          <span className="text-slate-800">Library </span>
          <span className={currentSize.nodeText}>Node</span>
        </h1>
        {showSubtitle && (
          <p className={`${currentSize.sub} text-slate-500 mt-1.5 font-medium`}>
            {subtitleText}
          </p>
        )}
      </div>
    </div>
  );
}

export default LibraryNodeBrand;
