import { Dispatch, SetStateAction } from "react"
import { create } from "zustand"



type Store = {
    isOpen: boolean
    setIsOpen: Dispatch<SetStateAction<Store["isOpen"]>>
}


const useOpenTransaction = create<Store>((set) => ({
    isOpen: false,
    setIsOpen: (data) => set(() => ({ isOpen: data as Store["isOpen"] })),
}))


export { useOpenTransaction }