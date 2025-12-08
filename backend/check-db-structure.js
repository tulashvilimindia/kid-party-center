const Database = require('better-sqlite3');
const path = require('path');

const dbPath = path.join(__dirname, '.tmp', 'data.db');
const db = new Database(dbPath);

console.log('📊 Checking database structure...\n');

// Get all tables
const tables = db.prepare("SELECT name FROM sqlite_master WHERE type='table' ORDER BY name").all();

console.log('Tables found:');
tables.forEach(table => {
  console.log(`\n📋 Table: ${table.name}`);

  // Get column info for each table
  const columns = db.prepare(`PRAGMA table_info(${table.name})`).all();

  console.log('Columns:');
  columns.forEach(col => {
    console.log(`  - ${col.name} (${col.type}${col.notnull ? ', NOT NULL' : ''}${col.pk ? ', PRIMARY KEY' : ''})`);
  });
});

db.close();
