'use client';

import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Hero } from '@/components/sections/Hero';
import { FeaturedReviews } from '@/components/sections/FeaturedReviews';
import { GarageGems } from '@/components/sections/GarageGems';
import { LatestNews } from '@/components/sections/LatestNews';
import { Gallery } from '@/components/sections/Gallery';
import { Socials } from '@/components/sections/Socials';
import { Contact } from '@/components/sections/Contact';
import { motion } from 'framer-motion';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <FeaturedReviews />
        <GarageGems />
        <LatestNews />
        <Gallery />
        <Socials />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
