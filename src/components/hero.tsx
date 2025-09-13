import { motion } from "framer-motion"

function Hero() {
    return (
        <section className="w-full flex items-center mb-32 flex-col relative min-h-[90vh] justify-center">
            {/* Enhanced animated background elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div 
                    animate={{ 
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.6, 0.3],
                        rotate: [0, 180, 360]
                    }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute top-20 left-1/4 w-96 h-96 bg-gradient-to-r from-orange-500/20 to-purple-500/10 rounded-full blur-3xl"
                />
                <motion.div 
                    animate={{ 
                        scale: [1.2, 1, 1.2],
                        opacity: [0.2, 0.5, 0.2],
                        rotate: [360, 180, 0]
                    }}
                    transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                    className="absolute bottom-20 right-1/4 w-80 h-80 bg-gradient-to-l from-orange-600/15 to-blue-500/10 rounded-full blur-3xl"
                />
                <motion.div 
                    animate={{ 
                        y: [-20, 20, -20],
                        x: [-10, 10, -10],
                        opacity: [0.1, 0.3, 0.1]
                    }}
                    transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-orange-400/5 to-transparent rounded-full blur-3xl"
                />
            </div>

            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="glass-orange border border-[#D56600F2] grid place-items-center px-6 py-2 rounded-full text-sm z-20 floating-card animate-pulse-glow"
            >
                <span className="tag font-semibold">✨ Swp.gg - Best Rates Guaranteed</span>
            </motion.div>

            <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-[clamp(2.5rem,12vw,6rem)] font-bold text-gradient w-full max-w-[900px] text-center mt-8 z-20 leading-tight tracking-tight"
            >
                Compare and Swap Crypto at the
                <span className="block text-gradient animate-float"> Best Rates</span>
            </motion.h1>

            <motion.p 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-gray-300 max-w-[650px] mt-8 text-[clamp(1.1rem,20px,1.5rem)] text-center z-20 font-light leading-relaxed"
            >
                Discover the ultimate crypto exchange aggregator. Compare rates across 15+ exchanges, 
                save up to 5% on every swap, and enjoy lightning-fast transactions.
            </motion.p>

            <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="flex items-center justify-center gap-6 mt-12 z-20 flex-wrap"
            >
                <motion.a
                    initial={{ scale: 1 }}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    href="#swap"
                    className="btn-primary px-8 py-4 text-lg font-semibold rounded-2xl relative overflow-hidden group"
                >
                    <span className="relative z-10">🚀 Start Swapping</span>
                </motion.a>
                
                <motion.a
                    initial={{ scale: 1 }}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    href="https://t.me/swp_gg_support" 
                    target="_blank" 
                    className="btn-secondary px-8 py-4 text-lg font-medium rounded-2xl"
                >
                    💬 Get Support
                </motion.a>
            </motion.div>

            {/* Stats Section */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 z-20 w-full max-w-4xl"
            >
                <div className="glass text-center p-6 rounded-2xl floating-card">
                    <div className="text-3xl font-bold text-gradient mb-2">15+</div>
                    <div className="text-gray-300">Exchanges</div>
                </div>
                <div className="glass text-center p-6 rounded-2xl floating-card">
                    <div className="text-3xl font-bold text-gradient mb-2">$50M+</div>
                    <div className="text-gray-300">Volume Traded</div>
                </div>
                <div className="glass text-center p-6 rounded-2xl floating-card">
                    <div className="text-3xl font-bold text-gradient mb-2">99.9%</div>
                    <div className="text-gray-300">Uptime</div>
                </div>
            </motion.div>

            <motion.a 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 1.0 }}
                href="https://trustpilot.com/review/swp.gg" 
                target="_blank"  
                className="z-20 cursor-pointer glass-dark px-6 py-3 rounded-2xl floating-card mt-12"
            >
                <div className="flex items-center text-white">
                    <span className="mr-4 text-sm font-medium">⭐ Trusted by 10,000+ users</span> 
                    <img src="/imgs/Trustpilot_logo.png" width={120} height={35} alt="trust" className="select-none" draggable={false} />
                </div>
            </motion.a>

            {/* Enhanced background gradient */}
            <div className="h-full absolute top-0 w-[100vw] overflow-hidden left-0 opacity-20">
                <motion.img 
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                    src="/imgs/circled-gradient.png" 
                    draggable={false} 
                    alt="" 
                    className="max-w-[1400px] select-none relative top-0 -translate-x-1/2 left-1/2" 
                />
            </div>
        </section>
    );
}

export default Hero;
export { Hero };
