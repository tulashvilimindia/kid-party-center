@echo off
REM Test Script - Run AFTER Backend Restart
REM Date: December 11, 2025

echo ==================================================
echo Testing KidParty API Endpoints
echo ==================================================
echo.

echo Test 1: Navigation Menus
echo URL: http://localhost:1337/api/navigation-menus?locale=en
curl -s -o NUL -w "Status: %%{http_code}" "http://localhost:1337/api/navigation-menus?locale=en"
echo.
echo.

echo Test 2: Social Links
echo URL: http://localhost:1337/api/social-links?locale=en
curl -s -o NUL -w "Status: %%{http_code}" "http://localhost:1337/api/social-links?locale=en"
echo.
echo.

echo Test 3: Navigation Menus (Full Query)
echo URL: http://localhost:1337/api/navigation-menus?populate=*^&locale=en^&filters[isActive][$eq]=true^&sort=order:asc
curl -s -o NUL -w "Status: %%{http_code}" "http://localhost:1337/api/navigation-menus?populate=*&locale=en&filters[isActive][$eq]=true&sort=order:asc"
echo.
echo.

echo Test 4: Social Links (Full Query)
echo URL: http://localhost:1337/api/social-links?populate=*^&locale=en^&filters[isActive][$eq]=true^&sort=order:asc
curl -s -o NUL -w "Status: %%{http_code}" "http://localhost:1337/api/social-links?populate=*&locale=en&filters[isActive][$eq]=true&sort=order:asc"
echo.
echo.

echo Test 5: Packages (Should already work)
curl -s -o NUL -w "Packages Status: %%{http_code}" "http://localhost:1337/api/packages?locale=en"
echo.
echo.

echo ==================================================
echo Test Complete
echo ==================================================
echo.
echo Expected: All tests should show "Status: 200"
echo If you see 404, backend needs restart!
echo.
pause
