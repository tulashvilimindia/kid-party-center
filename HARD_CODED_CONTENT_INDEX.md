# Hard-Coded Content Index

**Purpose:** Searchable map of ALL hardcoded user-facing content requiring migration to Strapi.

---

## HOME PAGE (`/:lang/`)

### `src/pages/Home.jsx` (Lines 60-160)

**Category: Text Content**

| Content | Location | Type | Target Strapi |
|---------|----------|------|---------------|
| "Why Choose STAR? ⭐" | Line 95 | Heading | Page/Block |
| "Everything you need for an amazing party experience" | Line 97 | Subtitle | Page/Block |
| "Safe & Secure" + description | Lines 103-104 | Feature Card | Component/Block |
| "Super Fun" + description | Lines 108-109 | Feature Card | Component/Block |
| "Professional Team" + description | Lines 112-113 | Feature Card | Component/Block |
| "Flexible Packages" + description | Lines 116-117 | Feature Card | Component/Block |
| "Our Popular Packages 🎁" | Line 125 | Heading | Page/Block |
| "Choose the perfect party package for your celebration" | Line 127 | Subtitle | Page/Block |
| "What Parents Say 💬" | Line 155 | Heading | Page/Block |
| "Real experiences from happy families" | Line 157 | Subtitle | Page/Block |
| "Ready to Plan Your Party? 🎉" | Line 180 | CTA Heading | Page/Block |
| "Let's create unforgettable memories for your child" | Line 181 | CTA Text | Page/Block |

**Notes:**
- Hero title/subtitle already use `settings?.heroTitle` fallback
- Packages section fetches from Strapi but has hardcoded heading
- Testimonials section has hardcoded heading but no testimonials displayed

---

## PACKAGES PAGE (`/:lang/packages`)

### `src/pages/Packages.jsx` (Lines 65-227)

**Category: Text Content**

| Content | Location | Type | Target Strapi |
|---------|----------|------|---------------|
| "Party Packages 🎁" | Line 70 | Page Title | Page entry |
| "Choose the perfect package for your child's special celebration" | Line 72 | Page Subtitle | Page entry |
| "All Packages" | Line 86 | Filter Label | Global/i18n |
| "Budget Friendly" 💰 | Line 94 | Filter Label | Global/i18n |
| "Standard" ✨ | Line 102 | Filter Label | Global/i18n |
| "Premium" ⭐ | Line 110 | Filter Label | Global/i18n |
| "No packages found" | Line 123 | Empty State Title | Global/i18n |
| "Try selecting a different filter..." | Line 124 | Empty State Text | Global/i18n |
| "Show All Packages" | Line 126 | Button Label | Global/i18n |
| "Not sure which package to choose? 🤔" | Line 210 | CTA Heading | Page/Block |
| "Use our calculator..." | Line 211 | CTA Text | Page/Block |
| "Price Calculator" 🧮 | Line 214 | Button Label | Global/i18n |
| "Contact Us" 📞 | Line 219 | Button Label | Global/i18n |

**Notes:**
- Package cards fetched from Strapi (✓)
- Page headers and CTAs are hardcoded

---

## GALLERY PAGE (`/:lang/gallery`)

### `src/pages/Gallery.jsx` (Lines 100-175)

**Category: Text Content**

| Content | Location | Type | Target Strapi |
|---------|----------|------|---------------|
| "Party Gallery 📸" | Line 103 | Page Title | Page entry |
| "See the fun and excitement from our amazing parties!" | Line 105 | Page Subtitle | Page entry |
| "🌟 All Photos" | Line 121 | Filter Label | Global/i18n |
| "📁 {category}" | Line 121 | Filter Dynamic | Global/i18n |
| "No images found" | Line 135 | Empty State Title | Global/i18n |
| "Try selecting a different category..." | Line 136 | Empty State Text | Global/i18n |
| "Show All Photos" | Line 138 | Button Label | Global/i18n |

**Notes:**
- Gallery images fetched from Strapi (✓)
- Filter labels and empty states hardcoded

---

## ABOUT PAGE (`/:lang/about`)

### `src/pages/About.jsx` (Lines 40-170)

**Category: Text & Data**

| Content | Location | Type | Target Strapi |
|---------|----------|------|---------------|
| "About BeqaParty" | Line 43 | Page Title | Page entry |
| "Creating magical memories for children in Batumi since 2020" | Line 45 | Page Subtitle | Page entry |
| "Our Story" | Line 55 | Section Heading | Page/Block |
| "BeqaParty was born from a simple idea..." (3 paragraphs) | Lines 56-68 | Story Content | Page/Block |
| "Our Values" | Line 96 | Section Heading | Page/Block |
| "Fun First" + description | Lines 100-101 | Value Card | Component/Block |
| "Safety" + description | Lines 105-106 | Value Card | Component/Block |
| "Quality" + description | Lines 110-111 | Value Card | Component/Block |
| "Personalized" + description | Lines 115-116 | Value Card | Component/Block |
| "Meet Our Team" | Line 125 | Section Heading | Page/Block |
| Team member cards (name/role/bio/image) | Lines 128-145 | Team Data | Collection Type |
| "Ready to Plan Your Party?" | Line 162 | CTA Heading | Page/Block |
| "Let's create an unforgettable celebration..." | Line 163 | CTA Text | Page/Block |

