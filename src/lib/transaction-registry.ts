// MySQL-backed transaction registry to track which adapter created each transaction
import connectDB from './database';

interface TransactionMetadata {
    id: string;
    adapter: string;
    adapterName: string;
    createdAt: string;
    userUnique?: string;
}

class TransactionRegistry {
    // Store transaction metadata when created
    async register(transactionId: string, adapter: string, adapterName: string, userUnique?: string) {
        try {
            const connection = await connectDB();
            
            await connection.execute(
                'INSERT INTO transaction_mappings (transaction_id, adapter, adapter_name, user_unique) VALUES (?, ?, ?, ?)',
                [transactionId, adapter, adapterName, userUnique]
            );
            
            console.log(`Registered transaction ${transactionId} with adapter ${adapterName} in database`);
        } catch (error) {
            console.error(`Failed to register transaction ${transactionId}:`, error);
            // Don't throw error to avoid breaking transaction creation
        }
    }

    // Get adapter information for a transaction
    async getAdapter(transactionId: string): Promise<TransactionMetadata | null> {
        try {
            const connection = await connectDB();
            
            const [rows] = await connection.execute(
                'SELECT transaction_id, adapter, adapter_name, user_unique, created_at FROM transaction_mappings WHERE transaction_id = ?',
                [transactionId]
            );
            
            const mappings = rows as any[];
            
            if (mappings.length > 0) {
                const mapping = mappings[0];
                return {
                    id: mapping.transaction_id,
                    adapter: mapping.adapter,
                    adapterName: mapping.adapter_name,
                    createdAt: mapping.created_at.toISOString(),
                    userUnique: mapping.user_unique
                };
            }
            
            return null;
        } catch (error) {
            console.error(`Failed to get adapter for transaction ${transactionId}:`, error);
            return null;
        }
    }

    // Identify adapter based on transaction ID patterns (fallback method)
    identifyAdapterByPattern(transactionId: string): string | null {
        if (!transactionId) return null;

        // EasyBit: typically numeric IDs
        if (/^\d+$/.test(transactionId)) {
            return 'easybit';
        }

        // Changelly: UUID format
        if (/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(transactionId)) {
            return 'changelly';
        }

        // ChangeNow: alphanumeric with specific length
        if (/^[a-z0-9]{16,32}$/i.test(transactionId)) {
            return 'change_now';
        }

        // LetsExchange: mixed format
        if (/^[a-zA-Z0-9]{8,20}$/.test(transactionId)) {
            return 'letsexchange';
        }

        return null;
    }

    // Get all registered transactions (for debugging)
    async getAllTransactions(): Promise<TransactionMetadata[]> {
        try {
            const connection = await connectDB();
            
            const [rows] = await connection.execute(
                'SELECT transaction_id, adapter, adapter_name, user_unique, created_at FROM transaction_mappings ORDER BY created_at DESC'
            );
            
            const mappings = rows as any[];
            
            return mappings.map(mapping => ({
                id: mapping.transaction_id,
                adapter: mapping.adapter,
                adapterName: mapping.adapter_name,
                createdAt: mapping.created_at.toISOString(),
                userUnique: mapping.user_unique
            }));
        } catch (error) {
            console.error('Failed to get all transactions:', error);
            return [];
        }
    }

    // Clear old transactions (cleanup method)
    async cleanup(olderThanHours: number = 24) {
        try {
            const connection = await connectDB();
            
            const cutoffDate = new Date(Date.now() - olderThanHours * 60 * 60 * 1000);
            
            const [result] = await connection.execute(
                'DELETE FROM transaction_mappings WHERE created_at < ?',
                [cutoffDate]
            );
            
            const deletedCount = (result as any).affectedRows || 0;
            console.log(`Cleaned up ${deletedCount} old transaction mappings`);
            return deletedCount;
        } catch (error) {
            console.error('Failed to cleanup old transactions:', error);
            return 0;
        }
    }
}

// Export singleton instance
export const transactionRegistry = new TransactionRegistry();
