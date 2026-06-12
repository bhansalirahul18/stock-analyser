# 📊 Stock Market Analyzer

A simple, fast stock market analyzer using Next.js and Finnhub API.

## 🚀 Deploy to Vercel (2 Minutes)

### Step 1: Create GitHub Repository
1. Go to https://github.com/new
2. Repository name: `stock-analyzer`
3. Click **Create repository**

### Step 2: Upload Files to GitHub
1. Click **uploading an existing file**
2. Upload these files:
   - `package.json`
   - `next.config.js`
   - `.gitignore`
   - `.env.local` (with your API key)
   - Create folder `pages` and add `index.js`
   - Create folder `pages/api` and add `stock.js`
   - Create folder `styles` and add `Home.module.css`

### Step 3: Deploy to Vercel
1. Go to https://vercel.com
2. Click **New Project**
3. Import your GitHub repository
4. Click **Deploy**
5. Go to **Settings** → **Environment Variables**
6. Add:
   ```
   FINNHUB_API_KEY = your_api_key_here
   ```
7. Redeploy
8. Done! Your site is live! 🎉

## 📁 Project Structure

```
stock-analyzer/
├── pages/
│   ├── api/
│   │   └── stock.js
│   └── index.js
├── styles/
│   └── Home.module.css
├── .env.local
├── .gitignore
├── package.json
└── next.config.js
```

## 🎯 Features

✅ Search any stock symbol
✅ Real-time prices from Finnhub
✅ Stock details (P/E, Market Cap, Volume)
✅ Mobile responsive
✅ Beautiful dark theme
✅ Works on phone

## 🔑 Environment Variables

Add to Vercel Settings:
- `FINNHUB_API_KEY` - Your Finnhub API key

## 📝 How to Use

1. Enter stock symbol (e.g., AAPL, MSFT, GOOGL)
2. Click Search
3. See real-time data
4. Try more stocks!

## 🔗 Links

- Finnhub API: https://finnhub.io/
- Vercel Docs: https://vercel.com/docs
- Next.js Docs: https://nextjs.org/docs

---

**Built with Next.js + Finnhub API**
