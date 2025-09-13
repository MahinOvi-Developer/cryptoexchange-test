import { NextRequest, NextResponse } from 'next/server';
import { getTransaction } from '@/lib/controllers/get-transaction.controller';

export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const { id } = params;
        const transaction = await getTransaction({ transactionId: id });
        
        if (!transaction) {
            return NextResponse.json(
                { error: "Transaction not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(transaction);
    } catch (error) {
        console.error("Error from getTransaction route:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
