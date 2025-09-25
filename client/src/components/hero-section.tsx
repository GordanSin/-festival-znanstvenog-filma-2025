import { Button } from "@/components/ui/button";
import heroBackgroundImage from "@assets/Gemini_Generated_Image_bt1631bt1631bt16_1758657110533.png";
import logoImage from "@assets/Untitled design (1)_1758821244066.png";

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
      className="relative text-primary-foreground pt-16 min-h-screen bg-cover bg-center bg-no-repeat" 
      style={{ backgroundImage: `url(${heroBackgroundImage})` }}
      data-testid="hero-section"
    >
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/50"></div>
      
      {/* Logo in left corner */}
      <div className="absolute top-2 left-2 z-20">
        <img 
          src={logoImage} 
          alt="Croatian Scientific Film Festival Logo" 
          className="w-auto filter brightness-0 invert" 
          style={{ height: '512px' }}
          data-testid="hero-logo"
        />
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 min-h-screen">
        {/* Main Title - Positioned Higher */}
        <div className="text-center" style={{ paddingTop: '264px' }}>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white drop-shadow-lg" data-testid="hero-title">
            Festival znanstvenog<br />filma
          </h1>
        </div>
        
        {/* Bottom Content */}
        <div className="text-center w-full absolute bottom-32 left-0 right-0">
          <div className="text-xl md:text-2xl mb-8 text-white/95">
            <p className="mb-2 drop-shadow-md" data-testid="hero-subtitle">Green Jobs - Zeleni poslovi budućnosti</p>
            <p className="text-lg drop-shadow-md" data-testid="hero-dates">Studeni 2025 • Istra & Rijeka</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg"
              className="bg-accent text-accent-foreground hover:bg-accent/90 shadow-lg"
              onClick={() => scrollToSection("films")}
              data-testid="button-view-program"
            >
              Pogledaj program
            </Button>
            <Button 
              size="lg"
              variant="outline"
              className="border-2 border-white text-black bg-white hover:bg-white/90 hover:text-black shadow-lg"
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
              <div className="text-3xl font-bold text-primary">25</div>
              <div className="text-sm text-muted-foreground">Filmova</div>
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
              <div className="text-3xl font-bold text-accent">FREE</div>
              <div className="text-sm text-muted-foreground">Ulaz</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
