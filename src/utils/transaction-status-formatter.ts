import { TransactionStatus } from "../types";


function transactionStatusFormatter({ id, receiveAmount, status }: TransactionStatus): TransactionStatus {
    return {
        status,
        id,
        receiveAmount
    };
}

export { transactionStatusFormatter }