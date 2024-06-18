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


export async function GET(request: Request, response : Response) {
  try {
    const result = await readCoinsFromFile();
    const data = NextResponse.json({ result , status: 200}, { status: 200 });
    data.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    data.headers.set('Pragma', 'no-cache');
    data.headers.set('Expires', '0');
    return data


  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch coins' }, { status: 500 });
  }
}

