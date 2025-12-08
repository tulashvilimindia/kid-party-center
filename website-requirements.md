✅ KID PARTY CENTER WEBSITE — FULL PROJECT SPECIFICATION (COMPLETED)

(Runs locally: React frontend + Strapi CMS backend + SQLite)

1. PROJECT OVERVIEW
Project Name:

BeqaParty – Kids Event & Birthday Party Center

Purpose:

A modern, interactive website that allows customers to explore party packages, generate menu pricing using a calculator, check available calendar slots, and contact the party center.

Target Audience:

Parents looking to book children’s birthday parties

Event organizers

Local families in Batumi

Main Goals:

Showcase all party packages

Provide pricing calculator per child

Allow visitors to check date availability

Build trust with gallery & venue information

Make the booking process easier through forms

2. WEBSITE STRUCTURE
✔ Pages Needed:

 Homepage

 About Page

 Contact Page

 Packages Page

 Calculator Page

 Availability Calendar Page

 Gallery Page

 FAQ Page

 Privacy Policy

 Terms & Conditions

Navigation Structure:
Home
Packages
Menu Calculator
Calendar
Gallery
About Us
Contact

3. FEATURES & FUNCTIONALITY
✔ User-Facing Features:

 Contact Form

 Menu Calculator (price per child × number of guests)

 Read-only availability calendar (from Strapi)

 Gallery slider

 Dynamic content via Strapi

 SEO-friendly pages

 Mobile responsive UI

 Social media links

❌ NO login, checkout, payments (not needed now)
✔ Third-Party Integrations:

Analytics: Google Analytics

Email: Strapi email plugin (SMTP later)

Social Media: Facebook/Instagram links

4. STRAPI CMS CONTENT TYPES
✔ Collection Types
1. Package
Field	Type	Required	Notes
name	Text	Yes	Package name
slug	UID	Yes	Auto from name
shortDescription	Text	Yes	Summary
fullDescription	Rich text	No	Long description
durationMinutes	Integer	Yes	Length of session
pricePerChild	Decimal	Yes	Base price
minGuests	Integer	Yes	Minimum allowed
maxGuests	Integer	No	Maximum allowed
includedFeatures	Component	No	Feature list
image	Media	No	Package photo
2. Menu Item
Field	Type	Required
name	string	✔
category	enumeration	✔ (food/drinks/dessert/extras)
pricePerChild	decimal	✔
description	text	✖
image	media	✖
3. Party Slot (calendar)
Field	Type	Required
date	date	✔
startTime	time	✔ (HH:mm:ss.SSS)
endTime	time	✔
status	enum	✔ (available, limited, booked)
maxParties	integer	✖
bookedParties	integer	✖
4. Gallery Image
Field	Type	Required
title	string	✔
image	media	✔
✔ Single Types
5. Site Setting

Contains global static content.

Field	Type	Required
heroTitle	string	✔
heroSubtitle	string	✔
address	string	✔
phone	string	✔
email	string	✔
instagramUrl	string	✖
facebookUrl	string	✖
heroImage	media	✖

All fields have now been added in seed.js.

5. USER ROLES & PERMISSIONS
✔ Roles:

Super Admin – Full access

Editor – Can edit content but not settings

Public User – Read-only access to:

packages

gallery

menu items

party slots

site settings

6. DESIGN & UI REQUIREMENTS
✔ Style Preferences:

Primary Color: #FF7A00 (Orange playful)

Secondary Color: #00C4FF (Blue for kids)

Accent Color: #FF3A6E (Pink fun accent)

Background: White & soft pastels

Typography: Poppins / Inter (modern, kid-friendly)

Style: Playful, colorful, animated, rounded shapes

✔ Reference Websites:

https://chuckecheese.com
 – playful, kid-friendly interactions

https://lilliput.co
 – colorful & soft UI

✔ Responsive:

Fully mobile-first

Tablet optimized

Desktop optimized

✔ Special Elements:

Smooth animations

Image sliders

Animated buttons

7. FORMS & DATA COLLECTION
Contact Form:

Fields:

Name ✔

Email ✔

Phone ✔

Message ✔

Action:

