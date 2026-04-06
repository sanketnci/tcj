'use client';

import { useRef } from 'react';
import { motion } from 'framer-motion';
import { Section, SectionHeader } from '@/components/ui/Section';
import { GemCard } from '@/components/ui/Card';
import { garageGems } from '@/lib/data';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export function GarageGems() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      const newScroll = scrollRef.current.scrollLeft + (direction === 'left' ? -scrollAmount : scrollAmount);
      scrollRef.current.scrollTo({ left: newScroll, behavior: 'smooth' });
    }
  };

  return (
    <Section id="garage-gems" className="relative overflow-hidden">
      <div className="absolute inset-0 gradient-metallic opacity-20" />
      
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-1/3 h-full bg-gradient-to-r from-bg-primary to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-bg-primary to-transparent z-10 pointer-events-none" />
      </div>

      <SectionHeader
        title="Garage Gems"
        subtitle="Pre-owned treasures that deliver exceptional value without compromising on driving pleasure."
        dark={true}
      />

      <div className="relative">
        <div
          ref={scrollRef}
          className="flex gap-4 sm:gap-6 overflow-x-auto pb-6 sm:pb-8 snap-x snap-mandatory scrollbar-hide"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          <div className="flex-shrink-0 w-4 sm:hidden" />
          {garageGems.map((gem, index) => (
            <motion.div
              key={gem.id}
              className="snap-start"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <GemCard
                name={gem.name}
                year={gem.year}
                priceRange={gem.priceRange}
                whyGem={gem.whyGem}
                image={gem.image}
              />
            </motion.div>
          ))}
          <div className="flex-shrink-0 w-4 sm:hidden" />
        </div>

        <div className="hidden sm:flex justify-center gap-3 sm:gap-4 mt-6 sm:mt-8">
          <motion.button
            onClick={() => handleScroll('left')}
            className="p-2 sm:p-3 glass-effect rounded-full text-text-secondary hover:text-accent-gold hover:border-accent-gold/50 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Scroll left"
          >
            <ChevronLeft size={20} className="sm:w-6 sm:h-6" />
          </motion.button>
          <motion.button
            onClick={() => handleScroll('right')}
            className="p-2 sm:p-3 glass-effect rounded-full text-text-secondary hover:text-accent-gold hover:border-accent-gold/50 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Scroll right"
          >
            <ChevronRight size={20} className="sm:w-6 sm:h-6" />
          </motion.button>
        </div>
      </div>

      <motion.p
        className="mt-8 sm:mt-12 text-center text-text-secondary text-xs sm:text-sm"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
      >
        ← Swipe to explore more gems →
      </motion.p>
    </Section>
  );
}
