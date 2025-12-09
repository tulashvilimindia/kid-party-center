/**
 * 🎯 Smart INSERT Generator
 *
 * This script:
 * 1. Reads the database structure analysis
 * 2. Generates perfect INSERT statements that match YOUR schema
 * 3. Creates a ready-to-run SQL file
 *
 * Usage:
 *   node scripts/generate-inserts.js
 */

const fs = require('fs');
const path = require('path');

const ANALYSIS_FILE = path.join(__dirname, 'db-structure-analysis.txt');
const OUTPUT_FILE = path.join(__dirname, '3-generated-inserts.sql');

// Data to insert
const DATA = {
  siteSettings: {
    en: {
      heroTitle: "Unforgettable Kids Parties in Batumi!",
      heroSubtitle: "Fun, safe, magical experiences for children.",
      featureVenueTitle: "Amazing Venue",
      featureVenueDescription: "Safe, clean, and fun-filled party spaces designed for kids",
      featureActivitiesTitle: "Fun Activities",
      featureActivitiesDescription: "Face painting, games, entertainment, and so much more",
      featureFoodTitle: "Delicious Food",
      featureFoodDescription: "Kid-friendly menu options that everyone will love",
      featureStressFreeTitle: "Stress-Free",
      featureStressFreeDescription: "We handle everything - you just enjoy the celebration",
      packagesTitle: "Our Party Packages",
      packagesSubtitle: "Choose the perfect package for your child's special day",
      ctaTitle: "Ready to Create Magical Memories?",
      ctaSubtitle: "Book your party today and give your child an unforgettable celebration!",
      footerTagline: "🌟 Unforgettable Kids Parties in Batumi! 🌟",
      phone: "+995 577 123 456",
      email: "info@kidparty.ge",
      address: "Batumi, Georgia",
      facebookUrl: "https://facebook.com/kidparty",
      instagramUrl: "https://instagram.com/kidparty"
    },
    ka: {
      heroTitle: "დაუვიწყარი ბავშვების წვეულებები ბათუმში!",
      heroSubtitle: "სახალისო, უსაფრთხო და მაგიური გამოცდილება ბავშვებისთვის.",
      featureVenueTitle: "შესანიშნავი ადგილი",
      featureVenueDescription: "უსაფრთხო, სუფთა და სახალისო სივრცე ბავშვებისთვის",
      featureActivitiesTitle: "სახალისო აქტივობები",
      featureActivitiesDescription: "სახის გაფერადება, თამაშები, გართობა და ბევრი სხვა",
      featureFoodTitle: "გემრიელი საჭმელი",
      featureFoodDescription: "ბავშვებისთვის შესაფერისი მენიუ, რომელიც ყველას მოეწონება",
      featureStressFreeTitle: "სტრესის გარეშე",
      featureStressFreeDescription: "ჩვენ ყველაფერს ვაკეთებთ - თქვენ კი უბრალოდ ისიამოვნეთ ზეიმით",
      packagesTitle: "ჩვენი პაკეტები",
      packagesSubtitle: "აირჩიეთ სრულყოფილი პაკეტი თქვენი შვილის განსაკუთრებული დღისთვის",
      ctaTitle: "მზად ხარ შექმნა მაგიური მოგონებებისთვის?",
      ctaSubtitle: "დაჯავშენი წვეულება დღეს და მიანიჭე შენს შვილს დაუვიწყარი ზეიმი!",
      footerTagline: "🌟 დაუვიწყარი ბავშვების წვეულებები ბათუმში! 🌟",
      address: "ბათუმი, საქართველო"
    },
    ru: {
      heroTitle: "Незабываемые детские праздники в Батуми!",
      heroSubtitle: "Веселые, безопасные и волшебные праздники для детей.",
      featureVenueTitle: "Отличное место",
      featureVenueDescription: "Безопасное, чистое и веселое пространство для детей",
      featureActivitiesTitle: "Веселые занятия",
      featureActivitiesDescription: "Аквагрим, игры, развлечения и многое другое",
      featureFoodTitle: "Вкусная еда",
      featureFoodDescription: "Детское меню, которое понравится всем",
      featureStressFreeTitle: "Без стресса",
      featureStressFreeDescription: "Мы позаботимся обо всем - вы просто наслаждайтесь праздником",
      packagesTitle: "Наши пакеты",
      packagesSubtitle: "Выберите идеальный пакет для особенного дня вашего ребенка",
      ctaTitle: "Готовы создать волшебные воспоминания?",
      ctaSubtitle: "Забронируйте вечеринку сегодня и подарите вашему ребенку незабываемый праздник!",
      footerTagline: "🌟 Незабываемые детские праздники в Батуми! 🌟",
      address: "Батуми, Грузия"
    }
  },

  navigationMenus: [
    { path: '/', icon: '🏠', order: 1, labels: { en: 'Home', ka: 'მთავარი', ru: 'Главная' }},
    { path: '/packages', icon: '🎁', order: 2, labels: { en: 'Packages', ka: 'პაკეტები', ru: 'Пакеты' }},
    { path: '/calculator', icon: '🧮', order: 3, labels: { en: 'Calculator', ka: 'კალკულატორი', ru: 'Калькулятор' }},
    { path: '/calendar', icon: '📅', order: 4, labels: { en: 'Calendar', ka: 'კალენდარი', ru: 'Календарь' }},
    { path: '/gallery', icon: '📸', order: 5, labels: { en: 'Gallery', ka: 'გალერეა', ru: 'Галерея' }},
    { path: '/about', icon: 'ℹ️', order: 6, labels: { en: 'About', ka: 'ჩვენს შესახებ', ru: 'О нас' }},
    { path: '/contact', icon: '📞', order: 7, labels: { en: 'Contact', ka: 'კონტაქტი', ru: 'Контакты' }}
  ],

  socialLinks: [
    { platform: 'facebook', url: 'https://facebook.com/kidparty', icon: '📘', order: 1 },
    { platform: 'instagram', url: 'https://instagram.com/kidparty', icon: '📷', order: 2 },
    { platform: 'tiktok', url: 'https://tiktok.com/@kidparty', icon: '🎵', order: 3 }
  ]
};

