import Hero from "@/components/Hero";
import Features from "@/components/Features";
import HowItWorks from "@/components/HowItWorks";
import AppPreview from "@/components/AppPreview";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-night text-white overflow-hidden font-sans">
      <Hero />
      <Features />
      <HowItWorks />
      <AppPreview />
      <Testimonials />
      <FAQ />
      <Footer />
    </main>
  );
}
