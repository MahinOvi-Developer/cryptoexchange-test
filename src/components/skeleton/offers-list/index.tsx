import { Skeleton } from "../../../ui/skeleton";

export default function OffersListSkeleton() {
    return (
        <div className="bg-[#FFFFFF12] border border-[#FFFFFF1F] rounded-[19px] h-full p-5 w-full">
            <div className="flex items-center justify-between gap-3 max-xl:flex-col mb-5">
                <Skeleton className="h-8 w-1/3" />
                <Skeleton className="h-8 w-1/2" />
            </div>

            <div className="max-h-[420px] rounded-[10px] overflow-y-auto xl:pr-4 mt-16">
                {[...Array(3)].map((_, index) => (
                    <div key={index} className="mb-3">
                        <Skeleton className="h-12 w-full" />
                    </div>
                ))}
            </div>
        </div>
    );
}
