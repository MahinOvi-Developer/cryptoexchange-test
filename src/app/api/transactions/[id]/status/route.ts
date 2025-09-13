import { NextRequest, NextResponse } from 'next/server';
import { getTransactionStatus } from '@/lib/controllers/get-transaction-status.controller';

export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const { id } = params;
        const status = await getTransactionStatus({ transactionId: id });
        
        if (!status) {
            return NextResponse.json(
                { error: "Transaction status not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(status);
    } catch (error) {
        console.error("Error from getTransactionStatus route:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
