import { db } from '../server/db';
import { films } from '../shared/schema';
import * as fs from 'fs';

// Export all films from development database to JSON
async function exportFilms() {
  console.log('📦 Exporting films from development database...');
  
  try {
    const allFilms = await db.select().from(films);
    console.log(`✅ Found ${allFilms.length} films to export`);

    const exportPath = 'films-data.json';
    fs.writeFileSync(exportPath, JSON.stringify(allFilms, null, 2));
    
    console.log(`✅ Films exported to: ${exportPath}`);
    console.log(`📊 File size: ${(fs.statSync(exportPath).size / 1024 / 1024).toFixed(2)} MB`);
  } catch (error: any) {
    console.error('❌ Export failed:', error.message);
    process.exit(1);
  }
}

exportFilms().then(() => {
  console.log('✅ Export complete');
  process.exit(0);
}).catch((error) => {
  console.error('💥 Fatal error:', error);
  process.exit(1);
});
