import { createContext, useContext, useState, useEffect } from "react";

type Language = "hr" | "en" | "it";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem("festival-language");
    return (saved as Language) || "hr";
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("festival-language", lang);
  };

  const t = (key: string): string => {
    const keys = key.split(".");
    let value: any = translations[language];
    
    for (const k of keys) {
      if (value && typeof value === "object") {
        value = value[k];
      } else {
        return key;
      }
    }
    
    return typeof value === "string" ? value : key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return context;
}

const translations = {
  hr: {
    hero: {
      subtitle: "Ekologija i zeleni poslovi budućnosti",
      dates: "Studeni 2025",
      location: "Istra & Rijeka",
      viewProgram: "Pogledaj program",
      learnMore: "Saznaj više",
      stats: {
        films: "Film",
        cities: "Gradova",
        days: "Dana",
        entrance: "Ulaz",
        free: "BEPLATAN"
      }
    },
    films: {
      title: "Filmski program",
      description: "Otkrij 20 vrhunskih znanstvenih dokumentarnih filmova koji istražuju teme održivog razvoja, zelene energije i ekologije",
      learnMore: "Opširnije"
    },
    locations: {
      title: "Lokacije festivala",
      description: "Festival će se održavati u šest prekrasnih istarskih gradova i Rijeci, povezujući kulturu i znanost kroz cijelu regiju",
      program: "Program"
    },
    schedule: {
      title: "Raspored festivala",
      description: "Festival će se održavati kroz dva tjedna u studenome 2025. u šest istarskih gradova i Rijeci",
      openingCeremony: "Svečano otvaranje festivala",
      note: "* detaljan program, clik na Grad",
      events: {
        lecture: "Predavanje: Pametni gradovi, pametni planet",
        lecturerDetails: "Predavač: Goran Zaharija, dr.sc. PMF Split",
        filmProjection: "Projekcija filma: Genova Lab",
        filmDescription: "Predviđanje ekstremnih vremenskih pojava pomoću podataka građana",
        filmGathering: "Filmsko druženje",
        schoolPrimary: "Školske projekcije - osnovna škola",
        schoolSecondary: "Školske projekcije - srednja škola",
        citizens: "Građanke i građani"
      }
    },
    about: {
      title: "O festivalu",
      description: "Festival znanstvenog filma ujedinjuje zajednicu u istraživanju teme održivog razvoja, zelenih tehnologija i ekoloških rješenja za budućnost",
      themeTitle: "Tema festivala",
      themeSubtitle: "Zeleni poslovi budućnosti",
      themeDescription: "Ovogodišnji festival fokusira se na nove zelene profesije koje oblikuju održivu budućnost. Kroz dokumentarne filmove i predavanja, istražujemo kako zelena ekonomija stvara nova radna mjesta i transformira industrije."
    },
    jury: {
      title: "Žiri festivala",
      description: "Naš međunarodni žiri čine renomirani stručnjaci iz područja filma, znanosti i održivog razvoja"
    },
    contact: {
      title: "Kontakt",
      description: "Imate pitanja? Kontaktirajte nas",
      director: "Gordan Sinđić, prof.",
      directorTitle: "Direktor festivala",
      organizers: "Organizatori",
      supporters: "Podržavaju"
    },
    sponsors: {
      title: "Partneri i organizatori"
    },
    footer: {
      quickLinks: "Brze poveznice",
      program: "Program",
      locations: "Lokacije",
      schedule: "Raspored",
      about: "O festivalu",
      contact: "Kontakt",
      followUs: "Pratite nas",
      copyright: "Festival znanstvenog filma. Sva prava pridržana.",
      privacy: "Privatnost",
      terms: "Uvjeti korištenja"
    }
  },
  en: {
    hero: {
      subtitle: "Ecology and green jobs of the future",
      dates: "November 2025",
      location: "Istria & Rijeka",
      viewProgram: "View Program",
      learnMore: "Learn More",
      stats: {
        films: "Films",
        cities: "Cities",
        days: "Days",
        entrance: "Entrance",
        free: "FREE"
      }
    },
    films: {
      title: "Film Program",
      description: "Discover 20 excellent scientific documentary films exploring topics of sustainable development, green energy and ecology",
      learnMore: "Learn More"
    },
    locations: {
      title: "Festival Locations",
      description: "The festival will take place in six beautiful Istrian cities and Rijeka, connecting culture and science throughout the region",
      program: "Program"
    },
    schedule: {
      title: "Festival Schedule",
      description: "The festival will take place over two weeks in November 2025 in six Istrian cities and Rijeka",
      openingCeremony: "Festival Opening Ceremony",
      note: "* detailed program, click on City",
      events: {
        lecture: "Lecture: Smart Cities, Smart Planet",
        lecturerDetails: "Lecturer: Goran Zaharija, PhD PMF Split",
        filmProjection: "Film Screening: Genova Lab",
        filmDescription: "Predicting extreme weather events using citizen data",
        filmGathering: "Film Gathering",
        schoolPrimary: "School screenings - primary school",
        schoolSecondary: "School screenings - secondary school",
        citizens: "Citizens"
      }
    },
    about: {
      title: "About the Festival",
      description: "The Science Film Festival brings the community together to explore sustainable development, green technologies and ecological solutions for the future",
      themeTitle: "Festival Theme",
      themeSubtitle: "Green Jobs of the Future",
      themeDescription: "This year's festival focuses on new green professions shaping a sustainable future. Through documentaries and lectures, we explore how the green economy creates new jobs and transforms industries."
    },
    jury: {
      title: "Festival Jury",
      description: "Our international jury consists of renowned experts in film, science and sustainable development"
    },
    contact: {
      title: "Contact",
      description: "Have questions? Contact us",
      director: "Gordan Sinđić, Prof.",
      directorTitle: "Festival Director",
      organizers: "Organizers",
      supporters: "Supporters"
    },
    sponsors: {
      title: "Partners and Organizers"
    },
    footer: {
      quickLinks: "Quick Links",
      program: "Program",
      locations: "Locations",
      schedule: "Schedule",
      about: "About",
      contact: "Contact",
      followUs: "Follow Us",
      copyright: "Science Film Festival. All rights reserved.",
      privacy: "Privacy",
      terms: "Terms of Use"
    }
  },
  it: {
    hero: {
      subtitle: "Ecologia e lavori verdi del futuro",
      dates: "Novembre 2025",
      location: "Istria e Rijeka",
      viewProgram: "Vedi Programma",
      learnMore: "Scopri di più",
      stats: {
        films: "Film",
        cities: "Città",
        days: "Giorni",
        entrance: "Ingresso",
        free: "GRATUITO"
      }
    },
    films: {
      title: "Programma Cinematografico",
      description: "Scopri 20 eccellenti documentari scientifici che esplorano temi di sviluppo sostenibile, energia verde ed ecologia",
      learnMore: "Scopri di più"
    },
    locations: {
      title: "Località del Festival",
      description: "Il festival si svolgerà in sei bellissime città istriane e Rijeka, collegando cultura e scienza in tutta la regione",
      program: "Programma"
    },
    schedule: {
      title: "Programma del Festival",
      description: "Il festival si svolgerà in due settimane a novembre 2025 in sei città istriane e Rijeka",
      openingCeremony: "Cerimonia di Apertura del Festival",
      note: "* programma dettagliato, clicca sulla Città",
      events: {
        lecture: "Conferenza: Città Intelligenti, Pianeta Intelligente",
        lecturerDetails: "Relatore: Goran Zaharija, PhD PMF Split",
        filmProjection: "Proiezione Film: Genova Lab",
        filmDescription: "Prevedere eventi meteorologici estremi utilizzando i dati dei cittadini",
        filmGathering: "Incontro Cinematografico",
        schoolPrimary: "Proiezioni scolastiche - scuola primaria",
        schoolSecondary: "Proiezioni scolastiche - scuola secondaria",
        citizens: "Cittadini"
      }
    },
    about: {
      title: "Sul Festival",
      description: "Il Festival del Cinema Scientifico riunisce la comunità per esplorare lo sviluppo sostenibile, le tecnologie verdi e le soluzioni ecologiche per il futuro",
      themeTitle: "Tema del Festival",
      themeSubtitle: "Lavori Verdi del Futuro",
      themeDescription: "Il festival di quest'anno si concentra sulle nuove professioni verdi che plasmano un futuro sostenibile. Attraverso documentari e conferenze, esploriamo come l'economia verde crea nuovi posti di lavoro e trasforma le industrie."
    },
    jury: {
      title: "Giuria del Festival",
      description: "La nostra giuria internazionale è composta da esperti rinomati nel campo del cinema, della scienza e dello sviluppo sostenibile"
    },
    contact: {
      title: "Contatto",
      description: "Hai domande? Contattaci",
      director: "Gordan Sinđić, Prof.",
      directorTitle: "Direttore del Festival",
      organizers: "Organizzatori",
      supporters: "Sostenitori"
    },
    sponsors: {
      title: "Partner e Organizzatori"
    },
    footer: {
      quickLinks: "Link Rapidi",
      program: "Programma",
      locations: "Località",
      schedule: "Programma",
      about: "Informazioni",
      contact: "Contatto",
      followUs: "Seguici",
      copyright: "Festival del Cinema Scientifico. Tutti i diritti riservati.",
      privacy: "Privacy",
      terms: "Termini di Utilizzo"
    }
  }
};
