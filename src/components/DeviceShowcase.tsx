import React, { useState } from "react";
import clsx from "clsx";
import styles from "./DeviceShowcase.module.css";

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

const DEVICE_LABELS: Record<"ios" | "ipad" | "watch", string> = {
  ios: "iPhone",
  ipad: "iPad/macOS",
  watch: "Apple Watch",
};

export default function DeviceShowcase() {
  const [device, setDevice] = useState<"ios" | "ipad" | "watch">("ios");
  const images = DEVICE_IMAGES[device];

  return (
    <div className={clsx(styles.showcase, device === "ipad" && styles.showcaseIpad)}>
      <div className={styles.tabs}>
        {(["ios", "ipad", "watch"] as const).map((d) => (
          <button
            key={d}
            type="button"
            className={clsx(styles.tab, device === d && styles.tabActive)}
            onClick={() => setDevice(d)}
            aria-pressed={device === d}
            aria-label={`Show ${DEVICE_LABELS[d]} screenshots`}
          >
            <span className={styles.tabLabel}>{DEVICE_LABELS[d]}</span>
          </button>
        ))}
        <span
          className={styles.tabGlider}
          style={{
            "--tab-index": ["ios", "ipad", "watch"].indexOf(device),
          } as React.CSSProperties}
        />
      </div>
      <div
        className={clsx(styles.panel, device === "ipad" && styles.panelIpad)}
        key={device}
      >
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
      </div>
    </div>
  );
}
