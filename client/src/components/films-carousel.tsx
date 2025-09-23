import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface Film {
  id: string;
  title: string;
  description?: string;
  imageData?: string;
  pageNumber: number;
  category?: string;
  director?: string;
  producer?: string;
  country?: string;
  year?: number;
  duration?: number;
}

export function FilmsCarousel() {
  const [selectedFilm, setSelectedFilm] = useState<Film | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: films, isLoading, error } = useQuery<Film[]>({
    queryKey: ['/api/films'],
  });

  const handleFilmClick = (film: Film) => {
    setSelectedFilm(film);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedFilm(null);
  };

  if (isLoading) {
    return (
      <div className="w-full max-w-6xl mx-auto px-4" data-testid="films-carousel-loading">
        <h2 className="text-3xl font-bold text-center mb-8">Croatian Scientific Films</h2>
        <div className="flex gap-4 overflow-hidden">
          {Array.from({ length: 3 }).map((_, i) => (
            <Card key={i} className="flex-shrink-0 w-80">
              <CardContent className="p-0">
                <Skeleton className="h-64 w-full rounded-t-lg" />
                <div className="p-4">
                  <Skeleton className="h-6 w-3/4" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full max-w-6xl mx-auto px-4 text-center" data-testid="films-carousel-error">
        <h2 className="text-3xl font-bold mb-8">Croatian Scientific Films</h2>
        <p className="text-red-500">Failed to load films. Please try again later.</p>
      </div>
    );
  }

  if (!films || films.length === 0) {
    return (
      <div className="w-full max-w-6xl mx-auto px-4 text-center" data-testid="films-carousel-empty">
        <h2 className="text-3xl font-bold mb-8">Croatian Scientific Films</h2>
        <p className="text-gray-500">No films available.</p>
      </div>
    );
  }

  // Sort films by page number
  const sortedFilms = [...films].sort((a, b) => a.pageNumber - b.pageNumber);

  return (
    <section id="films" className="w-full max-w-6xl mx-auto px-4 py-12" data-testid="films-carousel">
      <h2 className="text-3xl font-bold text-center mb-8">Croatian Scientific Films</h2>
      
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-2 md:-ml-4">
          {sortedFilms.map((film) => (
            <CarouselItem key={film.id} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3" data-testid={`film-slide-${film.id}`}>
              <Card 
                className="h-full cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => handleFilmClick(film)}
                data-testid={`film-card-${film.id}`}
              >
                <CardContent className="p-0">
                  <div className="aspect-[4/3] relative overflow-hidden rounded-t-lg bg-gray-100">
                    {film.imageData ? (
                      <img
                        src={`data:image/jpeg;base64,${film.imageData}`}
                        alt={film.title}
                        className="w-full h-full object-cover"
                        data-testid={`film-image-${film.id}`}
                        loading="lazy"
                      />
                    ) : (
                      <div 
                        className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-100 to-green-100 text-gray-600"
                        data-testid={`film-placeholder-${film.id}`}
                      >
                        <div className="text-center">
                          <div className="text-3xl mb-2">🎬</div>
                          <div className="text-sm">Croatian Scientific Film</div>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 
                      className="font-semibold text-lg leading-tight line-clamp-2"
                      data-testid={`film-title-${film.id}`}
                    >
                      {film.title}
                    </h3>
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious 
          className="left-4 text-lg" 
          data-testid="carousel-prev-button"
        />
        <CarouselNext 
          className="right-4 text-lg" 
          data-testid="carousel-next-button"
        />
      </Carousel>
      
      <div className="text-center mt-4 text-sm text-gray-500">
        {sortedFilms.length} films from Croatian Scientific Film Festival
      </div>

      {/* Film Detail Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto" data-testid="film-detail-modal">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold mb-4" data-testid="modal-film-title">
              {selectedFilm?.title}
            </DialogTitle>
          </DialogHeader>
          
          {selectedFilm && (
            <div className="grid md:grid-cols-2 gap-6">
              {/* Image Section */}
              <div className="aspect-[4/3] relative overflow-hidden rounded-lg bg-gray-100">
                {selectedFilm.imageData ? (
                  <img
                    src={`data:image/jpeg;base64,${selectedFilm.imageData}`}
                    alt={selectedFilm.title}
                    className="w-full h-full object-cover"
                    data-testid="modal-film-image"
                  />
                ) : (
                  <div 
                    className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-100 to-green-100 text-gray-600"
                    data-testid="modal-film-placeholder"
                  >
                    <div className="text-center">
                      <div className="text-6xl mb-4">🎬</div>
                      <div className="text-lg">Croatian Scientific Film</div>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Details Section */}
              <div className="space-y-4">
                {/* Film Details */}
                {selectedFilm.category && (
                  <div>
                    <span className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Kategorija</span>
                    <p className="text-gray-900">{selectedFilm.category}</p>
                  </div>
                )}
                
                {selectedFilm.director && (
                  <div>
                    <span className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Redatelj</span>
                    <p className="text-gray-900">{selectedFilm.director}</p>
                  </div>
                )}
                
                {selectedFilm.producer && (
                  <div>
                    <span className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Producent</span>
                    <p className="text-gray-900">{selectedFilm.producer}</p>
                  </div>
                )}
                
                {selectedFilm.country && selectedFilm.year && (
                  <div>
                    <span className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Zemlja i godina</span>
                    <p className="text-gray-900">{selectedFilm.country}, {selectedFilm.year}</p>
                  </div>
                )}
                
                {/* Description */}
                {selectedFilm.description && (
                  <div>
                    <span className="text-sm font-semibold text-gray-500 uppercase tracking-wide block mb-2">Kratki opis</span>
                    <div 
                      className="max-h-64 overflow-y-auto border border-gray-200 rounded-md p-3 bg-gray-50"
                      data-testid="modal-film-description-container"
                    >
                      <p 
                        className="text-sm text-gray-700 leading-relaxed"
                        data-testid="modal-film-description"
                      >
                        {selectedFilm.description}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}