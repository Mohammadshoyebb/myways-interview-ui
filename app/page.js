'use client';

import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    // Automatically redirect to the /permissions page on app load
    window.location.href = "/permission";
  }, []);

  return null; // Don't render anything here as we're redirecting to the permissions page
}
