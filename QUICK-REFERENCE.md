# ⚡ Quick Reference Card

## 🎯 Populate CMS (Choose ONE method)

### ⚠️ IMPORTANT: Stop Strapi First!
**You MUST stop the backend before populating!**
```bash
# In the backend terminal, press:
Ctrl+C

# Wait for it to fully stop (1-2 seconds)
```

### 🚀 FASTEST - One Command
```bash
# Windows: Just double-click this file!
backend/populate-cms.bat

# Or use command line:
cd backend && node scripts/auto-populate.js

# After success, restart Strapi:
npm run develop
```

### 🎨 Smart SQL - Two Commands
```bash
cd backend
node scripts/analyze-db.js
node scripts/generate-inserts.js
# Then run 3-generated-inserts.sql in SQLite client
```

### 🌐 API Script
```bash
# Edit scripts/populate-cms-data.js with your admin credentials
cd backend && node scripts/populate-cms-data.js
```

---

## 🧪 Test Everything

### Start Servers
```bash
# Terminal 1 - Backend
cd backend && npm run develop

# Terminal 2 - Frontend
cd frontend && npm run dev
```

### Open & Test
- **Strapi Admin:** http://localhost:1337/admin
- **Frontend:** http://localhost:3000
- **Switch languages:** Click 🇬🇧 → 🇬🇪 → 🇷🇺

---

## ✅ Verify Data

### Quick Check
```sql
SELECT COUNT(*) FROM site_settings;        -- Should be 3
SELECT COUNT(*) FROM navigation_menus;     -- Should be 21
SELECT COUNT(*) FROM social_links;         -- Should be 3
```

### View Data
```sql
SELECT id, locale, hero_title FROM site_settings;
SELECT id, label, locale, "order" FROM navigation_menus;
SELECT * FROM social_links;
```

---

## 🔧 Common Commands

### Backend
```bash
cd backend
npm install              # Install dependencies
npm run develop          # Start dev server
npm run build            # Build for production
npm start                # Start production
```

### Frontend
```bash
cd frontend
npm install              # Install dependencies
npm run dev              # Start dev server (port 3000)
npm run build            # Build for production
npm run preview          # Preview production build
```

---

## 📁 Important Files

### Configuration
- `backend/.tmp/data.db` - SQLite database
- `backend/config/` - Strapi configuration
- `frontend/vite.config.js` - Vite config (port 3000)

### CMS Content Types
- `backend/src/api/site-setting/` - Site settings
- `backend/src/api/navigation-menu/` - Navigation menus
- `backend/src/api/social-link/` - Social links
- `backend/src/api/package/` - Packages
- `backend/src/api/menu-item/` - Menu items
- `backend/src/api/gallery-image/` - Gallery images

### Frontend Components
- `frontend/src/components/layout/Header.jsx` - Header with nav
- `frontend/src/components/layout/Footer.jsx` - Footer
- `frontend/src/components/LanguageSwitcher/` - Language switcher
- `frontend/src/pages/Home.jsx` - Home page
- `frontend/src/services/api.js` - API calls

### Translations
- `frontend/src/i18n/locales/en/` - English translations
- `frontend/src/i18n/locales/ka/` - Georgian translations
- `frontend/src/i18n/locales/ru/` - Russian translations

---

## 🌍 Languages

- **English (en)** - Default, 🇬🇧
- **Georgian (ka)** - ქართული, 🇬🇪
- **Russian (ru)** - Русский, 🇷🇺

---

## 🔗 URLs

### Development
- Backend (Strapi): http://localhost:1337
- Admin Panel: http://localhost:1337/admin
- Frontend: http://localhost:3000
- API: http://localhost:1337/api

### API Endpoints
```
GET /api/site-setting?locale=en
GET /api/navigation-menus?locale=en&filters[isActive][$eq]=true&sort=order:asc
GET /api/social-links?locale=en&filters[isActive][$eq]=true&sort=order:asc
GET /api/packages?locale=en
GET /api/menu-items?locale=en
GET /api/gallery-images?locale=en
```

---

