import { fetchCoins } from "utils/fetchCoins";
import styles from "css/page.module.css";
import { Coin } from "types/coins";




export default async function Home() {
  

  const coins: Coin[] = await fetchCoins();

  return (
    <main className={styles.main}>
            <ul>
      {coins.map((coin) => (
        <div key={coin.id}>
          <h1>{coin.name}</h1>
          <p>{coin.symbol}</p>
        </div>
      ))}
      </ul>
    </main>
  );
}