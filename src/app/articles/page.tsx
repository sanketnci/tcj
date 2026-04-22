'use client';

import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Section, SectionHeader } from '@/components/ui/Section';
import { ReviewCard } from '@/components/ui/Card';
import { articles } from '@/lib/data';

export default function ArticlesPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Section id="articles" className="pt-24 lg:pt-28">
          <SectionHeader
            title="Articles"
            subtitle="Read the latest automotive analysis, market trends, and feature stories in a clean blog layout."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8">
            {articles.map((article) => (
              <ReviewCard
                key={article.slug}
                image={article.image}
                title={article.title}
                category={article.category}
                excerpt={article.excerpt}
                href={`/articles/${article.slug}`}
              />
            ))}
          </div>
        </Section>
      </main>
      <Footer />
    </div>
  );
}
