import { create } from "zustand";
import { Dispatch, SetStateAction } from "react";
import { TransactionData } from "../types";

interface TransactionStore {
    transaction: TransactionData | null
    setTransaction: Dispatch<SetStateAction<TransactionData>>
}

export const useTransaction = create<TransactionStore>((set) => ({
    transaction: null,
    setTransaction: (data) => set(() => ({ transaction: data as TransactionData })),
}));