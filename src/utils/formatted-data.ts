import { formattedDataProps } from "../types";

function formattedData({ adapterName, amountFrom, amountTo, from, to, maxAmount = null, minAmount = null, iconURl, eta, isFloat }: formattedDataProps) {
    return {
        adapter: adapterName,
        amountFrom,
        amountTo,
        from,
        maxAmount,
        minAmount,
        to,
        iconURl,
        eta,
        isFloat
    };
}

export { formattedData }