// Parse analysis file
function parseAnalysis() {
  console.log('\n📖 Reading analysis file...');

  if (!fs.existsSync(ANALYSIS_FILE)) {
    console.error(`\n❌ Analysis file not found: ${ANALYSIS_FILE}`);
    console.log('\n💡 Please run "node scripts/analyze-db.js" first!\n');
    process.exit(1);
  }

  const content = fs.readFileSync(ANALYSIS_FILE, 'utf8');

  const structure = {
    siteSettings: { columns: [], maxId: 0 },
    navigationMenus: { columns: [], maxId: 0 },
    socialLinks: { columns: [], maxId: 0 },
    siteSettingsLocalizationsLnk: { columns: [] },
    navigationMenusLocalizationsLnk: { columns: [] }
  };

  // Extract column names from Site Settings Structure
  const siteSettingsMatch = content.match(/Site Settings Structure\n─+\n([\s\S]*?)(?=\n─+|$)/);
  if (siteSettingsMatch) {
    const lines = siteSettingsMatch[1].trim().split('\n');
    lines.slice(1).forEach(line => {
      const cols = line.split('|').map(s => s.trim());
      if (cols[0] && cols[0] !== 'column_name') {
        structure.siteSettings.columns.push(cols[0]);
      }
    });
  }

  // Extract column names from Navigation Menus Structure
  const navMenusMatch = content.match(/Navigation Menus Structure\n─+\n([\s\S]*?)(?=\n─+|$)/);
  if (navMenusMatch) {
    const lines = navMenusMatch[1].trim().split('\n');
    lines.slice(1).forEach(line => {
      const cols = line.split('|').map(s => s.trim());
      if (cols[0] && cols[0] !== 'column_name') {
        structure.navigationMenus.columns.push(cols[0]);
      }
    });
  }

  // Extract column names from Social Links Structure
  const socialLinksMatch = content.match(/Social Links Structure\n─+\n([\s\S]*?)(?=\n─+|$)/);
  if (socialLinksMatch) {
    const lines = socialLinksMatch[1].trim().split('\n');
    lines.slice(1).forEach(line => {
      const cols = line.split('|').map(s => s.trim());
      if (cols[0] && cols[0] !== 'column_name') {
        structure.socialLinks.columns.push(cols[0]);
      }
    });
  }

  // Extract max IDs
  const maxIdsMatch = content.match(/Max IDs.*?\n─+\n([\s\S]*?)(?=\n─+|$)/);
  if (maxIdsMatch) {
    const lines = maxIdsMatch[1].trim().split('\n');
    lines.slice(1).forEach(line => {
      const cols = line.split('|').map(s => s.trim());
      if (cols[0] === 'site_settings') structure.siteSettings.maxId = parseInt(cols[1]) || 0;
      if (cols[0] === 'navigation_menus') structure.navigationMenus.maxId = parseInt(cols[1]) || 0;
      if (cols[0] === 'social_links') structure.socialLinks.maxId = parseInt(cols[1]) || 0;
    });
  }

  console.log(`   ✅ Site Settings: ${structure.siteSettings.columns.length} columns, max ID: ${structure.siteSettings.maxId}`);
  console.log(`   ✅ Navigation Menus: ${structure.navigationMenus.columns.length} columns, max ID: ${structure.navigationMenus.maxId}`);
  console.log(`   ✅ Social Links: ${structure.socialLinks.columns.length} columns, max ID: ${structure.socialLinks.maxId}`);

  return structure;
}

