// app/utils/progress.js

// Redirects users to the correct step if they access a page out of order.
export const checkProgress = (requiredStep) => {
    const currentStep = parseInt(sessionStorage.getItem('currentStep') || '1', 10);
  
    // If the user's current step is less than the required step, redirect them
    if (currentStep < requiredStep) {
      const redirectPath = getRedirectPath(currentStep);
      window.location.href = redirectPath;
    }
  };
  
  // Updates the current step in sessionStorage when the user completes a step.
  export const updateProgress = (nextStep) => {
    sessionStorage.setItem('currentStep', nextStep);
  };
  
  // Maps steps to their corresponding page paths.
  export const getRedirectPath = (step) => {
    switch (step) {
      case 1: return '/permission';
      case 2: return '/instruction';
      case 3: return '/answer';
      case 4: return '/loader';
      case 5: return '/question';
      case 6: return '/completion';
      default: return '/permission'; // Default to the first step
    }
  };
  