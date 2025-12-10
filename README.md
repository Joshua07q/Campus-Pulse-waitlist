# CampusPulse 🎧

**What's Happening on Campus? Find out instantly.**

CampusPulse is the heartbeat of student life, designed to keep students connected with the biggest events, real-time updates, and campus buzz.

## 🚀 Features

- **Interactive Hero Section**: Custom Lottie animation containing a diverse crowd of students.
    - **Click Interaction**: Click on the crowd to see them chat in "Gen Z Pidgin" slang (e.g., "Dey play!", "We move!").
    - **Optimized Performance**: Transparent background animations with lightweight vector assets.
- **Waitlist Integration**: Seamless integration with Google Sheets via Apps Script for collecting user signups.
- **Modern UI/UX**: Built with a "Night Mode" aesthetic, using vibrant gradients, glassmorphism, and smooth Framer Motion transitions.
- **Responsive Design**: Fully responsive layout that looks great on mobile, tablet, and desktop.

## 🛠️ Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animation**: 
  - [Lottie React](https://lottiereact.com/) for complex vector animations.
  - [Framer Motion](https://www.framer.com/motion/) for UI transitions.
- **Language**: TypeScript
- **Backend/Storage**: Google Sheets (via Google Apps Script)

## 🏃‍♂️ Getting Started

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Joshua07q/Campus-Pulse-waitlist.git
   cd campus-pulse-website
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000) to see the app running.

## 📁 Project Structure

- `/components`: Reusable UI components (Hero, Features, FAQ, etc.).
- `/public`: Static assets (images, Lottie JSONs).
- `/app`: Next.js App Router pages and layouts.
- `WaitlistScript.js`: The Google Apps Script code used for the backend spreadsheet integration.

## 🎨 Asset Credit

- Hero crowd animation generated from custom sprite sheets processed with Python scripts.
- Icons provided by [Lucide React](https://lucide.dev/).

---

Made with ❤️ by the CampusPulse Team
