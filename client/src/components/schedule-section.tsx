export function ScheduleSection() {
  const weekOneEvents = [
    { title: "Predavanje: Pametni gradovi, pametni planet", details: "Predavač: Goran Zaharija, dr.sc. PMF Split" },
    { title: "Projekcija filma: Genova Lab", details: "Predviđanje ekstremnih vremenskih pojava pomoću podataka građana" },
    { title: "Filmsko druženje", details: "" },
  ];

  const weekTwoEvents = [
    { title: "Filmski maraton", details: "10.-11. studenog - Umag-Umago" },
    { title: "Školske projekcije", details: "12.-13. studenog - Buzet, Pazin" },
    { title: "Zatvaranje festivala", details: "16. studenog, 20:00 - Rijeka" },
  ];

  return (
    <section id="schedule" className="py-20 bg-muted/30" data-testid="schedule-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-primary mb-4" data-testid="schedule-title">
            Raspored festivala
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto" data-testid="schedule-description">
            Festival će se održavati kroz dva tjedna u studenome 2025. u šest istarskih gradova i Rijeci
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Week 1 */}
          <div className="bg-card rounded-xl p-8 border border-border" data-testid="week-one-schedule">
            <div className="text-center mb-6">
              <div className="inline-block px-4 py-2 bg-accent/20 text-accent rounded-full text-sm font-semibold">
                
              </div>
              <h3 className="text-xl font-bold text-card-foreground mt-4 mb-2">4. studenog 2025. 18h</h3>
              <p className="text-muted-foreground">Kino / Cinema Gandusio, Rovinj-Rovigno</p>
            </div>
            <div className="space-y-4">
              {weekOneEvents.map((event, index) => (
                <div key={index} className="flex items-start space-x-3" data-testid={`week-one-event-${index}`}>
                  <div className="w-3 h-3 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <div className="font-medium text-card-foreground">{event.title}</div>
                    <div className="text-sm text-muted-foreground">{event.details}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Week 2 */}
          <div className="bg-card rounded-xl p-8 border border-border" data-testid="week-two-schedule">
            <div className="text-center mb-6">
              <div className="inline-block px-4 py-2 bg-primary/20 text-primary rounded-full text-sm font-semibold">
                Drugi tjedan
              </div>
              <h3 className="text-xl font-bold text-card-foreground mt-4 mb-2">10. - 16. studenog</h3>
              <p className="text-muted-foreground">Umag-Umago, Buzet, Pazin, Rijeka</p>
            </div>
            <div className="space-y-4">
              {weekTwoEvents.map((event, index) => (
                <div key={index} className="flex items-start space-x-3" data-testid={`week-two-event-${index}`}>
                  <div className="w-3 h-3 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <div className="font-medium text-card-foreground">{event.title}</div>
                    <div className="text-sm text-muted-foreground">{event.details}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
