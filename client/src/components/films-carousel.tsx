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

interface Film {
  id: string;
  title: string;
  imageData?: string;
  pageNumber: number;
}

export function FilmsCarousel() {
  const { data: films, isLoading, error } = useQuery<Film[]>({
    queryKey: ['/api/films'],
  });

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
              <Card className="h-full">
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
                    <p className="text-sm text-gray-500 mt-2" data-testid={`film-page-${film.id}`}>
                      Page {film.pageNumber}
                    </p>
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
    </section>
  );
}