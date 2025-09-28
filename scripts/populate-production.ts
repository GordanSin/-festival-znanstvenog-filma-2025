#!/usr/bin/env tsx
/**
 * Production Database Population Script
 * This script populates the production database with film data from the JSON file
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { Pool, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import ws from "ws";
import * as schema from "../shared/schema";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

neonConfig.webSocketConstructor = ws;

// Force production database connection
const DATABASE_URL = process.env.DATABASE_URL;
if (!DATABASE_URL) {
  throw new Error("DATABASE_URL must be set");
}

console.log("🚀 Starting production database population...");
console.log("Database URL:", DATABASE_URL.substring(0, 50) + "...");

const pool = new Pool({ connectionString: DATABASE_URL });
const db = drizzle({ client: pool, schema });

interface FilmData {
  title: string;
  description: string;
  imageData?: string;
  category?: string;
  director?: string;
  producer?: string;
  country?: string;
  year?: number;
  duration?: number;
}

async function populateProductionDatabase() {
  try {
    console.log("📖 Reading JSON file...");
    const jsonPath = path.join(__dirname, '..', 'attached_assets', 'festival-znanstveni-film_1758651664394.json');
    const rawData = fs.readFileSync(jsonPath, 'utf8');
    const data = JSON.parse(rawData);
    
    if (!data.pages || !Array.isArray(data.pages)) {
      throw new Error('Invalid JSON structure: pages array not found');
    }

    console.log(`📄 Found ${data.pages.length} pages in JSON`);
    
    // Process pages 3-22 (excluding pages 1, 2, and 23 which contain non-film content)
    const filmPages = data.pages.filter((page: any, index: number) => {
      const pageNum = index + 1; // Array is 0-indexed, pages are 1-indexed
      return pageNum >= 3 && pageNum <= 22;
    });
    
    console.log(`🎬 Processing ${filmPages.length} film pages`);

    let successCount = 0;
    let skipCount = 0;

    for (const page of filmPages) {
      try {
        console.log(`\n--- Processing Page ${page.pageNumber} ---`);
        
        // Extract film data from page
        const filmData = extractFilmData(page);
        
        if (!filmData.title) {
          console.log(`⚠️  Skipping page ${page.pageNumber}: No title found`);
          skipCount++;
          continue;
        }

        // Insert film into database
        const result = await db.insert(schema.films).values({
          title: filmData.title,
          description: filmData.description,
          imageData: filmData.imageData,
          pageNumber: page.pageNumber,
          category: filmData.category,
          director: filmData.director,
          producer: filmData.producer,
          country: filmData.country,
          year: filmData.year,
          duration: filmData.duration,
        }).returning();

        console.log(`✅ Created film: "${filmData.title}" (Page ${page.pageNumber})`);
        successCount++;

      } catch (error) {
        console.error(`❌ Error processing page ${page.pageNumber}:`, error);
        skipCount++;
      }
    }

    console.log(`\n=== PRODUCTION DATABASE POPULATION SUMMARY ===`);
    console.log(`✅ Successfully created ${successCount} films`);
    console.log(`❌ Skipped ${skipCount} pages`);
    console.log(`📊 Success rate: ${Math.round((successCount / (successCount + skipCount)) * 100)}%`);
    console.log(`🚀 Production database population completed!`);

  } catch (error) {
    console.error('💥 Critical error during population:', error);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

function extractFilmData(page: any): FilmData {
  // Use the same logic as the working populate-films-perfect.ts
  const text = page.text || '';
  const pageNumber = page.page_number_pdf_1_based || 0;
  
  const filmInfo = extractFilmInfo(text, pageNumber);
  
  // Extract image data if available
  let imageData = '';
  if (page.images && page.images.length > 0 && page.images[0].data_base64) {
    imageData = page.images[0].data_base64;
  }
  
  return {
    title: filmInfo.title || '',
    description: filmInfo.description || '',
    imageData,
    category: filmInfo.category,
    director: filmInfo.director,
    producer: filmInfo.producer,
    country: filmInfo.country,
    year: filmInfo.year,
    duration: filmInfo.duration
  };
}

function extractFilmInfo(text: string, pageNumber: number): any {
  const lines = text.split('\n').map(line => line.trim()).filter(line => line.length > 0);
  
  console.log(`\n--- Processing Page ${pageNumber} ---`);
  
  const info: any = {};
  let currentField = '';
  let currentValue = '';
  
  // Extract metadata fields
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    if (line.startsWith('Category:')) {
      if (currentField && currentValue) info[currentField] = currentValue.trim();
      currentField = 'category';
      currentValue = line.replace('Category:', '').trim();
    } else if (line.startsWith('Director:')) {
      if (currentField && currentValue) info[currentField] = currentValue.trim();
      currentField = 'director';
      currentValue = line.replace('Director:', '').trim();
    } else if (line.startsWith('Produced by:')) {
      if (currentField && currentValue) info[currentField] = currentValue.trim();
      currentField = 'producer';
      currentValue = line.replace('Produced by:', '').trim();
    } else if (line.startsWith('Running Time:')) {
      if (currentField && currentValue) info[currentField] = currentValue.trim();
      currentField = 'runningTime';
      currentValue = line.replace('Running Time:', '').trim();
    } else if (line.startsWith('Country:')) {
      if (currentField && currentValue) info[currentField] = currentValue.trim();
      currentField = 'country';
      currentValue = line.replace('Country:', '').trim();
    } else if (line.startsWith('Year:')) {
      if (currentField && currentValue) info[currentField] = currentValue.trim();
      currentField = 'year';
      currentValue = line.replace('Year:', '').trim();
    } else if (currentField && !line.includes(':') && line.length > 0) {
      if (currentValue) {
        currentValue += ' ' + line;
      } else {
        currentValue = line;
      }
    } else if (!currentField || line.includes(':')) {
      if (currentField && currentValue) {
        info[currentField] = currentValue.trim();
        currentField = '';
        currentValue = '';
      }
    }
  }
  
  if (currentField && currentValue) {
    info[currentField] = currentValue.trim();
  }
  
  // Find title and description
  let title = '';
  let description = '';
  const descriptionLines: string[] = [];
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    if (line.includes('Category:') || line.includes('Director:') || 
        line.includes('Produced by:') || line.includes('Running Time:') || 
        line.includes('Country:') || line.includes('Year:')) {
      continue;
    }
    
    const isAllCaps = line.length > 5 && line === line.toUpperCase() && /[A-Z]/.test(line);
    const isTitleCase = line.length > 5 && /^[A-Z]/.test(line) && line.split(' ').length >= 2;
    const isGoodLength = line.length >= 5 && line.length <= 80;
    const hasNoCommonWords = !line.toLowerCase().includes('min') && 
                             !line.toLowerCase().includes('documentary') &&
                             !line.toLowerCase().includes('film');
    
    if (!title && isGoodLength && (isAllCaps || isTitleCase) && hasNoCommonWords) {
      title = line;
      console.log(`Found title candidate: "${title}"`);
    } else if (title && line.length > 50 && !line.includes(':')) {
      descriptionLines.push(line);
    }
  }
  
  description = descriptionLines.join(' ').trim();
  
  // Convert year string to number
  if (info.year) {
    const yearMatch = info.year.toString().match(/\b(20\d{2})\b/);
    if (yearMatch) {
      info.year = parseInt(yearMatch[1]);
    }
  }
  
  console.log(`Final result:`);
  console.log(`  Title: "${title}"`);
  console.log(`  Description length: ${description.length}`);
  console.log(`  Metadata:`, info);
  
  return {
    title,
    description,
    ...info
  };
}


// Run the population
populateProductionDatabase();