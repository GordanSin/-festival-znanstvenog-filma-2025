import { Button } from "@/components/ui/button";
import heroBackground from "@assets/Untitled design (6)_1761138229390.png";

export function HeroSection() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offsetTop = element.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth"
      });
    }
  };

  return (
    <section 
      id="home" 
      className="relative text-primary-foreground pt-16 min-h-screen" 
      data-testid="hero-section"
    >
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBackground})` }}
      ></div>
      
      {/* Subtle Overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/30"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-6 lg:px-8 py-4 md:py-20 min-h-screen flex flex-col justify-center">
        {/* Mobile-First Content - Centered */}
        <div className="text-center flex flex-col justify-center flex-1 space-y-8">
          {/* Main Title */}
          <div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-white drop-shadow-2xl leading-tight" data-testid="hero-title">
              Festival<br />znanstvenog filma
            </h1>
          </div>
          
          {/* Subtitle and Dates */}
          <div className="space-y-4">
            <p className="text-xl sm:text-2xl md:text-3xl font-bold text-white drop-shadow-2xl px-4" data-testid="hero-subtitle">
              Ekologija i zeleni poslovi budućnosti
            </p>
            <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-white drop-shadow-2xl" data-testid="hero-dates">
              Studeni 2025
            </p>
            <p className="text-xl sm:text-2xl md:text-3xl font-semibold text-white/90 drop-shadow-2xl">
              Istra & Rijeka
            </p>
          </div>
          
          {/* Buttons */}
          <div className="flex flex-col gap-4 px-4 pt-4">
            <Button 
              size="lg"
              className="bg-accent text-accent-foreground hover:bg-accent/90 shadow-2xl w-full h-14 text-lg font-semibold"
              onClick={() => scrollToSection("films")}
              data-testid="button-view-program"
            >
              Pogledaj program
            </Button>
            <Button 
              size="lg"
              variant="outline"
              className="border-2 border-white text-black bg-white hover:bg-white/90 hover:text-black shadow-2xl w-full h-14 text-lg font-semibold"
              onClick={() => scrollToSection("about")}
              data-testid="button-learn-more"
            >
              Saznaj više
            </Button>
          </div>
        </div>
      </div>
      
      {/* Stats Section */}
      <div className="relative z-10 bg-white/90 backdrop-blur-sm border-t border-green-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div data-testid="stat-films">
              <div className="text-3xl font-bold text-primary">21</div>
              <div className="text-sm text-muted-foreground">Film</div>
            </div>
            <div data-testid="stat-cities">
              <div className="text-3xl font-bold text-primary">7</div>
              <div className="text-sm text-muted-foreground">Gradova</div>
            </div>
            <div data-testid="stat-days">
              <div className="text-3xl font-bold text-primary">14</div>
              <div className="text-sm text-muted-foreground">Dana</div>
            </div>
            <div data-testid="stat-price">
              <div className="text-3xl font-bold text-accent">BEPLATAN</div>
              <div className="text-sm text-muted-foreground">Ulaz</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
