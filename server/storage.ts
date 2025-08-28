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
      },
      {
        id: "3",
        title: "Električna revolucija",
        description: "Priča o prelasku na električne automobile i infrastrukturi potrebnoj za čistu mobilnost.",
        duration: 38,
        category: "Zelena tehnologija",
        imageUrl: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=450",
        location: "Pula",
        screeningDates: ["2025-11-06", "2025-11-07"],
        director: "Lars Eriksson",
        year: 2023,
        language: "Swedish",
        themes: ["electric vehicles", "clean transport", "infrastructure"],
        createdAt: new Date(),
      },
      {
        id: "4",
        title: "Znanost o klimatskim promjenama",
        description: "Najnovija istraživanja o klimatskim promjenama i mogućim rješenjima za budućnost planete.",
        duration: 67,
        category: "Klimatske promjene",
        imageUrl: "https://images.unsplash.com/photo-1582719471384-894fbb16e074?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=450",
        location: "Rijeka",
        screeningDates: ["2025-11-14", "2025-11-15"],
        director: "Dr. Sarah Johnson",
        year: 2024,
        language: "English",
        themes: ["climate science", "research", "global warming"],
        createdAt: new Date(),
      },
      {
        id: "5",
        title: "Gradovi budućnosti",
        description: "Kako se moderne metropole prilagođavaju klimatskim promjenama kroz inovativnu arhitekturu.",
        duration: 41,
        category: "Ekološki gradovi",
        imageUrl: "https://images.unsplash.com/photo-1518481612222-68bbe828ecd1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=450",
        location: "Umag",
        screeningDates: ["2025-11-10", "2025-11-11"],
        director: "Maria Rodriguez",
        year: 2024,
        language: "Spanish",
        themes: ["urban planning", "green architecture", "sustainability"],
        createdAt: new Date(),
      },
      {
        id: "6",
        title: "Nula otpada",
        description: "Revolucionarne metode recikliranja koje mijenjaju način kako razmišljamo o otpadu.",
        duration: 56,
        category: "Ciklička ekonomija",
        imageUrl: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=450",
        location: "Buzet",
        screeningDates: ["2025-11-12", "2025-11-13"],
        director: "Hiroshi Tanaka",
        year: 2023,
        language: "Japanese",
        themes: ["waste management", "recycling", "circular economy"],
        createdAt: new Date(),
      },
      {
        id: "7",
        title: "Solarni potencijal",
        description: "Dokumentarac o napretku solarne tehnologije i njenoj ulozi u energetskoj tranziciji.",
        duration: 49,
        category: "Obnovljiva energija",
        imageUrl: "https://images.unsplash.com/photo-1509391366360-2e959784a276?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=450",
        location: "Rovinj",
        screeningDates: ["2025-11-03", "2025-11-05"],
        director: "Ahmed Hassan",
        year: 2024,
        language: "Arabic",
        themes: ["solar energy", "renewable", "technology"],
        createdAt: new Date(),
      },
      {
        id: "8",
        title: "Vodena rješenja",
        description: "Inovativni pristupi očuvanju i upravljanju vodnim resursima u vremenu klimatskih promjena.",
        duration: 53,
        category: "Održiva poljoprivreda",
        imageUrl: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=450",
        location: "Poreč",
        screeningDates: ["2025-11-04", "2025-11-06"],
        director: "Elena Petrov",
        year: 2023,
        language: "Russian",
        themes: ["water management", "agriculture", "conservation"],
        createdAt: new Date(),
      },
      {
        id: "9",
        title: "Pametne mreže",
        description: "Kako digitalna tehnologija transformira energetski sektor kroz pametne elektroenergetske mreže.",
        duration: 42,
        category: "Zelena tehnologija",
        imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=450",
        location: "Pula",
        screeningDates: ["2025-11-07", "2025-11-08"],
        director: "Jean-Pierre Dubois",
        year: 2024,
        language: "French",
        themes: ["smart grid", "energy", "digitalization"],
        createdAt: new Date(),
      },
      {
        id: "10",
        title: "Okeanovi u opasnosti",
        description: "Urgentna poruka o stanju svjetskih oceana i mogućnostima njihove zaštite.",
        duration: 71,
        category: "Klimatske promjene",
        imageUrl: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=450",
        location: "Rijeka",
        screeningDates: ["2025-11-15", "2025-11-16"],
        director: "Captain Paul Watson",
        year: 2024,
        language: "English",
        themes: ["ocean conservation", "marine life", "climate"],
        createdAt: new Date(),
      },
      {
        id: "11",
        title: "Zelena arhitektura",
        description: "Revolucionarna građevinska rješenja koja mijenjaju način kako dizajniramo i gradimo gradove.",
        duration: 39,
        category: "Ekološki gradovi",
        imageUrl: "https://images.unsplash.com/photo-1518481612222-68bbe828ecd1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=450",
        location: "Umag",
        screeningDates: ["2025-11-11", "2025-11-12"],
        director: "Ingrid Larsson",
        year: 2023,
        language: "Swedish",
        themes: ["green building", "architecture", "sustainability"],
        createdAt: new Date(),
      },
      {
        id: "12",
        title: "Bioekonomija",
        description: "Kako biološki resursi postaju temelj nove, održive ekonomije budućnosti.",
        duration: 58,
        category: "Ciklička ekonomija",
        imageUrl: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=450",
        location: "Buzet",
        screeningDates: ["2025-11-13", "2025-11-14"],
        director: "Dr. Klaus Weber",
        year: 2024,
        language: "German",
        themes: ["bioeconomy", "sustainability", "innovation"],
        createdAt: new Date(),
      },
      {
        id: "13",
        title: "Vjetrovne farme na moru",
        description: "Budućnost obnovljive energije leži u morskim vjetroelektranama nove generacije.",
        duration: 46,
        category: "Obnovljiva energija",
        imageUrl: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=450",
        location: "Pazin",
        screeningDates: ["2025-11-13", "2025-11-14"],
        director: "Niels Hansen",
        year: 2024,
        language: "Danish",
        themes: ["offshore wind", "renewable", "marine"],
        createdAt: new Date(),
      },
      {
        id: "14",
        title: "Organska revolucija",
        description: "Kako organska poljoprivreda postaje ključ za zdravlje ljudi i planete.",
        duration: 51,
        category: "Održiva poljoprivreda",
        imageUrl: "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=450",
        location: "Pazin",
        screeningDates: ["2025-11-14", "2025-11-15"],
        director: "Maria Gonzalez",
        year: 2023,
        language: "Spanish",
        themes: ["organic farming", "health", "sustainability"],
        createdAt: new Date(),
      },
      {
        id: "15",
        title: "Hidrogenska budućnost",
        description: "Vodik kao čisto gorivo budućnosti - mogućnosti i izazovi energetske tranzicije.",
        duration: 44,
        category: "Zelena tehnologija",
        imageUrl: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=450",
        location: "Rijeka",
        screeningDates: ["2025-11-16"],
        director: "Dr. Yuki Tanaka",
        year: 2024,
        language: "Japanese",
        themes: ["hydrogen", "clean energy", "future fuel"],
        createdAt: new Date(),
      },
      {
        id: "16",
        title: "Šume kao rješenje",
        description: "Uloga šuma u borbi protiv klimatskih promjena i očuvanju biodiverziteta.",
        duration: 55,
        category: "Klimatske promjene",
        imageUrl: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=450",
        location: "Rovinj",
        screeningDates: ["2025-11-04"],
        director: "David Attenborough",
        year: 2024,
        language: "English",
        themes: ["forests", "biodiversity", "carbon capture"],
        createdAt: new Date(),
      },
      {
        id: "17",
        title: "Gradske farme",
        description: "Kako gradovi postaju centar proizvodnje hrane kroz inovativne poljoprivredne tehnike.",
        duration: 47,
        category: "Održiva poljoprivreda",
        imageUrl: "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=450",
        location: "Poreč",
        screeningDates: ["2025-11-05"],
        director: "Lisa Chang",
        year: 2023,
        language: "English",
        themes: ["urban agriculture", "food security", "innovation"],
        createdAt: new Date(),
      },
      {
        id: "18",
        title: "Čista mobilnost",
        description: "Budućnost prijevoza kroz elektrifikaciju i alternativne oblike energije.",
        duration: 43,
        category: "Zelena tehnologija",
        imageUrl: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=450",
        location: "Pula",
        screeningDates: ["2025-11-08"],
        director: "Andreas Mueller",
        year: 2024,
        language: "German",
        themes: ["clean transport", "electric mobility", "sustainability"],
        createdAt: new Date(),
      },
      {
        id: "19",
        title: "Pametni gradovi",
        description: "Kako tehnologija mijenja način funkcioniranja gradova prema održivoj budućnosti.",
        duration: 50,
        category: "Ekološki gradovi",
        imageUrl: "https://images.unsplash.com/photo-1518481612222-68bbe828ecd1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=450",
        location: "Umag",
        screeningDates: ["2025-11-10"],
        director: "Sofia Andersson",
        year: 2024,
        language: "Swedish",
        themes: ["smart cities", "technology", "urban planning"],
        createdAt: new Date(),
      },
      {
        id: "20",
        title: "Plastika bez granica",
        description: "Inovativna rješenja za problem plastičnog otpada kroz ciklknu ekonomiju.",
        duration: 52,
        category: "Ciklička ekonomija",
        imageUrl: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=450",
        location: "Buzet",
        screeningDates: ["2025-11-12"],
        director: "Dr. Emily Watson",
        year: 2024,
        language: "English",
        themes: ["plastic recycling", "circular economy", "waste management"],
        createdAt: new Date(),
      },
      {
        id: "21",
        title: "Geotermalna energija",
        description: "Neiskorišteni potencijal zemlje kao izvora čiste i obnovljive energije.",
        duration: 48,
        category: "Obnovljiva energija",
        imageUrl: "https://images.unsplash.com/photo-1509391366360-2e959784a276?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=450",
        location: "Pazin",
        screeningDates: ["2025-11-13"],
        director: "Magnus Olsen",
        year: 2023,
        language: "Norwegian",
        themes: ["geothermal", "renewable energy", "clean power"],
        createdAt: new Date(),
      },
      {
        id: "22",
        title: "Mladci za klimu",
        description: "Kako mladi aktivisti mijenjaju svijet kroz klimatske akcije i edukaciju.",
        duration: 40,
        category: "Klimatske promjene",
        imageUrl: "https://images.unsplash.com/photo-1582719471384-894fbb16e074?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=450",
        location: "Rijeka",
        screeningDates: ["2025-11-14"],
        director: "Greta Thunberg",
        year: 2024,
        language: "English",
        themes: ["youth activism", "climate action", "education"],
        createdAt: new Date(),
      },
      {
        id: "23",
        title: "Agroekologija",
        description: "Povratak prirodnim metodama uzgoja kao put prema održivoj poljoprivredi.",
        duration: 54,
        category: "Održiva poljoprivreda",
        imageUrl: "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=450",
        location: "Pazin",
        screeningDates: ["2025-11-15"],
        director: "Carlos Mendoza",
        year: 2023,
        language: "Spanish",
        themes: ["agroecology", "sustainable farming", "natural methods"],
        createdAt: new Date(),
      },
      {
        id: "24",
        title: "Kvantna revolucija",
        description: "Kako kvantne tehnologije mogu ubrzati razvoj zelene energetike.",
        duration: 45,
        category: "Zelena tehnologija",
        imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=450",
        location: "Rijeka",
        screeningDates: ["2025-11-15"],
        director: "Dr. Chen Liu",
        year: 2024,
        language: "Chinese",
        themes: ["quantum technology", "green energy", "innovation"],
        createdAt: new Date(),
      },
      {
        id: "25",
        title: "Budućnost je zelena",
        description: "Završni film festivala - vizija svijeta gdje su zeleni poslovi nova realnost.",
        duration: 60,
        category: "Ekološki gradovi",
        imageUrl: "https://images.unsplash.com/photo-1518481612222-68bbe828ecd1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=450",
        location: "Rijeka",
        screeningDates: ["2025-11-16"],
        director: "Festival Team",
        year: 2025,
        language: "Croatian",
        themes: ["green jobs", "future", "sustainability"],
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
