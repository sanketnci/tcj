'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useCallback, useState } from 'react';
import {
  X,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  RotateCw,
  Download,
  Share2,
  Heart,
  Calendar,
  Camera,
  MapPin,
  Aperture,
  Timer,
  Maximize2,
  Minimize2,
  Info,
  Star
} from 'lucide-react';
import { GalleryImage } from '@/types';
import { cn } from '@/lib/utils';

interface EnhancedLightboxProps {
  images: GalleryImage[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNext?: () => void;
  onPrev?: () => void;
}

export function EnhancedLightbox({ images, currentIndex, isOpen, onClose, onNext, onPrev }: EnhancedLightboxProps) {
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [showInfo, setShowInfo] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const currentImage = images[currentIndex];

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isOpen) return;

      switch (e.key) {
        case 'Escape':
          onClose();
          break;
        case 'ArrowRight':
          nextImage();
          break;
        case 'ArrowLeft':
          prevImage();
          break;
        case '+':
        case '=':
          handleZoomIn();
          break;
        case '-':
          handleZoomOut();
          break;
        case 'r':
        case 'R':
          handleRotate();
          break;
        case 'f':
        case 'F':
          toggleFullscreen();
          break;
        case 'i':
        case 'I':
          setShowInfo(!showInfo);
          break;
      }
    },
    [isOpen, onClose]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setZoom(1);
      setRotation(0);
      setShowInfo(false);
    } else {
      document.body.style.overflow = 'unset';
      setIsFullscreen(false);
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const nextImage = useCallback(() => {
    if (onNext) {
      onNext();
    }
  }, [onNext]);

  const prevImage = useCallback(() => {
    if (onPrev) {
      onPrev();
    }
  }, [onPrev]);

  const handleZoomIn = useCallback(() => {
    setZoom(prev => Math.min(prev * 1.2, 3));
  }, []);

  const handleZoomOut = useCallback(() => {
    setZoom(prev => Math.max(prev / 1.2, 0.5));
  }, []);

  const handleRotate = useCallback(() => {
    setRotation(prev => (prev + 90) % 360);
  }, []);

  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  }, []);

  const downloadImage = useCallback(async () => {
    try {
      const response = await fetch(currentImage.src);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${currentImage.title || currentImage.alt}.jpg`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Failed to download image:', error);
    }
  }, [currentImage]);

  const shareImage = useCallback(async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: currentImage.title || currentImage.alt,
          text: currentImage.description || currentImage.alt,
          url: currentImage.src,
        });
      } catch (error) {
        // Fallback: copy to clipboard
        navigator.clipboard.writeText(currentImage.src);
      }
    } else {
      navigator.clipboard.writeText(currentImage.src);
    }
  }, [currentImage]);

  if (!isOpen || !currentImage) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={cn(
            "fixed inset-0 z-50 flex items-center justify-center",
            isFullscreen ? "bg-black" : "bg-bg-primary/95 backdrop-blur-sm"
          )}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={onClose}
        >
          {/* Close Button */}
          <button
            className="absolute top-6 right-6 p-3 text-text-secondary hover:text-text-primary transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-gold rounded-full z-10"
            onClick={onClose}
            aria-label="Close lightbox"
          >
            <X size={32} />
          </button>

          {/* Navigation Buttons */}
          {images.length > 1 && (
            <>
              <button
                className="absolute left-6 top-1/2 -translate-y-1/2 p-3 text-text-secondary hover:text-text-primary transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-gold rounded-full z-10"
                onClick={(e) => {
                  e.stopPropagation();
                  prevImage();
                }}
                aria-label="Previous image"
              >
                <ChevronLeft size={48} />
              </button>

              <button
                className="absolute right-6 top-1/2 -translate-y-1/2 p-3 text-text-secondary hover:text-text-primary transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-gold rounded-full z-10"
                onClick={(e) => {
                  e.stopPropagation();
                  nextImage();
                }}
                aria-label="Next image"
              >
                <ChevronRight size={48} />
              </button>
            </>
          )}

          {/* Toolbar */}
          <div className="absolute top-6 left-6 flex items-center gap-2 z-10">
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleZoomOut();
              }}
              className="p-3 text-text-secondary hover:text-text-primary transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-gold rounded-full"
              aria-label="Zoom out"
            >
              <ZoomOut size={20} />
            </button>

            <span className="text-text-secondary text-sm min-w-15 text-center">
              {Math.round(zoom * 100)}%
            </span>

            <button
              onClick={(e) => {
                e.stopPropagation();
                handleZoomIn();
              }}
              className="p-3 text-text-secondary hover:text-text-primary transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-gold rounded-full"
              aria-label="Zoom in"
            >
              <ZoomIn size={20} />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                handleRotate();
              }}
              className="p-3 text-text-secondary hover:text-text-primary transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-gold rounded-full"
              aria-label="Rotate image"
            >
              <RotateCw size={20} />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleFullscreen();
              }}
              className="p-3 text-text-secondary hover:text-text-primary transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-gold rounded-full"
              aria-label="Toggle fullscreen"
            >
              {isFullscreen ? <Minimize2 size={20} /> : <Maximize2 size={20} />}
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowInfo(!showInfo);
              }}
              className={cn(
                "p-3 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-gold rounded-full",
                showInfo ? "text-accent-gold" : "text-text-secondary hover:text-text-primary"
              )}
              aria-label="Toggle image info"
            >
              <Info size={20} />
            </button>
          </div>

          {/* Action Buttons */}
          <div className="absolute bottom-6 right-6 flex items-center gap-2 z-10">
            <button
              onClick={(e) => {
                e.stopPropagation();
                shareImage();
              }}
              className="p-3 text-text-secondary hover:text-accent-gold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-gold rounded-full"
              aria-label="Share image"
            >
              <Share2 size={20} />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                downloadImage();
              }}
              className="p-3 text-text-secondary hover:text-accent-gold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-gold rounded-full"
              aria-label="Download image"
            >
              <Download size={20} />
            </button>
          </div>

          {/* Main Image */}
          <motion.div
            className="relative w-full max-w-6xl max-h-[85vh] mx-4 flex items-center justify-center"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="relative overflow-hidden rounded-lg"
              style={{
                transform: `scale(${zoom}) rotate(${rotation}deg)`,
                transition: 'transform 0.3s ease',
                cursor: zoom > 1 ? 'grab' : 'default'
              }}
            >
              <Image
                src={currentImage.src}
                alt={currentImage.alt}
                width={currentImage.width}
                height={currentImage.height}
                className="max-w-full max-h-[80vh] w-auto h-auto object-contain"
                priority
              />
            </div>
          </motion.div>

          {/* Image Info Panel */}
          <AnimatePresence>
            {showInfo && (
              <motion.div
                initial={{ opacity: 0, x: 300 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 300 }}
                className="absolute right-0 top-0 bottom-0 w-80 bg-bg-secondary/95 backdrop-blur-sm border-l border-glass-border p-6 overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="space-y-6">
                  {/* Title and Featured Badge */}
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <h2 className="text-xl font-bold text-text-primary">
                        {currentImage.title || currentImage.alt}
                      </h2>
                      {currentImage.featured && (
                        <Star className="text-yellow-400 w-5 h-5" fill="currentColor" />
                      )}
                    </div>
                    {currentImage.category && (
                      <span className="text-accent-gold font-medium">{currentImage.category}</span>
                    )}
                  </div>

                  {/* Description */}
                  {currentImage.description && (
                    <p className="text-text-secondary">{currentImage.description}</p>
                  )}

                  {/* Metadata */}
                  <div className="space-y-4">
                    <h3 className="font-semibold text-text-primary">Details</h3>

                    <div className="grid grid-cols-1 gap-3">
                      {currentImage.dateTaken && (
                        <div className="flex items-center gap-3">
                          <Calendar className="text-text-secondary w-4 h-4" />
                          <span className="text-text-secondary text-sm">
                            {new Date(currentImage.dateTaken).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </span>
                        </div>
                      )}

                      {currentImage.location && (
                        <div className="flex items-center gap-3">
                          <MapPin className="text-text-secondary w-4 h-4" />
                          <span className="text-text-secondary text-sm">{currentImage.location}</span>
                        </div>
                      )}

                      {currentImage.camera && (
                        <div className="flex items-center gap-3">
                          <Camera className="text-text-secondary w-4 h-4" />
                          <span className="text-text-secondary text-sm">{currentImage.camera}</span>
                        </div>
                      )}

                      {currentImage.lens && (
                        <div className="flex items-center gap-3">
                          <span className="text-text-secondary w-4 h-4">📷</span>
                          <span className="text-text-secondary text-sm">{currentImage.lens}</span>
                        </div>
                      )}

                      <div className="grid grid-cols-3 gap-4">
                        {currentImage.aperture && (
                          <div className="text-center">
                            <Aperture className="text-text-secondary w-4 h-4 mx-auto mb-1" />
                            <span className="text-text-secondary text-xs">Aperture</span>
                            <p className="text-text-primary font-medium">{currentImage.aperture}</p>
                          </div>
                        )}

                        {currentImage.shutterSpeed && (
                          <div className="text-center">
                            <Timer className="text-text-secondary w-4 h-4 mx-auto mb-1" />
                            <span className="text-text-secondary text-xs">Shutter</span>
                            <p className="text-text-primary font-medium">{currentImage.shutterSpeed}s</p>
                          </div>
                        )}

                        {currentImage.iso && (
                          <div className="text-center">
                            <span className="text-text-secondary text-lg font-bold mx-auto mb-1 block">ISO</span>
                            <span className="text-text-secondary text-xs">Sensitivity</span>
                            <p className="text-text-primary font-medium">{currentImage.iso}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Tags */}
                  {currentImage.tags && currentImage.tags.length > 0 && (
                    <div>
                      <h3 className="font-semibold text-text-primary mb-3">Tags</h3>
                      <div className="flex flex-wrap gap-2">
                        {currentImage.tags.map(tag => (
                          <span key={tag} className="px-3 py-1 bg-accent-gold/10 text-accent-gold text-sm rounded-full">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Image Counter */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10">
            <div className="bg-black/50 backdrop-blur-sm rounded-full px-4 py-2">
              <p className="text-white text-sm">
                {currentIndex + 1} / {images.length}
              </p>
            </div>
          </div>

          {/* Keyboard Shortcuts Hint */}
          <div className="absolute bottom-6 left-6 z-10">
            <div className="bg-black/50 backdrop-blur-sm rounded-lg px-3 py-2 text-xs text-white/70">
              Use arrow keys to navigate • +/- to zoom • R to rotate • F for fullscreen • I for info • Esc to close
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}