const { spawn } = require('child_process');

function runScript(scriptName) {
  return new Promise((resolve, reject) => {
    console.log(`\n${'='.repeat(60)}`);
    console.log(`Running: ${scriptName}`);
    console.log('='.repeat(60));

    const child = spawn('node', [scriptName], {
      stdio: 'inherit',
      shell: true
    });

    child.on('close', (code) => {
      if (code !== 0) {
        reject(new Error(`${scriptName} exited with code ${code}`));
      } else {
        resolve();
      }
    });

    child.on('error', (err) => {
      reject(err);
    });
  });
}

async function importAll() {
  console.log('\n');
  console.log('╔═══════════════════════════════════════════════════════════╗');
  console.log('║                                                           ║');
  console.log('║        🎉 KidParty Data Import - Starting...  🎉         ║');
  console.log('║                                                           ║');
  console.log('╚═══════════════════════════════════════════════════════════╝');
  console.log('\n');

  const scripts = [
    'import-packages.js',
    'import-menu-items.js',
    'import-party-slots.js',
    'import-gallery.js'
  ];

  try {
    for (const script of scripts) {
      await runScript(script);
      // Wait a bit between scripts
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    console.log('\n');
    console.log('╔═══════════════════════════════════════════════════════════╗');
    console.log('║                                                           ║');
    console.log('║        ✅ ALL IMPORTS COMPLETED SUCCESSFULLY! ✅         ║');
    console.log('║                                                           ║');
    console.log('║   Your KidParty backend is now fully populated with:     ║');
    console.log('║   • 10 Party Packages                                    ║');
    console.log('║   • 37 Menu Items                                        ║');
    console.log('║   • 60+ Party Slots                                      ║');
    console.log('║   • 20 Gallery Images                                    ║');
    console.log('║                                                           ║');
    console.log('║   Check your data at: http://localhost:1337/admin        ║');
    console.log('║                                                           ║');
    console.log('╚═══════════════════════════════════════════════════════════╝');
    console.log('\n');

  } catch (error) {
    console.error('\n❌ Import failed:', error.message);
    console.error('\nTroubleshooting:');
    console.error('1. Make sure Strapi is running (npm run develop)');
    console.error('2. Check that the API is accessible at http://localhost:1337');
    console.error('3. Verify that the content types exist in Strapi admin');
    console.error('4. Check if you need to enable public access to the APIs\n');
    process.exit(1);
  }
}

importAll();
