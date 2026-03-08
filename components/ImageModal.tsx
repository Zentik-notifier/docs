'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/lib/cn';

interface ImageModalProps {
  imageSrc: string;
  alt?: string;
  description?: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function ImageModal({
  imageSrc,
  alt,
  description,
  isOpen,
  onClose,
}: ImageModalProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = '';
      };
    }
    document.body.style.overflow = '';
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
        'fixed inset-0 z-50 flex items-center justify-center bg-black/95 transition-opacity',
        isOpen ? 'opacity-100' : 'opacity-0'
      )}
      onClick={onClose}
      onTransitionEnd={(e) => {
        if (e.target === e.currentTarget && !isOpen) setIsVisible(false);
      }}
    >
      <div
        className="relative max-w-[90vw] max-h-[90vh] flex flex-col items-center p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
          onClick={onClose}
          aria-label="Close image"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
        <img
          src={imageSrc}
          alt={alt || ''}
          className="max-w-full max-h-[calc(90vh-60px)] object-contain rounded-lg shadow-2xl bg-black"
        />
        {description && (
          <p className="mt-4 text-white text-center text-sm opacity-90">{description}</p>
        )}
      </div>
    </div>
  );
}
