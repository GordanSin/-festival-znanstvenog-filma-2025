import { LogoIcon } from "./logo-icon";

export function Footer() {
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
    <footer className="bg-primary text-primary-foreground py-16" data-testid="main-footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <LogoIcon className="text-primary-foreground" size="md" />
              <div>
                <h4 className="text-xl font-bold">Festival znanstvenog filma</h4>
                <p className="text-primary-foreground/80">Green Jobs 2025</p>
              </div>
            </div>
            <p className="text-primary-foreground/80 text-sm leading-relaxed mb-6" data-testid="footer-description">
              Prvi Festival znanstvenog filma u Hrvatskoj koji spaja kulturu, znanost i održivi razvoj kroz 
              21 međunarodnih dokumentarnih filmova o zelenoj budućnosti.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors" data-testid="footer-social-facebook">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a href="#" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors" data-testid="footer-social-instagram">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.611-3.197-1.559-.748-.948-1.037-2.177-.793-3.365.244-1.188 1.063-2.215 2.244-2.815 1.181-.6 2.568-.6 3.797-.168 1.229.432 2.244 1.371 2.782 2.572.538 1.201.538 2.572 0 3.773-.538 1.201-1.553 2.14-2.782 2.572-1.229.432-2.616.432-3.797 0-.616-.225-1.181-.6-1.654-1.088z"/>
                </svg>
              </a>
              <a href="#" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors" data-testid="footer-social-youtube">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
              <a href="#" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors" data-testid="footer-social-twitter">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </a>
            </div>
          </div>

          <div>
            <h5 className="font-semibold text-primary-foreground mb-4">Brzi linkovi</h5>
            <ul className="space-y-2 text-sm">
              <li>
                <button 
                  onClick={() => scrollToSection("films")} 
                  className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                  data-testid="footer-link-films"
                >
                  Program filmova
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection("schedule")} 
                  className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                  data-testid="footer-link-schedule"
                >
                  Raspored
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection("locations")} 
                  className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                  data-testid="footer-link-locations"
                >
                  Lokacije
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection("about")} 
                  className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                  data-testid="footer-link-about"
                >
                  O festivalu
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection("contact")} 
                  className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                  data-testid="footer-link-contact"
                >
                  Kontakt
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h5 className="font-semibold text-primary-foreground mb-4">Organizatori</h5>
            <ul className="space-y-2 text-sm">
              <li className="text-primary-foreground/80">UTK-SCT "Galileo Galilei"</li>
              <li className="text-primary-foreground/80">Rovinj-Rovigno</li>
              <li className="text-primary-foreground/80 mt-3">Goethe-Institut</li>
              <li className="text-primary-foreground/80">Kroatien</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-sm text-primary-foreground/80 mb-4 md:mb-0">
            <p>&copy; 2025 Festival znanstvenog filma. Sva prava zadržana.</p>
          </div>
          <div className="flex space-x-6 text-sm">
            <a href="#" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors" data-testid="footer-link-privacy">
              Pravila privatnosti
            </a>
            <a href="#" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors" data-testid="footer-link-terms">
              Uvjeti korištenja
            </a>
            <button className="text-primary-foreground/80 hover:text-primary-foreground transition-colors" data-testid="footer-language-toggle">
              English
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
