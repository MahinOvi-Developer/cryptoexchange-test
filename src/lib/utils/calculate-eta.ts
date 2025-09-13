type SwapHistory = {
    from: string;
    to: string;
    exchange: string;
    swapTime: number; // in minutes
};

function calculateETA(swapHistories: SwapHistory[], from: string, to: string, exchange: string): number {
    const relevantSwaps = swapHistories.filter(swap => swap.from === from && swap.to === to && swap.exchange === exchange);

    if (relevantSwaps.length === 0) {
        return 30;
    }

    const totalSwapTime = relevantSwaps.reduce((total, swap) => total + swap.swapTime, 0);
    return totalSwapTime / relevantSwaps.length;
}

export { calculateETA };
export type { SwapHistory };
