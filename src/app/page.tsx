'use client';

import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Hero } from '@/components/sections/Hero';
import { FeaturedReviews } from '@/components/sections/FeaturedReviews';
import { LatestNews } from '@/components/sections/LatestNews';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <FeaturedReviews />
        <LatestNews />
      </main>
      <Footer />
    </div>
  );
}
