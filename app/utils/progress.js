// utils/progress.js

export const getNextPage = (step) => {
  switch (step) {
    case 1:
      return '/instruction';
    case 2:
      return '/answer';
    case 3:
      return '/loader';
    case 4:
      return '/question';
    case 5:
      return '/completion';
    default:
      return '/permission'; // Default to permissions if no step matches
  }
};

export const checkProgress = (requiredStep) => {
  const currentStep = parseInt(sessionStorage.getItem('currentStep') || '1', 10);

  // If the user hasn't completed the previous step, redirect them
  if (currentStep < requiredStep) {
    const redirectPath = getNextPage(currentStep);
    window.location.href = redirectPath;
  }
};

export const updateProgress = (nextStep) => {
  sessionStorage.setItem('currentStep', nextStep);
};