Display success message

(Later) email to admin

8. EMAIL NOTIFICATIONS

(Later when SMTP configured)

Contact form → send admin email (optional)

9. TESTING REQUIREMENTS

API endpoint test

Forms test

Calendar loading

Menu calculator

Responsive check

Gallery slider

Performance & Lighthouse audit

10. ADDITIONAL REQUIREMENTS
SEO:

Meta tags

Sitemap

Robots.txt

Social preview images

Performance:

Optimized images

Lazy loading

Accessibility:

Alt text required

ARIA labels

Keyboard navigation

Other:

GDPR banner later

11. EXAMPLE CONTENT
Homepage:

Hero:
“Unforgettable Kids Parties in Batumi!”
“Fun, safe, magical experiences for children of all ages.”

About:
“We create magical party experiences your child will remember.”

Featured Packages:

Basic Fun Party

Super Adventure Party

Mega VIP Party
---

## 12. PROGRESS TRACKER
**[I will update this section as I build - DO NOT EDIT]**

### Phase 1: Project Setup ⏳
- [ ] Initialize Strapi backend
- [ ] Initialize React frontend
- [ ] Configure SQLite database
- [ ] Install all dependencies
- [ ] Project structure setup

### Phase 2: Strapi Backend ⏳
- [ ] Create all content types
- [ ] Configure user roles & permissions
- [ ] Set up API endpoints
- [ ] Configure media library
- [ ] Add sample content

### Phase 3: React Frontend ⏳
- [ ] Set up routing
- [ ] Create all page components
- [ ] Connect to Strapi API
- [ ] Implement responsive design
- [ ] Add forms and validation
- [ ] Implement all features

### Phase 4: Integration ⏳
- [ ] Connect frontend to backend
- [ ] Test all CRUD operations
- [ ] Implement authentication
- [ ] Set up file uploads
- [ ] Configure email notifications

### Phase 5: Testing ⏳
- [ ] Backend unit tests
- [ ] Frontend component tests
- [ ] Integration tests
- [ ] E2E tests for critical flows
- [ ] Performance testing
- [ ] Security testing
- [ ] Fix all bugs

### Phase 6: Polish & Documentation ⏳
- [ ] Optimize images and assets
- [ ] SEO implementation
- [ ] Accessibility improvements
- [ ] Write README with setup instructions
- [ ] Write admin user guide
- [ ] Write deployment guide
- [ ] Final testing

---

## 13. DEPLOYMENT

### Where will this be hosted?
- [ ] Local development only (for now)
- [ ] Vercel / Netlify (frontend)
- [ ] Heroku / Railway / Render (backend)
- [ ] VPS (DigitalOcean, AWS, etc.)
- [ ] Shared hosting
- [ ] Other: [Specify]

### Domain:
- Domain name (if you have one): [e.g., www.beqaparty.com]
- Or use: [Subdomain / Free hosting domain]

---

## INSTRUCTIONS FOR YOU:

1. **Fill out everything above** - Replace all [brackets] with your information
2. **Check all boxes** that apply to your project
3. **Be as detailed as possible** - The more detail, the better the result
4. **Leave blank** what you don't know - I'll make smart decisions
5. **Save this file** when done
6. **Tell me you're ready** - Just say "ready" and I'll start building

---

## QUICK START EXAMPLES

Not sure what to write? Here are some example projects:

### Example 1: Event Planning Website
- Pages: Home, Events, About, Contact, Gallery
- Features: Event calendar, booking system, image gallery
- Content Types: Events (with date, location, description, images)
- Style: Modern, colorful, engaging

### Example 2: E-commerce Store
- Pages: Home, Shop, Product Details, Cart, Checkout, About
- Features: Shopping cart, payment processing, user accounts, order tracking
- Content Types: Products (price, images, description, inventory)
- Style: Clean, professional, trustworthy

### Example 3: Blog/Magazine
- Pages: Home, Blog, Categories, About, Contact
- Features: Blog posts, comments, newsletter signup, search
- Content Types: Articles (title, content, author, categories, tags)
- Style: Minimal, readable, elegant

---

**Ready to start? Fill this out and let me know!**
