# Fix Navigation Menu - Not Appearing in Public Permissions

**Date:** December 12, 2025
**Issue:** Navigation Menu content type doesn't appear in Settings → Roles → Public
**Root Cause:** Strapi failed to register the content type properly from file system

---

## ⚡ WHAT I DID (Automated)

✅ **Step 1:** Backed up `navigation-menu` folder to `navigation-menu.backup`
✅ **Step 2:** Deleted the problematic `navigation-menu` folder

## 🎯 WHAT YOU NEED TO DO (Manual)

**Step 3:** Restart backend (Ctrl+C then `npm run develop`)
**Step 4:** Recreate "Navigation Menu" in Strapi Admin Content-Type Builder
**Step 5:** Enable find/findOne permissions in Settings → Roles → Public
**Step 6:** Test with `curl http://localhost:1337/api/navigation-menus?locale=en`

**Full instructions below in PROGRESS LOG section** ⬇️

---

## 🎯 PLAN

### Step 1: Backup Current Navigation Menu Folder
- ✅ Status: COMPLETE
- Location: `backend/src/api/navigation-menu`
- Backup to: `backend/src/api/navigation-menu.backup`
- Purpose: Preserve schema for reference

### Step 2: Delete Problematic navigation-menu Folder
- ✅ Status: COMPLETE
- Action: Remove `backend/src/api/navigation-menu`
- Why: Force Strapi to forget this broken registration

### Step 3: Restart Backend
- ⏳ Status: Pending
- Action: Stop (Ctrl+C) and restart `npm run develop`
- Expected: Strapi boots without navigation-menu

### Step 4: Recreate Navigation Menu in Strapi Admin UI
- ⏳ Status: Pending
- URL: http://localhost:1337/admin
- Method: Content-Type Builder → Create new collection type
- Config:
  - Display name: `Navigation Menu`
  - API ID (singular): `navigation-menu`
  - API ID (plural): `navigation-menus`
  - Enable i18n: ✅

**Fields to add:**
  - `label` (Text, required, localized)
  - `path` (Text, required)
  - `icon` (Text, optional)
  - `order` (Number/Integer, required, default: 1)
  - `isActive` (Boolean, default: true)

### Step 5: Verify Permissions Created
- ⏳ Status: Pending
- Check database: New permissions should auto-generate
- Check Admin: Navigation Menu should appear in Settings → Roles → Public
- Enable: find and findOne permissions

### Step 6: Test API Endpoint
- ⏳ Status: Pending
- Test: `curl http://localhost:1337/api/navigation-menus?locale=en`
- Expected: 200 OK (even if empty data)

---

## 📊 PROGRESS LOG

### ✅ Step 1: Backup Navigation Menu Folder - COMPLETE
- Backed up to: `backend/src/api/navigation-menu.backup`
- Files preserved for reference
- Timestamp: 2025-12-12 14:20

### ✅ Step 2: Delete Problematic Folder - COMPLETE
- Deleted: `backend/src/api/navigation-menu`
- Verified: Only `navigation-menu.backup` remains
- Timestamp: 2025-12-12 14:21

### [Action Required] Step 3: Restart Backend - NEEDS YOU
⚠️ **YOU MUST DO THIS NOW:**

1. Stop the backend: Press `Ctrl+C` in the terminal where backend is running
2. Start it again: `npm run develop`
3. Wait for: "Server started on http://localhost:1337"

After restart, continue to Step 4 below.

---

### [Action Required] Step 4: Recreate Navigation Menu in Strapi Admin - NEEDS YOU
⚠️ **AFTER BACKEND RESTART, DO THIS:**

1. Open browser: http://localhost:1337/admin
2. Login to Strapi
3. Click "Content-Type Builder" (left sidebar)
4. Click "Create new collection type"

**Step 4a: Basic Settings**
- Display name: `Navigation Menu`
- API ID (singular): `navigation-menu`
- API ID (plural): `navigation-menus`
- Click "Continue"

**Step 4b: Enable i18n**
- In the "Advanced Settings" tab (or during creation)
- Find "Internationalization"
- Toggle it ON ✅
- Click "Continue" or "Finish"

**Step 4c: Add Fields (Click "Add another field" for each)**

Field 1: **label**
- Type: Text (Short text)
- Name: `label`
- Required: ✅ YES
- Advanced: Enable i18n localization ✅
- Click "Finish"

Field 2: **path**
- Type: Text (Short text)
- Name: `path`
- Required: ✅ YES
- Advanced: Do NOT localize
- Click "Finish"

Field 3: **icon**
- Type: Text (Short text)
- Name: `icon`
- Required: ❌ NO (optional)
- Advanced: Do NOT localize
- Click "Finish"

Field 4: **order**
- Type: Number
- Number format: integer
- Name: `order`
- Required: ✅ YES
- Default value: 1
- Advanced: Do NOT localize
- Click "Finish"

Field 5: **isActive**
- Type: Boolean
- Name: `isActive`
- Default value: true ✅
- Advanced: Do NOT localize
- Click "Finish"

**Step 4d: Save Content Type**
- Click "Save" button (top right)
- Strapi will auto-restart the server (wait ~30 seconds)

**Continue to Step 5 after server restart...**

---

### [Action Required] Step 5: Enable Public Permissions - NEEDS YOU
⚠️ **AFTER CONTENT TYPE CREATED:**

1. In Strapi Admin: Settings → Users & Permissions plugin → Roles → Public
2. Scroll down to find "Navigation-menu" (should now appear!)
3. Check ✅ these permissions:
   - find
   - findOne
4. Click "Save" (top right)

**Continue to Step 6 for testing...**

---

### [Action Required] Step 6: Test API Endpoint - NEEDS YOU
⚠️ **FINAL TEST:**

Run this curl command:
```bash
curl http://localhost:1337/api/navigation-menus?locale=en
```

**Expected Result:**
```json
{"data":[],"meta":{"pagination":{"page":1,"pageSize":25,"pageCount":0,"total":0}}}
```

Status should be: **200 OK** (even if data is empty)

If you get 200 OK → ✅ **SUCCESS! Navigation Menu is now working!**

If you still get 404 → ❌ Report back with error message.
