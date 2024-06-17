import fs from 'fs/promises';
import path from 'path';
import { NextResponse } from 'next/server';


const filePath = path.resolve(process.cwd(), 'src/app/api/coins/coins.json');


async function readCoinsFromFile() {
  try {
    const data = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading coins file:', error);
    throw error;
  }
}


export async function GET() {
  try {
    const coins = await readCoinsFromFile();
    return NextResponse.json({ coins }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch coins' }, { status: 500 });
  }
}

