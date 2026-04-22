'use client';

import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function Logo({ className, size = 'md' }: LogoProps) {
  const [mounted, setMounted] = useState(false);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  useEffect(() => {
    setMounted(true);
    // Get theme from localStorage or data attribute
    const stored = localStorage.getItem('theme') as 'dark' | 'light' | null;
    const dataTheme = document.documentElement.getAttribute('data-theme') as 'dark' | 'light' | null;
    if (stored) {
      setTheme(stored);
    } else if (dataTheme) {
      setTheme(dataTheme);
    }
  }, []);

  // Listen for theme changes
  useEffect(() => {
    if (!mounted) return;

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'data-theme') {
          const newTheme = document.documentElement.getAttribute('data-theme') as 'dark' | 'light';
          if (newTheme) {
            setTheme(newTheme);
          }
        }
      });
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme']
    });

    return () => observer.disconnect();
  }, [mounted]);

  const logoSrc = theme === 'dark' ? '/logos/TCJ_white.png' : '/logos/TCJ_black.png';

  const sizeClasses = {
    sm: 'w-24 h-24',
    md: 'w-32 h-32 sm:w-40 sm:h-40',
    lg: 'w-64 h-64 sm:w-80 sm:h-80'
  };

  return (
    <Link href="/" className={cn("flex items-center", className)}>
      <div className={cn(sizeClasses[size], "relative")}>
        <Image
          src={logoSrc}
          alt="The Car Journal"
          fill
          className="object-contain"
          priority
          sizes="(max-width: 640px) 128px, 160px"
        />
      </div>
    </Link>
  );
}