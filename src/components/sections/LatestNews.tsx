'use client';

import { motion } from 'framer-motion';
import { Section, SectionHeader } from '@/components/ui/Section';
import { NewsCard } from '@/components/ui/Card';
import { news } from '@/lib/data';

export function LatestNews() {
  const featuredNews = news[0];
  const otherNews = news.slice(1);

  return (
    <Section id="news">
      <SectionHeader
        title="Latest News"
        subtitle="Stay updated with the latest automotive industry developments."
      />

      <div className="max-w-4xl mx-auto">
        <div className="border border-glass-border rounded-sm overflow-hidden">
          <NewsCard
            title={featuredNews.title}
            category={featuredNews.category}
            date={featuredNews.date}
            readTime={featuredNews.readTime}
            featured={true}
            href={featuredNews.url}
          />

          {otherNews.map((item) => (
            <NewsCard
              key={item.id}
              title={item.title}
              category={item.category}
              date={item.date}
              readTime={item.readTime}
              href={item.url}
            />
          ))}
        </div>
      </div>
    </Section>
  );
}
