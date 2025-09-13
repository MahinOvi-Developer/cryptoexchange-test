import { memo, useEffect, useState } from "react";
import { TbArrowsDownUp } from "react-icons/tb";
import { FaQuestionCircle } from "react-icons/fa";
import MemoizedSelect from "./select-coins";
import { usePairData } from "../store/use-pair-data";
import useDebounce from "../hooks/use-debounce.hook";
import { useOffers } from "../store/use-offers";
import { useShowFixedRate } from "../store/use-show-fixed-rate";
import { CiLock, CiUnlock } from "react-icons/ci";
import { useChangePair } from "../store/use-change-pair";
import { motion } from "framer-motion";
import { useCryptoPrice, formatUSDPrice, getCoinIdFromSymbol } from "../hooks/use-crypto-price";

import { CoinData } from "../types";

const DEFAULT_COIN_FROM: Partial<CoinData> = {
    name: "Bitcoin",
    code: "BTC",
    icon: "https://content-api.changenow.io/uploads/btc_1_527dc9ec3c.svg",
    network: "btc",
}

const DEFAULT_COIN_TO: Partial<CoinData> = {
    name: "Ethereum",
    code: "ETH",
    icon: "https://content-api.changenow.io/uploads/eth_f4ebb54ec0.svg",
    network: "eth",
}


