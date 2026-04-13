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

export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  width: number;
  height: number;
}
