import { Review, GarageGem, NewsItem, GalleryImage } from '@/types';

export const reviews: Review[] = [
  {
    id: '1',
    title: 'The Future of EVs in India: A Comprehensive Market Analysis',
    category: 'Analysis',
    excerpt: 'India sold over 2 million electric vehicles in FY 24-25, with two-wheelers leading the charge at 59.4% market share. Discover the trends shaping the future of mobility.',
    image: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=800&q=80',
    date: '2026-04-13',
    readTime: '10 min read',
    url: '/articles/Future of EVs in India.pdf',
  },
  {
    id: '2',
    title: 'Li-NMC vs. Li-LFP: Which Battery Chemistry Wins in India?',
    category: 'Technology',
    excerpt: 'From energy density to thermal stability, we break down why LFP batteries are becoming the preferred choice for India\'s unique climatic challenges.',
    image: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=800&q=80',
    date: '2026-04-10',
    readTime: '12 min read',
    url: '/articles/Future of EVs in India.pdf',
  },
  {
    id: '3',
    title: 'Range Anxiety and the Battery Swapping Solution',
    category: 'Infrastructure',
    excerpt: 'Is Battery as a Service (BaaS) the missing link for mass EV adoption? Exploring how swapping stations could revolutionize urban commuting.',
    image: 'https://images.unsplash.com/photo-1594535182308-8ffefbb661e1?w=800&q=80',
    date: '2026-04-05',
    readTime: '8 min read',
    url: '/articles/Future of EVs in India.pdf',
  },
];

export const garageGems: GarageGem[] = [];

export const news: NewsItem[] = [
  {
    id: '1',
    title: 'India Hits 2 Million EV Sales Milestone in FY 24-25',
    category: 'Industry News',
    date: '2026-04-13',
    readTime: '4 min read',
    url: '/articles/Future of EVs in India.pdf',
  },
  {
    id: '2',
    title: 'Two-Wheeler Segment Dominates Indian EV Market with 59% Share',
    category: 'Market Trends',
    date: '2026-04-11',
    readTime: '5 min read',
    url: '/articles/Future of EVs in India.pdf',
  },
  {
    id: '3',
    title: 'Government Considering Standardization for Battery Swapping',
    category: 'Policy',
    date: '2026-04-08',
    readTime: '6 min read',
    url: '/articles/Future of EVs in India.pdf',
  },
];

export const galleryImages: GalleryImage[] = [];
