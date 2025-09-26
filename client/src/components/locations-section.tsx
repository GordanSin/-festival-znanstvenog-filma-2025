import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, MapPin } from "lucide-react";
import type { Location } from "@shared/schema";
import pulaImage from "@assets/pula_1758831240469.jpg";
import umagImage from "@assets/umag_1758831379550.jfif";
import buzetImage from "@assets/buzet_1758831685132.jfif";
import pazinImage from "@assets/pazin_1758831958515.jfif";
import porecImage from "@assets/porec_1758910010592.jfif";

export function LocationsSection() {
  const { data: locations = [], isLoading } = useQuery<Location[]>({
    queryKey: ["/api/locations"],
  });

  // Additional locations with static data since we have limited API data
  const allLocations = [
    ...locations,
    {
      id: "3",
      name: "Pula",
      description: "Najveći grad Istre s bogatom kinematografskom tradicijom",
      imageUrl: pulaImage,
      filmCount: 7,
      dates: ["6.-8. studenog"],
      createdAt: new Date(),
    },
    {
      id: "4", 
      name: "Umag",
      description: "Sportski i kulturni centar s naglaskom na zelenu energiju",
      imageUrl: umagImage,
      filmCount: 4,
      dates: ["10.-11. studenog"],
      createdAt: new Date(),
    },
    {
      id: "5",
      name: "Buzet", 
      description: "Grad tartufa s fokusom na održivu poljoprivredu",
      imageUrl: buzetImage,
      filmCount: 3,
      dates: ["12.-13. studenog"],
      createdAt: new Date(),
    },
    {
      id: "6",
      name: "Pazin",
      description: "Administrativni centar Istre s naglaskom na obrazovanje", 
      imageUrl: pazinImage,
      filmCount: 3,
      dates: ["13.-14. studenog"],
      createdAt: new Date(),
    },
    {
      id: "7",
      name: "Rijeka",
      description: "Centar tehničke kulture",
      imageUrl: "https://images.unsplash.com/photo-1591825729269-caeb344f6df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
      filmCount: 9,
      dates: ["14.-16. studenog"],
      createdAt: new Date(),
    },
    {
      id: "8",
      name: "Poreč",
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
      imageUrl: "https://images.unsplash.com/photo-1555990538-c87d4ba0c93e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
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
            Lokacije festivala
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto" data-testid="locations-description">
            Festival će se održavati u šest prekrasnih istarskih gradova i Rijeci, povezujući kulturu i znanost kroz cijelu regiju
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-16" data-testid="locations-grid">
          {allLocations.map((location) => (
            <Card key={location.id} className="overflow-hidden shadow-lg border border-border" data-testid={`location-card-${location.id}`}>
              <img 
                src={location.imageUrl} 
                alt={`${location.name} waterfront`}
                className="w-full h-48 object-cover"
                data-testid={`location-image-${location.id}`}
              />
              <CardContent className="p-4">
                <h3 className="text-lg font-semibold text-card-foreground mb-2" data-testid={`location-name-${location.id}`}>
                  {location.name}
                </h3>
                <p className="text-sm text-muted-foreground mb-3" data-testid={`location-description-${location.id}`}>
                  {location.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

      </div>
    </section>
  );
}