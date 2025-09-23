import { useState, useEffect } from "react";
import { Navigation } from "@/components/navigation";
import { HeroSection } from "@/components/hero-section";
import { FilmsCarousel } from "@/components/films-carousel";
import { ScheduleSection } from "@/components/schedule-section";
import { LocationsSection } from "@/components/locations-section";
import { AboutSection } from "@/components/about-section";
import { ContactSection } from "@/components/contact-section";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { ArrowUp } from "lucide-react";

export default function Home() {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.pageYOffset > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <div className="min-h-screen scroll-smooth" data-testid="home-page">
      <Navigation />
      <HeroSection />
      <FilmsCarousel />
      <ScheduleSection />
      <LocationsSection />
      <AboutSection />
      <ContactSection />
      <Footer />
      
      {/* Back to Top Button */}
      <Button
        className={`fixed bottom-6 right-6 w-12 h-12 rounded-full shadow-lg z-40 transition-all duration-300 ${
          showBackToTop ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 pointer-events-none"
        }`}
        onClick={scrollToTop}
        size="icon"
        data-testid="back-to-top-button"
      >
        <ArrowUp className="h-4 w-4" />
      </Button>
    </div>
  );
}
