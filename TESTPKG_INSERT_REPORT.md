# testpkg Package Insert Report

**Created:** December 15, 2024
**Status:** ✅ Successfully Inserted
**Database:** backend/.tmp/data.db

---

## 📦 Package Details

### Basic Information

| Field | Value |
|-------|-------|
| **Document ID** | TESTPKG_STANDARD_001 |
| **Category** | Standard (✨ Popular) |
| **Price** | ₾35.0 per child |
| **Duration** | 90 minutes |
| **Guests** | 8-20 |
| **Features** | 4 per locale |
| **Timestamp** | 1765797122000 (Dec 15, 2024) |

---

## 🌍 All 3 Locales Created

### English Version (ID: 101)
```
Name: testpkg Standard Party
Slug: testpkg-standard-party
Short: A fun and exciting party package with games, music, and decorations.
Features:
  1. Themed decorations (✨)
  2. Hosted games (🎲)
  3. Music & dance (🎵)
  4. Setup & cleanup (🧹)
```

### Georgian Version (ID: 102)
```
Name: testpkg სტანდარტული წვეულება
Slug: testpkg-standard-party
Short: სახალისო და ამაღელვებელი წვეულების პაკეტი თამაშებით, მუსიკითა და დეკორაციებით.
Features:
  1. თემატური დეკორაციები (✨)
  2. თამაშები წამყვანთან ერთად (🎲)
  3. მუსიკა და ცეკვა (🎵)
  4. მოწყობა და დალაგება (🧹)
```

### Russian Version (ID: 103)
```
Name: testpkg Стандартная Вечеринка
Slug: testpkg-standard-party
Short: Веселый и захватывающий пакет вечеринки с играми, музыкой и украшениями.
Features:
  1. Тематический декор (✨)
  2. Игры с ведущим (🎲)
  3. Музыка и танцы (🎵)
  4. Подготовка и уборка (🧹)
```

---

## ✅ Verification Results

### Package Entries
```sql
SELECT id, document_id, name, locale, price_per_child, duration_minutes
FROM packages
WHERE document_id = 'TESTPKG_STANDARD_001'
ORDER BY locale;
```

**Result:**
```
id   document_id           name                           locale  price_per_child  duration_minutes
---  --------------------  -----------------------------  ------  ---------------  ----------------
101  TESTPKG_STANDARD_001  testpkg Standard Party         en      35.0             90
102  TESTPKG_STANDARD_001  testpkg სტანდარტული წვეულება   ka      35.0             90
103  TESTPKG_STANDARD_001  testpkg Стандартная Вечеринка  ru      35.0             90
```

✅ **All 3 locales created successfully**

---

### Package Features
```sql
SELECT p.id, p.name, p.locale, f.label, f.icon, pc."order"
FROM packages p
JOIN packages_cmps pc ON p.id = pc.entity_id
JOIN components_common_included_features f ON pc.cmp_id = f.id
WHERE p.document_id = 'TESTPKG_STANDARD_001'
ORDER BY p.locale, pc."order";
```

**Result:**
```
id   package_name                   locale  feature_label              icon  order
---  -----------------------------  ------  -------------------------  ----  -----
101  testpkg Standard Party         en      Themed decorations         ✨     1.0
101  testpkg Standard Party         en      Hosted games               🎲     2.0
101  testpkg Standard Party         en      Music & dance              🎵     3.0
101  testpkg Standard Party         en      Setup & cleanup            🧹     4.0
102  testpkg სტანდარტული წვეულება   ka      თემატური დეკორაციები       ✨     1.0
102  testpkg სტანდარტული წვეულება   ka      თამაშები წამყვანთან ერთად  🎲     2.0
102  testpkg სტანდარტული წვეულება   ka      მუსიკა და ცეკვა            🎵     3.0
102  testpkg სტანდარტული წვეულება   ka      მოწყობა და დალაგება        🧹     4.0
103  testpkg Стандартная Вечеринка  ru      Тематический декор         ✨     1.0
103  testpkg Стандартная Вечеринка  ru      Игры с ведущим             🎲     2.0
103  testpkg Стандартная Вечеринка  ru      Музыка и танцы             🎵     3.0
103  testpkg Стандартная Вечеринка  ru      Подготовка и уборка        🧹     4.0
```

✅ **All features linked correctly for all 3 locales**

---

### Locale Consistency Check
```sql
SELECT document_id,
  MAX(CASE WHEN locale = 'en' THEN name END) as name_en,
  MAX(CASE WHEN locale = 'ka' THEN name END) as name_ka,
  MAX(CASE WHEN locale = 'ru' THEN name END) as name_ru,
  COUNT(DISTINCT locale) as locale_count
FROM packages
WHERE published_at IS NOT NULL
GROUP BY document_id
ORDER BY document_id;
```

