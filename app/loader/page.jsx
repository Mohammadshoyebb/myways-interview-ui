'use client';

import { useState, useEffect } from "react";

export default function Loader() {
  const [thinking, setThinking] = useState(false);

  useEffect(() => {
    // Toggle thinking animation every second for a more dynamic effect
    const interval = setInterval(() => {
      setThinking((prev) => !prev);
    }, 1000);

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-6 relative overflow-hidden">
      <div className="bg-white shadow-2xl rounded-lg p-8 w-full max-w-lg text-center relative z-10">
        {/* Thinking Animation - A Rotating Circle */}
        <div className="flex justify-center items-center mb-6 relative">
          <div
            className={`w-24 h-24 border-8 border-dashed border-blue-500 rounded-full animate-spin ${thinking ? 'border-t-transparent' : 'border-t-blue-500'}`}
          ></div>
        </div>

        {/* Loader Text */}
        <h2 className="text-3xl font-semibold text-gray-800 mb-4">That's Great!</h2>

        <p className="text-lg text-gray-600 mt-4">
          Just give me a moment to take note...
        </p>

        {/* Optional background animation */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 opacity-20 animate-pulse z-0"></div>
      </div>
    </div>
  );
}
