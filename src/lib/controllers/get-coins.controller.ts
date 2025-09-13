import axios from "axios";

const popularCoins = [
    { name: "Bitcoin", code: "BTC" },
    { name: "Ethereum", code: "ETH" },
    { name: "Litecoin", code: "LTC" },
    { name: "Solana", code: "SOL" },
    { name: "Toncoin", code: "TON" },
    { name: "Tether(ERC20)", code: "usdt" },
];

export async function getCoinsInfo(searchParams: { search?: string; limit?: string }) {
    try {
        const { search, limit } = searchParams;

        const { data } = await axios.get(`https://api.changenow.io/v2/exchange/currencies?buy=true&sell=true`);


        let filteredData = data;
        if (search) {
            const searchLower = search.toLowerCase();
            filteredData = data.filter((coin: any) =>
                coin.name.toLowerCase().includes(searchLower) ||
                coin.ticker.toLowerCase().includes(searchLower) ||
                coin.network.toLowerCase().includes(searchLower)
            );
        }

        if (limit) filteredData = filteredData.slice(0, parseInt(limit));

        if (filteredData.length === 0 && data.length > 0) {
            filteredData = data.slice(0, parseInt(limit || '1000'));
        }

        const popularData = data.filter((coin: any) =>
            popularCoins.some(
                (popularCoin) =>
                    popularCoin.name.toLowerCase() === coin.name.toLowerCase() &&
                    (popularCoin.code === coin.ticker.toUpperCase())
            )
        );


        const formattedData = {
            filtered: filteredData.map((coin: any) => {
                const { image, ticker, ...rest } = coin;
                return {
                    ...rest,
                    code: ticker,
                    icon: image,
                };
            }),
            popular: popularData.map((coin: any) => {
                const { image, ticker, ...rest } = coin;
                return {
                    ...rest,
                    code: ticker,
                    icon: image,
                };
            }),
        };

        return formattedData;
    } catch (err) {
        console.error("Error from getCoinsInfo", err);
        throw err;
    }
}

export { getCoinsInfo as getCoins };
