'use client';

import { useState, useEffect } from "react";

export default function Question() {
  const question = "Tell us about yourself."; // The question to be read aloud by AI

  const [isSpeaking, setIsSpeaking] = useState(false); // Track if AI is speaking

  // Start reading the question using SpeechSynthesis API
  useEffect(() => {
    // Create an instance of SpeechSynthesisUtterance
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

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-6 relative">

      {/* Full-Screen Layout */}
      <div className="bg-white shadow-xl rounded-lg p-8 w-full max-w-lg space-y-6 z-10">

        {/* AI Model Animation (Spinning AI Icon) */}
        <div className="flex justify-center items-center mb-6">
          <div
            className={`w-24 h-24 border-8 border-dashed border-blue-500 rounded-full animate-spin ${isSpeaking ? 'border-t-transparent' : 'border-t-blue-500'}`}
          ></div>
        </div>

        {/* Question Text (AI speaks this text) */}
        <div className="text-gray-800 text-xl font-bold text-center mb-4">{question}</div>
      </div>

      {/* Background Animation */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 opacity-40 animate-pulse z-0"></div>
    </div>
  );
}
