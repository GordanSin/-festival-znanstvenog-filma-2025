import { useState, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { FilmCard } from "./film-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";
import type { Film } from "@shared/schema";

export function FeaturedFilms() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const scrollContainerRef = useRef<HTMLDivElement>(null);

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

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -320, // Width of one card plus gap
        behavior: 'smooth'
      });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 320, // Width of one card plus gap
        behavior: 'smooth'
      });
    }
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

        {/* Films Carousel */}
        <div className="relative" data-testid="films-carousel">
          {films.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground" data-testid="no-films-message">
                Nema filmova koji odgovaraju vašim kriterijima pretrage.
              </p>
            </div>
          ) : (
            <>
              {/* Navigation Buttons */}
              <Button
                variant="outline"
                size="icon"
                className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white/90 hover:bg-white shadow-lg"
                onClick={scrollLeft}
                data-testid="scroll-left-button"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              
              <Button
                variant="outline"
                size="icon"
                className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white/90 hover:bg-white shadow-lg"
                onClick={scrollRight}
                data-testid="scroll-right-button"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>

              {/* Scrollable Container */}
              <div 
                ref={scrollContainerRef}
                className="overflow-x-auto scrollbar-hide px-12"
                data-testid="films-scroll-container"
              >
                <div className="flex gap-6 pb-4">
                  {films.map((film) => (
                    <div key={film.id} className="flex-none w-80">
                      <FilmCard 
                        film={film} 
                        onViewDetails={handleViewDetails}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Film Counter */}
              <div className="text-center mt-6">
                <p className="text-sm text-muted-foreground">
                  Prikazuje se {films.length} od ukupno 21 filma
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
