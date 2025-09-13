
import { useMemo, useState } from 'react'
import { filterList } from '../utils/constants/how-works';

export default function CoinChain({ defaultAcitve }: { defaultAcitve: string }) {
    const [isActive, setIsActive] = useState(defaultAcitve);

    const renderList = useMemo(() => {
        return filterList.map((item) => {
            return (
                <li key={item} className="max-sm:w-full">
                    <button
                        onClick={() => setIsActive(item)}
                        className="w-[108px] h-[36px] rounded-[10px] max-sm:w-full"
                        style={{ background: `${isActive === item ? "linear-gradient(180deg, #D56600 0%, #AC5300 100%)" : "transparent"}` }}
                        type="button"
                    >
                        {item}
                    </button>
                </li>
            );
        })
    }, [isActive])


    return (
        <div className="w-full flex justify-center">
            <ul className="flex flex-wrap items-center max-md:justify-center justify-between w-full gap-3 text-white h-fit bg-[#FFFFFF14] border border-[#FFFFFF1F] px-2 py-2 rounded-[20px] max-xl:w-full max-sm:flex-col max-sm:w-full">
                {renderList}
            </ul>
        </div>

    )
}
