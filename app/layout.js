import './globals.css';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>AI Interview Platform</title>
      </head>
      <body className="bg-gray-100 font-sans">
        {children}
      </body>
    </html>
  );
}
