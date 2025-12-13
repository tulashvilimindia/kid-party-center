# Strapi Content Migration Tracker

**Project:** KidParty CMS Migration
**Goal:** Remove all hardcoded content and manage via Strapi 5.31.3
**Status:** Planning Phase

---

## 📋 PROPOSED STRAPI CONTENT MODEL

### **Single Types (Globals)**

#### 1. **Business Info** ✨ NEW
```yaml
Fields:
  - companyName: String
  - address: Text
  - city: String
  - country: String
  - phone: String
  - email: Email
  - openingHours: Rich Text
  - emergencyContact: String (optional)
  - googleMapsUrl: String (optional)
```

#### 2. **Site Settings** ✅ EXISTS (enhance)
```yaml
Current Fields:
  - siteName, siteDescription, logo
  - heroTitle, heroSubtitle (Home page)
  - footerTagline
  - socialLinks (Facebook, Instagram URLs)

Add:
  - defaultSEOTitle: String
  - defaultSEODescription: Text
  - ogImage: Media
  - favicon: Media
```

#### 3. **Footer Config** ✨ NEW (optional - can reuse Header menu)
```yaml
Fields:
  - copyrightText: String
  - showQuickLinks: Boolean
  - customLinks: Component (repeatable)
    - label: String
    - url: String
    - icon: String (emoji)
```

---

### **Collection Types**

#### 4. **FAQs** ✨ NEW
```yaml
Fields:
  - question: String (required)
  - answer: Rich Text (required)
  - category: Enumeration [General, Booking, Pricing, Safety, Other]
  - order: Integer (for sorting)
  - publishedAt: DateTime
```

#### 5. **Team Members** ✨ NEW
```yaml
Fields:
  - name: String (required)
  - role: String (required)
  - bio: Text
  - photo: Media (single)
  - email: Email (optional)
  - order: Integer
  - publishedAt: DateTime
```

#### 6. **Pages** ✨ NEW (Dynamic page builder)
```yaml
Fields:
  - title: String (required)
  - slug: String (unique, required)
  - subtitle: Text
  - content: Dynamic Zone (blocks below)
  - seo: Component (SEO meta)
  - publishedAt: DateTime

Supported Locales: en, ka, ru
```

#### 7. **Packages** ✅ EXISTS (keep as-is)
```yaml
Current structure is good.
No changes needed.
```

#### 8. **Gallery Images** ✅ EXISTS (keep as-is)
```yaml
Current structure is good.
No changes needed.
```

#### 9. **Availability Slots** ✅ EXISTS (keep as-is)
```yaml
Current structure is good.
No changes needed.
```

#### 10. **Add-ons** ✅ EXISTS (keep as-is)
```yaml
Current structure is good.
No changes needed.
```

---

### **Components / Dynamic Zone Blocks**

#### Block: **Hero Section**
```yaml
Fields:
  - heading: String
  - subtitle: Text
  - ctaButtons: Component (repeatable)
    - label: String
    - url: String
    - variant: Enum [primary, secondary, outline]
    - icon: String (emoji)
```

#### Block: **Feature Grid**
```yaml
Fields:
  - heading: String
  - subtitle: Text
  - features: Component (repeatable)
    - title: String
    - description: Text
    - icon: String (emoji)
```

#### Block: **CTA Section**
```yaml
Fields:
  - heading: String
  - text: Text
  - buttons: Component (repeatable, same as Hero)
  - variant: Enum [default, gradient, outlined]
```

#### Block: **Rich Text Block**
```yaml
Fields:
  - content: Rich Text
```

#### Block: **Team Grid** (for About page)
```yaml
Fields:
  - heading: String
  - showAllTeamMembers: Boolean (if true, fetch from Team Members collection)
```

#### Block: **FAQ Grid** (for FAQ page)
```yaml
Fields:
  - heading: String
  - subtitle: Text
  - showAllFAQs: Boolean (if true, fetch from FAQs collection)
  - categoryFilter: Enum (optional)
```

#### Block: **Values Grid** (for About page)
```yaml
Fields:
  - heading: String
  - values: Component (repeatable)
    - title: String
    - description: Text
    - icon: String (emoji)
```

---

## 🗺️ MIGRATION ROADMAP (Ordered Slices)

### **SLICE 1: Business Info Global** 🔴 Priority: HIGH
**Goal:** Centralize contact info (address, phone, email, hours) into Strapi

