import { Dispatch, SetStateAction } from "react";
import { FilterList } from "../types";

export default function FilterButton({ setIsActive, isActive, item, setFilter }: { setIsActive: Dispatch<SetStateAction<FilterList>>; isActive: string; item: FilterList; setFilter: Dispatch<SetStateAction<string>> }) {
    const isNotWorking = item === "DEX" || item === "Buy/Sell by Fiat";

    const backgroundStyle = isActive === item
        ? { background: "linear-gradient(180deg, #D56600 0%, #AC5300 100%)" }
        : { background: "transparent" };

    return (
        <button
            onClick={() => {
                setIsActive(item);
                setFilter(item);
            }}
            disabled={isNotWorking}
            className={`w-[167px] h-[36px] rounded-[10px] ${isNotWorking ? "bg-gray-400" : ""}`}
            style={backgroundStyle}
            type="button"
        >
            {item}
        </button>
    );
}
