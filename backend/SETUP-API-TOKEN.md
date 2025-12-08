# 🔐 Setup Secure API Token for Data Import

Better security approach: Create a dedicated API token instead of using public permissions.

## Step 1: Create API Token in Strapi

1. Open Strapi Admin: http://localhost:1337/admin
2. Go to **Settings** → **API Tokens**
3. Click **+ Create new API Token**
4. Fill in the details:
   - **Name**: `Data Importer`
   - **Description**: `Token for importing seed data`
   - **Token duration**: `Unlimited` (or set expiration if preferred)
   - **Token type**: `Full access` or `Custom`

### If using Custom token type:

Select permissions for each content type:
- **Package**:
  - ✅ `create`
  - ✅ `find`
  - ✅ `findOne`
- **Menu-item**:
  - ✅ `create`
  - ✅ `find`
  - ✅ `findOne`
- **Party-slot**:
  - ✅ `create`
  - ✅ `find`
  - ✅ `findOne`
- **Gallery-image**:
  - ✅ `create`
  - ✅ `find`
  - ✅ `findOne`

5. Click **Save**
6. **IMPORTANT**: Copy the generated token! It will only be shown once.

## Step 2: Save the Token

Create a `.env` file in the backend folder (if it doesn't exist):

```bash
cd /mnt/c/Users/MindiaTulashvili/OneDrive/Desktop/KidParty/backend
```

Add this line to `.env`:
```
STRAPI_API_TOKEN=your_token_here
```

Replace `your_token_here` with the actual token you copied.

## Step 3: Run Import with Token

```bash
node import-all.js
```

The scripts will automatically use the token from the `.env` file.

## 🔒 Security Benefits

✅ No public API access needed
✅ Token can be revoked anytime
✅ Token can have expiration date
✅ Specific permissions only
✅ Can track token usage in Strapi

## 📝 After Import

You can:
- Delete the API token (Settings → API Tokens → Delete)
- Or keep it for future data imports
- Remove the token from `.env` file for extra security

## Alternative: Use .env file directly

If you don't want to save in `.env`, you can pass it as environment variable:

```bash
STRAPI_API_TOKEN=your_token_here node import-all.js
```
