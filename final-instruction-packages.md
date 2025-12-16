# Final Instructions - How to Insert New Packages in Strapi

**Date:** December 15, 2024
**Target:** Strapi 5.31.3 with SQLite Database
**Purpose:** Step-by-step guide for inserting new party packages

---

## 📋 Table of Contents

1. [Understanding Strapi 5 Document System](#understanding-strapi-5-document-system)
2. [Prerequisites](#prerequisites)
3. [Package Structure Requirements](#package-structure-requirements)
4. [Step-by-Step Insertion Process](#step-by-step-insertion-process)
5. [SQL Template](#sql-template)
6. [Common Issues & Solutions](#common-issues--solutions)
7. [Verification Checklist](#verification-checklist)

---

## 🎯 Understanding Strapi 5 Document System

### Critical Concept: Draft + Published System

Strapi 5 uses a **document-based system** where EVERY content item needs **TWO entries per locale**:

```
Each Package = 6 Database Entries Total

Per Locale (en, ka, ru):
├── DRAFT entry (published_at = NULL)
│   └── For editing in admin panel
└── PUBLISHED entry (published_at = timestamp)
    └── For API and frontend display
```

### Why Both Versions Are Required

| Version | published_at | Purpose | Visible In |
|---------|-------------|---------|------------|
| **Draft** | `NULL` | Working copy for editing | Strapi admin panel |
| **Published** | `<timestamp>` | Live version for users | API, Frontend, Admin |

**Important:** If you only insert published entries (without drafts), packages will:
- ✅ Work in API
- ✅ Display on frontend
- ❌ NOT appear in Strapi admin panel for editing

---

## 🔧 Prerequisites

### 1. Required Software

- SQLite3 installed and accessible via command line
- Strapi backend running on `localhost:1337`
- Database file: `backend/.tmp/data.db`

### 2. Database Access

**Windows:**
```bash
cd C:\Users\MindiaTulashvili\OneDrive\Desktop\KidParty\backend
sqlite3 .tmp/data.db
```

**Mac/Linux:**
```bash
cd ~/path/to/KidParty/backend
sqlite3 .tmp/data.db
```

### 3. Check Current State

**Before inserting, always check:**
```sql
-- Count existing packages
SELECT COUNT(*) FROM packages;

-- Check highest package ID
SELECT MAX(id) FROM packages;

-- Check highest feature ID
SELECT MAX(id) FROM components_common_included_features;
```

---

## 📦 Package Structure Requirements

### 1. document_id (Critical!)

**Must be EXACTLY 24 characters:**
```
✅ CORRECT:
magicwizardacademy123  (24 chars)
spaceexplorermission7  (24 chars)
piratetreasurequest99  (24 chars)

❌ WRONG:
WIZARD_PKG_001         (14 chars - TOO SHORT)
magic-wizard-academy-premium-2024  (33 chars - TOO LONG)
```

**Format:**
- Lowercase letters and numbers only
- No spaces, hyphens, or underscores
- Use descriptive but concise names
- Pad with numbers if needed

### 2. Required Fields

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `document_id` | varchar(24) | ✅ Yes | Exactly 24 characters |
| `name` | varchar(255) | ✅ Yes | Package name in locale language |
| `slug` | varchar(255) | ✅ Yes | URL-friendly, use hyphens |
| `short_description` | text | ✅ Yes | 1-2 sentences |
| `full_description` | text | ✅ Yes | 3-5 sentences |
| `duration_minutes` | integer | ✅ Yes | 60-180 minutes typical |
| `price_per_child` | decimal | ✅ Yes | Use decimal format: 25.0, 35.5 |
| `min_guests` | integer | ✅ Yes | Minimum 4-8 |
| `max_guests` | integer | ✅ Yes | Maximum 12-25 |
| `created_at` | bigint | ✅ Yes | Unix timestamp (milliseconds) |
| `updated_at` | bigint | ✅ Yes | Unix timestamp (milliseconds) |
| `published_at` | bigint | ✅ Yes/NULL | NULL for draft, timestamp for published |
| `created_by_id` | integer | ✅ Yes | Use `1` (admin user) |
| `updated_by_id` | integer | ✅ Yes | Use `1` (admin user) |
| `locale` | varchar(255) | ✅ Yes | Must be: 'en', 'ka', or 'ru' |

### 3. Features Requirements

**Each package needs 6 features:**
- Create unique features per package
- Each feature needs: `label` and `icon`
- Icons use emoji format: 🎨, 🎯, 🎪, 🎭
- Features are shared across all locales (English labels work for all)

### 4. Price Categories

**Frontend automatically categorizes by price:**

| Category | Price Range | Example |
|----------|-------------|---------|
| **Budget** | < ₾30 | ₾25, ₾28 |
| **Standard** | ₾30 - ₾49 | ₾30, ₾35, ₾45 |
| **Premium** | ≥ ₾50 | ₾50, ₾60, ₾75 |

**Choose prices strategically for good category distribution.**

---

## 🚀 Step-by-Step Insertion Process

### Step 1: Plan Your Package

**Before writing SQL, decide:**
1. Package theme (Superhero, Ocean, Dinosaur, etc.)
2. Target age group (affects duration, features)
3. Price point (Budget, Standard, Premium)
4. Duration (60-180 minutes)
5. Guest capacity (min/max)
6. 6 unique features

**Example Planning:**
```
Theme: Magic Wizard Academy
Price: ₾55 (Premium)
Duration: 120 minutes
Guests: 8-18
Features:
  1. Wizard robe & wand accessories
  2. Spell-casting lessons
  3. Potion-making workshop
  4. Magic show performance
  5. House sorting ceremony
  6. Enchanted snacks & drinks
```

---

### Step 2: Generate document_id

**Create a 24-character unique ID:**

**Method 1: Descriptive (Recommended)**
```
Theme: Magic Wizard Academy
ID: magicwizardacademy123  (24 chars)
     ^^^^^^^^^^^^^^^^^^^^       ^^^
     descriptive part           padding
```

**Method 2: Random Hash**
```
Use online tool or command:
echo -n "magic" | md5sum | cut -c1-24
Result: 99a329b276af592d4d09e
```

**Verify length:**
```bash
echo -n "magicwizardacademy123" | wc -c
# Output should be: 24
```

---

### Step 3: Create Features (IDs + Labels)

**Check current highest feature ID:**
```sql
SELECT MAX(id) FROM components_common_included_features;
-- Example result: 165
-- Your new features will be: 166, 167, 168, 169, 170, 171
```

**Write feature inserts:**
```sql
INSERT INTO components_common_included_features (label, icon) VALUES
('Wizard robe & wand accessories', '🧙'),
('Spell-casting lessons', '✨'),
('Potion-making workshop', '🧪'),
('Magic show performance', '🎩'),
('House sorting ceremony', '🏰'),
('Enchanted snacks & drinks', '🍰');
```

**Note the IDs created** (you'll use them in Step 5).

---

### Step 4: Insert 6 Package Entries

**Check current highest package ID:**
```sql
SELECT MAX(id) FROM packages;
-- Example result: 127
-- Your new packages will be: 128, 129, 130, 131, 132, 133
```

**Insert order:**
1. English Draft (published_at = NULL)
2. English Published (published_at = timestamp)
3. Georgian Draft (published_at = NULL)
4. Georgian Published (published_at = timestamp)
5. Russian Draft (published_at = NULL)
6. Russian Published (published_at = timestamp)

**Use the SQL template below** (Section: SQL Template).

---

### Step 5: Link Features to Packages

**Link features to ALL 6 package entries:**

```sql
-- English Draft (ID 128)
INSERT INTO packages_cmps (entity_id, cmp_id, component_type, field, "order")
VALUES
(128, 166, 'common.included-feature', 'included_features', 1),
(128, 167, 'common.included-feature', 'included_features', 2),
(128, 168, 'common.included-feature', 'included_features', 3),
(128, 169, 'common.included-feature', 'included_features', 4),
(128, 170, 'common.included-feature', 'included_features', 5),
(128, 171, 'common.included-feature', 'included_features', 6);

-- Repeat for IDs: 129, 130, 131, 132, 133
```

**Total:** 6 package entries × 6 features = 36 feature links per package.

---

### Step 6: Execute SQL Script

**Save your SQL to a file:**
```bash
# Save as: backend/insert_my_package.sql
```

**Execute:**
```bash
cd backend
sqlite3 .tmp/data.db < insert_my_package.sql
```

**Or interactive mode:**
```bash
sqlite3 .tmp/data.db
sqlite> .read insert_my_package.sql
sqlite> .quit
```

---

### Step 7: Verify Insertion

**Run verification queries:**
```sql
-- Check if package entries were created
SELECT id, name, locale, published_at FROM packages WHERE id >= 128;

-- Check feature count per entry
SELECT p.id, p.name, COUNT(pc.cmp_id) as features
FROM packages p
LEFT JOIN packages_cmps pc ON p.id = pc.entity_id
WHERE p.id >= 128
GROUP BY p.id;
-- All entries should have 6 features
```

---

### Step 8: Test in Strapi Admin

1. **Clear browser cache:** Ctrl + Shift + R
2. **Open admin:** http://localhost:1337/admin
3. **Navigate to:** Content Manager → Packages
4. **Check English:** Should see your new package
5. **Switch to Georgian (ka):** Should see Georgian version
6. **Switch to Russian (ru):** Should see Russian version

**All 3 locales must show the package.** ✅

---

### Step 9: Test in Frontend

1. **Packages page:** http://localhost:5173/en/packages
   - Package should appear in correct category (Budget/Standard/Premium)

2. **Contact form:** http://localhost:5173/en/contact
   - Package should appear in dropdown selector

3. **Switch languages:** Test /ka/ and /ru/ routes

---

## 📝 SQL Template

### Complete Template for One Package

```sql
-- ============================================================
-- PACKAGE INSERTION TEMPLATE
-- ============================================================
-- Package Name: [YOUR PACKAGE NAME]
-- document_id: [24-character ID]
-- Price: [PRICE] GEL ([Budget/Standard/Premium])
-- Duration: [MINUTES] minutes
-- Guests: [MIN]-[MAX]
-- ============================================================

-- STEP 1: CREATE 6 FEATURES
-- ============================================================
-- Check current max feature ID first:
-- SELECT MAX(id) FROM components_common_included_features;
-- Example: If max is 165, new IDs will be 166-171

INSERT INTO components_common_included_features (label, icon) VALUES
('[Feature 1 label]', '[emoji]'),
('[Feature 2 label]', '[emoji]'),
('[Feature 3 label]', '[emoji]'),
('[Feature 4 label]', '[emoji]'),
('[Feature 5 label]', '[emoji]'),
('[Feature 6 label]', '[emoji]');

-- STEP 2: INSERT PACKAGE ENTRIES (6 total)
-- ============================================================
-- Check current max package ID first:
-- SELECT MAX(id) FROM packages;
-- Example: If max is 127, new IDs will be 128-133

-- ENGLISH - DRAFT
INSERT INTO packages (
  document_id, name, slug, short_description, full_description,
  duration_minutes, price_per_child, min_guests, max_guests,
  created_at, updated_at, published_at, created_by_id, updated_by_id, locale
) VALUES (
  '[24-char-document-id]',
  '[Package Name in English]',
  '[package-name-slug]',
  '[Short description 1-2 sentences in English]',
  '[Full description 3-5 sentences in English with details about activities and what makes this package special]',
  [DURATION],
  [PRICE],
  [MIN_GUESTS],
  [MAX_GUESTS],
  strftime('%s', 'now') || substr(strftime('%f', 'now'), 4),
  strftime('%s', 'now') || substr(strftime('%f', 'now'), 4),
  NULL,
  1,
  1,
  'en'
);

-- ENGLISH - PUBLISHED
INSERT INTO packages (
  document_id, name, slug, short_description, full_description,
  duration_minutes, price_per_child, min_guests, max_guests,
  created_at, updated_at, published_at, created_by_id, updated_by_id, locale
) VALUES (
  '[same-24-char-document-id]',
  '[Same Package Name in English]',
  '[same-package-name-slug]',
  '[Same short description]',
  '[Same full description]',
  [SAME_DURATION],
  [SAME_PRICE],
  [SAME_MIN_GUESTS],
  [SAME_MAX_GUESTS],
  strftime('%s', 'now') || substr(strftime('%f', 'now'), 4),
  strftime('%s', 'now') || substr(strftime('%f', 'now'), 4),
  strftime('%s', 'now') || substr(strftime('%f', 'now'), 4),
  1,
  1,
  'en'
);

-- GEORGIAN - DRAFT
INSERT INTO packages (
  document_id, name, slug, short_description, full_description,
  duration_minutes, price_per_child, min_guests, max_guests,
  created_at, updated_at, published_at, created_by_id, updated_by_id, locale
) VALUES (
  '[same-24-char-document-id]',
  '[Package Name in Georgian]',
  '[same-package-name-slug]',
  '[Short description in Georgian]',
  '[Full description in Georgian]',
  [SAME_DURATION],
  [SAME_PRICE],
  [SAME_MIN_GUESTS],
  [SAME_MAX_GUESTS],
  strftime('%s', 'now') || substr(strftime('%f', 'now'), 4),
  strftime('%s', 'now') || substr(strftime('%f', 'now'), 4),
  NULL,
  1,
  1,
  'ka'
);

-- GEORGIAN - PUBLISHED
INSERT INTO packages (
  document_id, name, slug, short_description, full_description,
  duration_minutes, price_per_child, min_guests, max_guests,
  created_at, updated_at, published_at, created_by_id, updated_by_id, locale
) VALUES (
  '[same-24-char-document-id]',
  '[Same Package Name in Georgian]',
  '[same-package-name-slug]',
  '[Same short description in Georgian]',
  '[Same full description in Georgian]',
  [SAME_DURATION],
  [SAME_PRICE],
  [SAME_MIN_GUESTS],
  [SAME_MAX_GUESTS],
  strftime('%s', 'now') || substr(strftime('%f', 'now'), 4),
  strftime('%s', 'now') || substr(strftime('%f', 'now'), 4),
  strftime('%s', 'now') || substr(strftime('%f', 'now'), 4),
  1,
  1,
  'ka'
);

-- RUSSIAN - DRAFT
INSERT INTO packages (
  document_id, name, slug, short_description, full_description,
  duration_minutes, price_per_child, min_guests, max_guests,
  created_at, updated_at, published_at, created_by_id, updated_by_id, locale
) VALUES (
  '[same-24-char-document-id]',
  '[Package Name in Russian]',
  '[same-package-name-slug]',
  '[Short description in Russian]',
  '[Full description in Russian]',
  [SAME_DURATION],
  [SAME_PRICE],
  [SAME_MIN_GUESTS],
  [SAME_MAX_GUESTS],
  strftime('%s', 'now') || substr(strftime('%f', 'now'), 4),
  strftime('%s', 'now') || substr(strftime('%f', 'now'), 4),
  NULL,
  1,
  1,
  'ru'
);

-- RUSSIAN - PUBLISHED
INSERT INTO packages (
  document_id, name, slug, short_description, full_description,
  duration_minutes, price_per_child, min_guests, max_guests,
  created_at, updated_at, published_at, created_by_id, updated_by_id, locale
) VALUES (
  '[same-24-char-document-id]',
  '[Same Package Name in Russian]',
  '[same-package-name-slug]',
  '[Same short description in Russian]',
  '[Same full description in Russian]',
  [SAME_DURATION],
  [SAME_PRICE],
  [SAME_MIN_GUESTS],
  [SAME_MAX_GUESTS],
  strftime('%s', 'now') || substr(strftime('%f', 'now'), 4),
  strftime('%s', 'now') || substr(strftime('%f', 'now'), 4),
  strftime('%s', 'now') || substr(strftime('%f', 'now'), 4),
  1,
  1,
  'ru'
);

-- STEP 3: LINK FEATURES TO PACKAGES
-- ============================================================
-- Replace [PKG_ID_X] with actual package IDs created above
-- Replace [FEAT_ID_X] with actual feature IDs created above

-- English Draft
INSERT INTO packages_cmps (entity_id, cmp_id, component_type, field, "order")
VALUES
([PKG_ID_1], [FEAT_ID_1], 'common.included-feature', 'included_features', 1),
([PKG_ID_1], [FEAT_ID_2], 'common.included-feature', 'included_features', 2),
([PKG_ID_1], [FEAT_ID_3], 'common.included-feature', 'included_features', 3),
([PKG_ID_1], [FEAT_ID_4], 'common.included-feature', 'included_features', 4),
([PKG_ID_1], [FEAT_ID_5], 'common.included-feature', 'included_features', 5),
([PKG_ID_1], [FEAT_ID_6], 'common.included-feature', 'included_features', 6);

-- English Published
INSERT INTO packages_cmps (entity_id, cmp_id, component_type, field, "order")
VALUES
([PKG_ID_2], [FEAT_ID_1], 'common.included-feature', 'included_features', 1),
([PKG_ID_2], [FEAT_ID_2], 'common.included-feature', 'included_features', 2),
([PKG_ID_2], [FEAT_ID_3], 'common.included-feature', 'included_features', 3),
([PKG_ID_2], [FEAT_ID_4], 'common.included-feature', 'included_features', 4),
([PKG_ID_2], [FEAT_ID_5], 'common.included-feature', 'included_features', 5),
([PKG_ID_2], [FEAT_ID_6], 'common.included-feature', 'included_features', 6);

-- Georgian Draft
INSERT INTO packages_cmps (entity_id, cmp_id, component_type, field, "order")
VALUES
([PKG_ID_3], [FEAT_ID_1], 'common.included-feature', 'included_features', 1),
([PKG_ID_3], [FEAT_ID_2], 'common.included-feature', 'included_features', 2),
([PKG_ID_3], [FEAT_ID_3], 'common.included-feature', 'included_features', 3),
([PKG_ID_3], [FEAT_ID_4], 'common.included-feature', 'included_features', 4),
([PKG_ID_3], [FEAT_ID_5], 'common.included-feature', 'included_features', 5),
([PKG_ID_3], [FEAT_ID_6], 'common.included-feature', 'included_features', 6);

-- Georgian Published
INSERT INTO packages_cmps (entity_id, cmp_id, component_type, field, "order")
VALUES
([PKG_ID_4], [FEAT_ID_1], 'common.included-feature', 'included_features', 1),
([PKG_ID_4], [FEAT_ID_2], 'common.included-feature', 'included_features', 2),
([PKG_ID_4], [FEAT_ID_3], 'common.included-feature', 'included_features', 3),
([PKG_ID_4], [FEAT_ID_4], 'common.included-feature', 'included_features', 4),
([PKG_ID_4], [FEAT_ID_5], 'common.included-feature', 'included_features', 5),
([PKG_ID_4], [FEAT_ID_6], 'common.included-feature', 'included_features', 6);

-- Russian Draft
INSERT INTO packages_cmps (entity_id, cmp_id, component_type, field, "order")
VALUES
([PKG_ID_5], [FEAT_ID_1], 'common.included-feature', 'included_features', 1),
([PKG_ID_5], [FEAT_ID_2], 'common.included-feature', 'included_features', 2),
([PKG_ID_5], [FEAT_ID_3], 'common.included-feature', 'included_features', 3),
([PKG_ID_5], [FEAT_ID_4], 'common.included-feature', 'included_features', 4),
([PKG_ID_5], [FEAT_ID_5], 'common.included-feature', 'included_features', 5),
([PKG_ID_5], [FEAT_ID_6], 'common.included-feature', 'included_features', 6);

-- Russian Published
INSERT INTO packages_cmps (entity_id, cmp_id, component_type, field, "order")
VALUES
([PKG_ID_6], [FEAT_ID_1], 'common.included-feature', 'included_features', 1),
([PKG_ID_6], [FEAT_ID_2], 'common.included-feature', 'included_features', 2),
([PKG_ID_6], [FEAT_ID_3], 'common.included-feature', 'included_features', 3),
([PKG_ID_6], [FEAT_ID_4], 'common.included-feature', 'included_features', 4),
([PKG_ID_6], [FEAT_ID_5], 'common.included-feature', 'included_features', 5),
([PKG_ID_6], [FEAT_ID_6], 'common.included-feature', 'included_features', 6);

-- ============================================================
-- VERIFICATION QUERIES
-- ============================================================

-- Check packages were created
-- SELECT id, name, locale, published_at FROM packages WHERE document_id = '[24-char-document-id]';

-- Check feature count
-- SELECT p.id, p.name, COUNT(pc.cmp_id) as features
-- FROM packages p
-- LEFT JOIN packages_cmps pc ON p.id = pc.entity_id
-- WHERE p.document_id = '[24-char-document-id]'
-- GROUP BY p.id;
-- Expected: All 6 entries should have 6 features each
```

---

## ⚠️ Common Issues & Solutions

### Issue 1: Package Not Visible in Admin Panel

**Symptom:** Package works in API but doesn't show in Strapi admin

**Cause:** Missing draft entries (published_at = NULL)

**Solution:**
```sql
-- Check if drafts exist
SELECT id, name, locale, published_at FROM packages WHERE document_id = 'yourpackageid123456';

-- If you only see published entries (published_at NOT NULL), create drafts:
INSERT INTO packages (...)
SELECT ..., NULL as published_at, ...
FROM packages WHERE id = [PUBLISHED_ID];
```

---

### Issue 2: document_id Wrong Length

**Symptom:** SQLite error or package doesn't group correctly

**Cause:** document_id is not exactly 24 characters

**Solution:**
```bash
# Check length
echo -n "yourpackageid" | wc -c

# Pad or trim to exactly 24
yourpackageid123456789  # Add numbers
yourpackageidabc123xyz  # Add letters
```

---

### Issue 3: Features Not Showing

**Symptom:** Package appears but no features listed

**Cause:** Missing entries in packages_cmps table

**Solution:**
```sql
-- Check feature links
SELECT entity_id, cmp_id FROM packages_cmps WHERE entity_id = [PACKAGE_ID];

-- If empty, insert feature links (see Step 5)
```

---

### Issue 4: Wrong Locale Showing

**Symptom:** Georgian page shows English text

**Cause:** Locale field set incorrectly

**Solution:**
```sql
-- Check locale values
SELECT id, name, locale FROM packages WHERE document_id = 'yourpackageid123456';

-- Fix if needed
UPDATE packages SET locale = 'ka' WHERE id = [ID] AND name = '[Georgian Name]';
```

---

### Issue 5: Duplicate Packages

**Symptom:** Same package appears twice in admin

**Cause:** Created 2 separate document_ids instead of sharing one

**Solution:**
```sql
-- Check document_ids
SELECT document_id, COUNT(*) FROM packages GROUP BY document_id HAVING COUNT(*) != 6;

-- Should have exactly 6 entries per document_id
-- If not, delete duplicates or fix document_id
```

---

### Issue 6: Price Category Wrong

**Symptom:** Premium package shows in Standard category

**Cause:** Frontend categorizes by price, check your price value

**Solution:**
- Budget: < 30
- Standard: 30-49
- Premium: ≥ 50

```sql
-- Check price
SELECT id, name, price_per_child FROM packages WHERE document_id = 'yourpackageid123456';

-- Update if needed
UPDATE packages SET price_per_child = 55.0 WHERE document_id = 'yourpackageid123456';
```

---

## ✅ Verification Checklist

After inserting a new package, verify:

### Database Level

- [ ] 6 package entries created (3 locales × 2 versions)
- [ ] 3 drafts have `published_at = NULL`
- [ ] 3 published have `published_at = <timestamp>`
- [ ] All 6 entries share same `document_id` (24 chars)
- [ ] All 6 entries have different `id` values
- [ ] 6 features created with labels and icons
- [ ] 36 feature links created (6 entries × 6 features)

**Queries:**
```sql
-- Check package entries
SELECT id, name, locale,
  CASE WHEN published_at IS NULL THEN 'Draft' ELSE 'Published' END as status
FROM packages WHERE document_id = '[your-document-id]';
-- Expected: 6 rows (3 drafts + 3 published)

-- Check features
SELECT p.id, p.name, p.locale, COUNT(pc.cmp_id) as features
FROM packages p
LEFT JOIN packages_cmps pc ON p.id = pc.entity_id
WHERE p.document_id = '[your-document-id]'
GROUP BY p.id;
-- Expected: All 6 rows show 6 features
```

---

### Strapi Admin Level

- [ ] Package visible in English (en) locale
- [ ] Package visible in Georgian (ka) locale
- [ ] Package visible in Russian (ru) locale
- [ ] Package shows "Published" status (not "Modified")
- [ ] All 6 features display correctly
- [ ] Can click and edit package
- [ ] "Available in" shows all 3 locales

**Test:** http://localhost:1337/admin → Content Manager → Packages

---

### API Level

- [ ] English API returns package
- [ ] Georgian API returns package
- [ ] Russian API returns package
- [ ] All features included in response
- [ ] All fields populated correctly

**Test:**
```
http://localhost:1337/api/packages?locale=en&populate=*
http://localhost:1337/api/packages?locale=ka&populate=*
http://localhost:1337/api/packages?locale=ru&populate=*
```

---

### Frontend Level

- [ ] Package displays on /en/packages
- [ ] Package displays on /ka/packages
- [ ] Package displays on /ru/packages
- [ ] Price category correct (Budget/Standard/Premium)
- [ ] All 6 features visible
- [ ] Appears in contact form dropdown
- [ ] Clicking package shows detail page

**Test:**
```
http://localhost:5173/en/packages
http://localhost:5173/ka/packages
http://localhost:5173/ru/packages
http://localhost:5173/en/contact
```

---

## 📚 Quick Reference

### Essential Commands

**Open database:**
```bash
cd backend
sqlite3 .tmp/data.db
```

**Run SQL file:**
```bash
sqlite3 .tmp/data.db < mypackage.sql
```

**Check package count:**
```sql
SELECT COUNT(*) FROM packages;
```

**List all packages:**
```sql
SELECT id, name, locale, price_per_child FROM packages WHERE locale = 'en' AND published_at IS NOT NULL;
```

**Delete package (if needed):**
```sql
-- Delete by document_id (deletes all 6 entries)
DELETE FROM packages WHERE document_id = '[your-document-id]';

-- Features are auto-deleted due to CASCADE
```

---

### Document Structure Summary

```
1 Package = 6 Database Rows + 6 Features + 36 Links

Package Rows:
├── en-draft (published_at = NULL)
├── en-published (published_at = timestamp)
├── ka-draft (published_at = NULL)
├── ka-published (published_at = timestamp)
├── ru-draft (published_at = NULL)
└── ru-published (published_at = timestamp)

Features: 6 components_common_included_features rows

Links: 36 packages_cmps rows (6 rows × 6 features)
```

---

## 🎓 Best Practices

1. **Always create both draft and published entries** - Don't skip drafts!
2. **Use consistent naming** - Keep document_id, slug, and name related
3. **Test immediately** - Verify in admin and API right after insertion
4. **Use transactions** - Wrap in BEGIN/COMMIT for safety
5. **Document your work** - Keep notes on what you inserted
6. **Backup first** - Copy data.db before bulk operations
7. **Verify IDs** - Always check MAX(id) before assuming next ID
8. **Use descriptive features** - Clear labels help users understand value
9. **Price strategically** - Distribute across Budget/Standard/Premium
10. **Translate properly** - Use accurate Georgian and Russian translations

---

## 📖 Additional Resources

- **Database Schema Map:** `STRAPI_DATABASE_SCHEMA_MAP.md`
- **Package Templates:** `PACKAGE_INSERT_TEMPLATES.md`
- **Draft Entry Fix:** `FINAL_FIX_DRAFT_ENTRIES.md`
- **3 Package Example:** `THREE_NEW_PACKAGES_INSERTION.md`
- **10 Package Script:** `10-new-packages-insert.sql`

---

## 💡 Pro Tips

### Tip 1: Batch Insertion
When inserting multiple packages, create one SQL file with all of them and execute once.

### Tip 2: Feature Reuse
Features are shared across locales. English labels work fine - no need to translate feature labels.

### Tip 3: Slug Consistency
Use same slug across all locales. Frontend routing handles language switching by locale code, not slug.

### Tip 4: Testing Order
Test in this order:
1. Database queries (verify data exists)
2. Strapi admin (verify admin panel works)
3. API endpoints (verify API returns data)
4. Frontend (verify user experience)

### Tip 5: Quick Verification
After insertion, run this one query to check everything:
```sql
SELECT
  p.id,
  p.name,
  p.locale,
  CASE WHEN p.published_at IS NULL THEN 'Draft' ELSE 'Published' END as status,
  COUNT(pc.cmp_id) as features
FROM packages p
LEFT JOIN packages_cmps pc ON p.id = pc.entity_id
WHERE p.document_id = '[your-document-id]'
GROUP BY p.id;
```
Expected result: 6 rows, all showing 6 features.

---

**Status:** ✅ Complete Guide
**Date:** December 15, 2024
**Maintained by:** Development Team

---

**Happy Package Creating! 🎉**
