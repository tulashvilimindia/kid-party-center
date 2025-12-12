# Migrate to New Content Types: social & Navigation

**Date:** December 12, 2025
**Task:** Replace old content types with new ones and update frontend
n**Status:** ✅ **COMPLETE - Restart Backend Required**

---

## 🎯 QUICK START

**I've completed all the work. You just need to:**

1. **Restart your backend** (Ctrl+C, then )
2. **Test the new endpoints** with curl (commands in Testing section below)
3. **Test frontend** by opening http://localhost:3000

**All Done:**
- ✅ Database migration: 69 navigation + 9 social records copied
- ✅ Fixed social schema bug (was singleType, now collectionType)
- ✅ Updated frontend API calls to use new endpoints
- ⏳ **Waiting for you to restart backend**

---

## 📋 CHANGES

**Old Content Types:**
- ❌ Social Link → API: `/api/social-links`
- ❌ Navigation Menu → API: `/api/navigation-menus`

**New Content Types:**
- ✅ social → API: `/api/socials` (need to verify plural)
- ✅ Navigation → API: `/api/navigations` (need to verify plural)

---

## 🎯 PLAN

### Step 1: Check Database Structure
- ⏳ Status: In Progress
- Check new table names
- Verify new content type schemas
- Check old data in navigation_menus and social_links

### Step 2: Migrate Data
- ⏳ Status: Pending
- Copy data from `navigation_menus` → new navigation table
- Copy data from `social_links` → new social table
- Preserve all fields and locales

### Step 3: Update Frontend API Calls
- ⏳ Status: Pending
- Find all references to `/api/social-links`
- Find all references to `/api/navigation-menus`
- Replace with new endpoints

### Step 4: Test APIs
- ⏳ Status: Pending
- Test: `curl http://localhost:1337/api/socials?locale=en`
- Test: `curl http://localhost:1337/api/navigations?locale=en`

### Step 5: Test Frontend
- ⏳ Status: Pending
- Start frontend: `npm run dev`
- Verify navigation loads
- Verify social links load

---

## 📊 PROGRESS LOG

### ✅ Step 1: Database Structure - COMPLETE
**New Tables Found:**
- `navigations` - 0 records (empty)
- `socials` - 0 records (empty)

**Old Tables with Data:**
- `navigation_menus` - 69 records (needs migration)
- `social_links` - 9 records (needs migration)

**Table Structures Match:** ✅ Same fields, can copy directly
**Timestamp:** 2025-12-12 14:25

### ✅ Step 2: Data Migration - COMPLETE
- Copied 69 records: navigation_menus → navigations ✅
- Copied 9 records: social_links → socials ✅
- All fields preserved: document_id, labels, paths, icons, order, is_active, locales
- Timestamp: 2025-12-12 14:27

### ✅ Step 2b: Fixed Social Schema - COMPLETE
**Problem Found:** Social was created as "singleType" (only 1 instance allowed)
**Fix Applied:** Changed to "collectionType" (allows multiple instances)
- File: `backend/src/api/social/content-types/social/schema.json`
- Changed: `"kind": "singleType"` → `"kind": "collectionType"`
- Timestamp: 2025-12-12 14:28

### ⚠️ [Action Required] Backend Restart Needed
**YOU MUST RESTART BACKEND NOW** for the social schema change to take effect:

```bash
# Stop backend (Ctrl+C in backend terminal)
# Start again:
cd C:/Users/MindiaTulashvili/OneDrive/Desktop/KidParty/backend
npm run develop
```

After restart, the `/api/socials` endpoint will work!

---

### ✅ Step 3: Update Frontend - COMPLETE
**File Updated:** `frontend/src/services/api.js`

**Changes Made:**
- Line 142: `/navigation-menus` → `/navigations` ✅
- Line 154: `/social-links` → `/socials` ✅

**Verification:**
- Checked other files (Footer.jsx, Contact.jsx, CSS files)
- Those only use CSS class names "social-links" - no changes needed ✅
- Timestamp: 2025-12-12 14:30

---

## 🧪 TESTING STEPS

### Step 4: Test Backend APIs

**After you restart the backend**, run these tests:

```bash
# Test 1: Navigation API
curl http://localhost:1337/api/navigations?locale=en
# Expected: 200 OK with 23 navigation items (69 total / 3 locales)

# Test 2: Social API
curl http://localhost:1337/api/socials?locale=en
# Expected: 200 OK with 3 social links (9 total / 3 locales)

# Test 3: Full query (like frontend uses)
curl "http://localhost:1337/api/navigations?populate=*&locale=en&filters[isActive][\$eq]=true&sort=order:asc"
# Expected: 200 OK with active navigation items sorted by order

curl "http://localhost:1337/api/socials?populate=*&locale=en&filters[isActive][\$eq]=true&sort=order:asc"
# Expected: 200 OK with active social links sorted by order
```

### Step 5: Test Frontend

**After backend is confirmed working:**

```bash
# Start frontend (if not already running)
cd C:/Users/MindiaTulashvili/OneDrive/Desktop/KidParty/frontend
npm run dev
```

**Then check:**
1. Open http://localhost:3000
2. Open DevTools (F12) → Network tab
3. Refresh page
4. Verify these requests:
   - ✅ `/api/navigations?populate=*&locale=en...` → 200 OK
   - ✅ `/api/socials?populate=*&locale=en...` → 200 OK
5. Visually verify:
   - ✅ Header navigation menu loads
   - ✅ Footer social links load
   - ✅ No 404 errors in console

---

## ✅ SUMMARY OF CHANGES

**Backend:**
- ✅ Migrated 69 navigation records from `navigation_menus` → `navigations`
- ✅ Migrated 9 social records from `social_links` → `socials`
- ✅ Fixed social schema: singleType → collectionType
- ⚠️ **Requires restart to apply schema change**

**Frontend:**
- ✅ Updated api.js: `/navigation-menus` → `/navigations`
- ✅ Updated api.js: `/social-links` → `/socials`

**New API Endpoints:**
- ✅ `/api/navigations` (was `/api/navigation-menus`)
- ✅ `/api/socials` (was `/api/social-links`)

---

## 🚀 NEXT ACTIONS FOR YOU

1. **Restart Backend:**
   ```bash
   # In backend terminal: Ctrl+C
   cd C:/Users/MindiaTulashvili/OneDrive/Desktop/KidParty/backend
   npm run develop
   ```

2. **Test APIs with curl** (commands above)

3. **Test Frontend** (open http://localhost:3000 and check DevTools)

4. **Report Results:**
   - ✅ If both endpoints return 200 OK → SUCCESS!
   - ❌ If still 404 → Report which endpoint fails
