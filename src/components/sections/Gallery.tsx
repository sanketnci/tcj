'use client';

import { useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Section, SectionHeader } from '@/components/ui/Section';
import { EnhancedLightbox } from '@/components/ui/EnhancedLightbox';
import { galleryImages } from '@/lib/data';
import {
  Maximize2,
  Search,
  Filter,
  Grid3X3,
  LayoutGrid,
  List,
  SortAsc,
  SortDesc,
  Download,
  Share2,
  Heart,
  Calendar,
  Camera,
  MapPin,
  Tag,
  X,
  ChevronDown,
  Star
} from 'lucide-react';
import { cn } from '@/lib/utils';

type ViewMode = 'grid' | 'masonry' | 'list';
type SortBy = 'date' | 'title' | 'category';
type SortOrder = 'asc' | 'desc';

export function Gallery() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [sortBy, setSortBy] = useState<SortBy>('date');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showFilters, setShowFilters] = useState(false);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  // Get unique categories
  const categories = useMemo(() => {
    const cats = new Set(galleryImages.map(img => img.category).filter(Boolean));
    return ['all', ...Array.from(cats)];
  }, []);

  // Filter and sort images
  const filteredAndSortedImages = useMemo(() => {
    let filtered = galleryImages.filter(image => {
      const matchesSearch = searchQuery === '' ||
        image.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        image.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        image.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
        image.alt.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory = selectedCategory === 'all' || image.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });

    // Sort images
    filtered.sort((a, b) => {
      let aValue: any, bValue: any;

      switch (sortBy) {
        case 'date':
          aValue = new Date(a.dateTaken || '2024-01-01');
          bValue = new Date(b.dateTaken || '2024-01-01');
          break;
        case 'title':
          aValue = a.title || a.alt;
          bValue = b.title || b.alt;
          break;
        case 'category':
          aValue = a.category || '';
          bValue = b.category || '';
          break;
        default:
          return 0;
      }

      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : aValue < bValue ? -1 : 0;
      } else {
        return aValue < bValue ? 1 : aValue > bValue ? -1 : 0;
      }
    });

    return filtered;
  }, [searchQuery, selectedCategory, sortBy, sortOrder]);

  const openLightbox = useCallback((index: number) => {
    const actualIndex = galleryImages.findIndex(img => img.id === filteredAndSortedImages[index].id);
    setCurrentIndex(actualIndex);
    setLightboxOpen(true);
  }, [filteredAndSortedImages]);

  const closeLightbox = useCallback(() => setLightboxOpen(false), []);

  const nextImage = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % galleryImages.length);
  }, [galleryImages.length]);

  const prevImage = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  }, [galleryImages.length]);

  const toggleFavorite = useCallback((imageId: string) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(imageId)) {
        newFavorites.delete(imageId);
      } else {
        newFavorites.add(imageId);
      }
      return newFavorites;
    });
  }, []);

  const downloadImage = useCallback(async (image: typeof galleryImages[0]) => {
    try {
      const response = await fetch(image.src);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${image.title || image.alt}.jpg`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Failed to download image:', error);
    }
  }, []);

  const shareImage = useCallback(async (image: typeof galleryImages[0]) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: image.title || image.alt,
          text: image.description || image.alt,
          url: image.src,
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(image.src);
    }
  }, []);

  const renderImageCard = (image: typeof galleryImages[0], index: number) => {
    const isFavorite = favorites.has(image.id);

    if (viewMode === 'list') {
      return (
        <motion.div
          key={image.id}
          className="bg-bg-secondary/50 backdrop-blur-sm rounded-xl overflow-hidden border border-glass-border hover:border-accent-gold/50 transition-all duration-300"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: index * 0.05 }}
        >
          <div className="flex flex-col sm:flex-row">
            <div className="relative w-full sm:w-48 h-32 sm:h-32 shrink-0">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover cursor-pointer"
                sizes="(max-width: 640px) 100vw, 192px"
                onClick={() => openLightbox(index)}
              />
            </div>
            <div className="flex-1 p-4">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="font-semibold text-text-primary text-lg">{image.title || image.alt}</h3>
                  {image.category && (
                    <span className="text-accent-gold text-sm font-medium">{image.category}</span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => toggleFavorite(image.id)}
                    className={cn(
                      "p-2 rounded-full transition-colors",
                      isFavorite ? "text-red-500" : "text-text-secondary hover:text-red-500"
                    )}
                  >
                    <Heart size={16} fill={isFavorite ? "currentColor" : "none"} />
                  </button>
                  <button
                    onClick={() => shareImage(image)}
                    className="p-2 text-text-secondary hover:text-accent-gold transition-colors rounded-full"
                  >
                    <Share2 size={16} />
                  </button>
                  <button
                    onClick={() => downloadImage(image)}
                    className="p-2 text-text-secondary hover:text-accent-gold transition-colors rounded-full"
                  >
                    <Download size={16} />
                  </button>
                  <button
                    onClick={() => openLightbox(index)}
                    className="p-2 text-text-secondary hover:text-accent-gold transition-colors rounded-full"
                  >
                    <Maximize2 size={16} />
                  </button>
                </div>
              </div>
              {image.description && (
                <p className="text-text-secondary text-sm mb-3 line-clamp-2">{image.description}</p>
              )}
              <div className="flex flex-wrap items-center gap-4 text-xs text-text-secondary">
                {image.dateTaken && (
                  <div className="flex items-center gap-1">
                    <Calendar size={12} />
                    <span>{new Date(image.dateTaken).toLocaleDateString()}</span>
                  </div>
                )}
                {image.location && (
                  <div className="flex items-center gap-1">
                    <MapPin size={12} />
                    <span>{image.location}</span>
                  </div>
                )}
                {image.camera && (
                  <div className="flex items-center gap-1">
                    <Camera size={12} />
                    <span>{image.camera}</span>
                  </div>
                )}
              </div>
              {image.tags && image.tags.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-3">
                  {image.tags.slice(0, 3).map(tag => (
                    <span key={tag} className="px-2 py-1 bg-accent-gold/10 text-accent-gold text-xs rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </motion.div>
      );
    }

    // Grid and Masonry view
    return (
      <motion.div
        key={image.id}
        className={cn(
          "relative overflow-hidden rounded-xl group cursor-pointer",
          viewMode === 'masonry' ? 'break-inside-avoid mb-4' : '',
          index === 0 && viewMode === 'grid' ? 'col-span-2 sm:col-span-2 sm:row-span-2' : 'col-span-1'
        )}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: index * 0.1 }}
        onClick={() => openLightbox(index)}
      >
        <div
          className={cn(
            "relative",
            index === 0 && viewMode === 'grid' ? 'aspect-4/3 sm:aspect-square' : 'aspect-square'
          )}
        >
          <Image
            src={image.src}
            alt={image.alt}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes={viewMode === 'masonry'
              ? "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            }
          />

          {/* Overlay with actions */}
          <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <div className="absolute top-3 right-3 flex gap-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFavorite(image.id);
                }}
                className={cn(
                  "p-2 rounded-full bg-black/50 backdrop-blur-sm transition-colors",
                  isFavorite ? "text-red-500" : "text-white hover:text-red-500"
                )}
              >
                <Heart size={16} fill={isFavorite ? "currentColor" : "none"} />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  shareImage(image);
                }}
                className="p-2 rounded-full bg-black/50 backdrop-blur-sm text-white hover:text-accent-gold transition-colors"
              >
                <Share2 size={16} />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  downloadImage(image);
                }}
                className="p-2 rounded-full bg-black/50 backdrop-blur-sm text-white hover:text-accent-gold transition-colors"
              >
                <Download size={16} />
              </button>
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-4">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h3 className="text-white font-semibold text-sm sm:text-base mb-1">
                    {image.title || image.alt}
                  </h3>
                  {image.category && (
                    <span className="text-accent-gold text-xs font-medium">{image.category}</span>
                  )}
                </div>
                {image.featured && (
                  <Star className="text-yellow-400 w-4 h-4 ml-2" fill="currentColor" />
                )}
              </div>
            </div>
          </div>

          {/* Featured badge */}
          {image.featured && (
            <div className="absolute top-3 left-3 bg-accent-gold text-bg-primary px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
              <Star size={12} fill="currentColor" />
              <span className="hidden sm:inline">Featured</span>
            </div>
          )}
        </div>
      </motion.div>
    );
  };

  return (
    <Section id="gallery">
      <SectionHeader
        title="Gallery"
        subtitle="A curated collection of automotive photography capturing the essence of driving excellence."
      />

      {/* Controls */}
      <div className="mb-8 space-y-4">
        {/* Search and Filter Toggle */}
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary w-4 h-4" />
              <input
                type="text"
                placeholder="Search images..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-bg-secondary/50 backdrop-blur-sm border border-glass-border rounded-lg text-text-primary placeholder:text-text-secondary focus:outline-none focus:border-accent-gold transition-colors"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={cn(
                "p-2 rounded-lg border transition-colors",
                showFilters
                  ? "bg-accent-gold text-bg-primary border-accent-gold"
                  : "bg-bg-secondary/50 backdrop-blur-sm border-glass-border text-text-secondary hover:border-accent-gold"
              )}
            >
              <Filter size={20} />
            </button>

            {/* View Mode Buttons */}
            <div className="flex bg-bg-secondary/50 backdrop-blur-sm border border-glass-border rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={cn(
                  "p-2 rounded transition-colors",
                  viewMode === 'grid' ? "bg-accent-gold text-bg-primary" : "text-text-secondary hover:text-accent-gold"
                )}
              >
                <Grid3X3 size={16} />
              </button>
              <button
                onClick={() => setViewMode('masonry')}
                className={cn(
                  "p-2 rounded transition-colors",
                  viewMode === 'masonry' ? "bg-accent-gold text-bg-primary" : "text-text-secondary hover:text-accent-gold"
                )}
              >
                <LayoutGrid size={16} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={cn(
                  "p-2 rounded transition-colors",
                  viewMode === 'list' ? "bg-accent-gold text-bg-primary" : "text-text-secondary hover:text-accent-gold"
                )}
              >
                <List size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Filters Panel */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="bg-bg-secondary/50 backdrop-blur-sm border border-glass-border rounded-lg p-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {/* Category Filter */}
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">Category</label>
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="w-full p-2 bg-bg-primary border border-glass-border rounded-lg text-text-primary focus:outline-none focus:border-accent-gold transition-colors"
                    >
                      {categories.map(category => (
                        <option key={category} value={category}>
                          {category === 'all' ? 'All Categories' : category}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Sort By */}
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">Sort By</label>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value as SortBy)}
                      className="w-full p-2 bg-bg-primary border border-glass-border rounded-lg text-text-primary focus:outline-none focus:border-accent-gold transition-colors"
                    >
                      <option value="date">Date Taken</option>
                      <option value="title">Title</option>
                      <option value="category">Category</option>
                    </select>
                  </div>

                  {/* Sort Order */}
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">Order</label>
                    <button
                      onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                      className="w-full p-2 bg-bg-primary border border-glass-border rounded-lg text-text-primary hover:border-accent-gold transition-colors flex items-center justify-center gap-2"
                    >
                      {sortOrder === 'asc' ? <SortAsc size={16} /> : <SortDesc size={16} />}
                      <span>{sortOrder === 'asc' ? 'Ascending' : 'Descending'}</span>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Results Count */}
      <div className="mb-6">
        <p className="text-text-secondary">
          Showing {filteredAndSortedImages.length} of {galleryImages.length} images
        </p>
      </div>

      {/* Gallery Grid */}
      <div
        className={cn(
          viewMode === 'masonry'
            ? 'columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4'
            : viewMode === 'list'
            ? 'space-y-4'
            : 'grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-3 sm:gap-6'
        )}
      >
        {filteredAndSortedImages.map((image, index) => renderImageCard(image, index))}
      </div>

      {/* Empty State */}
      {filteredAndSortedImages.length === 0 && (
        <div className="text-center py-12">
          <div className="text-text-secondary text-lg mb-2">No images found</div>
          <p className="text-text-secondary/70">Try adjusting your search or filters</p>
        </div>
      )}

      <EnhancedLightbox
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
