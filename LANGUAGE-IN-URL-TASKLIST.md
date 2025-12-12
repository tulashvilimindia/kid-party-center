# Language in URL + Strapi Images - Implementation Task List

**Date:** December 12, 2025
**Objectives:**
1. Add language parameter to all URLs (e.g., /gallery/ka, /contact/ru)
2. Load images from Strapi with default fallbacks
3. Full page reload on language change

---

## 🎯 MAIN OBJECTIVES

### 1. Language in URL
- All routes should include language: `/en/gallery`, `/ka/packages`, `/ru/contact`
- Language should be part of the route path
- Default language: `en` (redirect `/gallery` → `/en/gallery`)

### 2. Strapi Images
- Load images from Strapi API
- Show default placeholder images if no image exists
- Handle image URLs from Strapi media library

### 3. Full Page Reload on Language Change
- When user switches language, reload entire page
- Change URL to new language
- Re-render all components from scratch

---

## 📋 TASK LIST

### Phase 1: Setup Language Routing

#### Task 1.1: Update App.jsx Routes ✅
- [ ] Wrap all routes with `/:lang` parameter
- [ ] Add language validation (only en, ka, ru allowed)
- [ ] Add redirect from `/` to `/en`
- [ ] Add redirect from `/gallery` to `/en/gallery`, etc.

Example:
```jsx
<Routes>
  <Route path="/:lang" element={<LanguageWrapper />}>
    <Route index element={<Home />} />
    <Route path="packages" element={<Packages />} />
    <Route path="packages/:slug" element={<PackageDetail />} />
    <Route path="gallery" element={<Gallery />} />
    <Route path="contact" element={<Contact />} />
    <Route path="about" element={<About />} />
    <Route path="calculator" element={<Calculator />} />
    <Route path="calendar" element={<Calendar />} />
  </Route>
  <Route path="*" element={<Navigate to="/en" />} />
</Routes>
```

#### Task 1.2: Create LanguageWrapper Component ✅
- [ ] Create component that reads `:lang` from URL
- [ ] Set i18n language based on URL
- [ ] Render <Outlet /> for nested routes

#### Task 1.3: Update Header Language Switcher ✅
- [ ] Change language switcher to navigate to new URL
- [ ] Use `window.location.href` for full page reload
- [ ] Update URL: `/en/gallery` → `/ka/gallery`

Example:
```jsx
const changeLanguage = (newLang) => {
  const currentPath = location.pathname;
  const pathWithoutLang = currentPath.replace(/^\/(en|ka|ru)/, '');
  window.location.href = `/${newLang}${pathWithoutLang}`;
};
```

#### Task 1.4: Update All Navigation Links ✅
- [ ] Update Header links to include language
- [ ] Update Footer links to include language
- [ ] Update all <Link> components to use language prefix

Example:
```jsx
<Link to={`/${i18n.language}/gallery`}>Gallery</Link>
```

---

### Phase 2: Strapi Image Loading

#### Task 2.1: Check Strapi Image Format ✅
- [ ] Check how Strapi returns image data
- [ ] Identify image field structure (URL, formats, etc.)
- [ ] Test with curl to see actual response

Example curl:
```bash
curl http://localhost:1337/api/gallery-images?populate=*&locale=en
```

#### Task 2.2: Create Image Helper Component ✅
- [ ] Create `StrapiImage.jsx` component
- [ ] Handle image URL from Strapi
- [ ] Show default placeholder if no image
- [ ] Handle loading states

