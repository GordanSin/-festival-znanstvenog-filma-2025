import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, MapPin } from "lucide-react";
import type { Film } from "@shared/schema";

interface FilmCardProps {
  film: Film;
  onViewDetails?: (film: Film) => void;
}

export function FilmCard({ film, onViewDetails }: FilmCardProps) {
  const categoryColors = {
    "Obnovljiva energija": "bg-green-100 text-green-800",
    "Održiva poljoprivreda": "bg-emerald-100 text-emerald-800",
    "Zelena tehnologija": "bg-teal-100 text-teal-800",
    "Klimatske promjene": "bg-blue-100 text-blue-800",
    "Ekološki gradovi": "bg-lime-100 text-lime-800",
    "Ciklička ekonomija": "bg-cyan-100 text-cyan-800",
  };

  return (
    <Card className="film-card overflow-hidden shadow-lg border border-border" data-testid={`film-card-${film.id}`}>
      <img 
        src={film.imageUrl} 
        alt={film.title}
        className="w-full h-48 object-cover"
        data-testid={`film-image-${film.id}`}
      />
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-3">
          <Badge 
            className={categoryColors[film.category as keyof typeof categoryColors] || "bg-muted text-muted-foreground"}
            data-testid={`film-category-${film.id}`}
          >
            {film.category}
          </Badge>
          <span className="text-sm text-muted-foreground" data-testid={`film-duration-${film.id}`}>
            {film.duration} min
          </span>
        </div>
        <h3 className="text-lg font-semibold text-card-foreground mb-2" data-testid={`film-title-${film.id}`}>
          {film.title}
        </h3>
        <p className="text-muted-foreground text-sm mb-4" data-testid={`film-description-${film.id}`}>
          {film.description}
        </p>
        <div className="flex items-center justify-between">
          <Button 
            variant="ghost" 
            size="sm"
            className="text-primary hover:text-primary/80 font-medium p-0"
            onClick={() => onViewDetails?.(film)}
            data-testid={`button-film-details-${film.id}`}
          >
            Saznaj više <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
          <div className="flex items-center text-sm text-muted-foreground">
            <MapPin className="mr-1 h-4 w-4" />
            <span data-testid={`film-location-${film.id}`}>{film.location}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
