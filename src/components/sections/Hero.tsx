'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

export function Hero() {
  const slides = [
    {
      src: '/images/IMG_1854_SnapseedCopy.webp',
      alt: 'Classic automotive profile - side view',
    },
    {
      src: '/images/IMG_2880_SnapseedCopy.webp',
      alt: 'Automotive detail - front perspective',
    },
    {
      src: '/images/IMG_2875_SnapseedCopy.webp',
      alt: 'Dynamic driving shot - rear view',
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <section id="hero" className="relative h-screen overflow-hidden">
      {slides.map((slide, index) => (
        <motion.div
          key={slide.src}
          className={`absolute inset-0 transition-opacity duration-1000 ${currentSlide === index ? 'opacity-100' : 'opacity-0'}`}
          initial={false}
          animate={{ opacity: currentSlide === index ? 1 : 0 }}
        >
          <Image
            src={slide.src}
            alt={slide.alt}
            fill
            className="object-cover"
            priority={index === 0}
          />
        </motion.div>
      ))}
    </section>
  );
}
