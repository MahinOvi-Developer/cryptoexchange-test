import { useMemo } from "react";
import { Skeleton } from "../../../ui/skeleton";

export default function CoinsSkeleton() {
    const renderCoins = useMemo(() => {
        return [1, 2, 3].map((_, index) => (
            <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Skeleton style={{ borderRadius: '50%' }} className="w-[30px] h-[30px]" />
                <div style={{ flex: 1 }}>
                    <Skeleton className="w-1/2 h-[10px]" />
                </div>
                <Skeleton className="w-1/2 h-[10px]" />
            </div>
        ))
    }, [])

    return (
        <div className="py-7 px-4">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {renderCoins}
            </div>
        </div>
    );
}
