# 🗄️ Direct SQLite Database Population Guide

## 🎯 Overview

Instead of using the Node.js script, you can insert data directly into SQLite using SQL queries.

---

## 📋 Prerequisites

1. **Backend must be running at least once** to create the database:
   ```bash
   cd backend
   npm run develop
   ```
   (You can stop it after it creates the database)

2. **SQLite extension for VSCode** installed
   - Extension: SQLite (by alexcvzz)
   - Or any SQLite client

3. **Database location:**
   ```
   C:\Users\MindiaTulashvili\OneDrive\Desktop\KidParty\backend\.tmp\data.db
   ```

---

## 🔍 Step 1: Understand Your Database Structure

1. **Open the database in VSCode:**
   - Right-click on `backend/.tmp/data.db`
   - Select "Open Database"

2. **Run the structure queries:**
   - Open: `backend/scripts/1-understand-db-structure.sql`
   - Run ALL queries
   - Copy the results

3. **Check these important things:**

   **Site Settings table columns:**
   ```sql
   PRAGMA table_info(site_settings);
   ```
   Look for columns like:
   - `hero_title` (might be `heroTitle` or `hero_title`)
   - `feature_venue_title` (might be `featureVenueTitle` or `feature_venue_title`)

   **Navigation Menus table columns:**
   ```sql
   PRAGMA table_info(navigation_menus);
   ```
   Look for:
   - `label`
   - `path`
   - `icon`
   - `order` or `"order"` (order is a reserved word in SQL)

   **Localizations link table:**
   ```sql
   SELECT name FROM sqlite_master WHERE name LIKE '%_localizations_lnk';
   ```
   Should show:
   - `site_settings_localizations_lnk`
   - `navigation_menus_localizations_lnk`

---

## ⚠️ IMPORTANT: Column Name Format

Strapi uses **snake_case** for SQLite columns, not camelCase!

**Correct format:**
```sql
hero_title          ✅
feature_venue_title ✅
is_active          ✅
```

**Wrong format:**
```sql
heroTitle          ❌
featureVenueTitle  ❌
isActive           ❌
```

---

## 🚀 Step 2: Populate the Data

### Option A: If column names match (snake_case)

Just run the SQL file as-is:

1. Open: `backend/scripts/2-populate-data.sql`
2. Select ALL the SQL (Ctrl+A)
3. Right-click → "Run Query"
4. Check for errors

### Option B: If you need to adjust column names

**Example: If your columns use camelCase**

Find and replace in the SQL file:
```
hero_title → heroTitle
feature_venue_title → featureVenueTitle
is_active → isActive
```

**Example: If "order" column needs quotes**

SQLite requires quotes for reserved words:
```sql
"order"  -- Use this if you see syntax errors
```

---

## 🔧 Manual Adjustment Examples

### If site_settings uses different column names:

**Your structure:**
```
id | heroTitle | heroSubtitle | createdAt
```

**Change the INSERT to:**
```sql
INSERT INTO site_settings (
    id,
    heroTitle,           -- Changed from hero_title
    heroSubtitle,        -- Changed from hero_subtitle
    -- ... rest of columns
    createdAt            -- Changed from created_at
)
```

### If navigation_menus uses "order" (reserved word):

**Wrap it in quotes:**
```sql
INSERT INTO navigation_menus (
    id,
    label,
    path,
    icon,
    "order",             -- Quoted!
    is_active
)
```

---

## ✅ Step 3: Verify Data Was Inserted

Run these verification queries:

```sql
-- Check Site Settings
SELECT id, hero_title, locale FROM site_settings;
-- Should return 3 rows (EN, KA, RU)

-- Check Navigation Menus
SELECT id, label, locale FROM navigation_menus ORDER BY "order";
-- Should return 21 rows (7 items × 3 languages)

-- Check Social Links
SELECT id, platform, url FROM social_links;
-- Should return 3 rows (Facebook, Instagram, TikTok)

-- Check localizations are linked
SELECT COUNT(*) as total_links FROM site_settings_localizations_lnk;
-- Should return 6 (each locale linked to 2 others)

SELECT COUNT(*) as total_links FROM navigation_menus_localizations_lnk;
-- Should return 42 (7 items × 3 locales × 2 links each)
```

---

## 🧹 Cleanup (if you need to start fresh)

**Run these BEFORE inserting data:**

