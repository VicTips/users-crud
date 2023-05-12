import React from "react";

const LoadingSpinner = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center gap-y-2 bg-neutral-50">
      <span className="loader"></span>
      <p className="font-medium">Loading...</p>
    </div>
  );
};

export default LoadingSpinner;
