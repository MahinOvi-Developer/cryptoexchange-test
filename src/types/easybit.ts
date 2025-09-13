export type EasyBitTransaction = {
    id: string;
    send: string;
    receive: string;
    sendNetwork: string;
    receiveNetwork: string;
    sendAmount: string;
    receiveAmount: string;
    estimatedSendAmount: string;
    estimatedReceiveAmount: string;
    sendAddress: string;
    sendTag: string | null;
    receiveAddress: string;
    receiveTag: string | null;
    refundAddress: string | null;
    refundTag: string | null;
    vpm: string;
    status: string;
    hashIn: string | null;
    hashOut: string | null;
    networkFee: string;
    earned: string;
    validationLink: string | null;
    createdAt: number;
    updatedAt: number;
}


export type EasyBitTransactionStatus = {
    id: string;
    status: string;
    receiveAmount: string;
    hashIn: string | null;
    hashOut: string | null;
    createdAt: number;
    updatedAt: number;
}