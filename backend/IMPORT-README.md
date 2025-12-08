# 🎉 KidParty Data Import Scripts

API-based import scripts to populate your Strapi backend with demo data.

## 📦 What's Included

- **10 Party Packages** - Various themed birthday party options
- **37 Menu Items** - Food, drinks, desserts, and extras
- **60+ Party Slots** - 3 weeks of time slot availability
- **20 Gallery Images** - Photo gallery placeholders

## 🚀 Quick Start

### Step 1: Install axios (required for API calls)

```bash
cd /mnt/c/Users/MindiaTulashvili/OneDrive/Desktop/KidParty/backend
npm install axios
```

### Step 2: Make sure Strapi is running

Your backend should already be running. If not:
```bash
npm run develop
```

### Step 3: Enable Public API Access

Before importing, you need to enable public access to the APIs:

1. Go to http://localhost:1337/admin
2. Navigate to **Settings** → **Users & Permissions Plugin** → **Roles** → **Public**
3. Enable the following permissions:
   - **Package**: `find`, `findOne`, `create`
   - **Menu-item**: `find`, `findOne`, `create`
   - **Party-slot**: `find`, `findOne`, `create`
   - **Gallery-image**: `find`, `findOne`, `create`
4. Click **Save**

### Step 4: Run the Import

**Option A: Import Everything at Once**
```bash
node import-all.js
```

**Option B: Import One by One**
```bash
node import-packages.js
node import-menu-items.js
node import-party-slots.js
node import-gallery.js
```

## ✨ Features

- **Smart Deduplication**: Won't create duplicates if data already exists
- **Progress Tracking**: Shows detailed progress for each import
- **Error Handling**: Reports any failures with error messages
- **Summary Stats**: Displays counts of created, skipped, and failed items

## 📊 Expected Output

```
╔═══════════════════════════════════════════════════════════╗
║        🎉 KidParty Data Import - Starting...  🎉         ║
╚═══════════════════════════════════════════════════════════╝

📦 Starting packages import...

✅ Created "Basic Fun Party"
✅ Created "Princess Party"
✅ Created "Superhero Training Camp"
...

📊 Import Summary:
   ✅ Created: 10
   ⏭️  Skipped: 0
   ❌ Errors: 0
   📦 Total: 10
```

## 🔧 Troubleshooting

### Error: "Cannot find module 'axios'"
```bash
npm install axios
```

### Error: "403 Forbidden"
Enable public access to APIs (see Step 3 above)

### Error: "ECONNREFUSED"
Make sure Strapi is running:
```bash
npm run develop
```

### Error: "Content type not found"
Verify that your content types exist in Strapi admin

## 📝 File Descriptions

- `import-all.js` - Master script that runs all imports sequentially
- `import-packages.js` - Imports party packages
- `import-menu-items.js` - Imports menu items (food, drinks, desserts, extras)
- `import-party-slots.js` - Imports time slot availability
- `import-gallery.js` - Imports gallery image placeholders

## 🎯 After Importing

1. Check your data at: http://localhost:1337/admin
2. Navigate to **Content Manager** to view all imported items
3. You can publish/unpublish items as needed
4. Add images to packages, menu items, and gallery entries

## ⚠️ Note

These scripts import data via the Strapi REST API. Make sure:
- Strapi backend is running
- API permissions are configured correctly
- No firewall is blocking localhost:1337
