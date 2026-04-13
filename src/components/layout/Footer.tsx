'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Car } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-bg-secondary border-t border-glass-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-sm bg-accent-gold flex items-center justify-center">
                <Car className="w-5 h-5 sm:w-6 sm:h-6 text-bg-primary" strokeWidth={2.5} />
              </div>
              <span className="font-heading text-lg sm:text-xl lg:text-2xl text-text-primary tracking-wider">
                The Car Journal
              </span>
            </div>
            <p className="text-text-secondary max-w-md leading-relaxed text-sm sm:text-base">
              Your destination for premium automotive reviews, industry insights, and the finest 
              automotive photography. We bring you closer to the cars that matter.
            </p>
          </div>

          <div>
            <h4 className="font-serif text-base sm:text-lg font-semibold text-text-primary mb-4 sm:mb-6">Quick Links</h4>
            <ul className="space-y-2 sm:space-y-3">
              {['Home', 'Articles', 'News'].map((link) => (
                <li key={link}>
                  <Link
                    href={`#${link === 'Home' ? 'hero' : link === 'Articles' ? 'reviews' : 'news'}`}
                    className="text-text-secondary hover:text-accent-gold transition-colors text-sm sm:text-base"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-base sm:text-lg font-semibold text-text-primary mb-4 sm:mb-6">Articles</h4>
            <ul className="space-y-2 sm:space-y-3">
              {['Market Trends', 'Battery Tech', 'Infrastructure'].map((link) => (
                <li key={link}>
                  <Link
                    href="#reviews"
                    className="text-text-secondary hover:text-accent-gold transition-colors text-sm sm:text-base"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <motion.div
          className="mt-10 sm:mt-16 pt-6 sm:pt-8 border-t border-glass-border flex flex-col md:flex-row items-center justify-between gap-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-text-secondary text-xs sm:text-sm">
            © {new Date().getFullYear()} <span className="font-heading">The Car Journal</span>. All rights reserved.
          </p>
          <div className="flex items-center gap-4 sm:gap-6">
            <Link href="#" className="text-text-secondary hover:text-accent-gold transition-colors text-xs sm:text-sm">
              Privacy Policy
            </Link>
            <Link href="#" className="text-text-secondary hover:text-accent-gold transition-colors text-xs sm:text-sm">
              Terms of Service
            </Link>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
