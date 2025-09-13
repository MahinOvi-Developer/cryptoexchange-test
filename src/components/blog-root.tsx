import { useMemo } from "react";
import { usePairData } from "../store/use-pair-data";
import { blogData } from "../utils/constants/blogs";
import { BlogCard } from "./blog-card";
import CoinChain from "./coin-chain";
import { MemoizedCryptoConverter } from "./crypto-converter";


export default function Blog() {
    const { pairData } = usePairData()
    const memoizedBlogs = useMemo(() => {
        return blogData.map((blog) => (
            <BlogCard key={blog.imgUrl} path={blog.path} imgUrl={blog.imgUrl} title={blog.title} date={blog.date} />
        ))
    }, [])
    return (
        <section className="mt-20 flex flex-col items-center justify-center  w-full z-[999]">
            <h1 className="text-gradient text-[clamp(1rem,10vw,4rem)] max-w-[801px] text-center">Welcome to our Blog</h1>
            <p className="text-[#FFFFFFE0] max-w-[579px] mt-4 text-[clamp(1rem,16px,2rem)] text-center z-20">Read on latest articles</p>
            <div className="my-10 flex items-center gap-5 flex-wrap justify-center z-[9999]">
                {memoizedBlogs}
            </div>
            <div className="z-[999] my-8 w-full px-5 max-w-[1250px]">
                <CoinChain defaultAcitve={"BTC to FLUX"} />
            </div>
            <div className="flex items-center justify-between gap-14 my-5 max-lg:flex-col z-[999]">
                <MemoizedCryptoConverter />

                <div className="w-full flex flex-col items-center justify-center">
                    <h1 className="text-white text-[clamp(1rem,10vw,4rem)] max-w-[801px] max-xl:text-center">
                        <span className="text-[#D56600]">{pairData?.from.name}</span> to <span className="text-[#D56600]">{pairData?.to.name}</span> Converter
                    </h1>
                    <p className="text-white w-full max-w-[1000px] max-xl:text-center max-xl:mt-4">
                        Today's exchange rate on the Swp.gg {pairData?.from.name} to {pairData?.to.name} converter for {pairData?.amount} {pairData?.from.name} in{" "}
                        {pairData?.to.name} is {pairData?.amountTo}, an increase of 2.736% in the last 24 hours. The {pairData?.from.code} vs {pairData?.to.code} chart compares the
                        exchange rate of {pairData?.from.name} to
                        {pairData?.to.name} and a table of cost dynamics as a percentage for the day, week, month, and year. How to swap {pairData?.from.name} to {pairData?.to.name} easily:
                        Find out how much the value of 1 {pairData?.from.name} is currently worth in {pairData?.to.name} (or in reverse) with the Swp.gg cryptocurrency converter and swap{" "}
                        {pairData?.from.code}
                        for {pairData?.to.code} instantly with no limits if you are satisfied with the rate.
                    </p>
                </div>
            </div>
        </section>
    );
}