**Claude Tasks (Code):**
- [ ] Update `src/services/api.js`: Add `getBusinessInfo()` API function
- [ ] Update `src/pages/Contact.jsx`: Fetch and display business info from Strapi
- [ ] Update `src/components/layout/Footer.jsx`: Fetch business info instead of using fallbacks
- [ ] Remove hardcoded contact info from both files

**My Tasks (Strapi Admin):**
- [ ] Create Single Type: "Business Info"
- [ ] Add fields: companyName, address, city, country, phone, email, openingHours
- [ ] Populate with current data:
  - Address: "Batumi, Georgia"
  - Phone: "+995 577 123 456"
  - Email: "info@beqaparty.ge"
  - Opening Hours: (copy from Contact page)

**Acceptance Criteria:**
- ✅ Contact page displays info from Strapi
- ✅ Footer displays same info from Strapi
- ✅ No hardcoded contact info in code
- ✅ Fallback text shown if Strapi unavailable

**Affected Files:**
- `src/services/api.js`
- `src/pages/Contact.jsx`
- `src/components/layout/Footer.jsx`

---

### **SLICE 2: FAQs Collection Type** 🔴 Priority: HIGH
**Goal:** Make FAQ page fully dynamic from Strapi

**Claude Tasks (Code):**
- [ ] Update `src/services/api.js`: Add `getFAQs()` API function
- [ ] Update `src/pages/FAQ.jsx`: Replace hardcoded FAQs array with Strapi data
- [ ] Add loading state and error handling
- [ ] Add category filter support (optional)

**My Tasks (Strapi Admin):**
- [ ] Create Collection Type: "FAQ"
- [ ] Add fields: question (String), answer (Rich Text), category (Enum), order (Integer)
- [ ] Category values: General, Booking, Pricing, Safety, Other
- [ ] Populate with 12 existing FAQs from code:
  1. "How far in advance should I book a party?" → General
  2. "What is included in the party packages?" → Pricing
  3. "Can I bring my own food and cake?" → General
  4. "What is your cancellation policy?" → Booking
  5. "How many children can attend?" → General
  6. "Do you provide entertainment?" → General
  7. "Can I customize a package?" → Booking
  8. "What age groups do you cater to?" → General
  9. "Is the venue safe for children?" → Safety
  10. "What payment methods do you accept?" → Pricing
  11. "Can parents stay during the party?" → General
  12. "What if it rains on our party day?" → General
- [ ] Set order: 1-12
- [ ] Publish all entries

**Acceptance Criteria:**
- ✅ FAQ page displays all questions from Strapi
- ✅ Questions sorted by order field
- ✅ Expand/collapse functionality works
- ✅ No hardcoded FAQ array in code
- ✅ Graceful fallback if Strapi unavailable

**Affected Files:**
- `src/services/api.js`
- `src/pages/FAQ.jsx`

---

### **SLICE 3: Team Members Collection Type** 🔴 Priority: HIGH
**Goal:** Make About page "Meet Our Team" section dynamic

**Claude Tasks (Code):**
- [ ] Update `src/services/api.js`: Add `getTeamMembers()` API function
- [ ] Update `src/pages/About.jsx`: Replace hardcoded team member cards with Strapi data
- [ ] Add loading state and grid layout
- [ ] Handle missing photos with placeholder

**My Tasks (Strapi Admin):**
- [ ] Create Collection Type: "Team Member"
- [ ] Add fields: name, role, bio (Text), photo (Media - single image), email (optional), order
- [ ] Create 4-6 team member entries (sample data):
  - Example: "Beqa Tulashvili" → "Founder & CEO" → bio + photo
  - Example: "Nino Gelashvili" → "Party Coordinator" → bio + photo
  - Example: "Giorgi Beridze" → "Entertainment Specialist" → bio + photo
  - Example: "Mariam Kvitsiani" → "Customer Relations" → bio + photo
- [ ] Upload team photos to Media Library
- [ ] Set order: 1-6
- [ ] Publish all entries

**Acceptance Criteria:**
- ✅ About page displays team members from Strapi
- ✅ Team members sorted by order field
- ✅ Photos display correctly
- ✅ No hardcoded team member data in code
- ✅ Grid layout responsive (2 cols desktop, 1 col mobile)

**Affected Files:**
- `src/services/api.js`
- `src/pages/About.jsx`

