import { NextRequest, NextResponse } from 'next/server';
import { getTransaction } from '@/lib/controllers/get-transaction.controller';

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const transactionId = searchParams.get('transactionId');
        
        if (!transactionId) {
            return NextResponse.json(
                { error: "Transaction ID is required" },
                { status: 400 }
            );
        }
        
        const transactions = await getTransaction({ transactionId });
        
        // Return the first transaction found, or null if none found
        const transaction = transactions && transactions.length > 0 ? transactions[0] : null;
        
        if (!transaction) {
            return NextResponse.json(
                { error: "Transaction not found" },
                { status: 404 }
            );
        }
        
        return NextResponse.json(transaction);
    } catch (error) {
        console.error("Error from get-transaction route:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
