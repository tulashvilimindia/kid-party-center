#!/bin/bash
# Test Script - Run AFTER Backend Restart
# Date: December 11, 2025

echo "=================================================="
echo "Testing KidParty API Endpoints"
echo "=================================================="
echo ""

# Test 1: Navigation Menus
echo "Test 1: Navigation Menus"
echo "URL: http://localhost:1337/api/navigation-menus?locale=en"
STATUS=$(curl -s -o /dev/null -w "%{http_code}" "http://localhost:1337/api/navigation-menus?locale=en")
echo "Status: $STATUS"
if [ "$STATUS" = "200" ]; then
  echo "✅ PASS - Navigation menus working"
  COUNT=$(curl -s "http://localhost:1337/api/navigation-menus?locale=en" | grep -o '"id":' | wc -l)
  echo "   Found $COUNT navigation menu items"
else
  echo "❌ FAIL - Still getting $STATUS error"
fi
echo ""

# Test 2: Social Links
echo "Test 2: Social Links"
echo "URL: http://localhost:1337/api/social-links?locale=en"
STATUS=$(curl -s -o /dev/null -w "%{http_code}" "http://localhost:1337/api/social-links?locale=en")
echo "Status: $STATUS"
if [ "$STATUS" = "200" ]; then
  echo "✅ PASS - Social links working"
  COUNT=$(curl -s "http://localhost:1337/api/social-links?locale=en" | grep -o '"id":' | wc -l)
  echo "   Found $COUNT social links"
else
  echo "❌ FAIL - Still getting $STATUS error"
fi
echo ""

# Test 3: Navigation with Full Query
echo "Test 3: Navigation Menus (Full Query)"
echo "URL: http://localhost:1337/api/navigation-menus?populate=*&locale=en&filters[isActive][\$eq]=true&sort=order:asc"
STATUS=$(curl -s -o /dev/null -w "%{http_code}" "http://localhost:1337/api/navigation-menus?populate=*&locale=en&filters[isActive][\$eq]=true&sort=order:asc")
echo "Status: $STATUS"
if [ "$STATUS" = "200" ]; then
  echo "✅ PASS - Full query working"
else
  echo "❌ FAIL - Still getting $STATUS error"
fi
echo ""

# Test 4: Social Links with Full Query
echo "Test 4: Social Links (Full Query)"
echo "URL: http://localhost:1337/api/social-links?populate=*&locale=en&filters[isActive][\$eq]=true&sort=order:asc"
STATUS=$(curl -s -o /dev/null -w "%{http_code}" "http://localhost:1337/api/social-links?populate=*&locale=en&filters[isActive][\$eq]=true&sort=order:asc")
echo "Status: $STATUS"
if [ "$STATUS" = "200" ]; then
  echo "✅ PASS - Full query working"
else
  echo "❌ FAIL - Still getting $STATUS error"
fi
echo ""

# Test 5: Other Working Endpoints
echo "Test 5: Packages (Should already work)"
STATUS=$(curl -s -o /dev/null -w "%{http_code}" "http://localhost:1337/api/packages?locale=en")
echo "Packages: $STATUS"
if [ "$STATUS" = "200" ]; then
  echo "✅ PASS"
else
  echo "❌ FAIL - Packages broken too!"
fi
echo ""

echo "=================================================="
echo "Test Summary"
echo "=================================================="
echo ""
echo "If all tests show ✅ PASS, the fix is working!"
echo "If any show ❌ FAIL, backend might need another restart"
echo ""
