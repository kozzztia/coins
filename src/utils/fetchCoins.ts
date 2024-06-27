export async function fetchCoins() {

  
    const result = await fetch(`${process.env.API_BASE_URL}/api/coins`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      },
      cache: 'no-store', 
    });
  
    if (!result.ok) {
      throw new Error('Failed to fetch coins');
    }
  
    const data = await result.json();
    console.log(data);
    return data.result;
  }
  