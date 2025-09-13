import { lazy, memo, Suspense } from "react";
import { SelectPairSkeleton } from "./skeleton/select-pair";
import FilterListComponent from "./filter-list";
import type { FilterList } from "../types";
import { motion } from "framer-motion";

const MemoizedSelectPair = lazy(() => import("./select-pair"));

const filterList: FilterList[] = ["Exchange Crypto", "Buy/Sell by Fiat", "DEX"];

export const Swap = memo(function () {
    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full h-fit"
        >
            <Suspense fallback={<SelectPairSkeleton />}>
                <MemoizedSelectPair />
            </Suspense>
        </motion.div>
    );
})