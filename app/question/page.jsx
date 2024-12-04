'use client';

import { useState, useEffect } from "react";

export default function Question() {
  const [questionNumber, setQuestionNumber] = useState(1); // Current question number
  const totalQuestions = 3; // Total number of questions
  const question = "Tell us about yourself and what makes you a good fit for this role?"; // The question to be read aloud

  const [isSpeaking, setIsSpeaking] = useState(false); // Track if AI is speaking
  const [micError, setMicError] = useState(null); // Track microphone permission error
  const [camError, setCamError] = useState(null); // Track camera permission error
  const [isMicGranted, setIsMicGranted] = useState(false); // Track if mic permission is granted
  const [isCamGranted, setIsCamGranted] = useState(false); // Track if camera permission is granted

  // Request microphone permission
  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then(() => {
        setIsMicGranted(true);
      })
      .catch((err) => {
        setMicError("Unable to access microphone. Please ensure permissions are granted.");
        console.error("Microphone error: ", err);
      });
  }, []);

  // Request camera permission
  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then(() => {
        setIsCamGranted(true);
      })
      .catch((err) => {
        setCamError("Unable to access camera. Please ensure permissions are granted.");
        console.error("Camera error: ", err);
      });
  }, []);

  // Start reading the question using SpeechSynthesis API
  useEffect(() => {
    // Check if SpeechSynthesis is supported in the browser
    if (!('speechSynthesis' in window)) {
      alert("Your browser does not support text-to-speech.");
      return;
    }

    // Wait until microphone and camera permissions are granted before speaking
    if (isMicGranted && isCamGranted) {
      const utterance = new SpeechSynthesisUtterance(question);
      utterance.lang = "en-US";
      utterance.rate = 1; // Set speaking speed
      utterance.pitch = 1; // Set pitch of voice

      // Start speaking the question
      window.speechSynthesis.speak(utterance);
      setIsSpeaking(true);

      // Once speech ends, check if it's the last question, if so redirect, otherwise move to next question
      utterance.onend = () => {
        setIsSpeaking(false); // AI finishes speaking

        window.location.href = "/completion"; // Redirect to /completion after reading the question
      };
    } else {
      alert("Please grant permission for microphone and camera to proceed.");
    }

    // Cleanup when the component unmounts
    return () => window.speechSynthesis.cancel();
  }, [isMicGranted, isCamGranted, question]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex flex-col items-center justify-center p-6 relative">
      {/* Background Animation */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 opacity-40 animate-pulse z-0"></div>

      {/* Main Content */}
      <div className="bg-white shadow-xl rounded-lg p-8 w-full max-w-2xl text-center space-y-6 relative z-10">
        {/* AI Animation */}
        <div className="flex justify-center items-center">
          <div
            className={`w-24 h-24 border-8 border-dashed border-blue-500 rounded-full animate-spin ${
              isSpeaking ? "border-t-transparent" : "border-t-blue-500"
            }`}
          ></div>
        </div>

        {/* Microphone or Camera Permission Error */}
        {micError && (
          <div className="text-red-500 text-center">{micError}</div>
        )}
        {camError && (
          <div className="text-red-500 text-center">{camError}</div>
        )}

        {/* Question Number */}
        <div className="text-gray-700 text-lg font-semibold">
          Question {questionNumber}/{totalQuestions}
        </div>

        {/* Question Text */}
        <div className="text-gray-800 text-xl font-bold">{question}</div>

        {/* Info Text */}
        <p className="text-sm text-gray-600">
          AI is reading the question aloud. Please listen carefully.
        </p>
      </div>
    </div>
  );
}
