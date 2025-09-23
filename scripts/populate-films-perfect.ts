import { storage } from "../server/storage";
import { readFileSync } from "fs";
import { InsertFilm } from "../shared/schema";

interface JsonPage {
  page_number_pdf_1_based: number;
  text: string;
  images?: Array<{
    image_index: number;
    xref: number;
    ext: string;
    width: number;
    height: number;
    data_base64: string;
  }>;
}

interface JsonData {
  source_file: string;
  total_pages_in_pdf: number;
  pages_included_count: number;
  pages: JsonPage[];
}

function extractFilmInfo(text: string, pageNumber: number): {
  title?: string;
  description?: string;
  category?: string;
  director?: string;
  producer?: string;
  runningTime?: string;
  country?: string;
  year?: number;
  duration?: number;
} {
  const lines = text.split('\n').map(line => line.trim()).filter(line => line.length > 0);
  
  console.log(`\n--- Processing Page ${pageNumber} ---`);
  
  // Strategy: Parse fields first, then look for title in ALL CAPS or prominent placement
  const info: any = {};
  
  // Extract all metadata fields first
  let currentField = '';
  let currentValue = '';
  
  const metadataFields = new Set(['category', 'director', 'producer', 'runningTime', 'country', 'year']);
  const extractedFields = new Set();
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    if (line.startsWith('Category:')) {
      if (currentField && currentValue) info[currentField] = currentValue.trim();
      currentField = 'category';
      currentValue = line.replace('Category:', '').trim();
      extractedFields.add('category');
    } else if (line.startsWith('Director:')) {
      if (currentField && currentValue) info[currentField] = currentValue.trim();
      currentField = 'director';
      currentValue = line.replace('Director:', '').trim();
      extractedFields.add('director');
    } else if (line.startsWith('Produced by:')) {
      if (currentField && currentValue) info[currentField] = currentValue.trim();
      currentField = 'producer';
      currentValue = line.replace('Produced by:', '').trim();
      extractedFields.add('producer');
    } else if (line.startsWith('Running Time:')) {
      if (currentField && currentValue) info[currentField] = currentValue.trim();
      currentField = 'runningTime';
      currentValue = line.replace('Running Time:', '').trim();
      extractedFields.add('runningTime');
    } else if (line.startsWith('Country:')) {
      if (currentField && currentValue) info[currentField] = currentValue.trim();
      currentField = 'country';
      currentValue = line.replace('Country:', '').trim();
      extractedFields.add('country');
    } else if (line.startsWith('Year:')) {
      if (currentField && currentValue) info[currentField] = currentValue.trim();
      currentField = 'year';
      currentValue = line.replace('Year:', '').trim();
      extractedFields.add('year');
    } else if (currentField && !line.includes(':') && line.length > 0) {
      // Continue current field value
      if (currentValue) {
        currentValue += ' ' + line;
      } else {
        currentValue = line;
      }
    } else if (!currentField || line.includes(':')) {
      // Save previous field if any
      if (currentField && currentValue) {
        info[currentField] = currentValue.trim();
        currentField = '';
        currentValue = '';
      }
    }
  }
  
  // Save final field
  if (currentField && currentValue) {
    info[currentField] = currentValue.trim();
  }
  
  // Now find the title - look for lines that are:
  // 1. In ALL CAPS or Title Case
  // 2. Not metadata values
  // 3. Substantial length (5-80 chars)
  // 4. Don't contain common metadata keywords
  
  let title = '';
  let description = '';
  const descriptionLines: string[] = [];
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    // Skip metadata field labels
    if (line.includes('Category:') || line.includes('Director:') || 
        line.includes('Produced by:') || line.includes('Running Time:') || 
        line.includes('Country:') || line.includes('Year:')) {
      continue;
    }
    
    // Skip known metadata values
    if ((info.category && line.includes(info.category)) ||
        (info.country && line === info.country) ||
        (info.year && line === info.year.toString()) ||
        line === 'Culture & History' ||
        line === 'Natural Science, Life Science & Technology' ||
        line === 'Ecology & Environment' ||
        line === 'Family Edutainment') {
      continue;
    }
    
    // Check if this could be a title
    const isAllCaps = line === line.toUpperCase() && line !== line.toLowerCase();
    const isTitleCase = /^[A-ZŠĐČĆŽ]/.test(line);
    const isGoodLength = line.length >= 5 && line.length <= 80;
    const notMetadata = !line.match(/^\d{4}$/) && !line.match(/^\d+:\d+$/);
    
    if (!title && isGoodLength && notMetadata && (isAllCaps || isTitleCase)) {
      title = line;
      console.log(`Found title candidate: "${title}"`);
    } else if (title && line.length > 30 && notMetadata) {
      // This could be description
      descriptionLines.push(line);
    }
  }
  
  description = descriptionLines.join(' ').substring(0, 1500);
  
  // Clean up metadata
  if (info.category) {
    info.category = info.category.replace(/\s+/g, ' ').trim();
  }
  
  if (info.director) {
    info.director = info.director.replace(/\s+/g, ' ').trim();
  }
  
  if (info.producer) {
    info.producer = info.producer.replace(/\s+/g, ' ').trim();
  }
  
  if (info.country) {
    info.country = info.country.replace(/\s+/g, ' ').trim();
  }
  
  if (info.runningTime) {
    info.runningTime = info.runningTime.replace(/\s+/g, ' ').trim();
    const durationMatch = info.runningTime.match(/(\d+):(\d+)/);
    if (durationMatch) {
      info.duration = parseInt(durationMatch[1]) * 60 + parseInt(durationMatch[2]);
    }
  }
  
  // Parse year carefully
  if (info.year && typeof info.year === 'string') {
    const yearMatch = info.year.match(/(\d{4})/);
    if (yearMatch) {
      const yearValue = parseInt(yearMatch[1]);
      if (yearValue >= 2020 && yearValue <= 2030) {
        info.year = yearValue;
      } else {
        info.year = null;
      }
    } else {
      info.year = null;
    }
  }
  
  console.log(`Final result:`);
  console.log(`  Title: "${title}"`);
  console.log(`  Description length: ${description.length}`);
  console.log(`  Metadata:`, {
    category: info.category,
    director: info.director,
    producer: info.producer,
    country: info.country,
    year: info.year,
    runningTime: info.runningTime
  });
  
  return {
    title,
    description,
    ...info
  };
}

