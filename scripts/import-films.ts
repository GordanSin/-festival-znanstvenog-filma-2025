import { db } from '../server/db';
import { films } from '../shared/schema';
import * as fs from 'fs';

// Import films to production database
// IMPORTANT: Make sure DATABASE_URL points to PRODUCTION before running!
async function importFilms() {
  console.log('🚀 Starting film import to production...');
  console.log('⚠️  MAKE SURE YOU ARE CONNECTED TO PRODUCTION DATABASE!');
  console.log('');

  const dataPath = 'films-data.json';

  if (!fs.existsSync(dataPath)) {
    console.error(`❌ Error: ${dataPath} not found!`);
    console.log('Please run: tsx scripts/export-films.ts first');
    process.exit(1);
  }

  try {
    // Load film data
    console.log(`📂 Loading film data from ${dataPath}...`);
    const filmsData = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
    console.log(`✅ Loaded ${filmsData.length} films`);
    console.log('');

    // Check current state
    const existingFilms = await db.select({ id: films.id, title: films.title }).from(films);
    console.log(`📊 Current films in database: ${existingFilms.length}`);
    
    if (existingFilms.length > 0) {
      console.log('⚠️  Database already contains films:');
      existingFilms.forEach((f, i) => {
        console.log(`   ${i + 1}. ${f.title}`);
      });
      console.log('');
      console.log('This script will skip any duplicate films.');
      console.log('');
    }

    // Import films
    let imported = 0;
    let skipped = 0;
    let errors = 0;

    for (const film of filmsData) {
      try {
        await db.insert(films).values(film).onConflictDoNothing();
        imported++;
        console.log(`✓ ${imported}. ${film.title}`);
      } catch (error: any) {
        if (error.code === '23505' || error.message?.includes('duplicate')) {
          skipped++;
          console.log(`⊘ Skipped (exists): ${film.title}`);
        } else {
          errors++;
          console.error(`✗ Error: ${film.title} - ${error.message}`);
        }
      }
    }

    console.log('');
    console.log('═══════════════════════════════════════');
    console.log('✅ Import Complete!');
    console.log(`📊 Total films: ${filmsData.length}`);
    console.log(`✅ Successfully imported: ${imported}`);
    console.log(`⊘ Skipped (duplicates): ${skipped}`);
    console.log(`✗ Errors: ${errors}`);
    console.log('═══════════════════════════════════════');

    // Verify
    const finalCount = await db.select({ id: films.id }).from(films);
    console.log(`🔍 Total films now in database: ${finalCount.length}`);
    console.log('');
    console.log('🎉 Production database is ready!');

  } catch (error: any) {
    console.error('❌ Import failed:', error.message);
    console.error(error);
    process.exit(1);
  }
}

importFilms().then(() => {
  console.log('✅ Import script completed');
  process.exit(0);
}).catch((error) => {
  console.error('💥 Fatal error:', error);
  process.exit(1);
});
