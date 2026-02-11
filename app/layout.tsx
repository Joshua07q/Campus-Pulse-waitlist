import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: "CampusPulse - What's Happening on Campus?",
  description: "Find out instantly with CampusPulse - the heartbeat of student life.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="google-adsense-account" content="ca-pub-9128798086677725"></meta>  
      </head>
      <body
        suppressHydrationWarning
        className="antialiased bg-night text-white relative"
      >
        {/* Purple Night Glow Background */}
        <div className="fixed inset-0 z-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-b from-purple/20 via-night to-night" />
          <div className="absolute inset-0 bg-gradient-radial from-purple/25 via-transparent to-transparent opacity-60" />
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple/20 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-lavender/15 rounded-full blur-3xl" />
        </div>
        <div className="relative z-10">
          {children}
        </div>
      </body>
    </html>
  );
}
