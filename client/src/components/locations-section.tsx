import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, MapPin, ArrowRight, Clock } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import type { Location } from "@shared/schema";
import { useState } from "react";
import pulaImage from "@assets/pula_1758831240469.jpg";
import umagImage from "@assets/umag_1758831379550.jfif";
import buzetImage from "@assets/buzet_1758831685132.jfif";
import pazinImage from "@assets/pazin_1758831958515.jfif";
import porecImage from "@assets/porec_1758910010592.jfif";
import rovinjImage from "@assets/rovinj-xx_1758910212100.jpg";
import rijekaImage from "@assets/rijeka_1758910125510.webp";

// Program schedule data extracted from the festival program images
const buzetProgram = {
  "5.11.2025": [
    {
      time: "18:00",
      title: "Plan Z - od bijelih kuta do lisica",
      titleIt: "Piano Z – dai camici bianchi alle manette",
      director: "Louisa Jones, Vladimir Morozov",
      country: "Velika Britanija / Regno Unito",
      duration: "23 min"
    },
    {
      time: "18:00",
      title: "Znatiželjnje djevojke – žene budućnosti",
      titleIt: "Ragazze curiose – donne del futuro",
      director: "Déborah A. De Mari",
      country: "Brazil",
      duration: "43 min"
    }
  ],
  "10.11.2025": [
    {
      time: "18:00",
      title: "Je li naša budućnost na vodi?",
      titleIt: "Il nostro futuro è sull'acqua?",
      director: "Xavier Marquis",
      country: "France",
      duration: "52 min"
    },
    {
      time: "18:00",
      title: "Zaštiti i očuvaj",
      titleIt: "Proteggi e conserva",
      director: "Atzmon Dagan",
      country: "Israel",
      duration: "11 min"
    }
  ],
  "12.11.2025": [
    {
      time: "18:00",
      title: "Genova Lab",
      director: "Caroline Betram",
      country: "Njemačka / Germania",
      duration: "20 min",
      description: "projekcija filma / proiezione del film"
    },
    {
      time: "18:00",
      title: "Dobrodošli u susjedstvo",
      titleIt: "Benvenuti nel vicinato",
      director: "Heiko De Groot",
      country: "Austria",
      duration: "47 min"
    }
  ]
};

