import axios from "axios"
import { Options, TransactionFormatterProps } from "../../types"
import { transactionFormatter } from "../utils/transaction-formatter"
import { transactionStatusFormatter } from "../utils/transaction-status-formatter"
import { EasyBitTransaction, EasyBitTransactionStatus } from "../../types/easybit"

async function getEasyBit(options: Options) {
    try {
        const fetchEasyBitRate = axios.get(`https://api.easybit.com/rate?send=${options.from.toUpperCase()}&receive=${options.to.toUpperCase()}&amount=${parseFloat(options.amount as unknown as string)}&sendNetwork=${options.fromNetwork.toUpperCase()}&receiveNetwork=${options.toNetwork.toUpperCase()}`, {
            headers: {
                ["API-KEY"]: process.env.EASY_BIT_API_KEY
            }
        })

        return fetchEasyBitRate
    } catch (err) {
        console.error("Error from getEasyBit")
    }
}

async function createEasybitTransaction(options: TransactionFormatterProps) {
    try {
        console.log("Creating EasyBit transaction with data:", options);
        
        const newData = {
            send: options.from.toUpperCase(),
            receive: options.to.toUpperCase(),
            amount: options.amountDeposit,
            receiveAddress: options.addressReceive,
            userDeviceId: options.userUnique,
            sendNetwork: options.fromNetwork,
            receiveNetwork: options.toNetwork
        }

        console.log("EasyBit API request data:", newData);

        const res = await axios.post(`https://api.easybit.com/order`, newData, {
            headers: {
                ["API-KEY"]: process.env.EASY_BIT_API_KEY
            }
        });

        console.log("EasyBit API response:", res.data);

        if (!res.data || !res.data.data) {
            throw new Error("Invalid response from EasyBit API");
        }

        const data = res.data.data;

        const formattedData = transactionFormatter({ 
            addressDeposit: data.sendAddress, 
            addressReceive: data.receiveAddress, 
            amountDeposit: data.sendAmount, 
            amountEstimated: data.receiveAmount, 
            createdAt: new Date(data.createdAt).toISOString().toString(), 
            from: data.send, 
            to: data.receive, 
            id: data.id, 
            status: data.status, 
            userUnique: options.userUnique 
        });

        console.log("EasyBit transaction created:", formattedData);
        return formattedData;
    } catch (err) {
        console.error("Error from createEasybitTransaction:", err);
        throw err;
    }
}

async function getEasyBitTransaction(transactionID: string) {
    try {
        const { data } = await axios.get(`https://api.easybit.com/orders?id=${transactionID}`, {
            headers: {
                ["API-KEY"]: process.env.EASY_BIT_API_KEY
            }
        });

        if (!data || !data.data || !Array.isArray(data.data) || data.data.length === 0) {
            console.log("No transaction data found for EasyBit transaction:", transactionID);
            return null;
        }

        const result = data.data[0] as EasyBitTransaction;
        
        if (!result || !result.sendAddress) {
            console.log("Invalid transaction data structure from EasyBit:", result);
            return null;
        }

        const formattedData = transactionFormatter({ 
            addressDeposit: result.sendAddress, 
            addressReceive: result.receiveAddress, 
            amountDeposit: result.sendAmount, 
            amountEstimated: result.receiveAmount, 
            id: result.id, 
            from: result.send, 
            to: result.receive, 
            createdAt: new Date(result.createdAt).toISOString().toString(), 
            status: result.status 
        });

        return formattedData;
    } catch (err) {
        console.error("Error from getEasyBitTransaction", err);
        return null;
    }
}

async function getEasyBitTransactionStatus(transactionID: string) {
    try {
        const { data } = await axios.get(`https://api.easybit.com/orderStatus?id=${transactionID}`, {
            headers: {
                ["API-KEY"]: process.env.EASY_BIT_API_KEY
            }
        })
        const result = data.data as EasyBitTransactionStatus
        const formattedData = transactionStatusFormatter({ status: result.status, receiveAmount: result.receiveAmount, id: result.id })

        return formattedData
    } catch (err) {
        console.error("Error from getTransactionStatus")
        return null
    }
}

export { getEasyBit, createEasybitTransaction, getEasyBitTransaction, getEasyBitTransactionStatus }