import axios from "axios"
import { Options, TransactionFormatterProps } from "../../types"
import { transactionFormatter } from "../utils/transaction-formatter"
import { LetsExchangeTransaction } from "../../types/letsexchange"

async function getLetsExChange(options: Options, isFloat?: boolean) {
    const data = {
        from: options.from,
        to: options.to,
        amount: options.amount,
        network_from: options.fromNetwork,
        network_to: options.toNetwork,
        affiliate_id: options.referralId, // for affiliate id
        float: isFloat // for float rate and fixed rate , added `|| true` for undefined and null values
    }
    const fetchLetsExchangeRate = axios.post(`https://api.letsexchange.io/api/v1/info`, data, {
        headers: {
            Authorization: `Bearer ${process.env.LETS_EXCHANGE_API_KEY}`
        }
    })

    return fetchLetsExchangeRate
}


async function getLetsExChangeFix(options: Options) {
    const getLetsExchangeInstance = getLetsExChange(options, false)
    const fetchLetsExchangeRate = await getLetsExchangeInstance
    return fetchLetsExchangeRate
}


async function getLetsExChangeRevert(options: Options) {
    const data = {
        from: options.from,
        to: options.to,
        amount: options.amountTo,
        affiliate_id: options.referralId, // for affiliate id
    }

    const fetchLetsExchangeRate = axios.post(`https://api.letsexchange.io/api/v1/info-revert`, data, {
        headers: {
            Authorization: `Bearer ${process.env.LETS_EXCHANGE_API_KEY}`
        }
    })
    return fetchLetsExchangeRate
}

async function createLetsExchangeTransaction(options: TransactionFormatterProps) {
    try {
        console.log("Creating LetsExchange transaction with data:", options);
        
        const newData = {
            coin_from: options.from.toUpperCase(),
            coin_to: options.to.toUpperCase(),
            network_from: options.fromNetwork,
            network_to: options.toNetwork,
            deposit_amount: options.amountDeposit,
            withdrawal: options.addressReceive,
            withdrawal_extra_id: "",
            affiliate_id: options.referralId,
            float: options.float
        }

        console.log("LetsExchange API request data:", newData);

        const res = await axios.post(`https://api.letsexchange.io/api/v1/transaction`, newData, {
            headers: {
                Authorization: `Bearer ${process.env.LETS_EXCHANGE_API_KEY}`
            }
        });

        console.log("LetsExchange API response:", res.data);

        if (!res.data) {
            throw new Error("Invalid response from LetsExchange API");
        }

        const data = res.data as LetsExchangeTransaction;

        const formattedData = transactionFormatter({ 
            addressDeposit: data.deposit, 
            addressReceive: data.withdrawal, 
            amountDeposit: data.deposit_amount, 
            amountEstimated: data.withdrawal_amount, 
            createdAt: new Date().toISOString().toString(), 
            from: data.coin_from, 
            to: data.coin_to, 
            id: data.transaction_id, 
            status: data.status, 
            userUnique: options.userUnique 
        });

        console.log("LetsExchange transaction created:", formattedData);
        return formattedData;
    } catch (err) {
        console.error("Error from createLetsExchangeTransaction:", err);
        throw err;
    }
}

async function getLetsExChangeTransaction(transactionID: string) {
    try {
        const { data } = await axios.get(`https://api.letsexchange.io/api/v1/transaction/${transactionID}`, {
            headers: {
                Authorization: `Bearer ${process.env.LETS_EXCHANGE_API_KEY}`
            }
        });

        if (!data || !data.deposit) {
            console.log("No transaction data found for LetsExchange transaction:", transactionID);
            return null;
        }

        const formattedData = transactionFormatter({ 
            addressDeposit: data.deposit, 
            addressReceive: data.withdrawal, 
            amountDeposit: data.deposit_amount, 
            amountEstimated: data.withdrawal_amount, 
            createdAt: new Date().toISOString().toString(), 
            from: data.coin_from, 
            to: data.coin_to, 
            id: data.transaction_id, 
            status: data.status 
        });

        return formattedData;
    } catch (err) {
        console.error("Error from getLetsExChangeTransaction", err);
        return null;
    }
}

async function getLetsExChangeTransactionStatus(transactionID: string) {
    try {
        const { data } = await axios.get(`https://api.letsexchange.io/api/v1/transaction/${transactionID}/status`, {
            headers: {
                Authorization: `Bearer ${process.env.LETS_EXCHANGE_API_KEY}`
            }
        })

        const formattedData = {
            status: data
        }

        return formattedData
    } catch (err) {
        console.error("Error from getLetsExChangeTransactionStatus")
        return null
    }
}


export { getLetsExChange, getLetsExChangeFix, getLetsExChangeRevert, createLetsExchangeTransaction, getLetsExChangeTransaction, getLetsExChangeTransactionStatus }