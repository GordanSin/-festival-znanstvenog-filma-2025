# Import Films to Production Database

Your festival has **20 films** exported and ready to import to production.

## Quick Import Guide

### Step 1: Open Production Database Connection

In Replit:
1. Go to the **Tools** menu (left sidebar)
2. Click **Secrets** 
3. Your production database credentials should be available when published

### Step 2: Run the Import Script

Open a new **Shell** tab in Replit and run:

```bash
tsx scripts/import-films.ts
```

**IMPORTANT:** Make sure you are connected to your production database before running this command. The script will:
- Load all 20 films from `films-data.json`
- Insert them into your production database
- Skip any duplicates automatically
- Show you progress as it imports

### Step 3: Verify the Import

The script will automatically show you:
- How many films were imported
- How many were skipped (if any existed)
- Total count in production database

## What This Imports

- **20 documentary films** about green jobs and ecology
- Complete film metadata (title, description, director, year, etc.)
- All poster images (as base64 data)
- Screening dates and locations
- Themes and categories

## Files Created

- `films-data.json` - Complete export of all 20 films (1.26 MB)
- `scripts/export-films.ts` - Export script (already run)
- `scripts/import-films.ts` - Import script (you run this)

## Troubleshooting

**If you see "Cannot find module" error:**
- Make sure you're in the project root directory
- Run: `cd /home/runner/$(ls -t /home/runner/ | head -1)`

**If films already exist:**
- The script automatically skips duplicates
- No data will be lost or overwritten

**If connection fails:**
- Verify DATABASE_URL is set to production
- Check your production database is provisioned
- Make sure your published app has database access

## Need to Re-Export?

If you make changes to development and want to export again:

```bash
tsx scripts/export-films.ts
```

This will update `films-data.json` with the latest data.

---

**Your festival is ready to go live!** 🎬🌱
