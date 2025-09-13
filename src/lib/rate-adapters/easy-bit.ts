import { getEasyBit } from "../adapters/easy-bit";
import { Options } from "../../types";
import { calculateETA, SwapHistory } from "../utils/calculate-eta";
import { formattedData } from "../utils/formatted-data";

async function getEasyBitRate(options: Options, swapHistories: SwapHistory[]) {
    try {
        const easyBit = await getEasyBit(options);
        const { data: easyBitData } = easyBit?.data;
        console.log("easybit data", easyBitData)
        const eta = calculateETA(swapHistories, options.from, options.to, "easybit");
        return formattedData({
            adapterName: "easybit",
            amountFrom: easyBitData.sendAmount,
            amountTo: easyBitData.receiveAmount,
            to: options.to,
            from: options.from,
            iconURl: "/imgs/easyBitIcon.png",
            eta: 25,
            isFloat: true
        });
    } catch (error) {
        console.error("Error from easyBit");
        return null;
    }
}

export { getEasyBitRate }