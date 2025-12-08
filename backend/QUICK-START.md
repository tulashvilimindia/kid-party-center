# 🚀 Quick Start - Import Data Securely

## Step 1: Install Dependencies

```bash
cd /mnt/c/Users/MindiaTulashvili/OneDrive/Desktop/KidParty/backend
npm install dotenv
```

## Step 2: Create API Token in Strapi

1. Open http://localhost:1337/admin
2. Go to **Settings** → **API Tokens**
3. Click **+ Create new API Token**
4. Fill in:
   - **Name**: `Data Importer`
   - **Token duration**: `Unlimited`
   - **Token type**: Select **Custom** and check these permissions:
     - **Package**: ✅ create, ✅ find, ✅ findOne
     - **Menu-item**: ✅ create, ✅ find, ✅ findOne
     - **Party-slot**: ✅ create, ✅ find, ✅ findOne
     - **Gallery-image**: ✅ create, ✅ find, ✅ findOne
5. Click **Save**
6. **COPY THE TOKEN** (you'll only see it once!)

## Step 3: Create .env File

In the `backend` folder, create or edit `.env`:

```bash
echo "STRAPI_API_TOKEN=your_token_here" >> .env
```

Replace `your_token_here` with the token you copied.

## Step 4: Run Import

```bash
node import-all.js
```

## ✅ Expected Output

```
╔═══════════════════════════════════════════════════════════╗
║        🎉 KidParty Data Import - Starting...  🎉         ║
╚═══════════════════════════════════════════════════════════╝

📦 Starting packages import...
✅ Created "Basic Fun Party"
✅ Created "Princess Party"
✅ Created "Superhero Training Camp"
... (and 7 more)

📊 Import Summary:
   ✅ Created: 10
   ⏭️  Skipped: 0
   ❌ Errors: 0

🍔 Starting menu items import...
✅ Created "French Fries" (food)
✅ Created "Mini Pizzas" (food)
... (and 35 more)

📊 Import Summary:
   ✅ Created: 37
   ⏭️  Skipped: 0
   ❌ Errors: 0

... (party slots and gallery images)

╔═══════════════════════════════════════════════════════════╗
║        ✅ ALL IMPORTS COMPLETED SUCCESSFULLY! ✅         ║
║                                                           ║
║   Your KidParty backend is now fully populated with:     ║
║   • 10 Party Packages                                    ║
║   • 37 Menu Items                                        ║
║   • 60+ Party Slots                                      ║
║   • 20 Gallery Images                                    ║
╚═══════════════════════════════════════════════════════════╝
```

## 🔒 Security (Optional)

After importing, you can delete the API token:
1. Go to **Settings** → **API Tokens**
2. Delete the "Data Importer" token
3. Remove or comment out the line in `.env`

## 📝 What Changed

All import scripts now:
- ✅ Use secure API token authentication
- ✅ Load token from `.env` file
- ✅ Show warning if token is missing
- ✅ Use Bearer token in Authorization header

No more need for public API access!
