/**
 * Fix API Permissions - Add Public Access
 *
 * This script adds the missing public permissions for:
 * - navigation-menu (find, findOne)
 * - social-link (find, findOne)
 *
 * Run this with Strapi STOPPED!
 */

import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const DB_PATH = path.join(__dirname, '../.tmp/data.db');

console.log('\n╔════════════════════════════════════════════════════════╗');
console.log('║  🔧 FIX API PERMISSIONS - Add Public Access          ║');
console.log('╚════════════════════════════════════════════════════════╝\n');

try {
  const db = new Database(DB_PATH);

  console.log('✅ Connected to database\n');

  // Get the Public role ID
  const publicRole = db.prepare('SELECT id FROM up_roles WHERE type = ?').get('public');

  if (!publicRole) {
    console.error('❌ Public role not found!');
    process.exit(1);
  }

  console.log(`✅ Found Public role (ID: ${publicRole.id})\n`);

  // Get max ID for permissions
  const maxId = db.prepare('SELECT MAX(id) as max FROM up_permissions').get();
  let nextId = (maxId.max || 0) + 1;

  // Get current timestamp
  const now = new Date().toISOString();

  // Generate unique document IDs
  const generateDocId = () => {
    return Math.random().toString(36).substring(2, 15) +
           Math.random().toString(36).substring(2, 15);
  };

  // Permissions to add
  const permissionsToAdd = [
    { action: 'api::navigation-menu.navigation-menu.find' },
    { action: 'api::navigation-menu.navigation-menu.findOne' },
    { action: 'api::social-link.social-link.find' },
    { action: 'api::social-link.social-link.findOne' }
  ];

  console.log('📝 Adding permissions...\n');

  db.exec('BEGIN TRANSACTION;');

  try {
    const insertPermission = db.prepare(`
      INSERT INTO up_permissions (id, document_id, action, created_at, updated_at, published_at, locale)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `);

    const linkPermission = db.prepare(`
      INSERT INTO up_permissions_role_lnk (permission_id, role_id)
      VALUES (?, ?)
    `);

    for (const perm of permissionsToAdd) {
      const docId = generateDocId();

      // Insert permission
      insertPermission.run(
        nextId,
        docId,
        perm.action,
        now,
        now,
        now,
        null
      );

      // Link to public role
      linkPermission.run(nextId, publicRole.id);

      console.log(`   ✅ Added: ${perm.action}`);

      nextId++;
    }

    db.exec('COMMIT;');

    console.log('\n✅ All permissions added successfully!\n');

    // Verify
    console.log('🔍 Verifying permissions...\n');

    const count = db.prepare(`
      SELECT COUNT(*) as count
      FROM up_permissions p
      JOIN up_permissions_role_lnk r ON p.id = r.permission_id
      WHERE r.role_id = ? AND p.action LIKE 'api::%'
    `).get(publicRole.id);

    console.log(`   Total API permissions for Public role: ${count.count}\n`);

    if (count.count >= 4) {
      console.log('╔════════════════════════════════════════════════════════╗');
      console.log('║  ✅ SUCCESS! Permissions fixed!                       ║');
      console.log('╚════════════════════════════════════════════════════════╝\n');
      console.log('🎯 Next Steps:\n');
      console.log('   1. Start backend: npm run develop');
      console.log('   2. Refresh frontend: http://localhost:3000');
      console.log('   3. Check for 404 errors - they should be GONE! ✅\n');
    } else {
      console.log('⚠️  Warning: Expected at least 4 permissions, found', count.count);
    }

  } catch (err) {
    db.exec('ROLLBACK;');
    throw err;
  }

  db.close();

} catch (error) {
  console.error('\n❌ Error:', error.message);
  console.log('\n💡 Troubleshooting:');
  console.log('   1. Make sure Strapi backend is STOPPED');
  console.log('   2. Check database path is correct');
  console.log('   3. Try restarting and running again\n');
  process.exit(1);
}
