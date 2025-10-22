import { useParams } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Film {
  id: string;
  title: string;
  description: string;
  imageData?: string;
  category?: string;
  director?: string;
  producer?: string;
  country?: string;
  year?: number;
  duration?: number;
}

export default function FilmDetail() {
  const { id } = useParams();

  const { data: film, isLoading, error } = useQuery<Film>({
    queryKey: ['/api/films', id],
    queryFn: async () => {
      const response = await fetch(`/api/films/${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch film');
      }
      return response.json();
    }
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="mb-6">
            <Skeleton className="h-10 w-32" />
          </div>
          <Card>
            <CardContent className="p-0">
              <div className="md:flex">
                <div className="md:w-1/2">
                  <Skeleton className="h-96 w-full" />
                </div>
                <div className="md:w-1/2 p-8">
                  <Skeleton className="h-8 w-3/4 mb-4" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-2/3 mb-4" />
                  <Skeleton className="h-32 w-full" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (error || !film) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Film Not Found</h1>
          <p className="text-gray-600 mb-6">The requested film could not be found.</p>
          <Button onClick={() => window.close()}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Close Window
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8" data-testid="film-detail-page">
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-6">
          <Button 
            onClick={() => window.close()} 
            variant="outline"
            data-testid="close-window-button"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Close Window
          </Button>
        </div>
        
        <Card className="overflow-hidden">
          <CardContent className="p-0">
            <div className="md:flex">
              {/* Image Section */}
              <div className="md:w-1/2">
                {film.imageData ? (
                  <img
                    src={`data:image/jpeg;base64,${film.imageData}`}
                    alt={film.title}
                    className="w-full h-96 md:h-full object-cover"
                    loading="lazy"
                    data-testid="film-detail-image"
                  />
                ) : (
                  <div 
                    className="w-full h-96 md:h-full flex items-center justify-center bg-gradient-to-br from-blue-100 to-green-100 text-gray-600"
                    data-testid="film-detail-placeholder"
                  >
                    <div className="text-center">
                      <div className="text-6xl mb-4">🎬</div>
                      <div className="text-lg">Croatian Scientific Film</div>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Content Section */}
              <div className="md:w-1/2 p-8">
                <h1 
                  className="text-3xl font-bold text-gray-900 mb-6"
                  data-testid="film-detail-title"
                >
                  {film.title}
                </h1>
                
                {/* Film Details */}
                <div className="space-y-4 mb-6">
                  {film.category && (
                    <div>
                      <span className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Category</span>
                      <p className="text-gray-900">{film.category}</p>
                    </div>
                  )}
                  
                  {film.director && (
                    <div>
                      <span className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Director</span>
                      <p className="text-gray-900">{film.director}</p>
                    </div>
                  )}
                  
                  {film.country && film.year && (
                    <div>
                      <span className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Country & Year</span>
                      <p className="text-gray-900">{film.country}, {film.year}</p>
                    </div>
                  )}
                </div>
                
                {/* Description */}
                {film.description && (
                  <div>
                    <span className="text-sm font-semibold text-gray-500 uppercase tracking-wide block mb-2">Description</span>
                    <p 
                      className="text-gray-700 leading-relaxed"
                      data-testid="film-detail-description"
                    >
                      {film.description}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}