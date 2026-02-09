import React, { useEffect, useState } from "react";
import clsx from "clsx";
import styles from "./DeviceShowcase.module.css";

export type DeviceShowcaseTab = "ios" | "ipad" | "watch" | "demo";

const DEVICE_IMAGES: Record<
  "ios" | "ipad" | "watch",
  Array<{ src: string; alt: string }>
> = {
  ios: [
    { src: "/home/notifications-list-dark.png", alt: "Notification list on iPhone" },
    { src: "/home/notification-expanded-with-actions.png", alt: "Notification with actions" },
    { src: "/home/notifications-drop-screen.png", alt: "Notifications drop screen" },
    { src: "/home/buckets-list.png", alt: "Buckets on iPhone" },
  ],
  ipad: [
    { src: "/home/ipad-notifications-list.jpg", alt: "Notification list on iPad" },
    { src: "/home/ipad-open.jpg", alt: "Zentik on iPad" },
    { src: "/home/ipad-drop.jpg", alt: "Drop screen on iPad" },
    { src: "/home/ipad-gallery.jpg", alt: "Gallery on iPad" },
  ],
  watch: [
    { src: "/home/watchos-buclets-list.PNG", alt: "Buckets on Apple Watch" },
    { src: "/home/watchos-main.PNG", alt: "Zentik on Watch" },
    { src: "/home/watchos-notification-detail.PNG", alt: "Notification on Watch" },
    { src: "/home/watchos-bucket-detail.PNG", alt: "Bucket detail on Watch" },
  ],
};

const TAB_LABELS: Record<DeviceShowcaseTab, string> = {
  ios: "iPhone",
  ipad: "iPad/macOS",
  watch: "Apple Watch",
  demo: "Demo",
};

const DEMO_VIDEO_SRC = "/video/ScreenRecording_11-03-2025 22-38-37_1.mp4";
const TABS: DeviceShowcaseTab[] = ["ios", "ipad", "watch", "demo"];

interface DeviceShowcaseProps {
  initialTab?: DeviceShowcaseTab;
  onDemoFullscreen?: () => void;
}

export default function DeviceShowcase({
  initialTab,
  onDemoFullscreen,
}: DeviceShowcaseProps) {
  const [device, setDevice] = useState<DeviceShowcaseTab>(initialTab ?? "ios");

  useEffect(() => {
    if (initialTab) {
      setDevice(initialTab);
    }
  }, [initialTab]);

  const images = device !== "demo" ? DEVICE_IMAGES[device] : [];

  return (
    <div className={clsx(styles.showcase, device === "ipad" && styles.showcaseIpad, device === "demo" && styles.showcaseDemo)}>
      <div className={styles.tabs}>
        {TABS.map((d) => (
          <button
            key={d}
            type="button"
            className={clsx(styles.tab, device === d && styles.tabActive)}
            onClick={() => setDevice(d)}
            aria-pressed={device === d}
            aria-label={d === "demo" ? "Show demo video" : `Show ${TAB_LABELS[d]} screenshots`}
          >
            <span className={styles.tabLabel}>{TAB_LABELS[d]}</span>
          </button>
        ))}
        <span
          className={styles.tabGlider}
          style={{
            "--tab-index": TABS.indexOf(device),
            "--tab-count": TABS.length,
          } as React.CSSProperties}
        />
      </div>
      <div
        className={clsx(
          styles.panel,
          device === "ipad" && styles.panelIpad,
          device === "demo" && styles.panelDemo
        )}
        key={device}
      >
        {device === "demo" ? (
          <div className={styles.demoPanel}>
            <video
              src={DEMO_VIDEO_SRC}
              className={styles.demoVideo}
              controls
              playsInline
              aria-label="Demo video"
            />
            {onDemoFullscreen && (
              <p className={styles.demoHint}>
                Or{" "}
                <button
                  type="button"
                  className={styles.demoOpenModalLink}
                  onClick={onDemoFullscreen}
                >
                  open in fullscreen
                </button>
              </p>
            )}
          </div>
        ) : (
          <div className={styles.row}>
            {images.map((img, i) => (
              <div
                key={img.src}
                className={styles.gridItem}
                style={{ animationDelay: `${i * 0.06}s` }}
              >
                <div className={styles.frame}>
                  <img
                    src={img.src}
                    alt={img.alt}
                    className={styles.img}
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
