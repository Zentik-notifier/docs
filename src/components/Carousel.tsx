import React, { useState } from 'react';
import styles from './Carousel.module.css';

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
                <img
                  src={item.src}
                  alt={item.alt || ''}
                  className={styles.carouselMedia}
                />
              ) : (
                <video
                  src={item.src}
                  controls
                  autoPlay={index === currentIndex}
                  muted
                  loop
                  playsInline
                  className={styles.carouselMedia}
                />
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
    </div>
  );
}
