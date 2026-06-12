// pages/index.js
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
      console.error(err);
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
            placeholder="Enter stock symbol (e.g., AAPL, GOOGL, TSLA)"
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
            <div className={styles.header2}>
              <div>
                <h2>{stock.name}</h2>
                <p className={styles.symbol}>{stock.symbol}</p>
              </div>
              <div className={styles.priceSection}>
                <div className={styles.price}>${stock.price.toFixed(2)}</div>
                <div
                  className={`${styles.change} ${
                    parseFloat(stock.change) >= 0 ? styles.positive : styles.negative
                  }`}
                >
                  {parseFloat(stock.change) >= 0 ? '📈' : '📉'} {stock.change} ({stock.changePercent}%)
                </div>
              </div>
            </div>

            <div className={styles.details}>
              <div className={styles.detail}>
                <span>Open</span>
                <strong>${stock.open?.toFixed(2) || 'N/A'}</strong>
              </div>
              <div className={styles.detail}>
                <span>High</span>
                <strong>${stock.high?.toFixed(2) || 'N/A'}</strong>
              </div>
              <div className={styles.detail}>
                <span>Low</span>
                <strong>${stock.low?.toFixed(2) || 'N/A'}</strong>
              </div>
              <div className={styles.detail}>
                <span>Volume</span>
                <strong>
                  {stock.volume ? (stock.volume / 1000000).toFixed(1) + 'M' : 'N/A'}
                </strong>
              </div>
              <div className={styles.detail}>
                <span>P/E Ratio</span>
                <strong>{stock.pe?.toFixed(2) || 'N/A'}</strong>
              </div>
              <div className={styles.detail}>
                <span>Market Cap</span>
                <strong>
                  {stock.marketCap ? '$' + (stock.marketCap / 1000000000).toFixed(1) + 'B' : 'N/A'}
                </strong>
              </div>
            </div>

            {stock.description && (
              <div className={styles.description}>
                <h3>About</h3>
                <p>{stock.description}</p>
              </div>
            )}

            {stock.industry && (
              <div className={styles.industry}>
                <strong>Industry:</strong> {stock.industry}
              </div>
            )}
          </div>
        )}

        {!stock && !error && (
          <div className={styles.placeholder}>
            <p>🔍 Search for a stock to get started</p>
            <p className={styles.examples}>Try: AAPL, MSFT, GOOGL, AMZN, TSLA</p>
          </div>
        )}
      </main>

      <footer className={styles.footer}>
        <p>Real-time data from Finnhub API • Not financial advice</p>
      </footer>
    </div>
  );
}
