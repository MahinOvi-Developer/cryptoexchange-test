import { NextRequest, NextResponse } from 'next/server';
import { getCoins } from '@/lib/controllers/get-coins.controller';

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const search = searchParams.get('search') || undefined;
        const limit = searchParams.get('limit') || undefined;
        
        const coins = await getCoins({ search, limit });
        return NextResponse.json(coins);
    } catch (error) {
        console.error("Error from getCoins route:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
