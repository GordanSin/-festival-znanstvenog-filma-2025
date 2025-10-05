import { Button } from "@/components/ui/button";
import heroBackgroundDesktop from "@assets/Gemini_Generated_Image_97rt1a97rt1a97rt_1759682257025.webp";
import heroBackgroundMobile from "@assets/generated_images/Green_jobs_mobile_hero_8b7aff82.png";

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
      className="relative text-primary-foreground pt-16 min-h-screen overflow-hidden" 
      data-testid="hero-section"
    >
      {/* Responsive Background Image */}
      <picture className="absolute inset-0 w-full h-full">
        <source media="(min-width: 768px)" srcSet={heroBackgroundDesktop} />
        <img 
          src={heroBackgroundMobile} 
          alt="Festival znanstvenog filma - Green Jobs" 
          className="absolute inset-0 w-full h-full object-cover"
        />
      </picture>
      {/* Light overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/20"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 min-h-screen">
        {/* Main Title - Near Menu */}
        <div className="text-right pr-8 md:pr-16" style={{ paddingTop: '20px' }}>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-black drop-shadow-lg" data-testid="hero-title">
            Festival znanstvenog<br />filma
          </h1>
        </div>
        
        {/* Bottom Content */}
        <div className="text-center w-full absolute bottom-32 left-0 right-0">
          <div className="text-xl md:text-2xl mb-8 text-foreground">
            <p className="mb-2 drop-shadow-xl font-semibold" data-testid="hero-subtitle">Ekologija i zeleni poslovi budućnosti</p>
            <p className="text-lg drop-shadow-lg font-medium" data-testid="hero-dates">Studeni 2025 • Istra & Rijeka</p>
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
