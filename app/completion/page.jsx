
'use client';

import { useState } from 'react';

export default function Submission() {
  const [isVisible, setIsVisible] = useState(true); // To control visibility of feedback box
  const [rating, setRating] = useState(0); // To track selected rating

  // Handle the close button click to hide the feedback box
  const closeFeedback = () => {
    setIsVisible(false);
  };

  // Handle the submit action (log the rating)
  const handleSubmit = () => {
    console.log(`Rating submitted: ${rating}`);
    setIsVisible(false); // Optionally hide the feedback box after submission
  };

  // Emojis for the rating
  const emojis = ["😡", "😞", "😐", "😊", "😁"];

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      {isVisible && (
        <div className="relative w-full max-w-md bg-blue-50 p-6 rounded-lg shadow-lg">
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
          <div className="text-center mb-4 text-xl text-gray-700 font-semibold">
            Please rate your experience
          </div>

          {/* Emoji Rating */}
          <div className="flex justify-center space-x-4 mb-6">
            {emojis.map((emoji, index) => (
              <span
                key={index}
                className={`text-3xl cursor-pointer ${rating === index + 1 ? 'text-yellow-500' : ''}`}
                onClick={() => setRating(index + 1)}
              >
                {emoji}
              </span>
            ))}
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              className="w-full px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-400"
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