function SelectPair() {
    const [selectedCoinFrom, setSelectedCoinFrom] = useState(DEFAULT_COIN_FROM);
    const [selectedCoinTo, setSelectedCoinTo] = useState(DEFAULT_COIN_TO);
    const [amount, setAmount] = useState<number>(0.05);
    const { flag, setFlag } = useChangePair()
    const { setPairData } = usePairData()
    const [amountTo, setAmountTo] = useState<number>(flag === "to" ? 13 : 0);
    const { offers } = useOffers()
    const { showFixedRate, setShowFixedRate } = useShowFixedRate()

    const debouncedAmount = useDebounce<number>(amount, 1000)
    const debouncedAmountTo = useDebounce<number>(amountTo, 1000)

    // Fetch crypto prices for USD conversion
    const { data: priceData } = useCryptoPrice([
        selectedCoinFrom.code || 'BTC',
        selectedCoinTo.code || 'ETH'
    ]);

    const getUSDValue = (coinCode: string, coinAmount: number) => {
        const coinId = getCoinIdFromSymbol(coinCode || '');
        if (!coinId || !priceData?.[coinId]) return '≈ $0.00';
        return formatUSDPrice(coinAmount, priceData[coinId].usd);
    };

    console.log(selectedCoinFrom, selectedCoinTo)

    useEffect(() => {
        if (flag === "from") {
            if (!offers) return
            setAmountTo(offers[0]?.amountTo)
            setPairData({ from: selectedCoinFrom, to: selectedCoinTo, amount: debouncedAmount, amountTo: offers[0]?.amountTo, fromNetwork: String(selectedCoinFrom.network), toNetwork: String(selectedCoinTo.network) })
            return;
        }

        if (flag === "to") {
            if (!offers) return
            setAmount(offers[0]?.amountFrom)
            setPairData({ from: selectedCoinFrom, to: selectedCoinTo, amount: debouncedAmount, amountTo: debouncedAmountTo, fromNetwork: String(selectedCoinFrom.network), toNetwork: String(selectedCoinTo.network) })
            return;
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedCoinFrom, selectedCoinTo, debouncedAmount, offers, flag, debouncedAmountTo])

    const swapTokens = () => {
        setSelectedCoinFrom(selectedCoinTo)
        setSelectedCoinTo(selectedCoinFrom)
    }
    const toggleFixedRate = () => {
        setShowFixedRate(prev => !prev)
    }


    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
        >
            {/* From Section */}
            <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="space-y-4"
            >
                <div className="flex items-center justify-between">
                    <label className="text-white font-semibold text-lg flex items-center gap-2">
                        <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                        You Send
                    </label>
                    <div className="relative group">
                        <FaQuestionCircle size={16} className="text-white/60 hover:text-orange-500 cursor-pointer transition-colors" />
                        <div className="absolute right-0 top-8 w-64 p-3 glass-dark text-white text-sm rounded-2xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                            Can't find your coin? Search from 10,000+ supported cryptocurrencies!
                            <div className="absolute -top-1 right-4 w-2 h-2 bg-black/40 rotate-45"></div>
                        </div>
                    </div>
                </div>
                
                <div className="glass p-6 rounded-3xl border border-white/10 floating-card">
                    <div className="flex items-center justify-between mb-4">
                        <MemoizedSelect onChange={(coin) => setSelectedCoinFrom(coin)} defaultCoin={selectedCoinFrom} />
                        <div className="text-right">
                            <div className="text-white/60 text-sm">Balance</div>
                            <div className="text-white font-medium">-- {selectedCoinFrom.code}</div>
                        </div>
                    </div>
                    
                    <div className="relative">
                        <input
                            type="number"
                            name="from"
                            onChange={(e) => {
                                const value = e.target.value;
                                setAmount(parseFloat(value));
                                setFlag("from")
                            }}
                            value={amount}
                            readOnly={showFixedRate}
                            disabled={showFixedRate}
                            min={0}
                            step={0.05}
                            placeholder="0.00"
                            className="w-full bg-transparent border-0 text-white text-3xl font-bold placeholder-white/30 focus:outline-none disabled:opacity-50"
                        />
                        <div className="text-white/40 text-sm mt-1">
                            {getUSDValue(selectedCoinFrom.code || '', amount)}
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Swap Button */}
            <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex justify-center relative"
            >
                <motion.button 
                    onClick={swapTokens}
                    whileHover={{ scale: 1.1, rotate: 180 }}
                    whileTap={{ scale: 0.9 }}
                    className="btn-primary p-4 rounded-2xl shadow-2xl relative overflow-hidden group"
                >
                    <TbArrowsDownUp size={24} className="text-white relative z-10" />
                    <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-orange-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </motion.button>
                
                {/* Connecting line */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-px h-16 bg-gradient-to-b from-orange-500/50 to-transparent -z-10"></div>
            </motion.div>

            {/* To Section */}
            <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="space-y-4"
            >
                <div className="flex items-center justify-between">
                    <label className="text-white font-semibold text-lg flex items-center gap-2">
                        <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                        You Receive
                    </label>
                    <div className="flex items-center gap-2">
                        <div className="text-white/60 text-sm">Rate Mode:</div>
                        <motion.div 
                            onClick={toggleFixedRate}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="cursor-pointer flex items-center gap-2 glass px-3 py-1 rounded-full"
                        >
                            {showFixedRate ? 
                                <CiLock className="text-orange-500" size={16} /> : 
                                <CiUnlock className="text-green-500" size={16} />
                            }
                            <span className="text-white text-sm font-medium">
                                {showFixedRate ? 'Fixed' : 'Float'}
                            </span>
                        </motion.div>
                    </div>
                </div>
                
                <div className="glass p-6 rounded-3xl border border-white/10 floating-card">
                    <div className="flex items-center justify-between mb-4">
                        <MemoizedSelect onChange={(coin) => setSelectedCoinTo(coin)} defaultCoin={selectedCoinTo} />
                        <div className="text-right">
                            <div className="text-green-400 text-sm font-medium">Best Rate</div>
                            <div className="text-white/60 text-xs">Auto-selected</div>
                        </div>
                    </div>
                    
                    <div className="relative">
                        <input
                            type="number"
                            name="to"
                            onChange={(e) => {
                                const value = e.target.value;
                                setAmountTo(parseFloat(value));
                                setFlag("to")
                            }}
                            value={amountTo}
                            min={0}
                            placeholder="0.00"
                            className="w-full bg-transparent border-0 text-white text-3xl font-bold placeholder-white/30 focus:outline-none"
                        />
                        <div className="text-white/40 text-sm mt-1">
                            {getUSDValue(selectedCoinTo.code || '', amountTo)}
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Rate Info */}
            <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="glass p-4 rounded-2xl border border-white/5"
            >
                <div className="flex items-center justify-between text-sm">
                    <span className="text-white/60">Exchange Rate</span>
                    <span className="text-white font-medium">1 {selectedCoinFrom.code} ≈ {(amountTo / amount || 0).toFixed(6)} {selectedCoinTo.code}</span>
                </div>
                <div className="flex items-center justify-between text-sm mt-2">
                    <span className="text-white/60">Network Fee</span>
                    <span className="text-green-400 font-medium">Included</span>
                </div>
            </motion.div>
        </motion.div>
    );
}

const MemoizedSelectPair = memo(SelectPair);

export default MemoizedSelectPair;