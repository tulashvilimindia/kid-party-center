// seed.js — FINAL FIXED VERSION (no duplicates, no crashes)

const strapi = require("@strapi/strapi");
const path = require("path");

(async () => {
  console.log("🚀 Booting Strapi for seeding...");

  const app = await strapi().load();
  await app.start();

  console.log("📦 Running seeds...");

  const entityService = strapi.entityService;

  // -----------------------------
  // 1. Helper: create only if not exists
  // -----------------------------
  async function createIfNotExists(model, where, data) {
    const existing = await entityService.findMany(model, { filters: where });
    if (existing && existing.length > 0) {
      return existing[0];
    }
    return await entityService.create(model, { data });
  }

  // -----------------------------
  // Packages
  // -----------------------------
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

  for (const pkg of packages) {
    await createIfNotExists("api::package.package", { slug: pkg.slug }, pkg);
  }

  console.log("🎁 Packages seeded");

  // -----------------------------
  // Menu Items
  // -----------------------------
  const menuItems = [
    // Food Items
    { name: "French Fries", category: "food", pricePerChild: 3.5, description: "Crispy golden fries" },
    { name: "Chicken Nuggets", category: "food", pricePerChild: 4.0, description: "Tender chicken bites" },
    { name: "Mini Pizzas", category: "food", pricePerChild: 5.5, description: "Personal size cheese pizza" },
    { name: "Hot Dogs", category: "food", pricePerChild: 4.5, description: "Classic hot dogs with buns" },
    { name: "Pasta Bolognese", category: "food", pricePerChild: 6.0, description: "Spaghetti with meat sauce" },
    { name: "Mac & Cheese", category: "food", pricePerChild: 5.0, description: "Creamy macaroni and cheese" },
    { name: "Mini Burgers", category: "food", pricePerChild: 6.5, description: "Slider burgers with cheese" },
    { name: "Fish Fingers", category: "food", pricePerChild: 5.5, description: "Crispy breaded fish sticks" },
    { name: "Veggie Sticks & Dip", category: "food", pricePerChild: 3.0, description: "Carrots, celery with ranch" },
    { name: "Cheese Quesadillas", category: "food", pricePerChild: 5.0, description: "Grilled tortillas with melted cheese" },
    { name: "Popcorn Chicken", category: "food", pricePerChild: 4.5, description: "Bite-sized crispy chicken" },

    // Drinks
    { name: "Fresh Juice", category: "drinks", pricePerChild: 2.0, description: "Orange or apple juice" },
    { name: "Lemonade", category: "drinks", pricePerChild: 2.5, description: "Fresh squeezed lemonade" },
    { name: "Milkshakes", category: "drinks", pricePerChild: 4.0, description: "Chocolate, vanilla, or strawberry" },
    { name: "Soft Drinks", category: "drinks", pricePerChild: 2.0, description: "Cola, sprite, or fanta" },
    { name: "Fruit Smoothies", category: "drinks", pricePerChild: 4.5, description: "Mixed berry or tropical" },
    { name: "Hot Chocolate", category: "drinks", pricePerChild: 3.0, description: "Warm cocoa with marshmallows" },
    { name: "Iced Tea", category: "drinks", pricePerChild: 2.5, description: "Peach or lemon flavored" },
    { name: "Water Bottles", category: "drinks", pricePerChild: 1.5, description: "Still or sparkling" },

    // Desserts
    { name: "Chocolate Cake", category: "dessert", pricePerChild: 3.0, description: "Rich chocolate layer cake" },
    { name: "Ice Cream Sundae", category: "dessert", pricePerChild: 4.0, description: "Vanilla ice cream with toppings" },
    { name: "Cupcakes", category: "dessert", pricePerChild: 3.5, description: "Assorted flavored cupcakes" },
    { name: "Brownies", category: "dessert", pricePerChild: 3.0, description: "Fudgy chocolate brownies" },
    { name: "Fruit Platter", category: "dessert", pricePerChild: 3.5, description: "Fresh seasonal fruits" },
    { name: "Cookies", category: "dessert", pricePerChild: 2.5, description: "Chocolate chip or sugar cookies" },
    { name: "Donuts", category: "dessert", pricePerChild: 3.0, description: "Glazed and decorated donuts" },
    { name: "Candy Bar", category: "dessert", pricePerChild: 5.0, description: "Assorted candy station" },
    { name: "Pudding Cups", category: "dessert", pricePerChild: 2.5, description: "Chocolate or vanilla pudding" },

    // Extras
    { name: "Balloon Decoration", category: "extras", pricePerChild: 5.0, description: "Colorful balloon arrangements" },
    { name: "Party Bags", category: "extras", pricePerChild: 4.0, description: "Take-home goodie bags" },
    { name: "Face Painting", category: "extras", pricePerChild: 6.0, description: "Professional face painting" },
    { name: "Magic Show", category: "extras", pricePerChild: 8.0, description: "30-minute magic performance" },
    { name: "Balloon Animals", category: "extras", pricePerChild: 5.0, description: "Custom balloon creations" },
    { name: "Photo Booth", category: "extras", pricePerChild: 7.0, description: "Props and instant prints" },
    { name: "Piñata", category: "extras", pricePerChild: 6.0, description: "Filled with candy and toys" },
    { name: "Cotton Candy Machine", category: "extras", pricePerChild: 5.5, description: "Fresh cotton candy service" },
  ];

  for (const item of menuItems) {
    await createIfNotExists(
      "api::menu-item.menu-item",
      { name: item.name },
      item
    );
  }

  console.log("🍔 Menu Items seeded");

  // -----------------------------
  // Gallery Images
  // -----------------------------
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

  for (const img of gallery) {
    await createIfNotExists(
      "api::gallery-image.gallery-image",
      { title: img.title },
      img
    );
  }

  console.log("🖼️ Gallery Images seeded");

  // -----------------------------
  // Party Slots
  // -----------------------------
  const slots = [];

  // Generate slots for next 3 weeks (21 days)
  const startDate = new Date('2025-12-08');
  const timeSlots = [
    { start: "10:00:00.000", end: "12:00:00.000" },
    { start: "12:30:00.000", end: "14:30:00.000" },
    { start: "15:00:00.000", end: "17:00:00.000" },
    { start: "17:30:00.000", end: "19:30:00.000" },
  ];

  for (let day = 0; day < 21; day++) {
    const currentDate = new Date(startDate);
    currentDate.setDate(startDate.getDate() + day);
    const dateStr = currentDate.toISOString().split('T')[0];

    // Skip some Mondays (business closed)
    const dayOfWeek = currentDate.getDay();
    if (dayOfWeek === 1 && Math.random() > 0.5) continue;

    // Add multiple time slots per day
    const slotsPerDay = dayOfWeek === 0 || dayOfWeek === 6 ? 4 : 3; // More slots on weekends

    for (let i = 0; i < slotsPerDay; i++) {
      const timeSlot = timeSlots[i];
      const rand = Math.random();
      let status, bookedParties;

      // Randomize booking status
      if (rand < 0.5) {
        status = "available";
        bookedParties = 0;
      } else if (rand < 0.8) {
        status = "limited";
        bookedParties = 1;
      } else {
        status = "booked";
        bookedParties = 2;
      }

      // Future dates more likely to be available
      if (day > 14) {
        status = "available";
        bookedParties = 0;
      }

      slots.push({
        date: dateStr,
        startTime: timeSlot.start,
        endTime: timeSlot.end,
        status: status,
        maxParties: 2,
        bookedParties: bookedParties
      });
    }
  }

  for (const slot of slots) {
    await createIfNotExists(
      "api::party-slot.party-slot",
      {
        date: slot.date,
        startTime: slot.startTime,
        endTime: slot.endTime,
      },
      slot
    );
  }

  console.log("🎉 Party Slots seeded");

  // -----------------------------
  // Site Settings (Single Type)
  // -----------------------------
  const settings = {
    heroTitle: "Unforgettable Kids Parties in Batumi!",
    heroSubtitle: "Fun, safe, magical experiences for children.",
    address: "Batumi, Georgia",
    phone: "+995 577 123 456",
    email: "info@beqaparty.ge",
    instagramUrl: "https://instagram.com/beqaparty",
    facebookUrl: "https://facebook.com/beqaparty"
  };

  await entityService.createOrUpdate("api::site-setting.site-setting", {
    data: settings,
  });

  console.log("⚙️ Site Settings seeded");

  console.log("✅ Seeding complete!");

  await app.destroy();
  process.exit(0);
})();