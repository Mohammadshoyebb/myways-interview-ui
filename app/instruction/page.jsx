'use client';

import { useEffect } from "react";
import { checkProgress, updateProgress } from "../utils/progress";

export default function Instructions() {
  const instructions = [
    {
      image: '/path/to/image1.png', // Replace with actual image paths
      caption: 'Do not look off screen & maintain eye contact with the camera.',
    },
    {
      image: '/path/to/image2.png',
      caption: 'Avoid unusual extended pauses & respond to questions promptly.',
    },
    {
      image: '/path/to/image3.png',
      caption: 'Ensure you are the only person visible in the camera frame during the interview.',
    },
    {
      image: '/path/to/image4.png',
      caption: 'Don\'t switch between tabs in your web browser.',
    },
    {
      image: '/path/to/image5.png',
      caption: 'Minimizing the screen will lead to you being kicked out.',
    },
  ];

  useEffect(() => {
    // Ensure the user accesses this step in order
    checkProgress(2); // Instructions is step 2
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-indigo-600 flex flex-col items-center justify-center p-6">
      {/* Main Card */}
      <div className="bg-white shadow-2xl rounded-lg p-8 w-full max-w-4xl space-y-8 relative z-10">
        {/* Header */}
        <h2 className="text-3xl font-bold text-gray-800 text-center animate-fadeInDown">
          Interview Instructions
        </h2>

        {/* Proctored Test Environment Message */}
        <div className="text-center text-lg text-red-600 font-semibold mt-4">
          You're in a proctored test environment. If caught in any suspicious behaviour, you will be marked FAIL.
        </div>

        {/* Instructions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {instructions.map((instruction, index) => (
            <div
              key={index}
              className="flex flex-col items-center bg-blue-50 p-6 rounded-lg shadow-md hover:scale-105 transform transition-all duration-300"
            >
              <div className="h-16 w-16 object-cover mb-4 bg-gray-200 rounded-lg">
                <img
                  src={instruction.image}
                  alt={`Instruction ${index + 1}`}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              <p className="text-gray-700 text-center text-sm leading-relaxed">
                {instruction.caption}
              </p>
            </div>
          ))}
        </div>

        {/* Stay Focused Message */}
        <div className="text-center text-lg text-gray-700 mt-6">
          Stay focused and do your best!
        </div>

        {/* Start Interview Button */}
        <div className="text-center">
          <button
            className="px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition focus:outline-none focus:ring-2 focus:ring-purple-400"
            onClick={() => {
              updateProgress(3); // Update progress to step 3
              window.location.href = '/answer'; // Navigate to the next page
            }}
          >
            I Understand, Start the Interview
          </button>
        </div>
      </div>

      {/* Background Animation */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-blue-500 to-indigo-600 opacity-40 animate-pulse"></div>
    </div>
  );
}
