# 🔧 Fix Locale Issue - en-US vs en

**Date:** December 11, 2025
**Problem:** API requesting `locale=en-US` but database has `locale=en`
**Impact:** 404 errors for navigation-menus, site-setting, social-links

---

## 🔍 **ROOT CAUSE**

### **The Problem:**
```
Frontend i18n detects browser language: "en-US"
API makes request: /api/navigation-menus?locale=en-US
Database has locale: "en" (not "en-US")
Result: No data found → 404 or empty response
```

### **Why This Happens:**
1. Browser reports language as `en-US` (American English)
2. i18next LanguageDetector picks up `en-US`
3. API service uses `i18n.language` which is `en-US`
4. Strapi looks for `locale=en-US` in database
5. Database only has `en`, `ka`, `ru` → **No match!**

---

## ✅ **SOLUTION (2-Part Fix)**

We'll fix this in **2 places** for maximum reliability:

### **Part 1: Frontend - Normalize Language Codes** ⭐ (Recommended)
### **Part 2: Database - Add en-US Data** (Backup)

---

## 📝 **PART 1: Frontend Fix (RECOMMENDED)**

Update the API service to normalize locale codes.

### **File:** `frontend/src/services/api.js`

**Change the `getLocale` function:**

```javascript
// CURRENT (WRONG):
const getLocale = () => {
  return i18n.language || 'en';
};

// CHANGE TO (CORRECT):
const getLocale = () => {
  const lang = i18n.language || 'en';

  // Normalize language codes: en-US → en, ka-GE → ka, ru-RU → ru
  if (lang.startsWith('en')) return 'en';
  if (lang.startsWith('ka')) return 'ka';
  if (lang.startsWith('ru')) return 'ru';

  return 'en'; // Fallback
};
```

**This will:**
- ✅ Convert `en-US` → `en`
- ✅ Convert `en-GB` → `en`
- ✅ Convert `ka-GE` → `ka`
- ✅ Convert `ru-RU` → `ru`
- ✅ Match your database locale values exactly

---

## 🗄️ **PART 2: Database Fix (BACKUP SOLUTION)**

If you want to keep `en-US` in the frontend, add `en-US` data to database.

### **Fix 1: Update Social Links to have locale='en'**

```sql
-- Add locale to existing social links (currently NULL)
UPDATE social_links SET locale = 'en' WHERE id IN (1, 2, 3);
UPDATE social_links SET locale = 'ka' WHERE id IN (4, 5, 6);
UPDATE social_links SET locale = 'ru' WHERE id IN (7, 8, 9);
```

### **Fix 2: Duplicate en data as en-US** (Optional)

I'll create SQL to duplicate all `en` data as `en-US`.

**⚠️ Warning:** This creates duplicate data. Use Part 1 instead if possible.

---

## 🚀 **RECOMMENDED APPROACH**

**Use Part 1 (Frontend Fix)** because:
- ✅ Cleaner solution
- ✅ No duplicate database data
- ✅ Works with any locale variant (en-US, en-GB, etc.)
- ✅ Single point of normalization
- ✅ Easier to maintain

**Only use Part 2 (Database)** if:
- You can't modify frontend code
- You specifically want to support en-US as separate locale

---

## 📋 **STEP-BY-STEP INSTRUCTIONS**

### **Option A: Frontend Fix (Recommended) ⭐**

1. **Edit file:**
   ```
   frontend/src/services/api.js
   ```

2. **Find line 14-16:**
   ```javascript
   const getLocale = () => {
     return i18n.language || 'en';
   };
   ```

3. **Replace with:**
   ```javascript
   const getLocale = () => {
     const lang = i18n.language || 'en';

     // Normalize language codes to match database locales
     if (lang.startsWith('en')) return 'en';
     if (lang.startsWith('ka')) return 'ka';
     if (lang.startsWith('ru')) return 'ru';

     return 'en'; // Fallback to English
   };
   ```

4. **Save file**

5. **Restart frontend:**
   ```bash
   # Stop frontend (Ctrl+C)
   npm run dev
   ```

6. **Test:**
   - Open http://localhost:3000
   - Check browser console (F12)
   - API requests should now use `locale=en` not `locale=en-US`
   - Navigation menus should load ✅

---

### **Option B: Database Fix (Backup)**

See the SQL file: **FIX-LOCALE-DATABASE.sql**

---

## 🧪 **VERIFICATION**

After applying the fix:

1. **Open DevTools (F12) → Network tab**

2. **Refresh page**

3. **Check API requests:**
   ```
   Before: /api/navigation-menus?locale=en-US ❌
   After:  /api/navigation-menus?locale=en    ✅

   Before: /api/site-setting?locale=en-US ❌
   After:  /api/site-setting?locale=en    ✅
   ```

4. **Check responses:**
   - Should return **200 OK**
   - Should have data (not empty)

---

## 📊 **EXPECTED RESULTS**

### **Before Fix:**
```
Browser language: en-US
API request: locale=en-US
Database lookup: WHERE locale='en-US'
Result: No data found ❌
Response: 404 or []
```

### **After Fix:**
```
Browser language: en-US
Normalized to: en
API request: locale=en
Database lookup: WHERE locale='en'
Result: Data found ✅
Response: 200 OK with data
```

---

## 🎯 **WHY THIS IS BETTER**

### **Frontend Normalization (Part 1):**
- ✅ Works automatically for all locales
- ✅ No database changes needed
- ✅ Handles en-US, en-GB, en-CA, etc.
- ✅ Single source of truth
- ✅ Easy to debug

### **Database Duplication (Part 2):**
- ❌ Creates duplicate data
- ❌ Must maintain 2x or 3x data
- ❌ Potential for inconsistency
- ❌ Harder to manage
- ⚠️ Only use if frontend can't be modified

---

## 🔧 **ADDITIONAL FIX: Social Links**

The social_links table has NULL locale values. Fix this:

```sql
-- Run this in sqlite3:
cd C:/Users/MindiaTulashvili/OneDrive/Desktop/KidParty/backend
sqlite3 .tmp/data.db

-- Update social links to have proper locales
UPDATE social_links SET locale = 'en' WHERE id <= 3 AND locale IS NULL;
UPDATE social_links SET locale = 'ka' WHERE id > 3 AND id <= 6 AND locale IS NULL;
UPDATE social_links SET locale = 'ru' WHERE id > 6 AND locale IS NULL;

-- Verify
SELECT id, platform, locale FROM social_links;
```

---

## 📝 **SUMMARY**

**Problem:** API uses `en-US`, database has `en`
**Solution:** Normalize `en-US` → `en` in frontend API service
**File to edit:** `frontend/src/services/api.js`
**Lines to change:** 14-16 (getLocale function)
**Time to fix:** 2 minutes
**Backend restart:** Not needed
**Frontend restart:** Yes (Ctrl+C, then npm run dev)

---

**🎯 Apply Part 1 (Frontend Fix) first - it's the cleanest solution!**

---

**Generated:** December 11, 2025
**Priority:** 🔴 HIGH
**Difficulty:** ⭐ Easy
**Impact:** Fixes all locale-related 404 errors
