import { type Film, type InsertFilm, type Location, type InsertLocation, type ScheduleEvent, type InsertScheduleEvent } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // Films
  getFilms(): Promise<Film[]>;
  getFilmById(id: string): Promise<Film | undefined>;
  getFilmsByCategory(category: string): Promise<Film[]>;
  searchFilms(query: string): Promise<Film[]>;
  createFilm(film: InsertFilm): Promise<Film>;
  
  // Locations
  getLocations(): Promise<Location[]>;
  getLocationById(id: string): Promise<Location | undefined>;
  createLocation(location: InsertLocation): Promise<Location>;
  
  // Schedule
  getScheduleEvents(): Promise<ScheduleEvent[]>;
  getScheduleEventsByWeek(week: number): Promise<ScheduleEvent[]>;
  createScheduleEvent(event: InsertScheduleEvent): Promise<ScheduleEvent>;
}

export class MemStorage implements IStorage {
  private films: Map<string, Film>;
  private locations: Map<string, Location>;
  private scheduleEvents: Map<string, ScheduleEvent>;

  constructor() {
    this.films = new Map();
    this.locations = new Map();
    this.scheduleEvents = new Map();
    this.initializeData();
  }

  private initializeData() {
    // Initialize with festival data
    const sampleFilms: Film[] = [
      {
        id: "1",
        title: "Vjetar budućnosti",
        description: "Dokumentarac o revoluciji vjetroelektrana u Europi i njihovom utjecaju na energetsku neovisnost.",
        duration: 45,
        category: "Obnovljiva energija",
        imageUrl: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=450",
        location: "Rovinj",
        screeningDates: ["2025-11-03", "2025-11-04"],
        director: "Anna Schmidt",
        year: 2024,
        language: "German",
        themes: ["wind energy", "renewable", "sustainability"],
        createdAt: new Date(),
      },
      {
        id: "2",
        title: "Hrana iz gradova",
        description: "Kako vertikalne farme mijenjaju način kako proizvodimo hranu u urbanim sredinama.",
        duration: 52,
        category: "Održiva poljoprivreda",
        imageUrl: "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=450",
        location: "Poreč",
        screeningDates: ["2025-11-04", "2025-11-05"],
        director: "Michael Green",
        year: 2024,
        language: "English",
        themes: ["urban farming", "food security", "innovation"],
        createdAt: new Date(),
      }
    ];

    const sampleLocations: Location[] = [
      {
        id: "1",
        name: "Rovinj",
        description: "Glavno središte festivala s otvaranjem i zatvaranjem programa",
        imageUrl: "https://pixabay.com/get/g027932b7ff65e1dcf44758e4d911e88b09614e01bde10cbff5694f923f8af89760d7fecc07974d5428f9cab455f8e3bf9040b59729c96d48f9defbdf1e3cc274_1280.jpg",
        filmCount: 8,
        dates: ["3.-5. studenog"],
        createdAt: new Date(),
      },
      {
        id: "2",
        name: "Poreč",
        description: "UNESCO baština s fokusom na održivu turizam",
        imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        filmCount: 6,
        dates: ["4.-6. studenog"],
        createdAt: new Date(),
      }
    ];

    sampleFilms.forEach(film => this.films.set(film.id, film));
    sampleLocations.forEach(location => this.locations.set(location.id, location));
  }

  async getFilms(): Promise<Film[]> {
    return Array.from(this.films.values());
  }

  async getFilmById(id: string): Promise<Film | undefined> {
    return this.films.get(id);
  }

  async getFilmsByCategory(category: string): Promise<Film[]> {
    return Array.from(this.films.values()).filter(film => film.category === category);
  }

  async searchFilms(query: string): Promise<Film[]> {
    const lowerQuery = query.toLowerCase();
    return Array.from(this.films.values()).filter(film => 
      film.title.toLowerCase().includes(lowerQuery) ||
      film.description.toLowerCase().includes(lowerQuery) ||
      film.themes.some(theme => theme.toLowerCase().includes(lowerQuery))
    );
  }

  async createFilm(insertFilm: InsertFilm): Promise<Film> {
    const id = randomUUID();
    const film: Film = { 
      ...insertFilm, 
      id, 
      createdAt: new Date() 
    };
    this.films.set(id, film);
    return film;
  }

  async getLocations(): Promise<Location[]> {
    return Array.from(this.locations.values());
  }

  async getLocationById(id: string): Promise<Location | undefined> {
    return this.locations.get(id);
  }

  async createLocation(insertLocation: InsertLocation): Promise<Location> {
    const id = randomUUID();
    const location: Location = { 
      ...insertLocation, 
      id, 
      createdAt: new Date() 
    };
    this.locations.set(id, location);
    return location;
  }

  async getScheduleEvents(): Promise<ScheduleEvent[]> {
    return Array.from(this.scheduleEvents.values());
  }

  async getScheduleEventsByWeek(week: number): Promise<ScheduleEvent[]> {
    return Array.from(this.scheduleEvents.values()).filter(event => event.week === week);
  }

  async createScheduleEvent(insertEvent: InsertScheduleEvent): Promise<ScheduleEvent> {
    const id = randomUUID();
    const event: ScheduleEvent = { 
      ...insertEvent, 
      id, 
      createdAt: new Date() 
    };
    this.scheduleEvents.set(id, event);
    return event;
  }
}

export const storage = new MemStorage();
