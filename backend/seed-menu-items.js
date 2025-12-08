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

console.log('🍔 Menu Items data ready to import');
console.log(`Total items: ${menuItems.length}`);
console.log(`- Food: ${menuItems.filter(i => i.category === 'food').length}`);
console.log(`- Drinks: ${menuItems.filter(i => i.category === 'drinks').length}`);
console.log(`- Desserts: ${menuItems.filter(i => i.category === 'dessert').length}`);
console.log(`- Extras: ${menuItems.filter(i => i.category === 'extras').length}`);
console.log('\nTo import via Strapi Admin:');
console.log('1. Go to http://localhost:1337/admin');
console.log('2. Navigate to Content Manager > Menu Item');
console.log('3. Create entries manually or use the data below\n');
console.log(JSON.stringify(menuItems, null, 2));
