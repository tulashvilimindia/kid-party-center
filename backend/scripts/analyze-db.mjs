/**
 * 🔍 Database Structure Analyzer (ES Module)
 *
 * This script:
 * 1. Connects to your SQLite database
 * 2. Runs structure analysis queries
 * 3. Saves results to a file
 *
 * Usage:
 *   node scripts/analyze-db.mjs
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import Database from 'better-sqlite3';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Database path
const DB_PATH = path.join(__dirname, '../.tmp/data.db');
const OUTPUT_FILE = path.join(__dirname, 'db-structure-analysis.txt');

console.log('\n');
console.log('═══════════════════════════════════════════════════════');
console.log('  🔍 Database Structure Analyzer');
console.log('═══════════════════════════════════════════════════════\n');

// Check if database exists
if (!fs.existsSync(DB_PATH)) {
  console.error('❌ Database not found!');
  console.log('\n💡 Please run "npm run develop" first to create the database.\n');
  process.exit(1);
}

console.log(`✅ Found database: ${DB_PATH}\n`);

// Connect to database
const db = new Database(DB_PATH, { readonly: true });
console.log('✅ Database opened successfully\n');

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
      [notnull] as is_required
    FROM pragma_table_info('navigation_menus');
  `,

  'Social Links Structure': `
    SELECT
      name as column_name,
      type as data_type,
      [notnull] as is_required
    FROM pragma_table_info('social_links');
  `,

  'Site Settings Data (if any)': `
    SELECT id, locale, hero_title
    FROM site_settings
    LIMIT 5;
  `,

  'Navigation Menus Data (if any)': `
    SELECT id, label, locale, "order"
    FROM navigation_menus
    LIMIT 10;
  `,

  'Social Links Data (if any)': `
    SELECT id, platform, url
    FROM social_links
    LIMIT 5;
  `,

  'Localization Tables': `
    SELECT name
    FROM sqlite_master
    WHERE type='table' AND name LIKE '%localizations%'
    ORDER BY name;
  `,

  'Site Settings Localization Links': `
    SELECT * FROM site_settings_localizations_lnk LIMIT 5;
  `,

  'Navigation Menus Localization Links': `
    SELECT * FROM navigation_menus_localizations_lnk LIMIT 10;
  `,

  'Max IDs (for safe inserts)': `
    SELECT 'site_settings' as table_name, COALESCE(MAX(id), 0) as max_id FROM site_settings
    UNION ALL
    SELECT 'navigation_menus', COALESCE(MAX(id), 0) FROM navigation_menus
    UNION ALL
    SELECT 'social_links', COALESCE(MAX(id), 0) FROM social_links;
  `,

  'Database File Size': `
    SELECT page_count * page_size as size_bytes FROM pragma_page_count(), pragma_page_size();
  `
};

// Format table results
function formatTable(rows) {
  if (!rows || rows.length === 0) return '(No data)';

  const columns = Object.keys(rows[0]);
  const widths = columns.map(col => {
    const maxDataWidth = Math.max(...rows.map(r => String(r[col] || '').length));
    return Math.max(col.length, maxDataWidth);
  });

  let output = '';

  // Header
  output += columns.map((col, i) => col.padEnd(widths[i])).join(' | ') + '\n';
  output += widths.map(w => '-'.repeat(w)).join('-+-') + '\n';

  // Rows
  rows.forEach(row => {
    output += columns.map((col, i) => String(row[col] || '').padEnd(widths[i])).join(' | ') + '\n';
  });

  return output;
}

// Run all queries
let output = '';
output += '═══════════════════════════════════════════════════════\n';
output += 'DATABASE STRUCTURE ANALYSIS\n';
output += `Generated: ${new Date().toISOString()}\n`;
output += '═══════════════════════════════════════════════════════\n\n';

for (const [name, query] of Object.entries(queries)) {
  console.log(`📊 Running: ${name}...`);

  try {
    const rows = db.prepare(query).all();
    output += `\n${'='.repeat(60)}\n`;
    output += `${name}\n`;
    output += `${'='.repeat(60)}\n\n`;
    output += formatTable(rows) + '\n';

    console.log(`   ✅ ${rows.length} rows\n`);
  } catch (error) {
    output += `\n${'='.repeat(60)}\n`;
    output += `${name}\n`;
    output += `${'='.repeat(60)}\n\n`;
    output += `Error: ${error.message}\n\n`;
    console.log(`   ⚠️  Error: ${error.message}\n`);
  }
}

// Close database
db.close();

// Save to file
fs.writeFileSync(OUTPUT_FILE, output, 'utf8');

console.log('═══════════════════════════════════════════════════════');
console.log('  ✅ ANALYSIS COMPLETE!');
console.log('═══════════════════════════════════════════════════════\n');
console.log(`📄 Results saved to: ${OUTPUT_FILE}\n`);
console.log('🎯 Next steps:');
console.log('   1. Run: node scripts/generate-inserts.mjs');
console.log('   2. The script will generate perfect INSERT statements!\n');
