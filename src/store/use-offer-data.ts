import { create } from "zustand";
import { Dispatch, SetStateAction } from "react";
import { Transaction } from "../types";

interface OfferDataStore {
    offerData: Transaction | null
    setOfferData: Dispatch<SetStateAction<Transaction>>;
}

export const useOfferData = create<OfferDataStore>((set) => ({
    offerData: null,
    setOfferData: (data) => set({ offerData: data as Transaction }),
}));