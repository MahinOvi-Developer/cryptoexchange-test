import { getLetsExChange, getLetsExChangeFix, getLetsExChangeRevert } from "../adapters/lets-exchange";
import { Options } from "../../types";
import { calculateETA, SwapHistory } from "../utils/calculate-eta";
import { formattedData } from "../utils/formatted-data";

async function getLetsExchangeRate(options: Options, swapHistories: SwapHistory[]) {
    try {
        const letsExchange = await getLetsExChange(options, true);
        const { data: letsExchangeData } = letsExchange;
        const eta = calculateETA(swapHistories, options.from, options.to, "letsexchange");
        return formattedData({
            adapterName: "letsexchange",
            amountFrom: options.amount,
            amountTo: letsExchangeData.amount,
            to: options.to,
            from: options.from,
            maxAmount: letsExchangeData.max_amount,
            minAmount: letsExchangeData.min_amount,
            iconURl: "/imgs/letsExchangeIcon.png",
            eta: 19,
            isFloat: true
        });
    } catch (error) {
        console.error("Error from letsExchange");
        return null;
    }
}

async function getLetsExchangeRateFix(options: Options, swapHistories: SwapHistory[]) {
    try {
        const letsExchangeFix = await getLetsExChangeFix(options);
        const { data: letsExchangeFixData } = letsExchangeFix;
        const eta = calculateETA(swapHistories, options.from, options.to, "letsexchange_fix");
        return formattedData({
            adapterName: "letsexchange_fix",
            amountFrom: options.amount,
            amountTo: letsExchangeFixData.amount,
            to: options.to,
            from: options.from,
            maxAmount: letsExchangeFixData.max_amount,
            minAmount: letsExchangeFixData.min_amount,
            iconURl: "/imgs/letsExchangeIcon.png",
            eta: 24,
            isFloat: false
        });
    } catch (error) {
        console.error("Error from letsExchange fix");
        return null;
    }
}


async function getLetsExchangeRateRevert(options: Options, swapHistories: SwapHistory[]) {
    try {
        const letsExchangeFix = await getLetsExChangeRevert(options);
        const { data: letsExchangeFixData } = letsExchangeFix;
        const eta = calculateETA(swapHistories, options.from, options.to, "letsexchange_fix");
        return formattedData({
            adapterName: "letsexchange_fix",
            amountFrom: letsExchangeFixData.amount,
            amountTo: parseFloat(options.amountTo?.toString() || "0"),
            to: options.to,  // here we need to replace this with "From" value because it does the opposite
            from: options.from, // same thing here
            maxAmount: letsExchangeFixData.max_amount,
            minAmount: letsExchangeFixData.min_amount,
            iconURl: "/imgs/letsExchangeIcon.png",
            eta: 24,
            isFloat: false
        });
    } catch (error) {
        console.error("Error from letsExchange revert");
        return null
    }
}

export { getLetsExchangeRate, getLetsExchangeRateFix, getLetsExchangeRateRevert }