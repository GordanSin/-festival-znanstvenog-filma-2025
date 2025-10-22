import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { films } from '../shared/schema';

// This script imports film data to production database
// Run with: tsx scripts/import-to-production.ts

async function importToProduction() {
  console.log('🚀 Starting production import...');
  
  // Get production database URL from environment
  const productionUrl = process.env.DATABASE_URL;
  
  if (!productionUrl) {
    console.error('❌ ERROR: DATABASE_URL not found in environment');
    console.log('Please make sure you are connected to production database');
    process.exit(1);
  }

  console.log('📊 Connecting to production database...');
  const sql = neon(productionUrl);
  const db = drizzle(sql);

  try {
    // First, check how many films exist in production
    const existingFilms = await db.select({ id: films.id }).from(films);
    console.log(`📝 Found ${existingFilms.length} existing films in production`);

    if (existingFilms.length > 0) {
      console.log('⚠️  WARNING: Production database already has films!');
      console.log('This script will SKIP existing films to avoid conflicts.');
      console.log('');
    }

    // Get all films from development (this connects to dev DB)
    console.log('📥 Fetching films from development database...');
    const devUrl = process.env.DATABASE_URL; // Should be dev when running from Replit
    const devSql = neon(devUrl);
    const devDb = drizzle(devSql);
    
    const allFilms = await devDb.select().from(films);
    console.log(`✅ Found ${allFilms.length} films to import`);

    if (allFilms.length === 0) {
      console.log('❌ No films found in source database');
      process.exit(1);
    }

    // Import each film
    let imported = 0;
    let skipped = 0;

    for (const film of allFilms) {
      try {
        // Try to insert, skip if already exists
        await db.insert(films).values(film).onConflictDoNothing();
        imported++;
        console.log(`✓ Imported: ${film.title}`);
      } catch (error: any) {
        if (error.message?.includes('duplicate key') || error.message?.includes('already exists')) {
          skipped++;
          console.log(`⊘ Skipped (exists): ${film.title}`);
        } else {
          console.error(`✗ Error importing ${film.title}:`, error.message);
        }
      }
    }

    console.log('');
    console.log('═══════════════════════════════════════');
    console.log('🎉 Import Complete!');
    console.log(`📊 Total films: ${allFilms.length}`);
    console.log(`✅ Successfully imported: ${imported}`);
    console.log(`⊘ Skipped (already exist): ${skipped}`);
    console.log('═══════════════════════════════════════');

    // Verify final count
    const finalFilms = await db.select({ id: films.id }).from(films);
    console.log(`🔍 Final count in production: ${finalFilms.length} films`);

  } catch (error: any) {
    console.error('❌ Import failed:', error.message);
    process.exit(1);
  }
}

// Run the import
importToProduction().then(() => {
  console.log('✅ Script completed successfully');
  process.exit(0);
}).catch((error) => {
  console.error('💥 Fatal error:', error);
  process.exit(1);
});
