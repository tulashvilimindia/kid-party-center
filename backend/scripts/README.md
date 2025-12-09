# 🚀 Automatic CMS Data Population Script

This script automatically populates your Strapi CMS with all the content!

---

## ✅ What It Does

Automatically creates:
- ✅ Site Settings (3 languages: EN, KA, RU)
- ✅ 7 Navigation Menu items (all translated)
- ✅ 3 Social Links (Facebook, Instagram, TikTok)

**Total:** ~30 manual entries done automatically in seconds!

---

## 📋 Prerequisites

1. **Backend must be running:**
   ```bash
   cd backend
   npm run develop
   ```

2. **You must have created an admin user**
   - If not, go to http://localhost:1337/admin and create one

3. **Update admin credentials in the script:**
   - Open `scripts/populate-cms-data.js`
   - Lines 15-16, update:
     ```javascript
     const ADMIN_EMAIL = 'admin@example.com';     // Your email
     const ADMIN_PASSWORD = 'Admin123!';           // Your password
     ```

---

## 🎯 How to Run

### Method 1: From backend directory

```bash
cd backend
node scripts/populate-cms-data.js
```

### Method 2: From root directory

```bash
node backend/scripts/populate-cms-data.js
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
   → Creating English (en) version...
   ✅ English version created
   → Creating Georgian (ka) version...
   ✅ Georgian version created
   → Creating Russian (ru) version...
   ✅ Russian version created
✅ Site Settings populated successfully!

📋 Populating Navigation Menu...
   → Creating "Home"...
   ✅ "Home" created in all 3 languages
   → Creating "Packages"...
   ✅ "Packages" created in all 3 languages
   ... (5 more items)
✅ Navigation Menu populated successfully!

🔗 Populating Social Links...
   → Creating facebook...
   ✅ facebook created
   → Creating instagram...
   ✅ instagram created
   → Creating tiktok...
   ✅ tiktok created
✅ Social Links populated successfully!

═══════════════════════════════════════════════════════
  ✅ ALL DATA POPULATED SUCCESSFULLY! 🎊
═══════════════════════════════════════════════════════

🎯 Next Steps:
   1. Open http://localhost:3000
   2. Switch languages (EN, KA, RU)
   3. Enjoy your multilingual CMS!
```

---

## 🔧 Troubleshooting

### Error: "Login failed"
- Check if backend is running
- Verify admin credentials in the script
- Make sure you created an admin user

### Error: "API request failed"
- Check if locales (en, ka, ru) are configured in Strapi Admin
- Go to Settings → Internationalization → Add locales

### Error: "Cannot find module"
- Make sure you're running from the correct directory
- Try: `cd backend && node scripts/populate-cms-data.js`

---

## 🎨 Customizing the Data

Edit the script (`populate-cms-data.js`) to change:

### Site Settings (lines 70-140)
```javascript
const siteSettingsData = {
  en: {
    heroTitle: "Your Custom Title",
    // ... change any text
  }
}
```

### Navigation Menu (lines 145-195)
```javascript
const navigationMenuData = [
  {
    path: '/your-page',
    icon: '🎯',
    labels: { en: 'Your Page', ka: 'თქვენი გვერდი', ru: 'Ваша страница' }
  }
]
```

### Social Links (lines 200-220)
```javascript
const socialLinksData = [
  {
    platform: 'youtube',
    url: 'https://youtube.com/@kidparty',
    icon: '📺'
  }
]
```

---

## ⚠️ Important Notes

- **Run only once!** Running multiple times will create duplicates
- **Backup first** if you have existing data
- **Check Strapi Admin** after running to verify data

---

## 🔄 Re-running the Script

If you need to re-run:

1. **Delete existing data** in Strapi Admin first:
   - Content Manager → Site Setting → Delete localizations
   - Content Manager → Navigation Menus → Delete all
   - Content Manager → Social Links → Delete all

2. **Run the script again**

---

## 🎉 Success!

After running, you should see in Strapi Admin:
- ✅ Site Setting with 3 locales (EN, KA, RU)
- ✅ 7 Navigation Menu entries (each in 3 languages)
- ✅ 3 Social Links

And on your frontend (http://localhost:3000):
- ✅ Navigation menu with all items
- ✅ Language switcher working
- ✅ All content translated!

---

**Made with ❤️ for KidParty**
