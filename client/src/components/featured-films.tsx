import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { FilmCard } from "./film-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search } from "lucide-react";
import type { Film } from "@shared/schema";

export function FeaturedFilms() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const buildApiUrl = () => {
    const params = new URLSearchParams();
    if (searchQuery) params.append('search', searchQuery);
    if (selectedCategory !== "all") params.append('category', selectedCategory);
    return `/api/films${params.toString() ? '?' + params.toString() : ''}`;
  };

  const { data: films = [], isLoading } = useQuery<Film[]>({
    queryKey: [buildApiUrl()],
  });

  const categories = [
    "Sve kategorije",
    "Obnovljiva energija",
    "Održiva poljoprivreda", 
    "Zelena tehnologija",
    "Klimatske promjene",
    "Ekološki gradovi",
    "Ciklička ekonomija"
  ];

  const handleViewDetails = (film: Film) => {
    console.log("View film details:", film);
    // TODO: Implement film detail modal or navigation
  };

  if (isLoading) {
    return (
      <section className="py-20 bg-secondary/30">
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
    <section id="films" className="py-20 bg-secondary/30" data-testid="featured-films-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-primary mb-4" data-testid="films-section-title">
            Izdvojeni filmovi
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto" data-testid="films-section-description">
            25 dokumentarnih filmova iz međunarodnog programa Goethe-Instituta o zelenoj budućnosti i održivom razvoju
          </p>
        </div>

        {/* Film Search and Filter */}
        <div className="mb-12">
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <div className="relative flex-1 max-w-md">
              <Input
                type="text"
                placeholder="Pretraži filmove..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12"
                data-testid="search-films"
              />
              <Search className="absolute left-4 top-3 h-4 w-4 text-muted-foreground" />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full md:w-64" data-testid="filter-category">
                <SelectValue placeholder="Sve kategorije" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category, index) => (
                  <SelectItem 
                    key={category} 
                    value={index === 0 ? "all" : category}
                    data-testid={`category-${index === 0 ? "all" : category.toLowerCase().replace(/\s+/g, "-")}`}
                  >
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Films Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8" data-testid="films-grid">
          {films.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <p className="text-muted-foreground" data-testid="no-films-message">
                Nema filmova koji odgovaraju vašim kriterijima pretrage.
              </p>
            </div>
          ) : (
            films.map((film) => (
              <FilmCard 
                key={film.id} 
                film={film} 
                onViewDetails={handleViewDetails}
              />
            ))
          )}
        </div>

        <div className="text-center mt-12">
          <Button 
            size="lg"
            className="bg-primary text-primary-foreground hover:bg-primary/90"
            data-testid="button-show-all-films"
          >
            Prikaži sve filmove
          </Button>
        </div>
      </div>
    </section>
  );
}
