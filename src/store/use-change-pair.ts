import { Dispatch, SetStateAction } from "react";
import { create } from "zustand";


type Flag = "from" | "to"

type Store = {
    flag: Flag
    setFlag: Dispatch<SetStateAction<Flag>>
}

const useChangePair = create<Store>((set) => ({
    flag: "from",
    setFlag: (data) => set({ flag: data as Flag }),
}))

export { useChangePair }