import { useOpenTransaction } from "../store/use-open-transaction";
import CreateOrder from "./create-order";
import { OffersList } from "./offers-list";
import { Swap } from "./swap";
import { motion } from "framer-motion"

export default function SwapNow() {
    const { isOpen } = useOpenTransaction()
    return (
        <section id="swap" className="py-20 flex flex-col items-center justify-center z-20 w-full relative">
            {/* Enhanced background decoration */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div 
                    animate={{ 
                        scale: [1, 1.1, 1],
                        opacity: [0.1, 0.2, 0.1],
                        rotate: [0, 90, 180, 270, 360]
                    }}
                    transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                    className="absolute top-10 right-1/3 w-96 h-96 bg-gradient-to-br from-orange-500/10 to-purple-500/5 rounded-full blur-3xl"
                />
                <motion.div 
                    animate={{ 
                        scale: [1.2, 1, 1.2],
                        opacity: [0.05, 0.15, 0.05],
                        x: [-50, 50, -50]
                    }}
                    transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute bottom-10 left-1/4 w-80 h-80 bg-gradient-to-tr from-blue-500/8 to-orange-400/8 rounded-full blur-3xl"
                />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center mb-12"
            >
                <motion.h1 
                    className="text-gradient text-[clamp(2.5rem,10vw,5rem)] max-w-[900px] font-bold text-center mb-6 leading-tight"
                >
                    Lightning Fast Swaps
                </motion.h1>
                
                <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="text-gray-300 max-w-[650px] mx-auto text-[clamp(1.1rem,20px,1.3rem)] font-light leading-relaxed"
                >
                    Compare rates across 15+ exchanges in real-time. Get the best price, 
                    lowest fees, and fastest execution for your crypto swaps.
                </motion.p>

                {/* Feature highlights */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="flex flex-wrap justify-center gap-6 mt-8"
                >
                    <div className="glass px-4 py-2 rounded-full">
                        <span className="text-orange-400 font-medium">⚡ Instant Swaps</span>
                    </div>
                    <div className="glass px-4 py-2 rounded-full">
                        <span className="text-orange-400 font-medium">💰 Best Rates</span>
                    </div>
                    <div className="glass px-4 py-2 rounded-full">
                        <span className="text-orange-400 font-medium">🔒 Secure</span>
                    </div>
                    <div className="glass px-4 py-2 rounded-full">
                        <span className="text-orange-400 font-medium">🚀 No KYC</span>
                    </div>
                </motion.div>
            </motion.div>

            {!isOpen ? (
                <motion.div 
                    whileInView={{ opacity: 1, y: 0 }} 
                    viewport={{ once: true }} 
                    initial={{ opacity: 0, y: 30 }} 
                    transition={{ duration: 0.8, delay: 0.6 }} 
                    className="flex items-start justify-between gap-8 h-fit max-xl:flex-col w-full mt-8 max-w-7xl"
                >
                    <motion.div 
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.8 }}
                        className="flex-1 max-xl:w-full"
                    >
                        <div className="glass p-8 rounded-3xl floating-card">
                            <div className="mb-6">
                                <h3 className="text-2xl font-bold text-white mb-2">Swap Interface</h3>
                                <p className="text-gray-400">Enter your swap details below</p>
                            </div>
                            <Swap />
                        </div>
                    </motion.div>
                    
                    <motion.div 
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 1.0 }}
                        className="flex-1 max-xl:w-full"
                    >
                        <div className="glass p-8 rounded-3xl floating-card">
                            <div className="text-center mb-6">
                                <h3 className="text-2xl font-bold text-white mb-2">Choose Best Offer</h3>
                                <p className="text-gray-400">Compare rates from top exchanges</p>
                            </div>
                            <OffersList />
                        </div>
                    </motion.div>
                </motion.div>
            ) : (
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="w-full max-w-2xl"
                >
                    <div className="glass p-8 rounded-3xl floating-card">
                        <CreateOrder />
                    </div>
                </motion.div>
            )}
        </section>
    );
}
