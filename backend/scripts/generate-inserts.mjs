/**
 * 🎨 Smart INSERT Generator (ES Module)
 *
 * This script:
 * 1. Reads the database analysis file
 * 2. Detects your column naming convention
 * 3. Generates perfect INSERT statements
 * 4. Saves to SQL file
 *
 * Usage:
 *   node scripts/generate-inserts.mjs
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const ANALYSIS_FILE = path.join(__dirname, 'db-structure-analysis.txt');
const OUTPUT_FILE = path.join(__dirname, '3-generated-inserts.sql');

console.log('\n');
console.log('═══════════════════════════════════════════════════════');
console.log('  🎯 Smart INSERT Generator');
console.log('═══════════════════════════════════════════════════════\n');

// Check if analysis file exists
if (!fs.existsSync(ANALYSIS_FILE)) {
  console.error('❌ Analysis file not found!');
  console.log('\n💡 Please run "node scripts/analyze-db.mjs" first.\n');
  process.exit(1);
}

console.log('📖 Reading analysis file...\n');

// Parse analysis file to get column names and max IDs
const analysis = fs.readFileSync(ANALYSIS_FILE, 'utf8');

function extractColumns(tableName) {
  const regex = new RegExp(`${tableName} Structure[\\s\\S]*?column_name[\\s\\S]*?-+\\n([\\s\\S]*?)\\n\\n`, 'i');
  const match = analysis.match(regex);
  if (!match) return [];

  const lines = match[1].trim().split('\n');
  return lines.map(line => {
    const cols = line.split('|').map(s => s.trim());
    return cols[0]; // column_name is first
  }).filter(name => name && name !== 'id'); // Exclude ID, we'll add it separately
}

function extractMaxId(tableName) {
  const regex = new RegExp(`${tableName}[\\s|]+\\d+`, 'i');
  const match = analysis.match(regex);
  if (!match) return 0;

  const parts = match[0].split(/\s+/);
  return parseInt(parts[parts.length - 1]) || 0;
}

const siteSettingsCols = extractColumns('Site Settings');
const navigationMenusCols = extractColumns('Navigation Menus');
const socialLinksCols = extractColumns('Social Links');

const maxIds = {
  site_settings: extractMaxId('site_settings'),
  navigation_menus: extractMaxId('navigation_menus'),
  social_links: extractMaxId('social_links')
};

console.log(`   ✅ Site Settings: ${siteSettingsCols.length} columns, max ID: ${maxIds.site_settings}`);
console.log(`   ✅ Navigation Menus: ${navigationMenusCols.length} columns, max ID: ${maxIds.navigation_menus}`);
console.log(`   ✅ Social Links: ${socialLinksCols.length} columns, max ID: ${maxIds.social_links}\n`);

// Helper: Convert camelCase to snake_case
function toSnakeCase(str) {
  return str.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
}

// Helper: Find column name (try both camelCase and snake_case)
function findColumn(columns, name) {
  const camelCase = name;
  const snakeCase = toSnakeCase(name);

  if (columns.includes(camelCase)) return camelCase;
  if (columns.includes(snakeCase)) return snakeCase;

  return null;
}

// Data to insert
const DATA = {
  siteSettings: {
    en: {
      heroTitle: "Unforgettable Kids Parties in Batumi!",
      heroSubtitle: "Fun, safe, magical experiences for children aged 3-12.",
      introText: "Welcome to KidParty! We create magical birthday experiences for children in Batumi.",
      phone: "+995 555 123456",
      email: "info@kidparty.ge",
      address: "Batumi, Georgia",
      facebookUrl: "https://facebook.com/kidparty",
      instagramUrl: "https://instagram.com/kidparty",
      featureVenueTitle: "Amazing Venue",
      featureVenueDescription: "Spacious, colorful party rooms with all amenities",
      featureActivitiesTitle: "Fun Activities",
      featureActivitiesDescription: "Exciting games, entertainment, and activities for all ages",
      featureFoodTitle: "Delicious Food",
      featureFoodDescription: "Healthy, kid-friendly menu options and treats",
      featureStressFreeTitle: "Stress-Free Planning",
      featureStressFreeDescription: "We handle everything so you can enjoy the celebration",
      packagesTitle: "Party Packages",
      packagesSubtitle: "Choose the perfect package for your child's special day",
      ctaTitle: "Ready to Book Your Party?",
      ctaSubtitle: "Don't wait! Reserve your date today and make memories!",
      footerAboutTitle: "About KidParty",
      footerAboutText: "We are Batumi's premier children's party venue, dedicated to creating unforgettable birthday celebrations.",
      footerTagline: "Making birthdays magical since 2024"
    },
    ka: {
      heroTitle: "დაუვიწყარი ბავშვების წვეულებები ბათუმში!",
      heroSubtitle: "სახალისო, უსაფრთხო და ჯადოსნური გამოცდილება 3-12 წლის ბავშვებისთვის.",
      introText: "მოგესალმებით KidParty-ში! ჩვენ ვქმნით ჯადოსნურ დაბადების დღეების გამოცდილებას ბავშვებისთვის ბათუმში.",
      phone: "+995 555 123456",
      email: "info@kidparty.ge",
      address: "ბათუმი, საქართველო",
      facebookUrl: "https://facebook.com/kidparty",
      instagramUrl: "https://instagram.com/kidparty",
      featureVenueTitle: "შესანიშნავი ადგილი",
      featureVenueDescription: "ფართო, ფერადი წვეულების ოთახები ყველა საჭირო პირობით",
      featureActivitiesTitle: "სახალისო აქტივობები",
      featureActivitiesDescription: "საინტერესო თამაშები, გართობა და აქტივობები ყველა ასაკისთვის",
      featureFoodTitle: "გემრიელი საკვები",
      featureFoodDescription: "ჯანსაღი, ბავშვებისთვის შესაფერისი მენიუ და ტკბილეულები",
      featureStressFreeTitle: "სტრესის გარეშე დაგეგმვა",
      featureStressFreeDescription: "ჩვენ ყველაფერს ვაკეთებთ, რომ თქვენ დღესასწაულით ისიამოვნოთ",
      packagesTitle: "წვეულების პაკეტები",
      packagesSubtitle: "აირჩიეთ სრულყოფილი პაკეტი თქვენი ბავშვის განსაკუთრებული დღისთვის",
      ctaTitle: "მზად ხართ წვეულების დასაჯავშნად?",
      ctaSubtitle: "არ დაელოდოთ! დაჯავშნეთ თქვენი თარიღი დღესვე და შექმენით მოგონებები!",
      footerAboutTitle: "KidParty-ს შესახებ",
      footerAboutText: "ჩვენ ვართ ბათუმის წამყვანი ბავშვების წვეულების ადგილი, რომელიც ეძღვნება დაუვიწყარი დაბადების დღეების შექმნას.",
      footerTagline: "ვქმნით ჯადოსნურ დაბადების დღეებს 2024 წლიდან"
    },
    ru: {
      heroTitle: "Незабываемые детские праздники в Батуми!",
      heroSubtitle: "Веселые, безопасные и волшебные впечатления для детей 3-12 лет.",
      introText: "Добро пожаловать в KidParty! Мы создаем волшебные впечатления для детских дней рождения в Батуми.",
      phone: "+995 555 123456",
      email: "info@kidparty.ge",
      address: "Батуми, Грузия",
      facebookUrl: "https://facebook.com/kidparty",
      instagramUrl: "https://instagram.com/kidparty",
      featureVenueTitle: "Отличное место",
      featureVenueDescription: "Просторные, красочные залы со всеми удобствами",
      featureActivitiesTitle: "Веселые мероприятия",
      featureActivitiesDescription: "Увлекательные игры, развлечения и активности для всех возрастов",
      featureFoodTitle: "Вкусная еда",
      featureFoodDescription: "Здоровое, детское меню и лакомства",
      featureStressFreeTitle: "Планирование без стресса",
      featureStressFreeDescription: "Мы позаботимся обо всем, чтобы вы могли наслаждаться праздником",
      packagesTitle: "Пакеты праздников",
      packagesSubtitle: "Выберите идеальный пакет для особого дня вашего ребенка",
      ctaTitle: "Готовы забронировать праздник?",
      ctaSubtitle: "Не ждите! Забронируйте дату сегодня и создайте воспоминания!",
      footerAboutTitle: "О KidParty",
      footerAboutText: "Мы - ведущая площадка для детских праздников в Батуми, посвященная созданию незабываемых дней рождения.",
      footerTagline: "Делаем дни рождения волшебными с 2024 года"
    }
  },

  navigationMenus: [
    { path: '/', icon: '🏠', order: 1, labels: { en: 'Home', ka: 'მთავარი', ru: 'Главная' }},
    { path: '/packages', icon: '🎁', order: 2, labels: { en: 'Packages', ka: 'პაკეტები', ru: 'Пакеты' }},
    { path: '/calculator', icon: '🧮', order: 3, labels: { en: 'Calculator', ka: 'კალკულატორი', ru: 'Калькулятор' }},
    { path: '/calendar', icon: '📅', order: 4, labels: { en: 'Calendar', ka: 'კალენდარი', ru: 'Календарь' }},
    { path: '/gallery', icon: '📷', order: 5, labels: { en: 'Gallery', ka: 'გალერეა', ru: 'Галерея' }},
    { path: '/about', icon: 'ℹ️', order: 6, labels: { en: 'About', ka: 'ჩვენს შესახებ', ru: 'О нас' }},
    { path: '/contact', icon: '📞', order: 7, labels: { en: 'Contact', ka: 'კონტაქტი', ru: 'Контакты' }}
  ],

  socialLinks: [
    { platform: 'facebook', url: 'https://facebook.com/kidparty', icon: '📘', order: 1 },
    { platform: 'instagram', url: 'https://instagram.com/kidparty', icon: '📷', order: 2 },
    { platform: 'tiktok', url: 'https://tiktok.com/@kidparty', icon: '🎵', order: 3 }
  ]
};

// Generate SQL
console.log('🎨 Generating SQL statements...\n');

let sql = '-- Auto-generated INSERT statements\n';
sql += `-- Generated: ${new Date().toISOString()}\n`;
sql += '-- DO NOT EDIT MANUALLY\n\n';

sql += 'BEGIN TRANSACTION;\n\n';

// Helper: Escape single quotes in strings
function escape(str) {
  if (str === null || str === undefined) return 'NULL';
  return `'${String(str).replace(/'/g, "''")}'`;
}

// Helper: Get current timestamp
const now = new Date().toISOString();

// Generate Site Settings INSERTs
sql += '-- =====================================================\n';
sql += '-- Site Settings (3 locales)\n';
sql += '-- =====================================================\n\n';

const locales = ['en', 'ka', 'ru'];
const siteSettingsIds = {};

// Use same document_id for all locales (Strapi 5 requirement)
const siteSettingsDocId = `site_setting_${Date.now()}`;

locales.forEach((locale, index) => {
  const id = maxIds.site_settings + index + 1;
  siteSettingsIds[locale] = id;
  const data = DATA.siteSettings[locale];

  sql += `-- Site Settings: ${locale.toUpperCase()}\n`;
  sql += `INSERT INTO site_settings (id, document_id, locale, created_at, updated_at, published_at`;

  // Add all columns
  Object.keys(data).forEach(key => {
    const col = findColumn(siteSettingsCols, key);
    if (col) sql += `, ${col}`;
  });

  sql += `) VALUES (\n`;
  sql += `  ${id}, ${escape(siteSettingsDocId)}, ${escape(locale)}, ${escape(now)}, ${escape(now)}, ${escape(now)}`;

  // Add values
  Object.keys(data).forEach(key => {
    const col = findColumn(siteSettingsCols, key);
    if (col) sql += `,\n  ${escape(data[key])}`;
  });

  sql += '\n);\n\n';
});

// NOTE: Strapi 5 doesn't use _localizations_lnk tables
// It uses document_id to link locales automatically
// No need to insert localization links manually

// Generate Navigation Menus INSERTs
sql += '-- =====================================================\n';
sql += '-- Navigation Menus (7 items × 3 locales = 21 entries)\n';
sql += '-- =====================================================\n\n';

const navMenuIds = {};

DATA.navigationMenus.forEach((item, itemIndex) => {
  // Each menu item gets same document_id across locales
  const menuDocId = `nav_menu_${itemIndex}_${Date.now()}`;

  locales.forEach((locale, localeIndex) => {
    const id = maxIds.navigation_menus + itemIndex * 3 + localeIndex + 1;
    navMenuIds[`${itemIndex}_${locale}`] = id;

    const labelCol = findColumn(navigationMenusCols, 'label');
    const pathCol = findColumn(navigationMenusCols, 'path');
    const iconCol = findColumn(navigationMenusCols, 'icon');
    const orderCol = '"order"'; // Always quote - it's a reserved word
    const isActiveCol = findColumn(navigationMenusCols, 'isActive') || findColumn(navigationMenusCols, 'is_active');

    sql += `INSERT INTO navigation_menus (id, document_id, ${labelCol}, ${pathCol}, ${iconCol}, ${orderCol}, ${isActiveCol}, locale, created_at, updated_at, published_at) VALUES (\n`;
    sql += `  ${id}, ${escape(menuDocId)}, ${escape(item.labels[locale])}, ${escape(item.path)}, ${escape(item.icon)}, ${item.order}, 1, ${escape(locale)}, ${escape(now)}, ${escape(now)}, ${escape(now)}\n`;
    sql += ');\n';
  });
  sql += '\n';
});

// NOTE: Strapi 5 doesn't use _localizations_lnk tables
// Locales are linked via document_id automatically

// Generate Social Links INSERTs
sql += '-- =====================================================\n';
sql += '-- Social Links (3 entries)\n';
sql += '-- =====================================================\n\n';

DATA.socialLinks.forEach((link, index) => {
  const id = maxIds.social_links + index + 1;
  const socialDocId = `social_link_${index}_${Date.now()}`;

  const platformCol = findColumn(socialLinksCols, 'platform');
  const urlCol = findColumn(socialLinksCols, 'url');
  const iconCol = findColumn(socialLinksCols, 'icon');
  const orderCol = '"order"'; // Always quote - it's a reserved word
  const isActiveCol = findColumn(socialLinksCols, 'isActive') || findColumn(socialLinksCols, 'is_active');

  sql += `INSERT INTO social_links (id, document_id, ${platformCol}, ${urlCol}, ${iconCol}, ${orderCol}, ${isActiveCol}, created_at, updated_at, published_at) VALUES (\n`;
  sql += `  ${id}, ${escape(socialDocId)}, ${escape(link.platform)}, ${escape(link.url)}, ${escape(link.icon)}, ${link.order}, 1, ${escape(now)}, ${escape(now)}, ${escape(now)}\n`;
  sql += ');\n';
});

sql += '\nCOMMIT;\n';

// Save to file
fs.writeFileSync(OUTPUT_FILE, sql, 'utf8');

console.log('═══════════════════════════════════════════════════════');
console.log('  ✅ SQL GENERATED SUCCESSFULLY!');
console.log('═══════════════════════════════════════════════════════\n');
console.log(`📄 Output file: ${OUTPUT_FILE}\n`);
console.log('🎯 Next steps:');
console.log('   Option 1: Run auto-populate.mjs (executes SQL automatically)');
console.log('   Option 2: Run the SQL file in your SQLite client\n');
