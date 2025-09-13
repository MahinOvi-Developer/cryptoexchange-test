import { memo, useMemo, useState, useEffect, useCallback } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { motion } from "framer-motion";
import { FaStar } from "react-icons/fa";
import { adapterDataFormatter } from "../utils/adapter-data-formatter";
import { useOfferData } from "../store/use-offer-data";
import { useOpenTransaction } from "../store/use-open-transaction";
import { useCryptoPrice, formatUSDPrice, getCoinIdFromSymbol } from "../hooks/use-crypto-price";
import { AdapterName, Transaction } from "../types";

function OfferComponent({ offers, ...rest }: Transaction) {
    const [savePercentage, setSavePercentage] = useState<number>(0)
    const { setIsOpen } = useOpenTransaction()
    const { setOfferData } = useOfferData()

    // Fetch crypto price for USD conversion
    const { data: priceData } = useCryptoPrice([rest.to || 'ETH']);

    const getUSDValue = (coinCode: string, coinAmount: number) => {
        const coinId = getCoinIdFromSymbol(coinCode || '');
        if (!coinId || !priceData?.[coinId]) return '≈ $0.00';
        return formatUSDPrice(coinAmount, priceData[coinId].usd);
    };

    useEffect(() => {
        const savePercentage = offers && offers.length > 0
            ? offers.reduce((_, curr) => {
                return Math.abs(((offers[0]?.amountTo - curr?.amountTo) / offers[0]?.amountTo) * 100);
            }, 0)
            : 0;
        setSavePercentage(parseFloat(savePercentage.toFixed(2)));
    }, [offers]);


    const handleExchangeMenu = useCallback(() => {
        setIsOpen(true)
        setOfferData(rest)
    }, [setIsOpen, setOfferData, rest])

    const memoizedStars = useMemo(() => {
        return [...Array(5)].map((_, index) => (
            <FaStar
                key={index}
                color={index < 5 ? "#D56600" : "#ccc"}
            />
        ))
    }, [])

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            whileHover={{ y: -4, scale: 1.01 }}
            className={`relative glass rounded-3xl border transition-all duration-300 floating-card group ${
                rest.bestRate 
                    ? "border-orange-500/40 bg-gradient-to-br from-orange-500/15 via-orange-500/5 to-transparent shadow-2xl shadow-orange-500/20" 
                    : "border-white/10 hover:border-white/25 hover:shadow-xl hover:shadow-white/5"
            }`}
            style={{ overflow: 'visible' }}
        >
            {rest.bestRate && (
                <motion.div 
                    initial={{ scale: 0, rotate: -10 }}
                    animate={{ scale: 1, rotate: 0 }}
                    className="absolute -top-2 -right-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white text-xs px-3 py-1.5 rounded-xl font-bold shadow-2xl border-2 border-white/30"
                    style={{ 
                        zIndex: 9999,
                        position: 'absolute',
                        transform: 'translateZ(0)'
                    }}
                >
                    ⭐ BEST RATE
                </motion.div>
            )}
            
            <div className="p-6">
                {/* Header with exchange info */}
                <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center gap-4">
                        <motion.div 
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            className="w-14 h-14 rounded-2xl glass p-3 flex items-center justify-center border border-white/10 shadow-lg"
                        >
                            <LazyLoadImage
                                src={adapterDataFormatter({ adapterName: rest.adapter as AdapterName }).icon}
                                alt="icon"
                                className="w-8 h-8 object-contain"
                            />
                        </motion.div>
                        <div className="flex-1">
                            <h3 className="text-white font-bold text-xl mb-1">
                                {adapterDataFormatter({ adapterName: rest.adapter as AdapterName }).name}
                            </h3>
                            <div className="flex items-center gap-2">
                                <div className="flex items-center gap-0.5">
                                    {memoizedStars.slice(0, 5).map((star, index) => (
                                        <motion.div
                                            key={index}
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            transition={{ delay: index * 0.05 }}
                                            className="text-xs"
                                        >
                                            {star}
                                        </motion.div>
                                    ))}
                                </div>
                                <span className="text-white/70 text-sm font-medium">Verified</span>
                            </div>
                        </div>
                    </div>
                    
                    <div className="flex flex-col items-end gap-2">
                        <div className={`text-xs font-bold px-3 py-1.5 rounded-full border ${
                            rest.isFloat 
                                ? 'bg-blue-500/20 text-blue-400 border-blue-500/30' 
                                : 'bg-green-500/20 text-green-400 border-green-500/30'
                        }`}>
                            {rest.isFloat ? "FLOATING" : "FIXED"}
                        </div>
                        {savePercentage > 0 && rest.bestRate && (
                            <motion.div 
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="text-green-400 text-xs font-bold bg-green-500/20 px-2 py-1 rounded-full border border-green-500/30"
                            >
                                Save {savePercentage}%
                            </motion.div>
                        )}
                    </div>
                </div>

                {/* Rate details */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="glass p-4 rounded-2xl border border-white/5 text-center">
                        <div className="text-white/60 text-xs font-medium mb-2">Processing Time</div>
                        <div className="text-white font-bold text-lg flex items-center justify-center gap-2">
                            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                            ~{rest.eta}min
                        </div>
                    </div>
                    <div className="glass p-4 rounded-2xl border border-white/5 text-center">
                        <div className="text-white/60 text-xs font-medium mb-2">Verification</div>
                        <div className="text-green-400 font-bold text-lg">No KYC</div>
                    </div>
                </div>

                {/* Amount and exchange button */}
                <div className="flex items-center justify-between pt-4 border-t border-white/10">
                    <div className="flex flex-col">
                        <div className="text-white/60 text-sm mb-1">You receive</div>
                        <div className="flex items-baseline gap-3">
                            <span className="text-white text-3xl font-bold">
                                {rest.amountTo?.toFixed(6)}
                            </span>
                            <span className="text-orange-400 font-bold text-xl">
                                {rest.to?.toUpperCase()}
                            </span>
                        </div>
                        <div className="text-white/50 text-sm mt-1 font-medium">
                            {getUSDValue(rest.to || '', rest.amountTo || 0)}
                        </div>
                    </div>
                    
                    <motion.button
                        onClick={handleExchangeMenu}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="btn-primary px-8 py-4 rounded-2xl font-bold text-lg shadow-2xl relative overflow-hidden group min-w-[120px]"
                    >
                        <span className="relative z-10">Exchange</span>
                        <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-orange-400 to-orange-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                            whileHover={{ scale: 1.05 }}
                        />
                    </motion.button>
                </div>
            </div>
        </motion.div>
    );
}


export const Offer = memo(OfferComponent);
export default Offer;