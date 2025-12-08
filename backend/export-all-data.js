const Database = require('better-sqlite3');
const path = require('path');
const fs = require('fs');

const dbPath = path.join(__dirname, '.tmp', 'data.db');
const db = new Database(dbPath);

console.log('📊 Exporting all data from database...\n');

const exportData = {
  timestamp: new Date().toISOString(),
  tables: {}
};

try {
  // ========================================
  // EXPORT PACKAGES
  // ========================================
  console.log('📦 Exporting packages...');
  const packages = db.prepare(`
    SELECT * FROM packages ORDER BY id
  `).all();
  exportData.tables.packages = packages;
  console.log(`   Exported ${packages.length} packages`);

  // ========================================
  // EXPORT MENU ITEMS
  // ========================================
  console.log('🍔 Exporting menu items...');
  const menuItems = db.prepare(`
    SELECT * FROM menu_items ORDER BY id
  `).all();
  exportData.tables.menu_items = menuItems;
  console.log(`   Exported ${menuItems.length} menu items`);

  // ========================================
  // EXPORT PARTY SLOTS
  // ========================================
  console.log('🎉 Exporting party slots...');
  const partySlots = db.prepare(`
    SELECT * FROM party_slots ORDER BY id
  `).all();
  exportData.tables.party_slots = partySlots;
  console.log(`   Exported ${partySlots.length} party slots`);

  // ========================================
  // EXPORT GALLERY IMAGES
  // ========================================
  console.log('🖼️  Exporting gallery images...');
  const galleryImages = db.prepare(`
    SELECT * FROM gallery_images ORDER BY id
  `).all();
  exportData.tables.gallery_images = galleryImages;
  console.log(`   Exported ${galleryImages.length} gallery images`);

  // ========================================
  // EXPORT COMPONENTS (for packages)
  // ========================================
  console.log('🧩 Exporting package components...');
  const packageComponents = db.prepare(`
    SELECT * FROM packages_cmps ORDER BY id
  `).all();
  exportData.tables.packages_cmps = packageComponents;
  console.log(`   Exported ${packageComponents.length} package components`);

  const includedFeatures = db.prepare(`
    SELECT * FROM components_common_included_features ORDER BY id
  `).all();
  exportData.tables.components_common_included_features = includedFeatures;
  console.log(`   Exported ${includedFeatures.length} included features`);

  // ========================================
  // SAVE TO FILE
  // ========================================
  const outputFile = path.join(__dirname, 'database-export.json');
  fs.writeFileSync(outputFile, JSON.stringify(exportData, null, 2));

  console.log('\n' + '='.repeat(60));
  console.log('✅ EXPORT COMPLETED!');
  console.log('='.repeat(60));
  console.log(`\nData exported to: ${outputFile}`);
  console.log('\n📊 Summary:');
  console.log(`   📦 Packages: ${packages.length}`);
  console.log(`   🍔 Menu Items: ${menuItems.length}`);
  console.log(`   🎉 Party Slots: ${partySlots.length}`);
  console.log(`   🖼️  Gallery Images: ${galleryImages.length}`);
  console.log(`   🧩 Package Components: ${packageComponents.length}`);
  console.log(`   ✨ Included Features: ${includedFeatures.length}`);
  console.log('='.repeat(60) + '\n');

  // ========================================
  // ANALYZE DUPLICATES
  // ========================================
  console.log('🔍 Analyzing for duplicates and issues...\n');

  // Check party slots
  const slotsByKey = new Map();
  partySlots.forEach(slot => {
    const key = `${slot.date}-${slot.start_time}`;
    if (!slotsByKey.has(key)) {
      slotsByKey.set(key, []);
    }
    slotsByKey.get(key).push(slot);
  });

  console.log('🎉 Party Slots Analysis:');
  slotsByKey.forEach((slots, key) => {
    if (slots.length > 1) {
      console.log(`\n   Duplicate: ${key}`);
      slots.forEach(slot => {
        console.log(`     - ID: ${slot.id}, document_id: ${slot.document_id || 'NULL'}, published: ${slot.published_at ? 'YES' : 'NO'}`);
      });
    }
  });

  // Check packages
  const pkgsBySlug = new Map();
  packages.forEach(pkg => {
    if (!pkgsBySlug.has(pkg.slug)) {
      pkgsBySlug.set(pkg.slug, []);
    }
    pkgsBySlug.get(pkg.slug).push(pkg);
  });

  console.log('\n📦 Packages Analysis:');
  pkgsBySlug.forEach((pkgs, slug) => {
    if (pkgs.length > 1) {
      console.log(`\n   Duplicate: ${slug}`);
      pkgs.forEach(pkg => {
        console.log(`     - ID: ${pkg.id}, document_id: ${pkg.document_id || 'NULL'}, published: ${pkg.published_at ? 'YES' : 'NO'}`);
      });
    }
  });

  // Check menu items
  const menuByName = new Map();
  menuItems.forEach(item => {
    if (!menuByName.has(item.name)) {
      menuByName.set(item.name, []);
    }
    menuByName.get(item.name).push(item);
  });

  console.log('\n🍔 Menu Items Analysis:');
  menuByName.forEach((items, name) => {
    if (items.length > 1) {
      console.log(`\n   Duplicate: ${name}`);
      items.forEach(item => {
        console.log(`     - ID: ${item.id}, document_id: ${item.document_id || 'NULL'}, published: ${item.published_at ? 'YES' : 'NO'}`);
      });
    }
  });

  console.log('\n' + '='.repeat(60));
  console.log('📄 Full data exported to: database-export.json');
  console.log('   Share this file to analyze the structure.');
  console.log('='.repeat(60) + '\n');

} catch (error) {
  console.error('\n❌ Error:', error.message);
  console.error(error.stack);
  process.exit(1);
} finally {
  db.close();
}
