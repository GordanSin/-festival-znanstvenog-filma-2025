# Import Films to Production Database

Your festival has **20 films** exported and ready to import to production.

## 🎯 Production Import Script

We've created a **safe, production-specific import script** that will guide you through the process step-by-step.

### Quick Start

Open a **Shell** in Replit and run:

```bash
tsx scripts/import-to-production.ts
```

The script will:
1. ✅ Ask you to paste your **production DATABASE_URL**
2. ⚠️  Confirm you want to proceed with production import
3. 📊 Check what's already in your production database
4. 🎬 Import all 20 films one by one with progress updates
5. ✅ Report detailed results

### How to Get Production Database URL

1. **Publish your app** on Replit first
2. Go to **Database pane** (left sidebar) → **Production tab**
3. Copy the **DATABASE_URL** (starts with `postgresql://`)
4. Paste it when the script prompts you

---

## 📚 Detailed Documentation

For complete step-by-step instructions, troubleshooting, and examples, see:

**→ [HOW-TO-IMPORT-PRODUCTION.md](./HOW-TO-IMPORT-PRODUCTION.md)**

---

## 🔒 Safety Features

- **Confirmation required** before any changes
- **Duplicate detection** - skips films that already exist
- **Error handling** - continues even if individual films fail
- **Safe for multiple runs** - won't create duplicates
- **Production-only** - explicitly prompts for production URL

---

## 📦 What Gets Imported

- **20 scientific documentary films** about green jobs and ecology
- Complete metadata (titles, descriptions, directors, producers, years)
- **High-quality poster images** (base64 encoded, 1.26 MB total)
- Screening dates and locations
- Film themes and categories

---

## 🔄 Alternative: Development Import

If you want to import to **development** database instead:

```bash
tsx scripts/import-films.ts
```

This uses your current `DATABASE_URL` which points to development.

---

## 📁 Files Available

- `films-data.json` - Complete export of all 20 films (1.26 MB)
- `scripts/export-films.ts` - Export script (creates films-data.json)
- `scripts/import-films.ts` - Import to development database
- `scripts/import-to-production.ts` - **Import to production** (use this!)

---

**Your festival is ready to go live!** 🎬🌱
