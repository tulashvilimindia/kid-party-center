/**
 * 🔍 Database Structure Analyzer
 *
 * This script:
 * 1. Connects to your SQLite database
 * 2. Runs structure analysis queries
 * 3. Saves results to a file
 * 4. You share the file, I generate perfect INSERT statements!
 *
 * Usage:
 *   node scripts/analyze-db.js
 */

const fs = require('fs');
const path = require('path');

// Database path
const DB_PATH = path.join(__dirname, '../.tmp/data.db');
const OUTPUT_FILE = path.join(__dirname, 'db-structure-analysis.txt');

// Import sqlite3
let sqlite3;
try {
  sqlite3 = require('sqlite3').verbose();
} catch (error) {
  console.error('\n❌ sqlite3 module not found!');
  console.log('\n📦 Installing sqlite3...\n');
  const { execSync } = require('child_process');
  execSync('npm install sqlite3', { stdio: 'inherit', cwd: path.join(__dirname, '..') });
  sqlite3 = require('sqlite3').verbose();
  console.log('\n✅ sqlite3 installed!\n');
}

// Analysis queries
const queries = {
  'All Tables': `
    SELECT name, type
    FROM sqlite_master
    WHERE type IN ('table', 'view')
    ORDER BY name;
  `,

  'Site Settings Structure': `
    SELECT
      name as column_name,
      type as data_type,
      [notnull] as is_required,
      dflt_value as default_value
    FROM pragma_table_info('site_settings');
  `,

  'Navigation Menus Structure': `
    SELECT
      name as column_name,
      type as data_type,
      [notnull] as is_required,
      dflt_value as default_value
    FROM pragma_table_info('navigation_menus');
  `,

  'Social Links Structure': `
    SELECT
      name as column_name,
      type as data_type,
      [notnull] as is_required,
      dflt_value as default_value
    FROM pragma_table_info('social_links');
  `,

  'Localization Tables': `
    SELECT name
    FROM sqlite_master
    WHERE type='table'
    AND name LIKE '%_localizations_lnk'
    ORDER BY name;
  `,

  'Site Settings Localizations Structure': `
    SELECT
      name as column_name,
      type as data_type
    FROM pragma_table_info('site_settings_localizations_lnk');
  `,

  'Navigation Menus Localizations Structure': `
    SELECT
      name as column_name,
      type as data_type
    FROM pragma_table_info('navigation_menus_localizations_lnk');
  `,

  'Existing Site Settings': `
    SELECT id, locale, created_at, updated_at
    FROM site_settings
    LIMIT 5;
  `,

  'Existing Navigation Menus': `
    SELECT id, label, path, locale, "order"
    FROM navigation_menus
    LIMIT 5;
  `,

  'Existing Social Links': `
    SELECT id, platform, url
    FROM social_links
    LIMIT 5;
  `,

  'Max IDs (for safe inserts)': `
    SELECT
      'site_settings' as table_name,
      COALESCE(MAX(id), 0) as max_id
    FROM site_settings
    UNION ALL
    SELECT
      'navigation_menus',
      COALESCE(MAX(id), 0)
    FROM navigation_menus
    UNION ALL
    SELECT
      'social_links',
      COALESCE(MAX(id), 0)
    FROM social_links;
  `,

  'Locales Configuration': `
    SELECT DISTINCT locale
    FROM site_settings
    UNION
    SELECT DISTINCT locale
    FROM navigation_menus;
  `
};

// Main function
async function analyzeDatabase() {
  console.log('\n═══════════════════════════════════════════════════════');
  console.log('  🔍 Database Structure Analyzer');
  console.log('═══════════════════════════════════════════════════════\n');

  // Check if database exists
  if (!fs.existsSync(DB_PATH)) {
    console.error(`❌ Database not found at: ${DB_PATH}`);
    console.log('\n💡 Make sure to run "npm run develop" at least once to create the database.\n');
    process.exit(1);
  }

  console.log(`✅ Found database: ${DB_PATH}\n`);

  // Open database
  const db = new sqlite3.Database(DB_PATH, sqlite3.OPEN_READONLY, (err) => {
    if (err) {
      console.error('❌ Error opening database:', err.message);
      process.exit(1);
    }
    console.log('✅ Database opened successfully\n');
  });

  let output = '';
  output += '═══════════════════════════════════════════════════════\n';
  output += '  STRAPI DATABASE STRUCTURE ANALYSIS\n';
  output += '═══════════════════════════════════════════════════════\n\n';
  output += `Database: ${DB_PATH}\n`;
  output += `Date: ${new Date().toISOString()}\n\n`;

  // Run all queries
  for (const [queryName, sql] of Object.entries(queries)) {
    console.log(`📊 Running: ${queryName}...`);

    try {
      const result = await runQuery(db, sql);

      output += '\n───────────────────────────────────────────────────────\n';
      output += `  ${queryName}\n`;
      output += '───────────────────────────────────────────────────────\n\n';

      if (result.length === 0) {
        output += '(No data found)\n';
      } else {
        // Format as table
        output += formatAsTable(result);
      }

      console.log(`   ✅ ${result.length} rows\n`);
    } catch (error) {
      output += `ERROR: ${error.message}\n`;
      console.log(`   ⚠️  ${error.message}\n`);
    }
  }

  output += '\n═══════════════════════════════════════════════════════\n';
  output += '  END OF ANALYSIS\n';
  output += '═══════════════════════════════════════════════════════\n';

  // Close database
  db.close((err) => {
    if (err) {
      console.error('Error closing database:', err.message);
    }
  });

  // Save to file
  fs.writeFileSync(OUTPUT_FILE, output, 'utf8');

  console.log('═══════════════════════════════════════════════════════');
  console.log('  ✅ ANALYSIS COMPLETE!');
  console.log('═══════════════════════════════════════════════════════\n');
  console.log(`📄 Results saved to: ${OUTPUT_FILE}\n`);
  console.log('🎯 Next steps:');
  console.log('   1. Open db-structure-analysis.txt');
  console.log('   2. Share the contents with Claude');
  console.log('   3. Claude will generate perfect INSERT statements!\n');
}

// Helper: Run query and return promise
function runQuery(db, sql) {
  return new Promise((resolve, reject) => {
    db.all(sql, [], (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows || []);
      }
    });
  });
}

// Helper: Format results as ASCII table
function formatAsTable(rows) {
  if (rows.length === 0) return '(No data)\n';

  const columns = Object.keys(rows[0]);
  const columnWidths = {};

  // Calculate column widths
  columns.forEach(col => {
    columnWidths[col] = Math.max(
      col.length,
      ...rows.map(row => String(row[col] || '').length)
    );
  });

  let table = '';

  // Header
  table += columns.map(col => col.padEnd(columnWidths[col])).join(' | ') + '\n';
  table += columns.map(col => '-'.repeat(columnWidths[col])).join('-+-') + '\n';

  // Rows
  rows.forEach(row => {
    table += columns.map(col => String(row[col] || '').padEnd(columnWidths[col])).join(' | ') + '\n';
  });

  return table;
}

// Run the analyzer
analyzeDatabase().catch(error => {
  console.error('\n❌ Fatal error:', error);
  process.exit(1);
});
