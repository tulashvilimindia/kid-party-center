/**
 * 🎯 Automatic CMS Data Population Script
 *
 * This script automatically populates:
 * - Site Settings (EN, KA, RU)
 * - Navigation Menu items (7 items × 3 languages)
 * - Social Links (3 links)
 *
 * Usage:
 *   node scripts/populate-cms-data.js
 */

const STRAPI_URL = 'http://localhost:1337';
const STRAPI_API_URL = `${STRAPI_URL}/api`;

// Admin credentials - UPDATE THESE if different
const ADMIN_EMAIL = 'admin@example.com';
const ADMIN_PASSWORD = 'Admin123!';

let authToken = null;

// ========================================
// AUTH: Login to get JWT token
// ========================================
async function login() {
  console.log('🔐 Logging in to Strapi...');

  try {
    const response = await fetch(`${STRAPI_URL}/admin/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: ADMIN_EMAIL,
        password: ADMIN_PASSWORD,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(`Login failed: ${data.error?.message || 'Unknown error'}`);
    }

    authToken = data.data.token;
    console.log('✅ Login successful!\n');
    return authToken;
  } catch (error) {
    console.error('❌ Login failed:', error.message);
    console.log('\n💡 Make sure:');
    console.log('   1. Strapi is running (npm run develop)');
    console.log('   2. Admin credentials are correct in this script');
    console.log('   3. You have created an admin user\n');
    process.exit(1);
  }
}

// ========================================
// HELPER: Make authenticated API request
// ========================================
async function apiRequest(endpoint, method = 'GET', data = null) {
  const options = {
    method,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authToken}`,
    },
  };

  if (data) {
    options.body = JSON.stringify(data);
  }

  const response = await fetch(`${STRAPI_API_URL}${endpoint}`, options);
  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.error?.message || 'API request failed');
  }

  return result;
}

// ========================================
// SITE SETTINGS DATA
// ========================================
const siteSettingsData = {
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
};

// ========================================
// NAVIGATION MENU DATA
// ========================================
const navigationMenuData = [
  {
    path: '/',
    icon: '🏠',
    order: 1,
    isActive: true,
    labels: { en: 'Home', ka: 'მთავარი', ru: 'Главная' }
  },
  {
    path: '/packages',
    icon: '🎁',
    order: 2,
    isActive: true,
    labels: { en: 'Packages', ka: 'პაკეტები', ru: 'Пакеты' }
  },
  {
    path: '/calculator',
    icon: '🧮',
    order: 3,
    isActive: true,
    labels: { en: 'Calculator', ka: 'კალკულატორი', ru: 'Калькулятор' }
  },
  {
    path: '/calendar',
    icon: '📅',
    order: 4,
    isActive: true,
    labels: { en: 'Calendar', ka: 'კალენდარი', ru: 'Календарь' }
  },
  {
    path: '/gallery',
    icon: '📸',
    order: 5,
    isActive: true,
    labels: { en: 'Gallery', ka: 'გალერეა', ru: 'Галерея' }
  },
  {
    path: '/about',
    icon: 'ℹ️',
    order: 6,
    isActive: true,
    labels: { en: 'About', ka: 'ჩვენს შესახებ', ru: 'О нас' }
  },
  {
    path: '/contact',
    icon: '📞',
    order: 7,
    isActive: true,
    labels: { en: 'Contact', ka: 'კონტაქტი', ru: 'Контакты' }
  }
];

// ========================================
// SOCIAL LINKS DATA
// ========================================
const socialLinksData = [
  {
    platform: 'facebook',
    url: 'https://facebook.com/kidparty',
    icon: '📘',
    order: 1,
    isActive: true
  },
  {
    platform: 'instagram',
    url: 'https://instagram.com/kidparty',
    icon: '📷',
    order: 2,
    isActive: true
  },
  {
    platform: 'tiktok',
    url: 'https://tiktok.com/@kidparty',
    icon: '🎵',
    order: 3,
    isActive: true
  }
];