const rovinjProgram = {
  "4.11.2025": [
    {
      time: "18:00",
      type: "conference",
      title: "Pametni gradovi, pametni planet",
      titleIt: "Città intelligenti, pianeta intelligente",
      speaker: "Goran Zaharija, dr.sc. PMF Split",
      venue: "kino Antonio Gandusio"
    },
    {
      time: "18:30",
      title: "Genova Lab",
      director: "Caroline Betram",
      country: "Njemačka / Germania",
      duration: "20 min",
      description: "Predviđanje ekstremnih vremenskih pojava pomoću podataka građana",
      descriptionIt: "Previsione di eventi meteorologici estremi mediante i dati dei cittadini",
      venue: "kino Antonio Gandusio"
    },
    {
      time: "19:00",
      title: "Filmsko druženje",
      titleIt: "Serata di cinema",
      venue: "kino Antonio Gandusio"
    }
  ],
  "5.11.2025": [
    {
      time: "9:30",
      title: "Nina i hobotnice / Nina e i polpi",
      director: "Marcella Muller",
      country: "Njemačka / Germania",
      duration: "25 min",
      audience: "učenici osnovnih škola / alunni delle scuole elementari"
    },
    {
      time: "9:30",
      title: "Umjetnost promatranja",
      director: "Andris Gauja",
      country: "Estonia",
      duration: "17 min",
      audience: "učenici osnovnih škola / alunni delle scuole elementari"
    },
    {
      time: "11:00",
      title: "Dobrodošli u fulldome / Benvenuti nel fulldome",
      director: "Jonáš Jirovský",
      country: "Češka / Repubblica Ceca",
      duration: "38 min",
      audience: "učenici osnovnih škola / alunni delle scuole elementari"
    },
    {
      time: "12:30",
      title: "Titli leptiri / Titli farfalle",
      director: "Akanksha Sood Singh",
      country: "India",
      duration: "37 min",
      audience: "učenici osnovnih škola / alunni delle scuole elementari"
    },
    {
      time: "18:30",
      title: "Je li naša budućnost na vodi? / Il nostro futuro è sull'acqua?",
      director: "Xavier Marquis",
      country: "France",
      duration: "52 min",
      venue: "prizemlje kino Gandusio - piano terra del teatro Gandusio"
    }
  ],
  "6.11.2025": [
    {
      time: "9:30",
      title: "Znatiželjnje djevojke – žene budućnosti",
      titleIt: "Ragazze curiose – donne del futuro",
      director: "Déborah A. De Mari",
      country: "Brazil",
      duration: "43 min",
      audience: "učenici srednjih škola / studenti delle scuole superiori"
    },
    {
      time: "11:00",
      title: "Plan Z - od bijelih kuta do lisica",
      titleIt: "Piano Z – dai camici bianchi alle manette",
      director: "Louisa Jones, Vladimir Morozov",
      country: "Velika Britanija / Regno Unito",
      duration: "23 min",
      audience: "učenici srednjih škola / studenti delle scuole superiori"
    },
    {
      time: "11:00",
      title: "Naši korijeni ostaju / Le nostre radici restano",
      director: "Ivonna Serna, Selim Benzeghia",
      country: "Mexico",
      duration: "18 min",
      audience: "učenici srednjih škola / studenti delle scuole superiori"
    },
    {
      time: "12:30",
      title: "Znatiželjnje djevojke – žene budućnosti",
      titleIt: "Ragazze curiose – donne del futuro",
      director: "Déborah A. De Mari",
      country: "Brazil",
      duration: "43 min",
      audience: "učenici srednjih škola / studenti delle scuole superiori"
    },
    {
      time: "18:30",
      title: "Izvan okvira sustava / Fuori dal sistema",
      director: "Cecilia Paulsson, Anders Nilsson",
      country: "Švedska / Svezia",
      duration: "60 min",
      venue: "prizemlje kino Gandusio - piano terra del teatro Gandusio"
    }
  ],
  "7.11.2025": [
    {
      time: "9:30",
      title: "Znatiželjnje djevojke – žene budućnosti",
      titleIt: "Ragazze curiose – donne del futuro",
      director: "Déborah A. De Mari",
      country: "Brazil",
      duration: "43 min",
      audience: "učenici srednjih škola / studenti delle scuole superiori"
    },
    {
      time: "11:00",
      title: "Dobrodošli u fulldome / Benvenuti nel fulldome",
      director: "Jonáš Jirovský",
      country: "Češka / Repubblica Ceca",
      duration: "38 min",
      audience: "učenici srednjih škola / studenti delle scuole superiori"
    },
    {
      time: "12:30",
      title: "Posebni prilozi Atoma Araulla – Plastična Republika",
      titleIt: "Contributi speciali di Atom Araulla – La Repubblica di Plastica",
      director: "Aaron Mendoza",
      country: "Philipini",
      duration: "47 min",
      audience: "učenici srednjih škola / studenti delle scuole superiori"
    },
    {
      time: "18:30",
      title: "Tajna majki iz prapovijesti",
      titleIt: "Il segreto delle madri della preistoria",
      director: "Anja Krug-Metzinger",
      country: "Njemačka / Germania",
      duration: "60 min",
      venue: "prizemlje kino Gandusio - piano terra del teatro Gandusio"
    }
  ]
};