```jsx
const StrapiImage = ({ image, alt, className, defaultEmoji = "🎉" }) => {
  const getImageUrl = () => {
    if (!image) return null;
    if (typeof image === 'string') return image;
    if (image.url) return `http://localhost:1337${image.url}`;
    if (image.formats?.medium?.url) return `http://localhost:1337${image.formats.medium.url}`;
    return null;
  };

  const imageUrl = getImageUrl();

  if (!imageUrl) {
    return (
      <div className={`strapi-image-placeholder ${className}`}>
        <span>{defaultEmoji}</span>
      </div>
    );
  }

  return <img src={imageUrl} alt={alt} className={className} />;
};
```

#### Task 2.3: Update Gallery to Use Strapi Images ✅
- [ ] Replace hardcoded imageUrl with StrapiImage component
- [ ] Update API call to populate image field
- [ ] Handle missing images with emoji fallback

#### Task 2.4: Update Other Pages with Images ✅
- [ ] Packages page - package images
- [ ] About page - team/venue images
- [ ] Home page - hero images
- [ ] Add default fallbacks for all

---

### Phase 3: Testing

#### Task 3.1: Test Language Routing ✅
- [ ] Test `/en/gallery` works
- [ ] Test `/ka/gallery` works
- [ ] Test `/ru/gallery` works
- [ ] Test redirect from `/gallery` to `/en/gallery`
- [ ] Test redirect from `/` to `/en`
- [ ] Test invalid language `/fr/gallery` redirects

#### Task 3.2: Test Language Switching ✅
- [ ] Switch from EN to KA - should reload
- [ ] Switch from KA to RU - should reload
- [ ] Switch from RU to EN - should reload
- [ ] Verify URL changes correctly
- [ ] Verify page content updates

#### Task 3.3: Test Strapi Images ✅
- [ ] Test gallery with real images
- [ ] Test gallery with missing images (shows emoji)
- [ ] Test packages with images
- [ ] Test image loading states
- [ ] Test responsive images

---

## 🔄 ATTEMPT 1: Implementation Plan

### Step 1: Create LanguageWrapper Component
**File:** `frontend/src/components/LanguageWrapper.jsx`

### Step 2: Update App.jsx with Language Routes
**File:** `frontend/src/App.jsx`

### Step 3: Update Header Language Switcher
**File:** `frontend/src/components/layout/Header.jsx`

### Step 4: Create StrapiImage Component
**File:** `frontend/src/components/common/StrapiImage.jsx`

### Step 5: Update Gallery to Use Strapi Images
**File:** `frontend/src/pages/Gallery.jsx`

### Step 6: Test Everything
- Test all routes with language prefixes
- Test language switching (full reload)
- Test images load correctly

---

## 🔄 ATTEMPT 2: Fix Issues and Refine

### Common Issues to Watch For:
1. **Infinite redirects** - Check default language logic
2. **Broken navigation links** - Update all Link components
3. **Images not loading** - Check CORS and URL construction
4. **Language not persisting** - Check LanguageWrapper logic

### Refinements:
1. Add loading states for images
2. Optimize image sizes
3. Add error boundaries
4. Improve redirect logic

---

## 📊 SUCCESS CRITERIA

### Language Routing:
- ✅ All pages accessible at `/en/page`, `/ka/page`, `/ru/page`
- ✅ Default redirect from `/page` to `/en/page`
- ✅ Language switcher changes URL and reloads page
- ✅ URL reflects current language at all times

### Strapi Images:
- ✅ Images load from Strapi when available
- ✅ Default emoji shown when no image
- ✅ No broken image icons
- ✅ Loading states handled gracefully

### User Experience:
- ✅ Smooth language switching (full reload)
- ✅ URLs are shareable with language
- ✅ No console errors
- ✅ Fast page loads

---

## 🧪 TESTING COMMANDS

```bash
# Test language routes
http://localhost:3000/en
http://localhost:3000/en/gallery
http://localhost:3000/ka/gallery
http://localhost:3000/ru/contact

# Test redirects
http://localhost:3000/          → should redirect to /en
http://localhost:3000/gallery   → should redirect to /en/gallery

# Test API with images
curl http://localhost:1337/api/gallery-images?populate=*&locale=en
curl http://localhost:1337/api/packages?populate=*&locale=en

# Check what image fields exist
curl http://localhost:1337/api/gallery-images?populate=*&locale=en | grep -i "image\|photo\|picture"
```

---

## 📝 IMPLEMENTATION NOTES

### Current State:
- Routes: No language prefix (e.g., `/gallery`)
- Language: Stored in i18n, not in URL
- Images: May be using hardcoded URLs or missing

### Target State:
- Routes: With language prefix (e.g., `/en/gallery`)
- Language: Derived from URL, synced with i18n
- Images: Loaded from Strapi with fallbacks

### Key Changes:
1. **Routing:** Add `:lang` parameter to all routes
2. **Navigation:** Update all `<Link to="/gallery">` to `<Link to={`/${lang}/gallery`}>`
3. **Language Switching:** Use `window.location.href` to reload page
4. **Images:** Create helper component to handle Strapi image URLs

---

## ⏱️ TIME ESTIMATES

- **Attempt 1:** 30-45 minutes
  - Language routing: 15 min
  - Strapi images: 15 min
  - Testing: 10-15 min

- **Attempt 2:** 15-20 minutes
  - Fix issues: 10 min
  - Refinements: 5 min
  - Final testing: 5 min

**Total:** ~1 hour

---

## 🚀 READY TO START

**Status:** ✅ Task list created
**Next Step:** Begin Attempt 1 - Create LanguageWrapper component

---

**Generated:** December 12, 2025 15:00
**Priority:** 🔴 HIGH
**Complexity:** 🟡 MEDIUM
