const axios = require('axios');
require('dotenv').config();

const API_URL = 'http://localhost:1337/api';
const API_TOKEN = process.env.STRAPI_API_TOKEN;

// Configure axios with authorization header
const api = axios.create({
  baseURL: API_URL,
  headers: API_TOKEN ? {
    'Authorization': `Bearer ${API_TOKEN}`,
    'Content-Type': 'application/json'
  } : {
    'Content-Type': 'application/json'
  }
});

const gallery = [
  { title: "Main Party Room - Decorated" },
  { title: "VIP Private Room" },
  { title: "Adventure Zone" },
  { title: "Kids Playing Games" },
  { title: "Birthday Cake Table" },
  { title: "Face Painting Station" },
  { title: "Ball Pit Area" },
  { title: "Princess Party Setup" },
  { title: "Superhero Training Course" },
  { title: "Science Lab Experiment" },
  { title: "Dance Floor with Lights" },
  { title: "Art Studio Corner" },
  { title: "Dining Area" },
  { title: "Gaming Station" },
  { title: "Outdoor Play Area" },
  { title: "Happy Birthday Kids" },
  { title: "Party Host with Children" },
  { title: "Balloon Decorations" },
  { title: "Candy Bar Station" },
  { title: "Photo Booth Props" },
];

async function importGallery() {
  console.log('🖼️  Starting gallery images import...\n');

  if (!API_TOKEN) {
    console.log('⚠️  WARNING: No API token found in environment variables');
    console.log('   Create .env file with: STRAPI_API_TOKEN=your_token_here\n');
  }

  let successCount = 0;
  let skipCount = 0;
  let errorCount = 0;

  for (const image of gallery) {
    try {
      // Check if image already exists
      const existing = await api.get(`/gallery-images?filters[title][$eq]=${encodeURIComponent(image.title)}`);

      if (existing.data.data && existing.data.data.length > 0) {
        console.log(`⏭️  Skipping "${image.title}" (already exists)`);
        skipCount++;
        continue;
      }

      // Create new gallery image
      await api.post(`/gallery-images`, { data: image });
      console.log(`✅ Created "${image.title}"`);
      successCount++;

      // Small delay to avoid overwhelming the API
      await new Promise(resolve => setTimeout(resolve, 50));

    } catch (error) {
      console.error(`❌ Error creating "${image.title}":`, error.response?.data?.error?.message || error.message);
      errorCount++;
    }
  }

  console.log('\n📊 Import Summary:');
  console.log(`   ✅ Created: ${successCount}`);
  console.log(`   ⏭️  Skipped: ${skipCount}`);
  console.log(`   ❌ Errors: ${errorCount}`);
  console.log(`   🖼️  Total: ${gallery.length}\n`);
}

importGallery().catch(console.error);
