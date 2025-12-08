const Database = require('better-sqlite3');
const path = require('path');

const dbPath = path.join(__dirname, '.tmp', 'data.db');
const db = new Database(dbPath);

console.log('🧹 Cleaning up and verifying database...\n');

try {
  db.exec('BEGIN TRANSACTION');

  // ========================================
  // 1. CHECK PACKAGES
  // ========================================
  console.log('📦 Packages:');
  const packages = db.prepare('SELECT id, document_id, name, slug FROM packages ORDER BY id').all();
  console.log(`   Total: ${packages.length} records`);

  const packagesWithDocId = packages.filter(p => p.document_id);
  const packagesWithoutDocId = packages.filter(p => !p.document_id);
  console.log(`   - With document_id: ${packagesWithDocId.length}`);
  console.log(`   - Without document_id: ${packagesWithoutDocId.length}`);

  if (packagesWithoutDocId.length > 0) {
    console.log('   ⚠️  Found packages without document_id - they may not work properly in Strapi');
  }

  // ========================================
  // 2. CHECK MENU ITEMS
  // ========================================
  console.log('\n🍔 Menu Items:');
  const menuItems = db.prepare('SELECT id, document_id, name, category FROM menu_items ORDER BY id').all();
  console.log(`   Total: ${menuItems.length} records`);

  const menuWithDocId = menuItems.filter(m => m.document_id);
  const menuWithoutDocId = menuItems.filter(m => !m.document_id);
  console.log(`   - With document_id: ${menuWithDocId.length}`);
  console.log(`   - Without document_id: ${menuWithoutDocId.length}`);

  if (menuWithoutDocId.length > 0) {
    console.log('   ⚠️  Found menu items without document_id - they may not work properly in Strapi');
  }

  // ========================================
  // 3. CHECK PARTY SLOTS
  // ========================================
  console.log('\n🎉 Party Slots:');
  const slots = db.prepare('SELECT id, document_id, date, start_time, status FROM party_slots ORDER BY date, start_time').all();
  console.log(`   Total: ${slots.length} records`);

  const slotsWithDocId = slots.filter(s => s.document_id);
  const slotsWithoutDocId = slots.filter(s => !s.document_id);
  console.log(`   - With document_id: ${slotsWithDocId.length}`);
  console.log(`   - Without document_id: ${slotsWithoutDocId.length}`);

  // Check for duplicates
  const slotKeys = new Map();
  const duplicates = [];

  slots.forEach(slot => {
    const key = `${slot.date}-${slot.start_time}`;
    if (slotKeys.has(key)) {
      duplicates.push(slot);
    } else {
      slotKeys.set(key, slot);
    }
  });

  if (duplicates.length > 0) {
    console.log(`   ⚠️  Found ${duplicates.length} duplicate slots`);
    console.log('   Duplicates will be shown in Strapi but may cause issues');
  }

  // ========================================
  // 4. CHECK GALLERY IMAGES
  // ========================================
  console.log('\n🖼️  Gallery Images:');
  const gallery = db.prepare('SELECT id, document_id, title FROM gallery_images ORDER BY id').all();
  console.log(`   Total: ${gallery.length} records`);

  const galleryWithDocId = gallery.filter(g => g.document_id);
  const galleryWithoutDocId = gallery.filter(g => !g.document_id);
  console.log(`   - With document_id: ${galleryWithDocId.length}`);
  console.log(`   - Without document_id: ${galleryWithoutDocId.length}`);

  if (galleryWithoutDocId.length > 0) {
    console.log('   ⚠️  Found gallery images without document_id - they may not work properly in Strapi');
  }

  db.exec('COMMIT');

  // ========================================
  // SUMMARY
  // ========================================
  console.log('\n' + '='.repeat(60));
  console.log('✅ DATABASE VERIFICATION COMPLETE');
  console.log('='.repeat(60));
  console.log('\n📊 Summary:');
  console.log(`   📦 Packages: ${packages.length} total (${packagesWithDocId.length} ready)`);
  console.log(`   🍔 Menu Items: ${menuItems.length} total (${menuWithDocId.length} ready)`);
  console.log(`   🎉 Party Slots: ${slots.length} total (${slotsWithDocId.length} ready)`);
  console.log(`   🖼️  Gallery: ${gallery.length} total (${galleryWithDocId.length} ready)`);

  const totalRecords = packages.length + menuItems.length + slots.length + gallery.length;
  const totalReady = packagesWithDocId.length + menuWithDocId.length + slotsWithDocId.length + galleryWithDocId.length;

  console.log(`\n   Total: ${totalRecords} records (${totalReady} with document_id)`);

  if (totalRecords !== totalReady) {
    console.log('\n⚠️  NOTE: Records without document_id are from old seed attempts.');
    console.log('   They will still appear in Strapi but may have issues.');
    console.log('   You can delete them manually from Strapi admin if needed.\n');
  } else {
    console.log('\n✅ All records have document_id! Database is in good shape.\n');
  }

  console.log('🎉 You can now view your data at: http://localhost:1337/admin');
  console.log('='.repeat(60) + '\n');

} catch (error) {
  db.exec('ROLLBACK');
  console.error('\n❌ Error:', error.message);
  process.exit(1);
} finally {
  db.close();
}
