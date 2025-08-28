import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, MapPin } from "lucide-react";
import type { Location } from "@shared/schema";

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
      imageUrl: "https://images.unsplash.com/photo-1609137144813-7d9921338f24?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
      filmCount: 7,
      dates: ["6.-8. studenog"],
      createdAt: new Date(),
    },
    {
      id: "4", 
      name: "Umag",
      description: "Sportski i kulturni centar s naglaskom na zelenu energiju",
      imageUrl: "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
      filmCount: 4,
      dates: ["10.-11. studenog"],
      createdAt: new Date(),
    },
    {
      id: "5",
      name: "Buzet", 
      description: "Grad tartufa s fokusom na održivu poljoprivredu",
      imageUrl: "https://pixabay.com/get/g440572c709ba7a4f2a57560ba730b2decc548aa16bd159e78ea2b415b432087d37fa0870e132aafe96b61920e17893b5802989d83a1b101e0fedab4fd80f9fe1_1280.jpg",
      filmCount: 3,
      dates: ["12.-13. studenog"],
      createdAt: new Date(),
    },
    {
      id: "6",
      name: "Pazin",
      description: "Administrativni centar Istre s naglaskom na obrazovanje", 
      imageUrl: "https://pixabay.com/get/g57308e99442b1c62c69be6324a2fc052956e4256d7257a71fbd245dc9b80517136a2d201897351601a44683b8cecd9fac1c97e963fb13d8080b8a5f82e27a152_1280.jpg",
      filmCount: 3,
      dates: ["13.-14. studenog"],
      createdAt: new Date(),
    },
    {
      id: "7",
      name: "Rijeka",
      description: "Kulturna prijestolnica s velikim finalom festivala",
      imageUrl: "https://images.unsplash.com/photo-1591825729269-caeb344f6df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
      filmCount: 9,
      dates: ["14.-16. studenog"],
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
            Festival će se održavati u sedam prekrasnih istarskih gradova i Rijeci, povezujući kulturu i znanost kroz cijelu regiju
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-16" data-testid="locations-grid">
          {allLocations.map((location) => (
            <Card key={location.id} className="overflow-hidden shadow-lg border border-border" data-testid={`location-card-${location.id}`}>
              <img 
                src={location.imageUrl} 
                alt={`${location.name} waterfront`}
                className="w-full h-32 object-cover"
                data-testid={`location-image-${location.id}`}
              />
              <CardContent className="p-4">
                <h3 className="text-lg font-semibold text-card-foreground mb-2" data-testid={`location-name-${location.id}`}>
                  {location.name}
                </h3>
                <p className="text-sm text-muted-foreground mb-3" data-testid={`location-description-${location.id}`}>
                  {location.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-primary font-medium" data-testid={`location-film-count-${location.id}`}>
                    {location.filmCount} {location.filmCount === 1 ? 'film' : 'filmova'}
                  </span>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="mr-1 h-4 w-4" />
                    <span data-testid={`location-dates-${location.id}`}>{location.dates[0]}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

      </div>
    </section>
  );
}
