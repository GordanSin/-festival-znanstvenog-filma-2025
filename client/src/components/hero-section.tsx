import { Button } from "@/components/ui/button";
import heroBackgroundImage from "@assets/Gemini_Generated_Image_bt1631bt1631bt16_1760961177316.png";

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
        style={{ backgroundImage: `url(${heroBackgroundImage})` }}
      ></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-20 min-h-screen flex flex-col justify-between">
        {/* Main Title - Near Menu */}
        <div className="text-center md:text-right md:pr-4 lg:pr-8 -mt-6 md:-mt-12 lg:-mt-16">
          <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold mb-4 md:mb-6 text-white drop-shadow-2xl" data-testid="hero-title">
            Festival znanstvenog<br />filma
          </h1>
        </div>
        
        {/* Bottom Content */}
        <div className="text-center w-full pb-8 md:pb-16">
          <div className="inline-block px-6 py-4 bg-white/80 backdrop-blur-md rounded-2xl shadow-2xl mb-6 md:mb-8">
            <p className="text-lg md:text-xl lg:text-2xl mb-2 font-bold text-black" data-testid="hero-subtitle">Ekologija i zeleni poslovi budućnosti</p>
            <p className="text-xl md:text-2xl lg:text-3xl font-semibold text-primary" data-testid="hero-dates">Studeni 2025 • Istra & Rijeka</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg"
              className="bg-accent text-accent-foreground hover:bg-accent/90 shadow-lg w-full sm:w-auto"
              onClick={() => scrollToSection("films")}
              data-testid="button-view-program"
            >
              Pogledaj program
            </Button>
            <Button 
              size="lg"
              variant="outline"
              className="border-2 border-white text-black bg-white hover:bg-white/90 hover:text-black shadow-lg w-full sm:w-auto"
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
