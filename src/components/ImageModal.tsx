import { useEffect, useState } from 'react';
import clsx from 'clsx';
import styles from './ImageModal.module.css';

interface ImageModalProps {
  imageSrc: string;
  alt?: string;
  description?: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function ImageModal({ imageSrc, alt, description, isOpen, onClose }: ImageModalProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener('keydown', handleEscape);
    }

    return () => {
      window.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isVisible) {
    return null;
  }

  return (
    <div
      className={clsx(styles.modalOverlay, {
        [styles.modalOpen]: isOpen,
        [styles.modalClosing]: !isOpen && isVisible,
      })}
      onClick={onClose}
      onTransitionEnd={(e) => {
        if (e.target === e.currentTarget && !isOpen) {
          setIsVisible(false);
        }
      }}
    >
      <div
        className={styles.modalContent}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className={styles.closeButton}
          onClick={onClose}
          aria-label="Close image"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
        <div className={styles.imageContainer}>
          <img
            src={imageSrc}
            alt={alt || ''}
            className={styles.image}
          />
          {description && (
            <p className={styles.imageDescription}>{description}</p>
          )}
        </div>
      </div>
    </div>
  );
}
