export interface ProgramEvent {
  time: string;
  title: string;
  titleIt?: string;
  director?: string;
  country?: string;
  duration?: string;
  audience?: string;
  description?: string;
  descriptionIt?: string;
  venue?: string;
  speaker?: string;
  type?: "conference";
}

export type LocationProgram = Record<string, ProgramEvent[]>;

export interface StaticLocation {
  id: string;
  name: string;
  description: string;
  imageKey: string;
  filmCount: number;
  dates: string[];
  program: LocationProgram;
}

export const umagProgram: LocationProgram = {
  "6.11.2025": [
    { time: "12:30", title: "Dobrodošli u susjedstvo", titleIt: "Benvenuti nel vicinato", director: "Heiko De Groot", country: "Austria", duration: "47 min", audience: "učenici srednje škole / studenti delle scuole superiori" }
  ],
  "13.11.2025": [
    { time: "12:30", title: "Nina i hobotnice", titleIt: "Nina e i polpi", director: "Marcella Muller", country: "Njemačka / Germania", duration: "25 min", audience: "učenici osnovne škole / alunni delle scuole elementari" }
  ],
  "14.11.2025": [
    { time: "12:30", title: "Nina i hobotnice", titleIt: "Nina e i polpi", director: "Marcella Muller", country: "Njemačka / Germania", duration: "25 min", audience: "učenici osnovne škole / alunni delle scuole elementari" }
  ]
};

export const buzetProgram: LocationProgram = {
  "03.11.2025": [
    { time: "13:30", title: "Izvan okvira sustava", director: "Cecilia Paulsson", country: "Švedska", duration: "60 min" }
  ],
  "04.11.2025": [
    { time: "11:00", title: "Svijet bez krava", director: "Michelle Michael, Brandon Whitworth", country: "USA", duration: "84 min" }
  ],
  "05.11.2025": [
    { time: "12:40", title: "Tajna majki iz prapovijesti", director: "Anja Krug-Metzinger", country: "Njemačka", duration: "52 min" },
    { time: "18:00", title: "Plan Z", director: "Louisa Jones, Vladimir Morozov", country: "UK", duration: "23 min" },
    { time: "18:00", title: "Znatiželjnje djevojke – žene budućnosti", director: "Déborah A. De Mari", country: "Brazil", duration: "43 min" }
  ],
  "07.11.2025": [
    { time: "08:00", title: "Genova Lab", director: "Caroline Bertram", country: "Njemačka", duration: "19 min" }
  ],
  "10.11.2025": [
    { time: "09:40", title: "Znatiželjnje djevojke – žene budućnosti", director: "Déborah A. De Mari", country: "Brazil", duration: "43 min" },
    { time: "11:50", title: "Izvan okvira sustava", director: "Cecilia Paulsson", country: "Švedska", duration: "60 min" },
    { time: "18:00", title: "Je li naša budućnost na vodi", director: "Xavier Marquis", country: "Franscuska", duration: "52 min" },
    { time: "18:00", title: "Genova Lab", director: "Caroline Bertram", country: "Njemačka", duration: "19 min" }
  ],
  "12.11.2025": [
    { time: "11:50", title: "Plastična republika", director: "Aaron Mendoza", country: "Filipini", duration: "47 min" },
    { time: "18:00", title: "Dobrodošli u susjedstvo", director: "Heiko De Groot", country: "Austrija", duration: "47 min" },
    { time: "18:00", title: "Genova Lab", director: "Caroline Bertram", country: "Njemačka", duration: "19 min" }
  ]
};

