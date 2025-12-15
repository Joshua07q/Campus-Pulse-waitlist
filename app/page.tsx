import Hero from "@/components/Hero";
import Features from "@/components/Features";
import HowItWorks from "@/components/HowItWorks";
import Categories from "@/components/Categories";
import Testimonials from "@/components/Testimonials";
import Organizers from "@/components/Organizers";
import AppPreview from "@/components/AppPreview";
import Trust from "@/components/Trust";
import Rollout from "@/components/Rollout";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-night text-white overflow-hidden font-sans">
      <Hero />
      <Features />
      <HowItWorks />
      <Categories />
      <Testimonials />
      <Organizers />
      <AppPreview />
      <Trust />
      <Rollout />
      <FAQ />
      <Footer />
    </main>
  );
}
