'use client';

import { useState } from 'react';
import ImageModal from './ImageModal';
import MediaViewer from './MediaViewer';

interface CarouselProps {
  items: Array<{
    type: 'image' | 'video';
    src: string;
    alt?: string;
    description?: string;
  }>;
}

export default function Carousel({ items }: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === items.length - 1 ? 0 : prev + 1));
  };

  const handleFullscreen = () => {
    if (items[currentIndex]?.type === 'image') setIsImageModalOpen(true);
  };

  return (
    <div className="w-full max-w-[720px] mx-auto my-4">
      <div className="relative flex items-center gap-4">
        <button
          type="button"
          onClick={goToPrevious}
          aria-label="Previous"
          className="flex-shrink-0 w-11 h-11 rounded-full border-2 border-border flex items-center justify-center hover:bg-muted hover:border-primary hover:text-primary transition-all"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <div className="relative w-full aspect-[16/10] overflow-hidden rounded-xl border border-fd-border bg-fd-card shadow-sm">
          {items.map((item, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-300 ${
                index === currentIndex ? 'opacity-100' : 'opacity-0 pointer-events-none'
              }`}
            >
              {item.type === 'image' ? (
                <div className="relative w-full h-full">
                  <img
                    src={item.src}
                    alt={item.alt || ''}
                    className="w-full h-full object-contain rounded-xl"
                  />
                  <button
                    type="button"
                    onClick={handleFullscreen}
                    aria-label="View full screen"
                    className="absolute top-3 right-3 w-9 h-9 rounded-lg bg-black/60 border border-white/30 flex items-center justify-center text-white hover:bg-black/80 transition-colors"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" />
                    </svg>
                  </button>
                  {item.description && (
                    <p className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent text-white p-4 text-sm text-center m-0">
                      {item.description}
                    </p>
                  )}
                </div>
              ) : (
                <div className="relative w-full h-full aspect-video bg-black">
                  <video
                    src={item.src}
                    controls
                    className="absolute inset-0 w-full h-full object-contain rounded-xl"
                    playsInline
                  />
                  {item.description && (
                    <p className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent text-white p-4 text-sm text-center m-0">
                      {item.description}
                    </p>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={goToNext}
          aria-label="Next"
          className="flex-shrink-0 w-11 h-11 rounded-full border-2 border-border flex items-center justify-center hover:bg-muted hover:border-primary hover:text-primary transition-all"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      </div>
      <div className="flex justify-center gap-2 mt-5">
        {items.map((_, index) => (
          <button
            key={index}
            type="button"
            onClick={() => setCurrentIndex(index)}
            aria-label={`Go to slide ${index + 1}`}
            className={`h-2.5 rounded-full transition-all ${
              index === currentIndex
                ? 'w-8 bg-primary'
                : 'w-2.5 bg-muted-foreground/30 hover:bg-muted-foreground/50'
            }`}
          />
        ))}
      </div>
      {items[currentIndex]?.type === 'image' && (
        <ImageModal
          imageSrc={items[currentIndex].src}
          alt={items[currentIndex].alt}
          description={items[currentIndex].description}
          isOpen={isImageModalOpen}
          onClose={() => setIsImageModalOpen(false)}
        />
      )}
    </div>
  );
}
