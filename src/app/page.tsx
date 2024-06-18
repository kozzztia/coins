'use client'
import styles from "css/page.module.css";
import { Coin } from "types/coins";
import { useEffect, useState } from "react";

export default function Home() {
  const [coins, setCoins] = useState<Coin[]>([]);

  useEffect(() => {
    fetch('/api/coins', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    })
    .then(res => res.json())
    .then(data => setCoins(data.result))
    .catch(err => console.error('Failed to fetch coins:', err));
  }, []);

  return (
    <main className={styles.main}>
      {coins?.map((coin: Coin) => (
        <div key={coin.id}>
          <h1>{coin.name}</h1>
          <p>{coin.symbol}</p>
        </div>
      ))}
    </main>
  );
}