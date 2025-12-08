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

const packages = [
  {
    name: "Basic Fun Party",
    slug: "basic-fun-party",
    shortDescription: "Perfect for small birthdays.",
    fullDescription: "Includes fun games, balloons, and a small gift.",
    durationMinutes: 90,
    pricePerChild: 25,
    minGuests: 5,
    maxGuests: 20,
    includedFeatures: [
      { label: "Decorated Party Room", icon: "🎈" },
      { label: "1 Party Host", icon: "🧸" },
      { label: "Soft Drinks", icon: "🥤" }
    ],
  },
  {
    name: "Super Adventure Party",
    slug: "super-adventure-party",
    shortDescription: "Adventure-themed birthday experience.",
    fullDescription: "Obstacle course, games, and themed decorations.",
    durationMinutes: 120,
    pricePerChild: 35,
    minGuests: 8,
    maxGuests: 25,
    includedFeatures: [
      { label: "Adventure Equipment", icon: "🏃‍♂️" },
      { label: "Face Painting", icon: "🎨" },
      { label: "Themed Invitations", icon: "✉️" }
    ],
  },
  {
    name: "Mega VIP Party",
    slug: "mega-vip-party",
    shortDescription: "Premium party with full VIP treatment.",
    fullDescription: "Exclusive room, premium menu, and more.",
    durationMinutes: 150,
    pricePerChild: 50,
    minGuests: 10,
    maxGuests: 30,
    includedFeatures: [
      { label: "Private VIP Room", icon: "⭐" },
      { label: "Professional Entertainer", icon: "🤹" },
      { label: "Premium Decorations", icon: "🎉" }
    ],
  },
  {
    name: "Princess Party",
    slug: "princess-party",
    shortDescription: "A magical experience for little princesses.",
    fullDescription: "Transform into royalty with dress-up, tiaras, and a royal tea party.",
    durationMinutes: 120,
    pricePerChild: 40,
    minGuests: 6,
    maxGuests: 15,
    includedFeatures: [
      { label: "Princess Dress-up Costumes", icon: "👗" },
      { label: "Crown Making Workshop", icon: "👑" },
      { label: "Royal Tea Party", icon: "☕" },
      { label: "Face Glitter & Makeup", icon: "✨" }
    ],
  },
  {
    name: "Superhero Training Camp",
    slug: "superhero-training-camp",
    shortDescription: "Train to become a superhero!",
    fullDescription: "Action-packed party with superhero training, games, and cape decorating.",
    durationMinutes: 120,
    pricePerChild: 38,
    minGuests: 8,
    maxGuests: 20,
    includedFeatures: [
      { label: "Superhero Capes", icon: "🦸" },
      { label: "Obstacle Course", icon: "💪" },
      { label: "Training Certificate", icon: "🏆" },
      { label: "Photo Booth", icon: "📸" }
    ],
  },
  {
    name: "Science Lab Party",
    slug: "science-lab-party",
    shortDescription: "Explosive fun with science experiments!",
    fullDescription: "Interactive science experiments with slime, volcanoes, and more.",
    durationMinutes: 90,
    pricePerChild: 32,
    minGuests: 6,
    maxGuests: 18,
    includedFeatures: [
      { label: "5 Science Experiments", icon: "🔬" },
      { label: "Lab Coats & Goggles", icon: "🥽" },
      { label: "Take-home Slime", icon: "🧪" },
      { label: "Science Party Host", icon: "👨‍🔬" }
    ],
  },
  {
    name: "Art Studio Party",
    slug: "art-studio-party",
    shortDescription: "Unleash creativity with art projects.",
    fullDescription: "Paint, create, and explore artistic talents with guided projects.",
    durationMinutes: 100,
    pricePerChild: 30,
    minGuests: 5,
    maxGuests: 16,
    includedFeatures: [
      { label: "Canvas Painting", icon: "🎨" },
      { label: "Art Supplies Included", icon: "🖌️" },
      { label: "Art Smocks", icon: "👕" },
      { label: "Take-home Artwork", icon: "🖼️" }
    ],
  },
  {
    name: "Sports Champions Party",
    slug: "sports-champions-party",
    shortDescription: "Active sports party for energetic kids.",
    fullDescription: "Multi-sport activities including soccer, basketball, and relay races.",
    durationMinutes: 120,
    pricePerChild: 33,
    minGuests: 10,
    maxGuests: 25,
    includedFeatures: [
      { label: "Sports Equipment", icon: "⚽" },
      { label: "Team Games", icon: "🏀" },
      { label: "Winner Medals", icon: "🥇" },
      { label: "Sports Coach", icon: "🏃" }
    ],
  },
  {
    name: "Gaming Party",
    slug: "gaming-party",
    shortDescription: "Epic gaming tournament for gamers.",
    fullDescription: "Video game stations with popular multiplayer games and tournaments.",
    durationMinutes: 120,
    pricePerChild: 35,
    minGuests: 6,
    maxGuests: 16,
    includedFeatures: [
      { label: "Gaming Consoles", icon: "🎮" },
      { label: "Multiple Screens", icon: "🖥️" },
      { label: "Tournament Prizes", icon: "🏆" },
      { label: "Gaming Chairs", icon: "💺" }
    ],
  },
  {
    name: "Dinosaur Discovery Party",
    slug: "dinosaur-discovery-party",
    shortDescription: "Journey back to prehistoric times!",
    fullDescription: "Dinosaur-themed adventure with fossil digging, games, and activities.",
    durationMinutes: 110,
    pricePerChild: 36,
    minGuests: 8,
    maxGuests: 20,
    includedFeatures: [
      { label: "Fossil Excavation", icon: "🦴" },
      { label: "Dinosaur Decorations", icon: "🦕" },
      { label: "Dino Egg Hunt", icon: "🥚" },
      { label: "Educational Activities", icon: "📚" }
    ],
  },
  {
    name: "Dance Party Extravaganza",
    slug: "dance-party-extravaganza",
    shortDescription: "Dance, music, and lights show!",
    fullDescription: "Professional DJ, disco lights, and dance competitions.",
    durationMinutes: 120,
    pricePerChild: 37,
    minGuests: 10,
    maxGuests: 30,
    includedFeatures: [
      { label: "Professional DJ", icon: "🎧" },
      { label: "Disco Lights", icon: "💡" },
      { label: "Dance Floor", icon: "🕺" },
      { label: "Glow Accessories", icon: "✨" }
    ],
  },
];

