@echo off
echo.
echo ========================================================
echo   FIXING API PERMISSIONS
echo ========================================================
echo.
echo This will add public permissions for:
echo   - Navigation Menu
echo   - Social Links
echo.
echo IMPORTANT: Make sure Strapi backend is STOPPED!
echo            Press Ctrl+C in the backend terminal first.
echo.
pause

cd /d "%~dp0"
node scripts/fix-permissions.mjs

echo.
echo ========================================================
echo   Done! Now restart your backend:
echo   npm run develop
echo ========================================================
echo.
pause
