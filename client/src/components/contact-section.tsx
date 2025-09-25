import { Mail, Phone, GraduationCap, Newspaper, MapPin, Handshake } from "lucide-react";

export function ContactSection() {
  return (
    <section id="contact" className="py-20 bg-muted/20" data-testid="contact-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-primary mb-4" data-testid="contact-title">
            Kontakt
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto" data-testid="contact-description">
            Za sve informacije o festivalu, medijskim partnerstvima i suradnji
          </p>
        </div>


        {/* Address and Social */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-card rounded-xl p-8 border border-border" data-testid="contact-address">
            <h3 className="text-xl font-bold text-card-foreground mb-6 flex items-center">
              <MapPin className="text-primary mr-3 h-6 w-6" />
              Adresa organizatora
            </h3>
            <div className="space-y-3 text-muted-foreground">
              <p className="font-semibold text-card-foreground">
                Udruga tehničke kulture "Galileo Galilei"
              </p>
              <p data-testid="contact-street">Obala Pina Budicina 12</p>
              <p data-testid="contact-city">52210 Rovinj-Rovigno, Hrvatska</p>
              <div className="pt-4">
                <p className="text-sm text-muted-foreground mb-2">Pratite nas:</p>
                <div className="flex space-x-4">
                  <a href="#" className="text-primary hover:text-primary/80 transition-colors" data-testid="social-facebook">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </a>
                  <a href="#" className="text-primary hover:text-primary/80 transition-colors" data-testid="social-instagram">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.611-3.197-1.559-.748-.948-1.037-2.177-.793-3.365.244-1.188 1.063-2.215 2.244-2.815 1.181-.6 2.568-.6 3.797-.168 1.229.432 2.244 1.371 2.782 2.572.538 1.201.538 2.572 0 3.773-.538 1.201-1.553 2.14-2.782 2.572-1.229.432-2.616.432-3.797 0-.616-.225-1.181-.6-1.654-1.088z"/>
                    </svg>
                  </a>
                  <a href="#" className="text-primary hover:text-primary/80 transition-colors" data-testid="social-youtube">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-card rounded-xl p-8 border border-border" data-testid="contact-partnership">
            <h3 className="text-xl font-bold text-card-foreground mb-6 flex items-center">
              <Handshake className="text-primary mr-3 h-6 w-6" />
              Partnerstvo
            </h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-xs font-bold text-muted-foreground">GI</span>
                </div>
                <div>
                  <p className="font-semibold text-card-foreground">Goethe-Institut Kroatien</p>
                  <p className="text-sm text-muted-foreground">Glavni partner programa</p>
                </div>
              </div>
              <div className="border-t border-border pt-4">
                <p className="text-muted-foreground text-sm">
                  Za informacije o partnerstvu i sponzorstvu kontaktirajte nas na{" "}
                  <a href="mailto:partneri@festival-zf.hr" className="text-primary hover:text-primary/80" data-testid="partnership-email">
                    partneri@festival-zf.hr
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
