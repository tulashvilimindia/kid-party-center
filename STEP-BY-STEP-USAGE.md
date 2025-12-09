# 🎯 Step-by-Step Usage Guide

## ⚠️ IMPORTANT: Strapi Must Be STOPPED Before Populating!

**YES, you MUST shut down Strapi before running the population script!**

### Why?
- SQLite database can only be written to by one process at a time
- If Strapi is running, it locks the database
- The population script won't be able to write data
- You'll get a "database is locked" error

---

## 📋 Complete Step-by-Step Guide

### 🔴 Step 1: Stop Strapi Backend (If Running)

**Check if backend is running:**
- Look for a terminal window with Strapi running
- You'll see text like "Welcome back!" and "Server running on http://localhost:1337"

**To stop it:**
```bash
# In the terminal where Strapi is running:
Press Ctrl+C

# Wait for it to fully stop (should take 1-2 seconds)
```

**Confirmation:**
- Terminal shows prompt again (like `C:\Users\...>`)
- No "Server running" message
- Backend terminal is idle

---

### ✅ Step 2: Run the Population Script

Now that Strapi is stopped, you can populate the database.

#### 🪟 Option A: Windows (Easiest!)

1. Open File Explorer
2. Navigate to: `C:\Users\MindiaTulashvili\OneDrive\Desktop\KidParty\backend`
3. Find file: `populate-cms.bat`
4. **Double-click** `populate-cms.bat`

You'll see:
```
========================================================
  ONE-CLICK CMS POPULATION
========================================================

This will populate your CMS with:
  - 3 Site Settings (EN, KA, RU)
  - 21 Navigation Menus (7 items x 3 languages)
  - 3 Social Links

Press any key to continue . . .
```

5. Press **Enter** or **Space**

The script will run and show:
```
═══════════════════════════════════════════════════════
  🚀 ONE-CLICK CMS AUTO-POPULATION
═══════════════════════════════════════════════════════

✅ Database found

📊 Step 1/4: Analyzing database structure...
✅ Analysis complete!

🎨 Step 2/4: Generating INSERT statements...
✅ SQL generated!

💾 Step 3/4: Executing SQL...
✅ SQL executed successfully!

🔍 Step 4/4: Verifying data...
   ✅ Site Settings: 3 entries (expected: 3)
   ✅ Navigation Menus: 21 entries (expected: 21)
   ✅ Social Links: 3 entries (expected: 3)

═══════════════════════════════════════════════════════
  ✅ ALL DATA POPULATED SUCCESSFULLY! 🎉
═══════════════════════════════════════════════════════
```

6. Press **Enter** to close the window

---

#### 💻 Option B: Command Line

1. Open **Command Prompt** or **PowerShell**

2. Navigate to backend folder:
```bash
cd "C:\Users\MindiaTulashvili\OneDrive\Desktop\KidParty\backend"
```

3. Run the script:
```bash
node scripts/auto-populate.js
```

4. Wait for success message (same output as Option A)

---

### 🟢 Step 3: Restart Strapi Backend

Now that data is populated, restart Strapi to load the new data.

**In the same terminal (or open a new one):**

```bash
# Navigate to backend folder (if not already there)
cd "C:\Users\MindiaTulashvili\OneDrive\Desktop\KidParty\backend"

# Start Strapi
npm run develop
```

**Wait for:**
```
 Project information

┌────────────────────────────────────────────────────────────────┐
│                                                                │
│   Time               Mon Jan 15 2025 10:00:00                 │
│   Launched in        5000 ms                                   │
│                                                                │
│   Environment        development                               │
│   Process PID        12345                                     │
│                                                                │
│   Version            5.3.1 (node v18.x.x)                     │
│   Edition            Community                                 │
│                                                                │
│   Host               http://localhost:1337                     │
│   Port               1337                                      │
│                                                                │
└────────────────────────────────────────────────────────────────┘

Welcome back!
To manage your project ⚡, go to the administration panel at:
http://localhost:1337/admin
```

**Keep this terminal open!** Strapi is now running.

---

### 🌐 Step 4: Verify in Strapi Admin

1. Open browser
2. Go to: http://localhost:1337/admin
3. Login with your admin credentials
4. Go to **Content Manager**

**Check:**
- ✅ **Site Setting** - Should show 3 locales (en, ka, ru)
- ✅ **Navigation Menus** - Should show 21 entries
- ✅ **Social Links** - Should show 3 entries

**To see different languages:**
- Click on a Site Setting entry
- Look for language selector dropdown (EN/KA/RU)
- Switch between languages to see translations

