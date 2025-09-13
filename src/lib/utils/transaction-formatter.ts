import { TransactionData, TransactionFormatterProps } from "../../types";


function transactionFormatter({ addressDeposit, addressReceive, amountDeposit, amountEstimated, createdAt, from, to, id, status, userUnique }: TransactionData) {
    return {
        from,
        to,
        amountDeposit,
        addressReceive,
        addressDeposit,
        amountEstimated,
        createdAt,
        id,
        status,
        userUnique
    };
}

export { transactionFormatter }
