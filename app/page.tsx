import Hero from "@/components/Hero";
import WhatsAppBanner from "@/components/WhatsAppBanner";
import Features from "@/components/Features";
import ComingSoon from "@/components/ComingSoon";
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
      <WhatsAppBanner />
      <Features />
      <ComingSoon />
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
