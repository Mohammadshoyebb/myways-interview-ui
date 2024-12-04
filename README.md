This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.





# MyWays Interview UI

## Overview

**MyWays Interview UI** is a web application designed to help users practice for AI-powered interviews. The application simulates real-world interview conditions by incorporating video, audio, and screen-sharing features. It walks users through different stages of the interview, providing instructions, questions, and a completion page with feedback.

---

## Features

1. **Camera, Microphone, and Screen Sharing Permissions**: Users need to grant permissions for these features to proceed with the interview.
2. **Dynamic Question and Answer Interface**: The user answers questions with a set timer, and the application simulates the actual experience of an interview.
3. **Interview Instructions**: The user gets detailed instructions before the interview begins, ensuring that they are ready and prepared.
4. **Progress Tracking**: The app tracks the user’s progress through different stages and redirects them accordingly.
5. **Completion Page**: After the interview is complete, the user is asked to rate their experience.

---

## Tech Stack

This application is built using the following technologies:

### 1. **Next.js**
   - **Why Next.js?**: Next.js is a React-based framework that provides server-side rendering and static site generation. It helps in creating fast and SEO-friendly web applications. In this project, Next.js is used for routing and dynamic page rendering.

### 2. **React.js**
   - **Why React?**: React is a JavaScript library used to build user interfaces. React helps in creating reusable components, making the app more efficient. It is used here for building the front-end components like buttons, input fields, and the camera interface.

### 3. **Tailwind CSS**
   - **Why Tailwind?**: Tailwind CSS is a utility-first CSS framework that makes it easy to style the application. Instead of writing custom CSS, you can use predefined utility classes like `bg-blue-500`, `p-4`, and `rounded-lg` directly in the JSX markup.

### 4. **Media Devices API**
   - **Why Media Devices API?**: This API provides access to the user's camera, microphone, and screen. It is used to handle real-time media (camera and microphone streams) for the interview.

### 5. **Speech Synthesis API (Text-to-Speech)**
   - **Why Speech Synthesis API?**: The Speech Synthesis API is used to read interview questions aloud to the user, making the interview experience more interactive.

---

## Pages Overview

The application consists of several pages that guide the user through different stages of the interview process. Below is a breakdown of each page:

### 1. **Permission Page** (`/permission`)
   - **Purpose**: This page requests and checks for the necessary permissions (camera, microphone, and screen sharing) before the user can proceed with the interview.
   - **Features**: 
     - Requests access to the camera and microphone using the browser’s `navigator.mediaDevices.getUserMedia()` API.
     - Displays a live camera feed (if the user grants permission).
     - Shows a "Start Interview" button that is only enabled once the user grants the required permissions.
   
   - **Flow**: 
     - If permissions are granted, the user is redirected to the **Instruction Page**.
     - If permissions are not granted, the user is alerted and asked to try again.

### 2. **Instruction Page** (`/instruction`)
   - **Purpose**: This page displays the instructions the user needs to follow during the interview.
   - **Features**: 
     - Lists important instructions such as maintaining eye contact with the camera, avoiding distractions, and staying focused.
     - Displays images related to each instruction.
     - The "Start Interview" button allows the user to start the interview once they understand the instructions.
   
   - **Flow**:
     - Once the user clicks on the "Start Interview" button, they are redirected to the **Answer Page**.

### 3. **Answer Page** (`/answer`)
   - **Purpose**: This is the page where the interview question is displayed. The user is required to answer within a set timer (60 seconds).
   - **Features**: 
     - Displays the current question (e.g., "Tell us about yourself").
     - A timer counts down from 60 seconds. When the timer reaches zero, the user is redirected to the **Loader Page**.
     - Camera feed is displayed to ensure the user is being monitored.
   
   - **Flow**:
     - After answering or when the timer reaches zero, the user is redirected to the **Loader Page**.

### 4. **Loader Page** (`/loader`)
   - **Purpose**: This page simulates a loading screen, allowing the system time to process the answer.
   - **Features**: 
     - Displays a "loading" animation or message to the user while their answer is being processed.
   
   - **Flow**:
     - After a brief pause (e.g., 3 seconds), the user is redirected to the **Question Page**.

### 5. **Question Page** (`/question`)
   - **Purpose**: This page displays the next interview question.
   - **Features**: 
     - The question is read aloud using the **Speech Synthesis API**.
     - A timer starts, and the user must respond within the time limit.
   
   - **Flow**:
     - After completing the question, the user is redirected to the **Completion Page**.

### 6. **Completion Page** (`/completion`)
   - **Purpose**: This page shows a feedback form where the user can rate their experience with the interview.
   - **Features**:
     - The user can select an emoji to rate their experience.
     - After submitting their feedback, the user is redirected back to the **Permission Page** to restart the process.
   
---

## Permissions Overview

The interview requires the user to grant several permissions to ensure smooth operation of the video and audio features. These permissions are requested on the **Permission Page**.

1. **Camera Permission**: The camera feed is necessary to monitor the user during the interview.
2. **Microphone Permission**: The microphone is required to capture the user’s answers.
3. **Screen Sharing Permission**: If necessary, the screen can be shared for certain interview stages.
4. **Speaker Permission**: The system may require access to speakers to play audio during the interview (e.g., reading questions aloud).

---

## Step-by-Step Setup

### 1. **Clone the Repository**

To get started, you first need to clone the repository to your local machine.

```bash
git clone https://github.com/your-username/myways-interview-ui.git




![image](https://github.com/Mohammadshoyebb/myways-interview-ui/blob/master/Screenshot%20(3905).png)
![image](https://github.com/Mohammadshoyebb/myways-interview-ui/blob/master/Screenshot%20(3911).png)
![image](https://github.com/Mohammadshoyebb/myways-interview-ui/blob/master/Screenshot%20(3912).png)
![image](https://github.com/Mohammadshoyebb/myways-interview-ui/blob/master/Screenshot%20(3913).png)
![image](https://github.com/Mohammadshoyebb/myways-interview-ui/blob/master/Screenshot%20(3907)-Copy.png)


