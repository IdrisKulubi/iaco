import { NextResponse } from 'next/server';

const POPULAR_CRYPTOS = [
  'BTCUSDT',
  'ETHUSDT',
  'BNBUSDT',
  'SOLUSDT',
  'XRPUSDT',
  'ADAUSDT',
  'DOGEUSDT',
  'DOTUSDT',
];

export async function GET() {
  try {
    const symbols = POPULAR_CRYPTOS.join(',');
    const response = await fetch(
      `https://api.binance.com/api/v3/ticker/24hr?symbols=[${symbols.split(',').map(s => `"${s}"`).join(',')}]`,
      { next: { revalidate: 10 } } // Cache for 10 seconds
    );

    if (!response.ok) {
      throw new Error('Failed to fetch crypto prices');
    }

    const data = await response.json();

    const formattedData = data.map((item: any) => ({
      symbol: item.symbol.replace('USDT', ''),
      name: getCryptoName(item.symbol),
      price: parseFloat(item.lastPrice).toFixed(2),
      change24h: parseFloat(item.priceChangePercent).toFixed(2),
      volume: parseFloat(item.volume).toFixed(0),
      high24h: parseFloat(item.highPrice).toFixed(2),
      low24h: parseFloat(item.lowPrice).toFixed(2),
    }));

    return NextResponse.json(formattedData);
  } catch (error) {
    console.error('Error fetching crypto prices:', error);
    return NextResponse.json(
      { error: 'Failed to fetch crypto prices' },
      { status: 500 }
    );
  }
}

function getCryptoName(symbol: string): string {
  const names: Record<string, string> = {
    BTCUSDT: 'Bitcoin',
    ETHUSDT: 'Ethereum',
    BNBUSDT: 'BNB',
    SOLUSDT: 'Solana',
    XRPUSDT: 'Ripple',
    ADAUSDT: 'Cardano',
    DOGEUSDT: 'Dogecoin',
    DOTUSDT: 'Polkadot',
  };
  return names[symbol] || symbol;
}
