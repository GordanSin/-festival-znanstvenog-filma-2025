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
  
  // First pass: Extract all metadata fields
  const metadata: any = {};
  let currentField = '';
  let currentValue = '';
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    if (line.startsWith('Category:')) {
      if (currentField && currentValue) metadata[currentField] = currentValue.trim();
      currentField = 'category';
      currentValue = line.replace('Category:', '').trim();
    } else if (line.startsWith('Director:')) {
      if (currentField && currentValue) metadata[currentField] = currentValue.trim();
      currentField = 'director';
      currentValue = line.replace('Director:', '').trim();
    } else if (line.startsWith('Produced by:')) {
      if (currentField && currentValue) metadata[currentField] = currentValue.trim();
      currentField = 'producer';
      currentValue = line.replace('Produced by:', '').trim();
    } else if (line.startsWith('Running Time:')) {
      if (currentField && currentValue) metadata[currentField] = currentValue.trim();
      currentField = 'runningTime';
      currentValue = line.replace('Running Time:', '').trim();
    } else if (line.startsWith('Country:')) {
      if (currentField && currentValue) metadata[currentField] = currentValue.trim();
      currentField = 'country';
      currentValue = line.replace('Country:', '').trim();
    } else if (line.startsWith('Year:')) {
      if (currentField && currentValue) metadata[currentField] = currentValue.trim();
      currentField = 'year';
      currentValue = line.replace('Year:', '').trim();
    } else if (currentField && !line.includes(':') && line.length > 0) {
      if (currentValue) {
        currentValue += ' ' + line;
      } else {
        currentValue = line;
      }
    } else if (line.includes(':') && currentField) {
      if (currentField && currentValue) metadata[currentField] = currentValue.trim();
      currentField = '';
      currentValue = '';
    }
  }
  
  if (currentField && currentValue) {
    metadata[currentField] = currentValue.trim();
  }
  
  // Create a set of all metadata values to exclude from title search
  const excludeFromTitle = new Set();
  if (metadata.director) excludeFromTitle.add(metadata.director.trim());
  if (metadata.producer) excludeFromTitle.add(metadata.producer.trim());
  if (metadata.country) excludeFromTitle.add(metadata.country.trim());
  if (metadata.category) excludeFromTitle.add(metadata.category.trim());
  excludeFromTitle.add('Category:');
  excludeFromTitle.add('Director:');
  excludeFromTitle.add('Produced by:');
  excludeFromTitle.add('Running Time:');
  excludeFromTitle.add('Country:');
  excludeFromTitle.add('Year:');
  excludeFromTitle.add('Culture & History');
  excludeFromTitle.add('Natural Science, Life Science & Technology');
  excludeFromTitle.add('Ecology & Environment');
  excludeFromTitle.add('Family Edutainment');
  
  // Now find the actual film title - look for ALL CAPS lines that are NOT metadata
  let title = '';
  let titleLines: string[] = [];
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    // Skip lines that are clearly metadata or values
    if (line.includes(':') || 
        excludeFromTitle.has(line) ||
        line.match(/^\d{4}$/) ||
        line.match(/^\d+:\d+$/) ||
        line.length < 5) {
      continue;
    }
    
    // Look for ALL CAPS lines that could be titles
    const isAllCaps = line === line.toUpperCase() && line !== line.toLowerCase();
    const isSubstantial = line.length >= 5 && line.length <= 80;
    const hasLetters = /[A-ZŠĐČĆŽ]/.test(line);
    
    if (isAllCaps && isSubstantial && hasLetters) {
      titleLines.push(line);
      console.log(`Found title part: "${line}"`);
    }
  }
  
  // Combine title lines or take the first substantial one
  if (titleLines.length > 0) {
    // If we have multiple ALL CAPS lines, they might be multi-line title
    if (titleLines.length === 1) {
      title = titleLines[0];
    } else {
      // Check if they form a coherent title
      const combinedTitle = titleLines.join(' ');
      if (combinedTitle.length <= 100) {
        title = combinedTitle;
      } else {
        title = titleLines[0]; // Take first line
      }
    }
  }
  
  // Fallback: if no ALL CAPS title found, look for other title patterns
  if (!title) {
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      
      if (line.includes(':') || 
          excludeFromTitle.has(line) ||
          line.match(/^\d{4}$/) ||
          line.match(/^\d+:\d+$/)) {
        continue;
      }
      
      // Look for title-case substantial lines
      const isTitleCase = /^[A-ZŠĐČĆŽ]/.test(line);
      const isSubstantial = line.length >= 8 && line.length <= 80;
      
      if (isTitleCase && isSubstantial) {
        title = line;
        console.log(`Fallback title found: "${line}"`);
        break;
      }
    }
  }
  
  // Extract description from remaining content
  let description = '';
  const descriptionLines: string[] = [];
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    if (line === title || 
        line.includes(':') ||
        excludeFromTitle.has(line) ||
        line.match(/^\d{4}$/) ||
        line.match(/^\d+:\d+$/) ||
        line.length < 25) {
      continue;
    }
    
    // Look for substantial descriptive content
    if (line.length >= 25) {
      descriptionLines.push(line);
    }
  }
  
  description = descriptionLines.join(' ').substring(0, 1500);
  
  // Clean metadata
  Object.keys(metadata).forEach(key => {
    if (typeof metadata[key] === 'string') {
      metadata[key] = metadata[key].replace(/\s+/g, ' ').trim();
    }
  });
  
  // Parse running time for duration
  if (metadata.runningTime) {
    const durationMatch = metadata.runningTime.match(/(\d+):(\d+)/);
    if (durationMatch) {
      metadata.duration = parseInt(durationMatch[1]) * 60 + parseInt(durationMatch[2]);
    }
  }
  
  // Parse year
  if (metadata.year && typeof metadata.year === 'string') {
    const yearMatch = metadata.year.match(/(\d{4})/);
    if (yearMatch) {
      const yearValue = parseInt(yearMatch[1]);
      if (yearValue >= 2020 && yearValue <= 2030) {
        metadata.year = yearValue;
      } else {
        metadata.year = null;
      }
    } else {
      metadata.year = null;
    }
  }
  
  console.log(`Final extraction result:`);
  console.log(`  Title: "${title}"`);
  console.log(`  Description length: ${description.length}`);
  console.log(`  Metadata:`, metadata);
  
  return {
    title,
    description,
    ...metadata
  };
}

async function populateFilms() {
  try {
    console.log('Reading JSON file...');
    const jsonContent = readFileSync('attached_assets/festival-znanstveni-film_1758651664394.json', 'utf8');
    const jsonData: JsonData = JSON.parse(jsonContent);
    
    console.log(`Found ${jsonData.pages.length} pages in JSON`);
    
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
        
        if (!filmInfo.title || filmInfo.title.length < 5) {
          console.log(`❌ Skipping page ${page.page_number_pdf_1_based} - no valid title found`);
          skippedPages++;
          continue;
        }
        
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

populateFilms().then(() => {
  console.log('Film population completed');
  process.exit(0);
}).catch(error => {
  console.error('Script failed:', error);
  process.exit(1);
});