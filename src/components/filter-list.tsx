import { Dispatch, SetStateAction, useState, useMemo } from "react";
import FilterButton from "./filter-button";
import type { FilterList } from "../types";

export default function FilterList({ setFilter, items }: { setFilter?: Dispatch<SetStateAction<FilterList>>; items: FilterList[] }) {
    const [isActive, setIsActive] = useState<FilterList>(items[0]);

    const memoizedItems = useMemo(() => {
        return items.map((item) => {
            return (
                <li key={item}>
                    <FilterButton item={item} setIsActive={setIsActive} isActive={isActive} setFilter={setFilter as Dispatch<SetStateAction<string>>} />
                </li>
            );
        });
    }, [items, setFilter, isActive]);

    return (
        <ul className="flex items-center justify-between max-md:flex-wrap max-md:justify-center gap-3 text-white w-fit h-fit bg-[#FFFFFF14] border border-[#FFFFFF1F] px-1 py-1 rounded-[12px] max-xl:w-full mb-[25px]">
            {memoizedItems}
        </ul>
    );
}