## 🐛 Quick Fixes

### Backend won't start?
```bash
cd backend
rm -rf node_modules package-lock.json
npm install
npm run develop
```

### Frontend won't start?
```bash
cd frontend
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### Database corrupted?
```bash
# Backup first!
cp backend/.tmp/data.db backend/.tmp/data.db.backup
# Delete and restart backend to recreate
rm backend/.tmp/data.db
cd backend && npm run develop
```

### Translations not working?
1. Check i18n initialized: `frontend/src/main.jsx` imports `./i18n/i18n`
2. Clear browser cache (Ctrl+Shift+R)
3. Check browser console for errors

### Language switcher not showing?
- Check Header component has `<LanguageSwitcher />`
- Verify component exists at `frontend/src/components/LanguageSwitcher/`
- Check browser console for errors

---

## 📚 Documentation Quick Links

| Topic | File |
|-------|------|
| **Populate CMS (All Methods)** | `POPULATE-CMS-README.md` |
| **One-Click Population** | Just run `auto-populate.js` |
| **Smart SQL Guide** | `backend/scripts/SMART-SQL-GUIDE.md` |
| **API Script Guide** | `backend/scripts/README.md` |
| **Manual Entry Guide** | `AUTO-SETUP-GUIDE.md` |
| **Complete Tech Docs** | `CMS-HYBRID-IMPLEMENTATION.md` |
| **Multilingual Setup** | `MULTILINGUAL-IMPLEMENTATION.md` |
| **This Reference** | `QUICK-REFERENCE.md` |

---

## 🎯 Typical Workflow

### First Time Setup
```bash
# 1. Install dependencies
cd backend && npm install
cd ../frontend && npm install

# 2. Start backend (creates database)
cd ../backend && npm run develop

# 3. Create admin user (browser opens automatically)
# Go to http://localhost:1337/admin

# 4. Configure locales in Strapi Admin
# Settings → Internationalization → Add en, ka, ru

# 5. Populate CMS (ONE command!)
node scripts/auto-populate.js

# 6. Start frontend
cd ../frontend && npm run dev

# 7. Test at http://localhost:3000
```

### Daily Development
```bash
# Terminal 1
cd backend && npm run develop

# Terminal 2
cd frontend && npm run dev

# Open: http://localhost:3000
```

---

## 💡 Pro Tips

1. **Keep terminals open** - Don't restart unless needed
2. **Use Ctrl+C** to stop servers gracefully
3. **Check console logs** - Most errors show there
4. **Backup database** before major changes
5. **Clear browser cache** if things look weird (Ctrl+Shift+R)

---

## 🎨 Customization

### Change Port
Edit `frontend/vite.config.js`:
```javascript
server: {
  port: 3000,  // Change this
```

### Add New Language
1. Strapi: Settings → Internationalization → Add locale
2. Create translation folder: `frontend/src/i18n/locales/LANG/`
3. Copy & translate JSON files from `en/`
4. Update LanguageSwitcher component

### Add New Navigation Item
**Option A:** In Strapi Admin
- Content Manager → Navigation Menus → Add entry

**Option B:** In populate script
Edit `generate-inserts.js` or `populate-cms-data.js`

---

## 📊 Database Tables

```
site_settings               # Site-wide settings (3 entries)
navigation_menus            # Menu items (21 entries)
social_links                # Social media (3 entries)
packages                    # Party packages
menu_items                  # Food/drink items
gallery_images              # Gallery photos
party_slots                 # Available dates/times
*_localizations_lnk         # i18n relationships
```

---

## 🎉 Success Checklist

- [ ] Backend starts without errors
- [ ] Frontend starts on port 3000
- [ ] Can login to admin panel
- [ ] Site Settings populated (3 locales)
- [ ] Navigation Menus populated (21 entries)
- [ ] Social Links populated (3 entries)
- [ ] Language switcher visible
- [ ] Language switching works
- [ ] Navigation changes language
- [ ] Content changes language
- [ ] No console errors

---

**🚀 You're all set! Happy coding!**

**Save this file - it has everything you need!** 📌