**Notes:**
- Entire About page is hardcoded text
- Team members should be a Collection Type

---

## CONTACT PAGE (`/:lang/contact`)

### `src/pages/Contact.jsx` (Lines 56-245)

**Category: Text & Business Data**

| Content | Location | Type | Target Strapi |
|---------|----------|------|---------------|
| Form field labels (Name, Email, Phone, Subject, Message) | Lines 80-175 | Form Labels | Global/i18n |
| "Batumi, Georgia" | Line 193 | Business Address | Global Single Type |
| "+995 577 123 456" | Line 200 | Business Phone | Global Single Type |
| "info@beqaparty.ge" | Line 207 | Business Email | Global Single Type |
| Opening hours text | Line 214 | Business Hours | Global Single Type |
| "Quick Links" | Line 221 | Section Heading | Global/i18n |
| "Follow Us" | Line 243 | Section Heading | Global/i18n |
| Success/error messages | Lines 77-79 | Notification Text | Global/i18n |

**Notes:**
- Contact info should be in Global "Business Info" Single Type
- Form labels should use i18n
- Currently uses `t()` for some labels (✓)

---

## FAQ PAGE (`/:lang/faq`)

### `src/pages/FAQ.jsx` (Lines 12-60)

**Category: Content Data**

| Content | Location | Type | Target Strapi |
|---------|----------|------|---------------|
| "Frequently Asked Questions" | Line 72 | Page Title | Page entry |
| "Find answers to common questions about our party services" | Line 74 | Page Subtitle | Page entry |
| FAQ #1: "How far in advance should I book a party?" + answer | Lines 14-15 | FAQ Item | Collection Type |
| FAQ #2: "What is included in the party packages?" + answer | Lines 18-19 | FAQ Item | Collection Type |
| FAQ #3: "Can I bring my own food and cake?" + answer | Lines 22-23 | FAQ Item | Collection Type |
| FAQ #4: "What is your cancellation policy?" + answer | Lines 26-27 | FAQ Item | Collection Type |
| FAQ #5: "How many children can attend?" + answer | Lines 30-31 | FAQ Item | Collection Type |
| FAQ #6: "Do you provide entertainment?" + answer | Lines 34-35 | FAQ Item | Collection Type |
| FAQ #7: "Can I customize a package?" + answer | Lines 38-39 | FAQ Item | Collection Type |
| FAQ #8: "What age groups do you cater to?" + answer | Lines 42-43 | FAQ Item | Collection Type |
| FAQ #9: "Is the venue safe for children?" + answer | Lines 46-47 | FAQ Item | Collection Type |
| FAQ #10: "What payment methods do you accept?" + answer | Lines 50-51 | FAQ Item | Collection Type |
| FAQ #11: "Can parents stay during the party?" + answer | Lines 54-55 | FAQ Item | Collection Type |
| FAQ #12: "What if it rains on our party day?" + answer | Lines 58-59 | FAQ Item | Collection Type |
| "Can't find the answer you're looking for? Our team is here to help!" | Line 106 | Footer Text | Page/Block |

**Notes:**
- ALL 12 FAQs are hardcoded as array
- Should become Collection Type with category field
- Page headers are hardcoded

---

## CALCULATOR PAGE (`/:lang/calculator`)

### `src/pages/Calculator.jsx` (Lines 87-285)

**Category: Text & UI Labels**

| Content | Location | Type | Target Strapi |
|---------|----------|------|---------------|
| "Party Calculator" | Line 91 | Page Title | Page entry |
| "Estimate your party costs" | Line 92 | Page Subtitle | Page entry |
| "Choose Package" emoji 🎁 | Line 105 | Step Label | Global/i18n |
| "Number of Children" emoji 👶 | Line 133 | Step Label | Global/i18n |
| "Add-ons" emoji ⭐ | Line 168 | Step Label | Global/i18n |
| "Price Summary" | Line 222 | Summary Heading | Global/i18n |
| "Select a package to see pricing" | Line 226 | Placeholder Text | Global/i18n |
| "Base Price", "Children", "Add-ons", "Total" | Lines 230-250 | Summary Labels | Global/i18n |

**Notes:**
- Packages fetched from Strapi (✓)
- Add-ons fetched from Strapi (✓)
- UI labels and page headers hardcoded

---

## CALENDAR PAGE (`/:lang/calendar`)

### `src/pages/Calendar.jsx` (Lines 245-385)

**Category: Text & UI Labels**

