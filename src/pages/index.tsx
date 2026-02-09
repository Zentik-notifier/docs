import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Heading from "@theme/Heading";
import Layout from "@theme/Layout";
import clsx from "clsx";
import { useEffect, useState } from "react";
import type { ReactNode } from "react";

import styles from "./index.module.css";
import VideoModal from "../components/VideoModal";
import DeviceShowcase, {
  type DeviceShowcaseTab,
} from "../components/DeviceShowcase";

function HomepageHeader({
  initialShowcaseTab,
  onDemoFullscreen,
}: {
  initialShowcaseTab?: DeviceShowcaseTab;
  onDemoFullscreen?: () => void;
}) {
  return (
    <header className={clsx("hero hero--primary", styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className={styles.heroTitle}>
          Notifications that make the most of iOS
        </Heading>
        <p className={styles.heroSubtitle}>
          Self-host it. Rich alerts, widgets, Apple Watch. iPhone, iPad & Watch.
        </p>
        <DeviceShowcase
          initialTab={initialShowcaseTab}
          onDemoFullscreen={onDemoFullscreen}
        />
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

type StepsTabId = "step1" | "step2" | "step3";

function HomepageStepsWithTabs({
  activeTab,
  onTabChange,
}: {
  activeTab: StepsTabId;
  onTabChange: (tab: StepsTabId) => void;
}) {
  const tabs: { id: StepsTabId; label: string }[] = [
    { id: "step1", label: "Create Bucket & Token" },
    { id: "step2", label: "Send Notification" },
    { id: "step3", label: "Manage Systems" },
  ];

  return (
    <section className={styles.steps}>
      <div className="container">
        <div className="text--center margin-bottom--lg">
          <Heading as="h2">Get Started in 3 Simple Steps</Heading>
          <p className="hero__subtitle">
            From setup to notifications in seconds
          </p>
        </div>
        <div className={styles.tabList} role="tablist" aria-label="Steps and demo">
          {tabs.map(({ id, label }) => (
            <button
              key={id}
              type="button"
              role="tab"
              aria-selected={activeTab === id}
              aria-controls={`panel-${id}`}
              id={`tab-${id}`}
              className={clsx(
                styles.tabButton,
                activeTab === id && styles.tabButtonActive
              )}
              onClick={() => onTabChange(id)}
            >
              {label}
            </button>
          ))}
        </div>
        <div
          id="panel-step1"
          role="tabpanel"
          aria-labelledby="tab-step1"
          hidden={activeTab !== "step1"}
          className={styles.tabPanel}
        >
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
                gives you the foundation to start sending notifications. Or use
                the bucket&apos;s magic code! A personal unique code to quickly
                send notifications
              </p>
            </div>
          </div>
        </div>
        <div
          id="panel-step2"
          role="tabpanel"
          aria-labelledby="tab-step2"
          hidden={activeTab !== "step2"}
          className={styles.tabPanel}
        >
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
                push notifications section to build the payload and test it out.
              </p>
            </div>
          </div>
        </div>
        <div
          id="panel-step3"
          role="tabpanel"
          aria-labelledby="tab-step3"
          hidden={activeTab !== "step3"}
          className={styles.tabPanel}
        >
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
                All your notifications will be available in the homepage, as hub
                for all your systems! The medias will be shown in their own
                gallery.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const DEMO_VIDEO_SRC = "/video/ScreenRecording_11-03-2025 22-38-37_1.mp4";

export default function Home(): ReactNode {
  const { siteConfig } = useDocusaurusContext();
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [activeStepTab, setActiveStepTab] = useState<StepsTabId>("step1");
  const [initialShowcaseTab, setInitialShowcaseTab] = useState<
    DeviceShowcaseTab | undefined
  >(undefined);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const videoParam = urlParams.get("startDemoVideo");
    const tabParam = urlParams.get("tab");
    if (videoParam || tabParam === "demo") {
      setInitialShowcaseTab("demo");
      if (videoParam) {
        setIsVideoOpen(true);
      }
      const newUrl = window.location.pathname;
      window.history.replaceState({}, "", newUrl);
    }
  }, []);

  const handleDemoFullscreen = () => {
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
      <HomepageHeader
        initialShowcaseTab={initialShowcaseTab}
        onDemoFullscreen={handleDemoFullscreen}
      />
      <main>
        <HomepageStepsWithTabs
          activeTab={activeStepTab}
          onTabChange={setActiveStepTab}
        />
      </main>
      <VideoModal
        videoSrc={DEMO_VIDEO_SRC}
        isOpen={isVideoOpen}
        onClose={handleVideoClose}
      />
    </Layout>
  );
}
