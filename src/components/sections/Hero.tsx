'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function Hero() {
  const ref = useRef(null);
  const { scrollY } = useScroll();
  
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  const words = ['Electric', 'Future', 'Arrived'];

  return (
    <section id="hero" ref={ref} className="relative h-screen min-h-[600px] overflow-hidden">
      <motion.div
        className="absolute inset-0"
        style={{ y }}
      >
        <Image
          src="https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=1920&q=80"
          alt="Electric vehicle charging"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-bg-primary/40 via-bg-primary/20 to-bg-primary" />
        <div className="absolute inset-0 bg-gradient-to-t from-bg-primary via-transparent to-transparent" />
      </motion.div>

      <div className="absolute inset-0 grain-overlay" />

      <motion.div
        className="relative z-10 flex flex-col items-center justify-center h-full px-4 sm:px-6 text-center"
        style={{ opacity }}
      >
        <motion.p
          className="mb-4 sm:mb-6 text-xs sm:text-sm tracking-[0.2em] sm:tracking-[0.3em] uppercase text-accent-gold"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Premium Automotive Editorial
        </motion.p>

        <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-text-primary mb-3 sm:mb-4 overflow-hidden px-2">
          {words.map((word, i) => (
            <motion.span
              key={word}
              className="inline-block mr-2 sm:mr-4"
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 + i * 0.15, ease: [0.215, 0.61, 0.355, 1] }}
            >
              {word}
            </motion.span>
          ))}
        </h1>

        <motion.div
          className="w-20 sm:w-32 h-0.5 bg-gradient-to-r from-transparent via-accent-gold to-transparent mb-6 sm:mb-8"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.9 }}
        />

        <motion.p
          className="max-w-lg sm:max-w-xl px-4 text-base sm:text-lg md:text-xl text-text-secondary mb-8 sm:mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
        >
          Discover the comprehensive analysis of India's shifting 
          automotive landscape and the battery tech powering it.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.1 }}
        >
          <Link href="/articles/Future of EVs in India.pdf" target="_blank">
            <Button size="lg">
              Read Latest Report
            </Button>
          </Link>
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute bottom-8 sm:bottom-10 left-1/2 -translate-x-1/2 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <motion.div
          className="flex flex-col items-center gap-2 text-text-secondary"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <span className="text-[10px] sm:text-xs tracking-wider uppercase">Scroll</span>
          <ChevronDown size={18} className="sm:w-5 sm:h-5" />
        </motion.div>
      </motion.div>
    </section>
  );
}
