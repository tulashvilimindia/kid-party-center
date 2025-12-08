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

console.log('🖼️ Gallery Images data ready to import');
console.log(`Total images: ${gallery.length}`);
console.log('\nTo import via Strapi Admin:');
console.log('1. Go to http://localhost:1337/admin');
console.log('2. Navigate to Content Manager > Gallery Image');
console.log('3. Create entries manually or use the data below\n');
console.log(JSON.stringify(gallery, null, 2));
