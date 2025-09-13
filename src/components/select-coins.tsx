import { LazyLoadImage } from "react-lazy-load-image-component";
import { IoIosArrowDown } from "react-icons/io";
import { memo, useCallback, useEffect, useMemo, useRef, useState, useTransition } from "react";
import useDebounce from "../hooks/use-debounce.hook";
import { useRouter, useSearchParams } from "next/navigation";
import { useIntersectionObserver } from "../hooks/use-intersection-observer.hook";
import CoinsSkeleton from "./skeleton/coins";
import { useQuery } from "@tanstack/react-query";
import { getCoinsInfo } from "../api/coins/index.api";
import { CoinData, CoinsDataType } from "../types";

const LIMIT = 1000;

const Select = ({ defaultCoin, onChange }: { defaultCoin?: Partial<CoinData>, onChange: (coin: CoinData) => void }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [hasMoreCoins, setHasMoreCoins] = useState(true);
    const [, startTransition] = useTransition();

    const dropdownRef = useRef<HTMLDivElement>(null);
    const divRef = useRef<HTMLDivElement>(null);
    const currentLimitRef = useRef<number>(LIMIT);

    const { data, isLoading } = useQuery<CoinsDataType, Error>({
        queryKey: ["coins", { search: searchTerm, limit: currentLimitRef.current }],
        queryFn: getCoinsInfo,
        staleTime: Infinity
    })
    const { isIntersecting, ref } = useIntersectionObserver({
        threshold: 0.5,
        rootMargin: '20px',
    });


    const router = useRouter();
    const searchParams = useSearchParams();
    const debouncedSearchTerm = useDebounce<string>(searchTerm, 500);

    const checkMoreCoinsAvailable = useCallback((coinsData: CoinsDataType) => {
        if (coinsData?.filtered?.length < currentLimitRef.current) {
            setHasMoreCoins(false);
        } else {
            setHasMoreCoins(true);
        }
    }, []);

    useEffect(() => {
        if (debouncedSearchTerm !== undefined) {
            currentLimitRef.current = LIMIT;
        }
    }, [debouncedSearchTerm]);

    useEffect(() => {
        if (isIntersecting && hasMoreCoins) {
            if (debouncedSearchTerm && debouncedSearchTerm === "") {
                divRef.current?.scrollIntoView({ block: "nearest" });
            }
            currentLimitRef.current += 500;

        }
    }, [isIntersecting, debouncedSearchTerm, hasMoreCoins]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent | null) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event?.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const toggleDropdown = useCallback(() => {
        setIsOpen(!isOpen);
    }, [isOpen, setIsOpen]);

    const handleCoinClick = useCallback((coin: CoinData) => {
        onChange(coin);
        setIsOpen(false);
    }, [onChange]);


    const memoizedCoinsList = useMemo(() => {

        checkMoreCoinsAvailable(data as CoinsDataType);
        return (
            <div className="h-[200px] overflow-y-auto ">
                {debouncedSearchTerm ? (
                    <>
                        <div className="p-2 text-white" ref={debouncedSearchTerm ? divRef : null}>Search result</div>
                        {data?.filtered?.map((option: CoinData, index: number) => (
                            <div
                                key={option.code}
                                className="p-2 cursor-pointer hover:bg-[#2F2F2F] text-white flex items-center gap-2"
                                onClick={() => startTransition(() => handleCoinClick(option))}
                                ref={index === data.filtered?.length - 1 ? ref : null}
                            >
                                <div className="flex-shrink-0 w-6 h-6">
                                    <LazyLoadImage src={option.icon} alt="" className="object-cover w-6 h-6 rounded" />
                                </div>
                                <div className="flex items-center justify-between w-full truncate">
                                    {option.name}
                                    <span className="ml-2 truncate" style={{ color: option.network_text_color }}>
                                        {option.code}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </>
                ) : (
                    <>
                        <div className="p-2 text-white">Popular currencies</div>
                        {data?.popular?.map((option: CoinData) => (
                            <div onClick={() => startTransition(() => handleCoinClick(option))} key={option.code} className="p-2 cursor-pointer hover:bg-[#2F2F2F] text-white flex items-center gap-2" >
                                <div className="flex-shrink-0 w-6 h-6">
                                    <LazyLoadImage src={option.icon} alt="" className="object-cover w-6 h-6 rounded" />
                                </div>
                                <div className="flex items-center justify-between w-full truncate">
                                    {option.name}
                                    <span className="ml-2 truncate" style={{ color: option.network_text_color }}>
                                        {option.code}
                                    </span>
                                </div>
                            </div>
                        ))}
                        <hr className="border-t border-[#2F2F2F] my-2" />
                        <div className="p-2 text-white">All currencies</div>
                        {data?.filtered?.map((option: CoinData, index: number) => (
                            <div
                                onClick={() => startTransition(() => handleCoinClick(option))}
                                key={option.code}
                                className="p-2 cursor-pointer hover:bg-[#2F2F2F] text-white flex items-center gap-2"
                                ref={index === data?.filtered?.length - 1 ? ref : null}
                            >
                                <div className="flex-shrink-0 w-6 h-6">
                                    <LazyLoadImage src={option.icon} alt="" className="object-cover w-6 h-6 rounded" />
                                </div>
                                <div className="flex items-center justify-between w-full truncate">
                                    {option.name}
                                    <span className="ml-2 truncate" style={{ color: option.network_text_color }}>
                                        {option.code} | <span className="text-red-500">{option.network}</span>
                                    </span>
                                </div>
                            </div>
                        ))}
                    </>
                )}
            </div>
        )
    }, [checkMoreCoinsAvailable, data, debouncedSearchTerm, handleCoinClick, ref])


    return (
        <div className="relative w-fit" ref={dropdownRef}>
            <div className="p-2 bg-transparent rounded cursor-pointer text-white flex items-center gap-2 w-[240px]" onClick={() => startTransition(toggleDropdown)}>
                {defaultCoin ? (
                    <>
                        <LazyLoadImage
                            src={defaultCoin?.icon}
                            alt=""
                            className="w-[40px] h-[40px] object-cover rounded-full bg-gray-800 p-1 flex-shrink-0"
                        />
                        <span className="flex-grow truncate">{defaultCoin?.code?.toUpperCase()} |  <span className="text-red-500">{defaultCoin.network?.toUpperCase()}</span> </span>
                    </>
                ) : (
                    "Select a Token"
                )}
                <IoIosArrowDown className="flex-shrink-0 w-5 h-5 ml-auto text-gray-400" />
            </div>
            {isOpen && (
                <div className="absolute max-lg:-left-[-182px] max-lg:-translate-x-[18rem] xl:-left-[122px] w-[350px] z-[99999] mt-1 bg-[#121212] border border-[#2F2F2F] rounded shadow-lg overflow-hidden">
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search..."
                        className="w-full outline-none p-2 bg-[#121212] text-white border-b border-[#2F2F2F]"
                    />

                    {
                        isLoading ? <CoinsSkeleton /> : memoizedCoinsList
                    }
                </div>
            )}
        </div>
    );
};

const MemoizedSelect = memo(Select);
export default MemoizedSelect;
