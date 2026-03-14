'use client';

import { useState } from 'react';
import ImageModal from './ImageModal';
import VideoModal from './VideoModal';

interface MediaViewerProps {
  type: 'image' | 'video';
  src: string;
  alt?: string;
  description?: string;
  className?: string;
  style?: React.CSSProperties;
}

export default function MediaViewer({
  type,
  src,
  alt,
  description,
  className,
  style,
}: MediaViewerProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div
        className={`relative w-full max-w-[720px] mx-auto my-4 cursor-pointer rounded-xl overflow-hidden border border-fd-border bg-fd-card shadow-sm hover:-translate-y-0.5 hover:shadow-md transition-all ${className || ''}`}
        style={style}
        onClick={() => setIsModalOpen(true)}
      >
        {type === 'image' ? (
          <div className="relative w-full aspect-video bg-black">
            <img
              src={src}
              alt={alt || ''}
              className="absolute inset-0 w-full h-full object-contain"
            />
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setIsModalOpen(true);
              }}
              aria-label="View full screen"
              className="absolute top-3 right-3 w-9 h-9 rounded-lg bg-black/60 border border-white/30 flex items-center justify-center text-white hover:bg-black/80 transition-colors z-10"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" />
              </svg>
            </button>
          </div>
        ) : (
          <div className="relative w-full aspect-video bg-black">
            <video src={src} controls className="absolute inset-0 w-full h-full object-contain" playsInline />
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setIsModalOpen(true);
              }}
              aria-label="View full screen"
              className="absolute top-3 right-3 w-9 h-9 rounded-lg bg-black/60 border border-white/30 flex items-center justify-center text-white hover:bg-black/80 transition-colors z-10"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" />
              </svg>
            </button>
          </div>
        )}
        {description && (
          <p className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent text-white p-4 text-sm text-center m-0 italic">
            {description}
          </p>
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
