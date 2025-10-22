import { neon } from '@neondatabase/serverless';
import * as fs from 'fs';
import * as readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function askQuestion(question: string): Promise<string> {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer);
    });
  });
}

async function importToProduction() {
  console.log('═══════════════════════════════════════════════════════');
  console.log('🎬 PRODUCTION DATABASE IMPORT SCRIPT');
  console.log('═══════════════════════════════════════════════════════');
  console.log('');
  console.log('This script will import 20 films to your PRODUCTION database.');
  console.log('');
  console.log('⚠️  IMPORTANT: You must provide your PRODUCTION database URL!');
  console.log('');
  console.log('How to get your production database URL:');
  console.log('  1. Publish your app on Replit');
  console.log('  2. Go to Database pane → Production tab');
  console.log('  3. Copy the DATABASE_URL from production secrets');
  console.log('');

  const productionUrl = await askQuestion('Enter your PRODUCTION DATABASE_URL (or press Ctrl+C to cancel): ');
  
  if (!productionUrl || productionUrl.trim() === '') {
    console.log('❌ No database URL provided. Exiting.');
    rl.close();
    process.exit(1);
  }

  if (!productionUrl.includes('postgresql://') && !productionUrl.includes('postgres://')) {
    console.log('❌ Invalid database URL format. Must start with postgresql:// or postgres://');
    rl.close();
    process.exit(1);
  }

  console.log('');
  console.log('✅ Database URL received');
  console.log('');

  const confirm = await askQuestion('⚠️  Are you SURE this is your PRODUCTION database? (type "yes" to continue): ');
  
  if (confirm.toLowerCase() !== 'yes') {
    console.log('❌ Import cancelled. No changes made.');
    rl.close();
    process.exit(0);
  }

  console.log('');
  console.log('🚀 Starting import...');
  console.log('');

  const dataPath = 'films-data.json';
  if (!fs.existsSync(dataPath)) {
    console.error(`❌ Error: ${dataPath} not found!`);
    console.log('Please ensure films-data.json is in the project root.');
    rl.close();
    process.exit(1);
  }

  try {
    const sql = neon(productionUrl.trim());

    console.log(`📂 Loading film data from ${dataPath}...`);
    const filmsData = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
    console.log(`✅ Loaded ${filmsData.length} films from file`);
    console.log('');

    console.log('🔍 Checking production database...');
    const existingFilms = await sql`SELECT id, title FROM films ORDER BY title`;
    console.log(`📊 Current films in production: ${existingFilms.length}`);
    
    if (existingFilms.length > 0) {
      console.log('');
      console.log('⚠️  Production database already contains films:');
      existingFilms.slice(0, 5).forEach((f: any, i: number) => {
        console.log(`   ${i + 1}. ${f.title}`);
      });
      if (existingFilms.length > 5) {
        console.log(`   ... and ${existingFilms.length - 5} more`);
      }
      console.log('');
      
      const overwrite = await askQuestion('Continue with import? Duplicates will be skipped. (yes/no): ');
      if (overwrite.toLowerCase() !== 'yes') {
        console.log('❌ Import cancelled.');
        rl.close();
        process.exit(0);
      }
      console.log('');
    }

    let imported = 0;
    let skipped = 0;
    let errors = 0;

    for (const film of filmsData) {
      try {
        const existing = await sql`SELECT id FROM films WHERE id = ${film.id}`;
        
        if (existing.length > 0) {
          skipped++;
          console.log(`⊘ Skipped (exists): ${film.title}`);
          continue;
        }

        await sql`
          INSERT INTO films (
            id, title, description, director, producer, 
            country, year, duration, category, themes, 
            screening_date, screening_location, "imageData"
          ) VALUES (
            ${film.id}, ${film.title}, ${film.description}, ${film.director}, ${film.producer},
            ${film.country}, ${film.year}, ${film.duration}, ${film.category}, ${film.themes},
            ${film.screening_date}, ${film.screening_location}, ${film.imageData}
          )
        `;
        
        imported++;
        console.log(`✓ ${imported}. ${film.title}`);
        
      } catch (error: any) {
        errors++;
        console.error(`✗ Error importing ${film.title}: ${error.message}`);
      }
    }

    console.log('');
    console.log('═══════════════════════════════════════════════════════');
    console.log('✅ IMPORT COMPLETE!');
    console.log('═══════════════════════════════════════════════════════');
    console.log(`📊 Total films in file: ${filmsData.length}`);
    console.log(`✅ Successfully imported: ${imported}`);
    console.log(`⊘ Skipped (duplicates): ${skipped}`);
    console.log(`✗ Errors: ${errors}`);
    console.log('');

    const finalCount = await sql`SELECT COUNT(*) as count FROM films`;
    console.log(`🔍 Total films now in production: ${finalCount[0].count}`);
    console.log('');
    console.log('🎉 Your production database is ready!');
    console.log('');

  } catch (error: any) {
    console.error('');
    console.error('❌ Import failed:', error.message);
    console.error('');
    console.error('Troubleshooting:');
    console.error('  1. Verify your DATABASE_URL is correct');
    console.error('  2. Ensure your production database is published and accessible');
    console.error('  3. Check that the films table exists in production');
    console.error('');
    rl.close();
    process.exit(1);
  }

  rl.close();
}

importToProduction().then(() => {
  console.log('✅ Script completed successfully');
  process.exit(0);
}).catch((error) => {
  console.error('💥 Fatal error:', error);
  process.exit(1);
});
