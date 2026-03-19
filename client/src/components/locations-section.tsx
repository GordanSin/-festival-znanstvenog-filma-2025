import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { Calendar, MapPin, ArrowRight, Clock } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import type { Location } from "@shared/schema";
import { useState } from "react";
import { staticLocations, type LocationProgram, type ProgramEvent } from "@/data/location-programs";
import pulaImage from "@assets/pula_1761654065278.webp";
import umagImage from "@assets/umag_1761654240069.webp";
import buzetImage from "@assets/buzet_1761654065277.webp";
import pazinImage from "@assets/pazin_1761654065279.webp";
import porecImage from "@assets/porec_1761654065279.webp";
import rovinjImage from "@assets/rovinj-xx_1761654065278.webp";
import rijekaImage from "@assets/rijeka_1761654065278.webp";

const imageMap: Record<string, string> = {
  pula: pulaImage,
  umag: umagImage,
  buzet: buzetImage,
  pazin: pazinImage,
  porec: porecImage,
  rovinj: rovinjImage,
  rijeka: rijekaImage,
};

interface DisplayLocation {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  filmCount: number;
  dates: string[];
  hasProgram: boolean;
  program?: LocationProgram;
}

function LocationCardSkeleton() {
  return (
    <Card className="overflow-hidden">
      <Skeleton className="w-full h-48" />
      <CardContent className="p-4 space-y-2">
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-1/2" />
      </CardContent>
    </Card>
  );
}