// Convert camelCase to snake_case
function toSnakeCase(str) {
  return str.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
}

// Find column name (try both camelCase and snake_case)
function findColumn(columns, name) {
  const camelCase = name;
  const snakeCase = toSnakeCase(name);

  if (columns.includes(camelCase)) return camelCase;
  if (columns.includes(snakeCase)) return snakeCase;

  return null;
}

// Generate INSERT statement for site settings
function generateSiteSettingsInsert(structure, locale, data, id) {
  const cols = structure.siteSettings.columns;
  const values = [];
  const columnNames = [];

  // Map data fields to actual column names
  const fieldMapping = {
    heroTitle: findColumn(cols, 'heroTitle'),
    heroSubtitle: findColumn(cols, 'heroSubtitle'),
    featureVenueTitle: findColumn(cols, 'featureVenueTitle'),
    featureVenueDescription: findColumn(cols, 'featureVenueDescription'),
    featureActivitiesTitle: findColumn(cols, 'featureActivitiesTitle'),
    featureActivitiesDescription: findColumn(cols, 'featureActivitiesDescription'),
    featureFoodTitle: findColumn(cols, 'featureFoodTitle'),
    featureFoodDescription: findColumn(cols, 'featureFoodDescription'),
    featureStressFreeTitle: findColumn(cols, 'featureStressFreeTitle'),
    featureStressFreeDescription: findColumn(cols, 'featureStressFreeDescription'),
    packagesTitle: findColumn(cols, 'packagesTitle'),
    packagesSubtitle: findColumn(cols, 'packagesSubtitle'),
    ctaTitle: findColumn(cols, 'ctaTitle'),
    ctaSubtitle: findColumn(cols, 'ctaSubtitle'),
    footerTagline: findColumn(cols, 'footerTagline'),
    phone: findColumn(cols, 'phone'),
    email: findColumn(cols, 'email'),
    address: findColumn(cols, 'address'),
    facebookUrl: findColumn(cols, 'facebookUrl'),
    instagramUrl: findColumn(cols, 'instagramUrl')
  };

  // Build INSERT
  if (findColumn(cols, 'id')) {
    columnNames.push(findColumn(cols, 'id'));
    values.push(id);
  }

  Object.keys(fieldMapping).forEach(field => {
    const colName = fieldMapping[field];
    if (colName && data[field] !== undefined) {
      columnNames.push(colName);
      values.push(`'${data[field].replace(/'/g, "''")}'`);
    }
  });

  // Add locale
  const localeCol = findColumn(cols, 'locale');
  if (localeCol) {
    columnNames.push(localeCol);
    values.push(`'${locale}'`);
  }

  // Add timestamps
  const createdAtCol = findColumn(cols, 'createdAt');
  if (createdAtCol) {
    columnNames.push(createdAtCol);
    values.push("datetime('now')");
  }

  const updatedAtCol = findColumn(cols, 'updatedAt');
  if (updatedAtCol) {
    columnNames.push(updatedAtCol);
    values.push("datetime('now')");
  }

  const publishedAtCol = findColumn(cols, 'publishedAt');
  if (publishedAtCol) {
    columnNames.push(publishedAtCol);
    values.push("datetime('now')");
  }

  return `INSERT INTO site_settings (\n  ${columnNames.join(',\n  ')}\n) VALUES (\n  ${values.join(',\n  ')}\n);\n`;
}

// Generate INSERT statement for navigation menu
function generateNavMenuInsert(structure, locale, item, id) {
  const cols = structure.navigationMenus.columns;
  const values = [];
  const columnNames = [];

  // Build INSERT
  if (findColumn(cols, 'id')) {
    columnNames.push(findColumn(cols, 'id'));
    values.push(id);
  }

  const labelCol = findColumn(cols, 'label');
  if (labelCol) {
    columnNames.push(labelCol);
    values.push(`'${item.labels[locale]}'`);
  }

  const pathCol = findColumn(cols, 'path');
  if (pathCol) {
    columnNames.push(pathCol);
    values.push(`'${item.path}'`);
  }

  const iconCol = findColumn(cols, 'icon');
  if (iconCol) {
    columnNames.push(iconCol);
    values.push(`'${item.icon}'`);
  }

  const orderCol = findColumn(cols, 'order') || '"order"';
  if (orderCol) {
    columnNames.push(orderCol);
    values.push(item.order);
  }

  const isActiveCol = findColumn(cols, 'isActive');
  if (isActiveCol) {
    columnNames.push(isActiveCol);
    values.push('1');
  }

  const localeCol = findColumn(cols, 'locale');
  if (localeCol) {
    columnNames.push(localeCol);
    values.push(`'${locale}'`);
  }

  // Add timestamps
  const createdAtCol = findColumn(cols, 'createdAt');
  if (createdAtCol) {
    columnNames.push(createdAtCol);
    values.push("datetime('now')");
  }

  const updatedAtCol = findColumn(cols, 'updatedAt');
  if (updatedAtCol) {
    columnNames.push(updatedAtCol);
    values.push("datetime('now')");
  }

  const publishedAtCol = findColumn(cols, 'publishedAt');
  if (publishedAtCol) {
    columnNames.push(publishedAtCol);
    values.push("datetime('now')");
  }

  return `INSERT INTO navigation_menus (\n  ${columnNames.join(',\n  ')}\n) VALUES (\n  ${values.join(',\n  ')}\n);\n`;
}