| Content | Location | Type | Target Strapi |
|---------|----------|------|---------------|
| "Availability Calendar" | Line 248 | Page Title | Page entry |
| "Check available time slots for your party" | Line 249 | Page Subtitle | Page entry |
| "All Days", "Weekdays", "Weekends" | Lines 259-271 | Filter Labels | Global/i18n |
| "No slots found" | Line 287 | Empty State Title | Global/i18n |
| "No available slots at the moment..." | Line 290 | Empty State Text | Global/i18n |
| "Don't see a time that works for you?" | Line 367 | Info Text | Page/Block |
| "Use our calculator to estimate costs..." | Line 375 | Info Text | Page/Block |
| "Explore our party packages..." | Line 383 | Info Text | Page/Block |
| Slot status labels (Available, Booked, Pending) | Lines 315-360 | Status Labels | Global/i18n |

**Notes:**
- Availability slots fetched from Strapi (✓)
- Page headers and helper texts hardcoded

---

## FOOTER (`src/components/layout/Footer.jsx`)

### Lines 40-180

**Category: Navigation & Business Data**

| Content | Location | Type | Target Strapi |
|---------|----------|------|---------------|
| "Quick Links" heading | Line 102 | Section Heading | Global/i18n |
| "Contact Us" heading | Line 137 | Section Heading | Global/i18n |
| "Batumi, Georgia" | Line 151 | Business Address | Global Single Type |
| "+995 577 123 456" | Line 152 | Business Phone | Global Single Type |
| "info@beqaparty.ge" | Line 153 | Business Email | Global Single Type |
| Copyright text | Line 172 | Footer Text | Global/i18n |
| Footer navigation links | Lines 106-125 | Nav Links | Dynamic from Header menu |

**Notes:**
- Footer tagline uses `settings?.footerTagline` (✓)
- Social links partially dynamic
- Business info duplicated from Contact page

---

## PRIVACY PAGE (`/:lang/privacy`)

### `src/pages/Privacy.jsx`

**Category: Legal Content**

| Content | Location | Type | Target Strapi |
|---------|----------|------|---------------|
| "Privacy Policy" | Page Title | Legal Text | Page entry or Rich Text Block |
| Entire privacy policy text | Full Content | Legal Text | Page entry or Rich Text Block |

**Notes:**
- Entire page is static content
- Should be editable Page or Rich Text field in Strapi

---

## TERMS PAGE (`/:lang/terms`)

### `src/pages/Terms.jsx`

**Category: Legal Content**

| Content | Location | Type | Target Strapi |
|---------|----------|------|---------------|
| "Terms & Conditions" | Page Title | Legal Text | Page entry or Rich Text Block |
| Entire T&C text | Full Content | Legal Text | Page entry or Rich Text Block |

**Notes:**
- Entire page is static content
- Should be editable Page or Rich Text field in Strapi

---

## NOT FOUND PAGE (`/:lang/404`)

### `src/pages/NotFound.jsx`

**Category: Error Messages**

| Content | Location | Type | Target Strapi |
|---------|----------|------|---------------|
| "404 - Page Not Found" | Page Title | Error Text | Global/i18n |
| "The page you're looking for doesn't exist" | Error Message | Error Text | Global/i18n |
| "Go Home" button | Button Label | UI Label | Global/i18n |

**Notes:**
- Simple error page
- Could use i18n instead of Strapi

---

## SUMMARY BY CATEGORY

### 🔤 **Text Content (Headings, Paragraphs, CTAs)**
- Home: 12 items
- Packages: 12 items
- Gallery: 7 items
- About: 14 items
- Contact: 8 items
- FAQ: 13 items
- Calculator: 8 items
- Calendar: 9 items
- Footer: 4 items
- Privacy/Terms: 2 pages
- 404: 3 items

**Total: ~92 text items**

### 📊 **Data Content (Business Info, Structured Data)**
- Contact info: Address, Phone, Email, Hours (duplicated in Contact + Footer)
- FAQs: 12 Q&A pairs
- Team members: ~4-6 members (About page)
- Values: 4 value cards
- Features: 4 feature cards
- Social links: Already dynamic (✓)

**Total: ~30 data items**

### 🗺️ **Navigation/Footer**
- Footer quick links: Can use Header menu API (✓)
- Footer business info: Needs Global Single Type

---

## MIGRATION PRIORITY

### 🔴 **HIGH (User-facing dynamic content)**
1. FAQs (12 items) → Collection Type
2. Team Members (About) → Collection Type
3. Business Info (Contact/Footer) → Global Single Type
4. About page story + values → Page blocks

### 🟡 **MEDIUM (Page-specific content)**
5. Home feature cards → Page blocks
6. Gallery/Packages page headers → Page entries
7. Calculator/Calendar page headers → Page entries
8. Privacy/Terms pages → Page entries with Rich Text

### 🟢 **LOW (UI labels - can use i18n)**
9. Filter labels, button labels, empty states
10. Form field labels
11. Error messages
