import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import PrefaceSection from "@/components/PrefaceSection";
import SpeakersSection from "@/components/SpeakersSection";
import TimelineSection from "@/components/TimelineSection";
import ScopeGrid from "@/components/ScopeGrid";
import PublicationsList from "@/components/PublicationsList";
import GallerySection from "@/components/GallerySection";
import ContactSection from "@/components/ContactSection";
import FooterSection from "@/components/FooterSection";
import ParticleBackground from "@/components/ParticleBackground";

const Index = () => {
  return (
    <div className="min-h-screen bg-background relative">
      <div className="fixed inset-0 z-0">
        <ParticleBackground />
      </div>
      <div className="relative z-10">
        <Navbar />
        <HeroSection />
        <PrefaceSection />
        <SpeakersSection />
        <TimelineSection />
        <ScopeGrid />
        <PublicationsList />
        <GallerySection />
        <ContactSection />
        <FooterSection />
      </div>
    </div>
  );
};

export default Index;