```sql
-- Delete all existing data
DELETE FROM site_settings_localizations_lnk;
DELETE FROM navigation_menus_localizations_lnk;
DELETE FROM site_settings;
DELETE FROM navigation_menus;
DELETE FROM social_links;

-- Reset auto-increment counters
DELETE FROM sqlite_sequence WHERE name='site_settings';
DELETE FROM sqlite_sequence WHERE name='navigation_menus';
DELETE FROM sqlite_sequence WHERE name='social_links';
```

---

## 🎯 Common Issues & Solutions

### ❌ Error: "no such column: hero_title"

**Problem:** Column name mismatch

**Solution:** Run structure query to see actual column name:
```sql
PRAGMA table_info(site_settings);
```
Then update the INSERT statement with correct column name.

---

### ❌ Error: "syntax error near 'order'"

**Problem:** "order" is a reserved word

**Solution:** Quote it:
```sql
"order"  -- Always use quotes
```

---

### ❌ Error: "UNIQUE constraint failed"

**Problem:** IDs already exist

**Solution:** Either:
1. Use different IDs (start from 100)
2. Delete existing data first (cleanup queries above)
3. Use `INSERT OR REPLACE` instead of `INSERT`

---

### ❌ Error: "FOREIGN KEY constraint failed"

**Problem:** Referenced IDs don't exist

**Solution:** Make sure you insert in this order:
1. Site Settings (main entries)
2. Site Settings localizations links
3. Navigation Menus (main entries)
4. Navigation Menus localizations links
5. Social Links

---

## 🎨 Customizing the Data

Edit the SQL file before running:

**Change hero title:**
```sql
-- Line ~50, change:
'Unforgettable Kids Parties in Batumi!'
-- to:
'Your Custom Title Here!'
```

**Change navigation menu:**
```sql
-- Add a new menu item:
INSERT INTO navigation_menus (
    id, label, path, icon, "order", is_active, locale,
    created_at, updated_at, published_at, created_by_id, updated_by_id
) VALUES
(22, 'Blog', '/blog', '📝', 8, 1, 'en', datetime('now'), datetime('now'), datetime('now'), 1, 1);
```

---

## 📊 What Gets Created

After running the SQL successfully:

### Site Settings (3 entries)
```
ID | Locale | Hero Title
1  | en     | Unforgettable Kids Parties in Batumi!
2  | ka     | დაუვიწყარი ბავშვების წვეულებები ბათუმში!
3  | ru     | Незабываемые детские праздники в Батуми!
```

### Navigation Menus (21 entries)
```
ID | Label      | Locale | Path       | Order
1  | Home       | en     | /          | 1
2  | მთავარი     | ka     | /          | 1
3  | Главная    | ru     | /          | 1
4  | Packages   | en     | /packages  | 2
5  | პაკეტები    | ka     | /packages  | 2
6  | Пакеты     | ru     | /packages  | 2
... (15 more)
```

### Social Links (3 entries)
```
ID | Platform  | URL
1  | facebook  | https://facebook.com/kidparty
2  | instagram | https://instagram.com/kidparty
3  | tiktok    | https://tiktok.com/@kidparty
```

**Total: 27 database entries + 48 localization links**

---

## 🧪 Testing After Insert

1. **Restart backend:**
   ```bash
   cd backend
   npm run develop
   ```

2. **Check Strapi Admin:**
   - http://localhost:1337/admin
   - Content Manager → Site Setting
   - Content Manager → Navigation Menus
   - Content Manager → Social Links

3. **Check Frontend:**
   - http://localhost:3000
   - Switch languages (EN, KA, RU)
   - Verify navigation changes
   - Verify content changes

---

## 💡 Pro Tips

1. **Always backup before running:**
   ```bash
   cp backend/.tmp/data.db backend/.tmp/data.db.backup
   ```

2. **Use transactions for safety:**
   ```sql
   BEGIN TRANSACTION;
   -- Your INSERT statements here
   COMMIT;  -- Or ROLLBACK if error
   ```

3. **Run in small batches:**
   - First: Just Site Settings
   - Second: Site Settings localizations
   - Third: Navigation Menus
   - etc.

4. **Check each step:**
   ```sql
   SELECT COUNT(*) FROM site_settings;
   -- Should increase with each insert
   ```

---

## 📞 Need Help?

If you get stuck:

1. **Share the error message** with column names from:
   ```sql
   PRAGMA table_info(site_settings);
   PRAGMA table_info(navigation_menus);
   ```

2. **Share the exact error** from SQLite

3. I'll adjust the SQL statements to match your exact schema!

---

**Estimated Time:** 5-10 minutes (including verification)
**Difficulty:** Easy (just copy-paste SQL)
**Risk:** Low (can rollback with backup)

🎉 Good luck!
