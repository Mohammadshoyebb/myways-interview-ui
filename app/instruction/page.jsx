'use client';

export default function Instructions() {
  const instructions = [
    {
      image: '/images/image1.png', // replace with actual image paths
      caption: 'Do not look off screen & maintain eye contact with the camera.'
    },
    {
      image: '/images/image2.png',
      caption: 'Avoid unusual extended pauses & respond to questions promptly.'
    },
    {
      image: '/images/image3.png',
      caption: 'Ensure you are the only person visible in the camera frame during the interview.'
    },
    {
      image: '/images/image4.png',
      caption: 'Don’t switch between tabs in your web browser.'
    },
    {
      image: '/images/image5.png',
      caption: 'Minimizing the screen will lead to you being kicked out.'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
      <div className="bg-white shadow-xl rounded-lg p-8 w-full max-w-3xl space-y-6">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Interview Instructions</h2>

        {/* Proctored Test Environment Message */}
        <div className="text-center text-lg text-red-600 mt-6 font-semibold mb-6">
          You're in a proctored test environment. If caught in any suspicious behaviour, you will be marked FAIL.
        </div>

        {/* Instructions List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {/* Top Row of 3 Rectangles */}
          {instructions.slice(0, 3).map((instruction, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="bg-blue-50 p-4 rounded-lg shadow-md flex flex-col items-center">
                {/* Check if image src exists before rendering */}
                {instruction.image ? (
                  <img
                    src={instruction.image}
                    alt={`Instruction ${index + 1}`}
                    className="h-16 w-16 object-cover mb-4"
                  />
                ) : (
                  <div className="h-16 w-16 bg-gray-300 mb-4 rounded-lg" /> // Placeholder if no image
                )}
              </div>
              <p className="text-gray-700 text-sm text-center mt-2">{instruction.caption}</p>
            </div>
          ))}
        </div>

        {/* Bottom Row of 2 Rectangles (Placed Diagonally) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {instructions.slice(3).map((instruction, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="bg-blue-50 p-4 rounded-lg shadow-md flex flex-col items-center">
                {/* Check if image src exists before rendering */}
                {instruction.image ? (
                  <img
                    src={instruction.image}
                    alt={`Instruction ${index + 1}`}
                    className="h-16 w-16 object-cover mb-4"
                  />
                ) : (
                  <div className="h-16 w-16 bg-gray-300 mb-4 rounded-lg" /> // Placeholder if no image
                )}
              </div>
              <p className="text-gray-700 text-sm text-center mt-2">{instruction.caption}</p>
            </div>
          ))}
        </div>

        {/* Stay Focused Message */}
        <div className="mt-6 text-center text-lg text-gray-700">
          <p>Stay focused and do your best!</p>
        </div>

        {/* Start Interview Button */}
        <div className="text-center mt-8">
          <button
            className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-400"
            onClick={() => (window.location.href = "/answer")} // Update this path for the answer page
          >
            I Understand, Start the Interview
          </button>
        </div>
      </div>
    </div>
  );
}
