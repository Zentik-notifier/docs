import React, { useState } from 'react';
import ImageModal from './ImageModal';
import VideoModal from './VideoModal';
import styles from './MediaViewer.module.css';

interface MediaViewerProps {
  type: 'image' | 'video';
  src: string;
  alt?: string;
  description?: string;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Component for displaying a single image or video with fullscreen support
 * Can be used standalone or within carousels
 */
export default function MediaViewer({
  type,
  src,
  alt,
  description,
  className,
  style,
}: MediaViewerProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClick = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <div
        className={`${styles.mediaWrapper} ${className || ''}`}
        style={style}
        onClick={handleClick}
      >
        {type === 'image' ? (
          <div className={styles.imageContainer}>
            <img
              src={src}
              alt={alt || ''}
              className={styles.media}
            />
            <button
              className={styles.fullscreenButton}
              onClick={(e) => {
                e.stopPropagation();
                setIsModalOpen(true);
              }}
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
          <div className={styles.videoContainer}>
            <video
              src={src}
              controls
              className={styles.media}
              playsInline
            />
            <button
              className={styles.fullscreenButton}
              onClick={(e) => {
                e.stopPropagation();
                setIsModalOpen(true);
              }}
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
        )}
        {description && (
          <p className={styles.description}>{description}</p>
        )}
      </div>

      {type === 'image' ? (
        <ImageModal
          imageSrc={src}
          alt={alt}
          description={description}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      ) : (
        <VideoModal
          videoSrc={src}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
}
