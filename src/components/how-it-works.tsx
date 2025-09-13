import { useMemo } from "react";
import { usePairData } from "../store/use-pair-data";
import { NumberChart } from "../ui/number-chart";
import { GUIDE } from "../utils/constants/how-works";
import CoinChain from "./coin-chain";
import { MemoizedCryptoConverter } from "./crypto-converter";
import GuideCard from "./guide-card";
import { motion } from "framer-motion";


function HowItWorks() {
    const { pairData } = usePairData()

    const memoizedGuideCard = useMemo(() => {
        return GUIDE.map((title, idx) => {
            return (
                <motion.div
                    key={title}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: idx * 0.2 }}
                >
                    <GuideCard index={idx + 1} title={title} />
                </motion.div>
            );
        })
    }, []);

    return (
        <section className="py-20 flex flex-col items-center justify-center w-full relative">
            {/* Background decoration */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div 
                    animate={{ 
                        scale: [1, 1.1, 1],
                        opacity: [0.05, 0.1, 0.05],
                        rotate: [0, 180, 360]
                    }}
                    transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                    className="absolute top-1/4 left-1/3 w-[500px] h-[500px] bg-gradient-to-br from-orange-500/8 to-transparent rounded-full blur-3xl"
                />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="text-center mb-16"
            >
                <h1 className="text-gradient text-[clamp(2.5rem,10vw,5rem)] font-bold mb-6">How It Works</h1>
                <p className="text-gray-300 max-w-[600px] mx-auto text-lg leading-relaxed">
                    Get started with crypto swapping in just 3 simple steps. 
                    No registration required, lightning-fast execution.
                </p>
            </motion.div>

            <div className="flex items-center max-lg:justify-center justify-between gap-10 mt-10 p-2 flex-wrap overflow-hidden relative w-full max-w-6xl">
                {memoizedGuideCard}
            </div>

            <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="mt-20 w-full"
            >
                <CoinChain defaultAcitve={"BTC to VOLT"} />
                
                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="flex max-xl:flex-col max-xl:justify-center items-center justify-between gap-8 mt-16"
                >
                    <div className="flex xl:block flex-col items-center justify-center flex-1">
                        <h2 className="text-gradient text-[clamp(2rem,8vw,3.5rem)] font-bold max-w-[801px] max-xl:text-center mb-6">
                            Real-Time Exchange Rate
                        </h2>
                        <p className="text-gray-300 w-full max-w-[667px] max-xl:text-center text-lg leading-relaxed">
                            Monitor live {pairData?.from.code} to {pairData?.to.code} exchange rates with our advanced tracking system. 
                            Stay informed about market movements and make data-driven decisions for your crypto swaps.
                        </p>
                    </div>
                    
                    <motion.div 
                        whileHover={{ scale: 1.02 }}
                        className="glass p-6 w-full max-w-[483px] min-h-[372px] rounded-3xl floating-card flex-1"
                    >
                        <h3 className="text-white mb-4 font-bold text-2xl">
                            <span className="text-orange-400">{pairData?.amount}</span>
                            <span className="mx-2">{pairData?.from.code}</span>
                            →
                            <span className="mx-2 text-orange-400">{pairData?.amountTo}</span>
                            <span>{pairData?.to.code}</span>
                        </h3>
                        <div className="w-full relative flex rounded-2xl items-end justify-end">
                            <NumberChart currentNumber={pairData?.amountTo || 0} />
                        </div>
                    </motion.div>
                </motion.div>

                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                    className="flex items-center justify-between gap-16 mt-20 max-xl:flex-col max-xl:justify-center z-[999]"
                >
                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="glass p-8 rounded-3xl floating-card flex-1"
                    >
                        <MemoizedCryptoConverter />
                    </motion.div>
                    
                    <div className="w-full flex flex-col max-lg:items-center items-start justify-center flex-1">
                        <h2 className="text-gradient text-[clamp(2rem,8vw,3.5rem)] font-bold max-w-[801px] max-xl:text-center mb-6">
                            Advanced Converter
                        </h2>
                        <p className="text-gray-300 w-full max-w-[667px] max-xl:text-center text-lg leading-relaxed">
                            Experience our powerful {pairData?.from.code} to {pairData?.to.code} converter with real-time rates, 
                            historical data, and instant swap capabilities. Get the best value for your crypto with our 
                            intelligent rate comparison across multiple exchanges.
                        </p>
                    </div>
                </motion.div>
            </motion.div>
        </section>
    );
}

export default HowItWorks;
export { HowItWorks };