// ========================================
// POPULATE SITE SETTINGS
// ========================================
async function populateSiteSettings() {
  console.log('📝 Populating Site Settings...');

  try {
    // Create/Update English (default)
    console.log('   → Creating English (en) version...');
    await apiRequest('/site-setting?locale=en', 'PUT', {
      data: siteSettingsData.en
    });
    console.log('   ✅ English version created');

    // Create Georgian localization
    console.log('   → Creating Georgian (ka) version...');
    await apiRequest('/site-setting/localizations', 'POST', {
      locale: 'ka',
      ...siteSettingsData.ka
    });
    console.log('   ✅ Georgian version created');

    // Create Russian localization
    console.log('   → Creating Russian (ru) version...');
    await apiRequest('/site-setting/localizations', 'POST', {
      locale: 'ru',
      ...siteSettingsData.ru
    });
    console.log('   ✅ Russian version created');

    console.log('✅ Site Settings populated successfully!\n');
  } catch (error) {
    console.error('❌ Error populating Site Settings:', error.message);
  }
}

// ========================================
// POPULATE NAVIGATION MENU
// ========================================
async function populateNavigationMenu() {
  console.log('📋 Populating Navigation Menu...');

  try {
    for (const item of navigationMenuData) {
      console.log(`   → Creating "${item.labels.en}"...`);

      // Create English version
      const created = await apiRequest('/navigation-menus?locale=en', 'POST', {
        data: {
          label: item.labels.en,
          path: item.path,
          icon: item.icon,
          order: item.order,
          isActive: item.isActive
        }
      });

      const itemId = created.data.id;

      // Add Georgian localization
      await apiRequest(`/navigation-menus/${itemId}/localizations`, 'POST', {
        locale: 'ka',
        label: item.labels.ka
      });

      // Add Russian localization
      await apiRequest(`/navigation-menus/${itemId}/localizations`, 'POST', {
        locale: 'ru',
        label: item.labels.ru
      });

      console.log(`   ✅ "${item.labels.en}" created in all 3 languages`);
    }

    console.log('✅ Navigation Menu populated successfully!\n');
  } catch (error) {
    console.error('❌ Error populating Navigation Menu:', error.message);
  }
}

// ========================================
// POPULATE SOCIAL LINKS
// ========================================
async function populateSocialLinks() {
  console.log('🔗 Populating Social Links...');

  try {
    for (const link of socialLinksData) {
      console.log(`   → Creating ${link.platform}...`);

      await apiRequest('/social-links', 'POST', {
        data: link
      });

      console.log(`   ✅ ${link.platform} created`);
    }

    console.log('✅ Social Links populated successfully!\n');
  } catch (error) {
    console.error('❌ Error populating Social Links:', error.message);
  }
}

// ========================================
// MAIN FUNCTION
// ========================================
async function main() {
  console.log('\n');
  console.log('═══════════════════════════════════════════════════════');
  console.log('  🎉 KidParty CMS Data Population Script 🎈');
  console.log('═══════════════════════════════════════════════════════');
  console.log('\n');

  try {
    // Step 1: Login
    await login();

    // Step 2: Populate Site Settings
    await populateSiteSettings();

    // Step 3: Populate Navigation Menu
    await populateNavigationMenu();

    // Step 4: Populate Social Links
    await populateSocialLinks();

    console.log('═══════════════════════════════════════════════════════');
    console.log('  ✅ ALL DATA POPULATED SUCCESSFULLY! 🎊');
    console.log('═══════════════════════════════════════════════════════');
    console.log('\n');
    console.log('🎯 Next Steps:');
    console.log('   1. Open http://localhost:3000');
    console.log('   2. Switch languages (EN, KA, RU)');
    console.log('   3. Enjoy your multilingual CMS!');
    console.log('\n');

  } catch (error) {
    console.error('\n❌ Script failed:', error.message);
    process.exit(1);
  }
}

// Run the script
main();
