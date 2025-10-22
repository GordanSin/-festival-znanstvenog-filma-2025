import goetheLogo from "@assets/goethe_1761145871362.png";
import galileoLogo from "@assets/PNG - 1_1761146035389.png";

export function SponsorsSection() {
  return (
    <section id="sponsors" className="py-16 bg-muted/10" data-testid="sponsors-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-primary mb-4" data-testid="sponsors-title">
            Partneri i organizatori
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto" data-testid="sponsors-subtitle">
            Festival znanstvenog filma organiziran je u suradnji s:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto items-center">
          {/* Goethe Institut */}
          <div className="bg-card rounded-xl p-8 border border-border flex items-center justify-center hover:shadow-lg transition-shadow" data-testid="sponsor-goethe">
            <img 
              src={goetheLogo} 
              alt="Goethe-Institut Kroatien logo" 
              className="w-48 h-auto object-contain"
            />
          </div>

          {/* Galileo Galilei */}
          <div className="bg-card rounded-xl p-8 border border-border flex items-center justify-center hover:shadow-lg transition-shadow" data-testid="sponsor-galileo">
            <img 
              src={galileoLogo} 
              alt="Galileo Galilei Udruga logo" 
              className="w-48 h-auto object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
