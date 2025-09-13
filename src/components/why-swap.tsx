import { useMemo } from "react";
import { motion } from "framer-motion";
import { whySwap } from "../utils/constants/why-swap";
import CoinChain from "./coin-chain";
import SwapBestRate from "./swap-best-rate";
import Card from "./why-swap-card";


function WhySwap() {
    const memoizedWhySwap = useMemo(() => {
        return whySwap.map((item) => {
            return <Card key={item.title} title={item.title} desc={item.desc} imgUrl={item.icon} />;
        })
    }, [])
    return (
        <section className="mt-20 flex flex-col items-center justify-center w-full z-[999] relative">
            {/* Background decoration */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-20 left-1/4 w-96 h-96 bg-gradient-to-r from-orange-500/5 to-transparent rounded-full blur-3xl"></div>
            </div>

            <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-gradient text-[clamp(2rem,8vw,4rem)] max-w-[801px] font-bold text-center"
            >
                Why Swp.gg
            </motion.h1>

            <div className="flex flex-wrap items-center justify-center gap-4 mt-5">
                {memoizedWhySwap}
            </div>

            <div className="w-full">
                <SwapBestRate />
            </div>

            <div className="z-[999] w-full">
                <CoinChain defaultAcitve={"BTC to FLUX"} />
            </div>
        </section>
    );
}

export default WhySwap;
export { WhySwap };
