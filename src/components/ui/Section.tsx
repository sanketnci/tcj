'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface SectionProps {
  children: ReactNode;
  className?: string;
  dark?: boolean;
  id?: string;
}

export function Section({ children, className, id }: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        'relative py-12 sm:py-16 md:py-20 lg:py-28 bg-bg-primary transition-colors duration-300',
        className
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {children}
      </div>
    </section>
  );
}

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
}

export function SectionHeader({ title, subtitle, centered = true }: SectionHeaderProps) {
  return (
    <div className={cn('mb-10 sm:mb-12 md:mb-16', centered && 'text-center')}>
      <motion.h2
        className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-3 sm:mb-4 text-text-primary"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          className="max-w-2xl mx-auto text-sm sm:text-base md:text-lg px-2 sm:px-0 text-text-secondary"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {subtitle}
        </motion.p>
      )}
      <motion.div
        className="w-16 sm:w-20 md:w-24 h-0.5 mx-auto mt-6 sm:mt-8 bg-gradient-to-r from-transparent via-accent-gold to-transparent"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
      />
    </div>
  );
}
