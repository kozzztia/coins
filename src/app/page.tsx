import Image from "next/image";
import styles from "css/page.module.css";
import { Coin } from "types/coins";

export default async function Home() {
  const coins = await fetch('http://localhost:3000/api/coins').then(res => res.json());

  return (
    <main className={styles.main}>
      {coins.coins.map((coin: Coin) => (
        <div key={coin.id}>
          <h1>{coin.name}</h1>
          <p>{coin.symbol}</p>
        </div>
      ))}
    </main>
  );
}