async function importPackages() {
  console.log('📦 Starting packages import...\n');

  if (!API_TOKEN) {
    console.log('⚠️  WARNING: No API token found in environment variables');
    console.log('   Create .env file with: STRAPI_API_TOKEN=your_token_here\n');
  }

  let successCount = 0;
  let skipCount = 0;
  let errorCount = 0;

  for (const pkg of packages) {
    try {
      // Check if package already exists
      const existing = await api.get(`/packages?filters[slug][$eq]=${pkg.slug}`);

      if (existing.data.data && existing.data.data.length > 0) {
        console.log(`⏭️  Skipping "${pkg.name}" (already exists)`);
        skipCount++;
        continue;
      }

      // Create new package
      await api.post(`/packages`, { data: pkg });
      console.log(`✅ Created "${pkg.name}"`);
      successCount++;

      // Small delay to avoid overwhelming the API
      await new Promise(resolve => setTimeout(resolve, 100));

    } catch (error) {
      console.error(`❌ Error creating "${pkg.name}":`, error.response?.data?.error?.message || error.message);
      errorCount++;
    }
  }

  console.log('\n📊 Import Summary:');
  console.log(`   ✅ Created: ${successCount}`);
  console.log(`   ⏭️  Skipped: ${skipCount}`);
  console.log(`   ❌ Errors: ${errorCount}`);
  console.log(`   📦 Total: ${packages.length}\n`);
}

importPackages().catch(console.error);
