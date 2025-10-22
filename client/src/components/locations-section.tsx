import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, MapPin, ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import type { Location } from "@shared/schema";
import pulaImage from "@assets/pula_1758831240469.jpg";
import umagImage from "@assets/umag_1758831379550.jfif";
import buzetImage from "@assets/buzet_1758831685132.jfif";
import pazinImage from "@assets/pazin_1758831958515.jfif";
import porecImage from "@assets/porec_1758910010592.jfif";
import rovinjImage from "@assets/rovinj-xx_1758910212100.jpg";
import rijekaImage from "@assets/rijeka_1758910125510.webp";

export function LocationsSection() {
  const { t } = useLanguage();
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
      dates: ["12.-13. studenog"],
      createdAt: new Date(),
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
      dates: ["19.-20. studenog"],
      createdAt: new Date(),
    }
  ];

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
            <Card key={location.id} className="overflow-hidden shadow-lg border border-border" data-testid={`location-card-${location.id}`}>
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
                <div className="flex items-center text-primary text-sm font-medium mt-2" data-testid={`location-program-${location.id}`}>
                  <span>{t("locations.program")}</span>
                  <ArrowRight className="ml-1 h-4 w-4" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

      </div>
    </section>
  );
}