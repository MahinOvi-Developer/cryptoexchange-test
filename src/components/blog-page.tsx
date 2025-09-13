import BlogPageContent from "./blog-page-content";
import { MemoizedCryptoConverter } from "./crypto-converter";

export default function BlogPage() {
    return (
        <section className="mt-20 mb-5 flex flex-col items-center justify-center  w-full z-[999]">
            <div
                style={{ background: "linear-gradient(195.05deg, rgba(213, 102, 0, 0.1) 0%, rgba(255, 255, 255, 0.02) 50%, rgba(213, 102, 0, 0.06) 100%)" }}
                className="w-full max-w-[1186px] h-fit rounded-[32px] border border-[#D566001A]"
            >
                <BlogPageContent />
            </div>
            <div className="flex items-center justify-between gap-14 my-8 max-lg:flex-col z-[999]">
                <MemoizedCryptoConverter />
                <div className="w-full flex flex-col items-center justify-center">
                    <h1 className="text-white text-[clamp(1rem,10vw,4rem)] max-w-[801px] max-xl:text-center">
                        <span className="text-[#D56600]">Bitcoin</span> to <span className="text-[#D56600]">Monero</span> Converter
                    </h1>
                    <p className="text-white w-full max-w-[667px] max-xl:text-center max-xl:mt-4">
                        Today's exchange rate on the Swp.gg Bitcoin to Monero converter for 1 Bitcoin in Monero is365.2857, an increase of 2.736% in the last 24 hours. The BTC vs XMR chart compares
                        the exchange rate of Bitcoin to Monero and a table of cost dynamics as a percentage for the day, week, month, and year. How to swap Bitcoin to Monero easily: Find out how much
                        the value of 1 Bitcoin is currently worth in Monero (or in reverse) with the Swp.gg cryptocurrency converter and swap BTC for XMR instantly with no limits if you are satisfied
                        with the rate.
                    </p>
                </div>
            </div>
        </section>
    );
}
