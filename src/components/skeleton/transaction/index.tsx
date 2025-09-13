import { Skeleton } from "../../../ui/skeleton";

export default function TransactionSkeleton() {
    return (
        <section className="mt-20 flex flex-col items-center justify-center z-20 w-full px-3">
            <div className="w-full max-w-md mx-auto p-6 rounded-lg shadow-lg mt-10 bg-[#141414] z-[9999]">
                <div className="flex flex-col justify-between gap-10">
                    <div className="z-30">
                        <div className="flex items-center justify-between w-full z-30 mb-4">
                            <Skeleton className="h-6 w-1/3" /> {/* Placeholder for title */}
                            <Skeleton className="h-6 w-1/4" /> {/* Placeholder for status */}
                        </div>
                        <div className="bg-white bg-opacity-20 z-30 rounded-lg p-4 mt-4 mb-4">
                            <div className="text-white mb-2">
                                <Skeleton className="h-4 w-1/2" /> {/* Placeholder for transaction ID */}
                            </div>
                            <p className="mb-2 text-white">
                                <Skeleton className="h-4 w-3/4" /> {/* Placeholder for instructions */}
                            </p>
                            <div className="mb-4">
                                <span className="text-lg font-semibold text-white flex items-center gap-2 mb-2">
                                    <Skeleton className="h-6 w-1/3" /> {/* Placeholder for amount */}
                                </span>
                                <div className="mt-3">
                                    <Skeleton className="h-4 w-2/3 mb-2" /> {/* Placeholder for deposit address label */}
                                    <Skeleton className="h-4 w-full" /> {/* Placeholder for deposit address */}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white bg-opacity-20 z-30 rounded-lg p-4 mb-4">
                        <p className="mb-2 text-white">
                            <Skeleton className="h-4 w-2/3 mb-2" /> {/* Placeholder for 'You will get after deposit' */}
                        </p>
                        <div className="mb-4">
                            <Skeleton className="h-6 w-1/2 mb-2" /> {/* Placeholder for estimated amount */}
                            <div className="mt-3">
                                <Skeleton className="h-4 w-1/2 mb-2" /> {/* Placeholder for receiving address label */}
                                <Skeleton className="h-4 w-full" /> {/* Placeholder for receiving address */}
                            </div>
                        </div>
                    </div>
                </div>
                <Skeleton className="w-full h-10 mt-10" /> {/* Placeholder for button */}
            </div>
        </section>
    );
}
