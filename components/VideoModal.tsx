'use client';

import { useEffect, useState, useRef } from 'react';
import { cn } from '@/lib/cn';

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
      document.body.style.overflow = 'hidden';
      videoRef.current?.play().catch(() => {});
      return () => {
        document.body.style.overflow = '';
        videoRef.current?.pause();
        videoRef.current && (videoRef.current.currentTime = 0);
      };
    }
    document.body.style.overflow = '';
    videoRef.current?.pause();
    videoRef.current && (videoRef.current.currentTime = 0);
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    if (isOpen) window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  if (!isVisible) return null;

  return (
    <div
      className={cn(
        'fixed inset-0 z-50 flex items-center justify-center bg-black/80 transition-opacity',
        isOpen ? 'opacity-100' : 'opacity-0'
      )}
      onClick={onClose}
      onTransitionEnd={(e) => {
        if (e.target === e.currentTarget && !isOpen) setIsVisible(false);
      }}
    >
      <div
        className="relative max-w-[90vw] max-h-[90vh] mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute -top-12 right-0 p-2 text-white hover:bg-white/10 rounded-full transition-colors"
          onClick={onClose}
          aria-label="Close video"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
        <video
          ref={videoRef}
          src={videoSrc}
          className="rounded-xl shadow-2xl max-w-full max-h-[85vh] object-contain bg-black"
          controls
          autoPlay
          muted
          playsInline
        />
      </div>
    </div>
  );
}
