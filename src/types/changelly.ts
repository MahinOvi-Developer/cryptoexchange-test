export type ChangellyTransaction = {
    result: {
        amountExpectedFrom: string;
        amountExpectedTo: string;
        createdAt: number;
        currencyFrom: string;
        currencyTo: string;
        id: string;
        networkFee: string;
        payinAddress: string;
        payoutAddress: string;
        status: string;
        trackUrl: string;
        type: string;
    }
}