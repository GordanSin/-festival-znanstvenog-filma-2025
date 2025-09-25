import sustainabilityImage from "@assets/d98d187f-f737-4191-98a5-00aa3a88211b_1758830615469.png";

export function AboutSection() {
  return (
    <section id="about" className="py-20 bg-secondary/20" data-testid="about-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-primary mb-4" data-testid="about-title">
            O festivalu
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto" data-testid="about-subtitle">
            Prvi Festival znanstvenog filma u hrvatskoj koji spaja kulturu, znanost i održivi razvoj
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-16">
          <div>
            <h3 className="text-3xl font-bold text-card-foreground mb-6" data-testid="green-jobs-title">
              Green Jobs - Zeleni poslovi budućnosti
            </h3>
            <p className="text-muted-foreground mb-6 text-lg leading-relaxed" data-testid="green-jobs-description-1">
              Ovogodišnji festival fokusira se na zanimanja i inovacije koje doprinose održivom razvoju i zaštiti okoliša. 
              Kroz 21 pažljivo odabranih dokumentarnih filmova, istražujemo kako nova zelena radna mjesta mijenjaju našu budućnost.
            </p>
            <p className="text-muted-foreground mb-6 leading-relaxed" data-testid="green-jobs-description-2">
              Od obnovljivih izvora energije do održive poljoprivrede, od zelene tehnologije do ciklične ekonomije - 
              filmovi prikazuju najnovije inovacije i prilike koje će definirati sljedeće desetljeće.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-accent rounded-full"></div>
                <span className="text-card-foreground font-medium">Besplatne projekcije</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-secondary-foreground rounded-full"></div>
                <span className="text-card-foreground font-medium"></span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-primary rounded-full"></div>
                <span className="text-card-foreground font-medium"></span>
              </div>
            </div>
          </div>
          <div className="relative">
            <img 
              src={sustainabilityImage} 
              alt="Green jobs illustration showing renewable energy, solar panels, wind turbines and sustainable practices" 
              className="rounded-xl shadow-lg"
              data-testid="sustainability-image"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent rounded-xl"></div>
          </div>
        </div>

        {/* Organization Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="bg-card rounded-xl p-8 border border-border" data-testid="organizers-info">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-primary/20 text-primary rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 5.5V2H13V5.5L7 7V9L13 7.5V11H7V13H13V15.5L7 17V19L13 17.5V22H15V17.5L21 19V17L15 15.5V13H21V11H15V7.5L21 9Z"/>
                </svg>
              </div>
              <div>
                <h4 className="text-xl font-bold text-card-foreground">Organizatori</h4>
                <p className="text-muted-foreground"></p>
              </div>
            </div>
            <div className="space-y-3">
              <div>
                <h5 className="font-semibold text-card-foreground">Udruga tehničke kulture-Societa di cultura tecnica „Galileo Galilei"</h5>
                <p className="text-sm text-muted-foreground">Rovinj-Rovigno</p>
              </div>
              <div className="border-t border-border pt-3">
                <h5 className="font-semibold text-card-foreground">Goethe-Institut Kroatien</h5>
                <p className="text-sm text-muted-foreground">Zagreb</p>
              </div>
            </div>
          </div>

          <div className="bg-card rounded-xl p-8 border border-border" data-testid="program-info">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-accent/20 text-accent rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18,4L20,8H17L15,4H13L15,8H12L10,4H8L10,8H7L5,4H4V10.5L9.5,16L12,13.5L14.5,16L20,10.5V4H18Z"/>
                </svg>
              </div>
              <div>
                <h4 className="text-xl font-bold text-card-foreground">Program</h4>
                <p className="text-muted-foreground">Međunarodna selekcija</p>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-card-foreground">Broj filmova:</span>
                <span className="font-semibold text-primary">21</span>
              </div>
              <div className="flex justify-between">
                <span className="text-card-foreground">Ukupno trajanje:</span>
                <span className="font-semibold text-primary">18+ sati</span>
              </div>
              <div className="flex justify-between">
                <span className="text-card-foreground">Jezici:</span>
                <span className="font-semibold text-primary">HR titlovi</span>
              </div>
            </div>
          </div>
        </div>

        {/* Jury Section */}
        <div className="mb-12">
          <div className="bg-accent/10 rounded-xl p-6 border border-accent/30" data-testid="jury-info">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-secondary-foreground/20 text-secondary-foreground rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM16 14C16 13.4 15.6 13 15 13H9C8.4 13 8 13.4 8 14V19H10V23H14V19H16V14ZM20.5 8.5C20.5 7.67 19.83 7 19 7S17.5 7.67 17.5 8.5 18.17 10 19 10 20.5 9.33 20.5 8.5ZM6.5 8.5C6.5 7.67 5.83 7 5 7S3.5 7.67 3.5 8.5 4.17 10 5 10 6.5 9.33 6.5 8.5Z"/>
                </svg>
              </div>
              <div>
                <h4 className="text-lg font-bold text-card-foreground">Žiri</h4>
                <p className="text-sm text-muted-foreground">Članovi ocjenjivačkog žirija</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-3">
              <div className="p-3 bg-muted/30 rounded-lg">
                <h5 className="font-medium text-sm text-card-foreground">Vedrana Špada</h5>
                <p className="text-xs text-muted-foreground mt-1">nasl. doc. dr. sc.</p>
              </div>
              <div className="p-3 bg-muted/30 rounded-lg">
                <h5 className="font-medium text-sm text-card-foreground">Mirta Smodlaka Tanković</h5>
                <p className="text-xs text-muted-foreground mt-1">dr. sc.</p>
              </div>
              <div className="p-3 bg-muted/30 rounded-lg">
                <h5 className="font-medium text-sm text-card-foreground">Lovro Šverko</h5>
                <p className="text-xs text-muted-foreground mt-1">mag. paed. et educ. inf.</p>
              </div>
              <div className="p-3 bg-muted/30 rounded-lg">
                <h5 className="font-medium text-sm text-card-foreground">Aleksandar Žibert</h5>
                <p className="text-xs text-muted-foreground mt-1">dipl. rač. inž</p>
              </div>
              <div className="p-3 bg-muted/30 rounded-lg">
                <h5 className="font-medium text-sm text-card-foreground">Eric Ušić</h5>
                <p className="text-xs text-muted-foreground mt-1">dr. sc.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Mission Statement */}
        <div className="text-center bg-primary/5 rounded-2xl p-12 border border-primary/20" data-testid="mission-statement">
          <h3 className="text-2xl font-bold text-primary mb-4">Tema festivala 2025</h3>
          <p className="text-lg text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            Festival znanstvenog filma u središte stavlja Zelena radna mjesta 2025. godine, ističući zanimanja koja su      ključna za promicanje i očuvanje okoliša. Zelena radna mjesta mladima pružaju priliku ne samo da ostave značajan trag u svijetu, već i da izgrade održivu karijeru. S obzirom na to da globalni fokus na održivost i ekološki prihvatljive prakse neprestano raste, važnost zelenih radnih mjesta nalazi se u samom središtu presudnog svjetskog prijelaza prema niskougljičnom gospodarstvu.
          </p>
        </div>
      </div>
    </section>
  );
}