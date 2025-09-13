import axios from "axios";
import { Options, TransactionFormatterProps } from "../../types";
import { ChangenowTransaction, ChangenowTransactionStatus } from "../../types/changenow";
import { transactionFormatter } from "../utils/transaction-formatter";
import dotenv from 'dotenv'
import { transactionStatusFormatter } from "../utils/transaction-status-formatter";

dotenv.config()

const apiClient = axios.create({
    baseURL: 'https://api.changenow.io/v2',
    headers: {
        "x-changenow-api-key": process.env.CHANGENOW_API_KEY
    }
});

async function getChangeNow(options: Options, isFloat?: boolean, isRevert?: boolean) {
    try {
        const data = {
            fromCurrency: options.from,
            toCurrency: options.to,
            fromAmount: options.amount,
            toAmount: options.amountTo,
            fromNetwork: options.fromNetwork.toLowerCase(),
            toNetwork: options.toNetwork.toLowerCase(),
            flow: isFloat ? "standard" : "fixed-rate",
            type: isRevert ? "reverse" : "direct"
        }


        const fetchChangeNowRate = apiClient.get('/exchange/estimated-amount', { params: data });


        return fetchChangeNowRate
    } catch (err) {
        console.error("Error from getChangeNow");
        return null;
    }
}

async function getChangeNowFixed(options: Options) {
    try {
        const getChangeNowInstance = getChangeNow(options, false)
        const fetchChangeNowRate = await getChangeNowInstance
        return fetchChangeNowRate
    } catch (err) {
        console.error("Error from getChangeNowFixed");

        return null
    }
}

async function getChangeNowRevert(options: Options) {
    try {
        const getChangeNowInstance = getChangeNow(options, true, true)
        const fetchChangeNowRate = await getChangeNowInstance
        return fetchChangeNowRate
    } catch (err) {
        console.error("Error from getChangeNowRevert");

        return null
    }
}

async function createChangeNowTransaction(options: TransactionFormatterProps) {
    try {
        console.log("Creating ChangeNow transaction with data:", options);
        
        const newData = {
            id: Math.random(),
            fromCurrency: options.from,
            fromNetwork: options.fromNetwork,
            toNetwork: options.toNetwork,
            toCurrency: options.to,
            address: options.addressReceive,
            fromAmount: options.amountDeposit,
            flow: options.float ? "standard" : "fixed-rate",
        }

        console.log("ChangeNow API request data:", newData);

        const res = await apiClient.post("/exchange", newData);

        console.log("ChangeNow API response:", res.data);

        if (!res.data) {
            throw new Error("Invalid response from ChangeNow API");
        }

        const data = res.data as ChangenowTransaction;

        const transaction = await getChangeNowTransaction(data.id);

        const formattedData = transactionFormatter({ 
            addressDeposit: data.payinAddress, 
            addressReceive: data.payoutAddress, 
            amountDeposit: String(data.expectedAmountFrom), 
            amountEstimated: String(data.expectedAmountTo), 
            createdAt: new Date().toISOString().toString(), 
            from: data.fromCurrency, 
            to: data.toCurrency, 
            id: data.id, 
            status: transaction?.status || "waiting", 
            userUnique: options.userUnique 
        });

        console.log("ChangeNow transaction created:", formattedData);
        return formattedData;
    } catch (err) {
        console.error("Error from createChangeNowTransaction", err);
        throw err;
    }
}

async function getChangeNowTransaction(id: string) {
    try {
        const res = await apiClient.get(`/exchange/by-id?id=${id}`);
        const data = res.data as ChangenowTransactionStatus;

        if (!data || !data.payinAddress) {
            console.log("No transaction data found for ChangeNow transaction:", id);
            return null;
        }

        const formattedData = transactionFormatter({ 
            addressDeposit: data.payinAddress, 
            addressReceive: data.payoutAddress, 
            amountDeposit: String(data.expectedAmountFrom), 
            amountEstimated: String(data.expectedAmountTo), 
            createdAt: new Date().toISOString().toString(), 
            from: data.fromCurrency, 
            to: data.toCurrency, 
            id: data.id, 
            status: data.status 
        });

        return formattedData;
    } catch (err) {
        console.error("Error from getChangeNowTransaction", err);
        return null;
    }
}


async function getChangeNowTransactionStatus(id: string) {
    try {
        const res = await apiClient.get(`/exchange/by-id?id=${id}`)
        const data = res.data as ChangenowTransactionStatus

        const formattedData = transactionStatusFormatter({ status: data.status, receiveAmount: String(data.expectedAmountFrom), id: data.id })


        return formattedData
    } catch (err) {
        console.error("Error from getChangeNowTransactionStatus");

        return null
    }
}


export { getChangeNowFixed, getChangeNowRevert, createChangeNowTransaction, getChangeNowTransactionStatus, getChangeNow, getChangeNowTransaction }