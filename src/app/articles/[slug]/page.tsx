import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/Button';
import { articles } from '@/lib/data';

interface ArticlePageProps {
  params: {
    slug: string;
  };
}

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

export default function ArticlePage({ params }: ArticlePageProps) {
  const article = articles.find((item) => item.slug === params.slug);

  if (!article) {
    notFound();
  }

  return (
    <div className="min-h-screen flex flex-col bg-bg-primary">
      <Navbar />
      <main className="flex-1 px-4 sm:px-6 lg:px-8 py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.24em] text-accent-gold">{article.category}</p>
              <h1 className="mt-3 font-heading text-3xl sm:text-4xl md:text-5xl text-text-primary">{article.title}</h1>
              <div className="mt-4 flex flex-wrap gap-3 text-sm text-text-secondary">
                <span>{article.date}</span>
                <span>·</span>
                <span>{article.readTime}</span>
              </div>
            </div>

            <Link href="/articles" className="w-fit">
              <Button variant="secondary" size="md">
                Back to articles
              </Button>
            </Link>
          </div>

          <div className="overflow-hidden rounded-sm border border-glass-border bg-bg-tertiary">
            <div className="relative h-72 sm:h-96">
              <Image
                src={article.image}
                alt={article.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>

          <div className="mt-10 grid gap-10 lg:grid-cols-[1.3fr_0.7fr]">
            <article className="space-y-6 text-base leading-8 text-text-secondary">
              {article.content.map((paragraph, index) => (
                <p key={index} className="text-text-secondary first:mt-0">
                  {paragraph}
                </p>
              ))}
            </article>

            <aside className="rounded-sm border border-glass-border bg-bg-tertiary p-6">
              <h2 className="mb-4 text-xl font-semibold text-text-primary">Quick facts</h2>
              <dl className="space-y-4 text-sm text-text-secondary">
                <div>
                  <dt className="font-medium text-text-primary">Category</dt>
                  <dd>{article.category}</dd>
                </div>
                <div>
                  <dt className="font-medium text-text-primary">Published</dt>
                  <dd>{article.date}</dd>
                </div>
                <div>
                  <dt className="font-medium text-text-primary">Read time</dt>
                  <dd>{article.readTime}</dd>
                </div>
                {article.tags?.length ? (
                  <div>
                    <dt className="font-medium text-text-primary">Tags</dt>
                    <dd className="mt-2 flex flex-wrap gap-2">
                      {article.tags.map((tag) => (
                        <span key={tag} className="rounded-full border border-glass-border px-3 py-1 text-[11px] uppercase tracking-[0.22em] text-text-secondary">
                          {tag}
                        </span>
                      ))}
                    </dd>
                  </div>
                ) : null}
              </dl>
            </aside>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