**Result:**
```
document_id               name_en                 name_ka                       name_ru                              locale_count
------------------------  ----------------------  ----------------------------  -----------------------------------  ------------
TESTPKG_STANDARD_001      testpkg Standard Party  testpkg სტანდარტული წვეულება  testpkg Стандартная Вечеринка        3
fdq3utvag8jthf5uz34tekxw  Star Adventure Party    ვარსკვლავური თავგადასავალი    Звёzdная вечеринка-приключение       3
speyyiah3uvzr7yw0fvpgd87                                                        Звёздная вечеринка-приключение PLUS  1
```

✅ **testpkg has all 3 locales (locale_count = 3)**

---

### Total Package Count
```sql
SELECT locale, COUNT(*) as package_count
FROM packages
WHERE published_at IS NOT NULL
GROUP BY locale
ORDER BY locale;
```

**Result:**
```
locale  package_count
------  -------------
en      2
ka      2
ru      3
```

**Note:** Russian has 3 packages because there's one orphaned package (Звёздная вечеринка-приключение PLUS) that only has Russian version.

---

## 🎯 How to Check in Strapi Admin

### Step 1: Login to Strapi Admin
```
URL: http://localhost:1337/admin
```

### Step 2: Navigate to Content Manager → Packages

### Step 3: Switch Between Locales

**English (en):**
- Click locale dropdown → Select "English (en)"
- You should see: **testpkg Standard Party**
- Price: ₾35.0
- Duration: 90 minutes
- Features: 4 included features

**Georgian (ka):**
- Click locale dropdown → Select "Georgian (ka)"
- You should see: **testpkg სტანდარტული წვეულება**
- Price: ₾35.0
- Duration: 90 minutes
- Features: 4 included features

**Russian (ru):**
- Click locale dropdown → Select "Russian (ru)"
- You should see: **testpkg Стандартная Вечеринка**
- Price: ₾35.0
- Duration: 90 minutes
- Features: 4 included features

---

## 🌐 How to Check in Frontend

### API Endpoints

**English:**
```
http://localhost:1337/api/packages?locale=en&populate=*
```
Look for: `"name": "testpkg Standard Party"`

**Georgian:**
```
http://localhost:1337/api/packages?locale=ka&populate=*
```
Look for: `"name": "testpkg სტანდარტული წვეულება"`

**Russian:**
```
http://localhost:1337/api/packages?locale=ru&populate=*
```
Look for: `"name": "testpkg Стандартная Вечеринка"`

---

### Frontend Pages

**English:**
```
http://localhost:5173/en/packages
```
Should display: **testpkg Standard Party** with badge **✨ Popular** (because price = ₾35)

**Georgian:**
```
http://localhost:5173/ka/packages
```
Should display: **testpkg სტანდარტული წვეულება** with badge **✨ Popular**

**Russian:**
```
http://localhost:5173/ru/packages
```
Should display: **testpkg Стандартная Вечеринка** with badge **✨ Popular**

---

### Contact Page Dropdown

**English:**
```
http://localhost:5173/en/contact
```
Package dropdown should include: **testpkg Standard Party**

**Georgian:**
```
http://localhost:5173/ka/contact
```
Package dropdown should include: **testpkg სტანდარტული წვეულება**

**Russian:**
```
http://localhost:5173/ru/contact
```
Package dropdown should include: **testpkg Стандартная Вечеринка**

---

## 📄 Full SQL Script

The complete SQL script is saved at:
```
backend/testpkg_insert.sql
```

You can re-use this template for creating more packages by:
1. Changing the `document_id`
2. Updating package IDs (101, 102, 103 → next available)
3. Modifying package name, price, duration, descriptions
4. Adjusting feature IDs if needed
5. Updating timestamp

---

## 🗑️ How to Delete This Test Package

If you want to remove the test package later:

```sql
-- This will delete all 3 locale versions and their feature links
DELETE FROM packages WHERE document_id = 'TESTPKG_STANDARD_001';
```

**Note:** The `ON DELETE CASCADE` constraint will automatically remove all `packages_cmps` entries.

---

## 📊 Summary

✅ **Package Created:** testpkg Standard Party
✅ **Document ID:** TESTPKG_STANDARD_001
✅ **Locales:** 3/3 (en, ka, ru)
✅ **Features:** 4 per locale (12 total links)
✅ **Published:** Yes (published_at set)
✅ **Category:** Standard (✨ Popular)
✅ **Price:** ₾35.0 per child
✅ **Database Status:** Verified and consistent

**The package is ready to view in Strapi admin and frontend!**

---

**Next Steps:**
1. Open Strapi admin: http://localhost:1337/admin
2. Navigate to Content Manager → Packages
3. Switch locales (en/ka/ru) and verify the package appears
4. Check frontend: http://localhost:5173/en/packages
5. Verify package appears in contact form dropdown

---

**Created:** December 15, 2024
**Status:** ✅ Success
