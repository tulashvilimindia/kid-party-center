# How to Run the Updated Seed Script

The seed data has been expanded and is ready to populate your database!

## What's Been Added:
- **Packages**: 3 → 10 (added 7 new party themes)
- **Menu Items**: 5 → 37 (added 32 new food/drinks/extras)
- **Party Slots**: 3 → 60+ (3 weeks of time slots)
- **Gallery Images**: 3 → 20 (added 17 new gallery entries)

## How to Run:

### Method 1: From your existing backend terminal
If you have a terminal where the backend is already running:
1. Stop the backend (Ctrl+C)
2. Run: `node seed.js`
3. Restart backend: `npm run develop`

### Method 2: In a new terminal
1. Open a new terminal/command prompt
2. Navigate to: `C:\Users\MindiaTulashvili\OneDrive\Desktop\KidParty\backend`
3. Run: `node seed.js`

### Method 3: Use the batch file
Double-click on: `C:\Users\MindiaTulashvili\OneDrive\Desktop\KidParty\backend\run-seed.bat`

## Expected Output:
```
🚀 Booting Strapi for seeding...
📦 Running seeds...
🎁 Packages seeded
🍔 Menu Items seeded
🖼️ Gallery Images seeded
🎉 Party Slots seeded
⚙️ Site Settings seeded
✅ Seeding complete!
```

## Note:
The seed script is smart and won't create duplicates. It only adds new data that doesn't exist yet.

## After Seeding:
Your Strapi backend will have rich demo data ready to use!
- Check Strapi admin at: http://localhost:1337/admin
- Verify the new content types have been populated
