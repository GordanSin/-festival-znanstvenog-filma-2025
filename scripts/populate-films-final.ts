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
  console.log(`Total lines: ${lines.length}`);
  
  // Find title - it appears AFTER the metadata section
  let title = '';
  let titleStartIndex = -1;
  let metadataEndIndex = -1;
  
  // First, find where metadata section ends
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.includes('Year:') || (line.match(/^\d{4}$/) && i > 5)) {
      metadataEndIndex = i;
      break;
    }
  }
  
  // Look for title after metadata
  if (metadataEndIndex > -1) {
    for (let i = metadataEndIndex + 1; i < lines.length; i++) {
      const line = lines[i];
      
      // Skip empty lines and categories
      if (line.length === 0 || 
          line === 'Culture & History' || 
          line === 'Natural Science, Life Science & Technology' ||
          line === 'Ecology & Environment' ||
          line === 'Family Edutainment') {
        continue;
      }
      
      // Found the title
      if (line.length >= 5 && line.length <= 80) {
        title = line;
        titleStartIndex = i;
        break;
      }
    }
  }
  
  // Fallback: if no title found after metadata, try looking at the beginning
  if (!title) {
    for (let i = 0; i < Math.min(5, lines.length); i++) {
      const line = lines[i];
      if (!line.includes(':') && line.length >= 5 && line.length <= 80) {
        title = line;
        titleStartIndex = i;
        break;
      }
    }
  }
  
  console.log(`Extracted title: "${title}"`);
  
  // Extract description - find text after the title
  let description = '';
  const descriptionLines: string[] = [];
  
  if (titleStartIndex > -1) {
    for (let i = titleStartIndex + 1; i < lines.length; i++) {
      const line = lines[i];
      
      // Add meaningful content lines that aren't metadata
      if (line.length > 20 && 
          !line.match(/^\d+$/) && 
          !line.includes('Category:') && 
          !line.includes('Director:') && 
          !line.includes('Produced by:') && 
          !line.includes('Running Time:') && 
          !line.includes('Country:') && 
          !line.includes('Year:')) {
        descriptionLines.push(line);
      }
    }
  }
  
  description = descriptionLines.join(' ').substring(0, 1500);
  console.log(`Extracted description length: ${description.length}`);
  
  // Parse structured fields by scanning line by line
  const info: any = {
    title,
    description
  };
  
  let currentField = '';
  let currentValue = '';
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    if (line.startsWith('Category:')) {
      // Save previous field
      if (currentField && currentValue) {
        info[currentField] = currentValue.trim();
      }
      currentField = 'category';
      currentValue = line.replace('Category:', '').trim();
    } else if (line.startsWith('Director:')) {
      // Save previous field
      if (currentField && currentValue) {
        info[currentField] = currentValue.trim();
      }
      currentField = 'director';
      currentValue = line.replace('Director:', '').trim();
    } else if (line.startsWith('Produced by:')) {
      // Save previous field
      if (currentField && currentValue) {
        info[currentField] = currentValue.trim();
      }
      currentField = 'producer';
      currentValue = line.replace('Produced by:', '').trim();
    } else if (line.startsWith('Running Time:')) {
      // Save previous field
      if (currentField && currentValue) {
        info[currentField] = currentValue.trim();
      }
      currentField = 'runningTime';
      currentValue = line.replace('Running Time:', '').trim();
    } else if (line.startsWith('Country:')) {
      // Save previous field
      if (currentField && currentValue) {
        info[currentField] = currentValue.trim();
      }
      currentField = 'country';
      currentValue = line.replace('Country:', '').trim();
    } else if (line.startsWith('Year:')) {
      // Save previous field
      if (currentField && currentValue) {
        info[currentField] = currentValue.trim();
      }
      currentField = 'year';
      currentValue = line.replace('Year:', '').trim();
    } else if (currentField && !line.includes(':') && line.length > 0) {
      // Continue the current field value
      if (currentValue) {
        currentValue += ' ' + line;
      } else {
        currentValue = line;
      }
    }
  }
  
  // Save the last field
  if (currentField && currentValue) {
    info[currentField] = currentValue.trim();
  }
  
  // Clean up and validate the data
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
    // Extract duration in minutes
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
  
  console.log(`Final extracted metadata:`, {
    category: info.category,
    director: info.director,
    producer: info.producer,
    country: info.country,
    year: info.year,
    runningTime: info.runningTime
  });
  
  return info;
}

async function populateFilms() {
  try {
    console.log('Reading JSON file...');
    const jsonContent = readFileSync('attached_assets/festival-znanstveni-film_1758651664394.json', 'utf8');
    const jsonData: JsonData = JSON.parse(jsonContent);
    
    console.log(`Found ${jsonData.pages.length} pages in JSON`);
    console.log(`Total pages in PDF: ${jsonData.total_pages_in_pdf}`);
    
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
        
        // Validate that we have a reasonable title
        if (!filmInfo.title || filmInfo.title.length < 5 || 
            filmInfo.title.toLowerCase().includes('category') ||
            filmInfo.title.toLowerCase().includes('director') ||
            filmInfo.title.toLowerCase().includes('produced by')) {
          console.log(`❌ Skipping page ${page.page_number_pdf_1_based} - invalid title: "${filmInfo.title}"`);
          skippedPages++;
          continue;
        }
        
        // Get image data if available
        let imageData = '';
        if (page.images && page.images.length > 0) {
          imageData = page.images[0].data_base64;
          console.log(`✅ Found image data for page ${page.page_number_pdf_1_based}`);
        }
        
        // Ensure we have clean data
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