import { NextRequest, NextResponse } from 'next/server';
import { createTransaction } from '@/lib/controllers/create-transaction.controller';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        
        const transaction = await createTransaction(body);
        return NextResponse.json({ transaction });
    } catch (error) {
        console.error("Error from create-transaction route:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
