[1mdiff --git a/SEED-INSTRUCTIONS.md b/SEED-INSTRUCTIONS.md[m
[1mindex 20c9a20..129daad 100644[m
[1m--- a/SEED-INSTRUCTIONS.md[m
[1m+++ b/SEED-INSTRUCTIONS.md[m
[36m@@ -1,45 +1,45 @@[m
[31m-# How to Run the Updated Seed Script[m
[31m-[m
[31m-The seed data has been expanded and is ready to populate your database![m
[31m-[m
[31m-## What's Been Added:[m
[31m-- **Packages**: 3 → 10 (added 7 new party themes)[m
[31m-- **Menu Items**: 5 → 37 (added 32 new food/drinks/extras)[m
[31m-- **Party Slots**: 3 → 60+ (3 weeks of time slots)[m
[31m-- **Gallery Images**: 3 → 20 (added 17 new gallery entries)[m
[31m-[m
[31m-## How to Run:[m
[31m-[m
[31m-### Method 1: From your existing backend terminal[m
[31m-If you have a terminal where the backend is already running:[m
[31m-1. Stop the backend (Ctrl+C)[m
[31m-2. Run: `node seed.js`[m
[31m-3. Restart backend: `npm run develop`[m
[31m-[m
[31m-### Method 2: In a new terminal[m
[31m-1. Open a new terminal/command prompt[m
[31m-2. Navigate to: `C:\Users\MindiaTulashvili\OneDrive\Desktop\KidParty\backend`[m
[31m-3. Run: `node seed.js`[m
[31m-[m
[31m-### Method 3: Use the batch file[m
[31m-Double-click on: `C:\Users\MindiaTulashvili\OneDrive\Desktop\KidParty\backend\run-seed.bat`[m
[31m-[m
[31m-## Expected Output:[m
[31m-```[m
[31m-🚀 Booting Strapi for seeding...[m
[31m-📦 Running seeds...[m
[31m-🎁 Packages seeded[m
[31m-🍔 Menu Items seeded[m
[31m-🖼️ Gallery Images seeded[m
[31m-🎉 Party Slots seeded[m
[31m-⚙️ Site Settings seeded[m
[31m-✅ Seeding complete![m
[31m-```[m
[31m-[m
[31m-## Note:[m
[31m-The seed script is smart and won't create duplicates. It only adds new data that doesn't exist yet.[m
[31m-[m
[31m-## After Seeding:[m
[31m-Your Strapi backend will have rich demo data ready to use![m
[31m-- Check Strapi admin at: http://localhost:1337/admin[m
[31m-- Verify the new content types have been populated[m
[32m+[m[32m# How to Run the Updated Seed Script[m[41m[m
[32m+[m[41m[m
[32m+[m[32mThe seed data has been expanded and is ready to populate your database![m[41m[m
[32m+[m[41m[m
[32m+[m[32m## What's Been Added:[m[41m[m
[32m+[m[32m- **Packages**: 3 → 10 (added 7 new party themes)[m[41m[m
[32m+[m[32m- **Menu Items**: 5 → 37 (added 32 new food/drinks/extras)[m[41m[m
[32m+[m[32m- **Party Slots**: 3 → 60+ (3 weeks of time slots)[m[41m[m
[32m+[m[32m- **Gallery Images**: 3 → 20 (added 17 new gallery entries)[m[41m[m
[32m+[m[41m[m
[32m+[m[32m## How to Run:[m[41m[m
[32m+[m[41m[m
[32m+[m[32m### Method 1: From your existing backend terminal[m[41m[m
[32m+[m[32mIf you have a terminal where the backend is already running:[m[41m[m
[32m+[m[32m1. Stop the backend (Ctrl+C)[m[41m[m
[32m+[m[32m2. Run: `node seed.js`[m[41m[m
[32m+[m[32m3. Restart backend: `npm run develop`[m[41m[m
[32m+[m[41m[m
[32m+[m[32m### Method 2: In a new terminal[m[41m[m
[32m+[m[32m1. Open a new terminal/command prompt[m[41m[m
[32m+[m[32m2. Navigate to: `C:\Users\MindiaTulashvili\OneDrive\Desktop\KidParty\backend`[m[41m[m
[32m+[m[32m3. Run: `node seed.js`[m[41m[m
[32m+[m[41m[m
[32m+[m[32m### Method 3: Use the batch file[m[41m[m
[32m+[m[32mDouble-click on: `C:\Users\MindiaTulashvili\OneDrive\Desktop\KidParty\backend\run-seed.bat`[m[41m[m
[32m+[m[41m[m
[32m+[m[32m## Expected Output:[m[41m[m
[32m+[m[32m```[m[41m[m
[32m+[m[32m🚀 Booting Strapi for seeding...[m[41m[m
[32m+[m[32m📦 Running seeds...[m[41m[m
[32m+[m[32m🎁 Packages seeded[m[41m[m
[32m+[m[32m🍔 Menu Items seeded[m[41m[m
[32m+[m[32m🖼️ Gallery Images seeded[m[41m[m
[32m+[m[32m🎉 Party Slots seeded[m[41m[m
[32m+[m[32m⚙️ Site Settings seeded[m[41m[m
[32m+[m[32m✅ Seeding complete![m[41m[m
[32m+[m[32m```[m[41m[m
[32m+[m[41m[m
[32m+[m[32m## Note:[m[41m[m
[32m+[m[32mThe seed script is smart and won't create duplicates. It only adds new data that doesn't exist yet.[m[41m[m
[32m+[m[41m[m
[32m+[m[32m## After Seeding:[m[41m[m
[32m+[m[32mYour Strapi backend will have rich demo data ready to use![m[41m[m
[32m+[m[32m- Check Strapi admin at: http://localhost:1337/admin[m[41m[m
[32m+[m[32m- Verify the new content types have been populated[m[41m[m
[1mdiff --git a/backend/check-db-structure.js b/backend/check-db-structure.js[m
[1mindex 688d007..440667a 100644[m
[1m--- a/backend/check-db-structure.js[m
[1m+++ b/backend/check-db-structure.js[m
[36m@@ -1,25 +1,25 @@[m
[31m-const Database = require('better-sqlite3');[m
[31m-const path = require('path');[m
[31m-[m
[31m-const dbPath = path.join(__dirname, '.tmp', 'data.db');[m
[31m-const db = new Database(dbPath);[m
[31m-[m
[31m-console.log('📊 Checking database structure...\n');[m
[31m-[m
[31m-// Get all tables[m
[31m-const tables = db.prepare("SELECT name FROM sqlite_master WHERE type='table' ORDER BY name").all();[m
[31m-[m
[31m-console.log('Tables found:');[m
[31m-tables.forEach(table => {[m
[31m-  console.log(`\n📋 Table: ${table.name}`);[m
[31m-[m
[31m-  // Get column info for each table[m
[31m-  const columns = db.prepare(`PRAGMA table_info(${table.name})`).all();[m
[31m-[m
[31m-  console.log('Columns:');[m
[31m-  columns.forEach(col => {[m
[31m-    console.log(`  - ${col.name} (${col.type}${col.notnull ? ', NOT NULL' : ''}${col.pk ? ', PRIMARY KEY' : ''})`);[m
[31m-  });[m
[31m-});[m
[31m-[m
[31m-db.close();[m
[32m+[m[32mconst Database = require('better-sqlite3');[m[41m[m
[32m+[m[32mconst path = require('path');[m[41m[m
[32m+[m[41m[m
[32m+[m[32mconst dbPath = path.join(__dirname, '.tmp', 'data.db');[m[41m[m
[32m+[m[32mconst db = new Database(dbPath);[m[41m[m
[32m+[m[41m[m
[32m+[m[32mconsole.log('📊 Checking database structure...\n');[m[41m[m
[32m+[m[41m[m
[32m+[m[32m// Get all tables[m[41m[m
[32m+[m[32mconst tables = db.prepare("SELECT name FROM sqlite_master WHERE type='table' ORDER BY name").all();[m[41m[m
[32m+[m[41m[m
[32m+[m[32mconsole.log('Tables found:');[m[41m[m
[32m+[m[32mtables.forEach(table => {[m[41m[m
[32m+[m[32m  console.log(`\n📋 Table: ${table.name}`);[m[41m[m
[32m+[m[41m[m
[32m+[m[32m  // Get column info for each table[m[41m[m
[32m+[m[32m  const columns = db.prepare(`PRAGMA table_info(${table.name})`).all();[m[41m[m
[32m+[m[41m[m
[32m+[m[32m  console.log('Columns:');[m[41m[m
[32m+[m[32m  columns.forEach(col => {[m[41m[m
[32m+[m[32m    console.log(`  - ${col.name} (${col.type}${col.notnull ? ', NOT NULL' : ''}${col.pk ? ', PRIMARY KEY' : ''})`);[m[41m[m
[32m+[m[32m  });[m[41m[m
[32m+[m[32m});[m[41m[m
[32m+[m[41m[m
[32m+[m[32mdb.close();[m[41m[m
[1mdiff --git a/backend/cleanup-and-verify.js b/backend/cleanup-and-verify.js[m
[1mindex 4eb343d..64ddc8f 100644[m
[1m--- a/backend/cleanup-and-verify.js[m
[1m+++ b/backend/cleanup-and-verify.js[m
[36m@@ -1,126 +1,126 @@[m
[31m-const Database = require('better-sqlite3');[m
[31m-const path = require('path');[m
[31m-[m
[31m-const dbPath = path.join(__dirname, '.tmp', 'data.db');[m
[31m-const db = new Database(dbPath);[m
[31m-[m
[31m-console.log('🧹 Cleaning up and verifying database...\n');[m
[31m-[m
[31m-try {[m
[31m-  db.exec('BEGIN TRANSACTION');[m
[31m-[m
[31m-  // ========================================[m
[31m-  // 1. CHECK PACKAGES[m
[31m-  // ========================================[m
[31m-  console.log('📦 Packages:');[m
[31m-  const packages = db.prepare('SELECT id, document_id, name, slug FROM packages ORDER BY id').all();[m
[31m-  console.log(`   Total: ${packages.length} records`);[m
[31m-[m
[31m-  const packagesWithDocId = packages.filter(p => p.document_id);[m
[31m-  const packagesWithoutDocId = packages.filter(p => !p.document_id);[m
[31m-  console.log(`   - With document_id: ${packagesWithDocId.length}`);[m
[31m-  console.log(`   - Without document_id: ${packagesWithoutDocId.length}`);[m
[31m-[m
[31m-  if (packagesWithoutDocId.length > 0) {[m
[31m-    console.log('   ⚠️  Found packages without document_id - they may not work properly in Strapi');[m
[31m-  }[m
[31m-[m
[31m-  // ========================================[m
[31m-  // 2. CHECK MENU ITEMS[m
[31m-  // ========================================[m
[31m-  console.log('\n🍔 Menu Items:');[m
[31m-  const menuItems = db.prepare('SELECT id, document_id, name, category FROM menu_items ORDER BY id').all();[m
[31m-  console.log(`   Total: ${menuItems.length} records`);[m
[31m-[m
[31m-  const menuWithDocId = menuItems.filter(m => m.document_id);[m
[31m-  const menuWithoutDocId = menuItems.filter(m => !m.document_id);[m
[31m-  console.log(`   - With document_id: ${menuWithDocId.length}`);[m
[31m-  console.log(`   - Without document_id: ${menuWithoutDocId.length}`);[m
[31m-[m
[31m-  if (menuWithoutDocId.length > 0) {[m
[31m-    console.log('   ⚠️  Found menu items without document_id - they may not work properly in Strapi');[m
[31m-  }[m
[31m-[m
[31m-  // ========================================[m
[31m-  // 3. CHECK PARTY SLOTS[m
[31m-  // ========================================[m
[31m-  console.log('\n🎉 Party Slots:');[m
[31m-  const slots = db.prepare('SELECT id, document_id, date, start_time, status FROM party_slots ORDER BY date, start_time').all();[m
[31m-  console.log(`   Total: ${slots.length} records`);[m
[31m-[m
[31m-  const slotsWithDocId = slots.filter(s => s.document_id);[m
[31m-  const slotsWithoutDocId = slots.filter(s => !s.document_id);[m
[31m-  console.log(`   - With document_id: ${slotsWithDocId.length}`);[m
[31m-  console.log(`   - Without document_id: ${slotsWithoutDocId.length}`);[m
[31m-[m
[31m-  // Check for duplicates[m
[31m-  const slotKeys = new Map();[m
[31m-  const duplicates = [];[m
[31m-[m
[31m-  slots.forEach(slot => {[m
[31m-    const key = `${slot.date}-${slot.start_time}`;[m
[31m-    if (slotKeys.has(key)) {[m
[31m-      duplicates.push(slot);[m
[31m-    } else {[m
[31m-      slotKeys.set(key, slot);[m
[31m-    }[m
[31m-  });[m
[31m-[m
[31m-  if (duplicates.length > 0) {[m
[31m-    console.log(`   ⚠️  Found ${duplicates.length} duplicate slots`);[m
[31m-    console.log('   Duplicates will be shown in Strapi but may cause issues');[m
[31m-  }[m
[31m-[m
[31m-  // ========================================[m
[31m-  // 4. CHECK GALLERY IMAGES[m
[31m-  // ========================================[m
[31m-  console.log('\n🖼️  Gallery Images:');[m
[31m-  const gallery = db.prepare('SELECT id, document_id, title FROM gallery_images ORDER BY id').all();[m
[31m-  console.log(`   Total: ${gallery.length} records`);[m
[31m-[m
[31m-  const galleryWithDocId = gallery.filter(g => g.document_id);[m
[31m-  const galleryWithoutDocId = gallery.filter(g => !g.document_id);[m
[31m-  console.log(`   - With document_id: ${galleryWithDocId.length}`);[m
[31m-  console.log(`   - Without document_id: ${galleryWithoutDocId.length}`);[m
[31m-[m
[31m-  if (galleryWithoutDocId.length > 0) {[m
[31m-    console.log('   ⚠️  Found gallery images without document_id - they may not work properly in Strapi');[m
[31m-  }[m
[31m-[m
[31m-  db.exec('COMMIT');[m
[31m-[m
[31m-  // ========================================[m
[31m-  // SUMMARY[m
[31m-  // ========================================[m
[31m-  console.log('\n' + '='.repeat(60));[m
[31m-  console.log('✅ DATABASE VERIFICATION COMPLETE');[m
[31m-  console.log('='.repeat(60));[m
[31m-  console.log('\n📊 Summary:');[m
[31m-  console.log(`   📦 Packages: ${packages.length} total (${packagesWithDocId.length} ready)`);[m
[31m-  console.log(`   🍔 Menu Items: ${menuItems.length} total (${menuWithDocId.length} ready)`);[m
[31m-  console.log(`   🎉 Party Slots: ${slots.length} total (${slotsWithDocId.length} ready)`);[m
[31m-  console.log(`   🖼️  Gallery: ${gallery.length} total (${galleryWithDocId.length} ready)`);[m
[31m-[m
[31m-  const totalRecords = packages.length + menuItems.length + slots.length + gallery.length;[m
[31m-  const totalReady = packagesWithDocId.length + menuWithDocId.length + slotsWithDocId.length + galleryWithDocId.length;[m
[31m-[m
[31m-  console.log(`\n   Total: ${totalRecords} records (${totalReady} with document_id)`);[m
[31m-[m
[31m-  if (totalRecords !== totalReady) {[m
[31m-    console.log('\n⚠️  NOTE: Records without document_id are from old seed attempts.');[m
[31m-    console.log('   They will still appear in Strapi but may have issues.');[m
[31m-    console.log('   You can delete them manually from Strapi admin if needed.\n');[m
[31m-  } else {[m
[31m-    console.log('\n✅ All records have document_id! Database is in good shape.\n');[m
[31m-  }[m
[31m-[m
[31m-  console.log('🎉 You can now view your data at: http://localhost:1337/admin');[m
[31m-  console.log('='.repeat(60) + '\n');[m
[31m-[m
[31m-} catch (error) {[m
[31m-  db.exec('ROLLBACK');[m
[31m-  console.error('\n❌ Error:', error.message);[m
[31m-  process.exit(1);[m
[31m-} finally {[m
[31m-  db.close();[m
[31m-}[m
[32m+[m[32mconst Database = require('better-sqlite3');[m[41m[m
[32m+[m[32mconst path = require('path');[m[41m[m
[32m+[m[41m[m
[32m+[m[32mconst dbPath = path.join(__dirname, '.tmp', 'data.db');[m[41m[m
[32m+[m[32mconst db = new Database(dbPath);[m[41m[m
[32m+[m[41m[m
[32m+[m[32mconsole.log('🧹 Cleaning up and verifying database...\n');[m[41m[m
[32m+[m[41m[m
[32m+[m[32mtry {[m[41m[m
[32m+[m[32m  db.exec('BEGIN TRANSACTION');[m[41m[m
[32m+[m[41m[m
[32m+[m[32m  // ========================================[m[41m[m
[32m+[m[32m  // 1. CHECK PACKAGES[m[41m[m
[32m+[m[32m  // ========================================[m[41m[m
[32m+[m[32m  console.log('📦 Packages:');[m[41m[m
[32m+[m[32m  const packages = db.prepare('SELECT id, document_id, name, slug FROM packages ORDER BY id').all();[m[41m[m
[32m+[m[32m  console.log(`   Total: ${packages.length} records`);[m[41m[m
[32m+[m[41m[m
[32m+[m[32m  const packagesWithDocId = packages.filter(p => p.document_id);[m[41m[m
[32m+[m[32m  const packagesWithoutDocId = packages.filter(p => !p.document_id);[m[41m[m
[32m+[m[32m  console.log(`   - With document_id: ${packagesWithDocId.length}`);[m[41m[m
[32m+[m[32m  console.log(`   - Without document_id: ${packagesWithoutDocId.length}`);[m[41m[m
[32m+[m[41m[m
[32m+[m[32m  if (packagesWithoutDocId.length > 0) {[m[41m[m
[32m+[m[32m    console.log('   ⚠️  Found packages without document_id - they may not work properly in Strapi');[m[41m[m
[32m+[m[32m  }[m[41m[m
[32m+[m[41m[m
[32m+[m[32m  // ========================================[m[41m[m
[32m+[m[32m  // 2. CHECK MENU ITEMS[m[41m[m
[32m+[m[32m  // ========================================[m[41m[m
[32m+[m[32m  console.log('\n🍔 Menu Items:');[m[41m[m
[32m+[m[32m  const menuItems = db.prepare('SELECT id, document_id, name, category FROM menu_items ORDER BY id').all();[m[41m[m
[32m+[m[32m  console.log(`   Total: ${menuItems.length} records`);[m[41m[m
[32m+[m[41m[m
[32m+[m[32m  const menuWithDocId = menuItems.filter(m => m.document_id);[m[41m[m
[32m+[m[32m  const menuWithoutDocId = menuItems.filter(m => !m.document_id);[m[41m[m
[32m+[m[32m  console.log(`   - With document_id: ${menuWithDocId.length}`);[m[41m[m
[32m+[m[32m  console.log(`   - Without document_id: ${menuWithoutDocId.length}`);[m[41m[m
[32m+[m[41m[m
[32m+[m[32m  if (menuWithoutDocId.length > 0) {[m[41m[m
[32m+[m[32m    console.log('   ⚠️  Found menu items without document_id - they may not work properly in Strapi');[m[41m[m
[32m+[m[32m  }[m[41m[m
[32m+[m[41m[m
[32m+[m[32m  // ========================================[m[41m[m
[32m+[m[32m  // 3. CHECK PARTY SLOTS[m[41m[m
[32m+[m[32m  // ========================================[m[41m[m
[32m+[m[32m  console.log('\n🎉 Party Slots:');[m[41m[m
[32m+[m[32m  const slots = db.prepare('SELECT id, document_id, date, start_time, status FROM party_slots ORDER BY date, start_time').all();[m[41m[m
[32m+[m[32m  console.log(`   Total: ${slots.length} records`);[m[41m[m
[32m+[m[41m[m
[32m+[m[32m  const slotsWithDocId = slots.filter(s => s.document_id);[m[41m[m
[32m+[m[32m  const slotsWithoutDocId = slots.filter(s => !s.document_id);[m[41m[m
[32m+[m[32m  console.log(`   - With document_id: ${slotsWithDocId.length}`);[m[41m[m
[32m+[m[32m  console.log(`   - Without document_id: ${slotsWithoutDocId.length}`);[m[41m[m
[32m+[m[41m[m
[32m+[m[32m  // Check for duplicates[m[41m[m
[32m+[m[32m  const slotKeys = new Map();[m[41m[m
[32m+[m[32m  const duplicates = [];[m[41m[m
[32m+[m[41m[m
[32m+[m[32m  slots.forEach(slot => {[m[41m[m
[32m+[m[32m    const key = `${slot.date}-${slot.start_time}`;[m[41m[m
[32m+[m[32m    if (slotKeys.has(key)) {[m[41m[m
[32m+[m[32m      duplicates.push(slot);[m[41m[m
[32m+[m[32m    } else {[m[41m[m
[32m+[m[32m      slotKeys.set(key, slot);[m[41m[m
[32m+[m[32m    }[m[41m[m
[32m+[m[32m  });[m[41m[m
[32m+[m[41m[m
[32m+[m[32m  if (duplicates.length > 0) {[m[41m[m
[32m+[m[32m    console.log(`   ⚠️  Found ${duplicates.length} duplicate slots`);[m[41m[m
[32m+[m[32m    console.log('   Duplicates will be shown in Strapi but may cause issues');[m[41m[m
[32m+[m[32m  }[m[41m[m
[32m+[m[41m[m
[32m+[m[32m  // ========================================[m[41m[m
[32m+[m[32m  // 4. CHECK GALLERY IMAGES[m[41m[m
[32m+[m[32m  // ========================================[m[41m[m
[32m+[m[32m  console.log('\n🖼️  Gallery Images:');[m[41m[m
[32m+[m[32m  const gallery = db.prepare('SELECT id, document_id, title FROM gallery_images ORDER BY id').all();[m[41m[m
[32m+[m[32m  console.log(`   Total: ${gallery.length} records`);[m[41m[m
[32m+[m[41m[m
[32m+[m[32m  const galleryWithDocId = gallery.filter(g => g.document_id);[m[41m[m
[32m+[m[32m  const galleryWithoutDocId = gallery.filter(g => !g.document_id);[m[41m[m
[32m+[m[32m  console.log(`   - With document_id: ${galleryWithDocId.length}`);[m[41m[m
[32m+[m[32m  console.log(`   - Without document_id: ${galleryWithoutDocId.length}`);[m[41m[m
[32m+[m[41m[m
[32m+[m[32m  if (galleryWithoutDocId.length > 0) {[m[41m[m
[32m+[m[32m    console.log('   ⚠️  Found gallery images without document_id - they may not work properly in Strapi');[m[41m[m
[32m+[m[32m  }[m[41m[m
[32m+[m[41m[m
[32m+[m[32m  db.exec('COMMIT');[m[41m[m
[32m+[m[41m[m
[32m+[m[32m  // ========================================[m[41m[m
[32m+[m[32m  // SUMMARY[m[41m[m
[32m+[m[32m  // ========================================[m[41m[m
[32m+[m[32m  console.log('\n' + '='.repeat(60));[m[41m[m
[32m+[m[32m  console.log('✅ DATABASE VERIFICATION COMPLETE');[m[41m[m
[32m+[m[32m  console.log('='.repeat(60));[m[41m[m
[32m+[m[32m  console.log('\n📊 Summary:');[m[41m[m
[32m+[m[32m  console.log(`   📦 Packages: ${packages.length} total (${packagesWithDocId.length} ready)`);[m[41m[m
[32m+[m[32m  console.log(`   🍔 Menu Items: ${menuItems.length} total (${menuWithDocId.length} ready)`);[m[41m[m
[32m+[m[32m  console.log(`   🎉 Party Slots: ${slots.length} total (${slotsWithDocId.length} ready)`);[m[41m[m
[32m+[m[32m  console.log(`   🖼️  Gallery: ${gallery.length} total (${galleryWithDocId.length} ready)`);[m[41m[m
[32m+[m[41m[m
[32m+[m[32m  const totalRecords = packages.length + menuItems.length + slots.length + gallery.length;[m[41m[m
[32m+[m[32m  const totalReady = packagesWithDocId.length + menuWithDocId.length + slotsWithDocId.length + galleryWithDocId.length;[m[41m[m
[32m+[m[41m[m
[32m+[m[32m  console.log(`\n   Total: ${totalRecords} records (${totalReady} with document_id)`);[m[41m[m
[32m+[m[41m[m
[32m+[m[32m  if (totalRecords !== totalReady) {[m[41m[m
[32m+[m[32m    console.log('\n⚠️  NOTE: Records without document_id are from old seed attempts.');[m[41m[m
[32m+[m[32m    console.log('   They will still appear in Strapi but may have issues.');[m[41m[m
[32m+[m[32m    console.log('   You can delete them manually from Strapi admin if needed.\n');[m[41m[m
[32m+[m[32m  } else {[m[41m[m
[32m+[m[32m    console.log('\n✅ All records have document_id! Database is in good shape.\n');[m[41m[m
[32m+[m[32m  }[m[41m[m
[32m+[m[41m[m
[32m+[m[32m  console.log('🎉 You can now view your data at: http://localhost:1337/admin');[m[41m[m
[32m+[m[32m  console.log('='.repeat(60) + '\n');[m[41m[m
[32m+[m[41m[m
[32m+[m[32m} catch (error) {[m[41m[m
[32m+[m[32m  db.exec('ROLLBACK');[m[41m[m
[32m+[m[32m  console.error('\n❌ Error:', error.message);[m[41m[m
[32m+[m[32m  process.exit(1);[m[41m[m
[32m+[m[32m} finally {[m[41m[m
[32m+[m[32m  db.close();[m[41m[m
[32m+[m[32m}[m[41m[m
[1mdiff --git a/backend/database-export.json b/backend/database-export.json[m
[1mindex b21eb61..656c09a 100644[m
[1m--- a/backend/database-export.json[m
[1m+++ b/backend/database-export.json[m
[36m@@ -1,5 +1,5 @@[m
 {[m
[31m-  "timestamp": "2025-12-08T09:52:16.062Z",[m
[32m+[m[32m  "timestamp": "2025-12-08T10:04:07.240Z",[m
   "tables": {[m
     "packages": [[m
       {[m
[1mdiff --git a/backend/export-all-data.js b/backend/export-all-data.js[m
[1mindex 5aa8de1..b8946fd 100644[m
[1m--- a/backend/export-all-data.js[m
[1m+++ b/backend/export-all-data.js[m
[36m@@ -1,165 +1,165 @@[m
[31m-const Database = require('better-sqlite3');[m
[31m-const path = require('path');[m
[31m-const fs = require('fs');[m
[31m-[m
[31m-const dbPath = path.join(__dirname, '.tmp', 'data.db');[m
[31m-const db = new Database(dbPath);[m
[31m-[m
[31m-console.log('📊 Exporting all data from database...\n');[m
[31m-[m
[31m-const exportData = {[m
[31m-  timestamp: new Date().toISOString(),[m
[31m-  tables: {}[m
[31m-};[m
[31m-[m
[31m-try {[m
[31m-  // ========================================[m
[31m-  // EXPORT PACKAGES[m
[31m-  // ========================================[m
[31m-  console.log('📦 Exporting packages...');[m
[31m-  const packages = db.prepare(`[m
[31m-    SELECT * FROM packages ORDER BY id[m
[31m-  `).all();[m
[31m-  exportData.tables.packages = packages;[m
[31m-  console.log(`   Exported ${packages.length} packages`);[m
[31m-[m
[31m-  // ========================================[m
[31m-  // EXPORT MENU ITEMS[m
[31m-  // ========================================[m
[31m-  console.log('🍔 Exporting menu items...');[m
[31m-  const menuItems = db.prepare(`[m
[31m-    SELECT * FROM menu_items ORDER BY id[m
[31m-  `).all();[m
[31m-  exportData.tables.menu_items = menuItems;[m
[31m-  console.log(`   Exported ${menuItems.length} menu items`);[m
[31m-[m
[31m-  // ========================================[m
[31m-  // EXPORT PARTY SLOTS[m
[31m-  // ========================================[m
[31m-  console.log('🎉 Exporting party slots...');[m
[31m-  const partySlots = db.prepare(`[m
[31m-    SELECT * FROM party_slots ORDER BY id[m
[31m-  `).all();[m
[31m-  exportData.tables.party_slots = partySlots;[m
[31m-  console.log(`   Exported ${partySlots.length} party slots`);[m
[31m-[m
[31m-  // ========================================[m
[31m-  // EXPORT GALLERY IMAGES[m
[31m-  // ========================================[m
[31m-  console.log('🖼️  Exporting gallery images...');[m
[31m-  const galleryImages = db.prepare(`[m
[31m-    SELECT * FROM gallery_images ORDER BY id[m
[31m-  `).all();[m
[31m-  exportData.tables.gallery_images = galleryImages;[m
[31m-  console.log(`   Exported ${galleryImages.length} gallery images`);[m
[31m-[m
[31m-  // ========================================[m
[31m-  // EXPORT COMPONENTS (for packages)[m
[31m-  // ========================================[m
[31m-  console.log('🧩 Exporting package components...');[m
[31m-  const packageComponents = db.prepare(`[m
[31m-    SELECT * FROM packages_cmps ORDER BY id[m
[31m-  `).all();[m
[31m-  exportData.tables.packages_cmps = packageComponents;[m
[31m-  console.log(`   Exported ${packageComponents.length} package components`);[m
[31m-[m
[31m-  const includedFeatures = db.prepare(`[m
[31m-    SELECT * FROM components_common_included_features ORDER BY id[m
[31m-  `).all();[m
[31m-  exportData.tables.components_common_included_features = includedFeatures;[m
[31m-  console.log(`   Exported ${includedFeatures.length} included features`);[m
[31m-[m
[31m-  // ========================================[m
[31m-  // SAVE TO FILE[m
[31m-  // ========================================[m
[31m-  const outputFile = path.join(__dirname, 'database-export.json');[m
[31m-  fs.writeFileSync(outputFile, JSON.stringify(exportData, null, 2));[m
[31m-[m
[31m-  console.log('\n' + '='.repeat(60));[m
[31m-  console.log('✅ EXPORT COMPLETED!');[m
[31m-  console.log('='.repeat(60));[m
[31m-  console.log(`\nData exported to: ${outputFile}`);[m
[31m-  console.log('\n📊 Summary:');[m
[31m-  console.log(`   📦 Packages: ${packages.length}`);[m
[31m-  console.log(`   🍔 Menu Items: ${menuItems.length}`);[m
[31m-  console.log(`   🎉 Party Slots: ${partySlots.length}`);[m
[31m-  console.log(`   🖼️  Gallery Images: ${galleryImages.length}`);[m
[31m-  console.log(`   🧩 Package Components: ${packageComponents.length}`);[m
[31m-  console.log(`   ✨ Included Features: ${includedFeatures.length}`);[m
[31m-  console.log('='.repeat(60) + '\n');[m
[31m-[m
[31m-  // ========================================[m
[31m-  // ANALYZE DUPLICATES[m
[31m-  // ========================================[m
[31m-  console.log('🔍 Analyzing for duplicates and issues...\n');[m
[31m-[m
[31m-  // Check party slots[m
[31m-  const slotsByKey = new Map();[m
[31m-  partySlots.forEach(slot => {[m
[31m-    const key = `${slot.date}-${slot.start_time}`;[m
[31m-    if (!slotsByKey.has(key)) {[m
[31m-      slotsByKey.set(key, []);[m
[31m-    }[m
[31m-    slotsByKey.get(key).push(slot);[m
[31m-  });[m
[31m-[m
[31m-  console.log('🎉 Party Slots Analysis:');[m
[31m-  slotsByKey.forEach((slots, key) => {[m
[31m-    if (slots.length > 1) {[m
[31m-      console.log(`\n   Duplicate: ${key}`);[m
[31m-      slots.forEach(slot => {[m
[31m-        console.log(`     - ID: ${slot.id}, document_id: ${slot.document_id || 'NULL'}, published: ${slot.published_at ? 'YES' : 'NO'}`);[m
[31m-      });[m
[31m-    }[m
[31m-  });[m
[31m-[m
[31m-  // Check packages[m
[31m-  const pkgsBySlug = new Map();[m
[31m-  packages.forEach(pkg => {[m
[31m-    if (!pkgsBySlug.has(pkg.slug)) {[m
[31m-      pkgsBySlug.set(pkg.slug, []);[m
[31m-    }[m
[31m-    pkgsBySlug.get(pkg.slug).push(pkg);[m
[31m-  });[m
[31m-[m
[31m-  console.log('\n📦 Packages Analysis:');[m
[31m-  pkgsBySlug.forEach((pkgs, slug) => {[m
[31m-    if (pkgs.length > 1) {[m
[31m-      console.log(`\n   Duplicate: ${slug}`);[m
[31m-      pkgs.forEach(pkg => {[m
[31m-        console.log(`     - ID: ${pkg.id}, document_id: ${pkg.document_id || 'NULL'}, published: ${pkg.published_at ? 'YES' : 'NO'}`);[m
[31m-      });[m
[31m-    }[m
[31m-  });[m
[31m-[m
[31m-  // Check menu items[m
[31m-  const menuByName = new Map();[m
[31m-  menuItems.forEach(item => {[m
[31m-    if (!menuByName.has(item.name)) {[m
[31m-      menuByName.set(item.name, []);[m
[31m-    }[m
[31m-    menuByName.get(item.name).push(item);[m
[31m-  });[m
[31m-[m
[31m-  console.log('\n🍔 Menu Items Analysis:');[m
[31m-  menuByName.forEach((items, name) => {[m
[31m-    if (items.length > 1) {[m
[31m-      console.log(`\n   Duplicate: ${name}`);[m
[31m-      items.forEach(item => {[m
[31m-        console.log(`     - ID: ${item.id}, document_id: ${item.document_id || 'NULL'}, published: ${item.published_at ? 'YES' : 'NO'}`);[m
[31m-      });[m
[31m-    }[m
[31m-  });[m
[31m-[m
[31m-  console.log('\n' + '='.repeat(60));[m
[31m-  console.log('📄 Full data exported to: database-export.json');[m
[31m-  console.log('   Share this file to analyze the structure.');[m
[31m-  console.log('='.repeat(60) + '\n');[m
[31m-[m
[31m-} catch (error) {[m
[31m-  console.error('\n❌ Error:', error.message);[m
[31m-  console.error(error.stack);[m
[31m-  process.exit(1);[m
[31m-} finally {[m
[31m-  db.close();[m
[31m-}[m
[32m+[m[32mconst Database = require('better-sqlite3');[m[41m[m
[32m+[m[32mconst path = require('path');[m[41m[m
[32m+[m[32mconst fs = require('fs');[m[41m[m
[32m+[m[41m[m
[32m+[m[32mconst dbPath = path.join(__dirname, '.tmp', 'data.db');[m[41m[m
[32m+[m[32mconst db = new Database(dbPath);[m[41m[m
[32m+[m[41m[m
[32m+[m[32mconsole.log('📊 Exporting all data from database...\n');[m[41m[m
[32m+[m[41m[m
[32m+[m[32mconst exportData = {[m[41m[m
[32m+[m[32m  timestamp: new Date().toISOString(),[m[41m[m
[32m+[m[32m  tables: {}[m[41m[m
[32m+[m[32m};[m[41m[m
[32m+[m[41m[m
[32m+[m[32mtry {[m[41m[m
[32m+[m[32m  // ========================================[m[41m[m
[32m+[m[32m  // EXPORT PACKAGES[m[41m[m
[32m+[m[32m  // ========================================[m[41m[m
[32m+[m[32m  console.log('📦 Exporting packages...');[m[41m[m
[32m+[m[32m  const packages = db.prepare(`[m[41m[m
[32m+[m[32m    SELECT * FROM packages ORDER BY id[m[41m[m
[32m+[m[32m  `).all();[m[41m[m
[32m+[m[32m  exportData.tables.packages = packages;[m[41m[m
[32m+[m[32m  console.log(`   Exported ${packages.length} packages`);[m[41m[m
[32m+[m[41m[m
[32m+[m[32m  // ========================================[m[41m[m
[32m+[m[32m  // EXPORT MENU ITEMS[m[41m[m
[32m+[m[32m  // ========================================[m[41m[m
[32m+[m[32m  console.log('🍔 Exporting menu items...');[m[41m[m
[32m+[m[32m  const menuItems = db.prepare(`[m[41m[m
[32m+[m[32m    SELECT * FROM menu_items ORDER BY id[m[41m[m
[32m+[m[32m  `).all();[m[41m[m
[32m+[m[32m  exportData.tables.menu_items = menuItems;[m[41m[m
[32m+[m[32m  console.log(`   Exported ${menuItems.length} menu items`);[m[41m[m
[32m+[m[41m[m
[32m+[m[32m  // ========================================[m[41m[m
[32m+[m[32m  // EXPORT PARTY SLOTS[m[41m[m
[32m+[m[32m  // ========================================[m[41m[m
[32m+[m[32m  console.log('🎉 Exporting party slots...');[m[41m[m
[32m+[m[32m  const partySlots = db.prepare(`[m[41m[m
[32m+[m[32m    SELECT * FROM party_slots ORDER BY id[m[41m[m
[32m+[m[32m  `).all();[m[41m[m
[32m+[m[32m  exportData.tables.party_slots = partySlots;[m[41m[m
[32m+[m[32m  console.log(`   Exported ${partySlots.length} party slots`);[m[41m[m
[32m+[m[41m[m
[32m+[m[32m  // ========================================[m[41m[m
[32m+[m[32m  // EXPORT GALLERY IMAGES[m[41m[m
[32m+[m[32m  // ========================================[m[41m[m
[32m+[m[32m  console.log('🖼️  Exporting gallery images...');[m[41m[m
[32m+[m[32m  const galleryImages = db.prepare(`[m[41m[m
[32m+[m[32m    SELECT * FROM gallery_images ORDER BY id[m[41m[m
[32m+[m[32m  `).all();[m[41m[m
[32m+[m[32m  exportData.tables.gallery_images = galleryImages;[m[41m[m
[32m+[m[32m  console.log(`   Exported ${galleryImages.length} gallery images`);[m[41m[m
[32m+[m[41m[m
[32m+[m[32m  // ========================================[m[41m[m
[32m+[m[32m  // EXPORT COMPONENTS (for packages)[m[41m[m
[32m+[m[32m  // ========================================[m[41m[m
[32m+[m[32m  console.log('🧩 Exporting package components...');[m[41m[m
[32m+[m[32m  const packageComponents = db.prepare(`[m[41m[m
[32m+[m[32m    SELECT * FROM packages_cmps ORDER BY id[m[41m[m
[32m+[m[32m  `).all();[m[41m[m
[32m+[m[32m  exportData.tables.packages_cmps = packageComponents;[m[41m[m
[32m+[m[32m  console.log(`   Exported ${packageComponents.length} package components`);[m[41m[m
[32m+[m[41m[m
[32m+[m[32m  const includedFeatures = db.prepare(`[m[41m[m
[32m+[m[32m    SELECT * FROM components_common_included_features ORDER BY id[m[41m[m
[32m+[m[32m  `).all();[m[41m[m
[32m+[m[32m  exportData.tables.components_common_included_features = includedFeatures;[m[41m[m
[32m+[m[32m  console.log(`   Exported ${includedFeatures.length} included features`);[m[41m[m
[32m+[m[41m[m
[32m+[m[32m  // ========================================[m[41m[m
[32m+[m[32m  // SAVE TO FILE[m[41m[m
[32m+[m[32m  // ========================================[m[41m[m
[32m+[m[32m  const outputFile = path.join(__dirname, 'database-export.json');[m[41m[m
[32m+[m[32m  fs.writeFileSync(outputFile, JSON.stringify(exportData, null, 2));[m[41m[m
[32m+[m[41m[m
[32m+[m[32m  console.log('\n' + '='.repeat(60));[m[41m[m
[32m+[m[32m  console.log('✅ EXPORT COMPLETED!');[m[41m[m
[32m+[m[32m  console.log('='.repeat(60));[m[41m[m
[32m+[m[32m  console.log(`\nData exported to: ${outputFile}`);[m[41m[m
[32m+[m[32m  console.log('\n📊 Summary:');[m[41m[m
[32m+[m[32m  console.log(`   📦 Packages: ${packages.length}`);[m[41m[m
[32m+[m[32m  console.log(`   🍔 Menu Items: ${menuItems.length}`);[m[41m[m
[32m+[m[32m  console.log(`   🎉 Party Slots: ${partySlots.length}`);[m[41m[m
[32m+[m[32m  console.log(`   🖼️  Gallery Images: ${galleryImages.length}`);[m[41m[m
[32m+[m[32m  console.log(`   🧩 Package Components: ${packageComponents.length}`);[m[41m[m
[32m+[m[32m  console.log(`   ✨ Included Features: ${includedFeatures.length}`);[m[41m[m
[32m+[m[32m  console.log('='.repeat(60) + '\n');[m[41m[m
[32m+[m[41m[m
[32m+[m[32m  // ========================================[m[41m[m
[32m+[m[32m  // ANALYZE DUPLICATES[m[41m[m
[32m+[m[32m  // ========================================[m[41m[m
[32m+[m[32m  console.log('🔍 Analyzing for duplicates and issues...\n');[m[41m[m
[32m+[m[41m[m
[32m+[m[32m  // Check party slots[m[41m[m
[32m+[m[32m  const slotsByKey = new Map();[m[41m[m
[32m+[m[32m  partySlots.forEach(slot => {[m[41m[m
[32m+[m[32m    const key = `${slot.date}-${slot.start_time}`;[m[41m[m
[32m+[m[32m    if (!slotsByKey.has(key)) {[m[41m[m
[32m+[m[32m      slotsByKey.set(key, []);[m[41m[m
[32m+[m[32m    }[m[41m[m
[32m+[m[32m    slotsByKey.get(key).push(slot);[m[41m[m
[32m+[m[32m  });[m[41m[m
[32m+[m[41m[m
[32m+[m[32m  console.log('🎉 Party Slots Analysis:');[m[41m[m
[32m+[m[32m  slotsByKey.forEach((slots, key) => {[m[41m[m
[32m+[m[32m    if (slots.length > 1) {[m[41m[m
[32m+[m[32m      console.log(`\n   Duplicate: ${key}`);[m[41m[m
[32m+[m[32m      slots.forEach(slot => {[m[41m[m
[32m+[m[32m        console.log(`     - ID: ${slot.id}, document_id: ${slot.document_id || 'NULL'}, published: ${slot.published_at ? 'YES' : 'NO'}`);[m[41m[m
[32m+[m[32m      });[m[41m[m
[32m+[m[32m    }[m[41m[m
[32m+[m[32m  });[m[41m[m
[32m+[m[41m[m
[32m+[m[32m  // Check packages[m[41m[m
[32m+[m[32m  const pkgsBySlug = new Map();[m[41m[m
[32m+[m[32m  packages.forEach(pkg => {[m[41m[m
[32m+[m[32m    if (!pkgsBySlug.has(pkg.slug)) {[m[41m[m
[32m+[m[32m      pkgsBySlug.set(pkg.slug, []);[m[41m[m
[32m+[m[32m    }[m[41m[m
[32m+[m[32m    pkgsBySlug.get(pkg.slug).push(pkg);[m[41m[m
[32m+[m[32m  });[m[41m[m
[32m+[m[41m[m
[32m+[m[32m  console.log('\n📦 Packages Analysis:');[m[41m[m
[32m+[m[32m  pkgsBySlug.forEach((pkgs, slug) => {[m[41m[m
[32m+[m[32m    if (pkgs.length > 1) {[m[41m[m
[32m+[m[32m      console.log(`\n   Duplicate: ${slug}`);[m[41m[m
[32m+[m[32m      pkgs.forEach(pkg => {[m[41m[m
[32m+[m[32m        console.log(`     - ID: ${pkg.id}, document_id: ${pkg.document_id || 'NULL'}, published: ${pkg.published_at ? 'YES' : 'NO'}`);[m[41m[m
[32m+[m[32m      });[m[41m[m
[32m+[m[32m    }[m[41m[m
[32m+[m[32m  });[m[41m[m
[32m+[m[41m[m
[32m+[m[32m  // Check menu items[m[41m[m
[32m+[m[32m  const menuByName = new Map();[m[41m[m
[32m+[m[32m  menuItems.forEach(item => {[m[41m[m
[32m+[m[32m    if (!menuByName.has(item.name)) {[m[41m[m
[32m+[m[32m      menuByName.set(item.name, []);[m[41m[m
[32m+[m[32m    }[m[41m[m
[32m+[m[32m    menuByName.get(item.name).push(item);[m[41m[m
[32m+[m[32m  });[m[41m[m
[32m+[m[41m[m
[32m+[m[32m  console.log('\n🍔 Menu Items Analysis:');[m[41m[m
[32m+[m[32m  menuByName.forEach((items, name) => {[m[41m[m
[32m+[m[32m    if (items.length > 1) {[m[41m[m
[32m+[m[32m      console.log(`\n   Duplicate: ${name}`);[m[41m[m
[32m+[m[32m      items.forEach(item => {[m[41m[m
[32m+[m[32m        console.log(`     - ID: ${item.id}, document_id: ${item.document_id || 'NULL'}, published: ${item.published_at ? 'YES' : 'NO'}`);[m[41m[m
[32m+[m[32m      });[m[41m[m
[32m+[m[32m    }[m[41m[m
[32m+[m[32m  });[m[41m[m
[32m+[m[41m[m
[32m+[m[32m  console.log('\n' + '='.repeat(60));[m[41m[m
[32m+[m[32m  console.log('📄 Full data exported to: database-export.json');[m[41m[m
[32m+[m[32m  console.log('   Share this file to analyze the structure.');[m[41m[m
[32m+[m[32m  console.log('='.repeat(60) + '\n');[m[41m[m
[32m+[m[41m[m
[32m+[m[32m} catch (error) {[m[41m[m
[32m+[m[32m  console.error('\n❌ Error:', error.message);[m[41m[m
[32m+[m[32m  console.error(error.stack);[m[41m[m
[32m+[m[32m  process.exit(1);[m[41m[m
[32m+[m[32m} finally {[m[41m[m
[32m+[m[32m  db.close();[m[41m[m
[32m+[m[32m}[m[41m[m
[1mdiff --git a/backend/fix-document-ids.js b/backend/fix-document-ids.js[m
[1mindex f043996..1cafd3c 100644[m
[1m--- a/backend/fix-document-ids.js[m
[1m+++ b/backend/fix-document-ids.js[m
[36m@@ -1,207 +1,207 @@[m
[31m-const Database = require('better-sqlite3');[m
[31m-const path = require('path');[m
[31m-const crypto = require('crypto');[m
[31m-[m
[31m-const dbPath = path.join(__dirname, '.tmp', 'data.db');[m
[31m-const db = new Database(dbPath);[m
[31m-[m
[31m-console.log('🔧 Fixing document_id duplicates...\n');[m
[31m-[m
[31m-const generateDocumentId = () => crypto.randomBytes(12).toString('base64url');[m
[31m-[m
[31m-try {[m
[31m-  db.exec('BEGIN TRANSACTION');[m
[31m-[m
[31m-  // ========================================[m
[31m-  // FIX PARTY SLOTS[m
[31m-  // ========================================[m
[31m-  console.log('🎉 Fixing party slots...');[m
[31m-[m
[31m-  // Get all slots grouped by date+time[m
[31m-  const slots = db.prepare(`[m
[31m-    SELECT id, document_id, date, start_time, end_time, status, max_parties, booked_parties,[m
[31m-           created_at, updated_at, published_at[m
[31m-    FROM party_slots[m
[31m-    ORDER BY date, start_time, id[m
[31m-  `).all();[m
[31m-[m
[31m-  // Group by date+time to find duplicates[m
[31m-  const groups = new Map();[m
[31m-[m
[31m-  slots.forEach(slot => {[m
[31m-    const key = `${slot.date}-${slot.start_time}`;[m
[31m-    if (!groups.has(key)) {[m
[31m-      groups.set(key, []);[m
[31m-    }[m
[31m-    groups.get(key).push(slot);[m
[31m-  });[m
[31m-[m
[31m-  console.log(`   Found ${groups.size} unique time slots`);[m
[31m-[m
[31m-  // For each group, assign same document_id[m
[31m-  let fixedCount = 0;[m
[31m-  groups.forEach((slotGroup, key) => {[m
[31m-    if (slotGroup.length > 1) {[m
[31m-      // Multiple records for same slot - they should share document_id[m
[31m-      const docId = slotGroup[0].document_id || generateDocumentId();[m
[31m-[m
[31m-      slotGroup.forEach(slot => {[m
[31m-        if (slot.document_id !== docId) {[m
[31m-          db.prepare('UPDATE party_slots SET document_id = ? WHERE id = ?')[m
[31m-            .run(docId, slot.id);[m
[31m-          fixedCount++;[m
[31m-        }[m
[31m-      });[m
[31m-[m
[31m-      console.log(`   ✅ Fixed ${key}: ${slotGroup.length} records share document_id ${docId}`);[m
[31m-    } else if (!slotGroup[0].document_id) {[m
[31m-      // Single record without document_id[m
[31m-      const docId = generateDocumentId();[m
[31m-      db.prepare('UPDATE party_slots SET document_id = ? WHERE id = ?')[m
[31m-        .run(docId, slotGroup[0].id);[m
[31m-      fixedCount++;[m
[31m-      console.log(`   ✅ Added document_id to ${key}`);[m
[31m-    }[m
[31m-  });[m
[31m-[m
[31m-  // ========================================[m
[31m-  // FIX PACKAGES[m
[31m-  // ========================================[m
[31m-  console.log('\n📦 Fixing packages...');[m
[31m-[m
[31m-  const packages = db.prepare(`[m
[31m-    SELECT id, document_id, name, slug[m
[31m-    FROM packages[m
[31m-    ORDER BY slug, id[m
[31m-  `).all();[m
[31m-[m
[31m-  const packageGroups = new Map();[m
[31m-  packages.forEach(pkg => {[m
[31m-    if (!packageGroups.has(pkg.slug)) {[m
[31m-      packageGroups.set(pkg.slug, []);[m
[31m-    }[m
[31m-    packageGroups.get(pkg.slug).push(pkg);[m
[31m-  });[m
[31m-[m
[31m-  let pkgFixedCount = 0;[m
[31m-  packageGroups.forEach((pkgGroup, slug) => {[m
[31m-    if (pkgGroup.length > 1) {[m
[31m-      const docId = pkgGroup[0].document_id || generateDocumentId();[m
[31m-      pkgGroup.forEach(pkg => {[m
[31m-        if (pkg.document_id !== docId) {[m
[31m-          db.prepare('UPDATE packages SET document_id = ? WHERE id = ?')[m
[31m-            .run(docId, pkg.id);[m
[31m-          pkgFixedCount++;[m
[31m-        }[m
[31m-      });[m
[31m-      console.log(`   ✅ Fixed ${slug}: ${pkgGroup.length} records share document_id ${docId}`);[m
[31m-    } else if (!pkgGroup[0].document_id) {[m
[31m-      const docId = generateDocumentId();[m
[31m-      db.prepare('UPDATE packages SET document_id = ? WHERE id = ?')[m
[31m-        .run(docId, pkgGroup[0].id);[m
[31m-      pkgFixedCount++;[m
[31m-      console.log(`   ✅ Added document_id to ${slug}`);[m
[31m-    }[m
[31m-  });[m
[31m-[m
[31m-  // ========================================[m
[31m-  // FIX MENU ITEMS[m
[31m-  // ========================================[m
[31m-  console.log('\n🍔 Fixing menu items...');[m
[31m-[m
[31m-  const menuItems = db.prepare(`[m
[31m-    SELECT id, document_id, name[m
[31m-    FROM menu_items[m
[31m-    ORDER BY name, id[m
[31m-  `).all();[m
[31m-[m
[31m-  const menuGroups = new Map();[m
[31m-  menuItems.forEach(item => {[m
[31m-    if (!menuGroups.has(item.name)) {[m
[31m-      menuGroups.set(item.name, []);[m
[31m-    }[m
[31m-    menuGroups.get(item.name).push(item);[m
[31m-  });[m
[31m-[m
[31m-  let menuFixedCount = 0;[m
[31m-  menuGroups.forEach((itemGroup, name) => {[m
[31m-    if (itemGroup.length > 1) {[m
[31m-      const docId = itemGroup[0].document_id || generateDocumentId();[m
[31m-      itemGroup.forEach(item => {[m
[31m-        if (item.document_id !== docId) {[m
[31m-          db.prepare('UPDATE menu_items SET document_id = ? WHERE id = ?')[m
[31m-            .run(docId, item.id);[m
[31m-          menuFixedCount++;[m
[31m-        }[m
[31m-      });[m
[31m-      console.log(`   ✅ Fixed ${name}: ${itemGroup.length} records share document_id ${docId}`);[m
[31m-    } else if (!itemGroup[0].document_id) {[m
[31m-      const docId = generateDocumentId();[m
[31m-      db.prepare('UPDATE menu_items SET document_id = ? WHERE id = ?')[m
[31m-        .run(docId, itemGroup[0].id);[m
[31m-      menuFixedCount++;[m
[31m-      console.log(`   ✅ Added document_id to ${name}`);[m
[31m-    }[m
[31m-  });[m
[31m-[m
[31m-  // ========================================[m
[31m-  // FIX GALLERY IMAGES[m
[31m-  // ========================================[m
[31m-  console.log('\n🖼️  Fixing gallery images...');[m
[31m-[m
[31m-  const gallery = db.prepare(`[m
[31m-    SELECT id, document_id, title[m
[31m-    FROM gallery_images[m
[31m-    ORDER BY title, id[m
[31m-  `).all();[m
[31m-[m
[31m-  const galleryGroups = new Map();[m
[31m-  gallery.forEach(img => {[m
[31m-    if (!galleryGroups.has(img.title)) {[m
[31m-      galleryGroups.set(img.title, []);[m
[31m-    }[m
[31m-    galleryGroups.get(img.title).push(img);[m
[31m-  });[m
[31m-[m
[31m-  let galleryFixedCount = 0;[m
[31m-  galleryGroups.forEach((imgGroup, title) => {[m
[31m-    if (imgGroup.length > 1) {[m
[31m-      const docId = imgGroup[0].document_id || generateDocumentId();[m
[31m-      imgGroup.forEach(img => {[m
[31m-        if (img.document_id !== docId) {[m
[31m-          db.prepare('UPDATE gallery_images SET document_id = ? WHERE id = ?')[m
[31m-            .run(docId, img.id);[m
[31m-          galleryFixedCount++;[m
[31m-        }[m
[31m-      });[m
[31m-      console.log(`   ✅ Fixed ${title}: ${imgGroup.length} records share document_id ${docId}`);[m
[31m-    } else if (!imgGroup[0].document_id) {[m
[31m-      const docId = generateDocumentId();[m
[31m-      db.prepare('UPDATE gallery_images SET document_id = ? WHERE id = ?')[m
[31m-        .run(docId, imgGroup[0].id);[m
[31m-      galleryFixedCount++;[m
[31m-      console.log(`   ✅ Added document_id to ${title}`);[m
[31m-    }[m
[31m-  });[m
[31m-[m
[31m-  db.exec('COMMIT');[m
[31m-[m
[31m-  console.log('\n' + '='.repeat(60));[m
[31m-  console.log('✅ DOCUMENT_ID FIX COMPLETED!');[m
[31m-  console.log('='.repeat(60));[m
[31m-  console.log(`   🎉 Party Slots: ${fixedCount} fixed`);[m
[31m-  console.log(`   📦 Packages: ${pkgFixedCount} fixed`);[m
[31m-  console.log(`   🍔 Menu Items: ${menuFixedCount} fixed`);[m
[31m-  console.log(`   🖼️  Gallery Images: ${galleryFixedCount} fixed`);[m
[31m-  console.log('='.repeat(60) + '\n');[m
[31m-  console.log('✅ All duplicate records now share the same document_id!');[m
[31m-  console.log('   Check Strapi admin: http://localhost:1337/admin\n');[m
[31m-[m
[31m-} catch (error) {[m
[31m-  db.exec('ROLLBACK');[m
[31m-  console.error('\n❌ Error:', error.message);[m
[31m-  console.error(error.stack);[m
[31m-  process.exit(1);[m
[31m-} finally {[m
[31m-  db.close();[m
[31m-}[m
[32m+[m[32mconst Database = require('better-sqlite3');[m[41m[m
[32m+[m[32mconst path = require('path');[m[41m[m
[32m+[m[32mconst crypto = require('crypto');[m[41m[m
[32m+[m[41m[m
[32m+[m[32mconst dbPath = path.join(__dirname, '.tmp', 'data.db');[m[41m[m
[32m+[m[32mconst db = new Database(dbPath);[m[41m[m
[32m+[m[41m[m
[32m+[m[32mconsole.log('🔧 Fixing document_id duplicates...\n');[m[41m[m
[32m+[m[41m[m
[32m+[m[32mconst generateDocumentId = () => crypto.randomBytes(12).toString('base64url');[m[41m[m
[32m+[m[41m[m
[32m+[m[32mtry {[m[41m[m
[32m+[m[32m  db.exec('BEGIN TRANSACTION');[m[41m[m
[32m+[m[41m[m
[32m+[m[32m  // ========================================[m[41m[m
[32m+[m[32m  // FIX PARTY SLOTS[m[41m[m
[32m+[m[32m  // ========================================[m[41m[m
[32m+[m[32m  console.log('🎉 Fixing party slots...');[m[41m[m
[32m+[m[41m[m
[32m+[m[32m  // Get all slots grouped by date+time[m[41m[m
[32m+[m[32m  const slots = db.prepare(`[m[41m[m
[32m+[m[32m    SELECT id, document_id, date, start_time, end_time, status, max_parties, booked_parties,[m[41m[m
[32m+[m[32m           created_at, updated_at, published_at[m[41m[m
[32m+[m[32m    FROM party_slots[m[41m[m
[32m+[m[32m    ORDER BY date, start_time, id[m[41m[m
[32m+[m[32m  `).all();[m[41m[m
[32m+[m[41m[m
[32m+[m[32m  // Group by date+time to find duplicates[m[41m[m
[32m+[m[32m  const groups = new Map();[m[41m[m
[32m+[m[41m[m
[32m+[m[32m  slots.forEach(slot => {[m[41m[m
[32m+[m[32m    const key = `${slot.date}-${slot.start_time}`;[m[41m[m
[32m+[m[32m    if (!groups.has(key)) {[m[41m[m
[32m+[m[32m      groups.set(key, []);[m[41m[m
[32m+[m[32m    }[m[41m[m
[32m+[m[32m    groups.get(key).push(slot);[m[41m[m
[32m+[m[32m  });[m[41m[m
[32m+[m[41m[m
[32m+[m[32m  console.log(`   Found ${groups.size} unique time slots`);[m[41m[m
[32m+[m[41m[m
[32m+[m[32m  // For each group, assign same document_id[m[41m[m
[32m+[m[32m  let fixedCount = 0;[m[41m[m
[32m+[m[32m  groups.forEach((slotGroup, key) => {[m[41m[m
[32m+[m[32m    if (slotGroup.length > 1) {[m[41m[m
[32m+[m[32m      // Multiple records for same slot - they should share document_id[m[41m[m
[32m+[m[32m      const docId = slotGroup[0].document_id || generateDocumentId();[m[41m[m
[32m+[m[41m[m
[32m+[m[32m      slotGroup.forEach(slot => {[m[41m[m
[32m+[m[32m        if (slot.document_id !== docId) {[m[41m[m
[32m+[m[32m          db.prepare('UPDATE party_slots SET document_id = ? WHERE id = ?')[m[41m[m
[32m+[m[32m            .run(docId, slot.id);[m[41m[m
[32m+[m[32m          fixedCount++;[m[41m[m
[32m+[m[32m        }[m[41m[m
[32m+[m[32m      });[m[41m[m
[32m+[m[41m[m
[32m+[m[32m      console.log(`   ✅ Fixed ${key}: ${slotGroup.length} records share document_id ${docId}`);[m[41m[m
[32m+[m[32m    } else if (!slotGroup[0].document_id) {[m[41m[m
[32m+[m[32m      // Single record without document_id[m[41m[m
[32m+[m[32m      const docId = generateDocumentId();[m[41m[m
[32m+[m[32m      db.prepare('UPDATE party_slots SET document_id = ? WHERE id = ?')[m[41m[m
[32m+[m[32m        .run(docId, slotGroup[0].id);[m[41m[m
[32m+[m[32m      fixedCount++;[m[41m[m
[32m+[m[32m      console.log(`   ✅ Added document_id to ${key}`);[m[41m[m
[32m+[m[32m    }[m[41m[m
[32m+[m[32m  });[m[41m[m
[32m+[m[41m[m
[32m+[m[32m  // ========================================[m[41m[m
[32m+[m[32m  // FIX PACKAGES[m[41m[m
[32m+[m[32m  // ========================================[m[41m[m
[32m+[m[32m  console.log('\n📦 Fixing packages...');[m[41m[m
[32m+[m[41m[m
[32m+[m[32m  const packages = db.prepare(`[m[41m[m
[32m+[m[32m    SELECT id, document_id, name, slug[m[41m[m
[32m+[m[32m    FROM packages[m[41m[m
[32m+[m[32m    ORDER BY slug, id[m[41m[m
[32m+[m[32m  `).all();[m[41m[m
[32m+[m[41m[m
[32m+[m[32m  const packageGroups = new Map();[m[41m[m
[32m+[m[32m  packages.forEach(pkg => {[m[41m[m
[32m+[m[32m    if (!packageGroups.has(pkg.slug)) {[m[41m[m
[32m+[m[32m      packageGroups.set(pkg.slug, []);[m[41m[m
[32m+[m[32m    }[m[41m[m
[32m+[m[32m    packageGroups.get(pkg.slug).push(pkg);[m[41m[m
[32m+[m[32m  });[m[41m[m
[32m+[m[41m[m
[32m+[m[32m  let pkgFixedCount = 0;[m[41m[m
[32m+[m[32m  packageGroups.forEach((pkgGroup, slug) => {[m[41m[m
[32m+[m[32m    if (pkgGroup.length > 1) {[m[41m[m
[32m+[m[32m      const docId = pkgGroup[0].document_id || generateDocumentId();[m[41m[m
[32m+[m[32m      pkgGroup.forEach(pkg => {[m[41m[m
[32m+[m[32m        if (pkg.document_id !== docId) {[m[41m[m
[32m+[m[32m          db.prepare('UPDATE packages SET document_id = ? WHERE id = ?')[m[41m[m
[32m+[m[32m            .run(docId, pkg.id);[m[41m[m
[32m+[m[32m          pkgFixedCount++;[m[41m[m
[32m+[m[32m        }[m[41m[m
[32m+[m[32m      });[m[41m[m
[32m+[m[32m      console.log(`   ✅ Fixed ${slug}: ${pkgGroup.length} records share document_id ${docId}`);[m[41m[m
[32m+[m[32m    } else if (!pkgGroup[0].document_id) {[m[41m[m
[32m+[m[32m      const docId = generateDocumentId();[m[41m[m
[32m+[m[32m      db.prepare('UPDATE packages SET document_id = ? WHERE id = ?')[m[41m[m
[32m+[m[32m        .run(docId, pkgGroup[0].id);[m[41m[m
[32m+[m[32m      pkgFixedCount++;[m[41m[m
[32m+[m[32m      console.log(`   ✅ Added document_id to ${slug}`);[m[41m[m
[32m+[m[32m    }[m[41m[m
[32m+[m[32m  });[m[41m[m
[32m+[m[41m[m
[32m+[m[32m  // ========================================[m[41m[m
[32m+[m[32m  // FIX MENU ITEMS[m[41m[m
[32m+[m[32m  // ========================================[m[41m[m
[32m+[m[32m  console.log('\n🍔 Fixing menu items...');[m[41m[m
[32m+[m[41m[m
[32m+[m[32m  const menuItems = db.prepare(`[m[41m[m
[32m+[m[32m    SELECT id, document_id, name[m[41m[m
[32m+[m[32m    FROM menu_items[m[41m[m
[32m+[m[32m    ORDER BY name, id[m[41m[m
[32m+[m[32m  `).all();[m[41m[m
[32m+[m[41m[m
[32m+[m[32m  const menuGroups = new Map();[m[41m[m
[32m+[m[32m  menuItems.forEach(item => {[m[41m[m
[32m+[m[32m    if (!menuGroups.has(item.name)) {[m[41m[m
[32m+[m[32m      menuGroups.set(item.name, []);[m[41m[m
[32m+[m[32m    }[m[41m[m
[32m+[m[32m    menuGroups.get(item.name).push(item);[m[41m[m
[32m+[m[32m  });[m[41m[m
[32m+[m[41m[m
[32m+[m[32m  let menuFixedCount = 0;[m[41m[m
[32m+[m[32m  menuGroups.forEach((itemGroup, name) => {[m[41m[m
[32m+[m[32m    if (itemGroup.length > 1) {[m[41m[m
[32m+[m[32m      const docId = itemGroup[0].document_id || generateDocumentId();[m[41m[m
[32m+[m[32m      itemGroup.forEach(item => {[m[41m[m
[32m+[m[32m        if (item.document_id !== docId) {[m[41m[m
[32m+[m[32m          db.prepare('UPDATE menu_items SET document_id = ? WHERE id = ?')[m[41m[m
[32m+[m[32m            .run(docId, item.id);[m[41m[m
[32m+[m[32m          menuFixedCount++;[m[41m[m
[32m+[m[32m        }[m[41m[m
[32m+[m[32m      });[m[41m[m
[32m+[m[32m      console.log(`   ✅ Fixed ${name}: ${itemGroup.length} records share document_id ${docId}`);[m[41m[m
[32m+[m[32m    } else if (!itemGroup[0].document_id) {[m[41m[m
[32m+[m[32m      const docId = generateDocumentId();[m[41m[m
[32m+[m[32m      db.prepare('UPDATE menu_items SET document_id = ? WHERE id = ?')[m[41m[m
[32m+[m[32m        .run(docId, itemGroup[0].id);[m[41m[m
[32m+[m[32m      menuFixedCount++;[m[41m[m
[32m+[m[32m      console.log(`   ✅ Added document_id to ${name}`);[m[41m[m
[32m+[m[32m    }[m[41m[m
[32m+[m[32m  });[m[41m[m
[32m+[m[41m[m
[32m+[m[32m  // ========================================[m[41m[m
[32m+[m[32m  // FIX GALLERY IMAGES[m[41m[m
[32m+[m[32m  // ========================================[m[41m[m
[32m+[m[32m  console.log('\n🖼️  Fixing gallery images...');[m[41m[m
[32m+[m[41m[m
[32m+[m[32m  const gallery = db.prepare(`[m[41m[m
[32m+[m[32m    SELECT id, document_id, title[m[41m[m
[32m+[m[32m    FROM gallery_images[m[41m[m
[32m+[m[32m    ORDER BY title, id[m[41m[m
[32m+[m[32m  `).all();[m[41m[m
[32m+[m[41m[m
[32m+[m[32m  const galleryGroups = new Map();[m[41m[m
[32m+[m[32m  gallery.forEach(img => {[m[41m[m
[32m+[m[32m    if (!galleryGroups.has(img.title)) {[m[41m[m
[32m+[m[32m      galleryGroups.set(img.title, []);[m[41m[m
[32m+[m[32m    }[m[41m[m
[32m+[m[32m    galleryGroups.get(img.title).push(img);[m[41m[m
[32m+[m[32m  });[m[41m[m
[32m+[m[41m[m
[32m+[m[32m  let galleryFixedCount = 0;[m[41m[m
[32m+[m[32m  galleryGroups.forEach((imgGroup, title) => {[m[41m[m
[32m+[m[32m    if (imgGroup.length > 1) {[m[41m[m
[32m+[m[32m      const docId = imgGroup[0].document_id || generateDocumentId();[m[41m[m
[32m+[m[32m      imgGroup.forEach(img => {[m[41m[m
[32m+[m[32m        if (img.document_id !== docId) {[m[41m[m
[32m+[m[32m          db.prepare('UPDATE gallery_images SET document_id = ? WHERE id = ?')[m[41m[m
[32m+[m[32m            .run(docId, img.id);[m[41m[m
[32m+[m[32m          galleryFixedCount++;[m[41m[m
[32m+[m[32m        }[m[41m[m
[32m+[m[32m      });[m[41m[m
[32m+[m[32m      console.log(`   ✅ Fixed ${title}: ${imgGroup.length} records share document_id ${docId}`);[m[41m[m
[32m+[m[32m    } else if (!imgGroup[0].document_id) {[m[41m[m
[32m+[m[32m      const docId = generateDocumentId();[m[41m[m
[32m+[m[32m      db.prepare('UPDATE gallery_images SET document_id = ? WHERE id = ?')[m[41m[m
[32m+[m[32m        .run(docId, imgGroup[0].id);[m[41m[m
[32m+[m[32m      galleryFixedCount++;[m[41m[m
[32m+[m[32m      console.log(`   ✅ Added document_id to ${title}`);[m[41m[m
[32m+[m[32m    }[m[41m[m
[32m+[m[32m  });[m[41m[m
[32m+[m[41m[m
[32m+[m[32m  db.exec('COMMIT');[m[41m[m
[32m+[m[41m[m
[32m+[m[32m  console.log('\n' + '='.repeat(60));[m[41m[m
[32m+[m[32m  console.log('✅ DOCUMENT_ID FIX COMPLETED!');[m[41m[m
[32m+[m[32m  console.log('='.repeat(60));[m[41m[m
[32m+[m[32m  console.log(`   🎉 Party Slots: ${fixedCount} fixed`);[m[41m[m
[32m+[m[32m  console.log(`   📦 Packages: ${pkgFixedCount} fixed`);[m[41m[m
[32m+[m[32m  console.log(`   🍔 Menu Items: ${menuFixedCount} fixed`);[m[41m[m
[32m+[m[32m  console.log(`   🖼️  Gallery Images: ${galleryFixedCount} fixed`);[m[41m[m
[32m+[m[32m  console.log('='.repeat(60) + '\n');[m[41m[m
[32m+[m[32m  console.log('✅ All duplicate records now share the same document_id!');[m[41m[m
[32m+[m[32m  console.log('   Check Strapi admin: http://localhost:1337/admin\n');[m[41m[m
[32m+[m[41m[m
[32m+[m[32m} catch (error) {[m[41m[m
[32m+[m[32m  db.exec('ROLLBACK');[m[41m[m
[32m+[m[32m  console.error('\n❌ Error:', error.message);[m[41m[m
[32m+[m[32m  console.error(error.stack);[m[41m[m
[32m+[m[32m  process.exit(1);[m[41m[m
[32m+[m[32m} finally {[m[41m[m
[32m+[m[32m  db.close();[m[41m[m
[32m+[m[32m}[m[41m[m
[1mdiff --git a/backend/insert-directly-fixed.js b/backend/insert-directly-fixed.js[m
[1mindex 551ed37..f782ae7 100644[m
[1m--- a/backend/insert-directly-fixed.js[m
[1m+++ b/backend/insert-directly-fixed.js[m
[36m@@ -1,396 +1,396 @@[m
[31m-const Database = require('better-sqlite3');[m
[31m-const path = require('path');[m
[31m-const crypto = require('crypto');[m
[31m-[m
[31m-const dbPath = path.join(__dirname, '.tmp', 'data.db');[m
[31m-const db = new Database(dbPath);[m
[31m-[m
[31m-console.log('🎉 Starting direct database insert...\n');[m
[31m-[m
[31m-// Helper functions[m
[31m-const now = () => new Date().toISOString();[m
[31m-const generateDocumentId = () => crypto.randomBytes(12).toString('base64url');[m
[31m-[m
[31m-try {[m
[31m-  // Start transaction[m
[31m-  db.exec('BEGIN TRANSACTION');[m
[31m-[m
[31m-  // ========================================[m
[31m-  // 1. INSERT PACKAGES[m
[31m-  // ========================================[m
[31m-  console.log('📦 Inserting packages...');[m
[31m-[m
[31m-  const packages = [[m
[31m-    {[m
[31m-      name: "Super Adventure Party",[m
[31m-      slug: "super-adventure-party",[m
[31m-      short_description: "Adventure-themed birthday experience.",[m
[31m-      full_description: "Obstacle course, games, and themed decorations.",[m
[31m-      duration_minutes: 120,[m
[31m-      price_per_child: 35,[m
[31m-      min_guests: 8,[m
[31m-      max_guests: 25,[m
[31m-    },[m
[31m-    {[m
[31m-      name: "Mega VIP Party",[m
[31m-      slug: "mega-vip-party",[m
[31m-      short_description: "Premium party with full VIP treatment.",[m
[31m-      full_description: "Exclusive room, premium menu, and more.",[m
[31m-      duration_minutes: 150,[m
[31m-      price_per_child: 50,[m
[31m-      min_guests: 10,[m
[31m-      max_guests: 30,[m
[31m-    },[m
[31m-    {[m
[31m-      name: "Princess Party",[m
[31m-      slug: "princess-party",[m
[31m-      short_description: "A magical experience for little princesses.",[m
[31m-      full_description: "Transform into royalty with dress-up, tiaras, and a royal tea party.",[m
[31m-      duration_minutes: 120,[m
[31m-      price_per_child: 40,[m
[31m-      min_guests: 6,[m
[31m-      max_guests: 15,[m
[31m-    },[m
[31m-    {[m
[31m-      name: "Superhero Training Camp",[m
[31m-      slug: "superhero-training-camp",[m
[31m-      short_description: "Train to become a superhero!",[m
[31m-      full_description: "Action-packed party with superhero training, games, and cape decorating.",[m
[31m-      duration_minutes: 120,[m
[31m-      price_per_child: 38,[m
[31m-      min_guests: 8,[m
[31m-      max_guests: 20,[m
[31m-    },[m
[31m-    {[m
[31m-      name: "Science Lab Party",[m
[31m-      slug: "science-lab-party",[m
[31m-      short_description: "Explosive fun with science experiments!",[m
[31m-      full_description: "Interactive science experiments with slime, volcanoes, and more.",[m
[31m-      duration_minutes: 90,[m
[31m-      price_per_child: 32,[m
[31m-      min_guests: 6,[m
[31m-      max_guests: 18,[m
[31m-    },[m
[31m-    {[m
[31m-      name: "Art Studio Party",[m
[31m-      slug: "art-studio-party",[m
[31m-      short_description: "Unleash creativity with art projects.",[m
[31m-      full_description: "Paint, create, and explore artistic talents with guided projects.",[m
[31m-      duration_minutes: 100,[m
[31m-      price_per_child: 30,[m
[31m-      min_guests: 5,[m
[31m-      max_guests: 16,[m
[31m-    },[m
[31m-    {[m
[31m-      name: "Sports Champions Party",[m
[31m-      slug: "sports-champions-party",[m
[31m-      short_description: "Active sports party for energetic kids.",[m
[31m-      full_description: "Multi-sport activities including soccer, basketball, and relay races.",[m
[31m-      duration_minutes: 120,[m
[31m-      price_per_child: 33,[m
[31m-      min_guests: 10,[m
[31m-      max_guests: 25,[m
[31m-    },[m
[31m-    {[m
[31m-      name: "Gaming Party",[m
[31m-      slug: "gaming-party",[m
[31m-      short_description: "Epic gaming tournament for gamers.",[m
[31m-      full_description: "Video game stations with popular multiplayer games and tournaments.",[m
[31m-      duration_minutes: 120,[m
[31m-      price_per_child: 35,[m
[31m-      min_guests: 6,[m
[31m-      max_guests: 16,[m
[31m-    },[m
[31m-    {[m
[31m-      name: "Dinosaur Discovery Party",[m
[31m-      slug: "dinosaur-discovery-party",[m
[31m-      short_description: "Journey back to prehistoric times!",[m
[31m-      full_description: "Dinosaur-themed adventure with fossil digging, games, and activities.",[m
[31m-      duration_minutes: 110,[m
[31m-      price_per_child: 36,[m
[31m-      min_guests: 8,[m
[31m-      max_guests: 20,[m
[31m-    },[m
[31m-    {[m
[31m-      name: "Dance Party Extravaganza",[m
[31m-      slug: "dance-party-extravaganza",[m
[31m-      short_description: "Dance, music, and lights show!",[m
[31m-      full_description: "Professional DJ, disco lights, and dance competitions.",[m
[31m-      duration_minutes: 120,[m
[31m-      price_per_child: 37,[m
[31m-      min_guests: 10,[m
[31m-      max_guests: 30,[m
[31m-    },[m
[31m-  ];[m
[31m-[m
[31m-  const insertPackage = db.prepare(`[m
[31m-    INSERT INTO packages ([m
[31m-      document_id, name, slug, short_description, full_description,[m
[31m-      duration_minutes, price_per_child, min_guests, max_guests,[m
[31m-      created_at, updated_at, published_at, created_by_id, updated_by_id, locale[m
[31m-    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NULL, NULL, NULL)[m
[31m-  `);[m
[31m-[m
[31m-  let packageCount = 0;[m
[31m-  for (const pkg of packages) {[m
[31m-    try {[m
[31m-      insertPackage.run([m
[31m-        generateDocumentId(),[m
[31m-        pkg.name,[m
[31m-        pkg.slug,[m
[31m-        pkg.short_description,[m
[31m-        pkg.full_description,[m
[31m-        pkg.duration_minutes,[m
[31m-        pkg.price_per_child,[m
[31m-        pkg.min_guests,[m
[31m-        pkg.max_guests,[m
[31m-        now(),[m
[31m-        now(),[m
[31m-        now()[m
[31m-      );[m
[31m-      console.log(`  ✅ ${pkg.name}`);[m
[31m-      packageCount++;[m
[31m-    } catch (err) {[m
[31m-      if (err.message.includes('UNIQUE constraint')) {[m
[31m-        console.log(`  ⏭️  ${pkg.name} (already exists)`);[m
[31m-      } else {[m
[31m-        console.error(`  ❌ ${pkg.name}: ${err.message}`);[m
[31m-      }[m
[31m-    }[m
[31m-  }[m
[31m-[m
[31m-  // ========================================[m
[31m-  // 2. INSERT MENU ITEMS[m
[31m-  // ========================================[m
[31m-  console.log('\n🍔 Inserting menu items...');[m
[31m-[m
[31m-  const menuItems = [[m
[31m-    // Food[m
[31m-    { name: "Mini Pizzas", category: "food", price_per_child: 5.5, description: "Personal size cheese pizza" },[m
[31m-    { name: "Hot Dogs", category: "food", price_per_child: 4.5, description: "Classic hot dogs with buns" },[m
[31m-    { name: "Pasta Bolognese", category: "food", price_per_child: 6.0, description: "Spaghetti with meat sauce" },[m
[31m-    { name: "Mac & Cheese", category: "food", price_per_child: 5.0, description: "Creamy macaroni and cheese" },[m
[31m-    { name: "Mini Burgers", category: "food", price_per_child: 6.5, description: "Slider burgers with cheese" },[m
[31m-    { name: "Fish Fingers", category: "food", price_per_child: 5.5, description: "Crispy breaded fish sticks" },[m
[31m-    { name: "Veggie Sticks & Dip", category: "food", price_per_child: 3.0, description: "Carrots, celery with ranch" },[m
[31m-    { name: "Cheese Quesadillas", category: "food", price_per_child: 5.0, description: "Grilled tortillas with melted cheese" },[m
[31m-    { name: "Popcorn Chicken", category: "food", price_per_child: 4.5, description: "Bite-sized crispy chicken" },[m
[31m-[m
[31m-    // Drinks[m
[31m-    { name: "Lemonade", category: "drinks", price_per_child: 2.5, description: "Fresh squeezed lemonade" },[m
[31m-    { name: "Milkshakes", category: "drinks", price_per_child: 4.0, description: "Chocolate, vanilla, or strawberry" },[m
[31m-    { name: "Soft Drinks", category: "drinks", price_per_child: 2.0, description: "Cola, sprite, or fanta" },[m
[31m-    { name: "Fruit Smoothies", category: "drinks", price_per_child: 4.5, description: "Mixed berry or tropical" },[m
[31m-    { name: "Hot Chocolate", category: "drinks", price_per_child: 3.0, description: "Warm cocoa with marshmallows" },[m
[31m-    { name: "Iced Tea", category: "drinks", price_per_child: 2.5, description: "Peach or lemon flavored" },[m
[31m-    { name: "Water Bottles", category: "drinks", price_per_child: 1.5, description: "Still or sparkling" },[m
[31m-[m
[31m-    // Desserts[m
[31m-    { name: "Ice Cream Sundae", category: "dessert", price_per_child: 4.0, description: "Vanilla ice cream with toppings" },[m
[31m-    { name: "Cupcakes", category: "dessert", price_per_child: 3.5, description: "Assorted flavored cupcakes" },[m
[31m-    { name: "Brownies", category: "dessert", price_per_child: 3.0, description: "Fudgy chocolate brownies" },[m
[31m-    { name: "Fruit Platter", category: "dessert", price_per_child: 3.5, description: "Fresh seasonal fruits" },[m
[31m-    { name: "Cookies", category: "dessert", price_per_child: 2.5, description: "Chocolate chip or sugar cookies" },[m
[31m-    { name: "Donuts", category: "dessert", price_per_child: 3.0, description: "Glazed and decorated donuts" },[m
[31m-    { name: "Candy Bar", category: "dessert", price_per_child: 5.0, description: "Assorted candy station" },[m
[31m-    { name: "P