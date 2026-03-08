'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import DeviceShowcase, { type DeviceShowcaseTab } from '@/components/DeviceShowcase';
import VideoModal from '@/components/VideoModal';

const DEMO_VIDEO_SRC = '/video/ScreenRecording_11-03-2025 22-38-37_1.mp4';

export default function HomePage() {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [initialShowcaseTab, setInitialShowcaseTab] = useState<DeviceShowcaseTab | undefined>();

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const urlParams = new URLSearchParams(window.location.search);
    const videoParam = urlParams.get('startDemoVideo');
    const tabParam = urlParams.get('tab');
    if (videoParam || tabParam === 'demo') {
      setInitialShowcaseTab('demo');
      if (videoParam) setIsVideoOpen(true);
      window.history.replaceState({}, '', window.location.pathname);
    }
  }, []);

  return (
    <div className="flex flex-col min-h-[calc(100vh-var(--fd-nav-height))]">
      <section className="flex-1 flex flex-col items-center justify-center px-4 py-12 md:py-16 text-center bg-gradient-to-b from-[#004494] to-[#0056b3]">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
          Notifications that make the most of iOS
        </h1>
        <p className="text-lg text-white/95 max-w-[520px] mx-auto mb-8">
          Self-host it. Rich alerts, widgets, Apple Watch. iPhone, iPad & Watch.
        </p>
        <DeviceShowcase
          initialTab={initialShowcaseTab}
          onDemoFullscreen={() => setIsVideoOpen(true)}
        />
        <nav
          className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-base"
          aria-label="Get Zentik"
        >
          <Link
            href="/docs"
            className="font-semibold text-white underline underline-offset-2 hover:text-white"
          >
            Docs
          </Link>
          <span className="text-white/60 select-none px-0.5">·</span>
          <Link
            href="https://apps.apple.com/de/app/zentik-notifier/id6749312723"
            className="font-semibold text-white underline underline-offset-2 hover:text-white"
            aria-label="App Store"
          >
            App Store
          </Link>
          <span className="text-white/60 select-none px-0.5">·</span>
          <Link
            href="https://testflight.apple.com/join/dFqETQEm"
            className="font-semibold text-white underline underline-offset-2 hover:text-white"
            aria-label="TestFlight"
          >
            TestFlight
          </Link>
          <span className="text-white/60 select-none px-0.5">·</span>
          <Link
            href="https://notifier.zentik.app/"
            className="font-semibold text-white underline underline-offset-2 hover:text-white"
            aria-label="Web PWA"
          >
            Web (PWA)
          </Link>
        </nav>
      </section>
      <VideoModal
        videoSrc={DEMO_VIDEO_SRC}
        isOpen={isVideoOpen}
        onClose={() => setIsVideoOpen(false)}
      />
    </div>
  );
}
