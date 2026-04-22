import { Metadata } from 'next';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Gallery } from '@/components/sections/Gallery';

export const metadata: Metadata = {
  title: 'Gallery | The Car Journal',
  description: 'Explore our curated collection of premium automotive photography. Discover stunning car shots, detailed reviews, and automotive artistry.',
  keywords: ['automotive photography', 'car gallery', 'automotive images', 'car reviews', 'photography'],
  openGraph: {
    title: 'Gallery | The Car Journal',
    description: 'Explore our curated collection of premium automotive photography',
    type: 'website',
  },
};

export default function GalleryPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Gallery />
      </main>
      <Footer />
    </div>
  );
}