export function LocationsSection() {
  const { t } = useLanguage();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<any | null>(null);
  
  const { data: locations = [], isLoading } = useQuery<Location[]>({
    queryKey: ["/api/locations"],
  });

  // Additional locations with static data since we have limited API data
  const allLocations = [
    ...locations,
    {
      id: "3",
      name: "Pula-Pola",
      description: "Zajednica tehničke kulture Istarske županije",
      imageUrl: pulaImage,
      filmCount: 7,
      dates: ["6.-8. studenog"],
      createdAt: new Date(),
    },
    {
      id: "4", 
      name: "Umag-Umago",
      description: "Ustanova za protokol, odnose s javnošću i manifestacije FESTUM",
      imageUrl: umagImage,
      filmCount: 4,
      dates: ["10.-11. studenog"],
      createdAt: new Date(),
    },
    {
      id: "5",
      name: "Buzet", 
      description: "Pučko otvoreno učilište Augustin Vivoda",
      imageUrl: buzetImage,
      filmCount: 3,
      dates: ["5., 10., 12. studenog 2025"],
      createdAt: new Date(),
      hasProgram: true,
      program: buzetProgram
    },
    {
      id: "6",
      name: "Pazin",
      description: "Centar za kulturu i obrazovanje", 
      imageUrl: pazinImage,
      filmCount: 3,
      dates: ["13.-14. studenog"],
      createdAt: new Date(),
    },
    {
      id: "7",
      name: "Rijeka",
      description: "Centar tehničke kulture",
      imageUrl: rijekaImage,
      filmCount: 9,
      dates: ["14.-16. studenog"],
      createdAt: new Date(),
    },
    {
      id: "8",
      name: "Poreč-Parenzo",
      description: "Pučko otvoreno učilište",
      imageUrl: porecImage,
      filmCount: 5,
      dates: ["17.-18. studenog"],
      createdAt: new Date(),
    },
    {
      id: "9",
      name: "Rovinj-Rovigno",
      description: "Pučko otvoreno učilište-Universita popolare aperta",
      imageUrl: rovinjImage,
      filmCount: 6,
      dates: ["4.-7. studenog 2025"],
      createdAt: new Date(),
      hasProgram: true,
      program: rovinjProgram
    }
  ];

  const handleLocationClick = (location: any) => {
    if (location.hasProgram) {
      setSelectedLocation(location);
      setIsModalOpen(true);
    }
  };

  if (isLoading) {
    return (
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-pulse">
              <div className="h-8 bg-muted rounded w-64 mx-auto mb-4"></div>
              <div className="h-4 bg-muted rounded w-96 mx-auto"></div>
            </div>
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
              className={`overflow-hidden shadow-lg border border-border ${'hasProgram' in location && location.hasProgram ? 'cursor-pointer hover:shadow-xl transition-shadow' : ''}`}
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
                {'hasProgram' in location && location.hasProgram && (
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
              <p className="text-sm text-muted-foreground">{selectedLocation?.description}</p>
            </DialogHeader>

            {selectedLocation?.program && (() => {
              const dates = Object.keys(selectedLocation.program);
              const gridCols = dates.length === 3 ? 'grid-cols-3' : dates.length === 4 ? 'grid-cols-4' : 'grid-cols-2';
              return (
                <Tabs defaultValue={dates[0]} className="flex-1 flex flex-col overflow-hidden">
                  <TabsList className={`grid w-full ${gridCols} mb-4`}>
                    {dates.map((date) => (
                      <TabsTrigger 
                        key={date} 
                        value={date} 
                        data-testid={`tab-${date.replace(/\./g, '-')}`}
                      >
                        {date}
                      </TabsTrigger>
                    ))}
                  </TabsList>

                {Object.entries(selectedLocation.program).map(([date, events]: [string, any]) => (
                  <TabsContent 
                    key={date} 
                    value={date} 
                    className="flex-1 overflow-y-auto space-y-4 pr-2"
                    data-testid={`tab-content-${date}`}
                  >
                    <div className="space-y-4">
                      {events.map((event: any, index: number) => (
                        <div 
                          key={index}
                          className="bg-muted/30 rounded-lg p-4 border border-border hover:bg-muted/50 transition-colors"
                          data-testid={`event-${date}-${index}`}
                        >
                          <div className="flex items-start gap-3">
                            <div className="flex items-center gap-2 text-primary font-semibold min-w-[80px]">
                              <Clock className="h-4 w-4" />
                              <span>{event.time}</span>
                            </div>
                            <div className="flex-1">
                              {event.type === 'conference' ? (
                                <>
                                  <div className="inline-block px-2 py-1 bg-primary/10 text-primary text-xs font-semibold rounded mb-2">
                                    PREDAVANJE / CONFERENZA
                                  </div>
                                  <h4 className="font-bold text-lg text-card-foreground mb-1">
                                    {event.title}
                                  </h4>
                                  {event.titleIt && (
                                    <h4 className="font-bold text-lg text-card-foreground/80 mb-2 italic">
                                      {event.titleIt}
                                    </h4>
                                  )}
                                  <p className="text-sm text-muted-foreground mb-2">
                                    predavač / relatore: <span className="font-medium">{event.speaker}</span>
                                  </p>
                                  {event.venue && (
                                    <p className="text-xs text-muted-foreground italic">
                                      📍 {event.venue}
                                    </p>
                                  )}
                                </>
                              ) : (
                                <>
                                  {event.audience && (
                                    <div className="inline-block px-2 py-1 bg-green-900/20 text-green-900 dark:bg-green-800/30 dark:text-green-400 text-xs font-semibold rounded mb-2">
                                      {event.audience}
                                    </div>
                                  )}
                                  <h4 className="font-bold text-lg text-card-foreground mb-1">
                                    {event.title}
                                  </h4>
                                  {event.titleIt && (
                                    <h4 className="font-semibold text-base text-card-foreground/80 mb-2 italic">
                                      {event.titleIt}
                                    </h4>
                                  )}
                                  <div className="space-y-1 text-sm text-muted-foreground">
                                    {event.director && (
                                      <p>
                                        redatelj/regista: <span className="font-medium text-card-foreground">{event.director}</span>
                                      </p>
                                    )}
                                    {event.country && (
                                      <p>
                                        zemlja/stato: <span className="font-medium">{event.country}</span>
                                      </p>
                                    )}
                                    {event.duration && (
                                      <p>
                                        trajanje/durata: <span className="font-medium">{event.duration}</span>
                                      </p>
                                    )}
                                    {event.description && (
                                      <p className="mt-2 text-muted-foreground leading-relaxed">
                                        {event.description}
                                      </p>
                                    )}
                                    {event.descriptionIt && (
                                      <p className="text-muted-foreground/80 italic leading-relaxed">
                                        {event.descriptionIt}
                                      </p>
                                    )}
                                    {event.venue && (
                                      <p className="text-xs italic mt-2">
                                        📍 {event.venue}
                                      </p>
                                    )}
                                  </div>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
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
