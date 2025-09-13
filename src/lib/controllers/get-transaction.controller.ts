import { getChangeNowTransaction, getChangeNowTransactionStatus } from "../adapters/change-now";
import { getChangellyTransaction } from "../adapters/changelly";
import { getEasyBitTransaction } from "../adapters/easy-bit"
import { getLetsExChangeTransaction } from "../adapters/lets-exchange";
import { TransactionData } from "../../types";
import { transactionRegistry } from "../transaction-registry";




async function getTransaction({ transactionId }: { transactionId: string }) {
    const transactionsData: TransactionData[] = [];
    
    if (!transactionId) {
        console.error("Transaction ID is required");
        return transactionsData;
    }

    console.log(`Looking up transaction: ${transactionId}`);

    try {
        // First, check if we have the adapter information in our registry
        const registeredAdapter = await transactionRegistry.getAdapter(transactionId);
        
        if (registeredAdapter) {
            console.log(`Found registered adapter for transaction ${transactionId}: ${registeredAdapter.adapterName}`);
            
            // Query only the specific adapter that created this transaction
            const result = await getTransactionFromSpecificAdapter(transactionId, registeredAdapter.adapter);
            if (result) {
                transactionsData.push(result);
            }
        } else {
            console.log(`No registered adapter found for transaction ${transactionId}, trying pattern matching...`);
            
            // Fallback: Try to identify adapter by transaction ID pattern
            const identifiedAdapter = transactionRegistry.identifyAdapterByPattern(transactionId);
            
            if (identifiedAdapter) {
                console.log(`Identified adapter by pattern: ${identifiedAdapter}`);
                const result = await getTransactionFromSpecificAdapter(transactionId, identifiedAdapter);
                if (result) {
                    transactionsData.push(result);
                }
            } else {
                console.log(`Could not identify adapter, falling back to searching all adapters...`);
                
                // Last resort: Search all adapters (old behavior)
                const results = await Promise.allSettled([
                    getEasyBitTransaction(transactionId),
                    getLetsExChangeTransaction(transactionId), 
                    getChangellyTransaction(transactionId),
                    getChangeNowTransaction(transactionId)
                ]);

                results.forEach((result, index) => {
                    const adapterNames = ['EasyBit', 'LetsExchange', 'Changelly', 'ChangeNow'];
                    
                    if (result.status === 'fulfilled' && result.value) {
                        transactionsData.push(result.value as TransactionData);
                    } else if (result.status === 'rejected') {
                        console.error(`Error from ${adapterNames[index]} adapter:`, result.reason);
                    }
                });
            }
        }

    } catch (err) {
        console.error("Error from getTransaction controller:", err);
    }

    console.log(`Found ${transactionsData.length} transaction(s) for ID: ${transactionId}`);
    return transactionsData;
}

// Helper function to query a specific adapter
async function getTransactionFromSpecificAdapter(transactionId: string, adapter: string): Promise<TransactionData | null> {
    try {
        switch (adapter) {
            case 'easybit':
                return await getEasyBitTransaction(transactionId);
            case 'letsexchange':
                return await getLetsExChangeTransaction(transactionId);
            case 'changelly':
                return await getChangellyTransaction(transactionId);
            case 'change_now':
                return await getChangeNowTransaction(transactionId);
            default:
                console.error(`Unknown adapter: ${adapter}`);
                return null;
        }
    } catch (err) {
        console.error(`Error querying ${adapter} adapter for transaction ${transactionId}:`, err);
        return null;
    }
}

export { getTransaction }