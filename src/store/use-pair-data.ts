import { Dispatch, SetStateAction } from "react";
import { create } from "zustand";

import { CoinData } from "../types";

interface PairDataStore {
    pairData: {
        from: Partial<CoinData>
        to: Partial<CoinData>
        amount: number
        amountTo?: number
        fromNetwork: string
        toNetwork: string
    } | null;

    setPairData: Dispatch<SetStateAction<PairDataStore["pairData"]>>;
};

export const usePairData = create<PairDataStore>((set) => ({
    pairData: null,
    setPairData: (data: any) => set(() => ({ pairData: data as PairDataStore["pairData"] })),
}));