import { memo, useState, useMemo, useCallback } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { CiMenuBurger } from "react-icons/ci";
import { LINKS } from "../utils/constants/links";
import HeaderLink from "./header-link";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export const Header = memo(function Header() {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = useCallback(() => {
        setMenuOpen(!menuOpen);
    }, [menuOpen]);

    const headerLinks = useMemo(() => (
        LINKS.map((item, idx) => (
            <motion.li
                key={`${item}+${idx}`}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: idx * 0.1 }}
            >
                <HeaderLink name={item.name} url={item.link} type={item.type} />
            </motion.li>
        ))
    ), []);

    const mobileHeaderLinks = useMemo(() => (
        LINKS.map((item, idx) => (
            <motion.li
                key={`${item}+${idx}`}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: idx * 0.1 }}
            >
                <HeaderLink
                    name={item.name}
                    url={item.link}
                    type={item.type}
                    onClick={() => setMenuOpen(false)}
                />
            </motion.li>
        ))
    ), []);

    return (
        <motion.header 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="fixed top-4 left-4 right-4 z-[999999] mx-auto max-w-7xl"
        >
            <motion.div 
                className="flex justify-between items-center h-[80px] w-full glass border border-white/20 rounded-3xl px-8 floating-card"
                whileHover={{ y: -2 }}
                transition={{ duration: 0.3 }}
            >
                <Link href="/" className="flex items-center">
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <LazyLoadImage src="/imgs/logo.png" alt="logo" className="h-[40px]" />
                    </motion.div>
                </Link>
                
                <ul className="text-white flex items-center gap-8 max-lg:hidden">
                    {headerLinks}
                </ul>
                
                <motion.a
                    href="https://t.me/swp_gg_support"
                    target="_blank"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="btn-primary px-6 py-3 text-sm font-semibold rounded-2xl max-lg:hidden"
                >
                    💬 Support
                </motion.a>
                
                <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={toggleMenu}
                    className="lg:hidden cursor-pointer p-2 rounded-xl glass"
                >
                    <CiMenuBurger
                        color="white"
                        size={24}
                        className="hover:!text-[#D56600] transition-all"
                    />
                </motion.div>
            </motion.div>

            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: "100%" }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: "100%" }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="fixed top-0 right-0 w-full h-full glass-dark z-[999999999999] flex flex-col items-center justify-center"
                    >
                        <motion.div
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={toggleMenu}
                            className="absolute top-8 right-8 cursor-pointer p-2 rounded-xl glass"
                        >
                            <AiOutlineClose
                                color="white"
                                size={24}
                                className="hover:!text-[#D56600] transition-all"
                            />
                        </motion.div>
                        
                        <ul className="text-white flex flex-col items-center gap-8 z-[999999999999] mb-8">
                            {mobileHeaderLinks}
                        </ul>
                        
                        <motion.a
                            href="https://t.me/swp_gg_support"
                            target="_blank"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="btn-primary px-8 py-4 text-lg font-semibold rounded-2xl"
                            onClick={toggleMenu}
                        >
                            💬 Get Support
                        </motion.a>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.header>
    );
});
