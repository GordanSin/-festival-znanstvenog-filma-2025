import { neon } from '@neondatabase/serverless';
import * as fs from 'fs';

/**
 * Production Database Import Script
 * 
 * Usage: PROD_DATABASE_URL="your-production-url" tsx scripts/import-production.ts
 */

async function importToProduction() {
  console.log('═══════════════════════════════════════════════════════');
  console.log('🎬 PRODUCTION DATABASE IMPORT');
  console.log('═══════════════════════════════════════════════════════');
  console.log('');

  // Get production URL from environment
  const productionUrl = process.env.PROD_DATABASE_URL;
  
  if (!productionUrl) {
    console.error('❌ ERROR: PROD_DATABASE_URL not set!');
    console.log('');
    console.log('Usage:');
    console.log('  PROD_DATABASE_URL="postgresql://..." tsx scripts/import-production.ts');
    console.log('');
    console.log('How to get your production database URL:');
    console.log('  1. Publish your app on Replit');
    console.log('  2. Go to Database pane → Production tab');
    console.log('  3. Copy the DATABASE_URL');
    console.log('  4. Run: PROD_DATABASE_URL="paste-url-here" tsx scripts/import-production.ts');
    console.log('');
    process.exit(1);
  }

  console.log('✅ Production URL detected');
  console.log('');

  const dataPath = 'films-data.json';
  if (!fs.existsSync(dataPath)) {
    console.error(`❌ Error: ${dataPath} not found!`);
    process.exit(1);
  }

  try {
    const sql = neon(productionUrl);

    console.log(`📂 Loading film data from ${dataPath}...`);
    const filmsData = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
    console.log(`✅ Loaded ${filmsData.length} films`);
    console.log('');

    console.log('🔍 Checking production database...');
    const existingFilms = await sql`SELECT id, title FROM films ORDER BY title`;
    console.log(`📊 Current films in production: ${existingFilms.length}`);
    console.log('');

    if (existingFilms.length > 0) {
      console.log('⚠️  Production already has films. Duplicates will be skipped.');
      console.log('');
    }

    let imported = 0;
    let skipped = 0;
    let errors = 0;

    for (const film of filmsData) {
      try {
        // Check if exists
        const existing = await sql`SELECT id FROM films WHERE id = ${film.id}`;
        
        if (existing.length > 0) {
          skipped++;
          console.log(`⊘ Skipped (exists): ${film.title}`);
          continue;
        }

        // Insert film - map JSON field names to database column names
        await sql`
          INSERT INTO films (
            id, title, description, director, producer, 
            country, year, duration, category, themes, 
            screening_dates, location, image_url, image_data,
            language, running_time, page_number
          ) VALUES (
            ${film.id}, 
            ${film.title}, 
            ${film.description}, 
            ${film.director}, 
            ${film.producer},
            ${film.country}, 
            ${film.year}, 
            ${film.duration}, 
            ${film.category}, 
            ${JSON.stringify(film.themes || [])},
            ${JSON.stringify(film.screening_dates || [])}, 
            ${film.location}, 
            ${film.image_url}, 
            ${film.image_data},
            ${film.language}, 
            ${film.running_time}, 
            ${film.page_number}
          )
        `;
        
        imported++;
        console.log(`✓ ${imported}. ${film.title}`);
        
      } catch (error: any) {
        errors++;
        console.error(`✗ Error: ${film.title}`);
        console.error(`   ${error.message}`);
      }
    }

    console.log('');
    console.log('═══════════════════════════════════════════════════════');
    console.log('✅ IMPORT COMPLETE!');
    console.log('═══════════════════════════════════════════════════════');
    console.log(`📊 Total films: ${filmsData.length}`);
    console.log(`✅ Successfully imported: ${imported}`);
    console.log(`⊘ Skipped (duplicates): ${skipped}`);
    console.log(`✗ Errors: ${errors}`);
    console.log('');

    const finalCount = await sql`SELECT COUNT(*) as count FROM films`;
    console.log(`🔍 Total films in production: ${finalCount[0].count}`);
    console.log('');
    console.log('🎉 Production database is ready!');

  } catch (error: any) {
    console.error('');
    console.error('❌ Import failed:', error.message);
    console.error('');
    process.exit(1);
  }
}

importToProduction().then(() => {
  console.log('✅ Script completed');
  process.exit(0);
}).catch((error) => {
  console.error('💥 Fatal error:', error);
  process.exit(1);
});
