export default async function handler(req, res) {
 const { symbol } = req.query;
 if (!symbol) return res.status(400).json({ error: 'Symbol required' });
 const finnhubKey = process.env.FINNHUB_API_KEY;
 if (!finnhubKey) return res.status(500).json({ error: 'API key not configured' });
 try {
   const quoteRes = await fetch(
     `https://finnhub.io/api/v1/quote?symbol=${symbol.toUpperCase()}&token=${finnhubKey}`
   );
   const quote = await quoteRes.json();
   if (!quote.c) return res.status(404).json({ error: 'Stock not found' });
   const companyRes = await fetch(
     `https://finnhub.io/api/v1/stock/profile2?symbol=${symbol.toUpperCase()}&token=${finnhubKey}`
   );
   const company = await companyRes.json();
   const change = quote.c - quote.pc;
   const changePercent = ((change / quote.pc) * 100).toFixed(2);
   res.status(200).json({
     symbol: symbol.toUpperCase(),
     name: company.name || symbol,
     price: quote.c,
     change: change.toFixed(2),
     changePercent,
     open: quote.o,
     high: quote.h,
     low: quote.l,
     volume: quote.v,
     marketCap: company.marketCapitalization,
     pe: company.pe,
   });
 } catch (error) {
   res.status(500).json({ error: 'Failed to fetch data' });
 }
}
