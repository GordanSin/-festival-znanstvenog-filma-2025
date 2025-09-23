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
  console.log(`First few lines:`, lines.slice(0, 5));
  
  // Extract title - look for the first substantial line that looks like a title
  let title = '';
  for (let i = 0; i < Math.min(5, lines.length); i++) {
    const line = lines[i];
    // Skip lines that are just metadata headers
    if (!line.includes('Category:') && 
        !line.includes('Director:') && 
        !line.includes('Year:') && 
        line.length >= 3 && 
        line.length <= 100) {
      title = line;
      break;
    }
  }
  
  // If no clear title found, use the first non-empty line
  if (!title && lines.length > 0) {
    title = lines[0];
  }
  
  console.log(`Extracted title: "${title}"`);
  
  // Extract description - find the longest coherent paragraph
  const descriptiveLines = lines.filter(line => 
    !line.includes('Category:') && 
    !line.includes('Director:') && 
    !line.includes('Produced by:') && 
    !line.includes('Running Time:') && 
    !line.includes('Country:') && 
    !line.includes('Year:') &&
    !line.includes('Natural Science') &&
    !line.includes('Life Science') &&
    !line.includes('Technology') &&
    line.length > 30 &&
    line !== title
  );
  
  let description = '';
  if (descriptiveLines.length > 0) {
    // Join consecutive descriptive lines
    description = descriptiveLines.join(' ').substring(0, 1000); // Limit description length
  }
  
  console.log(`Extracted description length: ${description.length}`);
  
  // Extract structured metadata with more flexible parsing
  const info: any = {
    title,
    description
  };
  
  const fullText = text.toLowerCase();
  
  // Extract category - look for patterns
  const categoryMatch = text.match(/Category:\s*\n?\s*([^\n]+)/i) ||
                       text.match(/Ecology & Environment/i) ||
                       text.match(/Natural Science/i) ||
                       text.match(/Life Science/i) ||
                       text.match(/Family Edutainment/i) ||
                       text.match(/Culture & History/i);
  if (categoryMatch) {
    info.category = categoryMatch[1] || categoryMatch[0];
  }
  
  // Extract director
  const directorMatch = text.match(/Director:\s*\n?\s*([^\n]+)/i);
  if (directorMatch) {
    info.director = directorMatch[1].trim();
  }
  
  // Extract producer
  const producerMatch = text.match(/Produced by:\s*\n?\s*([^\n]+)/i);
  if (producerMatch) {
    info.producer = producerMatch[1].trim();
  }
  
  // Extract running time
  const runningTimeMatch = text.match(/Running Time:\s*\n?\s*([^\n]+)/i);
  if (runningTimeMatch) {
    info.runningTime = runningTimeMatch[1].trim();
    // Try to extract duration in minutes
    const durationMatch = info.runningTime.match(/(\d+):(\d+)/);
    if (durationMatch) {
      info.duration = parseInt(durationMatch[1]) * 60 + parseInt(durationMatch[2]);
    }
  }
  
  // Extract country
  const countryMatch = text.match(/Country:\s*\n?\s*([^\n]+)/i);
  if (countryMatch) {
    info.country = countryMatch[1].trim();
  }
  
  // Extract year - be more flexible
  const yearMatch = text.match(/Year:\s*\n?\s*(\d{4})/i) ||
                   text.match(/(\d{4})/);
  if (yearMatch) {
    const yearValue = parseInt(yearMatch[1]);
    if (yearValue >= 2020 && yearValue <= 2030) { // Reasonable year range
      info.year = yearValue;
    }
  }
  
  console.log(`Extracted metadata:`, {
    category: info.category,
    director: info.director,
    country: info.country,
    year: info.year
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
        
        // More lenient validation - only require title
        if (!filmInfo.title || filmInfo.title.length < 3 || filmInfo.title.toLowerCase().includes('category:')) {
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
        
        // Ensure category has a default
        const category = filmInfo.category || 'Unknown';
        
        const insertFilm: InsertFilm = {
          title: filmInfo.title,
          description: filmInfo.description || '',
          category: category,
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
    
    console.log(`\n=== SUMMARY ===`);
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