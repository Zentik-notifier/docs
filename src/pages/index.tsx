import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Heading from "@theme/Heading";
import Layout from "@theme/Layout";
import clsx from "clsx";
import { useEffect, useState } from "react";
import type { ReactNode } from "react";

import styles from "./index.module.css";
import VideoModal from "../components/VideoModal";
import DeviceShowcase from "../components/DeviceShowcase";

function HomepageHeader() {
  return (
    <header className={clsx("hero hero--primary", styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className={styles.heroTitle}>
          Notifications that make the most of iOS
        </Heading>
        <p className={styles.heroSubtitle}>
          Self-host it. Rich alerts, widgets, Apple Watch. iPhone, iPad & Watch.
        </p>
        <DeviceShowcase />
        <nav className={styles.heroLinks} aria-label="Get Zentik">
          <Link className={styles.heroLink} to="/docs/intro">
            Docs
          </Link>
          <span className={styles.heroLinkSep}>·</span>
          <Link
            className={styles.heroLink}
            to="https://apps.apple.com/de/app/zentik-notifier/id6749312723"
            aria-label="App Store"
          >
            App Store
          </Link>
          <span className={styles.heroLinkSep}>·</span>
          <Link
            className={styles.heroLink}
            to="https://testflight.apple.com/join/dFqETQEm"
            aria-label="TestFlight"
          >
            TestFlight
          </Link>
          <span className={styles.heroLinkSep}>·</span>
          <Link
            className={styles.heroLink}
            to="https://notifier.zentik.app/"
            aria-label="Web PWA"
          >
            Web (PWA)
          </Link>
        </nav>
      </div>
    </header>
  );
}

function HomepageVideoSection({ onVideoOpen }: { onVideoOpen: () => void }) {
  return (
    <section className={styles.videoSection}>
      <div className="container">
        <div className="text--center">
          <button
            className={clsx(
              "button button--primary button--lg",
              styles.videoButton
            )}
            onClick={onVideoOpen}
            aria-label="Watch demo video"
          >
            <span className={styles.videoButtonIcon}>
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </span>
            <span>Watch Demo Video</span>
          </button>
        </div>
      </div>
    </section>
  );
}

function HomepageSteps() {
  return (
    <section className={styles.steps}>
      <div className="container">
        <div className="text--center margin-bottom--lg">
          <Heading as="h2">Get Started in 3 Simple Steps</Heading>
          <p className="hero__subtitle">
            From setup to notifications in seconds
          </p>
        </div>
        <div className={clsx("row", styles.stepsContainer)}>
          <div className={clsx("col col--4", styles.stepColumn)}>
            <div className={styles.stepContent}>
              <div className={styles.stepVisual}>
                <div className={styles.stepNumber}>1</div>
                <video
                  src="/video/bucketAccestokenCreation.MP4"
                  className={styles.stepVideo}
                  autoPlay
                  loop
                  muted
                  playsInline
                  controls
                />
              </div>
              <div className={styles.stepText}>
                <Heading as="h3">Create a Bucket & Access Token</Heading>
                <p>
                  Create a bucket and an access token to track one system. This
                  gives you the foundation to start sending notifications. Or
                  use the bucket's magic code! A personal unique code to quickly
                  send notifications
                </p>
              </div>
            </div>
          </div>
          <div className={clsx("col col--4", styles.stepColumn)}>
            <div className={styles.stepContent}>
              <div className={styles.stepVisual}>
                <div className={styles.stepNumber}>2</div>
                <video
                  src="/video/testPushNotification.mp4"
                  className={styles.stepVideo}
                  autoPlay
                  loop
                  muted
                  playsInline
                  controls
                />
              </div>
              <div className={styles.stepText}>
                <Heading as="h3">Send Your First Notification</Heading>
                <p>
                  Send a notification using the newly created entities. Try the
                  push notifications section to build the payload and test it
                  out.
                </p>
              </div>
            </div>
          </div>
          <div className={clsx("col col--4", styles.stepColumn)}>
            <div className={styles.stepContent}>
              <div className={styles.stepVisual}>
                <div className={styles.stepNumber}>3</div>
                <video
                  src="/video/home-hub.mp4"
                  className={styles.stepVideo}
                  autoPlay
                  loop
                  muted
                  playsInline
                  controls
                />
              </div>
              <div className={styles.stepText}>
                <Heading as="h3">Manage All Your Systems</Heading>
                <p>
                  All your notifications will be available in the homepage, as
                  hub for all your systems! The medias will be shown in their
                  own gallery.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home(): ReactNode {
  const { siteConfig } = useDocusaurusContext();
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const videoSrc = "/video/ScreenRecording_11-03-2025 22-38-37_1.mp4";

  useEffect(() => {
    // Check URL parameters for video parameter
    const urlParams = new URLSearchParams(window.location.search);
    const videoParam = urlParams.get("startDemoVideo");
    if (videoParam) {
      setIsVideoOpen(true);
      // Clean up URL parameter
      const newUrl = window.location.pathname;
      window.history.replaceState({}, "", newUrl);
    }
  }, []);

  const handleVideoOpen = () => {
    setIsVideoOpen(true);
  };

  const handleVideoClose = () => {
    setIsVideoOpen(false);
  };

  return (
    <Layout
      title={`${siteConfig.title} - Notifications on iOS`}
      description="Zentik brings your notifications to iPhone, iPad and Apple Watch. Self-hostable, rich alerts and widgets — built to use the full iOS experience."
    >
      <HomepageHeader />
      <main>
        <HomepageVideoSection onVideoOpen={handleVideoOpen} />
        <HomepageSteps />
      </main>
      <VideoModal
        videoSrc={videoSrc}
        isOpen={isVideoOpen}
        onClose={handleVideoClose}
      />
    </Layout>
  );
}
