@echo off
echo ==========================================
echo Running KidParty Seed Script
echo ==========================================
echo.

cd /d "%~dp0"
node seed.js

echo.
echo ==========================================
echo Seed script completed!
echo ==========================================
pause
