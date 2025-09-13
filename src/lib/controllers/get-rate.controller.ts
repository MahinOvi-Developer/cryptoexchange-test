import { getChangeNowRate, getChangeNowRateFix } from "../rate-adapters/change-now";
import { getChangellyRate, getChangellyRateFix, getChangellyRateRevert } from "../rate-adapters/changelly";
import { getEasyBitRate } from "../rate-adapters/easy-bit";
import { getLetsExchangeRate, getLetsExchangeRateFix, getLetsExchangeRateRevert } from "../rate-adapters/lets-exchange";
import { formattedDataProps, Options } from "../../types";
import { SwapHistory } from "../utils/calculate-eta";

const swapHistories: SwapHistory[] = [
    { from: "btc", to: "xmr", exchange: "changelly", swapTime: 29 },
    { from: "btc", to: "xmr", exchange: "letsexchange", swapTime: 32 },
    { from: "btc", to: "xmr", exchange: "easybit", swapTime: 27 },
];

async function getRate(options: Options) {
    const adaptersData: formattedDataProps[] = [];
    const adaptersToCheck = ["easybit", "letsexchange", "changelly", "letsexchange_fix", "changelly_fix", "change_now", "change_now_fix"];

    try {
        if (options.chooseAdapters.some((adapter: string) => adaptersToCheck.includes(adapter))) {
            const [easyBitResult, letsExchangeResult, changellyResult, letsExchangeFixResult, changellyFixResult, getLetsExchangeRevertResult, getChangellyRevertResult, getChangeNowResult, getChangeNowFixResult] = await Promise.all([
                getEasyBitRate(options, swapHistories),
                getLetsExchangeRate(options, swapHistories),
                getChangellyRate(options, swapHistories),
                getLetsExchangeRateFix(options, swapHistories),
                getChangellyRateFix(options, swapHistories),
                getLetsExchangeRateRevert(options, swapHistories),
                getChangellyRateRevert(options, swapHistories),
                getChangeNowRate(options, swapHistories),
                getChangeNowRateFix(options, swapHistories)
            ]);


            if (easyBitResult) adaptersData.push(easyBitResult);
            if (letsExchangeResult) adaptersData.push(letsExchangeResult);
            if (changellyResult) adaptersData.push(changellyResult);
            if (letsExchangeFixResult) adaptersData.push(letsExchangeFixResult);
            if (changellyFixResult) adaptersData.push(changellyFixResult);
            if (getLetsExchangeRevertResult) adaptersData.push(getLetsExchangeRevertResult);
            if (getChangellyRevertResult) adaptersData.push(getChangellyRevertResult);
            if (getChangeNowResult) adaptersData.push(getChangeNowResult);
            if (getChangeNowFixResult) adaptersData.push(getChangeNowFixResult);


            adaptersData.forEach(adapter => {
                if (typeof adapter.amountTo === 'string') {
                    adapter.amountTo = parseFloat(adapter.amountTo);
                }
            });

            const validAdaptersData = adaptersData.filter(adapter => !isNaN(adapter.amountTo) && adapter.amountTo !== null);

            const bestRateValue = Math.max(...validAdaptersData.map(adapter => adapter.amountTo || 0));

            validAdaptersData.forEach(adapter => {
                adapter.bestRate = Math.abs(adapter.amountTo - bestRateValue) < Number.EPSILON;
            });

            return validAdaptersData;
        }
    } catch (error) {
        console.error("Error from getRate:", error);
    }

    if (String(options.amount) === "0") return [];

    return adaptersData;
}

export { getRate };
