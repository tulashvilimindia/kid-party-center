import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const DB_PATH = path.join(__dirname, '../.tmp/data.db');

const db = new Database(DB_PATH, { readonly: true });

console.log('\n=== NAVIGATION MENUS ===');
const navs = db.prepare('SELECT id, document_id, locale, label, published_at FROM navigation_menus LIMIT 10').all();
navs.forEach(n => console.log(JSON.stringify(n)));

console.log('\n=== SOCIAL LINKS ===');
const socials = db.prepare('SELECT id, document_id, platform, url, published_at FROM social_links').all();
socials.forEach(s => console.log(JSON.stringify(s)));

console.log('\n=== SITE SETTINGS ===');
const sites = db.prepare('SELECT id, document_id, locale, hero_title, published_at FROM site_settings').all();
sites.forEach(s => console.log(JSON.stringify(s)));

db.close();
