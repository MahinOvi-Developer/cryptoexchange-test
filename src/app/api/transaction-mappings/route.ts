import { NextRequest, NextResponse } from 'next/server';
import { transactionRegistry } from '@/lib/transaction-registry';

// GET /api/transaction-mappings - Get all transaction mappings (for debugging)
export async function GET(request: NextRequest) {
    try {
        const transactions = await transactionRegistry.getAllTransactions();
        
        return NextResponse.json({
            success: true,
            count: transactions.length,
            transactions
        });
    } catch (error) {
        console.error("Error getting transaction mappings:", error);
        return NextResponse.json(
            { 
                success: false,
                error: "Failed to get transaction mappings" 
            },
            { status: 500 }
        );
    }
}

// POST /api/transaction-mappings/lookup - Look up adapter for a specific transaction
export async function POST(request: NextRequest) {
    try {
        const { transactionId } = await request.json();
        
        if (!transactionId) {
            return NextResponse.json(
                { 
                    success: false,
                    error: "Transaction ID is required" 
                },
                { status: 400 }
            );
        }

        const adapter = await transactionRegistry.getAdapter(transactionId);
        
        if (adapter) {
            return NextResponse.json({
                success: true,
                transactionId,
                adapter: adapter.adapter,
                adapterName: adapter.adapterName,
                createdAt: adapter.createdAt,
                userUnique: adapter.userUnique
            });
        } else {
            // Try pattern matching as fallback
            const identifiedAdapter = transactionRegistry.identifyAdapterByPattern(transactionId);
            
            return NextResponse.json({
                success: false,
                transactionId,
                message: "No adapter mapping found in database",
                patternMatch: identifiedAdapter
            });
        }
    } catch (error) {
        console.error("Error looking up transaction adapter:", error);
        return NextResponse.json(
            { 
                success: false,
                error: "Failed to lookup transaction adapter" 
            },
            { status: 500 }
        );
    }
}