function EventCard({ event }: { event: ProgramEvent }) {
  return (
    <div className="bg-muted/30 rounded-lg p-4 border border-border hover:bg-muted/50 transition-colors">
      <div className="flex items-start gap-3">
        <div className="flex items-center gap-2 text-primary font-semibold min-w-[80px]">
          <Clock className="h-4 w-4" />
          <span>{event.time}</span>
        </div>
        <div className="flex-1">
          {event.type === "conference" ? (
            <>
              <div className="inline-block px-2 py-1 bg-primary/10 text-primary text-xs font-semibold rounded mb-2">
                PREDAVANJE / CONFERENZA
              </div>
              <h4 className="font-bold text-lg text-card-foreground mb-1">{event.title}</h4>
              {event.titleIt && (
                <h4 className="font-bold text-lg text-card-foreground/80 mb-2 italic">{event.titleIt}</h4>
              )}
              <p className="text-sm text-muted-foreground mb-2">
                predavač / relatore: <span className="font-medium">{event.speaker}</span>
              </p>
              {event.venue && <p className="text-xs text-muted-foreground italic">📍 {event.venue}</p>}
            </>
          ) : (
            <>
              {event.audience && (
                <div className="inline-block px-2 py-1 bg-green-900/20 text-green-900 dark:bg-green-800/30 dark:text-green-400 text-xs font-semibold rounded mb-2">
                  {event.audience}
                </div>
              )}
              <h4 className="font-bold text-lg text-card-foreground mb-1">{event.title}</h4>
              {event.titleIt && (
                <h4 className="font-semibold text-base text-card-foreground/80 mb-2 italic">{event.titleIt}</h4>
              )}
              <div className="space-y-1 text-sm text-muted-foreground">
                {event.director && (
                  <p>redatelj/regista: <span className="font-medium text-card-foreground">{event.director}</span></p>
                )}
                {event.country && <p>zemlja/stato: <span className="font-medium">{event.country}</span></p>}
                {event.duration && <p>trajanje/durata: <span className="font-medium">{event.duration}</span></p>}
                {event.description && <p className="mt-2 text-muted-foreground leading-relaxed">{event.description}</p>}
                {event.descriptionIt && <p className="text-muted-foreground/80 italic leading-relaxed">{event.descriptionIt}</p>}
                {event.venue && <p className="text-xs italic mt-2">📍 {event.venue}</p>}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export function LocationsSection() {
  const { t } = useLanguage();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<DisplayLocation | null>(null);

  const { data: apiLocations = [], isLoading } = useQuery<Location[]>({
    queryKey: ["/api/locations"],
  });

  // Merge API locations with static location data
  const allLocations: DisplayLocation[] = [
    ...apiLocations.map((loc) => ({
      ...loc,
      imageUrl: loc.imageUrl,
      hasProgram: false,
    })),
    ...staticLocations.map((loc) => ({
      id: loc.id,
      name: loc.name,
      description: loc.description,
      imageUrl: imageMap[loc.imageKey] || "",
      filmCount: loc.filmCount,
      dates: loc.dates,
      hasProgram: true,
      program: loc.program,
    })),
  ];

  const handleLocationClick = (location: DisplayLocation) => {
    if (location.hasProgram) {
      setSelectedLocation(location);
      setIsModalOpen(true);
    }
  };

  if (isLoading) {
    return (
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Skeleton className="h-10 w-64 mx-auto mb-4" />
            <Skeleton className="h-5 w-96 mx-auto" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <LocationCardSkeleton key={i} />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="locations" className="py-20 bg-background" data-testid="locations-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-primary mb-4" data-testid="locations-title">
            {t("locations.title")}
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto" data-testid="locations-description">
            {t("locations.description")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-16" data-testid="locations-grid">
          {allLocations.map((location) => (
            <Card
              key={location.id}
              className={`overflow-hidden shadow-lg border border-border ${location.hasProgram ? "cursor-pointer hover:shadow-xl transition-shadow" : ""}`}
              onClick={() => handleLocationClick(location)}
              data-testid={`location-card-${location.id}`}
            >
              <img
                src={location.imageUrl}
                alt={`${location.name} waterfront`}
                className="w-full h-48 object-cover"
                loading="lazy"
                data-testid={`location-image-${location.id}`}
              />
              <CardContent className="p-4">
                <h3 className="text-lg font-semibold text-card-foreground mb-2" data-testid={`location-name-${location.id}`}>
                  {location.name}
                </h3>
                <p className="text-sm text-muted-foreground mb-3" data-testid={`location-description-${location.id}`}>
                  {location.description}
                </p>
                {location.hasProgram && (
                  <div className="flex items-center text-primary text-sm font-medium mt-2" data-testid={`location-program-${location.id}`}>
                    <span>{t("locations.program")}</span>
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Location Program Modal */}
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent className="max-w-5xl max-h-[90vh] overflow-hidden flex flex-col" data-testid="location-program-modal">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold flex items-center gap-2" data-testid="modal-location-title">
                <MapPin className="h-6 w-6 text-primary" />
                {selectedLocation?.name}
              </DialogTitle>
              <DialogDescription>{selectedLocation?.description}</DialogDescription>
            </DialogHeader>

            {selectedLocation?.program && (() => {
              const dates = Object.keys(selectedLocation.program);
              const gridCols =
                dates.length === 2 ? "grid-cols-2" :
                dates.length === 3 ? "grid-cols-3" :
                dates.length === 4 ? "grid-cols-4" :
                dates.length === 5 ? "grid-cols-5" :
                dates.length === 6 ? "grid-cols-6" :
                "grid-cols-2";
              return (
                <Tabs defaultValue={dates[0]} className="flex-1 flex flex-col overflow-hidden">
                  <TabsList className={`grid w-full ${gridCols} mb-4`}>
                    {dates.map((date) => (
                      <TabsTrigger key={date} value={date} data-testid={`tab-${date.replace(/\./g, "-")}`}>
                        {date}
                      </TabsTrigger>
                    ))}
                  </TabsList>

                  {Object.entries(selectedLocation.program).map(([date, events]) => (
                    <TabsContent
                      key={date}
                      value={date}
                      className="flex-1 overflow-y-auto space-y-4 pr-2"
                      data-testid={`tab-content-${date}`}
                    >
                      <div className="space-y-4">
                        {events.map((event, index) => (
                          <EventCard key={index} event={event} />
                        ))}
                      </div>
                    </TabsContent>
                  ))}
                </Tabs>
              );
            })()}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
}