async function populateFilms() {
  try {
    console.log('Reading JSON file...');
    const jsonContent = readFileSync('attached_assets/festival-znanstveni-film_1758651664394.json', 'utf8');
    const jsonData: JsonData = JSON.parse(jsonContent);
    
    console.log(`Found ${jsonData.pages.length} pages in JSON`);
    
    // Filter out pages 1, 2, and the last page (23)
    const filteredPages = jsonData.pages.filter(page => {
      const pageNum = page.page_number_pdf_1_based;
      return pageNum !== 1 && pageNum !== 2 && pageNum !== jsonData.total_pages_in_pdf;
    });
    
    console.log(`Processing ${filteredPages.length} pages (excluding pages 1, 2, and ${jsonData.total_pages_in_pdf})`);
    
    let filmsCreated = 0;
    let skippedPages = 0;
    
    for (const page of filteredPages) {
      try {
        const filmInfo = extractFilmInfo(page.text, page.page_number_pdf_1_based);
        
        // More lenient validation - require a substantial title
        if (!filmInfo.title || filmInfo.title.length < 5) {
          console.log(`❌ Skipping page ${page.page_number_pdf_1_based} - no valid title found`);
          skippedPages++;
          continue;
        }
        
        // Get image data if available
        let imageData = '';
        if (page.images && page.images.length > 0) {
          imageData = page.images[0].data_base64;
          console.log(`✅ Found image data for page ${page.page_number_pdf_1_based}`);
        }
        
        const insertFilm: InsertFilm = {
          title: filmInfo.title,
          description: filmInfo.description || '',
          category: filmInfo.category || 'Unknown',
          director: filmInfo.director || null,
          producer: filmInfo.producer || null,
          runningTime: filmInfo.runningTime || null,
          country: filmInfo.country || null,
          year: filmInfo.year || null,
          duration: filmInfo.duration || null,
          imageData: imageData || null,
          pageNumber: page.page_number_pdf_1_based,
          screeningDates: [],
          themes: []
        };
        
        console.log(`✅ Creating film: "${filmInfo.title}" (Page ${page.page_number_pdf_1_based})`);
        await storage.createFilm(insertFilm);
        filmsCreated++;
        
      } catch (error) {
        console.error(`❌ Error processing page ${page.page_number_pdf_1_based}:`, error);
        skippedPages++;
      }
    }
    
    console.log(`\n=== FINAL SUMMARY ===`);
    console.log(`✅ Successfully created ${filmsCreated} films in the database`);
    console.log(`❌ Skipped ${skippedPages} pages`);
    console.log(`📊 Success rate: ${Math.round((filmsCreated / (filmsCreated + skippedPages)) * 100)}%`);
    
  } catch (error) {
    console.error('Error populating films:', error);
  }
}

// Run the script
populateFilms().then(() => {
  console.log('Film population completed');
  process.exit(0);
}).catch(error => {
  console.error('Script failed:', error);
  process.exit(1);
});