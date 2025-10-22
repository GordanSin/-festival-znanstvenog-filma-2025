import { useLanguage } from "@/contexts/LanguageContext";
import goetheLogo from "@assets/goethe_1761145871362.png";
import galileoLogo from "@assets/PNG - 1_1761146035389.png";
import lcStudioLogo from "@assets/Untitled design (5)_1761146704138.png";
import pentaLogo from "@assets/Untitled design (3)_1761146781891.png";
import istarskaLogo from "@assets/download (1)_1761146837960.png";
import additionalLogo from "@assets/download_1761146883760.jpeg";
import additionalLogo2 from "@assets/download (1)_1761146932857.jpeg";
import additionalLogo3 from "@assets/download (2)_1761147020056.jpeg";
import ctkLogo from "@assets/download (2)_1761147051949.png";
import buzetLogo from "@assets/download (3)_1761147110558.png";
import ztkPulaLogo from "@assets/logo-ztk-3 (1)_1761147214758.png";
import zuficLogo from "@assets/download (4)_1761147255440.png";

export function SponsorsSection() {
  const { t } = useLanguage();
  return (
    <section id="sponsors" className="py-12 bg-muted/10" data-testid="sponsors-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h3 className="text-xl font-semibold text-card-foreground mb-4" data-testid="sponsors-title">
            {t("sponsors.title")}
          </h3>
        </div>

        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
          {/* Goethe Institut */}
          <div className="flex items-center justify-center" data-testid="sponsor-goethe">
            <img 
              src={goetheLogo} 
              alt="Goethe-Institut Kroatien logo" 
              className="w-24 h-auto object-contain opacity-80 hover:opacity-100 transition-opacity"
              loading="lazy"
            />
          </div>

          {/* Galileo Galilei */}
          <div className="flex items-center justify-center" data-testid="sponsor-galileo">
            <img 
              src={galileoLogo} 
              alt="Galileo Galilei Udruga logo" 
              className="w-24 h-auto object-contain opacity-80 hover:opacity-100 transition-opacity"
              loading="lazy"
            />
          </div>

          {/* LC Studio */}
          <div className="flex items-center justify-center" data-testid="sponsor-lcstudio">
            <img 
              src={lcStudioLogo} 
              alt="LC Studio logo" 
              className="w-24 h-auto object-contain opacity-80 hover:opacity-100 transition-opacity"
              loading="lazy"
            />
          </div>

          {/* Penta ID Systems */}
          <div className="flex items-center justify-center" data-testid="sponsor-penta">
            <img 
              src={pentaLogo} 
              alt="Penta ID Systems logo" 
              className="w-24 h-auto object-contain opacity-80 hover:opacity-100 transition-opacity"
              loading="lazy"
            />
          </div>

          {/* Istarska Županija */}
          <div className="flex items-center justify-center" data-testid="sponsor-istarska">
            <img 
              src={istarskaLogo} 
              alt="Istarska Županija logo" 
              className="w-24 h-auto object-contain opacity-80 hover:opacity-100 transition-opacity"
              loading="lazy"
            />
          </div>

          {/* Additional Partner */}
          <div className="flex items-center justify-center" data-testid="sponsor-additional">
            <img 
              src={additionalLogo} 
              alt="Partner logo" 
              className="w-24 h-auto object-contain opacity-80 hover:opacity-100 transition-opacity"
              loading="lazy"
            />
          </div>

          {/* Additional Partner 2 */}
          <div className="flex items-center justify-center" data-testid="sponsor-additional2">
            <img 
              src={additionalLogo2} 
              alt="Partner logo" 
              className="w-16 h-auto object-contain opacity-80 hover:opacity-100 transition-opacity"
              loading="lazy"
            />
          </div>

          {/* Additional Partner 3 */}
          <div className="flex items-center justify-center" data-testid="sponsor-additional3">
            <img 
              src={additionalLogo3} 
              alt="Partner logo" 
              className="w-24 h-auto object-contain opacity-80 hover:opacity-100 transition-opacity"
              loading="lazy"
            />
          </div>

          {/* CTK Rijeka */}
          <div className="flex items-center justify-center" data-testid="sponsor-ctk">
            <img 
              src={ctkLogo} 
              alt="Centar Tehničke Kulture Rijeka logo" 
              className="w-24 h-auto object-contain opacity-80 hover:opacity-100 transition-opacity"
              loading="lazy"
            />
          </div>

          {/* Pučko otvoreno učilište Augustin Vivoda Buzet */}
          <div className="flex items-center justify-center" data-testid="sponsor-buzet">
            <img 
              src={buzetLogo} 
              alt="Pučko otvoreno učilište Augustin Vivoda Buzet logo" 
              className="w-24 h-auto object-contain opacity-80 hover:opacity-100 transition-opacity"
              loading="lazy"
            />
          </div>

          {/* Zajednica Tehničke Kulture Pula */}
          <div className="flex items-center justify-center" data-testid="sponsor-ztk-pula">
            <img 
              src={ztkPulaLogo} 
              alt="Zajednica Tehničke Kulture Pula logo" 
              className="w-24 h-auto object-contain opacity-80 hover:opacity-100 transition-opacity"
              loading="lazy"
            />
          </div>

          {/* Zufic Studio */}
          <div className="flex items-center justify-center" data-testid="sponsor-zufic">
            <img 
              src={zuficLogo} 
              alt="Zufic Studio logo" 
              className="w-24 h-auto object-contain opacity-80 hover:opacity-100 transition-opacity"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
