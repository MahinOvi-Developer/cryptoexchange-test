import { useQuery } from "@tanstack/react-query";
import { getOffers } from "../api/offers/index.api";
import { memo, useCallback, useEffect, useMemo, useState } from "react";
import { usePairData } from "../store/use-pair-data";
import { useOffers } from "../store/use-offers";
import { Offer } from "./offer";
import FilterListComponent from "./filter-list";
import OffersSkeleton from "./skeleton/offers-list";
import { useShowFixedRate } from "../store/use-show-fixed-rate";
import { useChangePair } from "../store/use-change-pair";
import { motion } from "framer-motion";
import type { FilterList, Transaction } from "../types";

const filterList: FilterList[] = ["Fastest", "Best Rate", "Best Match"];

export const OffersList = memo(function OffersList() {
    const { pairData } = usePairData()
    const { setOffers } = useOffers()
    const { showFixedRate } = useShowFixedRate()
    const { flag } = useChangePair()
    const [filter, setFilter] = useState<FilterList>("Fastest");

    const { data: offers, isLoading, isFetching } = useQuery({
        queryKey: ["offers", { ...(flag === "from" ? { amount: pairData?.amount } : { amountTo: pairData?.amountTo }), from: pairData?.from.code?.toLowerCase(), to: pairData?.to.code?.toLowerCase(), fromNetwork: pairData?.fromNetwork, toNetwork: pairData?.toNetwork }],
        queryFn: getOffers,
        refetchInterval: 10000,
    })

    const applyFilter = useCallback((offers: Transaction[], filter: string): Transaction[] => {
        const filterHandlers: Record<string, (offers: Transaction[]) => Transaction[]> = {
            Fastest: (offers) => offers?.sort((a, b) => a?.eta - b?.eta),
            "Best Rate": (offers) => offers?.sort((a, b) => b.amountTo - a.amountTo),
            "Best Match": (offers) => offers?.sort((a, b) => b.amountTo - a.amountTo),
        };

        const handler = filterHandlers[filter];
        return handler ? handler(offers) : offers;
    }, [])

    const renderOffers = useMemo(() => {
        const filteredOffers = applyFilter(offers as Transaction[], filter);

        const sortedByBestRate = filteredOffers?.filter((offer) => offer?.amountTo)

        const finalOffers = !showFixedRate
            ? sortedByBestRate
            : filteredOffers?.filter((offer) => offer?.isFloat !== showFixedRate);

        setOffers(finalOffers as Transaction[]);

        return finalOffers?.map((offer: Transaction) => <Offer key={offer?.adapter} {...offer} offers={finalOffers} />);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [offers, filter, showFixedRate]);

    const noMatching = useMemo(() => {
        return offers?.every(offer => offer.amountTo === 0);
    }, [offers]);

    if (noMatching) {
        return (
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="glass rounded-3xl p-8 border border-white/10 floating-card"
            >
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-white">
                        Select Best Offer
                    </h2>
                    <FilterListComponent setFilter={setFilter} items={filterList} />
                </div>

                <div className="text-center py-16">
                    <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-orange-500/20 to-red-500/20 flex items-center justify-center">
                        <svg className="w-10 h-10 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                        </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">No Matching Offers</h3>
                    <p className="text-white/60 mb-6">We couldn't find any exchanges for this trading pair. Try adjusting your search criteria.</p>
                    <div className="flex flex-wrap gap-2 justify-center">
                        <span className="px-3 py-1 bg-white/10 rounded-full text-white/80 text-sm">Try different amounts</span>
                        <span className="px-3 py-1 bg-white/10 rounded-full text-white/80 text-sm">Check coin availability</span>
                        <span className="px-3 py-1 bg-white/10 rounded-full text-white/80 text-sm">Switch rate mode</span>
                    </div>
                </div>
            </motion.div>
        );
    }

    if (isLoading || isFetching) return <OffersSkeleton />;

    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
        >
            <div className="flex items-center justify-end">
                <FilterListComponent setFilter={setFilter} items={filterList} />
            </div>

            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="space-y-4 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar"
            >
                {offers?.length ? renderOffers : (
                    <div className="glass rounded-3xl p-12 text-center border border-white/10">
                        <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center">
                            <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-semibold text-white mb-2">No Offers Available</h3>
                        <p className="text-white/60">Enter trading pair details to see available exchange offers</p>
                    </div>
                )}
            </motion.div>

            {offers && offers.length > 0 && (
                <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="glass p-4 rounded-2xl border border-white/5"
                >
                    <div className="flex items-center justify-between text-sm">
                        <span className="text-white/60">Showing {offers?.length || 0} offers</span>
                        <span className="text-green-400 font-medium">Updated every 10s</span>
                    </div>
                </motion.div>
            )}
        </motion.div>
    );
})