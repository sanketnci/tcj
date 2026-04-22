export interface Review {
  id: string;
  title: string;
  category: string;
  excerpt: string;
  image: string;
  date: string;
  readTime: string;
  url?: string;
}

export interface GarageGem {
  id: string;
  name: string;
  year: number;
  priceRange: string;
  whyGem: string;
  image: string;
}

export interface NewsItem {
  id: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  url?: string;
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  excerpt: string;
  image: string;
  content: string[];
  tags?: string[];
}

export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  width: number;
  height: number;
  title?: string;
  description?: string;
  category?: string;
  tags?: string[];
  dateTaken?: string;
  camera?: string;
  lens?: string;
  aperture?: string;
  shutterSpeed?: string;
  iso?: number;
  location?: string;
  featured?: boolean;
}
