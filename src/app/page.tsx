import styles from "css/page.module.css";
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";
import { Coin } from "types/coins";

async function fetchCoins() {

  
  const result = await fetch(`${process.env.API_BASE_URL}/api/coins`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0'
    },
    cache: 'no-store', // Make sure this fetches fresh data every time
  });

  if (!result.ok) {
    throw new Error('Failed to fetch coins');
  }

  const data = await result.json();
  return data.result;
}

import path from 'path';

const filePath = path.resolve(process.cwd(), 'src/app/api/coins/coins.json');





export default async function Home() {


  const coins: Coin[] = await fetchCoins();

  const filePath = path.resolve(process.cwd(), 'src/app/api/coins/route.ts');

  console.log(filePath);

  return (
    <main className={styles.main}>
      <p>{filePath}</p>
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