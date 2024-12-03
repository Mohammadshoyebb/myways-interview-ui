

'use client';

import { useState, useEffect, useRef } from "react";

export default function Question() {
  const [questionNumber, setQuestionNumber] = useState(1); // Current question number
  const totalQuestions = 26; // Total number of questions
  const question = "Tell us about yourself."; // Replace with the actual question
  const [timer, setTimer] = useState(60); // Timer starts at 60 seconds
  const [cameraError, setCameraError] = useState(null); // Handle camera permission errors
  const [isSpeaking, setIsSpeaking] = useState(false); // Track if AI is speaking
  const videoRef = useRef(null); // Camera video reference

  // Start timer countdown
  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(interval); // Cleanup timer interval
  }, []);

  // Start reading the question using SpeechSynthesis API
  useEffect(() => {
    const utterance = new SpeechSynthesisUtterance(question);
    utterance.lang = "en-US";
    utterance.rate = 1; // Set speaking speed
    utterance.pitch = 1; // Set pitch of voice

    // Start speaking the question
    window.speechSynthesis.speak(utterance);

    // Set speaking state
    setIsSpeaking(true);

    // Once speaking ends, set isSpeaking to false
    utterance.onend = () => setIsSpeaking(false);

    return () => window.speechSynthesis.cancel(); // Cleanup if component unmounts
  }, [question]);

  // Camera access logic
  useEffect(() => {
    const videoElement = document.getElementById("camera-preview");

    navigator.mediaDevices
      .getUserMedia({ video: true }) // Request camera access
      .then((stream) => {
        videoElement.srcObject = stream;
        videoElement.play();
      })
      .catch((err) => {
        setCameraError("Unable to access camera. Please ensure permissions are granted.");
        console.error("Camera error: ", err);
      });

    return () => {
      if (videoElement?.srcObject) {
        const tracks = videoElement.srcObject.getTracks();
        tracks.forEach((track) => track.stop());
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-6 relative">

      {/* Full-Screen Layout */}
      <div className="bg-white shadow-xl rounded-lg p-8 w-full max-w-lg space-y-6 z-10">

        {/* AI Model Animation (Rotating AI Icon) */}
        <div className="flex justify-center items-center mb-6">
          <div
            className={`w-24 h-24 border-8 border-dashed border-blue-500 rounded-full animate-spin ${isSpeaking ? 'border-t-transparent' : 'border-t-blue-500'}`}
          ></div>
        </div>

        {/* Question Number */}
        <div className="text-gray-700 text-lg font-semibold text-center">
          Question {questionNumber}/{totalQuestions}
        </div>

        {/* Question Text */}
        <div className="text-gray-800 text-xl font-bold text-center mb-4">{question}</div>

        {/* Timer */}
        <div className="text-gray-600 text-lg font-medium text-center">
          Timer : <span className="text-red-600 font-bold">{timer}s</span>
        </div>

        {/* Camera Preview */}
        <div className="relative w-full max-w-3xl mx-auto bg-black rounded-lg border-4 border-gray-800 mt-6">
          <div className="aspect-w-16 aspect-h-9">
            {cameraError ? (
              <div className="text-red-500 text-center">{cameraError}</div>
            ) : (
              <video
                id="camera-preview"
                className="w-full h-full object-cover rounded-lg"
                autoPlay
                muted
                playsInline
              >
                <source src="" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            )}
          </div>
        </div>

        {/* Save and Next Button */}
        <button
          className="w-full px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-400"
          onClick={() => {
            if (questionNumber < totalQuestions) {
              setQuestionNumber(questionNumber + 1);
              setTimer(60); // Reset timer
            }
          }}
        >
          Save and Next
        </button>

        {/* Information Text */}
        <div className="flex items-center justify-center space-x-2 text-gray-500 text-sm">
          <div className="w-6 h-6 flex items-center justify-center rounded-full bg-gray-300 font-bold">i</div>
          <p>Press 'Enter' for saving and next</p>
        </div>
      </div>

      {/* Background Animation */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 opacity-40 animate-pulse z-0"></div>
    </div>
  );
}

