// import { CiHeart } from "react-icons/ci";
import "./index.css";

import { memo, useMemo } from "react";

import { FOOTER_LINKS } from "../../utils/constants/footer-links";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { usePairData } from "../../store/use-pair-data";

export const Footer = memo(function Footer() {
    const { pairData } = usePairData()

    const memoizedFooter = useMemo(() => {
        return Object.entries(FOOTER_LINKS).map(([category, items]) => (
            <div key={category} className="flex flex-col items-start justify-start p-4">
                <h1 className="text-[#FFFFFFE0] text-lg font-bold mb-2">{category}</h1>
                {items.map((item) => (
                    <a href={item.link} target={item.blank} key={item.name} className="text-[#FFFFFFE0] text-[14px]  mb-1 hover:underline">
                        {item.name}
                    </a>
                ))}
            </div>
        ))
    }, [])
    return (
        <footer className="relative ">
            <div className="absolute flex items-center  w-full h-full overflow-hidden  left-0 select-none max-lg:w-[100vw] ">
                <img src="/imgs/footer.png" alt="light" draggable="false" className="w-full max-lg:w-fit max-lg:max-w-fit" />
            </div>
            <section className="flex flex-col justify-center w-full h-full px-20 py-10 mt-40 footer max-lg:px-2 ">
                <div className="flex items-center justify-between w-full max-w-screen-xl px-5 mx-auto max-lg:flex-col">
                    <div className="z-[9999] flex flex-col justify-center items-start gap-10 max-lg:items-center">
                        <LazyLoadImage src="/imgs/logo.png" alt="logo" className=" h-[40px]" />

                        <p className="text-[16px] text-[#FFFFFFE0] w-[423px] max-lg:w-full text-start max-lg:text-center ">
                            Exchange {pairData?.from.name} to {pairData?.to.name} effortlessly with our user-friendly interface, generous rates, and no sign up.
                        </p>
                    </div>
                    <div className=" z-[9999] flex flex-wrap items-start max-lg:justify-start">
                        {memoizedFooter}
                    </div>
                </div>
                <div className="text-white border-t border-[#FFFFFF33] py-5 px-5 max-w-screen-xl mx-auto w-full flex max-md:flex-col gap-4 items-center justify-between">
                    <p className="text-[12px] text-[#FFFFFFE0]">
                        © 2024 <span className="text-[#D56600] text-[16px]">Swp.gg</span>. All rights reserved.
                    </p>
                    {/* <p className="flex items-center">
                        Made with <CiHeart size={20} color="#D56600" className="mx-2" /> <span>by</span>{" "}
                        <a href="https://focused-studio.com/" target="_blank" className="underline text-[#D56600] mx-2">
                            FocusedStudio
                        </a>
                    </p> */}
                </div>
            </section>
        </footer>
    );
})
