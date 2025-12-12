#!/usr/bin/env bash
BASE="http://localhost:1337/api"

################################
# CONTENT TYPES (YOUR DATA)
################################

# GET /gallery-images
curl -i -X GET "$BASE/gallery-images"

# GET /gallery-images/{id}
curl -i -X GET "$BASE/gallery-images/1"

# GET /menu-items
curl -i -X GET "$BASE/menu-items"

# GET /menu-items/{id}
curl -i -X GET "$BASE/menu-items/1"

# GET /packages
curl -i -X GET "$BASE/packages"

# GET /packages/{id}
curl -i -X GET "$BASE/packages/1"

# GET /party-slots
curl -i -X GET "$BASE/party-slots"

# GET /party-slots/{id}
curl -i -X GET "$BASE/party-slots/1"

# GET /site-setting  (single type)
curl -i -X GET "$BASE/site-setting"


################################
# SCHEMA / METADATA
################################

# GET /content-types
curl -i -X GET "$BASE/content-types"

# GET /content-types/{uid}
# (replace example-uid with real e.g. "api::packages.package")
curl -i -X GET "$BASE/content-types/example-uid"

# GET /components
curl -i -X GET "$BASE/components"

# GET /components/{uid}
# (replace example-uid with real e.g. "shared.social-link")
curl -i -X GET "$BASE/components/example-uid"


################################
# FILES / UPLOAD
################################

# GET /files
curl -i -X GET "$BASE/files"

# GET /files/{id}
curl -i -X GET "$BASE/files/1"

# DELETE /files/{id}
curl -i -X DELETE "$BASE/files/1"


################################
# I18N / LOCALES
################################

# GET /locales
curl -i -X GET "$BASE/locales"


################################
# PROVIDER CONNECT (if used)
################################

# GET /connect/(.*)
# (example for "github", adjust to your provider name)
curl -i -X GET "$BASE/connect/github"


################################
# AUTH (USERS-PERMISSIONS)
################################

# POST /auth/local (login, expects identifier/password)
curl -i -X POST "$BASE/auth/local" \
  -H "Content-Type: application/json" \
  -d '{"identifier":"test@example.com","password":"secret"}'

# POST /auth/local/register
curl -i -X POST "$BASE/auth/local/register" \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","email":"test@example.com","password":"secret"}'

# GET /auth/{provider}/callback
# (example for Google OAuth)
curl -i -X GET "$BASE/auth/google/callback"

# POST /auth/forgot-password
curl -i -X POST "$BASE/auth/forgot-password" \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com"}'

# POST /auth/reset-password
curl -i -X POST "$BASE/auth/reset-password" \
  -H "Content-Type: application/json" \
  -d '{"code":"reset-code","password":"newpass","passwordConfirmation":"newpass"}'

# GET /auth/email-confirmation
curl -i -X GET "$BASE/auth/email-confirmation?confirmation=some-token"

# POST /auth/send-email-confirmation
curl -i -X POST "$BASE/auth/send-email-confirmation" \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com"}'

# POST /auth/change-password
curl -i -X POST "$BASE/auth/change-password" \
  -H "Content-Type: application/json" \
  -d '{"currentPassword":"oldpass","password":"newpass","passwordConfirmation":"newpass"}'

# POST /auth/refresh
curl -i -X POST "$BASE/auth/refresh" \
  -H "Content-Type: application/json" \
  -d '{"refreshToken":"your-refresh-token"}'

# POST /auth/logout
curl -i -X POST "$BASE/auth/logout"


################################
# USERS
################################

# GET /users/count
curl -i -X GET "$BASE/users/count"

# GET /users
curl -i -X GET "$BASE/users"

# POST /users
curl -i -X POST "$BASE/users" \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser2","email":"test2@example.com","password":"secret"}'

# GET /users/me  (requires Authorization header if protected)
curl -i -X GET "$BASE/users/me"

# GET /users/{id}
curl -i -X GET "$BASE/users/1"

# PUT /users/{id}
curl -i -X PUT "$BASE/users/1" \
  -H "Content-Type: application/json" \
  -d '{"username":"updated-user"}'

# DELETE /users/{id}
curl -i -X DELETE "$BASE/users/1"


################################
# ROLES & PERMISSIONS
################################

# GET /roles
curl -i -X GET "$BASE/roles"

# POST /roles
curl -i -X POST "$BASE/roles" \
  -H "Content-Type: application/json" \
  -d '{"name":"custom-role","description":"Custom role"}'

# GET /roles/{id}
curl -i -X GET "$BASE/roles/1"

# PUT /roles/{role}
# (example role = "authenticated")
curl -i -X PUT "$BASE/roles/authenticated" \
  -H "Content-Type: application/json" \
  -d '{"name":"Authenticated","description":"Updated"}'

# DELETE /roles/{role}
curl -i -X DELETE "$BASE/roles/authenticated"

# GET /permissions
curl -i -X GET "$BASE/permissions"
