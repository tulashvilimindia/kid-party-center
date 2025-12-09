/**
 * Quick data verification script
 */

import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const DB_PATH = path.join(__dirname, '../.tmp/data.db');

console.log('\n🔍 Checking database...\n');

try {
  const db = new Database(DB_PATH, { readonly: true });

  // Check counts
  const siteSettings = db.prepare('SELECT COUNT(*) as count FROM site_settings').get();
  const navMenus = db.prepare('SELECT COUNT(*) as count FROM navigation_menus').get();
  const socialLinks = db.prepare('SELECT COUNT(*) as count FROM social_links').get();

  console.log('📊 Entry Counts:');
  console.log(`   Site Settings: ${siteSettings.count}`);
  console.log(`   Navigation Menus: ${navMenus.count}`);
  console.log(`   Social Links: ${socialLinks.count}\n`);

  // Show actual data
  console.log('📄 Site Settings:');
  const sites = db.prepare('SELECT id, locale, hero_title FROM site_settings').all();
  sites.forEach(s => console.log(`   [${s.id}] ${s.locale}: ${s.hero_title}`));

  console.log('\n📄 Navigation Menus:');
  const navs = db.prepare('SELECT id, locale, label, path FROM navigation_menus ORDER BY "order", locale').all();
  navs.forEach(n => console.log(`   [${n.id}] ${n.locale}: ${n.label} → ${n.path}`));

  console.log('\n📄 Social Links:');
  const socials = db.prepare('SELECT id, platform, url FROM social_links').all();
  socials.forEach(s => console.log(`   [${s.id}] ${s.platform}: ${s.url}`));

  db.close();

  console.log('\n✅ Verification complete!\n');

} catch (error) {
  console.error('❌ Error:', error.message);
  process.exit(1);
}
