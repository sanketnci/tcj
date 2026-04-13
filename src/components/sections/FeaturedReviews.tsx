'use client';

import { motion } from 'framer-motion';
import { Section, SectionHeader } from '@/components/ui/Section';
import { ReviewCard } from '@/components/ui/Card';
import { reviews } from '@/lib/data';
import { Button } from '@/components/ui/Button';

export function FeaturedReviews() {
  const featuredReviews = reviews.slice(0, 6);

  return (
    <Section id="reviews">
      <SectionHeader
        title="Featured Reports"
        subtitle="In-depth analysis of the automotive landscape and market trends."
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
        {featuredReviews.map((review, index) => (
          <motion.div
            key={review.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            <ReviewCard
              image={review.image}
              title={review.title}
              category={review.category}
              excerpt={review.excerpt}
              href={review.url}
            />
          </motion.div>
        ))}
      </div>


    </Section>
  );
}
