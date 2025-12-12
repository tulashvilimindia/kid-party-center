@echo off
echo ================================================
echo Strapi Cache Clear and Rebuild
echo ================================================
echo.
echo This will:
echo 1. Clear Strapi cache folders
echo 2. Rebuild Strapi
echo 3. Start the server fresh
echo.
echo Make sure backend is STOPPED (Ctrl+C) before running!
echo.
pause

echo.
echo Step 1: Clearing cache folders...
if exist .cache rmdir /s /q .cache
if exist dist rmdir /s /q dist
if exist build rmdir /s /q build
if exist node_modules\.cache rmdir /s /q node_modules\.cache
echo ✅ Cache cleared

echo.
echo Step 2: Rebuilding Strapi...
call npm run build
if errorlevel 1 (
    echo ❌ Build failed! Check errors above.
    pause
    exit /b 1
)
echo ✅ Build complete

echo.
echo Step 3: Starting Strapi...
echo You can now test:
echo   curl http://localhost:1337/api/social-links
echo   curl http://localhost:1337/api/navigation-menus
echo.
call npm run develop
