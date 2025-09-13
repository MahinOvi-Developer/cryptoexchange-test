import { getChangeNow, getChangeNowFixed } from "../adapters/change-now";
import { Options } from "../../types";
import { calculateETA, SwapHistory } from "../utils/calculate-eta";
import { formattedData } from "../utils/formatted-data";





async function getChangeNowRate(options: Options, swapHistories: SwapHistory[]) {
    try {
        const changenow = await getChangeNow(options, true);
        if (!changenow) {
            throw new Error("Failed to fetch data from ChangeNow API");
        }

        const { data: changenowData } = changenow;


        const eta = calculateETA(swapHistories, options.from, options.to, "change_now");
        return formattedData({
            adapterName: "change_now",
            amountFrom: options.amount,
            amountTo: changenowData.toAmount,
            to: options.to,
            from: options.from,
            maxAmount: changenowData.max_amount || 0,
            minAmount: changenowData.min_amount || 0,
            iconURl: "/imgs/changenow.svg",
            eta: eta, // Consider using the calculated eta here
            isFloat: true,
        });
    } catch (error: any) {
        console.error("Error from ChangeNow:", error.message);
        return null;
    }
}


async function getChangeNowRateFix(options: Options, swapHistories: SwapHistory[]) {
    try {
        const changenow = await getChangeNowFixed(options);
        if (!changenow) {
            throw new Error("Failed to fetch data from ChangeNow API");
        }

        const { data: changenowData } = changenow;


        const eta = calculateETA(swapHistories, options.from, options.to, "change_now_fix");
        return formattedData({
            adapterName: "change_now_fix",
            amountFrom: options.amount,
            amountTo: changenowData.toAmount,
            to: options.to,
            from: options.from,
            maxAmount: changenowData.max_amount || 0,
            minAmount: changenowData.min_amount || 0,
            iconURl: "/imgs/changenow.svg",
            eta: eta, // Consider using the calculated eta here
            isFloat: false,
        });
    } catch (error: any) {
        console.error("Error from ChangeNow:", error.message);
        return null;
    }
}



export { getChangeNowRate, getChangeNowRateFix }