---

### 🎨 Step 5: Start Frontend

**Open a NEW terminal** (don't close the backend terminal!)

```bash
# Navigate to frontend folder
cd "C:\Users\MindiaTulashvili\OneDrive\Desktop\KidParty\frontend"

# Start frontend
npm run dev
```

**Wait for:**
```
  VITE v5.0.0  ready in 500 ms

  ➜  Local:   http://localhost:3000/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
```

**Keep this terminal open too!** Frontend is now running.

---

### 🎉 Step 6: Test the Website!

1. Open browser
2. Go to: http://localhost:3000

**You should see:**
- ✅ Navigation menu (Home, Packages, etc.)
- ✅ Hero section with title and subtitle
- ✅ Language switcher in top-right (🇬🇧 🇬🇪 🇷🇺)

**Test language switching:**
1. Click **🇬🇪 KA** (Georgian flag)
   - Navigation changes to Georgian
   - Content changes to Georgian
   - URL updates to `http://localhost:3000/?lng=ka`

2. Click **🇷🇺 RU** (Russian flag)
   - Everything changes to Russian
   - URL updates to `http://localhost:3000/?lng=ru`

3. Click **🇬🇧 EN** (English flag)
   - Back to English

**Everything should translate smoothly!** 🎉

---

## 📊 Visual Flow

```
┌─────────────────────────┐
│  1. Stop Strapi         │  ← IMPORTANT! Press Ctrl+C
│     (Ctrl+C)            │
└───────────┬─────────────┘
            │
            ▼
┌─────────────────────────┐
│  2. Run Population      │  ← Double-click populate-cms.bat
│     Script              │    or: node scripts/auto-populate.js
└───────────┬─────────────┘
            │
            ▼
┌─────────────────────────┐
│  3. Wait for Success    │  ← See: ✅ ALL DATA POPULATED SUCCESSFULLY!
│     Message             │
└───────────┬─────────────┘
            │
            ▼
┌─────────────────────────┐
│  4. Restart Strapi      │  ← npm run develop
│                         │    (keep terminal open)
└───────────┬─────────────┘
            │
            ▼
┌─────────────────────────┐
│  5. Verify in Admin     │  ← http://localhost:1337/admin
│                         │    Check content is there
└───────────┬─────────────┘
            │
            ▼
┌─────────────────────────┐
│  6. Start Frontend      │  ← npm run dev (new terminal)
│                         │    (keep terminal open)
└───────────┬─────────────┘
            │
            ▼
┌─────────────────────────┐
│  7. Test Website        │  ← http://localhost:3000
│     & Languages         │    Switch: 🇬🇧 → 🇬🇪 → 🇷🇺
└─────────────────────────┘
```

---

## ⚠️ Common Mistakes

### ❌ Mistake #1: Not Stopping Strapi First
**Error you'll see:**
```
Error: database is locked
```

**Solution:**
1. Press Ctrl+C in Strapi terminal
2. Wait for it to stop
3. Run population script again

---

### ❌ Mistake #2: Closing Terminal After Population
**Problem:** Script completes, you close the window, but data isn't saved

**Solution:**
- Let the script complete fully (shows success message)
- Script uses transactions, so data is committed
- Just make sure you see "✅ ALL DATA POPULATED SUCCESSFULLY!"

---

### ❌ Mistake #3: Running Script While Backend Is Running
**Error you'll see:**
```
Error: SQLITE_BUSY: database is locked
```

**Solution:**
- Stop Strapi first (Ctrl+C)
- Run population script
- Restart Strapi

---

### ❌ Mistake #4: Not Restarting Strapi After Population
**Problem:** Admin panel shows old data or no data

**Solution:**
- Restart Strapi: Press Ctrl+C, then `npm run develop`
- Strapi caches content, restart loads new data

---

## 🔍 Verification Commands

After population, you can verify data directly in database:

### Option A: VSCode SQLite Extension
1. Open VSCode
2. Open file: `backend/.tmp/data.db`
3. Right-click → "Open Database"
4. Run these queries:

```sql
-- Check counts
SELECT COUNT(*) as count FROM site_settings;        -- Should be 3
SELECT COUNT(*) as count FROM navigation_menus;     -- Should be 21
SELECT COUNT(*) as count FROM social_links;         -- Should be 3

-- Check actual data
SELECT id, locale, hero_title FROM site_settings;
SELECT id, label, locale, "order" FROM navigation_menus ORDER BY "order", locale;
SELECT * FROM social_links;
```

### Option B: Command Line SQLite
```bash
cd backend
sqlite3 .tmp/data.db

# Run queries
SELECT COUNT(*) FROM site_settings;
SELECT COUNT(*) FROM navigation_menus;
SELECT COUNT(*) FROM social_links;

# Exit
.quit
```

---

## 🎯 Quick Checklist

Before running:
- [ ] Strapi backend is **STOPPED** (Ctrl+C)
- [ ] You're in the backend folder
- [ ] Database file exists at `backend/.tmp/data.db`

After running:
- [ ] Saw success message: "✅ ALL DATA POPULATED SUCCESSFULLY!"
- [ ] Saw correct counts (3, 21, 3)
- [ ] No error messages

After restart:
- [ ] Strapi starts without errors
- [ ] Can access admin panel (http://localhost:1337/admin)
- [ ] Can see content in Content Manager
- [ ] Frontend shows translated content (http://localhost:3000)
- [ ] Language switcher works

---

## 🆘 If Something Goes Wrong

### Backend won't start after population?
```bash
# Check for errors in the terminal
# Common issue: port 1337 already in use

# Solution:
# 1. Find and kill the process using port 1337
# 2. Or restart your computer
# 3. Then: npm run develop
```

### Data not showing in admin?
```bash
# Solution:
# 1. Hard refresh browser: Ctrl+Shift+R
# 2. Clear browser cache
# 3. Restart Strapi: Ctrl+C, then npm run develop
```

### Frontend not showing translations?
```bash
# Solution:
# 1. Make sure backend is running
# 2. Hard refresh browser: Ctrl+Shift+R
# 3. Check browser console for errors (F12)
# 4. Verify data in Strapi admin
```

### "Database is locked" error?
```bash
# Solution:
# 1. Stop Strapi completely (Ctrl+C)
# 2. Wait 5 seconds
# 3. Run population script again
```

---

## 💡 Pro Tips

### Tip #1: Keep Both Terminals Open
```
Terminal 1: Backend (npm run develop)
Terminal 2: Frontend (npm run dev)

Don't close them! Just minimize.
```

### Tip #2: Backup Before Populating
```bash
# Optional but recommended
cd backend/.tmp
copy data.db data.db.backup
```

### Tip #3: Use Windows Batch File
```
It's the easiest way!
Just double-click: backend/populate-cms.bat
```

### Tip #4: Check Output Carefully
```
Look for:
✅ Green checkmarks = Success
❌ Red X marks = Problem

If you see errors, read them carefully!
```

### Tip #5: One-Time Setup
```
You only need to populate ONCE!
After that, manage content in Strapi Admin.
```

---

## 🎉 Expected Timeline

```
Step 1: Stop Strapi                    5 seconds
Step 2: Run population script          30 seconds
Step 3: Restart Strapi                 10 seconds
Step 4: Verify in admin                1 minute
Step 5: Start frontend                 5 seconds
Step 6: Test website                   1 minute

TOTAL TIME: ~3 minutes
```

---

## 📞 Still Need Help?

If something doesn't work:

1. **Check the error message** - Read it carefully
2. **Look in QUICK-REFERENCE.md** - Has common fixes
3. **Check browser console** - Press F12, look for errors
4. **Verify terminals are running** - Both backend and frontend should be active

---

## ✅ Success Indicators

You'll know it worked when:

✅ **Population script shows:**
```
✅ Site Settings: 3 entries (expected: 3)
✅ Navigation Menus: 21 entries (expected: 21)
✅ Social Links: 3 entries (expected: 3)
✅ ALL DATA POPULATED SUCCESSFULLY! 🎉
```

✅ **Strapi Admin shows:**
- Site Setting with 3 locales
- Navigation Menus with 21 entries
- Social Links with 3 entries

✅ **Frontend shows:**
- Navigation menu in header
- Language switcher (🇬🇧 🇬🇪 🇷🇺)
- Content that changes when you switch languages

---

## 🚀 You're Ready!

Now you know exactly how to:
1. ✅ Stop Strapi before populating
2. ✅ Run the population script
3. ✅ Restart and verify
4. ✅ Test the multilingual website

**Go ahead and populate your CMS!** 🎈🎉

---

**Quick Command Summary:**
```bash
# 1. Stop Strapi (if running)
Ctrl+C in backend terminal

# 2. Populate (choose one)
Double-click: backend/populate-cms.bat
OR: node scripts/auto-populate.js

# 3. Restart Strapi
npm run develop

# 4. Start frontend (new terminal)
cd frontend && npm run dev

# 5. Visit: http://localhost:3000
```

**That's it!** 🎉
