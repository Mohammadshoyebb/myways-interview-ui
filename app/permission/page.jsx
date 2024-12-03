'use client';

import { useState, useEffect } from "react";

export default function Instructions() {
  const [checkedItems, setCheckedItems] = useState([false, false, false, false, false]);
  const [cameraError, setCameraError] = useState(null); // Handle camera errors

  const handleCheckboxChange = (index) => {
    const updatedCheckedItems = [...checkedItems];
    updatedCheckedItems[index] = !updatedCheckedItems[index];
    setCheckedItems(updatedCheckedItems);
  };

  useEffect(() => {
    const videoElement = document.getElementById('camera-preview');

    // Camera permissions logic
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        videoElement.srcObject = stream; // Display camera stream
        videoElement.play(); // Play the stream
      })
      .catch((err) => {
        setCameraError('Unable to access the camera. Please check permissions and try again.');
        console.error('Camera access error: ', err);
      });

    // Cleanup video stream when component unmounts
    return () => {
      if (videoElement?.srcObject) {
        const tracks = videoElement.srcObject.getTracks();
        tracks.forEach((track) => track.stop());
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-200 p-6 flex items-center justify-center">
      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg p-8 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">

        {/* Top Section: Zeko and Time Boxes */}
        <div className="absolute top-0 right-0 flex space-x-[1mm] items-center">
          {/* Zeko */}
          <div className="bg-orange-500 text-white text-center p-1 rounded-lg">
            <h2 className="text-sm font-bold">Zeko<span className="text-blue-400 text-xs">AI</span></h2>
          </div>

          {/* Time Remaining */}
          <div className="bg-orange-500 text-white text-center p-1 rounded-lg">
            <p className="text-sm font-semibold">26 Min</p>
          </div>
        </div>

        {/* Left Side: Camera Preview (Laptop Style) */}
        <div className="flex flex-col justify-center items-center bg-gray-300 p-4 rounded-lg w-full h-full">
          <h2 className="text-white text-3xl font-bold mb-4">Trainee Interview</h2> {/* Trainee Interview label */}
          <div className="relative w-full max-w-[900px] mx-auto bg-black rounded-lg border-4 border-gray-800">
            <div className="aspect-w-16 aspect-h-9">
              {cameraError ? (
                <div className="text-red-500 text-center">{cameraError}</div> // Display error if camera fails
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
        </div>

        {/* Right Side: Instructions Section */}
        <div className="space-y-8">
          {/* Instructions Title */}
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-4 bg-yellow-100 p-4 rounded-lg">
            Instructions
          </h1>

          {/* Instructions List */}
          <ul className="space-y-4">
            <li className="flex items-center justify-between">
              <span className="text-lg text-gray-600">Ensure stable internet and choose a clean, quiet location.</span>
              <input
                type="checkbox"
                className="ml-3"
                checked={checkedItems[0]}
                onChange={() => handleCheckboxChange(0)}
              />
            </li>
            <li className="flex items-center justify-between">
              <span className="text-lg text-gray-600">Permission for access to camera, microphone, and screen sharing is required.</span>
              <input
                type="checkbox"
                className="ml-3"
                checked={checkedItems[1]}
                onChange={() => handleCheckboxChange(1)}
              />
            </li>
            <li className="flex items-center justify-between">
              <span className="text-lg text-gray-600">Be in professional attire and avoid distractions.</span>
              <input
                type="checkbox"
                className="ml-3"
                checked={checkedItems[2]}
                onChange={() => handleCheckboxChange(2)}
              />
            </li>
            <li className="flex items-center justify-between">
              <span className="text-lg text-gray-600">Give a detailed response, providing as much information as you can.</span>
              <input
                type="checkbox"
                className="ml-3"
                checked={checkedItems[3]}
                onChange={() => handleCheckboxChange(3)}
              />
            </li>
            <li className="flex items-center justify-between">
              <span className="text-lg text-gray-600">Answer the question with examples and projects you've worked on.</span>
              <input
                type="checkbox"
                className="ml-3"
                checked={checkedItems[4]}
                onChange={() => handleCheckboxChange(4)}
              />
            </li>
          </ul>

          <p className="mt-6 text-gray-600">
            Click here to try a mock interview with Avya, our AI Interviewer, and build your confidence before the main Interview!
          </p>

          <button
            className="mt-4 w-full px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-400"
            onClick={() => (window.location.href = "/permissions")}
          >
            Start Now
          </button>
        </div>
      </div>
    </div>
  );
}