export const rovinjProgram: LocationProgram = {
  "4.11.2025": [
    { time: "18:00", type: "conference", title: "Pametni gradovi, pametni planet", titleIt: "Città intelligenti, pianeta intelligente", speaker: "Goran Zaharija, dr.sc. PMF Split", venue: "kino Antonio Gandusio" },
    { time: "18:30", title: "Genova Lab", director: "Caroline Betram", country: "Njemačka / Germania", duration: "20 min", description: "Predviđanje ekstremnih vremenskih pojava pomoću podataka građana", descriptionIt: "Previsione di eventi meteorologici estremi mediante i dati dei cittadini", venue: "kino Antonio Gandusio" },
    { time: "19:00", title: "Filmsko druženje", titleIt: "Serata di cinema", venue: "kino Antonio Gandusio" }
  ],
  "5.11.2025": [
    { time: "9:30", title: "Nina i hobotnice / Nina e i polpi", director: "Marcella Muller", country: "Njemačka / Germania", duration: "25 min", audience: "učenici osnovnih škola / alunni delle scuole elementari" },
    { time: "9:30", title: "Umjetnost promatranja", director: "Andris Gauja", country: "Estonia", duration: "17 min", audience: "učenici osnovnih škola / alunni delle scuole elementari" },
    { time: "11:00", title: "Dobrodošli u fulldome / Benvenuti nel fulldome", director: "Jonáš Jirovský", country: "Češka / Repubblica Ceca", duration: "38 min", audience: "učenici osnovnih škola / alunni delle scuole elementari" },
    { time: "12:30", title: "Titli leptiri / Titli farfalle", director: "Akanksha Sood Singh", country: "India", duration: "37 min", audience: "učenici osnovnih škola / alunni delle scuole elementari" },
    { time: "18:30", title: "Je li naša budućnost na vodi? / Il nostro futuro è sull'acqua?", director: "Xavier Marquis", country: "France", duration: "52 min", venue: "prizemlje kino Gandusio - piano terra del teatro Gandusio" }
  ],
  "6.11.2025": [
    { time: "9:30", title: "Znatiželjnje djevojke – žene budućnosti", titleIt: "Ragazze curiose – donne del futuro", director: "Déborah A. De Mari", country: "Brazil", duration: "43 min", audience: "učenici srednjih škola / studenti delle scuole superiori" },
    { time: "11:00", title: "Plan Z - od bijelih kuta do lisica", titleIt: "Piano Z – dai camici bianchi alle manette", director: "Louisa Jones, Vladimir Morozov", country: "Velika Britanija / Regno Unito", duration: "23 min", audience: "učenici srednjih škola / studenti delle scuole superiori" },
    { time: "11:00", title: "Naši korijeni ostaju / Le nostre radici restano", director: "Ivonna Serna, Selim Benzeghia", country: "Mexico", duration: "18 min", audience: "učenici srednjih škola / studenti delle scuole superiori" },
    { time: "12:30", title: "Znatiželjnje djevojke – žene budućnosti", titleIt: "Ragazze curiose – donne del futuro", director: "Déborah A. De Mari", country: "Brazil", duration: "43 min", audience: "učenici srednjih škola / studenti delle scuole superiori" },
    { time: "18:30", title: "Izvan okvira sustava / Fuori dal sistema", director: "Cecilia Paulsson, Anders Nilsson", country: "Švedska / Svezia", duration: "60 min", venue: "prizemlje kino Gandusio - piano terra del teatro Gandusio" }
  ],
  "7.11.2025": [
    { time: "9:30", title: "Znatiželjnje djevojke – žene budućnosti", titleIt: "Ragazze curiose – donne del futuro", director: "Déborah A. De Mari", country: "Brazil", duration: "43 min", audience: "učenici srednjih škola / studenti delle scuole superiori" },
    { time: "11:00", title: "Dobrodošli u fulldome / Benvenuti nel fulldome", director: "Jonáš Jirovský", country: "Češka / Repubblica Ceca", duration: "38 min", audience: "učenici srednjih škola / studenti delle scuole superiori" },
    { time: "12:30", title: "Posebni prilozi Atoma Araulla – Plastična Republika", titleIt: "Contributi speciali di Atom Araulla – La Repubblica di Plastica", director: "Aaron Mendoza", country: "Philipini", duration: "47 min", audience: "učenici srednjih škola / studenti delle scuole superiori" },
    { time: "18:30", title: "Tajna majki iz prapovijesti", titleIt: "Il segreto delle madri della preistoria", director: "Anja Krug-Metzinger", country: "Njemačka / Germania", duration: "60 min", venue: "prizemlje kino Gandusio - piano terra del teatro Gandusio" }
  ]
};

export const pazinProgram: LocationProgram = {
  "10.11.2025": [
    { time: "12:00", title: "Znatiželjnje djevojke – žene budućnosti", titleIt: "Ragazze curiose – donne del futuro", director: "Déborah A. De Mari", country: "Brazil", duration: "43 min" }
  ],
  "12.11.2025": [
    { time: "17:00", title: "Nina i hobotnice", titleIt: "Nina e i polpi", director: "Marcella Muller", country: "Njemačka / Germania", duration: "25 min" },
    { time: "17:00", title: "Titli leptiri", titleIt: "Titli farfalle", director: "Akanksha Sood Singh", country: "India", duration: "37 min" }
  ]
};

