const Database = require('better-sqlite3');
const path = require('path');

const dbPath = path.join(__dirname, '.tmp', 'data.db');
const db = new Database(dbPath);

console.log('🎉 Starting direct database insert...\n');

// Helper function to get current timestamp
const now = () => new Date().toISOString();

try {
  // Start transaction for better performance
  db.exec('BEGIN TRANSACTION');

  // ========================================
  // 1. INSERT PACKAGES
  // ========================================
  console.log('📦 Inserting packages...');

  const packages = [
    {
      name: "Super Adventure Party",
      slug: "super-adventure-party",
      short_description: "Adventure-themed birthday experience.",
      full_description: "Obstacle course, games, and themed decorations.",
      duration_minutes: 120,
      price_per_child: 35,
      min_guests: 8,
      max_guests: 25,
    },
    {
      name: "Mega VIP Party",
      slug: "mega-vip-party",
      short_description: "Premium party with full VIP treatment.",
      full_description: "Exclusive room, premium menu, and more.",
      duration_minutes: 150,
      price_per_child: 50,
      min_guests: 10,
      max_guests: 30,
    },
    {
      name: "Princess Party",
      slug: "princess-party",
      short_description: "A magical experience for little princesses.",
      full_description: "Transform into royalty with dress-up, tiaras, and a royal tea party.",
      duration_minutes: 120,
      price_per_child: 40,
      min_guests: 6,
      max_guests: 15,
    },
    {
      name: "Superhero Training Camp",
      slug: "superhero-training-camp",
      short_description: "Train to become a superhero!",
      full_description: "Action-packed party with superhero training, games, and cape decorating.",
      duration_minutes: 120,
      price_per_child: 38,
      min_guests: 8,
      max_guests: 20,
    },
    {
      name: "Science Lab Party",
      slug: "science-lab-party",
      short_description: "Explosive fun with science experiments!",
      full_description: "Interactive science experiments with slime, volcanoes, and more.",
      duration_minutes: 90,
      price_per_child: 32,
      min_guests: 6,
      max_guests: 18,
    },
    {
      name: "Art Studio Party",
      slug: "art-studio-party",
      short_description: "Unleash creativity with art projects.",
      full_description: "Paint, create, and explore artistic talents with guided projects.",
      duration_minutes: 100,
      price_per_child: 30,
      min_guests: 5,
      max_guests: 16,
    },
    {
      name: "Sports Champions Party",
      slug: "sports-champions-party",
      short_description: "Active sports party for energetic kids.",
      full_description: "Multi-sport activities including soccer, basketball, and relay races.",
      duration_minutes: 120,
      price_per_child: 33,
      min_guests: 10,
      max_guests: 25,
    },
    {
      name: "Gaming Party",
      slug: "gaming-party",
      short_description: "Epic gaming tournament for gamers.",
      full_description: "Video game stations with popular multiplayer games and tournaments.",
      duration_minutes: 120,
      price_per_child: 35,
      min_guests: 6,
      max_guests: 16,
    },
    {
      name: "Dinosaur Discovery Party",
      slug: "dinosaur-discovery-party",
      short_description: "Journey back to prehistoric times!",
      full_description: "Dinosaur-themed adventure with fossil digging, games, and activities.",
      duration_minutes: 110,
      price_per_child: 36,
      min_guests: 8,
      max_guests: 20,
    },
    {
      name: "Dance Party Extravaganza",
      slug: "dance-party-extravaganza",
      short_description: "Dance, music, and lights show!",
      full_description: "Professional DJ, disco lights, and dance competitions.",
      duration_minutes: 120,
      price_per_child: 37,
      min_guests: 10,
      max_guests: 30,
    },
  ];

  const insertPackage = db.prepare(`
    INSERT INTO packages (
      name, slug, short_description, full_description,
      duration_minutes, price_per_child, min_guests, max_guests,
      created_at, updated_at, published_at, created_by_id, updated_by_id
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NULL, NULL)
  `);

  let packageCount = 0;
  for (const pkg of packages) {
    try {
      insertPackage.run(
        pkg.name,
        pkg.slug,
        pkg.short_description,
        pkg.full_description,
        pkg.duration_minutes,
        pkg.price_per_child,
        pkg.min_guests,
        pkg.max_guests,
        now(),
        now(),
        now()
      );
      console.log(`  ✅ ${pkg.name}`);
      packageCount++;
    } catch (err) {
      if (err.message.includes('UNIQUE constraint')) {
        console.log(`  ⏭️  ${pkg.name} (already exists)`);
      } else {
        console.error(`  ❌ ${pkg.name}: ${err.message}`);
      }
    }
  }

  // ========================================
  // 2. INSERT MENU ITEMS
  // ========================================
  console.log('\n🍔 Inserting menu items...');

  const menuItems = [
    // Food
    { name: "Mini Pizzas", category: "food", price_per_child: 5.5, description: "Personal size cheese pizza" },
    { name: "Hot Dogs", category: "food", price_per_child: 4.5, description: "Classic hot dogs with buns" },
    { name: "Pasta Bolognese", category: "food", price_per_child: 6.0, description: "Spaghetti with meat sauce" },
    { name: "Mac & Cheese", category: "food", price_per_child: 5.0, description: "Creamy macaroni and cheese" },
    { name: "Mini Burgers", category: "food", price_per_child: 6.5, description: "Slider burgers with cheese" },
    { name: "Fish Fingers", category: "food", price_per_child: 5.5, description: "Crispy breaded fish sticks" },
    { name: "Veggie Sticks & Dip", category: "food", price_per_child: 3.0, description: "Carrots, celery with ranch" },
    { name: "Cheese Quesadillas", category: "food", price_per_child: 5.0, description: "Grilled tortillas with melted cheese" },
    { name: "Popcorn Chicken", category: "food", price_per_child: 4.5, description: "Bite-sized crispy chicken" },

    // Drinks
    { name: "Lemonade", category: "drinks", price_per_child: 2.5, description: "Fresh squeezed lemonade" },
    { name: "Milkshakes", category: "drinks", price_per_child: 4.0, description: "Chocolate, vanilla, or strawberry" },
    { name: "Soft Drinks", category: "drinks", price_per_child: 2.0, description: "Cola, sprite, or fanta" },
    { name: "Fruit Smoothies", category: "drinks", price_per_child: 4.5, description: "Mixed berry or tropical" },
    { name: "Hot Chocolate", category: "drinks", price_per_child: 3.0, description: "Warm cocoa with marshmallows" },
    { name: "Iced Tea", category: "drinks", price_per_child: 2.5, description: "Peach or lemon flavored" },
    { name: "Water Bottles", category: "drinks", price_per_child: 1.5, description: "Still or sparkling" },

    // Desserts
    { name: "Ice Cream Sundae", category: "dessert", price_per_child: 4.0, description: "Vanilla ice cream with toppings" },
    { name: "Cupcakes", category: "dessert", price_per_child: 3.5, description: "Assorted flavored cupcakes" },
    { name: "Brownies", category: "dessert", price_per_child: 3.0, description: "Fudgy chocolate brownies" },
    { name: "Fruit Platter", category: "dessert", price_per_child: 3.5, description: "Fresh seasonal fruits" },
    { name: "Cookies", category: "dessert", price_per_child: 2.5, description: "Chocolate chip or sugar cookies" },
    { name: "Donuts", category: "dessert", price_per_child: 3.0, description: "Glazed and decorated donuts" },
    { name: "Candy Bar", category: "dessert", price_per_child: 5.0, description: "Assorted candy station" },
    { name: "Pudding Cups", category: "dessert", price_per_child: 2.5, description: "Chocolate or vanilla pudding" },

    // Extras
    { name: "Party Bags", category: "extras", price_per_child: 4.0, description: "Take-home goodie bags" },
    { name: "Magic Show", category: "extras", price_per_child: 8.0, description: "30-minute magic performance" },
    { name: "Balloon Animals", category: "extras", price_per_child: 5.0, description: "Custom balloon creations" },
    { name: "Photo Booth", category: "extras", price_per_child: 7.0, description: "Props and instant prints" },
    { name: "Piñata", category: "extras", price_per_child: 6.0, description: "Filled with candy and toys" },
    { name: "Cotton Candy Machine", category: "extras", price_per_child: 5.5, description: "Fresh cotton candy service" },
  ];

  const insertMenuItem = db.prepare(`
    INSERT INTO menu_items (
      name, category, price_per_child, description,
      created_at, updated_at, published_at, created_by_id, updated_by_id
    ) VALUES (?, ?, ?, ?, ?, ?, ?, NULL, NULL)
  `);

  let menuCount = 0;
  for (const item of menuItems) {
    try {
      insertMenuItem.run(
        item.name,
        item.category,
        item.price_per_child,
        item.description,
        now(),
        now(),
        now()
      );
      console.log(`  ✅ ${item.name} (${item.category})`);
      menuCount++;
    } catch (err) {
      if (err.message.includes('UNIQUE constraint')) {
        console.log(`  ⏭️  ${item.name} (already exists)`);
      } else {
        console.error(`  ❌ ${item.name}: ${err.message}`);
      }
    }
  }

  // ========================================
  // 3. INSERT PARTY SLOTS
  // ========================================
  console.log('\n🎉 Inserting party slots...');

  const insertSlot = db.prepare(`
    INSERT INTO party_slots (
      date, start_time, end_time, status, max_parties, booked_parties,
      created_at, updated_at, published_at, created_by_id, updated_by_id
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, NULL, NULL)
  `);

  const slots = [];
  const startDate = new Date('2025-12-09');
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
    const dayOfWeek = currentDate.getDay();

    if (dayOfWeek === 1 && Math.random() > 0.5) continue;

    const slotsPerDay = dayOfWeek === 0 || dayOfWeek === 6 ? 4 : 3;

    for (let i = 0; i < slotsPerDay; i++) {
      const timeSlot = timeSlots[i];
      const rand = Math.random();
      let status, bookedParties;

      if (day > 14) {
        status = "available";
        bookedParties = 0;
      } else if (rand < 0.5) {
        status = "available";
        bookedParties = 0;
      } else if (rand < 0.8) {
        status = "limited";
        bookedParties = 1;
      } else {
        status = "booked";
        bookedParties = 2;
      }

      slots.push({
        date: dateStr,
        start_time: timeSlot.start,
        end_time: timeSlot.end,
        status,
        max_parties: 2,
        booked_parties: bookedParties
      });
    }
  }

  let slotCount = 0;
  for (const slot of slots) {
    try {
      insertSlot.run(
        slot.date,
        slot.start_time,
        slot.end_time,
        slot.status,
        slot.max_parties,
        slot.booked_parties,
        now(),
        now(),
        now()
      );
      slotCount++;
    } catch (err) {
      if (!err.message.includes('UNIQUE constraint')) {
        console.error(`  ❌ ${slot.date} ${slot.start_time}: ${err.message}`);
      }
    }
  }
  console.log(`  ✅ Created ${slotCount} time slots`);

  // ========================================
  // 4. INSERT GALLERY IMAGES
  // ========================================
  console.log('\n🖼️  Inserting gallery images...');

  const gallery = [
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

  const insertGallery = db.prepare(`
    INSERT INTO gallery_images (
      title, created_at, updated_at, published_at, created_by_id, updated_by_id
    ) VALUES (?, ?, ?, ?, NULL, NULL)
  `);

  let galleryCount = 0;
  for (const image of gallery) {
    try {
      insertGallery.run(image.title, now(), now(), now());
      console.log(`  ✅ ${image.title}`);
      galleryCount++;
    } catch (err) {
      if (err.message.includes('UNIQUE constraint')) {
        console.log(`  ⏭️  ${image.title} (already exists)`);
      } else {
        console.error(`  ❌ ${image.title}: ${err.message}`);
      }
    }
  }

  // Commit transaction
  db.exec('COMMIT');

  console.log('\n' + '='.repeat(60));
  console.log('✅ DATABASE INSERT COMPLETED!');
  console.log('='.repeat(60));
  console.log(`📦 Packages: ${packageCount} created`);
  console.log(`🍔 Menu Items: ${menuCount} created`);
  console.log(`🎉 Party Slots: ${slotCount} created`);
  console.log(`🖼️  Gallery Images: ${galleryCount} created`);
  console.log('='.repeat(60) + '\n');

} catch (error) {
  db.exec('ROLLBACK');
  console.error('\n❌ Error:', error.message);
  console.error('Database insert failed. Rolling back changes.\n');
  process.exit(1);
} finally {
  db.close();
}
