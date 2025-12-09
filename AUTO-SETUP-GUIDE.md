# 🚀 Automatic CMS Setup - Super Easy Guide

## 🎯 What This Does

Automatically fills your entire CMS with content in 3 languages (EN, KA, RU)!

**No manual data entry needed!** 🎉

---

## ⚡ Quick Setup (2 Steps)

### Step 1: Make Sure Backend is Running

```bash
cd backend
npm run develop
```

Wait until you see:
```
[2025-12-09 ...] info ⚡️ Server started on http://localhost:1337
```

**Keep this terminal open!**

---

### Step 2: Edit the Script with Your Admin Credentials

**Option A: Manual Edit (Recommended)**

1. Open: `backend/scripts/populate-cms-data.js`

2. Find lines 15-16:
   ```javascript
   const ADMIN_EMAIL = 'admin@example.com';
   const ADMIN_PASSWORD = 'Admin123!';
   ```

3. Change to YOUR admin email and password:
   ```javascript
   const ADMIN_EMAIL = 'your-email@example.com';
   const ADMIN_PASSWORD = 'YourPassword123';
   ```

4. Save the file

**Option B: Use the Batch Script (Windows)**

Just double-click: `setup-cms.bat`

It will ask for your credentials and run everything automatically!

---

### Step 3: Run the Population Script

**Open a NEW terminal** (keep backend running!) and run:

```bash
cd backend
node scripts/populate-cms-data.js
```

---

## 📺 What You'll See

```
═══════════════════════════════════════════════════════
  🎉 KidParty CMS Data Population Script 🎈
═══════════════════════════════════════════════════════

🔐 Logging in to Strapi...
✅ Login successful!

📝 Populating Site Settings...
   ✅ English version created
   ✅ Georgian version created
   ✅ Russian version created

📋 Populating Navigation Menu...
   ✅ "Home" created in all 3 languages
   ✅ "Packages" created in all 3 languages
   ✅ "Calculator" created in all 3 languages
   ✅ "Calendar" created in all 3 languages
   ✅ "Gallery" created in all 3 languages
   ✅ "About" created in all 3 languages
   ✅ "Contact" created in all 3 languages

🔗 Populating Social Links...
   ✅ facebook created
   ✅ instagram created
   ✅ tiktok created

═══════════════════════════════════════════════════════
  ✅ ALL DATA POPULATED SUCCESSFULLY! 🎊
═══════════════════════════════════════════════════════

🎯 Next Steps:
   1. Open http://localhost:3000
   2. Switch languages (EN, KA, RU)
   3. Enjoy your multilingual CMS!
```

---

## ✅ Verify It Worked

### Check Strapi Admin

1. Open: http://localhost:1337/admin

2. Go to **Content Manager**

3. You should see:

**Site Setting:**
- Click it → You'll see all the new fields filled
- Switch locale (top-right) → See EN, KA, RU versions

**Navigation Menus:**
- Should show 7 entries
- Click any → Switch locales to see translations

**Social Links:**
- Should show 3 entries (Facebook, Instagram, TikTok)

---

### Check Frontend

1. Open: http://localhost:3000

2. **Check navigation** - You should see:
   ```
   🏠 Home  🎁 Packages  🧮 Calculator  📅 Calendar  📸 Gallery  ℹ️ About  📞 Contact
   ```

3. **Switch language** - Click language switcher (top-right)
   - Click 🇬🇪 KA → Navigation changes to Georgian
   - Click 🇷🇺 RU → Navigation changes to Russian
   - Click 🇬🇧 EN → Back to English

4. **Check home page:**
   - Hero title should display
   - Features section should show
   - Footer should have social links

---

## 🔥 What Got Created

### ✅ Site Settings (1 entry, 3 languages)
```
Fields populated:
- Hero Title, Subtitle
- 4 Feature Cards (title + description each)
- Packages Title, Subtitle
- CTA Title, Subtitle
- Footer Tagline
- Contact: Phone, Email, Address
- Social: Facebook URL, Instagram URL
```

### ✅ Navigation Menus (7 entries, 21 translations)
```
1. Home (მთავარი, Главная)
2. Packages (პაკეტები, Пакеты)
3. Calculator (კალკულატორი, Калькулятор)
4. Calendar (კალენდარი, Календарь)
5. Gallery (გალერეა, Галерея)
6. About (ჩვენს შესახებ, О нас)
7. Contact (კონტაქტი, Контакты)
```

### ✅ Social Links (3 entries)
```
1. Facebook (📘)
2. Instagram (📷)
3. TikTok (🎵)
```

**Total: 31 database entries created automatically!** 🎊

---

## ⚠️ Troubleshooting

### ❌ "Login failed"

**Problem:** Wrong credentials or admin user doesn't exist

**Solution:**
1. Go to http://localhost:1337/admin
2. If you see login page, use those credentials
3. If you see "Create admin" page, create admin first
4. Update the script with correct credentials

---

### ❌ "Locales not configured"

**Problem:** EN, KA, RU locales not set up in Strapi

**Solution:**
1. Go to http://localhost:1337/admin
2. Settings → Internationalization
3. Click "Add new locale"
4. Add: English (en), Georgian (ka), Russian (ru)
5. Set English as default
6. Run script again

---

### ❌ Script runs but data not showing on frontend

**Problem:** Frontend not fetching from CMS yet

**Solution:**
1. Make sure frontend is running: `cd frontend && npm run dev`
2. Refresh browser (Ctrl+F5)
3. Check browser console for errors
4. Verify backend is running: http://localhost:1337

---

## 🎨 Customizing the Data

Want to change the content?

1. Open: `backend/scripts/populate-cms-data.js`

2. Find the section you want to change:

**Site Settings (line 70):**
```javascript
const siteSettingsData = {
  en: {
    heroTitle: "Your Custom Title Here",
    heroSubtitle: "Your custom subtitle",
    // ... change any field
  }
}
```

**Navigation (line 145):**
```javascript
const navigationMenuData = [
  {
    path: '/your-page',
    icon: '🎯',
    labels: { en: 'Your Page', ka: 'თქვენი', ru: 'Ваша' }
  }
]
```

3. Save and run script again!

---

## 🔄 Running Again

**⚠️ Warning:** Running the script multiple times will create duplicates!

**If you need to re-run:**

1. **Clean up first in Strapi Admin:**
   - Delete all Navigation Menu entries
   - Delete all Social Links entries
   - Delete Site Setting localizations

2. **Or just manually edit** the existing data in Strapi Admin

---

## 🎉 You're Done!

**Congratulations!** Your CMS is now fully populated with:
- ✅ 3 languages
- ✅ 7 navigation items
- ✅ 3 social links
- ✅ Complete site settings

**No more manual data entry!** 🎊

---

## 📞 Need Help?

Check these files:
- `backend/scripts/README.md` - Detailed script documentation
- `CMS-HYBRID-IMPLEMENTATION.md` - Complete technical guide

---

**Built with ❤️ for KidParty**
**Time Saved: ~2 hours of manual data entry!** ⏰
