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
    // Initialize with real festival films from JSON data
    const realFilms: Film[] = [
      {
        id: "1",
        title: "Plan Z – Od bijelih kuta do lisica",
        description: "Kada britanska vlada ignorira sve veće dokaze klimatskog sloma, troje britanskih znanstvenika odlučuje preuzeti stvari u svoje ruke. Suočeni s uhićenjem, kaznenim dosjeima i narušavanjem profesionalnog ugleda, okreću se građanskoj neposlušnosti kako bi upozorili javnost. Film prati njihovo putovanje, otkrivajući napetost između znanstvene vjerodostojnosti i aktivizma.",
        duration: 23,
        category: "Ekologija i okoliš",
        imageUrl: "https://images.unsplash.com/photo-1582719471384-894fbb16e074?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=450",
        location: "Rovinj",
        screeningDates: ["2025-11-06", "2025-11-07"],
        director: "Louisa Jones, Vladimir Morozov",
        year: 2024,
        language: "English",
        themes: ["klimatski aktivizam", "znanost", "građanska neposlušnost"],
        createdAt: new Date(),
      },
      {
        id: "2",
        title: "Je li naša budućnost na vodi?",
        description: "Ovaj dokumentarac istražuje inovativna rješenja za borbu protiv porasta razine mora uzrokovanog globalnim zagrijavanjem, s posebnim naglaskom na koncept otpornih plutajućih gradova. Djelo arhitekata, znanstvenika i inženjera, ti vizionarski habitati prilagođavaju se promjenama razine oceana i teže životu u skladu s morskim ekosustavima.",
        duration: 52,
        category: "Ekologija i okoliš",
        imageUrl: "https://images.unsplash.com/photo-1518481612222-68bbe828ecd1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=450",
        location: "Poreč",
        screeningDates: ["2025-11-08", "2025-11-09"],
        director: "Xavier Marquis",
        year: 2024,
        language: "French",
        themes: ["plutajući gradovi", "klimatske promjene", "održivi razvoj"],
        createdAt: new Date(),
      },
      {
        id: "3",
        title: "Znatiželjne djevojke - Žene budućnosti",
        description: "Ovaj dokumentarac prati pet mladih Brazilki – Leticiju Vieira da Silvu, Cellinu Landim, Graziellu Doche, Annu Luisu Beserru i Catarinu Xavier – koje dijele svoje izazove i uspjehe u ostvarivanju karijera u znanosti, tehnologiji, inženjerstvu i matematici (STEM). Osim osobnih postignuća, film je i poziv na djelovanje obiteljima, odgojiteljima i kreatorima politika.",
        duration: 43,
        category: "Prirodne znanosti i tehnologija",
        imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=450",
        location: "Pula",
        screeningDates: ["2025-11-06", "2025-11-07"],
        director: "Déborah A. De Mari",
        year: 2023,
        language: "Portuguese",
        themes: ["STEM", "žene u znanosti", "obrazovanje"],
        createdAt: new Date(),
      },
      {
        id: "4",
        title: "Nema više povijesti bez nas",
        description: "Usred golemog vala greenwashinga, dvojica amazonskih filmaša razotkrivaju duboko ukorijenjenu eksploataciju šume, dugo prikazivane kao beskonačni Rajski vrt. Između Münchena i Beléma, ovaj filmski manifest osporava povijesni narativ koji je opravdavao njezino uništavanje. Film otkriva kako rasizam i predrasude i dalje oblikuju percepciju Amazone.",
        duration: 76,
        category: "Kultura i povijest",
        imageUrl: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=450",
        location: "Rovinj",
        screeningDates: ["2025-11-04", "2025-11-05"],
        director: "Priscilla Regis Brasil",
        year: 2024,
        language: "Portuguese",
        themes: ["Amazon", "greenwashing", "povijesni narativ"],
        createdAt: new Date(),
      },
      {
        id: "5",
        title: "Izvan okvira sustava",
        description: "Promijenimo sustav, a ne klimu - slogan je klimatskog pokreta, no kakav sustav bi ga trebao zamijeniti? Ovaj dokumentarni film istražuje inovativne ekonomske perspektive koje izazivaju tradicionalne modele i pojam ekonomije redefiniraju kao održivo upravljanje resursima. U pozadini svijeta koji troši ograničene prirodne resurse nesmiljenim tempom, film ističe nove ideje i prakse.",
        duration: 60,
        category: "Ekologija i okoliš",
        imageUrl: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=450",
        location: "Poreč",
        screeningDates: ["2025-11-04", "2025-11-05"],
        director: "Cecilia Paulsson, Anders Nilsson",
        year: 2023,
        language: "Swedish",
        themes: ["ekonomski sustav", "održivost", "resursi"],
        createdAt: new Date(),
      },
      {
        id: "6",
        title: "Genova Lab – Predviđanje ekstremnih vremenskih pojava pomoću podataka građana",
        description: "Između Ligurskih planina i Sredozemnog mora, grad Genova suočava se sa sve većim rizicima od ekstremnih oborina i bujičnih poplava, koje dodatno pojačava klimatska promjena. Projekt I-CHANGE okuplja znanstvenike, ekološke edukatore i analitičare podataka kako bi zajedno s građanima prikupljali klimatske podatke i razvijali prediktivne alate.",
        duration: 18,
        category: "Ekologija i okoliš",
        imageUrl: "https://images.unsplash.com/photo-1504711331083-9c895941bf81?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=450",
        location: "Umag",
        screeningDates: ["2025-11-10", "2025-11-11"],
        director: "Caroline Bertram",
        year: 2024,
        language: "German",
        themes: ["klimatski podaci", "građanska znanost", "predviđanje vremena"],
        createdAt: new Date(),
      },
      {
        id: "7",
        title: "Nina i divlje životinje – Podvodno kino za hobotnicu",
        description: "U akvariju u Puli, Hrvatska, hobotnice se proučavaju zbog svojih sposobnosti rješavanja problema. Kako bi ih se potaknulo na aktivnost, pomažu u čišćenju svojih bazena i sudjeluju u vježbama temeljenima na vještinama. Istraživač Wolfgang Slany proučava njihovu inteligenciju postavljanjem sela hobotnica na otoku Krku.",
        duration: 24,
        category: "Obrazovno i zabavno",
        imageUrl: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=450",
        location: "Pula",
        screeningDates: ["2025-11-06", "2025-11-08"],
        director: "Marcella Müller",
        year: 2024,
        language: "German",
        themes: ["hobotnice", "inteligencija životinja", "Hrvatska"],
        createdAt: new Date(),
      },
      {
        id: "8",
        title: "Svijet bez krava",
        description: "Kako bi izgledao svijet bez krava? Ovaj dokumentarni film istražuje duboke veze između goveda i ljudskog života, od američkog srca zemlje do Kenije, Indije i Brazila. Poljoprivrednici, ekolozi i stručnjaci raspravljaju o ulozi goveda u globalnoj proizvodnji hrane, gospodarstvu i tradicijama, istovremeno se osvrćući na njihov utjecaj na klimatske promjene.",
        duration: 84,
        category: "Ekologija i okoliš",
        imageUrl: "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=450",
        location: "Buzet",
        screeningDates: ["2025-11-12", "2025-11-13"],
        director: "Michelle Michael, Brandon Whitworth",
        year: 2024,
        language: "English",
        themes: ["stočarstvo", "klimatske promjene", "poljoprivreda"],
        createdAt: new Date(),
      },
      {
        id: "9",
        title: "Dobrodošli u susjedstvo – Gradska divljina",
        description: "Gradovi sve više postaju utočište za divlje životinje jer okolni poljoprivredni krajolici nude sve manje resursa. Dok selo prekrivaju velike monokulture, privatni vrtovi stvaraju mozaik staništa koja podržavaju ugrožene vrste. Ježevi, pješčani gušteri i veliki vodenjaci nalaze zaklon u hrpama drva, cvjetnim vrtovima i kamenim gomilama.",
        duration: 47,
        category: "Ekologija i okoliš",
        imageUrl: "https://images.unsplash.com/photo-1516205651411-aef33a44f7c2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=450",
        location: "Pazin",
        screeningDates: ["2025-11-13", "2025-11-14"],
        director: "Heiko De Groot",
        year: 2025,
        language: "German",
        themes: ["gradska divljina", "biodiverzitet", "urbanizacija"],
        createdAt: new Date(),
      },
      {
        id: "10",
        title: "Posebni prilozi Atoma Araulla – Plastična republika",
        description: "Na udaljenom otoku u Romblonu na Filipinima, novinar Atom Araullo pridružuje se timu sakupljača kostiju kako bi ekshumirali kita za kojeg se sumnja da je uginuo zbog gutanja plastike. To je već četvrti morski sisavac pronađen na obalama Romblona, uz 30 morskih kornjača nasukanih od 2023. godine – mnoge od njih također žrtve plastičnog onečišćenja.",
        duration: 30,
        category: "Ekologija i okoliš",
        imageUrl: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=450",
        location: "Rijeka",
        screeningDates: ["2025-11-14", "2025-11-15"],
        director: "Atom Araullo",
        year: 2024,
        language: "Filipino",
        themes: ["plastično onečišćenje", "morski život", "Filipini"],
        createdAt: new Date(),
      },
      {
        id: "11",
        title: "Antropocen: Nepobitna istina",
        description: "Ljudske aktivnosti toliko su značajno izmijenile planet da znanstvenici predlažu kako smo ušli u novu geološku epohu: antropocen. Kako bi to potvrdili, tijekom pet godina provedeno je opsežno znanstveno istraživanje u kojem su sudjelovali istraživački timovi iz cijeloga svijeta. Ovaj dokumentarni film prati njihove napore u prikupljanju dokaza.",
        duration: 55,
        category: "Prirodne znanosti i tehnologija",
        imageUrl: "https://images.unsplash.com/photo-1582719471384-894fbb16e074?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=450",
        location: "Rijeka",
        screeningDates: ["2025-11-15", "2025-11-16"],
        director: "Colin Waters",
        year: 2024,
        language: "English",
        themes: ["antropocen", "geologija", "ljudski utjecaj"],
        createdAt: new Date(),
      },
      {
        id: "12",
        title: "Dobrodošli u Fulldome",
        description: "Ovaj dokumentarac istražuje razvoj sferičnih projekcija, prateći njihove početke u planetarijima do suvremenih tehnoloških i estetskih dostignuća. Naglašava značaj ovog uranjajućeg medija, pokazujući njegov utjecaj na vizualno pripovijedanje i znanstveno obrazovanje. Mapirajući razvoj sferičnih projekcija, film razmatra njihov potencijal kao alat za inovaciju i kreativno izražavanje.",
        duration: 35,
        category: "Prirodne znanosti i tehnologija",
        imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=450",
        location: "Umag",
        screeningDates: ["2025-11-11", "2025-11-12"],
        director: "James Wyatt",
        year: 2024,
        language: "English",
        themes: ["fulldome", "planetarij", "vizualna tehnologija"],
        createdAt: new Date(),
      },
      {
        id: "13",
        title: "Zaštiti i očuvaj",
        description: "Ovaj kratki dokumentarni film istražuje ključne napore za zaštitu ugroženog morskog života uz obalu Zavore u Mozambiku. Prikazujući rad Zaklade za morsku megafaunu, donosi zadivljujuće podvodne prizore i dirljive priče o očuvanju, s naglaskom na vrste poput manta raža i grbavih kitova, ugroženih ljudskim djelovanjem i klimatskim promjenama.",
        duration: 28,
        category: "Ekologija i okoliš",
        imageUrl: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=450",
        location: "Rovinj",
        screeningDates: ["2025-11-03", "2025-11-04"],
        director: "Simon Pierce",
        year: 2024,
        language: "English",
        themes: ["morska megafauna", "konzervacija", "Mozambik"],
        createdAt: new Date(),
      },
      {
        id: "14",
        title: "Titli – Leptiri",
        description: "Zabilježiti preobrazbu gusjenice u leptira ispituje strpljenje i izdržljivost autora filmova o prirodi. Kako dani prolaze, proces se odvija otkrivajući ljepotu prilagodbe i evolucije unutar jednog životnog vijeka. Ovaj film, koji je stvorila Akanksha Sood Singh, jedna od vodećih indijskih autorica filmova o prirodoslovlju, povezuje znanstveno znanje s javnim razumijevanjem.",
        duration: 22,
        category: "Obrazovno i zabavno",
        imageUrl: "https://images.unsplash.com/photo-1516205651411-aef33a44f7c2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=450",
        location: "Buzet",
        screeningDates: ["2025-11-12", "2025-11-13"],
        director: "Akanksha Sood Singh",
        year: 2024,
        language: "Hindi",
        themes: ["leptiri", "metamorfoza", "prirodoslovlje"],
        createdAt: new Date(),
      },
      {
        id: "15",
        title: "Te Moana Ora – Živi ocean",
        description: "Ekspedicija na podmorski greben Salas i Gómez okuplja umjetnike, znanstvenike i istraživače u otkrivanju jedinstvenog podvodnog ekosustava. Rapanui umjetnica i edukatorica Sera Moulton pridružuje se timu na brodu ROV SuBastian, otkrivajući bioraznolikost ovoga neistraženog morskog svijeta. Projekt, u suradnji sa Schmidt Ocean Institute i ESMOI, ističe kulturni i ekološki značaj Rapa Nuija.",
        duration: 42,
        category: "Ekologija i okoliš",
        imageUrl: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=450",
        location: "Pula",
        screeningDates: ["2025-11-07", "2025-11-08"],
        director: "Sera Moulton",
        year: 2024,
        language: "English",
        themes: ["ocean ekspedicija", "Rapa Nui", "bioraznolikost"],
        createdAt: new Date(),
      },
      {
        id: "16",
        title: "Banda: Odiseja na zaboravljene",
        description: "Philippe, stručnjak za okoliš, i Laura, oceanografkinja, kreću u istraživanje Banda mora, udaljenog područja na rubovima Indonezije. Ovo prostrano područje dom je brojnih netaknutih otoka i nekih od najbogatijih koraljnih grebena na svijetu. Njihovo putovanje otkriva iznenađujuće uvide u ovaj iznimni ekosustav i dovodi ih u kontakt s Bajauima, posljednjim nomadskim ribarima u regiji.",
        duration: 85,
        category: "Ekologija i okoliš",
        imageUrl: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=450",
        location: "Rijeka",
        screeningDates: ["2025-11-16"],
        director: "Philippe Goyens, Laura García",
        year: 2024,
        language: "French",
        themes: ["Banda more", "koraljni grebeni", "Bajaui nomadi"],
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

    realFilms.forEach(film => this.films.set(film.id, film));
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
