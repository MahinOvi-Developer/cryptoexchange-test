'use client';

import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { TransactionPage } from '@/components/transaction-page';
import { Toaster } from 'sonner';

export default function TransactionDetailPage({ params }: { params: { id: string } }) {
  return (
    <>
      <main className="w-full h-full bg-black container flex flex-col items-center justify-center mx-auto">
        <Header />
      </main>
      <TransactionPage />
      <Footer />
      <Toaster richColors />
    </>
  );
}
