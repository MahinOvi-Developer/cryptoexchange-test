import { apiClient } from "../axios/index.api";
import { TransactionFormatterProps, TransactionData, TransactionStatus } from "../../types";

// const options = {
//     addressReceive: "0x28E00910C254e657E6c325f10EB5938804bdCb9d",
//     amountDeposit: 0.05,
//     clientId: "1495437663.1720196712",
//     email: "",
//     extraIdReceive: "",
//     from: "btc",
//     isEmailAgree: false,
//     quotaId: "60db42bb080a7672f80c92db",
//     referralId: "",
//     refundAddress: "",
//     refundExtraId: "",
//     sessionId: 1725571654,
//     to: "eth",
//     userUnique: "1721352049612",
//     adapterName: "easybit"
// };

const createTransaction = async ({ data }: { data: TransactionFormatterProps }) => {
    try {
        const res = await apiClient.post("/create-transaction", data as TransactionFormatterProps)

        return res.data as {
            transaction: TransactionData
        }
    } catch (error) {
        console.error("Error from createTransaction", error)
    }
}

const getTransaction = async ({ transactionId }: { transactionId: string }) => {
    try {
        const { data } = await apiClient.get(`/get-transaction`, {
            params: {
                transactionId
            }
        })

        return data
    } catch (error) {
        console.error("Error from getTransaction", error)
    }
}

const getTransactionStatus = async ({ transactionId }: { transactionId: string }) => {
    try {
        const { data } = await apiClient.get(`/get-transaction-status`, {
            params: {
                transactionId
            }
        })

        return data as TransactionStatus
    } catch (error) {
        console.error("Error from getTransactionStatus", error)
    }
}

export { createTransaction, getTransaction, getTransactionStatus }