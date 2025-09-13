export type ChangenowTransaction = {
    expectedAmountFrom: number;
    expectedAmountTo: number;
    flow: "standard" | "fixed-rate";
    type: "direct" | "reverse";
    payinAddress: string;
    payoutAddress: string;
    fromCurrency: string;
    toCurrency: string;
    refundAddress: string;
    id: string;
    fromNetwork: string;
    toNetwork: string;
};

export type ChangenowTransactionStatus = {
    status: "waiting" | "confirming" | "exchanging" | "sending" | "finished" | "failed" | "refunded";
    payinAddress: string;
    payoutAddress: string;
    fromCurrency: string;
    toCurrency: string;
    id: string;
    updatedAt: string;
    expectedAmountFrom: number;
    expectedAmountTo: number;
    createdAt: string;
    isPartner: boolean;
};
