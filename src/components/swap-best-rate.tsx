import { usePairData } from "../store/use-pair-data";

export default function SwapBestRate() {
    const { pairData } = usePairData()
    return (
        <div
            style={{ background: "linear-gradient(195.05deg, rgba(213, 102, 0, 0.1) 0%, rgba(255, 255, 255, 0.02) 50%, rgba(213, 102, 0, 0.06) 100%)" }}
            className="w-full  min-h-[511px] my-8 border border-[#D566001A] rounded-[32px] p-5 z-[999]"
        >
            <div className="flex flex-col items-center justify-center">
                <h2 className="text-white text-[60px] text-center my-6">
                    How to swap <span className="text-[#D56600]">{pairData?.from.code}</span> to <span className="text-[#D56600]">{pairData?.to.code}</span>?
                </h2>
                <p className="w-full max-w-[1075px] text-[#FFFFFFE0] text-[20px] text-center my-4">
                    Exchange {pairData?.from.code} to {pairData?.to.code} effortlessly with our user-friendly interface, generous rates, and no sign up. Follow these 7 steps for a seamless
                    transaction:
                </p>
                <p className="w-full max-w-[1075px] text-[#FFFFFFE0] text-[20px] text-center">1. Choose the desired crypto pair. Make sure that the exchange page has the cryptocurrencies you need.</p>
                <p className="w-full max-w-[1075px] text-[#FFFFFFE0] text-[20px] text-center">
                    2. Input the amount of {pairData?.from.code}. Convert {pairData?.from.code} to {pairData?.to.code} to precise exchange amounts.
                </p>
                <p className="w-full max-w-[1075px] text-[#FFFFFFE0] text-[20px] text-center">3. Compare the rates. Review offered conversion rates by different platforms.</p>
                <p className="w-full max-w-[1075px] text-[#FFFFFFE0] text-[20px] text-center">4. Click on the exchange button. Start your {pairData?.from.code} exchange.</p>
                <p className="w-full max-w-[1075px] text-[#FFFFFFE0] text-[20px] text-center">5. Provide your {pairData?.to.code} wallet address.</p>
                <p className="w-full max-w-[1075px] text-[#FFFFFFE0] text-[20px] text-center">6. Transfer your {pairData?.from.code} to the given address.</p>
                <p className="w-full max-w-[1075px] text-[#FFFFFFE0] text-[20px] text-center">7. Once the transaction is confirmed, you'll get your {pairData?.to.code} into your crypto wallet.</p>
                <button
                    style={{ background: "linear-gradient(180deg, #D56600 0%, #AC5300 100%)" }}
                    className=" h-[52px] text-white w-full max-w-[283px] rounded-[10px] mt-5 flex items-center justify-center my-5 "
                >
                    Swap at the Best Rate
                </button>
            </div>
        </div>
    );
}
