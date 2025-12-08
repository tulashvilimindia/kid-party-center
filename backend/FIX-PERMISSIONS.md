# 🔧 Fix API Permissions - Step by Step Guide

The 405 error means Strapi is blocking API POST requests. Here's how to fix it:

## Step 1: Open Strapi Admin

1. Make sure backend is running: `npm run develop`
2. Open: http://localhost:1337/admin
3. Log in with your admin credentials

## Step 2: Enable API Permissions

### For Packages:
1. Go to **Settings** (gear icon in sidebar)
2. Click **Users & Permissions Plugin** → **Roles**
3. Click **Public** role
4. Scroll down to **Package** section
5. Check these boxes:
   - ✅ `create`
   - ✅ `find`
   - ✅ `findOne`
6. Click **Save** at the top right

### For Menu Items:
1. Still in **Public** role settings
2. Scroll to **Menu-item** section
3. Check these boxes:
   - ✅ `create`
   - ✅ `find`
   - ✅ `findOne`
4. Click **Save**

### For Party Slots:
1. Still in **Public** role settings
2. Scroll to **Party-slot** section
3. Check these boxes:
   - ✅ `create`
   - ✅ `find`
   - ✅ `findOne`
4. Click **Save**

### For Gallery Images:
1. Still in **Public** role settings
2. Scroll to **Gallery-image** section
3. Check these boxes:
   - ✅ `create`
   - ✅ `find`
   - ✅ `findOne`
4. Click **Save**

## Step 3: Run Import Again

After enabling permissions, run:

```bash
cd /mnt/c/Users/MindiaTulashvili/OneDrive/Desktop/KidParty/backend
node import-all.js
```

## ✅ Success!

You should see:
```
✅ Created "Basic Fun Party"
✅ Created "Princess Party"
...
```

## 🔒 Security Note

After importing, you can disable the `create` permission for security:
1. Go back to **Settings** → **Roles** → **Public**
2. Uncheck `create` for all content types
3. Leave only `find` and `findOne` checked
4. Click **Save**

This prevents public users from creating content while still allowing them to view it.
