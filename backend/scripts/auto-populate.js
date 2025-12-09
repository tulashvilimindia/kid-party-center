/**
 * 🚀 One-Click Auto Population
 *
 * This script does EVERYTHING:
 * 1. Analyzes database
 * 2. Generates INSERT statements
 * 3. Runs the SQL
 * 4. Verifies the data
 *
 * Usage:
 *   node scripts/auto-populate.js
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

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
  execSync('node scripts/analyze-db.js', {
    cwd: path.join(__dirname, '..'),
    stdio: 'inherit'
  });

  // Step 2: Generate INSERT statements
  console.log('\n🎨 Step 2/4: Generating INSERT statements...\n');
  execSync('node scripts/generate-inserts.js', {
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

    const sqlite3 = require('sqlite3').verbose();
    const db = new sqlite3.Database(DB_PATH);
    const sql = fs.readFileSync(SQL_FILE, 'utf8');

    await new Promise((resolve, reject) => {
      db.exec(sql, (err) => {
        if (err) {
          reject(err);
        } else {
          console.log('✅ SQL executed successfully!\n');
          resolve();
        }
      });

      db.close();
    });
  }

  // Step 4: Verify
  console.log('🔍 Step 4/4: Verifying data...\n');

  const sqlite3 = require('sqlite3').verbose();
  const db = new sqlite3.Database(DB_PATH, sqlite3.OPEN_READONLY);

  const verifyQuery = (query, expectedCount, name) => {
    return new Promise((resolve, reject) => {
      db.get(query, [], (err, row) => {
        if (err) {
          reject(err);
        } else {
          const count = row ? Object.values(row)[0] : 0;
          const status = count >= expectedCount ? '✅' : '❌';
          console.log(`   ${status} ${name}: ${count} entries (expected: ${expectedCount})`);
          resolve(count >= expectedCount);
        }
      });
    });
  };

  Promise.all([
    verifyQuery('SELECT COUNT(*) FROM site_settings', 3, 'Site Settings'),
    verifyQuery('SELECT COUNT(*) FROM navigation_menus', 21, 'Navigation Menus'),
    verifyQuery('SELECT COUNT(*) FROM social_links', 3, 'Social Links')
  ]).then((results) => {
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
  }).catch(err => {
    db.close();
    console.error('\n❌ Verification failed:', err.message);
  });

} catch (error) {
  console.error('\n❌ Error:', error.message);
  console.log('\n💡 Try running the steps manually:');
  console.log('   1. node scripts/analyze-db.js');
  console.log('   2. node scripts/generate-inserts.js');
  console.log('   3. Run the generated SQL in VSCode\n');
  process.exit(1);
}
