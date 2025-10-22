import { useLanguage } from "@/contexts/LanguageContext";

export function ScheduleSection() {
  const { t } = useLanguage();
  
  const weekOneEvents = [
    { title: t("schedule.events.lecture"), details: t("schedule.events.lecturerDetails") },
    { title: t("schedule.events.filmProjection"), details: t("schedule.events.filmDescription") },
    { title: t("schedule.events.filmGathering"), details: "" },
  ];

  const weekTwoEvents = [
    { title: t("schedule.events.schoolPrimary"), details: "01.-14. studenog" },
    { title: t("schedule.events.schoolSecondary"), details: "01.-14. studenog" },
    { title: t("schedule.events.citizens"), details: "01.-14. studenog" },
  ];

  return (
    <section id="schedule" className="py-20 bg-muted/30" data-testid="schedule-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-primary mb-4" data-testid="schedule-title">
            {t("schedule.title")}
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto" data-testid="schedule-description">
            {t("schedule.description")}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Week 1 */}
          <div className="bg-card rounded-xl p-8 border border-border" data-testid="week-one-schedule">
            <div className="text-center mb-6">
              <div className="inline-block px-4 py-2 bg-green-500/20 text-green-600 dark:text-green-400 rounded-full text-sm font-semibold">
                {t("schedule.openingCeremony")}
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
              <h3 className="text-xl font-bold text-card-foreground mb-2">01. - 15. studenog 2025.</h3>
              <p className="text-muted-foreground">Rovinj-Rovigno,Poreč-Parenzo,Pula-PolaUmag-Umago, Buzet, Pazin, Rijeka</p>
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
            
            {/* Note */}
            <div className="text-center mt-6">
              <p className="text-sm text-muted-foreground italic" data-testid="schedule-note">
                {t("schedule.note")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
