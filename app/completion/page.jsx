'use client';

import { useState, useEffect } from 'react';

export default function Completion() {
  const [isVisible, setIsVisible] = useState(true); // To control visibility of feedback box
  const [rating, setRating] = useState(0); // To track selected rating

  // Emojis for the rating
  const emojis = ["😡", "😞", "😐", "😊", "😁"];

  useEffect(() => {
    // checkProgress should only check that the user is on the correct page and has completed the previous steps.
    // This function should NOT trigger navigation to any page. It just validates that you're at the right page.
    // if it contains a redirect logic, remove that.

    // Ensure user has completed all steps before reaching the completion page
    // Make sure `checkProgress(6)` does not trigger navigation. If it does, stop the redirect inside that function.
  }, []);

  // Handle the close button click to hide the feedback box
  const closeFeedback = () => {
    setIsVisible(false);
  };

  // Handle the submit action (log the rating)
  const handleSubmit = () => {
    console.log(`Rating submitted: ${rating}`);
    setIsVisible(false); // Hide the feedback box after submission

    // No redirection happens after feedback submission
    // Update progress, but do NOT navigate to another page
    // Use updateProgress(7) only if necessary
    // updateProgress(7); // If you really need to update progress
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 flex items-center justify-center p-6 relative">
      {/* Main Feedback Form Container */}
      {isVisible && (
        <div className="relative w-full max-w-md bg-white p-6 rounded-lg shadow-xl transform transition-all duration-300 hover:scale-105">
          {/* Close button */}
          <button
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            onClick={closeFeedback}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          {/* Feedback Text */}
          <div className="text-center mb-4 text-2xl text-gray-800 font-semibold animate__animated animate__fadeIn">
            Please rate your experience
          </div>

          {/* Emoji Rating */}
          <div className="flex justify-center space-x-6 mb-6 animate__animated animate__fadeIn">
            {emojis.map((emoji, index) => (
              <span
                key={index}
                className={`text-4xl cursor-pointer ${rating === index + 1 ? 'text-yellow-500' : 'text-gray-600'} hover:text-yellow-500 transition`}
                onClick={() => setRating(index + 1)}
              >
                {emoji}
              </span>
            ))}
          </div>

          {/* Submit Button */}
          <div className="text-center mt-6">
            <button
              className="w-full px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
              onClick={handleSubmit}
              disabled={rating === 0}
            >
              Submit
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
