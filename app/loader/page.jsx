'use client';

import { useEffect } from "react";
import { checkProgress, updateProgress } from "../utils/progress";

export default function Loader() {
  useEffect(() => {
    // Ensure user has accessed the loader step in sequence
    checkProgress(3);

    // Redirect to the Question page after a delay
    const timer = setTimeout(() => {
      updateProgress(4); // Update progress to the next step
      window.location.href = '/question'; // Navigate to /question
    }, 3000); // 3 seconds delay

    return () => clearTimeout(timer); // Cleanup timeout on unmount
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 flex items-center justify-center relative overflow-hidden">
      {/* Background Animation */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 opacity-40 animate-pulse"></div>
      <div className="absolute top-0 left-0 w-72 h-72 bg-blue-500 rounded-full opacity-20 blur-3xl animate-bounce-slow"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-purple-500 rounded-full opacity-20 blur-3xl animate-bounce-slow"></div>

      {/* Main Loader Content */}
      <div className="bg-white shadow-xl rounded-lg p-8 w-full max-w-lg text-center relative z-10">
        {/* Rotating AI Animation */}
        <div className="relative flex justify-center items-center mb-6">
          <div className="w-24 h-24 border-8 border-dashed border-blue-500 rounded-full animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <svg
              className="w-10 h-10 text-blue-500 animate-pulse"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 4a8 8 0 100 16 8 8 0 100-16z" />
              <path
                fillRule="evenodd"
                d="M9.707 12.293a1 1 0 011.414 0L12 13.172l.879-.879a1 1 0 111.414 1.414l-1.586 1.586a1 1 0 01-1.414 0L9.707 13.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>

        {/* Loader Text */}
        <h2 className="text-4xl font-bold text-gray-800 mb-4 animate-fadeIn">
          That's Great!
        </h2>
        <p className="text-lg text-gray-600 mt-4 animate-fadeIn">
          Just give me a moment to take note...
        </p>
      </div>
    </div>
  );
}
