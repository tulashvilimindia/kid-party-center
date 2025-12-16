# Package Insert Templates - Ready-to-Use SQL

**Purpose:** Ready-to-use SQL templates for inserting complete packages into Strapi database
**Database:** backend/.tmp/data.db
**Created:** December 15, 2024

---

## 📋 Table of Contents

1. [Quick Start Guide](#quick-start-guide)
2. [Template Variables](#template-variables)
3. [Complete Package Template (3 Locales)](#complete-package-template-3-locales)
4. [Feature Templates](#feature-templates)
5. [Step-by-Step Examples](#step-by-step-examples)
6. [Verification Queries](#verification-queries)
7. [Common Operations](#common-operations)

---

## 🚀 Quick Start Guide

### Prerequisites

1. **Get Current Timestamp:**
```bash
cd backend
sqlite3 .tmp/data.db "SELECT strftime('%s', 'now') * 1000;"
```

2. **Generate Unique document_id:**
```bash
# Use any random string generator or UUID
# Example: kFFZu6U5crq8yWhQ
```

3. **Check Next Available Package ID:**
```sql
SELECT MAX(id) + 1 as next_id FROM packages;
```

### Basic Workflow

1. **Choose a template** from this file
2. **Replace ALL variables** ({{VARIABLE_NAME}})
3. **Copy the complete SQL** for all 3 locales
4. **Execute in SQLite:**
   ```bash
   cd backend
   sqlite3 .tmp/data.db < your_script.sql
   ```
5. **Verify** using verification queries

---

## 📝 Template Variables

Replace these placeholders in templates:

### Required Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `{{TIMESTAMP}}` | Current Unix timestamp (ms) | `1765787529084` |
| `{{DOCUMENT_ID}}` | Unique document identifier | `PKG_ADVENTURE_001` |
| `{{PKG_ID_EN}}` | Package ID for English | `101` |
| `{{PKG_ID_KA}}` | Package ID for Georgian | `102` |
| `{{PKG_ID_RU}}` | Package ID for Russian | `103` |

### English Fields ({{EN_*}})

| Variable | Description | Example |
|----------|-------------|---------|
| `{{EN_NAME}}` | Package name (English) | `Adventure Party` |
| `{{EN_SLUG}}` | URL slug | `adventure-party` |
| `{{EN_SHORT_DESC}}` | Short description (1-2 sentences) | `Perfect for active kids who love games and challenges.` |
| `{{EN_FULL_DESC}}` | Full description (Markdown) | `### Adventure Party\n\nAn exciting party...` |

### Georgian Fields ({{KA_*}})

| Variable | Description | Example |
|----------|-------------|---------|
| `{{KA_NAME}}` | Package name (Georgian) | `თავგადასავლების წვეულება` |
| `{{KA_SLUG}}` | URL slug (same as English) | `adventure-party` |
| `{{KA_SHORT_DESC}}` | Short description | `სრულყოფილია აქტიური ბავშვებისთვის` |
| `{{KA_FULL_DESC}}` | Full description | `### თავგადასავლების წვეულება\n\n...` |

### Russian Fields ({{RU_*}})

| Variable | Description | Example |
|----------|-------------|---------|
| `{{RU_NAME}}` | Package name (Russian) | `Вечеринка-приключение` |
| `{{RU_SLUG}}` | URL slug (same as English) | `adventure-party` |
| `{{RU_SHORT_DESC}}` | Short description | `Идеально для активных детей` |
| `{{RU_FULL_DESC}}` | Full description | `### Вечеринка-приключение\n\n...` |

### Package Details (Same for all locales)

| Variable | Description | Example |
|----------|-------------|---------|
| `{{DURATION}}` | Duration in minutes | `90` |
| `{{PRICE}}` | Price per child (₾) | `35.0` |
| `{{MIN_GUESTS}}` | Minimum guests | `5` |
| `{{MAX_GUESTS}}` | Maximum guests (or NULL) | `20` |

### Feature IDs

| Variable | Description | Example |
|----------|-------------|---------|
| `{{FEAT_1_ID}}` | First feature ID | `29` |
| `{{FEAT_2_ID}}` | Second feature ID | `30` |
| `{{FEAT_3_ID}}` | Third feature ID | `31` |
| `{{FEAT_4_ID}}` | Fourth feature ID | `32` |

---

## 📦 Complete Package Template (3 Locales)

### Template: Standard Package with 4 Features

```sql
-- ============================================================
-- PACKAGE INSERT TEMPLATE
-- ============================================================
-- Variables to replace:
--   {{TIMESTAMP}}     - Current timestamp (get with: SELECT strftime('%s', 'now') * 1000;)
--   {{DOCUMENT_ID}}   - Unique document ID (e.g., PKG_ADVENTURE_001)
--   {{PKG_ID_EN}}     - Package ID for English version
--   {{PKG_ID_KA}}     - Package ID for Georgian version
--   {{PKG_ID_RU}}     - Package ID for Russian version
--   {{EN_NAME}}       - English package name
--   {{KA_NAME}}       - Georgian package name
--   {{RU_NAME}}       - Russian package name
--   {{EN_SLUG}}       - URL slug (lowercase, hyphens)
--   {{EN_SHORT_DESC}} - English short description
--   {{KA_SHORT_DESC}} - Georgian short description
--   {{RU_SHORT_DESC}} - Russian short description
--   {{EN_FULL_DESC}}  - English full description (Markdown)
--   {{KA_FULL_DESC}}  - Georgian full description (Markdown)
--   {{RU_FULL_DESC}}  - Russian full description (Markdown)
--   {{DURATION}}      - Duration in minutes
--   {{PRICE}}         - Price per child (decimal)
--   {{MIN_GUESTS}}    - Minimum number of guests
--   {{MAX_GUESTS}}    - Maximum number of guests (or NULL)
--   {{FEAT_1_ID}}     - Feature 1 ID
--   {{FEAT_2_ID}}     - Feature 2 ID
--   {{FEAT_3_ID}}     - Feature 3 ID
--   {{FEAT_4_ID}}     - Feature 4 ID
-- ============================================================

-- Step 1: Insert English Version
INSERT INTO packages (
  document_id,
  name,
  slug,
  short_description,
  full_description,
  duration_minutes,
  price_per_child,
  min_guests,
  max_guests,
  created_at,
  updated_at,
  published_at,
  created_by_id,
  updated_by_id,
  locale
) VALUES (
  '{{DOCUMENT_ID}}',
  '{{EN_NAME}}',
  '{{EN_SLUG}}',
  '{{EN_SHORT_DESC}}',
  '{{EN_FULL_DESC}}',
  {{DURATION}},
  {{PRICE}},
  {{MIN_GUESTS}},
  {{MAX_GUESTS}},
  {{TIMESTAMP}},
  {{TIMESTAMP}},
  {{TIMESTAMP}},
  1,
  1,
  'en'
);

-- Step 2: Insert Georgian Version
INSERT INTO packages (
  document_id,
  name,
  slug,
  short_description,
  full_description,
  duration_minutes,
  price_per_child,
  min_guests,
  max_guests,
  created_at,
  updated_at,
  published_at,
  created_by_id,
  updated_by_id,
  locale
) VALUES (
  '{{DOCUMENT_ID}}',
  '{{KA_NAME}}',
  '{{EN_SLUG}}',
  '{{KA_SHORT_DESC}}',
  '{{KA_FULL_DESC}}',
  {{DURATION}},
  {{PRICE}},
  {{MIN_GUESTS}},
  {{MAX_GUESTS}},
  {{TIMESTAMP}},
  {{TIMESTAMP}},
  {{TIMESTAMP}},
  1,
  1,
  'ka'
);

-- Step 3: Insert Russian Version
INSERT INTO packages (
  document_id,
  name,
  slug,
  short_description,
  full_description,
  duration_minutes,
  price_per_child,
  min_guests,
  max_guests,
  created_at,
  updated_at,
  published_at,
  created_by_id,
  updated_by_id,
  locale
) VALUES (
  '{{DOCUMENT_ID}}',
  '{{RU_NAME}}',
  '{{EN_SLUG}}',
  '{{RU_SHORT_DESC}}',
  '{{RU_FULL_DESC}}',
  {{DURATION}},
  {{PRICE}},
  {{MIN_GUESTS}},
  {{MAX_GUESTS}},
  {{TIMESTAMP}},
  {{TIMESTAMP}},
  {{TIMESTAMP}},
  1,
  1,
  'ru'
);

-- Step 4: Link Features to English Version
INSERT INTO packages_cmps (entity_id, cmp_id, component_type, field, "order")
VALUES
  ({{PKG_ID_EN}}, {{FEAT_1_ID}}, 'common.included-feature', 'includedFeatures', 1.0),
  ({{PKG_ID_EN}}, {{FEAT_2_ID}}, 'common.included-feature', 'includedFeatures', 2.0),
  ({{PKG_ID_EN}}, {{FEAT_3_ID}}, 'common.included-feature', 'includedFeatures', 3.0),
  ({{PKG_ID_EN}}, {{FEAT_4_ID}}, 'common.included-feature', 'includedFeatures', 4.0);

-- Step 5: Link Features to Georgian Version
INSERT INTO packages_cmps (entity_id, cmp_id, component_type, field, "order")
VALUES
  ({{PKG_ID_KA}}, {{FEAT_1_ID}}, 'common.included-feature', 'includedFeatures', 1.0),
  ({{PKG_ID_KA}}, {{FEAT_2_ID}}, 'common.included-feature', 'includedFeatures', 2.0),
  ({{PKG_ID_KA}}, {{FEAT_3_ID}}, 'common.included-feature', 'includedFeatures', 3.0),
  ({{PKG_ID_KA}}, {{FEAT_4_ID}}, 'common.included-feature', 'includedFeatures', 4.0);

-- Step 6: Link Features to Russian Version
INSERT INTO packages_cmps (entity_id, cmp_id, component_type, field, "order")
VALUES
  ({{PKG_ID_RU}}, {{FEAT_1_ID}}, 'common.included-feature', 'includedFeatures', 1.0),
  ({{PKG_ID_RU}}, {{FEAT_2_ID}}, 'common.included-feature', 'includedFeatures', 2.0),
  ({{PKG_ID_RU}}, {{FEAT_3_ID}}, 'common.included-feature', 'includedFeatures', 3.0),
  ({{PKG_ID_RU}}, {{FEAT_4_ID}}, 'common.included-feature', 'includedFeatures', 4.0);
```

---

## 🎨 Feature Templates

### Create New Features (All 3 Locales)

```sql
-- ============================================================
-- FEATURE INSERT TEMPLATE
-- ============================================================
-- Variables to replace:
--   {{EN_LABEL}}  - English feature label
--   {{KA_LABEL}}  - Georgian feature label
--   {{RU_LABEL}}  - Russian feature label
--   {{ICON}}      - Icon emoji or name
-- ============================================================

-- Insert English Feature
INSERT INTO components_common_included_features (label, icon)
VALUES ('{{EN_LABEL}}', '{{ICON}}');

-- Insert Georgian Feature
INSERT INTO components_common_included_features (label, icon)
VALUES ('{{KA_LABEL}}', '{{ICON}}');

-- Insert Russian Feature
INSERT INTO components_common_included_features (label, icon)
VALUES ('{{RU_LABEL}}', '{{ICON}}');

-- Get the IDs of newly created features
SELECT id, label, icon FROM components_common_included_features
WHERE id >= (SELECT MAX(id) - 2 FROM components_common_included_features)
ORDER BY id;
```

### List Available Features

```sql
-- List all English features (for reference)
SELECT id, label, icon
FROM components_common_included_features
WHERE label NOT LIKE '%ა%' AND label NOT LIKE '%თ%'  -- Exclude Georgian
  AND label NOT LIKE '%я%' AND label NOT LIKE '%ы%'  -- Exclude Russian
ORDER BY id;

-- List all Georgian features
SELECT id, label, icon
FROM components_common_included_features
WHERE label LIKE '%ა%' OR label LIKE '%თ%' OR label LIKE '%ე%'
ORDER BY id;

-- List all Russian features
SELECT id, label, icon
FROM components_common_included_features
WHERE label LIKE '%я%' OR label LIKE '%ы%' OR label LIKE '%и%'
ORDER BY id;
```

---

## 📚 Step-by-Step Examples

### Example 1: Budget Party (₾25)

```sql
-- ============================================================
-- EXAMPLE 1: BASIC BUDGET PARTY
-- Budget Category: < ₾30
-- ============================================================

-- Get current timestamp
-- Run: SELECT strftime('%s', 'now') * 1000;
-- Result: 1765796566000

-- Document ID: PKG_BUDGET_BASIC_001
-- Package IDs: 110 (en), 111 (ka), 112 (ru)
-- Features: 29, 30, 31 (Decorations, Games, Music)

-- English Version (ID: 110)
INSERT INTO packages (
  document_id, name, slug, short_description, full_description,
  duration_minutes, price_per_child, min_guests, max_guests,
  created_at, updated_at, published_at, created_by_id, updated_by_id, locale
) VALUES (
  'PKG_BUDGET_BASIC_001',
  'Basic Fun Party',
  'basic-fun-party',
  'Perfect for small celebrations on a budget.',
  '### Basic Fun Party

An affordable party option that still delivers smiles and laughter!

**What''s Included:**
- Themed decorations
- Hosted games
- Music and dancing

**Perfect For:** Small groups, casual celebrations
**Recommended Age:** 3-8 years',
  60,
  25.0,
  5,
  12,
  1765796566000,
  1765796566000,
  1765796566000,
  1,
  1,
  'en'
);

-- Georgian Version (ID: 111)
INSERT INTO packages (
  document_id, name, slug, short_description, full_description,
  duration_minutes, price_per_child, min_guests, max_guests,
  created_at, updated_at, published_at, created_by_id, updated_by_id, locale
) VALUES (
  'PKG_BUDGET_BASIC_001',
  'ძირითადი გასართობი წვეულება',
  'basic-fun-party',
  'იდეალურია პატარა დღესასწაულებისთვის ეკონომიური ბიუჯეტით.',
  '### ძირითადი გასართობი წვეულება

ხელმისაწვდომი ვარიანტი, რომელიც მაინც მოგიტანთ ღიმილსა და სიხარულს!

**რა შედის:**
- თემატური დეკორაციები
- თამაშები წამყვანთან ერთად
- მუსიკა და ცეკვა

**შესაფერისია:** პატარა ჯგუფებისთვის, ყოველდღიური დღესასწაულებისთვის
**რეკომენდებული ასაკი:** 3-8 წელი',
  60,
  25.0,
  5,
  12,
  1765796566000,
  1765796566000,
  1765796566000,
  1,
  1,
  'ka'
);

-- Russian Version (ID: 112)
INSERT INTO packages (
  document_id, name, slug, short_description, full_description,
  duration_minutes, price_per_child, min_guests, max_guests,
  created_at, updated_at, published_at, created_by_id, updated_by_id, locale
) VALUES (
  'PKG_BUDGET_BASIC_001',
  'Базовая Веселая Вечеринка',
  'basic-fun-party',
  'Идеально подходит для небольших праздников с ограниченным бюджетом.',
  '### Базовая Веселая Вечеринка

Доступный вариант вечеринки, который все равно подарит улыбки и смех!

**Что включено:**
- Тематический декор
- Игры с ведущим
- Музыка и танцы

**Подходит для:** Небольших групп, простых праздников
**Рекомендуемый возраст:** 3-8 лет',
  60,
  25.0,
  5,
  12,
  1765796566000,
  1765796566000,
  1765796566000,
  1,
  1,
  'ru'
);

-- Link Features (English)
INSERT INTO packages_cmps (entity_id, cmp_id, component_type, field, "order")
VALUES
  (110, 29, 'common.included-feature', 'includedFeatures', 1.0),
  (110, 30, 'common.included-feature', 'includedFeatures', 2.0),
  (110, 31, 'common.included-feature', 'includedFeatures', 3.0);

-- Link Features (Georgian)
INSERT INTO packages_cmps (entity_id, cmp_id, component_type, field, "order")
VALUES
  (111, 39, 'common.included-feature', 'includedFeatures', 1.0),
  (111, 40, 'common.included-feature', 'includedFeatures', 2.0),
  (111, 41, 'common.included-feature', 'includedFeatures', 3.0);

-- Link Features (Russian)
INSERT INTO packages_cmps (entity_id, cmp_id, component_type, field, "order")
VALUES
  (112, 42, 'common.included-feature', 'includedFeatures', 1.0),
  (112, 43, 'common.included-feature', 'includedFeatures', 2.0),
  (112, 44, 'common.included-feature', 'includedFeatures', 3.0);
```

---

### Example 2: Standard Party (₾35)

```sql
-- ============================================================
-- EXAMPLE 2: STANDARD ADVENTURE PARTY
-- Standard Category: ₾30-₾49
-- ============================================================

-- Timestamp: 1765796566000
-- Document ID: PKG_STANDARD_ADVENTURE_001
-- Package IDs: 113 (en), 114 (ka), 115 (ru)
-- Features: 29, 30, 31, 32 (Decorations, Games, Music, Cleanup)

-- English Version (ID: 113)
INSERT INTO packages (
  document_id, name, slug, short_description, full_description,
  duration_minutes, price_per_child, min_guests, max_guests,
  created_at, updated_at, published_at, created_by_id, updated_by_id, locale
) VALUES (
  'PKG_STANDARD_ADVENTURE_001',
  'Adventure Quest Party',
  'adventure-quest-party',
  'An exciting adventure-themed party with games, challenges, and prizes.',
  '### Adventure Quest Party

Embark on an exciting journey filled with challenges, teamwork, and fun!

**What''s Included:**
- Themed adventure decorations
- Interactive games and challenges
- Music and entertainment
- Setup and cleanup included

**Perfect For:** Active kids who love challenges
**Recommended Age:** 5-10 years
**Duration:** 90 minutes of non-stop adventure',
  90,
  35.0,
  8,
  20,
  1765796566000,
  1765796566000,
  1765796566000,
  1,
  1,
  'en'
);

-- Georgian Version (ID: 114)
INSERT INTO packages (
  document_id, name, slug, short_description, full_description,
  duration_minutes, price_per_child, min_guests, max_guests,
  created_at, updated_at, published_at, created_by_id, updated_by_id, locale
) VALUES (
  'PKG_STANDARD_ADVENTURE_001',
  'თავგადასავლების კვესტი წვეულება',
  'adventure-quest-party',
  'ამაღელვებელი თავგადასავლების თემატიკის წვეულება თამაშებით, გამოწვევებით და პრიზებით.',
  '### თავგადასავლების კვესტი წვეულება

დაიწყე საინტერესო მოგზაურობა, სავსე გამოწვევებით, გუნდური მუშაობითა და გართობით!

**რა შედის:**
- თავგადასავლების თემატური დეკორაციები
- ინტერაქტიული თამაშები და გამოწვევები
- მუსიკა და გართობა
- მომზადება და დალაგება შედის

**შესაფერისია:** აქტიური ბავშვებისთვის, რომლებიც უყვართ გამოწვევები
**რეკომენდებული ასაკი:** 5-10 წელი
**ხანგრძლივობა:** 90 წუთი უწყვეტი თავგადასავალი',
  90,
  35.0,
  8,
  20,
  1765796566000,
  1765796566000,
  1765796566000,
  1,
  1,
  'ka'
);

-- Russian Version (ID: 115)
INSERT INTO packages (
  document_id, name, slug, short_description, full_description,
  duration_minutes, price_per_child, min_guests, max_guests,
  created_at, updated_at, published_at, created_by_id, updated_by_id, locale
) VALUES (
  'PKG_STANDARD_ADVENTURE_001',
  'Вечеринка-квест Приключения',
  'adventure-quest-party',
  'Захватывающая вечеринка в стиле приключений с играми, испытаниями и призами.',
  '### Вечеринка-квест Приключения

Отправляйтесь в увлекательное путешествие, полное испытаний, командной работы и веселья!

**Что включено:**
- Тематический декор приключений
- Интерактивные игры и испытания
- Музыка и развлечения
- Подготовка и уборка включены

**Подходит для:** Активных детей, любящих вызовы
**Рекомендуемый возраст:** 5-10 лет
**Длительность:** 90 минут непрерывных приключений',
  90,
  35.0,
  8,
  20,
  1765796566000,
  1765796566000,
  1765796566000,
  1,
  1,
  'ru'
);

-- Link Features (English)
INSERT INTO packages_cmps (entity_id, cmp_id, component_type, field, "order")
VALUES
  (113, 29, 'common.included-feature', 'includedFeatures', 1.0),
  (113, 30, 'common.included-feature', 'includedFeatures', 2.0),
  (113, 31, 'common.included-feature', 'includedFeatures', 3.0),
  (113, 32, 'common.included-feature', 'includedFeatures', 4.0);

-- Link Features (Georgian)
INSERT INTO packages_cmps (entity_id, cmp_id, component_type, field, "order")
VALUES
  (114, 39, 'common.included-feature', 'includedFeatures', 1.0),
  (114, 40, 'common.included-feature', 'includedFeatures', 2.0),
  (114, 41, 'common.included-feature', 'includedFeatures', 3.0);

-- Link Features (Russian)
INSERT INTO packages_cmps (entity_id, cmp_id, component_type, field, "order")
VALUES
  (115, 42, 'common.included-feature', 'includedFeatures', 1.0),
  (115, 43, 'common.included-feature', 'includedFeatures', 2.0),
  (115, 44, 'common.included-feature', 'includedFeatures', 3.0),
  (115, 45, 'common.included-feature', 'includedFeatures', 4.0);
```

---

### Example 3: Premium Party (₾55)

```sql
-- ============================================================
-- EXAMPLE 3: PREMIUM VIP PARTY
-- Premium Category: ≥ ₾50
-- ============================================================

-- Timestamp: 1765796566000
-- Document ID: PKG_PREMIUM_VIP_001
-- Package IDs: 116 (en), 117 (ka), 118 (ru)
-- Features: 29, 30, 31, 32 (All features)

-- English Version (ID: 116)
INSERT INTO packages (
  document_id, name, slug, short_description, full_description,
  duration_minutes, price_per_child, min_guests, max_guests,
  created_at, updated_at, published_at, created_by_id, updated_by_id, locale
) VALUES (
  'PKG_PREMIUM_VIP_001',
  'Ultimate VIP Experience',
  'ultimate-vip-experience',
  'The ultimate party experience with exclusive features and personalized service.',
  '### Ultimate VIP Experience

The most comprehensive party package with everything your child could dream of!

**What''s Included:**
- Premium themed decorations
- Professional host and games coordinator
- Premium music and entertainment system
- Full setup and cleanup service
- VIP party favors for all guests
- Professional photography (optional add-on)

**Perfect For:** Extra special celebrations
**Recommended Age:** 4-12 years
**Duration:** 2 hours of unforgettable fun
**Capacity:** 10-30 guests',
  120,
  55.0,
  10,
  30,
  1765796566000,
  1765796566000,
  1765796566000,
  1,
  1,
  'en'
);

-- Georgian Version (ID: 117)
INSERT INTO packages (
  document_id, name, slug, short_description, full_description,
  duration_minutes, price_per_child, min_guests, max_guests,
  created_at, updated_at, published_at, created_by_id, updated_by_id, locale
) VALUES (
  'PKG_PREMIUM_VIP_001',
  'საბოლოო VIP გამოცდილება',
  'ultimate-vip-experience',
  'საბოლოო წვეულების გამოცდილება ექსკლუზიური ფუნქციებითა და პერსონალიზებული სერვისით.',
  '### საბოლოო VIP გამოცდილება

ყველაზე ყოვლისმომცველი წვეულების პაკეტი ყველაფრით, რაზეც თქვენი შვილი ოცნებობდა!

**რა შედის:**
- პრემიუმ თემატური დეკორაციები
- პროფესიონალი წამყვანი და თამაშების კოორდინატორი
- პრემიუმ მუსიკა და გართობის სისტემა
- სრული მომზადება და დალაგების სერვისი
- VIP წვეულების სუვენირები ყველა სტუმრისთვის
- პროფესიონალური ფოტოგრაფია (დამატებითი ოფცია)

**შესაფერისია:** განსაკუთრებული დღესასწაულებისთვის
**რეკომენდებული ასაკი:** 4-12 წელი
**ხანგრძლივობა:** 2 საათი დაუვიწყარი გართობის
**ტევადობა:** 10-30 სტუმარი',
  120,
  55.0,
  10,
  30,
  1765796566000,
  1765796566000,
  1765796566000,
  1,
  1,
  'ka'
);

-- Russian Version (ID: 118)
INSERT INTO packages (
  document_id, name, slug, short_description, full_description,
  duration_minutes, price_per_child, min_guests, max_guests,
  created_at, updated_at, published_at, created_by_id, updated_by_id, locale
) VALUES (
  'PKG_PREMIUM_VIP_001',
  'Максимальный VIP Опыт',
  'ultimate-vip-experience',
  'Максимальный опыт вечеринки с эксклюзивными функциями и персонализированным обслуживанием.',
  '### Максимальный VIP Опыт

Самый полный пакет вечеринки со всем, о чем мог мечтать ваш ребенок!

**Что включено:**
- Премиум тематический декор
- Профессиональный ведущий и координатор игр
- Премиум музыка и развлекательная система
- Полная подготовка и уборка
- VIP подарки для всех гостей
- Профессиональная фотография (дополнительная опция)

**Подходит для:** Особо важных праздников
**Рекомендуемый возраст:** 4-12 лет
**Длительность:** 2 часа незабываемого веселья
**Вместимость:** 10-30 гостей',
  120,
  55.0,
  10,
  30,
  1765796566000,
  1765796566000,
  1765796566000,
  1,
  1,
  'ru'
);

-- Link Features (English)
INSERT INTO packages_cmps (entity_id, cmp_id, component_type, field, "order")
VALUES
  (116, 29, 'common.included-feature', 'includedFeatures', 1.0),
  (116, 30, 'common.included-feature', 'includedFeatures', 2.0),
  (116, 31, 'common.included-feature', 'includedFeatures', 3.0),
  (116, 32, 'common.included-feature', 'includedFeatures', 4.0);

-- Link Features (Georgian)
INSERT INTO packages_cmps (entity_id, cmp_id, component_type, field, "order")
VALUES
  (117, 39, 'common.included-feature', 'includedFeatures', 1.0),
  (117, 40, 'common.included-feature', 'includedFeatures', 2.0),
  (117, 41, 'common.included-feature', 'includedFeatures', 3.0);

-- Link Features (Russian)
INSERT INTO packages_cmps (entity_id, cmp_id, component_type, field, "order")
VALUES
  (118, 42, 'common.included-feature', 'includedFeatures', 1.0),
  (118, 43, 'common.included-feature', 'includedFeatures', 2.0),
  (118, 44, 'common.included-feature', 'includedFeatures', 3.0),
  (118, 45, 'common.included-feature', 'includedFeatures', 4.0);
```

---

## ✅ Verification Queries

### After Inserting Packages

```sql
-- 1. Check package count per locale
SELECT locale, COUNT(*) as count
FROM packages
WHERE published_at IS NOT NULL
GROUP BY locale
ORDER BY locale;
-- Expected: Each locale should have same count

-- 2. Verify specific package has all locales
SELECT id, document_id, name, locale, price_per_child
FROM packages
WHERE document_id = 'PKG_BUDGET_BASIC_001'
ORDER BY locale;
-- Expected: 3 rows (en, ka, ru)

-- 3. Check package features
SELECT
  p.name,
  f.label,
  f.icon,
  pc."order"
FROM packages p
JOIN packages_cmps pc ON p.id = pc.entity_id
JOIN components_common_included_features f ON pc.cmp_id = f.id
WHERE p.id = 110
ORDER BY pc."order";

-- 4. List all packages with locale count
SELECT
  document_id,
  MAX(CASE WHEN locale = 'en' THEN name END) as name_en,
  MAX(CASE WHEN locale = 'ka' THEN name END) as name_ka,
  MAX(CASE WHEN locale = 'ru' THEN name END) as name_ru,
  COUNT(DISTINCT locale) as locale_count
FROM packages
WHERE published_at IS NOT NULL
GROUP BY document_id
ORDER BY name_en;
-- Expected: locale_count should be 3 for all packages

-- 5. Check for orphaned translations
SELECT COUNT(*) as orphaned
FROM packages
WHERE locale IN ('ka', 'ru')
  AND document_id NOT IN (
    SELECT document_id FROM packages WHERE locale = 'en'
  );
-- Expected: 0 (no orphaned translations)
```

---

## 🔧 Common Operations

### Update Package Price

```sql
-- Update price for all locales of a package
UPDATE packages
SET price_per_child = 40.0,
    updated_at = (SELECT strftime('%s', 'now') * 1000)
WHERE document_id = 'PKG_STANDARD_ADVENTURE_001';
```

### Add Feature to Existing Package

```sql
-- Add feature ID 32 to package ID 110 (English)
INSERT INTO packages_cmps (entity_id, cmp_id, component_type, field, "order")
VALUES (110, 32, 'common.included-feature', 'includedFeatures', 4.0);
```

### Remove Feature from Package

```sql
-- Remove feature ID 32 from package ID 110
DELETE FROM packages_cmps
WHERE entity_id = 110 AND cmp_id = 32;
```

### Reorder Features

```sql
-- Swap order of features (swap 1.0 and 2.0)
UPDATE packages_cmps SET "order" = 2.0 WHERE entity_id = 110 AND cmp_id = 29;
UPDATE packages_cmps SET "order" = 1.0 WHERE entity_id = 110 AND cmp_id = 30;
```

### Delete Package (All Locales)

```sql
-- Delete package and all its translations
DELETE FROM packages
WHERE document_id = 'PKG_BUDGET_BASIC_001';

-- Note: packages_cmps entries are auto-deleted (ON DELETE CASCADE)
```

### Publish/Unpublish Package

```sql
-- Publish (make visible in API)
UPDATE packages
SET published_at = (SELECT strftime('%s', 'now') * 1000),
    updated_at = (SELECT strftime('%s', 'now') * 1000)
WHERE document_id = 'PKG_BUDGET_BASIC_001';

-- Unpublish (make draft)
UPDATE packages
SET published_at = NULL,
    updated_at = (SELECT strftime('%s', 'now') * 1000)
WHERE document_id = 'PKG_BUDGET_BASIC_001';
```

---

## 📋 Checklist for New Package

- [ ] Choose unique `document_id` (e.g., PKG_CATEGORY_NAME_001)
- [ ] Get current timestamp: `SELECT strftime('%s', 'now') * 1000;`
- [ ] Check next available IDs: `SELECT MAX(id) + 1 FROM packages;`
- [ ] Prepare all 3 translations (en, ka, ru)
- [ ] Choose features or create new ones
- [ ] Replace all `{{VARIABLES}}` in template
- [ ] Execute SQL script
- [ ] Verify with verification queries
- [ ] Test in Strapi admin (switch locales)
- [ ] Test in frontend (all 3 languages)

---

## 🎯 Quick Reference: Price Categories

| Category | Price Range | Badge | Display |
|----------|-------------|-------|---------|
| **Budget** | < ₾30 | 💰 Budget | Budget Friendly |
| **Standard** | ₾30 - ₾49 | ✨ Popular | Standard |
| **Premium** | ≥ ₾50 | ⭐ Premium | Premium |

**Note:** Categories are NOT stored in database. They're calculated in frontend based on `price_per_child` value.

---

## 📚 See Also

- `STRAPI_DATABASE_SCHEMA_MAP.md` - Complete database reference
- `WHY_PACKAGES_CMPS_TABLE.md` - Junction table explanation
- `STRAPI_TEST_PACKAGES_CREATION.md` - Original test package creation
- `PACKAGES_CLEANUP_REPORT.md` - Database maintenance guide

---

**Last Updated:** December 15, 2024
**Database:** SQLite 3
**Strapi Version:** 5.31.3
