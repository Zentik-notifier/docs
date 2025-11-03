import { useEffect, useState, useRef } from 'react';
import clsx from 'clsx';
import styles from './VideoModal.module.css';

interface VideoModalProps {
  videoSrc: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function VideoModal({ videoSrc, isOpen, onClose }: VideoModalProps) {
  const [isVisible, setIsVisible] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      // Prevent body scroll when modal is open
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      
      // Auto-play video when modal opens
      if (videoRef.current) {
        videoRef.current.play().catch((error) => {
          // Autoplay might fail due to browser policies, but we'll try anyway
          console.log('Autoplay prevented:', error);
        });
      }
      
      return () => {
        // Restore original overflow
        document.body.style.overflow = originalOverflow;
        // Pause video when closing
        if (videoRef.current) {
          videoRef.current.pause();
          videoRef.current.currentTime = 0;
        }
      };
    } else {
      // Ensure overflow is restored when closing
      document.body.style.overflow = '';
      // Pause and reset video when closing
      if (videoRef.current) {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
      }
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

  // Only render when visible to prevent overlay blocking interaction
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
        // Only handle transition end on the overlay itself, not on child elements
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
          aria-label="Close video"
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
        <div className={styles.videoContainer}>
          <video
            ref={videoRef}
            src={videoSrc}
            className={styles.video}
            controls
            autoPlay
            muted
            playsInline
          />
        </div>
      </div>
    </div>
  );
}
