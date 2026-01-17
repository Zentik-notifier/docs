import React, { useState } from 'react';
import styles from './Carousel.module.css';
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
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? items.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === items.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const handleFullscreen = () => {
    const currentItem = items[currentIndex];
    if (currentItem.type === 'image') {
      setIsImageModalOpen(true);
    }
    // Video fullscreen is handled by MediaViewer component
  };

  return (
    <div className={styles.carousel}>
      <div className={styles.carouselContainer}>
        <button className={styles.carouselButton} onClick={goToPrevious} aria-label="Previous">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 18l-6-6 6-6"/>
          </svg>
        </button>
        
        <div className={styles.carouselContent}>
          {items.map((item, index) => (
            <div
              key={index}
              className={`${styles.carouselSlide} ${index === currentIndex ? styles.carouselSlideActive : styles.carouselSlideInactive}`}
            >
              {item.type === 'image' ? (
                <div className={styles.imageWrapper}>
                  <img
                    src={item.src}
                    alt={item.alt || ''}
                    className={styles.carouselMedia}
                  />
                  <button
                    className={styles.fullscreenButton}
                    onClick={handleFullscreen}
                    aria-label="View full screen"
                    title="View full screen"
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"></path>
                    </svg>
                  </button>
                </div>
              ) : (
                <div className={styles.videoWrapper}>
                  <MediaViewer
                    type="video"
                    src={item.src}
                    description={item.description}
                    className={styles.carouselMediaViewer}
                  />
                </div>
              )}
              {item.description && (
                <p className={styles.carouselDescription}>{item.description}</p>
              )}
            </div>
          ))}
        </div>

        <button className={styles.carouselButton} onClick={goToNext} aria-label="Next">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 18l6-6-6-6"/>
          </svg>
        </button>
      </div>
      
      <div className={styles.carouselDots}>
        {items.map((_, index) => (
          <button
            key={index}
            className={`${styles.carouselDot} ${index === currentIndex ? styles.carouselDotActive : ''}`}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
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
