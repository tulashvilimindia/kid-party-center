/**
 * 🚀 One-Click Auto Population (ES Module)
 *
 * This script does EVERYTHING:
 * 1. Analyzes database
 * 2. Generates INSERT statements
 * 3. Runs the SQL
 * 4. Verifies the data
 *
 * Usage:
 *   node scripts/auto-populate.mjs
 */

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const DB_PATH = path.join(__dirname, '../.tmp/data.db');
const SQL_FILE = path.join(__dirname, '3-generated-inserts.sql');

console.log('\n');
console.log('═══════════════════════════════════════════════════════');
console.log('  🚀 ONE-CLICK CMS AUTO-POPULATION');
console.log('═══════════════════════════════════════════════════════\n');

// Check if database exists
if (!fs.existsSync(DB_PATH)) {
  console.error('❌ Database not found!\n');
  console.log('💡 Please run "npm run develop" first to create the database.\n');
  process.exit(1);
}

console.log('✅ Database found\n');

try {
  // Step 1: Analyze database
  console.log('📊 Step 1/4: Analyzing database structure...\n');
  execSync('node scripts/analyze-db.mjs', {
    cwd: path.join(__dirname, '..'),
    stdio: 'inherit'
  });

  // Step 2: Generate INSERT statements
  console.log('\n🎨 Step 2/4: Generating INSERT statements...\n');
  execSync('node scripts/generate-inserts.mjs', {
    cwd: path.join(__dirname, '..'),
    stdio: 'inherit'
  });

  // Step 3: Run SQL
  console.log('\n💾 Step 3/4: Executing SQL...\n');

  // Check if sqlite3 CLI is available
  try {
    execSync('sqlite3 --version', { stdio: 'pipe' });

    // Use sqlite3 CLI
    execSync(`sqlite3 "${DB_PATH}" < "${SQL_FILE}"`, {
      cwd: path.join(__dirname, '..'),
      stdio: 'inherit',
      shell: true
    });

    console.log('✅ SQL executed successfully!\n');

  } catch (cliError) {
    // sqlite3 CLI not available, use Node.js
    console.log('⚠️  sqlite3 CLI not found, using Node.js method...\n');

    const { default: Database } = await import('better-sqlite3');
    const db = new Database(DB_PATH);
    const sql = fs.readFileSync(SQL_FILE, 'utf8');

    try {
      // Execute the entire SQL file (it already has BEGIN/COMMIT)
      db.exec(sql);
      console.log('✅ SQL executed successfully!\n');
    } catch (err) {
      console.error('❌ SQL execution failed:', err.message);
      throw err;
    } finally {
      db.close();
    }
  }

  // Step 4: Verify
  console.log('🔍 Step 4/4: Verifying data...\n');

  const { default: Database } = await import('better-sqlite3');
  const db = new Database(DB_PATH, { readonly: true });

  const verifyQuery = (query, expectedCount, name) => {
    try {
      const row = db.prepare(query).get();
      const count = row ? Object.values(row)[0] : 0;
      const status = count >= expectedCount ? '✅' : '❌';
      console.log(`   ${status} ${name}: ${count} entries (expected: ${expectedCount})`);
      return count >= expectedCount;
    } catch (err) {
      console.log(`   ❌ ${name}: Error - ${err.message}`);
      return false;
    }
  };

  const results = [
    verifyQuery('SELECT COUNT(*) FROM site_settings', 3, 'Site Settings'),
    verifyQuery('SELECT COUNT(*) FROM navigation_menus', 21, 'Navigation Menus'),
    verifyQuery('SELECT COUNT(*) FROM social_links', 3, 'Social Links')
  ];

  db.close();

  console.log('\n═══════════════════════════════════════════════════════');

  if (results.every(r => r)) {
    console.log('  ✅ ALL DATA POPULATED SUCCESSFULLY! 🎉');
    console.log('═══════════════════════════════════════════════════════\n');
    console.log('🎯 Next Steps:');
    console.log('   1. Restart backend: npm run develop');
    console.log('   2. Open frontend: http://localhost:3000');
    console.log('   3. Test language switching!');
    console.log('   4. Enjoy your multilingual CMS! 🌍\n');
  } else {
    console.log('  ⚠️  PARTIAL SUCCESS - PLEASE VERIFY');
    console.log('═══════════════════════════════════════════════════════\n');
    console.log('💡 Some data might be missing. Check Strapi Admin.\n');
  }

} catch (error) {
  console.error('\n❌ Error:', error.message);
  console.log('\n💡 Try running the steps manually:');
  console.log('   1. node scripts/analyze-db.mjs');
  console.log('   2. node scripts/generate-inserts.mjs');
  console.log('   3. Run the generated SQL in VSCode\n');
  process.exit(1);
}
