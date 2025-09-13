import { Dispatch, SetStateAction } from "react";
import { create } from "zustand";
import { Transaction } from "../types";

interface OffersStore {
    offers: Transaction[]
    setOffers: (data: any) => void;
}

export const useOffers = create<OffersStore>((set) => ({
    offers: [],
    setOffers: (data) => set({ offers: data as Transaction[] }),
}));