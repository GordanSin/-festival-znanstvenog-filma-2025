# 🎬 Import Films to Production Database

## Quick Guide

### Step 1: Publish Your App
Click the **Publish** button in Replit to create your production database.

### Step 2: Get Production Database URL
1. Go to **Database pane** (left sidebar)
2. Switch to **Production** tab
3. **Copy the DATABASE_URL** (starts with `postgresql://`)

### Step 3: Run Import Script

In the Shell, run this command (replace with your actual production URL):

```bash
PROD_DATABASE_URL="postgresql://your-production-url-here" tsx scripts/import-production.ts
```

**Example:**
```bash
PROD_DATABASE_URL="postgresql://user:pass@host.neon.tech/dbname" tsx scripts/import-production.ts
```

---

## What Gets Imported

✅ **20 documentary films** about green jobs and ecology  
✅ Complete metadata (titles, descriptions, directors, producers)  
✅ **High-quality poster images** (1.26 MB total)  
✅ Screening information and themes  
✅ Film durations, years, countries  

---

## Expected Output

```
═══════════════════════════════════════════════════════
🎬 PRODUCTION DATABASE IMPORT
═══════════════════════════════════════════════════════

✅ Production URL detected

📂 Loading film data from films-data.json...
✅ Loaded 20 films

🔍 Checking production database...
📊 Current films in production: 0

✓ 1. GENOVA LAB – PREDVIĐANJE EKSTREMNIH VREMENSKIH POJAVA
✓ 2. Budućnost Tehnologije
...
✓ 20. Eko Inovacije

═══════════════════════════════════════════════════════
✅ IMPORT COMPLETE!
═══════════════════════════════════════════════════════
📊 Total films: 20
✅ Successfully imported: 20
⊘ Skipped (duplicates): 0
✗ Errors: 0

🔍 Total films in production: 20

🎉 Production database is ready!
```

---

## Safety Features

✅ **Duplicate detection** - Skips films that already exist  
✅ **Error handling** - Continues even if individual films fail  
✅ **Safe for multiple runs** - Won't create duplicates  
✅ **No interactive prompts** - Just set environment variable and run  

---

## Troubleshooting

### "PROD_DATABASE_URL not set"
Make sure you include the environment variable:
```bash
PROD_DATABASE_URL="your-url" tsx scripts/import-production.ts
```

### "Connection failed"
- Verify production database URL is correct
- Ensure app is published and database is accessible
- Check that URL starts with `postgresql://` or `postgres://`

### "films-data.json not found"
- Make sure you're in the project root directory
- File should be 1.3 MB with all film data

---

## After Import

Your production website will display:
- ✅ All 20 films in the carousel
- ✅ Complete film details with posters
- ✅ Multi-language support (Croatian, English, Italian)
- ✅ Screening information

**Your festival website is live!** 🌱🎬✨
