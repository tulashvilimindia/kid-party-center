# Strapi Test Packages Creation - SQLite3 Database Documentation

## Overview
This document details the process of creating 3 test packages in the Strapi SQLite database with full internationalization support (English, Georgian, Russian).

**Date:** December 14, 2024
**Database:** `backend\.tmp\data.db`
**Packages Created:** 3 (Test Basic Party, Test Premium Party, Test Deluxe Party)
**Locales:** English (en), Georgian (ka), Russian (ru)
**Total Entries:** 9 package entries (3 packages × 3 locales)

---

## Database Structure Investigation

### Step 1: Connect to SQLite Database

```bash
cd "C:\Users\MindiaTulashvili\OneDrive\Desktop\KidParty\backend\.tmp"
sqlite3 data.db
```

### Step 2: List All Tables

```sql
.tables
```

**Key Tables Identified:**
- `packages` - Main packages table
- `packages_cmps` - Components linking table
- `components_common_included_features` - Features/amenities for packages
- `i18n_locale` - Available locales

### Step 3: Examine Packages Table Schema

```sql
.schema packages
```

**Packages Table Structure:**
```sql
CREATE TABLE IF NOT EXISTS "packages" (
  `id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
  `document_id` varchar(255) NULL,
  `name` varchar(255) NULL,
  `slug` varchar(255) NULL,
  `short_description` text NULL,
  `full_description` text NULL,
  `duration_minutes` integer NULL,
  `price_per_child` float NULL,
  `min_guests` integer NULL,
  `max_guests` integer NULL,
  `created_at` datetime NULL,
  `updated_at` datetime NULL,
  `published_at` datetime NULL,
  `created_by_id` integer NULL,
  `updated_by_id` integer NULL,
  `locale` varchar(255) NULL
);
```

**Key Fields:**
- `id` - Auto-incrementing primary key
- `document_id` - Unique identifier shared across all locales of the same content
- `name` - Package name (localized)
- `slug` - URL-friendly identifier
- `locale` - Language code (en, ka, ru)
- `published_at` - Must be set for package to be visible in API
- `price_per_child` - Price per guest
- `min_guests` / `max_guests` - Capacity constraints
- `duration_minutes` - Party duration

### Step 4: Check Existing Packages

```sql
SELECT id, document_id, name, locale, published_at
FROM packages
LIMIT 10;
```

**Findings:**
- Each package has entries for different locales sharing the same `document_id`
- Published packages have `published_at` timestamp set
- Max existing ID: 70

### Step 5: Check Available Locales

```sql
SELECT DISTINCT locale FROM packages;
```

**Result:**
- en (English)
- ka (Georgian)
- ru (Russian)

### Step 6: Examine Package Components

```sql
.schema packages_cmps
```

**Packages Components Table:**
```sql
CREATE TABLE IF NOT EXISTS "packages_cmps" (
  `id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
  `entity_id` integer NULL,
  `cmp_id` integer NULL,
  `component_type` varchar(255) NULL,
  `field` varchar(255) NULL,
  `order` float NULL,
  CONSTRAINT `packages_entity_fk` FOREIGN KEY (`entity_id`)
    REFERENCES `packages` (`id`) ON DELETE CASCADE
);
```

### Step 7: Examine Included Features

```sql
.schema components_common_included_features
```

**Included Features Table:**
```sql
CREATE TABLE `components_common_included_features` (
  `id` integer not null primary key autoincrement,
  `label` varchar(255) null,
  `icon` varchar(255) null
);
```

**Max existing feature ID:** 18

---

## Test Packages Creation

### Package 1: Test Basic Party

**Document ID:** `TEST_PKG_001`
**Price:** $15 per child
**Duration:** 90 minutes
**Capacity:** 5-15 guests
**Features:** Playground Access, Music System

#### English Version
```sql
INSERT INTO packages (
  document_id, name, slug, short_description, full_description,
  duration_minutes, price_per_child, min_guests, max_guests,
  created_at, updated_at, published_at, created_by_id, updated_by_id, locale
) VALUES (
  'TEST_PKG_001',
  'Test Basic Party',
  'test-basic-party',
  'A simple test package for basic parties',
  'This is a test package with basic features including playground access and music.',
  90, 15.0, 5, 15,
  1734188400000, 1734188400000, 1734188400000,
  NULL, NULL, 'en'
);
```

#### Georgian Version
```sql
INSERT INTO packages (
  document_id, name, slug, short_description, full_description,
  duration_minutes, price_per_child, min_guests, max_guests,
  created_at, updated_at, published_at, created_by_id, updated_by_id, locale
) VALUES (
  'TEST_PKG_001',
  'ტესტ ძირითადი წვეულება',
  'test-basic-party',
  'მარტივი ტესტ პაკეტი ძირითადი წვეულებისთვის',
  'ეს არის ტესტ პაკეტი ძირითადი ფუნქციებით, მათ შორის სათამაშო მოედნის წვდომა და მუსიკა.',
  90, 15.0, 5, 15,
  1734188400000, 1734188400000, 1734188400000,
  NULL, NULL, 'ka'
);
```

#### Russian Version
```sql
INSERT INTO packages (
  document_id, name, slug, short_description, full_description,
  duration_minutes, price_per_child, min_guests, max_guests,
  created_at, updated_at, published_at, created_by_id, updated_by_id, locale
) VALUES (
  'TEST_PKG_001',
  'Тест Базовая Вечеринка',
  'test-basic-party',
  'Простой тестовый пакет для базовых вечеринок',
  'Это тестовый пакет с базовыми функциями, включая доступ к игровой площадке и музыку.',
  90, 15.0, 5, 15,
  1734188400000, 1734188400000, 1734188400000,
  NULL, NULL, 'ru'
);
```

---

### Package 2: Test Premium Party

**Document ID:** `TEST_PKG_002`
**Price:** $35 per child
**Duration:** 120 minutes
**Capacity:** 8-25 guests
**Features:** Party Decorations, VIP Area Access, Professional Photos

#### English Version
```sql
INSERT INTO packages (
  document_id, name, slug, short_description, full_description,
  duration_minutes, price_per_child, min_guests, max_guests,
  created_at, updated_at, published_at, created_by_id, updated_by_id, locale
) VALUES (
  'TEST_PKG_002',
  'Test Premium Party',
  'test-premium-party',
  'A premium test package with enhanced features',
  'This is a premium test package with advanced features including VIP area, professional photography, and custom decorations.',
  120, 35.0, 8, 25,
  1734188400000, 1734188400000, 1734188400000,
  NULL, NULL, 'en'
);
```

#### Georgian Version
```sql
INSERT INTO packages (
  document_id, name, slug, short_description, full_description,
  duration_minutes, price_per_child, min_guests, max_guests,
  created_at, updated_at, published_at, created_by_id, updated_by_id, locale
) VALUES (
  'TEST_PKG_002',
  'ტესტ პრემიუმ წვეულება',
  'test-premium-party',
  'პრემიუმ ტესტ პაკეტი გაუმჯობესებული ფუნქციებით',
  'ეს არის პრემიუმ ტესტ პაკეტი მოწინავე ფუნქციებით, მათ შორის VIP ზონა, პროფესიონალური ფოტოგრაფია და მორგებული დეკორაციები.',
  120, 35.0, 8, 25,
  1734188400000, 1734188400000, 1734188400000,
  NULL, NULL, 'ka'
);
```

#### Russian Version
```sql
INSERT INTO packages (
  document_id, name, slug, short_description, full_description,
  duration_minutes, price_per_child, min_guests, max_guests,
  created_at, updated_at, published_at, created_by_id, updated_by_id, locale
) VALUES (
  'TEST_PKG_002',
  'Тест Премиум Вечеринка',
  'test-premium-party',
  'Премиум тестовый пакет с улучшенными функциями',
  'Это премиум тестовый пакет с расширенными функциями, включая VIP зону, профессиональную фотографию и индивидуальные украшения.',
  120, 35.0, 8, 25,
  1734188400000, 1734188400000, 1734188400000,
  NULL, NULL, 'ru'
);
```

---

### Package 3: Test Deluxe Party

**Document ID:** `TEST_PKG_003`
**Price:** $50 per child
**Duration:** 180 minutes
**Capacity:** 10-30 guests
**Features:** Party Decorations, VIP Area Access, Professional Photos, Catering Service

#### English Version
```sql
INSERT INTO packages (
  document_id, name, slug, short_description, full_description,
  duration_minutes, price_per_child, min_guests, max_guests,
  created_at, updated_at, published_at, created_by_id, updated_by_id, locale
) VALUES (
  'TEST_PKG_003',
  'Test Deluxe Party',
  'test-deluxe-party',
  'Ultimate deluxe test package',
  'This is the ultimate deluxe test package with all features including exclusive venue access, professional entertainment, catering, and gift bags.',
  180, 50.0, 10, 30,
  1734188400000, 1734188400000, 1734188400000,
  NULL, NULL, 'en'
);
```

#### Georgian Version
```sql
INSERT INTO packages (
  document_id, name, slug, short_description, full_description,
  duration_minutes, price_per_child, min_guests, max_guests,
  created_at, updated_at, published_at, created_by_id, updated_by_id, locale
) VALUES (
  'TEST_PKG_003',
  'ტესტ დელუქს წვეულება',
  'test-deluxe-party',
  'საბოლოო დელუქს ტესტ პაკეტი',
  'ეს არის საბოლოო დელუქს ტესტ პაკეტი ყველა ფუნქციით, მათ შორის ექსკლუზიური ადგილი, პროფესიონალური გართობა, კეითერინგი და საჩუქრის ჩანთები.',
  180, 50.0, 10, 30,
  1734188400000, 1734188400000, 1734188400000,
  NULL, NULL, 'ka'
);
```

#### Russian Version
```sql
INSERT INTO packages (
  document_id, name, slug, short_description, full_description,
  duration_minutes, price_per_child, min_guests, max_guests,
  created_at, updated_at, published_at, created_by_id, updated_by_id, locale
) VALUES (
  'TEST_PKG_003',
  'Тест Делюкс Вечеринка',
  'test-deluxe-party',
  'Превосходный делюкс тестовый пакет',
  'Это превосходный делюкс тестовый пакет со всеми функциями, включая эксклюзивный доступ к месту, профессиональные развлечения, кейтеринг и подарочные пакеты.',
  180, 50.0, 10, 30,
  1734188400000, 1734188400000, 1734188400000,
  NULL, NULL, 'ru'
);
```

---

## Creating Package Features

### Step 1: Create Feature Components

```sql
-- Feature 19: Playground Access
INSERT INTO components_common_included_features (label, icon)
VALUES ('Test Playground Access', 'play');

-- Feature 20: Music System
INSERT INTO components_common_included_features (label, icon)
VALUES ('Test Music System', 'music');

-- Feature 21: Party Decorations
INSERT INTO components_common_included_features (label, icon)
VALUES ('Test Party Decorations', 'decoration');

-- Feature 22: VIP Area Access
INSERT INTO components_common_included_features (label, icon)
VALUES ('Test VIP Area Access', 'vip');

-- Feature 23: Professional Photos
INSERT INTO components_common_included_features (label, icon)
VALUES ('Test Professional Photos', 'camera');

-- Feature 24: Catering Service
INSERT INTO components_common_included_features (label, icon)
VALUES ('Test Catering Service', 'food');
```

### Step 2: Link Features to Packages

#### Test Basic Party (Package ID: 71 - English version)
```sql
INSERT INTO packages_cmps (entity_id, cmp_id, component_type, field, "order")
VALUES (71, 19, 'common.included-feature', 'includedFeatures', 1.0);

INSERT INTO packages_cmps (entity_id, cmp_id, component_type, field, "order")
VALUES (71, 20, 'common.included-feature', 'includedFeatures', 2.0);
```

#### Test Premium Party (Package ID: 74 - English version)
```sql
INSERT INTO packages_cmps (entity_id, cmp_id, component_type, field, "order")
VALUES (74, 21, 'common.included-feature', 'includedFeatures', 1.0);

INSERT INTO packages_cmps (entity_id, cmp_id, component_type, field, "order")
VALUES (74, 22, 'common.included-feature', 'includedFeatures', 2.0);

INSERT INTO packages_cmps (entity_id, cmp_id, component_type, field, "order")
VALUES (74, 23, 'common.included-feature', 'includedFeatures', 3.0);
```

#### Test Deluxe Party (Package ID: 77 - English version)
```sql
INSERT INTO packages_cmps (entity_id, cmp_id, component_type, field, "order")
VALUES (77, 21, 'common.included-feature', 'includedFeatures', 1.0);

INSERT INTO packages_cmps (entity_id, cmp_id, component_type, field, "order")
VALUES (77, 22, 'common.included-feature', 'includedFeatures', 2.0);

INSERT INTO packages_cmps (entity_id, cmp_id, component_type, field, "order")
VALUES (77, 23, 'common.included-feature', 'includedFeatures', 3.0);

INSERT INTO packages_cmps (entity_id, cmp_id, component_type, field, "order")
VALUES (77, 24, 'common.included-feature', 'includedFeatures', 4.0);
```

---

## Verification Queries

### Verify All Test Packages Created

```sql
SELECT id, document_id, name, locale, price_per_child
FROM packages
WHERE document_id LIKE 'TEST_PKG_%'
ORDER BY document_id, locale;
```

**Expected Result:**
```
71|TEST_PKG_001|Test Basic Party|en|15.0
72|TEST_PKG_001|ტესტ ძირითადი წვეულება|ka|15.0
73|TEST_PKG_001|Тест Базовая Вечеринка|ru|15.0
74|TEST_PKG_002|Test Premium Party|en|35.0
75|TEST_PKG_002|ტესტ პრემიუმ წვეულება|ka|35.0
76|TEST_PKG_002|Тест Премиум Вечеринка|ru|35.0
77|TEST_PKG_003|Test Deluxe Party|en|50.0
78|TEST_PKG_003|ტესტ დელუქს წვეულება|ka|50.0
79|TEST_PKG_003|Тест Делюкс Вечеринка|ru|50.0
```

### Verify Packages with Features

```sql
SELECT
  p.id,
  p.name,
  p.locale,
  GROUP_CONCAT(f.label, ', ') as features
FROM packages p
LEFT JOIN packages_cmps pc ON p.id = pc.entity_id
LEFT JOIN components_common_included_features f ON pc.cmp_id = f.id
WHERE p.document_id LIKE 'TEST_PKG_%' AND p.locale = 'en'
GROUP BY p.id, p.name, p.locale
ORDER BY p.id;
```

**Expected Result:**
```
71|Test Basic Party|en|Test Playground Access, Test Music System
74|Test Premium Party|en|Test Party Decorations, Test VIP Area Access, Test Professional Photos
77|Test Deluxe Party|en|Test Party Decorations, Test VIP Area Access, Test Professional Photos, Test Catering Service
```

### Count Test Packages by Locale

```sql
SELECT locale, COUNT(*) as package_count
FROM packages
WHERE document_id LIKE 'TEST_PKG_%'
GROUP BY locale;
```

**Expected Result:**
```
en|3
ka|3
ru|3
```

### View Complete Package Details

```sql
SELECT
  id, document_id, name, slug,
  short_description, price_per_child,
  min_guests, max_guests, duration_minutes, locale
FROM packages
WHERE document_id = 'TEST_PKG_001'
ORDER BY locale;
```

---

## Complete Batch Insert Script

For convenience, here's the complete script to create all 3 test packages:

```sql
-- ========================================
-- CREATE 3 TEST PACKAGES WITH ALL LOCALES
-- ========================================

-- Package 1: Test Basic Party (3 locales)
INSERT INTO packages (document_id, name, slug, short_description, full_description, duration_minutes, price_per_child, min_guests, max_guests, created_at, updated_at, published_at, created_by_id, updated_by_id, locale)
VALUES ('TEST_PKG_001', 'Test Basic Party', 'test-basic-party', 'A simple test package for basic parties', 'This is a test package with basic features including playground access and music.', 90, 15.0, 5, 15, 1734188400000, 1734188400000, 1734188400000, NULL, NULL, 'en');

INSERT INTO packages (document_id, name, slug, short_description, full_description, duration_minutes, price_per_child, min_guests, max_guests, created_at, updated_at, published_at, created_by_id, updated_by_id, locale)
VALUES ('TEST_PKG_001', 'ტესტ ძირითადი წვეულება', 'test-basic-party', 'მარტივი ტესტ პაკეტი ძირითადი წვეულებისთვის', 'ეს არის ტესტ პაკეტი ძირითადი ფუნქციებით, მათ შორის სათამაშო მოედნის წვდომა და მუსიკა.', 90, 15.0, 5, 15, 1734188400000, 1734188400000, 1734188400000, NULL, NULL, 'ka');

INSERT INTO packages (document_id, name, slug, short_description, full_description, duration_minutes, price_per_child, min_guests, max_guests, created_at, updated_at, published_at, created_by_id, updated_by_id, locale)
VALUES ('TEST_PKG_001', 'Тест Базовая Вечеринка', 'test-basic-party', 'Простой тестовый пакет для базовых вечеринок', 'Это тестовый пакет с базовыми функциями, включая доступ к игровой площадке и музыку.', 90, 15.0, 5, 15, 1734188400000, 1734188400000, 1734188400000, NULL, NULL, 'ru');

-- Package 2: Test Premium Party (3 locales)
INSERT INTO packages (document_id, name, slug, short_description, full_description, duration_minutes, price_per_child, min_guests, max_guests, created_at, updated_at, published_at, created_by_id, updated_by_id, locale)
VALUES ('TEST_PKG_002', 'Test Premium Party', 'test-premium-party', 'A premium test package with enhanced features', 'This is a premium test package with advanced features including VIP area, professional photography, and custom decorations.', 120, 35.0, 8, 25, 1734188400000, 1734188400000, 1734188400000, NULL, NULL, 'en');

INSERT INTO packages (document_id, name, slug, short_description, full_description, duration_minutes, price_per_child, min_guests, max_guests, created_at, updated_at, published_at, created_by_id, updated_by_id, locale)
VALUES ('TEST_PKG_002', 'ტესტ პრემიუმ წვეულება', 'test-premium-party', 'პრემიუმ ტესტ პაკეტი გაუმჯობესებული ფუნქციებით', 'ეს არის პრემიუმ ტესტ პაკეტი მოწინავე ფუნქციებით, მათ შორის VIP ზონა, პროფესიონალური ფოტოგრაფია და მორგებული დეკორაციები.', 120, 35.0, 8, 25, 1734188400000, 1734188400000, 1734188400000, NULL, NULL, 'ka');

INSERT INTO packages (document_id, name, slug, short_description, full_description, duration_minutes, price_per_child, min_guests, max_guests, created_at, updated_at, published_at, created_by_id, updated_by_id, locale)
VALUES ('TEST_PKG_002', 'Тест Премиум Вечеринка', 'test-premium-party', 'Премиум тестовый пакет с улучшенными функциями', 'Это премиум тестовый пакет с расширенными функциями, включая VIP зону, профессиональную фотографию и индивидуальные украшения.', 120, 35.0, 8, 25, 1734188400000, 1734188400000, 1734188400000, NULL, NULL, 'ru');

-- Package 3: Test Deluxe Party (3 locales)
INSERT INTO packages (document_id, name, slug, short_description, full_description, duration_minutes, price_per_child, min_guests, max_guests, created_at, updated_at, published_at, created_by_id, updated_by_id, locale)
VALUES ('TEST_PKG_003', 'Test Deluxe Party', 'test-deluxe-party', 'Ultimate deluxe test package', 'This is the ultimate deluxe test package with all features including exclusive venue access, professional entertainment, catering, and gift bags.', 180, 50.0, 10, 30, 1734188400000, 1734188400000, 1734188400000, NULL, NULL, 'en');

INSERT INTO packages (document_id, name, slug, short_description, full_description, duration_minutes, price_per_child, min_guests, max_guests, created_at, updated_at, published_at, created_by_id, updated_by_id, locale)
VALUES ('TEST_PKG_003', 'ტესტ დელუქს წვეულება', 'test-deluxe-party', 'საბოლოო დელუქს ტესტ პაკეტი', 'ეს არის საბოლოო დელუქს ტესტ პაკეტი ყველა ფუნქციით, მათ შორის ექსკლუზიური ადგილი, პროფესიონალური გართობა, კეითერინგი და საჩუქრის ჩანთები.', 180, 50.0, 10, 30, 1734188400000, 1734188400000, 1734188400000, NULL, NULL, 'ka');

INSERT INTO packages (document_id, name, slug, short_description, full_description, duration_minutes, price_per_child, min_guests, max_guests, created_at, updated_at, published_at, created_by_id, updated_by_id, locale)
VALUES ('TEST_PKG_003', 'Тест Делюкс Вечеринка', 'test-deluxe-party', 'Превосходный делюкс тестовый пакет', 'Это превосходный делюкс тестовый пакет со всеми функциями, включая эксклюзивный доступ к месту, профессиональные развлечения, кейтеринг и подарочные пакеты.', 180, 50.0, 10, 30, 1734188400000, 1734188400000, 1734188400000, NULL, NULL, 'ru');

-- Create features
INSERT INTO components_common_included_features (label, icon) VALUES ('Test Playground Access', 'play');
INSERT INTO components_common_included_features (label, icon) VALUES ('Test Music System', 'music');
INSERT INTO components_common_included_features (label, icon) VALUES ('Test Party Decorations', 'decoration');
INSERT INTO components_common_included_features (label, icon) VALUES ('Test VIP Area Access', 'vip');
INSERT INTO components_common_included_features (label, icon) VALUES ('Test Professional Photos', 'camera');
INSERT INTO components_common_included_features (label, icon) VALUES ('Test Catering Service', 'food');

-- Link features (assuming package IDs 71, 74, 77 for English versions)
-- Adjust IDs based on actual inserted IDs

-- Basic Party features
INSERT INTO packages_cmps (entity_id, cmp_id, component_type, field, "order") VALUES (71, 19, 'common.included-feature', 'includedFeatures', 1.0);
INSERT INTO packages_cmps (entity_id, cmp_id, component_type, field, "order") VALUES (71, 20, 'common.included-feature', 'includedFeatures', 2.0);

-- Premium Party features
INSERT INTO packages_cmps (entity_id, cmp_id, component_type, field, "order") VALUES (74, 21, 'common.included-feature', 'includedFeatures', 1.0);
INSERT INTO packages_cmps (entity_id, cmp_id, component_type, field, "order") VALUES (74, 22, 'common.included-feature', 'includedFeatures', 2.0);
INSERT INTO packages_cmps (entity_id, cmp_id, component_type, field, "order") VALUES (74, 23, 'common.included-feature', 'includedFeatures', 3.0);

-- Deluxe Party features
INSERT INTO packages_cmps (entity_id, cmp_id, component_type, field, "order") VALUES (77, 21, 'common.included-feature', 'includedFeatures', 1.0);
INSERT INTO packages_cmps (entity_id, cmp_id, component_type, field, "order") VALUES (77, 22, 'common.included-feature', 'includedFeatures', 2.0);
INSERT INTO packages_cmps (entity_id, cmp_id, component_type, field, "order") VALUES (77, 23, 'common.included-feature', 'includedFeatures', 3.0);
INSERT INTO packages_cmps (entity_id, cmp_id, component_type, field, "order") VALUES (77, 24, 'common.included-feature', 'includedFeatures', 4.0);
```

---

## Cleanup / Delete Test Packages

If you need to remove the test packages:

```sql
-- Delete package component links
DELETE FROM packages_cmps
WHERE entity_id IN (
  SELECT id FROM packages WHERE document_id LIKE 'TEST_PKG_%'
);

-- Delete test features
DELETE FROM components_common_included_features
WHERE label LIKE 'Test%';

-- Delete test packages
DELETE FROM packages WHERE document_id LIKE 'TEST_PKG_%';
```

---

## API Testing

After creating the packages, test them via Strapi API:

### English Packages
```
GET http://localhost:1337/api/packages?locale=en&filters[name][$contains]=Test
```

### Georgian Packages
```
GET http://localhost:1337/api/packages?locale=ka&filters[name][$contains]=ტესტ
```

### Russian Packages
```
GET http://localhost:1337/api/packages?locale=ru&filters[name][$contains]=Тест
```

---

## Summary

### Packages Created

| Package ID | Document ID | Name (EN) | Locale | Price | Guests | Duration |
|-----------|-------------|-----------|--------|-------|--------|----------|
| 71 | TEST_PKG_001 | Test Basic Party | en | $15 | 5-15 | 90 min |
| 72 | TEST_PKG_001 | ტესტ ძირითადი წვეულება | ka | $15 | 5-15 | 90 min |
| 73 | TEST_PKG_001 | Тест Базовая Вечеринка | ru | $15 | 5-15 | 90 min |
| 74 | TEST_PKG_002 | Test Premium Party | en | $35 | 8-25 | 120 min |
| 75 | TEST_PKG_002 | ტესტ პრემიუმ წვეულება | ka | $35 | 8-25 | 120 min |
| 76 | TEST_PKG_002 | Тест Премиум Вечеринка | ru | $35 | 8-25 | 120 min |
| 77 | TEST_PKG_003 | Test Deluxe Party | en | $50 | 10-30 | 180 min |
| 78 | TEST_PKG_003 | ტესტ დელუქს წვეულება | ka | $50 | 10-30 | 180 min |
| 79 | TEST_PKG_003 | Тест Делюкс Вечеринка | ru | $50 | 10-30 | 180 min |

### Features Created

| Feature ID | Label | Icon |
|-----------|-------|------|
| 19 | Test Playground Access | play |
| 20 | Test Music System | music |
| 21 | Test Party Decorations | decoration |
| 22 | Test VIP Area Access | vip |
| 23 | Test Professional Photos | camera |
| 24 | Test Catering Service | food |

### Key Learnings

1. **Document ID Pattern:** Same `document_id` across all locales for the same content
2. **Published Requirement:** `published_at` must be set for packages to appear in API
3. **Timestamps:** Use milliseconds timestamp (13 digits)
4. **Components:** Features are linked via `packages_cmps` junction table
5. **Ordering:** Use `order` field to control feature display sequence
6. **Localization:** Each locale requires a separate database entry

---

**Status:** ✅ **Successfully Created 3 Test Packages with Full Internationalization**
