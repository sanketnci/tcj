'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Section, SectionHeader } from '@/components/ui/Section';
import { Lightbox } from '@/components/ui/Lightbox';
import { galleryImages } from '@/lib/data';
import { Maximize2 } from 'lucide-react';

export function Gallery() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => setLightboxOpen(false);

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % galleryImages.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  };

  return (
    <Section id="gallery">
      <SectionHeader
        title="Gallery"
        subtitle="A curated collection of automotive photography capturing the essence of driving excellence."

      />

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-4">
        {galleryImages.map((image, index) => (
          <motion.div
            key={image.id}
            className={`relative overflow-hidden rounded-sm group cursor-pointer ${
              index === 0 || index === 5 ? 'sm:col-span-2 sm:row-span-2' : ''
            }`}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
            onClick={() => openLightbox(index)}
          >
            <div
              className={`relative ${
                index === 0 || index === 5 ? 'aspect-square sm:aspect-auto sm:h-full' : 'aspect-square sm:aspect-[4/3]'
              }`}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              />
              <div className="absolute inset-0 bg-bg-primary/0 group-hover:bg-bg-primary/40 transition-colors duration-300 flex items-center justify-center">
                <motion.div
                  className="p-2 sm:p-3 glass-effect rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  initial={false}
                  whileHover={{ scale: 1.1 }}
                >
                  <Maximize2 size={16} className="sm:w-5 sm:h-5 text-text-primary" />
                </motion.div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <Lightbox
        images={galleryImages}
        currentIndex={currentIndex}
        isOpen={lightboxOpen}
        onClose={closeLightbox}
        onNext={nextImage}
        onPrev={prevImage}
      />
    </Section>
  );
}
