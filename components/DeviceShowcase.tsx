'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/lib/cn';

export type DeviceShowcaseTab = 'ios' | 'ipad' | 'watch' | 'demo';

const DEVICE_IMAGES: Record<
  'ios' | 'ipad' | 'watch',
  Array<{ src: string; alt: string }>
> = {
  ios: [
    { src: '/home/notifications-list-dark.png', alt: 'Notification list on iPhone' },
    { src: '/home/notification-expanded-with-actions.png', alt: 'Notification with actions' },
    { src: '/home/notifications-drop-screen.png', alt: 'Notifications drop screen' },
    { src: '/home/buckets-list.png', alt: 'Buckets on iPhone' },
  ],
  ipad: [
    { src: '/home/ipad-notifications-list.jpg', alt: 'Notification list on iPad' },
    { src: '/home/ipad-open.jpg', alt: 'Zentik on iPad' },
    { src: '/home/ipad-drop.jpg', alt: 'Drop screen on iPad' },
    { src: '/home/ipad-gallery.jpg', alt: 'Gallery on iPad' },
  ],
  watch: [
    { src: '/home/watchos-buclets-list.PNG', alt: 'Buckets on Apple Watch' },
    { src: '/home/watchos-main.PNG', alt: 'Zentik on Watch' },
    { src: '/home/watchos-notification-detail.PNG', alt: 'Notification on Watch' },
    { src: '/home/watchos-bucket-detail.PNG', alt: 'Bucket detail on Watch' },
  ],
};

const TAB_LABELS: Record<DeviceShowcaseTab, string> = {
  ios: 'iPhone',
  ipad: 'iPad/macOS',
  watch: 'Apple Watch',
  demo: 'Demo',
};

const DEMO_VIDEO_SRC = '/video/ScreenRecording_11-03-2025 22-38-37_1.mp4';
const TABS: DeviceShowcaseTab[] = ['ios', 'ipad', 'watch', 'demo'];

interface DeviceShowcaseProps {
  initialTab?: DeviceShowcaseTab;
  onDemoFullscreen?: () => void;
}

export default function DeviceShowcase({
  initialTab,
  onDemoFullscreen,
}: DeviceShowcaseProps) {
  const [device, setDevice] = useState<DeviceShowcaseTab>(initialTab ?? 'ios');

  useEffect(() => {
    if (initialTab) setDevice(initialTab);
  }, [initialTab]);

  const images = device !== 'demo' ? DEVICE_IMAGES[device] : [];

  return (
    <div
      className={cn(
        'w-full max-w-[720px] mx-auto mb-6',
        device === 'ipad' && 'max-w-[900px]',
        device === 'demo' && 'max-w-[720px]'
      )}
    >
      <div className="flex justify-stretch relative p-1 rounded-full bg-white/10 mb-5 shadow-inner">
        {TABS.map((d) => (
          <button
            key={d}
            type="button"
            className={cn(
              'relative z-10 flex-1 py-2 px-5 rounded-full text-sm font-semibold text-white/85 bg-transparent transition-colors text-center',
              device === d && 'text-white'
            )}
            onClick={() => setDevice(d)}
            aria-pressed={device === d}
            aria-label={
              d === 'demo'
                ? 'Show demo video'
                : `Show ${TAB_LABELS[d]} screenshots`
            }
          >
            {TAB_LABELS[d]}
          </button>
        ))}
        <span
          className="absolute top-1 bottom-1 bg-white/25 rounded-full shadow-md pointer-events-none transition-[left] duration-300 ease-out"
          style={{
            width: `calc((100% - 0.5rem) / ${TABS.length})`,
            left: `calc(0.25rem + ${TABS.indexOf(device)} * (100% - 0.5rem) / ${TABS.length})`,
          }}
        />
      </div>
      <div
        key={device}
        className={cn(
          'animate-in fade-in duration-300',
          device === 'ipad' && 'scale-125 origin-top',
          device === 'demo' && 'scale-100'
        )}
      >
        {device === 'demo' ? (
          <div className="flex flex-col items-center text-center py-2">
            <video
              src={DEMO_VIDEO_SRC}
              className="w-full max-w-[640px] max-h-[420px] rounded-xl shadow-2xl bg-black object-contain"
              controls
              playsInline
              aria-label="Demo video"
            />
            {onDemoFullscreen && (
              <p className="mt-3 text-sm text-white/90">
                Or{' '}
                <button
                  type="button"
                  className="underline text-white/95 hover:text-white cursor-pointer bg-transparent border-none p-0"
                  onClick={onDemoFullscreen}
                >
                  open in fullscreen
                </button>
              </p>
            )}
          </div>
        ) : (
          <div className="flex flex-row gap-3 overflow-x-auto overflow-y-hidden pb-2 scroll-smooth touch-pan-x">
            {images.map((img, i) => (
              <div
                key={img.src}
                className="flex-shrink-0 min-w-[200px] max-w-[280px] animate-in fade-in zoom-in-95 duration-300"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <div className="rounded-xl overflow-hidden shadow-xl border border-white/10 bg-black/20 transition-all hover:-translate-y-1 hover:shadow-2xl">
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="block w-full h-auto object-contain"
                    loading="lazy"
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
