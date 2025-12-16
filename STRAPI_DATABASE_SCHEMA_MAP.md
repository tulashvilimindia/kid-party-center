# Strapi Database Schema Map - Complete Reference

**Database:** SQLite (backend/.tmp/data.db)
**Generated:** December 15, 2024
**Total Tables:** 56

---

## 📋 Table of Contents

1. [Content Tables](#content-tables)
2. [Component Tables](#component-tables)
3. [Junction/Link Tables](#junctionlink-tables)
4. [Media & File Tables](#media--file-tables)
5. [User & Authentication Tables](#user--authentication-tables)
6. [System & Configuration Tables](#system--configuration-tables)
7. [Strapi Internal Tables](#strapi-internal-tables)
8. [Common Field Patterns](#common-field-patterns)

---

## 🎯 Content Tables

These tables store your main website content and support i18n (internationalization).

### 1. `packages` - Party Packages

**Purpose:** Stores party packages offered by the venue
**i18n:** Yes (en, ka, ru)
**Draft & Publish:** Yes

**Schema:**
```sql
CREATE TABLE packages (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  document_id VARCHAR(255),           -- Groups locales together
  name VARCHAR(255),                  -- Package name
  slug VARCHAR(255),                  -- URL-friendly slug
  short_description TEXT,             -- Brief description (1-2 sentences)
  full_description TEXT,              -- Full richtext description (Markdown)
  duration_minutes INTEGER,           -- Party duration
  price_per_child FLOAT,              -- Price per child (₾)
  min_guests INTEGER,                 -- Minimum number of guests
  max_guests INTEGER,                 -- Maximum number of guests (NULL = unlimited)
  created_at DATETIME,                -- Creation timestamp
  updated_at DATETIME,                -- Last update timestamp
  published_at DATETIME,              -- Publish timestamp (NULL = draft)
  created_by_id INTEGER,              -- Admin user who created
  updated_by_id INTEGER,              -- Admin user who last updated
  locale VARCHAR(255)                 -- Language code (en, ka, ru)
);
```

**Indexes:**
- `packages_documents_idx` on (document_id, locale, published_at)
- `packages_created_by_id_fk` on (created_by_id)
- `packages_updated_by_id_fk` on (updated_by_id)

**Foreign Keys:**
- `created_by_id` → admin_users.id ON DELETE SET NULL
- `updated_by_id` → admin_users.id ON DELETE SET NULL

**Related Tables:**
- `packages_cmps` (links to included features)
- `files_related_mph` (links to images)

**API Endpoint:** `/api/packages?locale={locale}&populate=*`

**Category Logic:** NOT stored in database. Categories (Budget/Standard/Premium) are calculated in frontend based on `price_per_child`:
- Budget: < ₾30
- Standard: ₾30-₾49
- Premium: ≥ ₾50

---

### 2. `abouts` - About Page Content

**Purpose:** Stores About page text content
**i18n:** Yes (en, ka, ru)
**Draft & Publish:** Yes

**Schema:**
```sql
CREATE TABLE abouts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  document_id VARCHAR(255),
  abouttext JSON,                     -- All about page fields as JSON object
  created_at DATETIME,
  updated_at DATETIME,
  published_at DATETIME,
  created_by_id INTEGER,
  updated_by_id INTEGER,
  locale VARCHAR(255)
);
```

**JSON Structure (abouttext field):**
```json
{
  "page_title": "About Us",
  "page_subtitle": "Learn about our story",
  "hero_title": "Welcome to BeqaParty",
  "hero_description": "Creating magical moments...",
  "story_title": "Our Story",
  "story_paragraph_1": "We started in...",
  // ... (50+ fields)
}
```

**API Endpoint:** `/api/about?locale={locale}`

---

### 3. `contacts` - Contact Page Content

**Purpose:** Stores Contact page text content
**i18n:** Yes (en, ka, ru)
**Draft & Publish:** Yes

**Schema:**
```sql
CREATE TABLE contacts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  document_id VARCHAR(255),
  contact JSON,                       -- All contact page fields as JSON object
  created_at DATETIME,
  updated_at DATETIME,
  published_at DATETIME,
  created_by_id INTEGER,
  updated_by_id INTEGER,
  locale VARCHAR(255)
);
```

**JSON Structure (contact field):**
```json
{
  "page_title": "Contact Us",
  "page_subtitle": "Get in Touch",
  "form_title": "Send Us a Message",
  "form_name": "Name",
  "form_email": "Email",
  "form_phone": "Phone",
  "form_package": "Package Interest",
  "info_phone_value": "+995 577 123 456",
  "info_email_value": "info@beqaparty.ge",
  // ... (52 total fields)
}
```

**API Endpoint:** `/api/contact?locale={locale}`

---

### 4. `faqs` - FAQ Page Content

**Purpose:** Stores FAQ page questions and answers
**i18n:** Yes (en, ka, ru)
**Draft & Publish:** Yes

**Schema:**
```sql
CREATE TABLE faqs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  document_id VARCHAR(255),
  faquestions JSON,                   -- All FAQ fields as JSON object
  created_at DATETIME,
  updated_at DATETIME,
  published_at DATETIME,
  created_by_id INTEGER,
  updated_by_id INTEGER,
  locale VARCHAR(255)
);
```

**JSON Structure (faquestions field):**
```json
{
  "page_title": "Frequently Asked Questions",
  "page_subtitle": "Find answers to common questions",
  "category_1_title": "Booking & Reservations",
  "q1_question": "How far in advance should I book?",
  "q1_answer": "We recommend booking at least 2 weeks in advance...",
  // ... (60+ fields with questions and answers)
}
```

**API Endpoint:** `/api/faq?locale={locale}`

---

### 5. `terms` - Terms & Conditions Page Content

**Purpose:** Stores Terms & Conditions page content
**i18n:** Yes (en, ka, ru)
**Draft & Publish:** Yes

**Schema:**
```sql
CREATE TABLE terms (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  document_id VARCHAR(255),
  conditions JSON,                    -- All terms fields as JSON object
  created_at DATETIME,
  updated_at DATETIME,
  published_at DATETIME,
  created_by_id INTEGER,
  updated_by_id INTEGER,
  locale VARCHAR(255)
);
```

**JSON Structure (conditions field):**
```json
{
  "page_title": "Terms & Conditions",
  "page_subtitle": "Please read carefully",
  "intro_text": "By using our services...",
  "section_1_title": "Booking Policy",
  "section_1_content": "All bookings require...",
  // ... (40+ fields)
}
```

**API Endpoint:** `/api/term?locale={locale}`

---

### 6. `homepages` - Homepage Content

**Purpose:** Stores Homepage dynamic text content
**i18n:** Yes (en, ka, ru)
**Draft & Publish:** Yes

**Schema:**
```sql
CREATE TABLE homepages (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  document_id VARCHAR(255),
  homepagetexts JSON,                 -- All homepage fields as JSON object
  created_at DATETIME,
  updated_at DATETIME,
  published_at DATETIME,
  created_by_id INTEGER,
  updated_by_id INTEGER,
  locale VARCHAR(255)
);
```

**JSON Structure (homepagetexts field):**
```json
{
  "hero_title_fallback": "Unforgettable Birthday Parties!",
  "hero_subtitle_fallback": "Create magical memories...",
  "features_title": "Why Choose STAR?",
  "packages_title": "Popular Party Packages",
  "cta_title_fallback": "Ready to Plan?",
  // ... (30+ fields)
}
```

**API Endpoint:** `/api/homepage?locale={locale}`

**Note:** Some hero fields come from `site_settings` table instead

---

### 7. `site_settings` - Global Site Settings

**Purpose:** Stores site-wide settings and text
**i18n:** Yes (en, ka, ru)
**Draft & Publish:** Yes

**Schema:**
```sql
CREATE TABLE site_settings (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  document_id VARCHAR(255),
  -- Hero Section
  hero_title VARCHAR(255),
  hero_subtitle VARCHAR(255),
  intro_text TEXT,

  -- Contact Info
  phone VARCHAR(255),
  email VARCHAR(255),
  address VARCHAR(255),

  -- Social Media
  facebook_url VARCHAR(255),
  instagram_url VARCHAR(255),

  -- Features Section
  feature_venue_title VARCHAR(255),
  feature_venue_description TEXT,
  feature_activities_title VARCHAR(255),
  feature_activities_description TEXT,
  feature_food_title VARCHAR(255),
  feature_food_description TEXT,
  feature_stress_free_title VARCHAR(255),
  feature_stress_free_description TEXT,

  -- Packages Section
  packages_title VARCHAR(255),
  packages_subtitle TEXT,

  -- CTA Section
  cta_title VARCHAR(255),
  cta_subtitle TEXT,

  -- Footer
  footer_about_title VARCHAR(255),
  footer_about_text TEXT,
  footer_tagline VARCHAR(255),

  created_at DATETIME,
  updated_at DATETIME,
  published_at DATETIME,
  created_by_id INTEGER,
  updated_by_id INTEGER,
  locale VARCHAR(255)
);
```

**API Endpoint:** `/api/site-setting?locale={locale}`

---

### 8. `party_slots` - Calendar Availability

**Purpose:** Stores available party time slots for booking calendar
**i18n:** Yes (supports locale but content is locale-independent)
**Draft & Publish:** Yes

**Schema:**
```sql
CREATE TABLE party_slots (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  document_id VARCHAR(255),
  date DATE,                          -- Party date (YYYY-MM-DD)
  start_time TIME,                    -- Start time (HH:MM:SS)
  end_time TIME,                      -- End time (HH:MM:SS)
  status VARCHAR(255),                -- available, booked, blocked
  max_parties INTEGER,                -- Maximum simultaneous parties
  booked_parties INTEGER,             -- Currently booked parties
  created_at DATETIME,
  updated_at DATETIME,
  published_at DATETIME,
  created_by_id INTEGER,
  updated_by_id INTEGER,
  locale VARCHAR(255)
);
```

**Status Values:**
- `available` - Slot is open for booking
- `booked` - Slot is fully booked
- `blocked` - Slot is blocked (maintenance, holiday, etc.)

**API Endpoint:** `/api/party-slots?locale={locale}`

---

### 9. `menu_items` - Food Menu Items

**Purpose:** Stores food and beverage menu items
**i18n:** Yes (en, ka, ru)
**Draft & Publish:** Yes

**Schema:**
```sql
CREATE TABLE menu_items (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  document_id VARCHAR(255),
  name VARCHAR(255),                  -- Menu item name
  category VARCHAR(255),              -- food, drinks, snacks, desserts
  price_per_child FLOAT,              -- Price per child (₾)
  description TEXT,                   -- Item description
  created_at DATETIME,
  updated_at DATETIME,
  published_at DATETIME,
  created_by_id INTEGER,
  updated_by_id INTEGER,
  locale VARCHAR(255)
);
```

**API Endpoint:** `/api/menu-items?locale={locale}`

---

### 10. `galleries` - Photo Galleries

**Purpose:** Stores photo gallery collections
**i18n:** Yes (en, ka, ru)
**Draft & Publish:** Yes

**Schema:**
```sql
CREATE TABLE galleries (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  document_id VARCHAR(255),
  title VARCHAR(255),                 -- Gallery title
  folder VARCHAR(255),                -- Folder name/identifier
  created_at DATETIME,
  updated_at DATETIME,
  published_at DATETIME,
  created_by_id INTEGER,
  updated_by_id INTEGER,
  locale VARCHAR(255)
);
```

**API Endpoint:** `/api/galleries?locale={locale}`

**Note:** Actual images are stored in `files` table and linked via `files_related_mph`

---

## 🧩 Component Tables

These tables store reusable components used in content types.

### 1. `components_common_included_features` - Package Features

**Purpose:** Stores reusable features that can be added to packages
**i18n:** No (separate entries per language)
**Used By:** packages (via packages_cmps)

**Schema:**
```sql
CREATE TABLE components_common_included_features (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  label VARCHAR(255),                 -- Feature name/label
  icon VARCHAR(255)                   -- Icon emoji or icon name
);
```

**Examples:**
```
id | label                    | icon
---|--------------------------|---------
29 | Themed decorations       | ✨
30 | Hosted games             | 🎲
31 | Music & dance            | 🎵
32 | Setup & cleanup          | 🧹
39 | თემატური დეკორაციები     | ✨
40 | თამაშები წამყვანთან ერთად | 🎲
```

**How It Works:**
- Features are created once (per language)
- Linked to packages via `packages_cmps` junction table
- Same feature can be reused across multiple packages
- Each link has an `order` field for display sequence

**Strapi Configuration:**
- File: `backend/src/components/common/included-feature.json`
- Component: `common.included-feature`
- Type: Repeatable component

---

## 🔗 Junction/Link Tables

These tables create many-to-many relationships between content and components/media.

### 1. `packages_cmps` - Package-to-Components Links

**Purpose:** Links packages to their included features
**Pattern:** Many-to-Many (packages ↔ components)

**Schema:**
```sql
CREATE TABLE packages_cmps (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  entity_id INTEGER,                  -- Package ID (references packages.id)
  cmp_id INTEGER,                     -- Component ID (references components table)
  component_type VARCHAR(255),        -- 'common.included-feature'
  field VARCHAR(255),                 -- 'includedFeatures'
  "order" FLOAT,                      -- Display order (1.0, 2.0, 3.0...)

  FOREIGN KEY (entity_id) REFERENCES packages(id) ON DELETE CASCADE
);
```

**Indexes:**
- `packages_field_idx` on (field)
- `packages_component_type_idx` on (component_type)
- `packages_entity_fk` on (entity_id)
- UNIQUE INDEX `packages_uq` on (entity_id, cmp_id, field, component_type)

**Example:**
```
Package: Star Adventure Party (ID: 86)
Links to features:
  entity_id | cmp_id | order
  86        | 29     | 1.0    (Themed decorations)
  86        | 30     | 2.0    (Hosted games)
  86        | 31     | 3.0    (Music & dance)
  86        | 32     | 4.0    (Setup & cleanup)
```

**Key Points:**
- `ON DELETE CASCADE` - Deleting a package auto-deletes its feature links
- `order` field controls display sequence in frontend
- UNIQUE constraint prevents duplicate feature assignments

**See Also:** `WHY_PACKAGES_CMPS_TABLE.md` for detailed explanation

---

### 2. `files_related_mph` - Media-to-Content Links

**Purpose:** Links media files to content (morphic/polymorphic relationship)
**Pattern:** Many-to-Many (files ↔ any content type)

**Schema:**
```sql
CREATE TABLE files_related_mph (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  file_id INTEGER,                    -- File ID (references files.id)
  related_id INTEGER,                 -- Content ID (packages.id, galleries.id, etc.)
  related_type VARCHAR(255),          -- Content type (packages, galleries, etc.)
  field VARCHAR(255),                 -- Field name (image, images, cover, etc.)
  "order" FLOAT                       -- Order for multiple images
);
```

**Example:**
```
Package with image:
  file_id | related_id | related_type | field | order
  45      | 86         | packages     | image | 1.0
```

**Supported Content Types:**
- `packages` - Package images
- `galleries` - Gallery images
- `menu_items` - Food item images
- `abouts` - About page images

---

## 📁 Media & File Tables

These tables manage uploaded files and media.

### 1. `files` - Uploaded Files

**Purpose:** Stores all uploaded media files (images, videos, documents)
**i18n:** Yes (supports locale but usually locale-independent)
**Draft & Publish:** Yes

**Schema:**
```sql
CREATE TABLE files (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  document_id VARCHAR(255),
  name VARCHAR(255),                  -- File name
  alternative_text VARCHAR(255),      -- Alt text for accessibility
  caption VARCHAR(255),               -- Image caption
  width INTEGER,                      -- Image width (px)
  height INTEGER,                     -- Image height (px)
  formats JSON,                       -- Generated thumbnails/sizes
  hash VARCHAR(255),                  -- Unique file hash
  ext VARCHAR(255),                   -- File extension (.jpg, .png, etc.)
  mime VARCHAR(255),                  -- MIME type (image/jpeg, etc.)
  size FLOAT,                         -- File size (KB)
  url VARCHAR(255),                   -- Public URL
  preview_url VARCHAR(255),           -- Preview URL
  provider VARCHAR(255),              -- Storage provider (local, s3, etc.)
  provider_metadata JSON,             -- Provider-specific metadata
  folder_path VARCHAR(255),           -- Organization folder path
  created_at DATETIME,
  updated_at DATETIME,
  published_at DATETIME,
  created_by_id INTEGER,
  updated_by_id INTEGER,
  locale VARCHAR(255)
);
```

**Indexes:**
- `upload_files_folder_path_index` on (folder_path)
- `upload_files_created_at_index` on (created_at)
- `upload_files_updated_at_index` on (updated_at)
- `upload_files_name_index` on (name)
- `upload_files_size_index` on (size)
- `upload_files_ext_index` on (ext)

**Formats JSON Example:**
```json
{
  "thumbnail": {
    "name": "thumbnail_image.jpg",
    "hash": "thumbnail_hash",
    "ext": ".jpg",
    "mime": "image/jpeg",
    "width": 156,
    "height": 156,
    "size": 3.97,
    "url": "/uploads/thumbnail_image.jpg"
  },
  "small": { ... },
  "medium": { ... },
  "large": { ... }
}
```

**API Endpoint:** `/api/upload/files`

**Related Tables:**
- `files_related_mph` - Links files to content
- `files_folder_lnk` - Links files to folders
- `upload_folders` - Folder organization

---

### 2. `upload_folders` - Media Organization

**Purpose:** Organizes uploaded files into folders
**Pattern:** Tree structure (self-referential)

**Schema:**
```sql
CREATE TABLE upload_folders (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  document_id VARCHAR(255),
  name VARCHAR(255),                  -- Folder name
  path_id INTEGER,                    -- Unique path identifier
  path VARCHAR(255),                  -- Full folder path
  created_at DATETIME,
  updated_at DATETIME,
  published_at DATETIME,
  created_by_id INTEGER,
  updated_by_id INTEGER,
  locale VARCHAR(255)
);
```

**Related Tables:**
- `upload_folders_parent_lnk` - Links folders to parent folders
- `files_folder_lnk` - Links files to folders

---

## 👥 User & Authentication Tables

These tables manage user accounts and permissions.

### 1. `admin_users` - Admin Users

**Purpose:** Stores Strapi admin panel users
**Authentication:** Email + password (hashed)

**Schema:**
```sql
CREATE TABLE admin_users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  document_id VARCHAR(255),
  firstname VARCHAR(255),             -- First name
  lastname VARCHAR(255),              -- Last name
  username VARCHAR(255),              -- Username
  email VARCHAR(255) UNIQUE,          -- Email (unique)
  password VARCHAR(255),              -- Hashed password
  reset_password_token VARCHAR(255),  -- Password reset token
  registration_token VARCHAR(255),    -- Registration token
  is_active BOOLEAN,                  -- Account active status
  blocked BOOLEAN,                    -- Account blocked status
  prefered_language VARCHAR(255),     -- UI language preference
  created_at DATETIME,
  updated_at DATETIME,
  published_at DATETIME,
  created_by_id INTEGER,
  updated_by_id INTEGER,
  locale VARCHAR(255)
);
```

**Related Tables:**
- `admin_users_roles_lnk` - Links users to roles
- `admin_roles` - Defines admin roles

---

### 2. `admin_roles` - Admin Roles

**Purpose:** Defines admin user roles and permissions
**Default Roles:** Super Admin, Author, Editor

**Schema:**
```sql
CREATE TABLE admin_roles (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  document_id VARCHAR(255),
  name VARCHAR(255),                  -- Role name
  code VARCHAR(255) UNIQUE,           -- Role code (strapi-super-admin, etc.)
  description VARCHAR(255),           -- Role description
  created_at DATETIME,
  updated_at DATETIME,
  published_at DATETIME,
  created_by_id INTEGER,
  updated_by_id INTEGER,
  locale VARCHAR(255)
);
```

**Related Tables:**
- `admin_users_roles_lnk` - Links users to roles
- `admin_permissions` - Defines role permissions

---

### 3. `up_users` - Frontend Users (Users & Permissions)

**Purpose:** Stores frontend/public users (if user registration is enabled)
**Plugin:** Users & Permissions (default Strapi plugin)

**Schema:**
```sql
CREATE TABLE up_users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  document_id VARCHAR(255),
  username VARCHAR(255),
  email VARCHAR(255) UNIQUE,
  provider VARCHAR(255),              -- local, google, facebook, etc.
  password VARCHAR(255),              -- Hashed password
  reset_password_token VARCHAR(255),
  confirmation_token VARCHAR(255),
  confirmed BOOLEAN,                  -- Email confirmed
  blocked BOOLEAN,                    -- Account blocked
  created_at DATETIME,
  updated_at DATETIME,
  published_at DATETIME,
  created_by_id INTEGER,
  updated_by_id INTEGER,
  locale VARCHAR(255)
);
```

**Related Tables:**
- `up_users_role_lnk` - Links users to roles
- `up_roles` - Defines user roles

**Note:** Currently not used in KidParty website (no user registration)

---

## ⚙️ System & Configuration Tables

These tables store Strapi configuration and system settings.

### 1. `i18n_locale` - Language Locales

**Purpose:** Defines available languages for internationalization
**Plugin:** i18n (Internationalization)

**Schema:**
```sql
CREATE TABLE i18n_locale (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  document_id VARCHAR(255),
  name VARCHAR(255),                  -- Display name (English (en))
  code VARCHAR(255),                  -- Locale code (en, ka, ru)
  created_at DATETIME,
  updated_at DATETIME,
  published_at DATETIME,
  created_by_id INTEGER,
  updated_by_id INTEGER,
  locale VARCHAR(255)
);
```

**Current Locales:**
```
id | code | name
---|------|-------------
1  | en   | English (en)
2  | ka   | Georgian (ka)
3  | ru   | Russian (ru)
```

**Default Locale:** en (English)

---

### 2. `strapi_core_store_settings` - Core Settings

**Purpose:** Stores Strapi core configuration
**Type:** Key-Value store

**Schema:**
```sql
CREATE TABLE strapi_core_store_settings (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  key VARCHAR(255),                   -- Setting key
  value TEXT,                         -- Setting value (JSON)
  type VARCHAR(255),                  -- Setting type
  environment VARCHAR(255),           -- Environment (development, production)
  tag VARCHAR(255)                    -- Setting tag/category
);
```

**Example Settings:**
- `plugin_content_manager_configuration_content_types::*` - Content type configs
- `plugin_upload_settings` - Upload plugin settings
- `strapi_admin` - Admin panel settings

---

### 3. `strapi_database_schema` - Schema Metadata

**Purpose:** Tracks database schema version and structure
**Used By:** Strapi migrations

**Schema:**
```sql
CREATE TABLE strapi_database_schema (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  schema JSON,                        -- Full schema structure
  time DATETIME,                      -- Schema creation time
  hash VARCHAR(255)                   -- Schema hash
);
```

---

### 4. `strapi_migrations` - Migration History

**Purpose:** Tracks applied database migrations
**Type:** Version control for schema changes

**Schema:**
```sql
CREATE TABLE strapi_migrations (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name VARCHAR(255),                  -- Migration name
  time DATETIME                       -- Applied timestamp
);
```

---

## 🔐 Strapi Internal Tables

These tables are used internally by Strapi and plugins. **Do not modify directly.**

### API Tokens
- `strapi_api_tokens` - API authentication tokens
- `strapi_api_token_permissions` - API token permissions
- `strapi_api_token_permissions_token_lnk` - Links tokens to permissions

### Transfer Tokens
- `strapi_transfer_tokens` - Data transfer tokens
- `strapi_transfer_token_permissions` - Transfer token permissions
- `strapi_transfer_token_permissions_token_lnk` - Links tokens to permissions

### History & Versioning
- `strapi_history_versions` - Content version history

### Workflows
- `strapi_workflows` - Workflow definitions
- `strapi_workflows_stages` - Workflow stages
- `strapi_workflows_stage_required_to_publish_lnk` - Stage requirements
- `strapi_workflows_stages_permissions_lnk` - Stage permissions
- `strapi_workflows_stages_workflow_lnk` - Stage-to-workflow links

### Releases
- `strapi_releases` - Content releases
- `strapi_release_actions` - Release actions
- `strapi_release_actions_release_lnk` - Action-to-release links

### Sessions & Security
- `strapi_sessions` - User sessions
- `strapi_webhooks` - Webhook configurations

### AI Features
- `strapi_ai_localization_jobs` - AI-powered localization jobs

---

## 📝 Common Field Patterns

All content tables share these common fields:

### Identification Fields
```sql
id INTEGER PRIMARY KEY AUTOINCREMENT  -- Unique record ID
document_id VARCHAR(255)              -- Groups locale versions together
locale VARCHAR(255)                   -- Language code (en, ka, ru)
```

**How document_id Works:**
```
Package "Star Adventure Party" has 3 locale versions:
  id  | document_id  | locale | name
  96  | fdq3ut...    | en     | Star Adventure Party
  97  | fdq3ut...    | ka     | ვარსკვლავური თავგადასავალი
  98  | fdq3ut...    | ru     | Звёздная вечеринка-приключение

Same document_id = same content, different languages
```

---

### Timestamp Fields
```sql
created_at DATETIME                   -- When record was created
updated_at DATETIME                   -- When record was last updated
published_at DATETIME                 -- When record was published (NULL = draft)
```

**Timestamp Format:** Unix timestamp in milliseconds
```
Example: 1765787529084 = December 15, 2024, 3:12:09 AM UTC
```

**To get current timestamp:**
```sql
SELECT strftime('%s', 'now') * 1000;
```

**Published vs Draft:**
```sql
-- Draft (not visible in API)
published_at = NULL

-- Published (visible in API)
published_at = 1765787529084
```

---

### User Tracking Fields
```sql
created_by_id INTEGER                 -- Admin user who created this record
updated_by_id INTEGER                 -- Admin user who last updated this record
```

**Foreign Keys:**
- Both reference `admin_users.id`
- `ON DELETE SET NULL` - If admin user deleted, set to NULL

**To bypass user tracking (manual inserts):**
```sql
created_by_id = 1  -- Use admin user ID 1
updated_by_id = 1  -- Use admin user ID 1
-- Or set to NULL if no user tracking needed
```

---

### Slug Fields
```sql
slug VARCHAR(255)                     -- URL-friendly identifier
```

**Generated From:** Usually from `name` field
```
name: "Star Adventure Party"
slug: "star-adventure-party"
```

**Rules:**
- Lowercase
- Spaces → hyphens
- Special characters removed
- Must be unique per locale

---

## 🎯 Quick Reference

### Content Tables Summary

| Table | Purpose | i18n | JSON Fields | Component Links |
|-------|---------|------|-------------|-----------------|
| packages | Party packages | ✅ | No | includedFeatures (via packages_cmps) |
| abouts | About page | ✅ | abouttext | None |
| contacts | Contact page | ✅ | contact | None |
| faqs | FAQ page | ✅ | faquestions | None |
| terms | Terms page | ✅ | conditions | None |
| homepages | Homepage texts | ✅ | homepagetexts | None |
| site_settings | Site-wide settings | ✅ | No | None |
| party_slots | Calendar slots | ✅ | No | None |
| menu_items | Food menu | ✅ | No | None |
| galleries | Photo galleries | ✅ | No | None (images via files_related_mph) |

---

### Junction Tables Summary

| Table | Links | Purpose |
|-------|-------|---------|
| packages_cmps | packages ↔ components_common_included_features | Package features |
| files_related_mph | files ↔ any content | Media attachments |
| admin_users_roles_lnk | admin_users ↔ admin_roles | Admin permissions |
| up_users_role_lnk | up_users ↔ up_roles | User permissions |
| files_folder_lnk | files ↔ upload_folders | File organization |
| upload_folders_parent_lnk | upload_folders ↔ upload_folders | Folder hierarchy |

---

### Locale Codes

| Code | Language | Name |
|------|----------|------|
| en | English | English (en) |
| ka | Georgian | Georgian (ka) |
| ru | Russian | Russian (ru) |

---

## 🔍 Finding Data

### List All Published Packages
```sql
SELECT id, document_id, name, locale, price_per_child, published_at
FROM packages
WHERE published_at IS NOT NULL
ORDER BY document_id, locale;
```

### Find Orphaned Translations
```sql
-- Find ka/ru packages without en version
SELECT p.id, p.document_id, p.name, p.locale
FROM packages p
WHERE p.locale IN ('ka', 'ru')
  AND p.document_id NOT IN (
    SELECT document_id FROM packages WHERE locale = 'en'
  );
```

### Check Package Locale Consistency
```sql
SELECT
  document_id,
  COUNT(DISTINCT locale) as locale_count,
  GROUP_CONCAT(locale) as locales,
  MAX(CASE WHEN locale = 'en' THEN name END) as name_en
FROM packages
WHERE published_at IS NOT NULL
GROUP BY document_id
HAVING locale_count < 3;  -- Find packages missing any locale
```

### Get Package with All Features
```sql
SELECT
  p.name as package_name,
  f.label as feature_label,
  f.icon as feature_icon,
  pc."order" as display_order
FROM packages p
JOIN packages_cmps pc ON p.id = pc.entity_id
JOIN components_common_included_features f ON pc.cmp_id = f.id
WHERE p.id = 96
ORDER BY pc."order";
```

---

## 📚 See Also

- `WHY_PACKAGES_CMPS_TABLE.md` - Detailed explanation of junction table pattern
- `STRAPI_TEST_PACKAGES_CREATION.md` - Example package creation
- `PACKAGES_CLEANUP_REPORT.md` - Database maintenance guide
- `PACKAGE_LOCALES_FIX.md` - Fixing missing translations

---

**Last Updated:** December 15, 2024
**Database Version:** SQLite 3
**Strapi Version:** 5.31.3
