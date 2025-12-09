@echo off
echo ========================================
echo  KidParty CMS Auto-Setup Script
echo ========================================
echo.

echo Step 1: Updating admin credentials...
echo.
set /p email="Enter your Strapi admin email: "
set /p password="Enter your Strapi admin password: "

echo.
echo Step 2: Updating script with your credentials...

powershell -Command "(gc backend\scripts\populate-cms-data.js) -replace \"const ADMIN_EMAIL = '.*';\", \"const ADMIN_EMAIL = '%email%';\" | Out-File -encoding ASCII backend\scripts\populate-cms-data.js"
powershell -Command "(gc backend\scripts\populate-cms-data.js) -replace \"const ADMIN_PASSWORD = '.*';\", \"const ADMIN_PASSWORD = '%password%';\" | Out-File -encoding ASCII backend\scripts\populate-cms-data.js"

echo.
echo Step 3: Running population script...
echo.

cd backend
node scripts\populate-cms-data.js

echo.
echo ========================================
echo Done! Check the output above.
echo ========================================
pause
