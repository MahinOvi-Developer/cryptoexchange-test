import { NextRequest, NextResponse } from 'next/server';
import { getTransactionStatus } from '@/lib/controllers/get-transaction-status.controller';

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
        
        const status = await getTransactionStatus({ transactionId });
        return NextResponse.json(status);
    } catch (error) {
        console.error("Error from get-transaction-status route:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
