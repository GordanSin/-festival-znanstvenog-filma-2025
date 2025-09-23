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

function extractFilmInfo(text: string): {
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
  
  // Extract title (usually the first few lines in all caps)
  const title = lines[0] || '';
  
  // Find description (usually the longest paragraph)
  const descriptionLines = lines.filter(line => 
    !line.includes('Category:') && 
    !line.includes('Director:') && 
    !line.includes('Produced by:') && 
    !line.includes('Running Time:') && 
    !line.includes('Country:') && 
    !line.includes('Year:') &&
    line.length > 50
  );
  const description = descriptionLines.join(' ');
  
  // Extract structured data
  const info: any = {};
  
  let currentKey = '';
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    if (line.startsWith('Category:')) {
      currentKey = 'category';
      const value = line.replace('Category:', '').trim();
      if (value) info.category = value;
    } else if (line.startsWith('Director:')) {
      currentKey = 'director';
      const value = line.replace('Director:', '').trim();
      if (value) info.director = value;
    } else if (line.startsWith('Produced by:')) {
      currentKey = 'producer';
      const value = line.replace('Produced by:', '').trim();
      if (value) info.producer = value;
    } else if (line.startsWith('Running Time:')) {
      currentKey = 'runningTime';
      const value = line.replace('Running Time:', '').trim();
      if (value) {
        info.runningTime = value;
        // Try to extract duration in minutes from running time
        const match = value.match(/(\d+):(\d+)/);
        if (match) {
          info.duration = parseInt(match[1]) * 60 + parseInt(match[2]);
        }
      }
    } else if (line.startsWith('Country:')) {
      currentKey = 'country';
      const value = line.replace('Country:', '').trim();
      if (value) info.country = value;
    } else if (line.startsWith('Year:')) {
      currentKey = 'year';
      const value = line.replace('Year:', '').trim();
      if (value && !isNaN(parseInt(value))) {
        info.year = parseInt(value);
      }
    } else if (currentKey && !line.includes(':') && line.length > 0) {
      // Continue value from previous line
      if (info[currentKey]) {
        info[currentKey] += ' ' + line;
      } else {
        info[currentKey] = line;
      }
    }
  }
  
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
    
    // Filter out pages 1, 2, and 23 (last page)
    const filteredPages = jsonData.pages.filter(page => {
      const pageNum = page.page_number_pdf_1_based;
      return pageNum !== 1 && pageNum !== 2 && pageNum !== jsonData.total_pages_in_pdf;
    });
    
    console.log(`Processing ${filteredPages.length} pages (excluding pages 1, 2, and ${jsonData.total_pages_in_pdf})`);
    
    let filmsCreated = 0;
    
    for (const page of filteredPages) {
      try {
        const filmInfo = extractFilmInfo(page.text);
        
        // Skip pages that don't seem to contain film information
        if (!filmInfo.title || filmInfo.title.length < 5) {
          console.log(`Skipping page ${page.page_number_pdf_1_based} - no clear film title found`);
          continue;
        }
        
        // Get image data if available
        let imageData = '';
        if (page.images && page.images.length > 0) {
          imageData = page.images[0].data_base64;
        }
        
        const insertFilm: InsertFilm = {
          title: filmInfo.title,
          description: filmInfo.description || '',
          category: filmInfo.category || 'Unknown',
          director: filmInfo.director,
          producer: filmInfo.producer,
          runningTime: filmInfo.runningTime,
          country: filmInfo.country,
          year: filmInfo.year,
          duration: filmInfo.duration,
          imageData: imageData,
          pageNumber: page.page_number_pdf_1_based,
          screeningDates: [],
          themes: []
        };
        
        console.log(`Creating film: ${filmInfo.title} (Page ${page.page_number_pdf_1_based})`);
        await storage.createFilm(insertFilm);
        filmsCreated++;
        
      } catch (error) {
        console.error(`Error processing page ${page.page_number_pdf_1_based}:`, error);
      }
    }
    
    console.log(`\nSuccessfully created ${filmsCreated} films in the database`);
    
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