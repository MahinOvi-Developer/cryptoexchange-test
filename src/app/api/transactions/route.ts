import { NextRequest, NextResponse } from 'next/server';
import { createTransaction } from '@/lib/controllers/create-transaction.controller';
import { validateAddress } from '@/utils/validate-address';

export async function POST(request: NextRequest) {
    try {
        const options = await request.json();
        
        if (await validateAddress(options.addressReceive, options.to) !== true) {
            return NextResponse.json(
                { message: "Invalid address" },
                { status: 400 }
            );
        }

        const data = await createTransaction(options);

        return NextResponse.json({
            transaction: {
                ...data
            }
        });
    } catch (error) {
        console.error("Error from createTransaction:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
