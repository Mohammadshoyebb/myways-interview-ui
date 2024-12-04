'use client';

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // For programmatic routing

export default function Permissions() {
  const [checkedItems, setCheckedItems] = useState([false, false, false, false, false]);
  const [cameraError, setCameraError] = useState(null); // Handle camera errors
  const [micError, setMicError] = useState(null); // Handle microphone errors
  const [screenError, setScreenError] = useState(null); // Handle screen share errors
  const [cameraPermission, setCameraPermission] = useState(false); // Track camera permission
  const [micPermission, setMicPermission] = useState(false); // Track microphone permission
  const [screenPermission, setScreenPermission] = useState(false); // Track screen recording permission
  const [speakerPermission, setSpeakerPermission] = useState(true); // Assume speakers are available
  const router = useRouter();

  const handleCheckboxChange = (index) => {
    const updatedCheckedItems = [...checkedItems];
    updatedCheckedItems[index] = !updatedCheckedItems[index];
    setCheckedItems(updatedCheckedItems);
  };

  // Function to request all permissions
  useEffect(() => {
    // Request camera permission
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        setCameraPermission(true);
        const videoElement = document.getElementById('camera-preview');
        videoElement.srcObject = stream; // Display camera stream
        videoElement.play(); // Play the stream
      })
      .catch((err) => {
        setCameraError('Unable to access the camera. Please check permissions and try again.');
        console.error('Camera access error: ', err);
      });

    // Request microphone permission
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then(() => {
        setMicPermission(true);
      })
      .catch((err) => {
        setMicError('Unable to access the microphone. Please check permissions and try again.');
        console.error('Microphone access error: ', err);
      });

    // Request screen sharing permission
    navigator.mediaDevices
      .getDisplayMedia({ video: true })
      .then(() => {
        setScreenPermission(true);
      })
      .catch((err) => {
        setScreenError('Unable to access the screen. Please check permissions and try again.');
        console.error('Screen sharing access error: ', err);
      });
  }, []);

  // Handle the button click to ensure all permissions are granted
  const handleStartInterview = () => {
    if (cameraPermission && micPermission && screenPermission) {
      // Mark checkboxes as checked
      setCheckedItems([true, true, true, true, true]);
      // Redirect to the next page (Instruction page)
      router.push("/instruction"); // Redirect to the instruction page
    } else {
      // Show error message if permissions are not granted
      alert("Please grant all necessary permissions.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-200 p-6 flex items-center justify-center relative">
      {/* Profile Icon at the top right */}
      <div className="absolute top-4 right-4 bg-gray-300 p-2 rounded-full cursor-pointer">
        <img
          src="/profile-icon.png" // Replace with actual profile image path
          alt="Profile Icon"
          className="w-8 h-8 rounded-full"
        />
      </div>

      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg p-8 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
        {/* Top Section: Zeko and Time Boxes */}
        <div className="absolute top-0 right-0 flex space-x-[1mm] items-center">
          <div className="bg-orange-500 text-white text-center p-1 rounded-lg">
            <h2 className="text-sm font-bold">Zeko<span className="text-blue-400 text-xs">AI</span></h2>
          </div>
          <div className="bg-orange-500 text-white text-center p-1 rounded-lg">
            <p className="text-sm font-semibold">26 Min</p>
          </div>
        </div>

        {/* Left Side: Camera Preview (Laptop Style) */}
        <div className="flex flex-col justify-center items-center bg-gray-300 p-4 rounded-lg w-full h-full">
          <h2 className="text-white text-3xl font-bold mb-4">Trainee Interview</h2>
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

          {/* Button to Start Interview */}
          <button
            className="mt-4 w-full px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-400"
            onClick={handleStartInterview}
          >
            Start Now
          </button>
        </div>
      </div>
    </div>
  );
}
