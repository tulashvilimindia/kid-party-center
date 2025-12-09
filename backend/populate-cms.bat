@echo off
echo.
echo ========================================================
echo   ONE-CLICK CMS POPULATION
echo ========================================================
echo.
echo This will populate your CMS with:
echo   - 3 Site Settings (EN, KA, RU)
echo   - 21 Navigation Menus (7 items x 3 languages)
echo   - 3 Social Links
echo.
pause
echo.
node scripts/auto-populate.js
echo.
echo ========================================================
echo   DONE!
echo ========================================================
echo.
echo Next steps:
echo   1. Restart backend: npm run develop
echo   2. Open frontend: http://localhost:3000
echo   3. Test language switching!
echo.
pause
