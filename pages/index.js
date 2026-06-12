import { useState } from 'react';
import styles from '../styles/Home.module.css';
export default function Home() {
 const [symbol, setSymbol] = useState('');
 const [stock, setStock] = useState(null);
 const [loading, setLoading] = useState(false);
 const [error, setError] = useState('');
 const handleSearch = async (e) => {
   e.preventDefault();
   if (!symbol.trim()) return;
   setLoading(true);
   setError('');
   setStock(null);
   try {
     const res = await fetch(`/api/stock?symbol=${symbol}`);
     const data = await res.json();
     if (!res.ok) {
       setError(data.error || 'Stock not found');
       return;
     }
     setStock(data);
   } catch (err) {
     setError('Failed to fetch stock data');
   } finally {
     setLoading(false);
   }
 };
 return (
<div className={styles.container}>
<header className={styles.header}>
<h1>📊 Stock Market Analyzer</h1>
<p>Real-time stock data powered by Finnhub</p>
</header>
<main className={styles.main}>
<form onSubmit={handleSearch} className={styles.form}>
<input
           type="text"
           placeholder="Enter stock symbol (e.g., AAPL)"
           value={symbol}
           onChange={(e) => setSymbol(e.target.value.toUpperCase())}
           className={styles.input}
         />
<button type="submit" disabled={loading} className={styles.button}>
           {loading ? 'Loading...' : 'Search'}
</button>
</form>
       {error && <div className={styles.error}>{error}</div>}
       {stock && (
<div className={styles.stockCard}>
<h2>{stock.name}</h2>
<div className={styles.price}>${stock.price.toFixed(2)}</div>
<div className={parseFloat(stock.change) >= 0 ? styles.positive : styles.negative}>
             {stock.change} ({stock.changePercent}%)
</div>
<div className={styles.details}>
<div>Open: ${stock.open?.toFixed(2)}</div>
<div>High: ${stock.high?.toFixed(2)}</div>
<div>Low: ${stock.low?.toFixed(2)}</div>
<div>Volume: {(stock.volume / 1000000).toFixed(1)}M</div>
<div>P/E: {stock.pe?.toFixed(2)}</div>
<div>Market Cap: ${(stock.marketCap / 1000000000).toFixed(1)}B</div>
</div>
</div>
       )}
       {!stock && !error && <p className={styles.placeholder}>Search for a stock to get started</p>}
</main>
</div>
 );
}
