# 🎬 How to Import Films to Production Database

Your festival website has **20 films** ready to import to production!

## ✅ Prerequisites

1. **Publish your app** on Replit first (this creates your production database)
2. Have `films-data.json` in your project root (already created with 1.26 MB of data)
3. Access to your production database URL

---

## 🚀 Step-by-Step Import Process

### Step 1: Publish Your App

1. Click the **"Publish"** button in Replit
2. Wait for deployment to complete
3. Your production database will be created automatically

### Step 2: Get Production Database URL

1. Go to **Database pane** (left sidebar)
2. Switch to **"Production"** tab
3. Look for **DATABASE_URL** in the connection details
4. **Copy the entire URL** (starts with `postgresql://` or `postgres://`)

### Step 3: Run the Import Script

Open a **Shell** in Replit and run:

```bash
tsx scripts/import-to-production.ts
```

### Step 4: Follow the Prompts

The script will:
1. ✅ Ask you to paste your production DATABASE_URL
2. ⚠️  Confirm you want to proceed
3. 📊 Check what's already in production
4. 🎬 Import all 20 films one by one
5. ✅ Report detailed results

---

## 🎯 What Gets Imported

- **20 scientific documentary films** about green jobs and ecology
- Complete metadata: titles, descriptions, directors, producers
- Film details: country, year, duration, category
- **Poster images** (base64 encoded)
- Screening dates and locations
- Themes and categories

---

## 🔒 Safety Features

✅ **Confirmation required** - You must type "yes" to proceed  
✅ **Duplicate detection** - Skips films that already exist  
✅ **Error handling** - Continues even if individual films fail  
✅ **Safe for multiple runs** - Won't create duplicates  
✅ **Production-only** - Prompts for production URL explicitly  

---

## 📊 Expected Output

```
═══════════════════════════════════════════════════════
🎬 PRODUCTION DATABASE IMPORT SCRIPT
═══════════════════════════════════════════════════════

Enter your PRODUCTION DATABASE_URL: postgresql://[your-url]
✅ Database URL received

⚠️  Are you SURE this is your PRODUCTION database? yes

🚀 Starting import...

📂 Loading film data from films-data.json...
✅ Loaded 20 films from file

🔍 Checking production database...
📊 Current films in production: 0

✓ 1. Dobar posao
✓ 2. Budućnost Tehnologije
...
✓ 20. Eko Inovacije

═══════════════════════════════════════════════════════
✅ IMPORT COMPLETE!
═══════════════════════════════════════════════════════
📊 Total films in file: 20
✅ Successfully imported: 20
⊘ Skipped (duplicates): 0
✗ Errors: 0

🔍 Total films now in production: 20

🎉 Your production database is ready!
```

---

## 🔧 Troubleshooting

### "DATABASE_URL invalid format"
- Make sure you copied the entire URL
- URL must start with `postgresql://` or `postgres://`

### "films-data.json not found"
- Ensure you're in the project root directory
- File should be 1.26 MB with all film data

### "Connection failed"
- Verify your production database is published and accessible
- Check that you copied the production URL (not development)
- Ensure the database is running

### "Films already exist"
- The script will skip duplicates automatically
- Safe to run multiple times
- No data will be lost or overwritten

---

## 📝 Alternative Method: Using Database Pane

If you prefer a manual approach:

1. Go to **Database pane** → **Production tab**
2. Click **"My data"**
3. Toggle **"Edit"** mode
4. Manually insert records or use bulk import tools

---

## ✨ After Import

Once imported, your production website will display:
- All 20 films in the carousel
- Complete film details with posters
- Screening information
- Multi-language support (Croatian, English, Italian)

**Your festival website is ready to go live!** 🌱🎬
