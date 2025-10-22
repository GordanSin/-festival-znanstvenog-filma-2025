import { db } from '../server/db';
import { films } from '../shared/schema';
import * as fs from 'fs';

async function simpleImport() {
  console.log('🎬 Simple Film Import');
  console.log('');

  const dataPath = 'films-data.json';

  if (!fs.existsSync(dataPath)) {
    console.error(`❌ Error: ${dataPath} not found!`);
    process.exit(1);
  }

  try {
    console.log(`📂 Loading film data...`);
    const filmsData = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
    console.log(`✅ Loaded ${filmsData.length} films`);
    console.log('');

    // Check current state
    const existingFilms = await db.select({ id: films.id, title: films.title }).from(films);
    console.log(`📊 Current films in database: ${existingFilms.length}`);
    console.log('');

    if (existingFilms.length >= 20) {
      console.log('✅ Database already has all films!');
      console.log('No import needed.');
      process.exit(0);
    }

    // Import films
    let imported = 0;
    let skipped = 0;

    for (const film of filmsData) {
      try {
        const { createdAt, ...filmWithoutTimestamp } = film;
        
        await db.insert(films).values(filmWithoutTimestamp).onConflictDoNothing();
        imported++;
        console.log(`✓ ${imported}. ${film.title}`);
      } catch (error: any) {
        skipped++;
        console.log(`⊘ Skipped: ${film.title}`);
      }
    }

    console.log('');
    console.log('✅ Import Complete!');
    console.log(`📊 Successfully imported: ${imported}`);
    console.log(`⊘ Skipped: ${skipped}`);
    console.log('');

    const finalCount = await db.select({ id: films.id }).from(films);
    console.log(`🔍 Total films in database: ${finalCount.length}`);

  } catch (error: any) {
    console.error('❌ Import failed:', error.message);
    process.exit(1);
  }
}

simpleImport().then(() => {
  console.log('✅ Done');
  process.exit(0);
}).catch((error) => {
  console.error('💥 Error:', error);
  process.exit(1);
});
