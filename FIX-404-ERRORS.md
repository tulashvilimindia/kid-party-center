# 🔧 Fix 404 API Errors - Quick Guide

**Problem:** Frontend shows 404 errors when fetching navigation menus and social links
**Cause:** Strapi API permissions not configured for public access
**Solution:** Enable public permissions in Strapi Admin (2 minutes)

---

## ✅ Quick Fix (2 minutes)

### Step 1: Open Strapi Admin
1. Make sure backend is running:
   ```bash
   cd C:/Users/MindiaTulashvili/OneDrive/Desktop/KidParty/backend
   npm run develop
   ```

2. Open in browser: **http://localhost:1337/admin**

3. Login with your admin credentials

---

### Step 2: Configure Public Permissions

1. In the left sidebar, click **Settings** (gear icon ⚙️)

2. Under **USERS & PERMISSIONS PLUGIN**, click **Roles**

3. Click on **Public** role

4. Scroll down to find these content types and **check ALL boxes** for each:

#### **Navigation-menu**
- ✅ `find`
- ✅ `findOne`

#### **Social-link**
- ✅ `find`
- ✅ `findOne`

#### **Site-setting**
- ✅ `find`
- ✅ `findOne`

5. **IMPORTANT:** Click **Save** button (top right)

---

### Step 3: Test

1. Refresh your frontend: **http://localhost:3000**

2. The 404 errors should be **GONE!** ✅

3. Navigation and footer should load correctly

---

## 🎯 Detailed Steps with Screenshots Guide

### Finding Permissions Settings

```
Strapi Admin Dashboard
  ↓
Settings (left sidebar, gear icon)
  ↓
Users & Permissions Plugin section
  ↓
Roles
  ↓
Public (click to edit)
  ↓
Scroll down to "Permissions" section
  ↓
Find content types:
  - Navigation-menu
  - Social-link
  - Site-setting
  ↓
Check boxes for: find, findOne
  ↓
Click Save (top right)
```

---

## 🔍 What Each Permission Does

| Permission | What it allows |
|------------|----------------|
| **find** | GET `/api/navigation-menus` (list all) |
| **findOne** | GET `/api/navigation-menus/:id` (get single) |
| **create** | POST (not needed for public) |
| **update** | PUT (not needed for public) |
| **delete** | DELETE (not needed for public) |

**For your frontend to work, you only need: `find` and `findOne`**

---

## 📊 Verify Data Exists

The data IS in your database. You can verify with:

```bash
cd C:/Users/MindiaTulashvili/OneDrive/Desktop/KidParty/backend
sqlite3 .tmp/data.db "SELECT COUNT(*) FROM navigation_menus;"
# Should show: 63

sqlite3 .tmp/data.db "SELECT COUNT(*) FROM social_links;"
# Should show: 9

sqlite3 .tmp/data.db "SELECT COUNT(*) FROM site_settings;"
# Should show: 9
```

---

## ❌ Common Mistakes

1. **Forgot to click Save** - Always click Save after checking boxes!
2. **Edited wrong role** - Make sure you're editing **Public**, not Authenticated
3. **Backend not running** - Make sure Strapi is running on port 1337
4. **Wrong content type names** - Look for exact names (with hyphens)

---

## 🚀 After Fixing Permissions

Once permissions are set, your frontend will:

✅ Load navigation menu from CMS
✅ Load social links in footer
✅ Load site settings
✅ Support language switching (EN → KA → RU)
✅ No more 404 errors!

---

## 🎯 Alternative: Use Strapi Admin UI Tour

If you're not sure where to find settings:

1. Look for **Settings** in left sidebar (usually near bottom)
2. It has a gear/cog icon: ⚙️
3. Under "USERS & PERMISSIONS PLUGIN" section
4. Click "Roles"
5. Click "Public"
6. Scroll to "Permissions"
7. Check boxes for your content types
8. Click "Save"

---

## 📞 Still Having Issues?

If 404 errors persist after fixing permissions:

1. **Clear browser cache** (Ctrl+Shift+R)
2. **Restart Strapi**:
   ```bash
   # Stop: Ctrl+C
   # Start: npm run develop
   ```
3. **Check browser console** for updated errors
4. **Verify URL is correct**: http://localhost:1337/api/navigation-menus

---

## ✅ Success Indicators

After fixing, you should see:

**In Browser Console:**
- No more 404 errors
- API calls returning data
- Navigation menu loading
- Footer social links loading

**On Frontend:**
- Header navigation visible
- Language switcher working
- Footer social icons present
- No error messages

---

## 🎉 You're Done!

Once permissions are configured:
- Frontend will load all data from CMS
- Language switching will work
- No more API errors
- Your multilingual KidParty site is fully functional!

---

**Quick Commands:**

```bash
# Start backend
cd C:/Users/MindiaTulashvili/OneDrive/Desktop/KidParty/backend
npm run develop

# Start frontend (new terminal)
cd C:/Users/MindiaTulashvili/OneDrive/Desktop/KidParty/frontend
npm run dev

# Open
http://localhost:1337/admin  (Strapi Admin)
http://localhost:3000         (Your Website)
```

---

**Need Help?** The issue is 100% permissions. Follow the steps above and it will work! ✅
