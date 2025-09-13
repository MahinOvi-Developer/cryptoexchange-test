import { getChangelly, getChangellyFix, getChangellyRevert } from "../adapters/changelly";
import { Options } from "../../types";
import { calculateETA, SwapHistory } from "../utils/calculate-eta";
import { formattedData } from "../utils/formatted-data";

// get Changelly rate this for float rate

async function getChangellyRate(options: Options, swapHistories: SwapHistory[]) {
    try {
        const changelly = await getChangelly(options, "getExchangeAmount", false);
        const { result: changellyData } = changelly as any // this added as any because it throws unknown error;

        const eta = calculateETA(swapHistories, options.from, options.to, "changelly");  // calculate ETA

        return formattedData({
            adapterName: "changelly",
            amountFrom: changellyData[0].amountFrom,
            amountTo: parseFloat(parseFloat(changellyData[0].amountTo).toString()),
            to: changellyData[0].to,
            from: changellyData[0].from,
            maxAmount: changellyData[0].max,
            minAmount: changellyData[0].min,
            iconURl: "/imgs/changelly.png",
            eta: 23,
            isFloat: true
        });
    } catch (error) {
        console.error("Error from changelly");
        return null;
    }
}


async function getChangellyRateFix(options: Options, swapHistories: SwapHistory[]) {
    try {
        const changelly = await getChangellyFix(options);
        const { result: changellyData } = changelly as any // this added as any because it throws unknown error;

        const eta = calculateETA(swapHistories, options.from, options.to, "changelly");  // calculate ETA

        return formattedData({
            adapterName: "changelly_fix",
            amountFrom: changellyData[0].amountFrom,
            amountTo: parseFloat(parseFloat(changellyData[0].amountTo).toString()),
            to: changellyData[0].to,
            from: changellyData[0].from,
            maxAmount: changellyData[0].max,
            minAmount: changellyData[0].min,
            iconURl: "/imgs/changelly.png",
            eta: 28,
            isFloat: false
        });
    } catch (error) {
        console.error("Error from changelly");
        return null;
    }
}

async function getChangellyRateRevert(options: Options, swapHistories: SwapHistory[]) {
    try {
        const changelly = await getChangellyRevert(options);
        const { result: changellyData } = changelly as any // this added as any because it throws unknown error;
        console.log("changely", changellyData)

        const eta = calculateETA(swapHistories, options.from, options.to, "changelly");  // calculate ETA
        return formattedData({
            adapterName: "changelly_fix",
            amountFrom: parseFloat(parseFloat(changellyData[0].amountFrom).toString()), // we should replace this because in changelly it returns amountFrom value here
            amountTo: changellyData[0].amountTo, //the same thing here it returns amountTo value, so we need to replace them
            to: changellyData[0].to, // here we need to replace this with "From" value because it does the opposite
            from: changellyData[0].from, // same thing here
            maxAmount: changellyData[0].max,
            minAmount: changellyData[0].min,
            iconURl: "/imgs/changelly.png",
            eta: 31,
            isFloat: false
        });
    } catch (error) {
        console.error("Error from changelly");
        return null;
    }

}

export { getChangellyRate, getChangellyRateFix, getChangellyRateRevert }