export const pulaProgram: LocationProgram = {
  "01.11.2025": [
    { time: "19:00", title: "Svijet bez krava", director: "Michelle Michael, Brandon Whitworth", country: "USA", duration: "83 min", venue: "Zvjezdarnica Pula (ZTK Pula)" }
  ],
  "02.11.2025": [
    { time: "19:00", title: "Plan Z - od bijelih kuta do lisica", titleIt: "Piano Z – dai camici bianchi alle manette", director: "Louisa Jones, Vladimir Morozov", country: "Velika Britanija / Regno Unito", duration: "23 min", venue: "Zvjezdarnica Pula (ZTK Pula)" },
    { time: "19:00", title: "Dobrodošli u fulldome", titleIt: "Benvenuti nel fulldome", director: "Jonáš Jirovský", country: "Češka / Repubblica Ceca", duration: "38 min", venue: "Zvjezdarnica Pula (ZTK Pula)" }
  ],
  "03.11.2025": [
    { time: "13:30", title: "Nina i hobotnice", titleIt: "Nina e i polpi", director: "Marcella Muller", country: "Njemačka / Germania", duration: "25 min", venue: "ZTK IŽ (Velika dvorana) Pula" }
  ],
  "05.11.2025": [
    { time: "13:30", title: "Znatiželjnje djevojke – žene budućnosti", titleIt: "Ragazze curiose – donne del futuro", director: "Déborah A. De Mari", country: "Brazil", duration: "43 min", venue: "ZTK IŽ (Velika dvorana) Pula" },
    { time: "19:00", title: "Nema više povijesti bez nas", titleIt: "Non c'è più storia senza di noi", director: "Priscilla Regis Brasil", country: "Brasil", duration: "76 min", venue: "Zvjezdarnica Pula (ZTK Pula)" }
  ],
  "10.11.2025": [
    { time: "19:00", title: "Znatiželjnje djevojke – žene budućnosti", titleIt: "Ragazze curiose – donne del futuro", director: "Déborah A. De Mari", country: "Brazil", duration: "43 min", venue: "Zvjezdarnica Pula (ZTK Pula)" },
    { time: "19:00", title: "Genoa Lab", director: "Caroline Bertram", country: "Njemačka / Germania", duration: "19 min", venue: "Zvjezdarnica Pula (ZTK Pula)" }
  ],
  "11.11.2025": [
    { time: "19:00", title: "Plastična republika", titleIt: "Repubblica di plastica", director: "Aaron Mendoza", country: "Filipini", duration: "47 min", venue: "SŠ Mate Blažine Labin" },
    { time: "19:00", title: "Umjetnost promatranja", titleIt: "L'arte dell'osservazione", director: "Andris Gauja", country: "Estonia", duration: "17 min", venue: "SŠ Mate Blažine Labin" }
  ]
};

export const porecProgram: LocationProgram = {
  "12.11.2025": [
    { time: "12:30", title: "Titli leptiri", titleIt: "Titli farfalle", director: "Akanksha Sood Singh", country: "India", duration: "37 min" }
  ],
  "13.11.2025": [
    { time: "09:30", title: "Plastično fantastično", titleIt: "Plastico fantastico", director: "Isa Willinger", country: "Njemačka / Germania", duration: "90 min" },
    { time: "11:00", title: "Je li naša budućnost na vodi?", titleIt: "Il nostro futuro è sull'acqua?", director: "Xavier Marquis", country: "France", duration: "52 min" }
  ]
};

