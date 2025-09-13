import { Dispatch, SetStateAction } from "react";
import { create } from "zustand";



type Store = {
    showFixedRate: boolean
    setShowFixedRate: Dispatch<SetStateAction<boolean>>
}

const useShowFixedRate = create<Store>((set) => ({
    showFixedRate: false,
    setShowFixedRate: () => set((state) => ({ showFixedRate: !state.showFixedRate })),
}))


export { useShowFixedRate }