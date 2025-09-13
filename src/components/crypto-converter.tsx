import { TbArrowsDownUp } from "react-icons/tb";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { memo } from "react";
import { usePairData } from "../store/use-pair-data";

const CryptoConverter = memo(function CryptoConverter() {
    const { pairData } = usePairData()
    return (
        <div className="w-full h-fit bg-[#FFFFFF12] border border-[#FFFFFF1F] rounded-[19px] mt-5 p-5">
            <h1 className="text-[20px] font-bold text-white text-center mb-5">1. Exchange at the best rates</h1>

            <div className="flex items-center justify-between">
                <h2 className="text-[20px] font-bold text-white">Swap from</h2>
                <div className="flex items-center gap-2">
                    <LazyLoadImage
                                                src={pairData?.from.icon}
                        alt=""
                        className="w-[40px] h-[40px] object-cover rounded-full bg-gray-800 p-1 flex-shrink-0"
                    />
                    <p className="text-white text-[1.1rem]">{pairData?.from.code}</p>
                </div>
            </div>

            <div className="mt-3">
                <input type="number" name="from" pattern="\d*" className="bg-transparent text-white outline-none" min={0} step={0.05} />
            </div>

            <div className="bg-[#D566008A] h-[1px] w-full my-8 relative">
                <button type="button" className="bg-[#7B3F08] rounded-full w-fit h-fit text-white p-3 absolute top-1/2 left-1/2 right-1/2 -translate-x-1/2 -translate-y-1/2">
                    <TbArrowsDownUp size={20} />
                </button>
            </div>

            <div className="flex items-center justify-between">
                <h2 className="text-[20px] font-bold text-white">Swap to</h2>
                <div className="flex items-center gap-2">
                    <LazyLoadImage  src={pairData?.to.icon} alt="" className="w-[40px] h-[40px] object-cover rounded-full bg-gray-800 p-1 flex-shrink-0" />
                    <p className="text-white text-[1.1rem]">{pairData?.to.code}</p>
                </div>
            </div>

            <div className="mt-3">
                <input type="number" name="to" pattern="\d*" className="bg-transparent text-white outline-none" min={0} />
            </div>

            <a href="#swap" className="bg-[#D56600] h-[52px] cursor-pointer text-white w-full rounded-[10px] mt-5 flex items-center justify-center">
                Enter an Amount
            </a>
        </div>
    );
});

export { CryptoConverter as MemoizedCryptoConverter };