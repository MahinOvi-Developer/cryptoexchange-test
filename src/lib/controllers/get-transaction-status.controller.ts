import { getChangeNowTransactionStatus } from "../adapters/change-now";
import { getChangellyTransactionStatus } from "../adapters/changelly";
import { getEasyBitTransactionStatus } from "../adapters/easy-bit";
import { getLetsExChangeTransactionStatus } from "../adapters/lets-exchange";
import { TransactionStatus } from "../../types";
import { transactionRegistry } from "../transaction-registry";

type StatusAdapterSwitcher = {
    [key: string]: (transactionId: string) => Promise<TransactionStatus | null>;
}

async function getTransactionStatusFromSpecificAdapter(transactionId: string, adapterKey: string): Promise<TransactionStatus | null> {
    const adapters: StatusAdapterSwitcher = {
        easybit: getEasyBitTransactionStatus,
        letsexchange: getLetsExChangeTransactionStatus,
        changelly: getChangellyTransactionStatus,
        change_now: getChangeNowTransactionStatus,
    };

    const adapter = adapters[adapterKey];
    if (!adapter) {
        console.log(`No status adapter found for key: ${adapterKey}`);
        return null;
    }

    try {
        console.log(`Getting transaction status from ${adapterKey} for transaction: ${transactionId}`);
        return await adapter(transactionId);
    } catch (error) {
        console.error(`Error getting status from ${adapterKey}:`, error);
        return null;
    }
}

async function getTransactionStatus({ transactionId }: { transactionId: string }) {
    try {
        // First, try to get adapter info from registry
        const registeredAdapter = await transactionRegistry.getAdapter(transactionId);
        
        if (registeredAdapter) {
            console.log(`Found registered adapter for transaction ${transactionId}: ${registeredAdapter.adapter}`);
            const result = await getTransactionStatusFromSpecificAdapter(transactionId, registeredAdapter.adapter);
            return result ? [result] : [];
        }

        // Fallback: try to identify adapter by pattern
        const identifiedAdapter = transactionRegistry.identifyAdapterByPattern(transactionId);
        if (identifiedAdapter) {
            console.log(`Identified adapter by pattern for transaction ${transactionId}: ${identifiedAdapter}`);
            const result = await getTransactionStatusFromSpecificAdapter(transactionId, identifiedAdapter);
            return result ? [result] : [];
        }

        // Last resort: query all adapters (old behavior)
        console.log(`No adapter found for transaction ${transactionId}, querying all adapters`);
        const transactionsData: TransactionStatus[] = [];
        
        const [easyBitResult, letsExchangeResult, changellyResult, changeNowResult] = await Promise.all([
            getEasyBitTransactionStatus(transactionId), 
            getLetsExChangeTransactionStatus(transactionId), 
            getChangellyTransactionStatus(transactionId), 
            getChangeNowTransactionStatus(transactionId)
        ]);

        if (easyBitResult) transactionsData.push(easyBitResult);
        if (letsExchangeResult) transactionsData.push(letsExchangeResult);
        if (changellyResult) transactionsData.push(changellyResult);
        if (changeNowResult) transactionsData.push(changeNowResult);

        return transactionsData;

    } catch (err) {
        console.error("Error from getTransactionStatus:", err);
        return [];
    }
}

export { getTransactionStatus }