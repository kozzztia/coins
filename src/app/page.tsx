import styles from "css/page.module.css";
import { request } from "http";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { Coin } from "types/coins";

async function fetchCoins() {
  const res = await fetch(`${process.env.API_BASE_URL}/api/coins`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0'
    },
    cache: 'no-store', // Make sure this fetches fresh data every time
  });

  if (!res.ok) {
    throw new Error('Failed to fetch coins');
  }

  const data = await res.json();
  return data.result;
}




export default async function Home() {
  const headersList = headers();
  // const domain = headersList.get('host') || "";
  const fullUrl = headersList.get('referer') || "";

  console.log(fullUrl);


  const coins: Coin[] = await fetchCoins();

  return (
    <main className={styles.main}>
      {coins.map((coin) => (
        <div key={coin.id}>
          <h1>{coin.name}</h1>
          <p>{coin.symbol}</p>
        </div>
      ))}
    </main>
  );
}