---

### **SLICE 4: Pages Collection Type (About Story + Values)** 🟡 Priority: MEDIUM
**Goal:** Make About page "Our Story" and "Our Values" editable from Strapi

**Claude Tasks (Code):**
- [ ] Create `src/services/api.js`: Add `getPageBySlug(slug)` API function
- [ ] Create `src/components/blocks/RichTextBlock.jsx`: Render rich text
- [ ] Create `src/components/blocks/ValuesGrid.jsx`: Render values grid
- [ ] Update `src/pages/About.jsx`: Fetch page content from Strapi (slug: "about")
- [ ] Render blocks dynamically based on content type

**My Tasks (Strapi Admin):**
- [ ] Create Collection Type: "Page"
- [ ] Add fields: title, slug (unique), subtitle, content (Dynamic Zone), seo (Component)
- [ ] Add Dynamic Zone blocks:
  - Rich Text Block (component)
  - Values Grid (component with repeatable values)
- [ ] Create Values Grid component:
  - Add fields: heading (String), values (repeatable: title, description, icon)
- [ ] Create Page entry: slug = "about"
  - Title: "About BeqaParty"
  - Subtitle: "Creating magical memories for children in Batumi since 2020"
  - Block 1: Rich Text → "Our Story" content (3 paragraphs from code)
  - Block 2: Values Grid → 4 values (Fun First, Safety, Quality, Personalized)
- [ ] Enable i18n for Pages (en, ka, ru)
- [ ] Publish entry

**Acceptance Criteria:**
- ✅ About page fetches content from Pages (slug: "about")
- ✅ Story section renders from Rich Text block
- ✅ Values grid renders from Values Grid block
- ✅ No hardcoded story/values text in code
- ✅ Dynamic Zone supports multiple block types

**Affected Files:**
- `src/services/api.js`
- `src/pages/About.jsx`
- `src/components/blocks/RichTextBlock.jsx` (new)
- `src/components/blocks/ValuesGrid.jsx` (new)

---

### **SLICE 5: Home Feature Cards (Dynamic Zone)** 🟡 Priority: MEDIUM
**Goal:** Make Home page feature cards editable from Strapi

**Claude Tasks (Code):**
- [ ] Create `src/components/blocks/FeatureGrid.jsx`: Render feature grid block
- [ ] Update `src/services/api.js`: Update `getHomePage()` or create `getPageBySlug('home')`
- [ ] Update `src/pages/Home.jsx`: Replace hardcoded features with dynamic block
- [ ] Ensure feature icons (emoji) render correctly

**My Tasks (Strapi Admin):**
- [ ] Add Feature Grid block to Dynamic Zone components
- [ ] Feature Grid component fields:
  - heading: String
  - subtitle: Text
  - features: Repeatable component (title, description, icon emoji)
- [ ] Create/Update Page entry: slug = "home"
  - Block: Feature Grid
    - Heading: "Why Choose STAR? ⭐"
    - Subtitle: "Everything you need for an amazing party experience"
    - Features (4 items):
      1. 🛡️ Safe & Secure → "Professional supervision and child-safe environment..."
      2. 🎊 Super Fun → "Exciting games, activities, and entertainment..."
      3. 👨‍👩‍👧‍👦 Professional Team → "Experienced and trained staff..."
      4. 📦 Flexible Packages → "Customizable party packages..."
- [ ] Publish entry

**Acceptance Criteria:**
- ✅ Home page features render from Strapi block
- ✅ Feature icons display correctly
- ✅ No hardcoded feature cards in code
- ✅ Grid layout responsive

**Affected Files:**
- `src/services/api.js`
- `src/pages/Home.jsx`
- `src/components/blocks/FeatureGrid.jsx` (new)

---

### **SLICE 6: Page Headers (Gallery, Packages, Calculator, Calendar)** 🟡 Priority: MEDIUM
**Goal:** Make page titles/subtitles editable from Strapi

**Claude Tasks (Code):**
- [ ] Update `src/pages/Gallery.jsx`: Fetch page data from Pages (slug: "gallery")
- [ ] Update `src/pages/Packages.jsx`: Fetch page data from Pages (slug: "packages")
- [ ] Update `src/pages/Calculator.jsx`: Fetch page data from Pages (slug: "calculator")
- [ ] Update `src/pages/Calendar.jsx`: Fetch page data from Pages (slug: "calendar")
- [ ] Replace hardcoded titles/subtitles with Strapi data
- [ ] Add fallback text if Strapi unavailable

