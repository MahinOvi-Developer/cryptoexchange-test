import { createEasybitTransaction } from "../adapters/easy-bit";
import { createLetsExchangeTransaction } from "../adapters/lets-exchange";
import { createChangellyTransaction } from "../adapters/changelly";
import { createChangeNowTransaction } from "../adapters/change-now";
import { TransactionFormatterProps } from "../../types";
import { transactionRegistry } from "../transaction-registry";

type AdapterSwitcher = {
    [K in string]: Function
}

async function createTransaction(options: TransactionFormatterProps) {
    try {
        console.log("Creating transaction with options:", {
            adapterName: options.adapterName,
            from: options.from,
            to: options.to,
            amountDeposit: options.amountDeposit,
            addressReceive: options.addressReceive
        });

        const adapters: AdapterSwitcher = {
            easybit: () => createEasybitTransaction(options),
            letsexchange: () => createLetsExchangeTransaction(options),
            changelly: () => createChangellyTransaction(options),
            change_now: () => createChangeNowTransaction(options),
        }

        // Map adapter names to correct keys
        const adapterMapping: { [key: string]: string } = {
            'easybit': 'easybit',
            'letsexchange': 'letsexchange', 
            'changelly': 'changelly',
            'change': 'change_now',
            'change_now': 'change_now'
        };

        const adapterKey = adapterMapping[options.adapterName || ''] || options.adapterName || '';
        console.log("Using adapter key:", adapterKey, "for adapter name:", options.adapterName);

        const adapter = adapters[adapterKey];

        if (!adapter) {
            console.error(`Adapter "${options.adapterName}" not found. Available adapters:`, Object.keys(adapters));
            throw new Error(`Adapter "${options.adapterName}" not found.`);
        }

        console.log("Calling adapter function...");
        const data = await adapter();
        console.log("Transaction created successfully:", data);

        // Add adapter information to the transaction data and register it
        if (data) {
            data.adapter = adapterKey;
            data.adapterName = options.adapterName;
            
            // Register the transaction in our registry for future lookups
            await transactionRegistry.register(data.id, adapterKey, options.adapterName || adapterKey, options.userUnique);
        }

        return data;
    } catch (err) {
        console.error("Error from createTransaction:", err);
        throw err;
    }
}



export { createTransaction }