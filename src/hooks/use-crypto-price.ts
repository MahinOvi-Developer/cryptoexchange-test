import { useQuery } from '@tanstack/react-query';

interface CryptoPrice {
  [key: string]: {
    usd: number;
  };
}

const fetchCryptoPrice = async (coinIds: string[]): Promise<CryptoPrice> => {
  const ids = coinIds.join(',');
  const response = await fetch(
    `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd`
  );
  
  if (!response.ok) {
    throw new Error('Failed to fetch crypto prices');
  }
  
  return response.json();
};

// Mapping common crypto symbols to CoinGecko IDs
const SYMBOL_TO_ID_MAP: { [key: string]: string } = {
  'BTC': 'bitcoin',
  'ETH': 'ethereum',
  'USDT': 'tether',
  'USDC': 'usd-coin',
  'BNB': 'binancecoin',
  'ADA': 'cardano',
  'SOL': 'solana',
  'XRP': 'ripple',
  'DOT': 'polkadot',
  'DOGE': 'dogecoin',
  'AVAX': 'avalanche-2',
  'SHIB': 'shiba-inu',
  'MATIC': 'matic-network',
  'LTC': 'litecoin',
  'UNI': 'uniswap',
  'LINK': 'chainlink',
  'ATOM': 'cosmos',
  'ETC': 'ethereum-classic',
  'XLM': 'stellar',
  'BCH': 'bitcoin-cash',
  'ALGO': 'algorand',
  'VET': 'vechain',
  'ICP': 'internet-computer',
  'FIL': 'filecoin',
  'TRX': 'tron',
  'APT': 'aptos',
  'NEAR': 'near',
  'QNT': 'quant-network',
  'HBAR': 'hedera-hashgraph',
  'OP': 'optimism',
  'ARB': 'arbitrum',
  'MKR': 'maker',
  'GRT': 'the-graph',
  'LDO': 'lido-dao',
  'STX': 'blockstack'
};

export const useCryptoPrice = (symbols: string[]) => {
  const coinIds = symbols
    .map(symbol => SYMBOL_TO_ID_MAP[symbol.toUpperCase()])
    .filter(Boolean);

  return useQuery({
    queryKey: ['crypto-prices', coinIds],
    queryFn: () => fetchCryptoPrice(coinIds),
    refetchInterval: 30000, // Refetch every 30 seconds
    staleTime: 25000, // Consider data stale after 25 seconds
    enabled: coinIds.length > 0,
  });
};

export const formatUSDPrice = (amount: number, price: number): string => {
  const usdValue = amount * price;
  
  if (usdValue < 0.01) {
    return '< $0.01';
  } else if (usdValue < 1) {
    return `$${usdValue.toFixed(3)}`;
  } else if (usdValue < 1000) {
    return `$${usdValue.toFixed(2)}`;
  } else if (usdValue < 1000000) {
    return `$${(usdValue / 1000).toFixed(2)}K`;
  } else {
    return `$${(usdValue / 1000000).toFixed(2)}M`;
  }
};

export const getCoinIdFromSymbol = (symbol: string): string | undefined => {
  return SYMBOL_TO_ID_MAP[symbol.toUpperCase()];
};
