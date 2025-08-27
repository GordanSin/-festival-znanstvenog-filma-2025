import { LogoIcon } from "./logo-icon";
import { Button } from "@/components/ui/button";

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
    <section id="home" className="hero-gradient text-primary-foreground pt-16" data-testid="hero-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <div className="mb-8">
            <LogoIcon className="text-primary-foreground mx-auto mb-6" size="lg" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6" data-testid="hero-title">
            Festival znanstvenog<br />filma
          </h1>
          <div className="text-xl md:text-2xl mb-8 text-primary-foreground/90">
            <p className="mb-2" data-testid="hero-subtitle">Green Jobs - Zeleni poslovi budućnosti</p>
            <p className="text-lg" data-testid="hero-dates">Studeni 2025 • Istra & Rijeka</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg"
              className="bg-accent text-accent-foreground hover:bg-accent/90"
              onClick={() => scrollToSection("films")}
              data-testid="button-view-program"
            >
              Pogledaj program
            </Button>
            <Button 
              size="lg"
              variant="outline"
              className="border-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
              onClick={() => scrollToSection("about")}
              data-testid="button-learn-more"
            >
              Saznaj više
            </Button>
          </div>
        </div>
      </div>
      
      {/* Stats Section */}
      <div className="bg-background/10 backdrop-blur-sm border-t border-primary-foreground/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div data-testid="stat-films">
              <div className="text-3xl font-bold">25</div>
              <div className="text-sm text-primary-foreground/80">Filmova</div>
            </div>
            <div data-testid="stat-cities">
              <div className="text-3xl font-bold">7</div>
              <div className="text-sm text-primary-foreground/80">Gradova</div>
            </div>
            <div data-testid="stat-days">
              <div className="text-3xl font-bold">14</div>
              <div className="text-sm text-primary-foreground/80">Dana</div>
            </div>
            <div data-testid="stat-price">
              <div className="text-3xl font-bold">FREE</div>
              <div className="text-sm text-primary-foreground/80">Ulaz</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
