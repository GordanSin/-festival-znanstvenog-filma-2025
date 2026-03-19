# Festival Znanstvenog Filma 2025

Web aplikacija za Festival znanstvenog filma 2025 — prikazuje filmove, raspored projekcija i lokacije festivala kroz Istru i Kvarner.

## Tech Stack

- **Frontend:** React 18, TypeScript, Vite, Tailwind CSS, Radix UI, React Query
- **Backend:** Express.js, TypeScript, Drizzle ORM
- **Baza:** PostgreSQL (Neon serverless)
- **Deploy:** Replit

## Lokalni razvoj

### Preduvjeti

- Node.js 20+
- PostgreSQL baza (ili Neon account)

### Setup

```bash
# Instaliraj dependencies
npm install

# Postavi environment varijable
cp .env.example .env
# Uredi .env i dodaj DATABASE_URL

# Pokreni migracije
npm run db:push

# Pokreni dev server
npm run dev
```

Aplikacija je dostupna na `http://localhost:5000`.

### Environment varijable

| Varijabla | Opis | Obavezno |
|-----------|------|----------|
| `DATABASE_URL` | PostgreSQL connection string | Da |
| `PORT` | Server port (default: 5000) | Ne |

### Skripte

| Komanda | Opis |
|---------|------|
| `npm run dev` | Pokreni dev server s HMR |
| `npm run build` | Build za produkciju |
| `npm start` | Pokreni produkcijski server |
| `npm run check` | TypeScript type check |
| `npm run db:push` | Pokreni Drizzle migracije |

## Struktura projekta

```
client/             # React frontend
  src/
    components/     # UI komponente (hero, carousel, schedule, locations...)
    contexts/       # React konteksti (jezik)
    data/           # Statički podaci festivala
    hooks/          # Custom React hookovi
    lib/            # Utility funkcije, React Query config
    pages/          # Stranice (home, film-detail)
server/             # Express backend
  routes.ts         # API endpointi
  storage.ts        # Database CRUD operacije
  db.ts             # PostgreSQL konekcija
shared/             # Dijeljeni tipovi i sheme
  schema.ts         # Drizzle ORM schema + Zod validacija
scripts/            # Utility skripte (import, seed)
public/             # Statički asseti (PDF-ovi, slike)
```

## API Endpointi

| Metoda | Route | Opis | Query parametri |
|--------|-------|------|-----------------|
| GET | `/api/films` | Dohvati filmove | `search`, `category`, `limit`, `offset` |
| GET | `/api/films/:id` | Dohvati film po ID-u | - |
| GET | `/api/locations` | Dohvati lokacije | - |
| GET | `/api/locations/:id` | Dohvati lokaciju po ID-u | - |
| GET | `/api/schedule` | Dohvati raspored | `week` |

## Deploy

Aplikacija je konfigurirana za deploy na Replit. Build i start komande su definirane u `package.json`.

## Jezici

Aplikacija podržava tri jezika:
- Hrvatski (default)
- English
- Italiano