export const rijekaProgram: LocationProgram = {
  "11.11.2025": [
    { time: "08:00", title: "Banda: Odiseja na zaboravljene otoke Indonezije", venue: "Prva hrvatska riječka gimnazija, Ulica Frana Kurelca 1, Rijeka" },
    { time: "11:20", title: "Umjetnost promatranja", venue: "Prva hrvatska riječka gimnazija, Ulica Frana Kurelca 1, Rijeka" },
    { time: "13:00", title: "Nema više povijesti bez nas", venue: "Prva hrvatska riječka gimnazija, Ulica Frana Kurelca 1, Rijeka" },
    { time: "13:30", title: "Plan Z – od bijelih kuta do lisica", venue: "Fakultet za menadžment u turizmu i ugostiteljstvu Opatija" },
    { time: "14:00", title: "Genova Lab", venue: "Fakultet za menadžment u turizmu i ugostiteljstvu Opatija" }
  ],
  "12.11.2025": [
    { time: "08:00", title: "Plan Z – od bijelih kuta do lisica", venue: "CTK Rijeka, Školjić 6, Rijeka" },
    { time: "08:50", title: "Naši korijeni ostaju", venue: "Prva hrvatska riječka gimnazija, Ulica Frana Kurelca 1, Rijeka" },
    { time: "09:40", title: "Tajna majki iz prapovijesti", venue: "Prva hrvatska riječka gimnazija, Ulica Frana Kurelca 1, Rijeka" },
    { time: "09:40", title: "Dobrodošli u susjedstvo - gradska divljina", venue: "Prva hrvatska riječka gimnazija, Ulica Frana Kurelca 1, Rijeka" },
    { time: "11:20", title: "Plan Z - od bijelih kuta do lisica", venue: "Prva hrvatska riječka gimnazija, Ulica Frana Kurelca 1, Rijeka" },
    { time: "11:30", title: "Izvan okvira sustava", venue: "Prva hrvatska riječka gimnazija, Ulica Frana Kurelca 1, Rijeka" }
  ],
  "13.11.2025": [
    { time: "08:50", title: "GENOVA LAB", venue: "Prva hrvatska riječka gimnazija, Ulica Frana Kurelca 1, Rijeka" },
    { time: "08:50", title: "Posebni prilozi Atoma Arauolla", venue: "Prva hrvatska riječka gimnazija, Ulica Frana Kurelca 1, Rijeka" },
    { time: "09:40", title: "Izvan okvira sustava", venue: "Prometna škola Rijeka, Ulica Jože Vlahovića 10, Rijeka" },
    { time: "10:30", title: "Antropocen: nepobitna istina", venue: "Prva hrvatska riječka gimnazija, Ulica Frana Kurelca 1, Rijeka" }
  ],
  "14.11.2025": [
    { time: "08:00", title: "Svijet bez krava", venue: "Prva hrvatska riječka gimnazija, Ulica Frana Kurelca 1, Rijeka" },
    { time: "08:50", title: "Je li budućnost na vodi?", venue: "Prva hrvatska sušačka gimnazija, Ulica Ljudevita Gaja 1, Rijeka" },
    { time: "12:10", title: "Znatiželjne djevojke žene budućnosti", venue: "Prva hrvatska riječka gimnazija, Ulica Frana Kurelca 1, Rijeka" },
    { time: "13:00", title: "Naša budućnost na vodi", venue: "CTK Rijeka, Školjić 6, Rijeka" }
  ]
};

export const staticLocations: StaticLocation[] = [
  { id: "3", name: "Pula-Pola", description: "Zajednica tehničke kulture Istarske županije", imageKey: "pula", filmCount: 7, dates: ["1., 2., 3., 5., 10., 11. studenog 2025"], program: pulaProgram },
  { id: "4", name: "Umag-Umago", description: "Ustanova za protokol, odnose s javnošću i manifestacije FESTUM", imageKey: "umag", filmCount: 4, dates: ["6., 13., 14. studenog 2025"], program: umagProgram },
  { id: "5", name: "Buzet", description: "Pučko otvoreno učilište Augustin Vivoda", imageKey: "buzet", filmCount: 13, dates: ["3., 4., 5., 7., 10., 12. studenog 2025"], program: buzetProgram },
  { id: "6", name: "Pazin", description: "Centar za kulturu i obrazovanje", imageKey: "pazin", filmCount: 3, dates: ["10., 12. studenog 2025"], program: pazinProgram },
  { id: "7", name: "Rijeka", description: "Centar tehničke kulture", imageKey: "rijeka", filmCount: 19, dates: ["11., 12., 13., 14. studenog 2025"], program: rijekaProgram },
  { id: "8", name: "Poreč-Parenzo", description: "Pučko otvoreno učilište", imageKey: "porec", filmCount: 3, dates: ["12., 13. studenog 2025"], program: porecProgram },
  { id: "9", name: "Rovinj-Rovigno", description: "Pučko otvoreno učilište-Universita popolare aperta", imageKey: "rovinj", filmCount: 6, dates: ["4.-7. studenog 2025"], program: rovinjProgram },
];