**My Tasks (Strapi Admin):**
- [ ] Create Page entries:
  1. slug = "gallery"
     - Title: "Party Gallery 📸"
     - Subtitle: "See the fun and excitement from our amazing parties!"
  2. slug = "packages"
     - Title: "Party Packages 🎁"
     - Subtitle: "Choose the perfect package for your child's special celebration"
  3. slug = "calculator"
     - Title: "Party Calculator"
     - Subtitle: "Estimate your party costs"
  4. slug = "calendar"
     - Title: "Availability Calendar"
     - Subtitle: "Check available time slots for your party"
- [ ] Publish all entries
- [ ] Enable i18n for all Pages

**Acceptance Criteria:**
- ✅ All 4 pages display titles from Strapi
- ✅ Subtitles editable in Strapi admin
- ✅ No hardcoded page titles in code
- ✅ Fallback text works if Strapi down

**Affected Files:**
- `src/pages/Gallery.jsx`
- `src/pages/Packages.jsx`
- `src/pages/Calculator.jsx`
- `src/pages/Calendar.jsx`

---

### **SLICE 7: Privacy & Terms Pages (Rich Text)** 🟡 Priority: MEDIUM
**Goal:** Make legal pages editable from Strapi

**Claude Tasks (Code):**
- [ ] Update `src/pages/Privacy.jsx`: Fetch page from Strapi (slug: "privacy")
- [ ] Update `src/pages/Terms.jsx`: Fetch page from Strapi (slug: "terms")
- [ ] Render Rich Text content
- [ ] Add loading state

**My Tasks (Strapi Admin):**
- [ ] Create Page entry: slug = "privacy"
  - Title: "Privacy Policy"
  - Content: Rich Text Block → copy current privacy policy content from code
- [ ] Create Page entry: slug = "terms"
  - Title: "Terms & Conditions"
  - Content: Rich Text Block → copy current T&C content from code
- [ ] Publish both entries
- [ ] Enable i18n

**Acceptance Criteria:**
- ✅ Privacy page renders from Strapi
- ✅ Terms page renders from Strapi
- ✅ Rich text formatting preserved
- ✅ No hardcoded legal text in code

**Affected Files:**
- `src/pages/Privacy.jsx`
- `src/pages/Terms.jsx`

---

### **SLICE 8: CTA Sections (Home, Packages, About, Calendar)** 🟢 Priority: LOW
**Goal:** Make CTA sections editable from Strapi

**Claude Tasks (Code):**
- [ ] Create `src/components/blocks/CTASection.jsx`: Render CTA block
- [ ] Update Pages to include CTA blocks in Dynamic Zone
- [ ] Update relevant page components to render CTA blocks

**My Tasks (Strapi Admin):**
- [ ] Add CTA Section block to Dynamic Zone components
- [ ] CTA Section component fields:
  - heading: String
  - text: Text
  - buttons: Repeatable (label, url, variant, icon)
  - variant: Enum [default, gradient, outlined]
- [ ] Add CTA blocks to existing Pages:
  - Home: "Ready to Plan Your Party? 🎉"
  - Packages: "Not sure which package to choose? 🤔"
  - About: "Ready to Plan Your Party?"
  - Calendar: Info sections with CTAs
- [ ] Publish updates

**Acceptance Criteria:**
- ✅ CTA sections render from Strapi blocks
- ✅ Button links work correctly
- ✅ No hardcoded CTA text in code

**Affected Files:**
- `src/components/blocks/CTASection.jsx` (new)
- `src/pages/Home.jsx`
- `src/pages/Packages.jsx`
- `src/pages/About.jsx`
- `src/pages/Calendar.jsx`

---

### **SLICE 9: UI Labels & i18n Migration** 🟢 Priority: LOW
**Goal:** Move remaining UI labels to i18n JSON files (NOT Strapi)

**Claude Tasks (Code):**
- [ ] Create/update i18n JSON files for:
  - Filter labels (All Packages, Budget, Standard, Premium)
  - Button labels (View Details, Show All, Contact Us, etc.)
  - Empty state messages
  - Form field labels
  - Error/success messages
- [ ] Replace hardcoded strings with `t()` calls
- [ ] Ensure i18n works for en, ka, ru

