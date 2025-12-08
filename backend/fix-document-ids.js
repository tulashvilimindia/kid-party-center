const Database = require('better-sqlite3');
const path = require('path');
const crypto = require('crypto');

const dbPath = path.join(__dirname, '.tmp', 'data.db');
const db = new Database(dbPath);

console.log('🔧 Fixing document_id duplicates...\n');

const generateDocumentId = () => crypto.randomBytes(12).toString('base64url');

try {
  db.exec('BEGIN TRANSACTION');

  // ========================================
  // FIX PARTY SLOTS
  // ========================================
  console.log('🎉 Fixing party slots...');

  // Get all slots grouped by date+time
  const slots = db.prepare(`
    SELECT id, document_id, date, start_time, end_time, status, max_parties, booked_parties,
           created_at, updated_at, published_at
    FROM party_slots
    ORDER BY date, start_time, id
  `).all();

  // Group by date+time to find duplicates
  const groups = new Map();

  slots.forEach(slot => {
    const key = `${slot.date}-${slot.start_time}`;
    if (!groups.has(key)) {
      groups.set(key, []);
    }
    groups.get(key).push(slot);
  });

  console.log(`   Found ${groups.size} unique time slots`);

  // For each group, assign same document_id
  let fixedCount = 0;
  groups.forEach((slotGroup, key) => {
    if (slotGroup.length > 1) {
      // Multiple records for same slot - they should share document_id
      const docId = slotGroup[0].document_id || generateDocumentId();

      slotGroup.forEach(slot => {
        if (slot.document_id !== docId) {
          db.prepare('UPDATE party_slots SET document_id = ? WHERE id = ?')
            .run(docId, slot.id);
          fixedCount++;
        }
      });

      console.log(`   ✅ Fixed ${key}: ${slotGroup.length} records share document_id ${docId}`);
    } else if (!slotGroup[0].document_id) {
      // Single record without document_id
      const docId = generateDocumentId();
      db.prepare('UPDATE party_slots SET document_id = ? WHERE id = ?')
        .run(docId, slotGroup[0].id);
      fixedCount++;
      console.log(`   ✅ Added document_id to ${key}`);
    }
  });

  // ========================================
  // FIX PACKAGES
  // ========================================
  console.log('\n📦 Fixing packages...');

  const packages = db.prepare(`
    SELECT id, document_id, name, slug
    FROM packages
    ORDER BY slug, id
  `).all();

  const packageGroups = new Map();
  packages.forEach(pkg => {
    if (!packageGroups.has(pkg.slug)) {
      packageGroups.set(pkg.slug, []);
    }
    packageGroups.get(pkg.slug).push(pkg);
  });

  let pkgFixedCount = 0;
  packageGroups.forEach((pkgGroup, slug) => {
    if (pkgGroup.length > 1) {
      const docId = pkgGroup[0].document_id || generateDocumentId();
      pkgGroup.forEach(pkg => {
        if (pkg.document_id !== docId) {
          db.prepare('UPDATE packages SET document_id = ? WHERE id = ?')
            .run(docId, pkg.id);
          pkgFixedCount++;
        }
      });
      console.log(`   ✅ Fixed ${slug}: ${pkgGroup.length} records share document_id ${docId}`);
    } else if (!pkgGroup[0].document_id) {
      const docId = generateDocumentId();
      db.prepare('UPDATE packages SET document_id = ? WHERE id = ?')
        .run(docId, pkgGroup[0].id);
      pkgFixedCount++;
      console.log(`   ✅ Added document_id to ${slug}`);
    }
  });

  // ========================================
  // FIX MENU ITEMS
  // ========================================
  console.log('\n🍔 Fixing menu items...');

  const menuItems = db.prepare(`
    SELECT id, document_id, name
    FROM menu_items
    ORDER BY name, id
  `).all();

  const menuGroups = new Map();
  menuItems.forEach(item => {
    if (!menuGroups.has(item.name)) {
      menuGroups.set(item.name, []);
    }
    menuGroups.get(item.name).push(item);
  });

  let menuFixedCount = 0;
  menuGroups.forEach((itemGroup, name) => {
    if (itemGroup.length > 1) {
      const docId = itemGroup[0].document_id || generateDocumentId();
      itemGroup.forEach(item => {
        if (item.document_id !== docId) {
          db.prepare('UPDATE menu_items SET document_id = ? WHERE id = ?')
            .run(docId, item.id);
          menuFixedCount++;
        }
      });
      console.log(`   ✅ Fixed ${name}: ${itemGroup.length} records share document_id ${docId}`);
    } else if (!itemGroup[0].document_id) {
      const docId = generateDocumentId();
      db.prepare('UPDATE menu_items SET document_id = ? WHERE id = ?')
        .run(docId, itemGroup[0].id);
      menuFixedCount++;
      console.log(`   ✅ Added document_id to ${name}`);
    }
  });

  // ========================================
  // FIX GALLERY IMAGES
  // ========================================
  console.log('\n🖼️  Fixing gallery images...');

  const gallery = db.prepare(`
    SELECT id, document_id, title
    FROM gallery_images
    ORDER BY title, id
  `).all();

  const galleryGroups = new Map();
  gallery.forEach(img => {
    if (!galleryGroups.has(img.title)) {
      galleryGroups.set(img.title, []);
    }
    galleryGroups.get(img.title).push(img);
  });

  let galleryFixedCount = 0;
  galleryGroups.forEach((imgGroup, title) => {
    if (imgGroup.length > 1) {
      const docId = imgGroup[0].document_id || generateDocumentId();
      imgGroup.forEach(img => {
        if (img.document_id !== docId) {
          db.prepare('UPDATE gallery_images SET document_id = ? WHERE id = ?')
            .run(docId, img.id);
          galleryFixedCount++;
        }
      });
      console.log(`   ✅ Fixed ${title}: ${imgGroup.length} records share document_id ${docId}`);
    } else if (!imgGroup[0].document_id) {
      const docId = generateDocumentId();
      db.prepare('UPDATE gallery_images SET document_id = ? WHERE id = ?')
        .run(docId, imgGroup[0].id);
      galleryFixedCount++;
      console.log(`   ✅ Added document_id to ${title}`);
    }
  });

  db.exec('COMMIT');

  console.log('\n' + '='.repeat(60));
  console.log('✅ DOCUMENT_ID FIX COMPLETED!');
  console.log('='.repeat(60));
  console.log(`   🎉 Party Slots: ${fixedCount} fixed`);
  console.log(`   📦 Packages: ${pkgFixedCount} fixed`);
  console.log(`   🍔 Menu Items: ${menuFixedCount} fixed`);
  console.log(`   🖼️  Gallery Images: ${galleryFixedCount} fixed`);
  console.log('='.repeat(60) + '\n');
  console.log('✅ All duplicate records now share the same document_id!');
  console.log('   Check Strapi admin: http://localhost:1337/admin\n');

} catch (error) {
  db.exec('ROLLBACK');
  console.error('\n❌ Error:', error.message);
  console.error(error.stack);
  process.exit(1);
} finally {
  db.close();
}
