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
    const result = await readCoinsFromFile();
    const response = NextResponse.json({ result });

    response.headers.set('Access-Control-Allow-Origin', '*');
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type');

    return response;
  } catch (error) {
    const response = NextResponse.json({ error: 'Failed to fetch coins' }, { status: 500 });

    response.headers.set('Access-Control-Allow-Origin', '*');
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type');

    return response;
  }
}