**My Tasks (Strapi Admin):**
- None (this uses i18n, not Strapi)

**Acceptance Criteria:**
- ✅ All UI labels use i18n
- ✅ Language switching works
- ✅ No hardcoded UI labels in components

**Affected Files:**
- `public/locales/en/*.json`
- `public/locales/ka/*.json`
- `public/locales/ru/*.json`
- Multiple component files

---

## 📊 PROGRESS TRACKING

### Overall Progress: 0/9 Slices Complete

| Slice | Status | Claude Tasks | My Tasks | Completion % |
|-------|--------|--------------|----------|--------------|
| 1. Business Info | ⬜ Not Started | 0/4 | 0/4 | 0% |
| 2. FAQs | ⬜ Not Started | 0/4 | 0/5 | 0% |
| 3. Team Members | ⬜ Not Started | 0/4 | 0/6 | 0% |
| 4. Pages (About) | ⬜ Not Started | 0/5 | 0/6 | 0% |
| 5. Home Features | ⬜ Not Started | 0/4 | 0/3 | 0% |
| 6. Page Headers | ⬜ Not Started | 0/6 | 0/5 | 0% |
| 7. Privacy/Terms | ⬜ Not Started | 0/3 | 0/3 | 0% |
| 8. CTA Sections | ⬜ Not Started | 0/3 | 0/3 | 0% |
| 9. i18n Labels | ⬜ Not Started | 0/3 | 0/0 | 0% |

**Legend:** ⬜ Not Started | 🟡 In Progress | ✅ Complete

---

## 🎯 QUICK START GUIDE

### For Me (Strapi Admin Tasks):
1. Start with **Slice 1** (Business Info)
2. Log into Strapi Admin: `http://localhost:1337/admin`
3. Create Single Type: Business Info
4. Add fields as specified
5. Populate with current data
6. Save & Publish
7. Notify Claude to start coding

### For Claude (Code Tasks):
1. Wait for confirmation that Strapi content type is created
2. Implement API function in `src/services/api.js`
3. Update page component to fetch and display data
4. Test locally
5. Mark slice as complete

---

## 📝 NOTES & DECISIONS

### Architecture Decisions:
- **Pages Collection Type** = Single source for page metadata (title, subtitle, SEO)
- **Dynamic Zone Blocks** = Flexible content builder for complex pages
- **i18n for UI labels** = Better for translation workflow than Strapi
- **One API call per page** = Fetch page + populate all relations in single request

### Content Strategy:
- **Business Info** = Global Single Type (appears in multiple places)
- **FAQs** = Collection Type (need to add/edit/reorder easily)
- **Team Members** = Collection Type (need to add/remove members)
- **Legal Pages** = Pages with Rich Text (rarely change but need to be editable)
- **Page Headers** = Pages Collection (reusable, i18n-friendly)

### What's Already Dynamic (Keep):
- ✅ Packages
- ✅ Gallery Images
- ✅ Availability Slots
- ✅ Add-ons
- ✅ Header Menu
- ✅ Social Links (partial)
- ✅ Site Settings (partial)

### What Stays Hardcoded:
- Component styles (CSS)
- React routing logic
- Form validation rules
- Client-side interactive logic

---

## 🚨 RISKS & MITIGATION

| Risk | Impact | Mitigation |
|------|--------|------------|
| Strapi API down | High - site broken | Add fallback text for all Strapi content |
| Missing translations | Medium - some pages in English only | Ensure i18n enabled for all content types |
| Slow API responses | Medium - poor UX | Implement caching, loading states |
| Breaking changes in Strapi v5 | Low - stable API | Pin Strapi version in package.json |
| Over-fetching data | Low - performance hit | Use populate selectively, not "*" |

---

## ✅ DEFINITION OF DONE (Per Slice)

Each slice is complete when:
1. ✅ Strapi content type created and published
2. ✅ Sample data populated in Strapi admin
3. ✅ API function implemented and tested
4. ✅ Page component updated to use Strapi data
5. ✅ Hardcoded content removed from code
6. ✅ Fallback text works if Strapi unavailable
7. ✅ No console errors
8. ✅ Responsive design maintained
9. ✅ i18n works (if applicable)
10. ✅ Both parties confirm completion

---

**Last Updated:** 2025-12-13
**Next Review:** After Slice 1 completion
