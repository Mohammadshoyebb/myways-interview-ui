
'use client';

import { useState, useEffect, useRef } from "react";

export default function Question() {
  const [questionNumber, setQuestionNumber] = useState(1); // Current question number
  const totalQuestions = 26; // Total number of questions
  const question = "Tell us about yourself."; // Replace with the actual question
  const [timer, setTimer] = useState(60); // Timer starts at 60 seconds
  const [cameraError, setCameraError] = useState(null); // Handle camera permission errors
  const [micError, setMicError] = useState(null); // Handle microphone permission errors
  const [micPermission, setMicPermission] = useState(false); // Track microphone permission
  const videoRef = useRef(null); // Video reference

  // Request microphone permission
  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then(() => {
        setMicPermission(true); // Mic permission granted
      })
      .catch((err) => {
        setMicError("Unable to access microphone. Please ensure permissions are granted.");
        console.error("Microphone error: ", err);
      });
  }, []);

  // Start recording and enable mic
  async function startRecording() {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    videoRef.current.srcObject = stream;
    videoRef.current.play();
    setTimer(60); // Reset the timer for next question
  }

  useEffect(() => {
    // Decrease the timer every second
    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    // Cleanup interval on unmount
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Camera preview logic
    const videoElement = document.getElementById("camera-preview");

    navigator.mediaDevices
      .getUserMedia({ video: true }) // Request camera access
      .then((stream) => {
        videoElement.srcObject = stream; // Display camera stream
        videoElement.play(); // Start playing the stream
      })
      .catch((err) => {
        setCameraError("Unable to access camera. Please ensure permissions are granted.");
        console.error("Camera error: ", err);
      });

    // Cleanup camera stream on unmount
    return () => {
      if (videoElement?.srcObject) {
        const tracks = videoElement.srcObject.getTracks();
        tracks.forEach((track) => track.stop()); // Stop all tracks
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
      <div className="bg-white shadow-xl rounded-lg p-8 w-full max-w-2xl space-y-6">

        {/* Question Number */}
        <div className="text-gray-700 text-lg font-semibold text-center">
          Question {questionNumber}/{totalQuestions}
        </div>

        {/* Question Text */}
        <div className="text-gray-800 text-xl font-bold text-center">{question}</div>

        {/* Timer */}
        <div className="text-gray-600 text-lg font-medium text-center">
          Timer : <span className="text-red-600 font-bold">{timer}s</span>
        </div>

        {/* Microphone Permission Error */}
        {micError && (
          <div className="text-red-500 text-center">{micError}</div>
        )}

        {/* Camera Preview */}
        <div className="relative w-full max-w-3xl mx-auto bg-black rounded-lg border-4 border-gray-800">
          <div className="aspect-w-16 aspect-h-9">
            {cameraError ? (
              <div className="text-red-500 text-center">{cameraError}</div> // Display error if camera access fails
            ) : (
              <video
                id="camera-preview"
                ref={videoRef}
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

          {/* Mic Icon */}
          {micPermission && (
            <div className="absolute bottom-2 right-2 bg-green-600 text-white p-2 rounded-full shadow-md">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v3m4-3a4 4 0 01-8 0m4-7v4m0 0a4 4 0 004 4m0-8a4 4 0 00-4-4" />
              </svg>
            </div>
          )}
        </div>

        {/* Save & Next Button */}
        <div className="flex justify-center">
          <button
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            onClick={() => {
              // Logic to save and go to the next question
              if (questionNumber < totalQuestions) {
                setQuestionNumber(questionNumber + 1); // Increment question number
                setTimer(60); // Reset timer for next question
              }
            }}
          >
            Save & Next
          </button>
        </div>

        {/* Information Text */}
        <div className="flex items-center justify-center space-x-2 text-gray-500 text-sm">
          <div className="w-6 h-6 flex items-center justify-center rounded-full bg-gray-300 font-bold">i</div>
          <p>Press 'Enter' for saving and next</p>
        </div>
      </div>
    </div>
  );
}
