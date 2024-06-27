import fs from 'fs/promises';
import path from 'path';
import { NextRequest, NextResponse } from 'next/server';
import { Coin } from '@/types/coins';

const filePath = path.resolve(process.cwd(), 'src/app/api/coins/coins.json');


const setCorsHeaders = (headers: Headers) => {
  headers.set('Access-Control-Allow-Origin', '*');
  headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, FILTER');
  headers.set('Access-Control-Allow-Headers', 'Content-Type');
}



async function readCoinsFromFile() {
  try {
    const data = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading coins file:', error);
    throw error;
  }
}

async function findCoinsInFile(searchCoin: string) {
  try {
    const result = await readCoinsFromFile();
    return result.filter((coin: Coin) => coin.name.toLocaleLowerCase() === searchCoin.toLowerCase());
  } catch (error) {
    console.error('Error finding coins in file:', error);
    throw error;
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const name = searchParams.get('name');
    let result;

    if (name) {
      result = await findCoinsInFile(name);
    } else {
      result = await readCoinsFromFile();
    }

    const response = NextResponse.json({ result });
    setCorsHeaders(response.headers);
    return response;
  } catch (error) {
    const response = NextResponse.json({ error: 'Failed to fetch coins' }, { status: 500 });
    setCorsHeaders(response.headers);
    return response;
  }
}

