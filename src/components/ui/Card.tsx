'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
  href?: string;
}

export function Card({ children, className, hover = true, onClick, href }: CardProps) {
  const content = (
    <motion.div
      onClick={onClick}
      className={cn(
        'relative h-full overflow-hidden rounded-sm bg-bg-tertiary',
        (hover || onClick || href) && 'cursor-pointer',
        className
      )}
      whileHover={hover ? { y: -4, boxShadow: '0 16px 32px rgba(0,0,0,0.3)' } : {}}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );

  if (href) {
    const isInternal = href.startsWith('/');

    return isInternal ? (
      <Link href={href} className="block h-full">
        {content}
      </Link>
    ) : (
      <Link href={href} target="_blank" rel="noopener noreferrer" className="block h-full">
        {content}
      </Link>
    );
  }

  return content;
}

interface ReviewCardProps {
  image: string;
  title: string;
  category: string;
  excerpt: string;
  onClick?: () => void;
  href?: string;
}

export function ReviewCard({ image, title, category, excerpt, onClick, href }: ReviewCardProps) {
  return (
    <Card className="group" onClick={onClick} href={href}>
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bg-tertiary via-transparent to-transparent" />
        <motion.span
          className="absolute top-3 left-3 sm:top-4 sm:left-4 px-2 py-0.5 sm:px-3 sm:py-1 text-[10px] sm:text-xs font-medium tracking-wider uppercase bg-accent-gold text-bg-primary"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          {category}
        </motion.span>
      </div>
      <div className="p-4 sm:p-6">
        <h3 className="mb-2 sm:mb-3 font-serif text-base sm:text-lg lg:text-xl font-semibold text-text-primary group-hover:text-accent-gold transition-colors line-clamp-2">
          {title}
        </h3>
        <p className="text-xs sm:text-sm text-text-secondary line-clamp-2">{excerpt}</p>
      </div>
    </Card>
  );
}

interface GemCardProps {
  name: string;
  year: number;
  priceRange: string;
  whyGem: string;
  image: string;
}

export function GemCard({ name, year, priceRange, whyGem, image }: GemCardProps) {
  return (
    <div className="relative flex-shrink-0 w-[280px] sm:w-[300px] md:w-[320px] overflow-hidden rounded-sm glass-effect group">
      <div className="relative h-[160px] sm:h-[180px] md:h-[200px] overflow-hidden">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 280px, (max-width: 768px) 300px, 320px"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bg-primary via-bg-primary/50 to-transparent" />
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5">
        <div className="flex items-center justify-between mb-1 sm:mb-2">
          <span className="font-mono text-xs sm:text-sm text-accent-gold">{year}</span>
          <span className="font-mono text-[10px] sm:text-xs text-accent-silver">{priceRange}</span>
        </div>
        <h3 className="mb-1 sm:mb-2 font-serif text-base sm:text-lg font-semibold text-text-primary">{name}</h3>
        <p className="text-xs sm:text-sm text-text-secondary line-clamp-2">{whyGem}</p>
      </div>
      <motion.div
        className="absolute inset-0 border border-transparent group-hover:border-accent-gold/50 transition-colors duration-300 pointer-events-none"
        initial={false}
      />
    </div>
  );
}

interface NewsCardProps {
  title: string;
  category: string;
  date: string;
  readTime: string;
  featured?: boolean;
  href?: string;
}

export function NewsCard({ title, category, date, readTime, featured = false, href }: NewsCardProps) {
  const content = (
    <motion.article
      className={cn(
        'group p-4 sm:p-6 border-b border-glass-border transition-colors hover:bg-bg-tertiary/50',
        featured && 'md:col-span-2 md:p-6 sm:md:p-8',
        href && 'cursor-pointer'
      )}
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-wrap items-center gap-2 sm:gap-4 mb-2 sm:mb-3">
        <span className="text-[10px] sm:text-xs font-medium tracking-wider uppercase text-accent-gold">
          {category}
        </span>
        <span className="text-[10px] sm:text-xs text-text-secondary">{date}</span>
        <span className="hidden xs:inline text-[10px] sm:text-xs text-text-secondary">·</span>
        <span className="text-[10px] sm:text-xs text-text-secondary">{readTime}</span>
      </div>
      <h3
        className={cn(
          'font-serif font-semibold text-text-primary group-hover:text-accent-gold transition-colors',
          featured ? 'text-xl sm:text-2xl md:text-3xl' : 'text-base sm:text-lg'
        )}
      >
        {title}
      </h3>
      <motion.div
        className="w-0 h-0.5 mt-3 sm:mt-4 bg-accent-gold group-hover:w-12 sm:w-16 transition-all duration-300"
        initial={false}
      />
    </motion.article>
  );

  if (href) {
    const isInternal = href.startsWith('/');

    return isInternal ? (
      <Link href={href} className="block h-full">
        {content}
      </Link>
    ) : (
      <Link href={href} target="_blank" rel="noopener noreferrer">
        {content}
      </Link>
    );
  }

  return content;
}
