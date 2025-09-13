'use client';

import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Hero } from '@/components/hero';
import SwapNow from '@/components/swap-now';
import { HowItWorks } from '@/components/how-it-works';
import { WhySwap } from '@/components/why-swap';
import { GetStarted } from '@/components/get-started';
import { Toaster } from 'sonner';

export default function HomePage() {
  return (
    <>
      <main className="w-full min-h-screen bg-black overflow-x-hidden">
        <Header />
        <div className="pt-24 px-4 sm:px-6 md:px-8 lg:px-10 max-w-7xl mx-auto">
          <Hero />
          <SwapNow />
          <HowItWorks />
          <WhySwap />
          <GetStarted />
        </div>
      </main>
      <Footer />
      <Toaster richColors />
    </>
  );
}
