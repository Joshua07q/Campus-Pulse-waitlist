import type { Metadata } from "next";
import { Inter, Oswald } from "next/font/google"; // Oswald as placeholder for Goodly
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

// Using Oswald as a display font placeholder for "Goodly"
const goodly = Oswald({
  variable: "--font-goodly",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CampusPulse - What's Happening on Campus?",
  description: "Find out instantly with CampusPulse — the heartbeat of student life.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${goodly.variable} antialiased bg-night text-white`}
      >
        {children}
      </body>
    </html>
  );
}
