'use client';

import { motion } from 'framer-motion';
import { Section, SectionHeader } from '@/components/ui/Section';
import { NewsCard } from '@/components/ui/Card';
import { news } from '@/lib/data';

export function LatestNews() {
  const featuredNews = news[0];
  const otherNews = news.slice(1);

  return (
    <Section id="news" dark={false}>
      <SectionHeader
        title="Latest News"
        subtitle="Stay updated with the latest automotive industry news, launches, and developments."
        dark={false}
      />

      <div className="max-w-4xl mx-auto">
        <div className="border border-glass-border rounded-sm overflow-hidden">
          <motion.article
            className="p-4 sm:p-6 md:p-8 border-b border-glass-border"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex flex-wrap items-center gap-2 sm:gap-4 mb-3 sm:mb-4">
              <span className="px-2 py-0.5 sm:px-3 sm:py-1 text-[10px] sm:text-xs font-medium tracking-wider uppercase bg-accent-gold text-bg-primary">
                {featuredNews.category}
              </span>
              <span className="text-[10px] sm:text-sm text-text-dark-secondary">{featuredNews.date}</span>
              <span className="hidden xs:inline text-[10px] sm:text-sm text-text-dark-secondary">·</span>
              <span className="text-[10px] sm:text-sm text-text-dark-secondary">{featuredNews.readTime}</span>
            </div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-serif font-semibold text-text-dark mb-3 sm:mb-4 hover:text-accent-copper transition-colors cursor-pointer">
              {featuredNews.title}
            </h2>
            <p className="text-sm sm:text-base text-text-dark-secondary leading-relaxed">
              Click to read the full story and discover what this means for the automotive industry.
            </p>
            <motion.div
              className="w-12 sm:w-16 h-0.5 mt-4 sm:mt-6 bg-accent-gold"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            />
          </motion.article>

          {otherNews.map((item) => (
            <NewsCard
              key={item.id}
              title={item.title}
              category={item.category}
              date={item.date}
              readTime={item.readTime}
            />
          ))}
        </div>
      </div>

      <motion.div
        className="mt-8 sm:mt-12 text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <motion.button
          className="px-6 sm:px-8 py-2.5 sm:py-3 border-2 border-text-dark text-text-dark font-semibold hover:bg-text-dark hover:text-bg-light transition-all duration-300 text-sm sm:text-base"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          View All News
        </motion.button>
      </motion.div>
    </Section>
  );
}
