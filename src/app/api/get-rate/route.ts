import { NextRequest, NextResponse } from 'next/server';
import { getRate } from '@/lib/controllers/get-rate.controller';

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        
        const options = {
            chooseRate: searchParams.get('chooseRate') || 'all',
            timeout: 30000,
            from: searchParams.get('from') || '',
            to: searchParams.get('to') || '',
            queryId: searchParams.get('queryId') ? parseInt(searchParams.get('queryId')!) : Math.floor(Math.random() * 1000000),
            chooseAdapters: searchParams.get('chooseAdapters')?.split(',') || ['easybit', 'letsexchange', 'changelly', 'change_now'],
            rateType: searchParams.get('rateType') || 'all',
            amount: searchParams.get('amount') ? parseFloat(searchParams.get('amount')!) : 0,
            amountTo: searchParams.get('amountTo') ? parseFloat(searchParams.get('amountTo')!) : undefined,
            referralId: searchParams.get('referralId') || '',
            ofcAdapter: false,
            fromNetwork: searchParams.get('fromNetwork') || '',
            toNetwork: searchParams.get('toNetwork') || ''
        };
        
        const rates = await getRate(options);
        return NextResponse.json(rates);
    } catch (error) {
        console.error("Error from get-rate route:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
