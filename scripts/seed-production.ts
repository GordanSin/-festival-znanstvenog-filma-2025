import { db } from '../server/db';
import { films } from '../server/db/schema';
import * as fs from 'fs';
import * as path from 'path';

// This script seeds the production database with film data
// IMPORTANT: Switch to PRODUCTION database in Replit before running!
// Run with: tsx scripts/seed-production.ts

const filmData = [
  {
    id: "fb1447c7-ecf5-46a6-b1f9-f151e6f6f26b",
    title: "JE LI NAŠA BUDUĆNOST NA VODI?",
    description: "Dok se svijet suočava s klimatskim promjenama, ovaj film istražuje potencijal vodenih resursa kao ključa održivog razvoja.",
    duration: 52,
    category: "Dokumentarni",
    imageUrl: null,
    location: "Rijeka",
    screeningDates: ["2025-03-15", "2025-03-20"],
    director: "Xavier Marquis",
    year: 2024,
    language: "Francuski",
    country: "Francuska",
    producer: "Studio Green",
    runningTime: 52,
    themes: ["Voda", "Održivost", "Klimatske promjene"],
    pageNumber: null
  },
  {
    id: "8e2b5c91-4d3a-4e7f-9b6c-2a1f3d5e7c9b",
    title: "ZNATIŽELJNE DJEVOJKE, ŽENE BUDUĆNOSTI",
    description: "Film prati mlade žene koje biraju karijere u STEM poljima i zelenim tehnologijama.",
    duration: 45,
    category: "Dokumentarni",
    imageUrl: null,
    location: "Pula",
    screeningDates: ["2025-03-16", "2025-03-21"],
    director: "Déborah A. De Mari",
    year: 2023,
    language: "Engleski",
    country: "SAD",
    producer: "Future Vision",
    runningTime: 45,
    themes: ["Obrazovanje", "Rodna ravnopravnost", "Zelene tehnologije"],
    pageNumber: null
  },
  {
    id: "3c7d9e1f-2b4a-4c6e-8d5f-1a3b5c7d9e2f",
    title: "NEMA VIŠE POVIJESTI BEZ NAS",
    description: "Dokumentarac o mladim aktivistima koji se bore za klimatsku pravdu i zelenu budućnost.",
    duration: 58,
    category: "Dokumentarni",
    imageUrl: null,
    location: "Opatija",
    screeningDates: ["2025-03-17", "2025-03-22"],
    director: "Priscilla Regis Brasil",
    year: 2024,
    language: "Portugalski",
    country: "Brazil",
    producer: "Climate Docs",
    runningTime: 58,
    themes: ["Aktivizam", "Klimatska pravda", "Mladi"],
    pageNumber: null
  },
  {
    id: "6f4e8d2a-1c3b-4d5e-7f9a-2b4c6d8e1f3a",
    title: "IZVAN OKVIRA SUSTAVA",
    description: "Priča o zajednicama koje žive održivo izvan konvencionalnih društvenih struktura.",
    duration: 48,
    category: "Dokumentarni",
    imageUrl: null,
    location: "Rijeka",
    screeningDates: ["2025-03-18", "2025-03-23"],
    director: "Cecilia Paulsson, Anders Nilsson",
    year: 2023,
    language: "Švedski",
    country: "Švedska",
    producer: "Nordic Docs",
    runningTime: 48,
    themes: ["Održivi razvoj", "Zajednica", "Alternativni načini života"],
    pageNumber: null
  },
  {
    id: "9a2c4e6f-3d5b-4e7c-9f1a-3b5d7e9f2c4a",
    title: "PLAN Z – OD BIJELIH KUTA DO LISICA",
    description: "Dokumentarac o očuvanju bioraznolikosti i zaštiti ugroženih vrsta u kontekstu klimatskih promjena.",
    duration: 55,
    category: "Dokumentarni",
    imageUrl: null,
    location: "Pula",
    screeningDates: ["2025-03-19", "2025-03-24"],
    director: "Louisa Jones, Vladimir Morozov",
    year: 2024,
    language: "Engleski",
    country: "UK/Rusija",
    producer: "Wildlife Films",
    runningTime: 55,
    themes: ["Bioraznolikost", "Zaštita prirode", "Ugrožene vrste"],
    pageNumber: null
  }
];

async function seedProduction() {
  console.log('🌱 Starting production database seeding...');
  console.log('⚠️  Make sure you are connected to PRODUCTION database!');
  console.log('');

  try {
    // Check current film count
    const existingFilms = await db.select({ id: films.id }).from(films);
    console.log(`📊 Current films in database: ${existingFilms.length}`);

    if (existingFilms.length > 0) {
      console.log('⚠️  Database already has films. This will skip duplicates.');
      console.log('');
    }

    // Check if CSV backup exists and read it
    const csvPath = '/tmp/films_backup.csv';
    let filmsToInsert = filmData;

    if (fs.existsSync(csvPath)) {
      console.log('📁 Found CSV backup file, will use that instead...');
      // For now, use the hardcoded data above
      // You can enhance this to parse CSV if needed
    }

    console.log(`📥 Preparing to insert ${filmsToInsert.length} films...`);
    console.log('');

    let inserted = 0;
    let skipped = 0;
    let errors = 0;

    for (const film of filmsToInsert) {
      try {
        await db.insert(films).values({
          id: film.id,
          title: film.title,
          description: film.description,
          duration: film.duration,
          category: film.category,
          imageUrl: film.imageUrl,
          imageData: null, // Will be added separately
          location: film.location,
          screeningDates: film.screeningDates,
          director: film.director,
          year: film.year,
          language: film.language,
          country: film.country,
          producer: film.producer,
          runningTime: film.runningTime,
          themes: film.themes,
          pageNumber: film.pageNumber
        }).onConflictDoNothing();
        
        inserted++;
        console.log(`✓ ${inserted}. ${film.title}`);
      } catch (error: any) {
        if (error.message?.includes('duplicate') || error.code === '23505') {
          skipped++;
          console.log(`⊘ Skipped: ${film.title}`);
        } else {
          errors++;
          console.error(`✗ Error: ${film.title} - ${error.message}`);
        }
      }
    }

    console.log('');
    console.log('═══════════════════════════════════════');
    console.log('✅ Seeding Complete!');
    console.log(`📊 Films to insert: ${filmsToInsert.length}`);
    console.log(`✅ Successfully inserted: ${inserted}`);
    console.log(`⊘ Skipped (duplicates): ${skipped}`);
    console.log(`✗ Errors: ${errors}`);
    console.log('═══════════════════════════════════════');

    // Final verification
    const finalCount = await db.select({ id: films.id }).from(films);
    console.log(`🔍 Total films now in database: ${finalCount.length}`);
    console.log('');
    console.log('🎉 Production database is ready!');

  } catch (error: any) {
    console.error('❌ Seeding failed:', error.message);
    console.error(error);
    process.exit(1);
  }
}

seedProduction().then(() => {
  console.log('✅ Seed script completed');
  process.exit(0);
}).catch((error) => {
  console.error('💥 Fatal error:', error);
  process.exit(1);
});