// Main generator
function generateInserts() {
  console.log('\n═══════════════════════════════════════════════════════');
  console.log('  🎯 Smart INSERT Generator');
  console.log('═══════════════════════════════════════════════════════\n');

  const structure = parseAnalysis();

  console.log('\n🎨 Generating SQL statements...\n');

  let sql = '';
  sql += '-- ═══════════════════════════════════════════════════════\n';
  sql += '-- 🎯 AUTO-GENERATED INSERT STATEMENTS\n';
  sql += '-- Generated based on YOUR database schema\n';
  sql += `-- Date: ${new Date().toISOString()}\n`;
  sql += '-- ═══════════════════════════════════════════════════════\n\n';

  sql += '-- Start transaction for safety\n';
  sql += 'BEGIN TRANSACTION;\n\n';

  // Site Settings
  sql += '-- ═══════════════════════════════════════════════════════\n';
  sql += '-- SITE SETTINGS (3 languages)\n';
  sql += '-- ═══════════════════════════════════════════════════════\n\n';

  let idCounter = structure.siteSettings.maxId + 1;
  const siteSettingsIds = {};

  ['en', 'ka', 'ru'].forEach(locale => {
    sql += `-- ${locale.toUpperCase()}\n`;
    sql += generateSiteSettingsInsert(structure, locale, DATA.siteSettings[locale], idCounter);
    siteSettingsIds[locale] = idCounter;
    idCounter++;
    sql += '\n';
  });

  // Navigation Menus
  sql += '-- ═══════════════════════════════════════════════════════\n';
  sql += '-- NAVIGATION MENUS (7 items × 3 languages = 21 entries)\n';
  sql += '-- ═══════════════════════════════════════════════════════\n\n';

  idCounter = structure.navigationMenus.maxId + 1;
  const navMenuIds = [];

  DATA.navigationMenus.forEach((item, index) => {
    sql += `-- ${item.labels.en}\n`;
    const itemIds = {};
    ['en', 'ka', 'ru'].forEach(locale => {
      sql += generateNavMenuInsert(structure, locale, item, idCounter);
      itemIds[locale] = idCounter;
      idCounter++;
    });
    navMenuIds.push(itemIds);
    sql += '\n';
  });

  // Social Links
  sql += '-- ═══════════════════════════════════════════════════════\n';
  sql += '-- SOCIAL LINKS (3 entries)\n';
  sql += '-- ═══════════════════════════════════════════════════════\n\n';

  idCounter = structure.socialLinks.maxId + 1;

  DATA.socialLinks.forEach(link => {
    sql += `-- ${link.platform}\n`;
    sql += `INSERT INTO social_links (id, platform, url, icon, "order", is_active, locale, created_at, updated_at, published_at) VALUES (\n`;
    sql += `  ${idCounter}, '${link.platform}', '${link.url}', '${link.icon}', ${link.order}, 1, 'en', datetime('now'), datetime('now'), datetime('now')\n`;
    sql += ');\n\n';
    idCounter++;
  });

  sql += '-- Commit transaction\n';
  sql += 'COMMIT;\n\n';

  sql += '-- ═══════════════════════════════════════════════════════\n';
  sql += '-- ✅ DONE!\n';
  sql += '-- ═══════════════════════════════════════════════════════\n';

  // Save to file
  fs.writeFileSync(OUTPUT_FILE, sql, 'utf8');

  console.log('═══════════════════════════════════════════════════════');
  console.log('  ✅ SQL GENERATED SUCCESSFULLY!');
  console.log('═══════════════════════════════════════════════════════\n');
  console.log(`📄 Output file: ${OUTPUT_FILE}\n`);
  console.log('🎯 Next steps:');
  console.log('   1. Open the generated SQL file');
  console.log('   2. Run it in your SQLite client');
  console.log('   3. Restart Strapi backend');
  console.log('   4. Test your multilingual site!\n');
}

// Run
generateInserts();
