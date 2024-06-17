'use client'
import styles from "css/page.module.css";
import { Coin } from "types/coins";
import { useEffect, useState } from "react";

export default function Home() {

  const [coins, setCoins] = useState<Coin[]>([]);


  useEffect(() => {
   fetch('http://localhost:3000/api/coins')
   .then(res => res.json().then(data=> setCoins(data.coins)))
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
