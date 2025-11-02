import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Heading from '@theme/Heading';
import Layout from '@theme/Layout';
import clsx from 'clsx';
import type { ReactNode } from 'react';

import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          The Native-first Notification Hub
        </Heading>
        <p className="hero__subtitle">
          A notification system (self-hostable) with focus on native applications, for the best experience. Yet full featured
        </p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/intro">
            Documentation
          </Link>
          <Link
            className={clsx('button button--success button--lg', styles.platformButton, styles.appleButton)}
            to="https://testflight.apple.com/join/dFqETQEm"
            aria-label="Join the iOS TestFlight beta for iPhone, iPad and Mac">
            <span className={styles.buttonIcon} aria-hidden="true">
              {/* Apple logo/icon */}
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" role="img">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
              </svg>
            </span>
            <span className={styles.buttonText}>
              <span className={styles.buttonLabel}>iOS TestFlight</span>
              <span className={styles.buttonSubtext}>iPhone • iPad • Mac</span>
            </span>
          </Link>
          <Link
            className={clsx('button button--outline button--lg', styles.platformButton, styles.appleButton)}
            to="https://notifier.zentik.app/"
            aria-label="Open Zentik Notifier PWA">
            <span className={styles.buttonIcon} aria-hidden="true">
              {/* Web/PWA globe icon */}
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" role="img">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
              </svg>
            </span>
            <span className={styles.buttonText}>
              <span className={styles.buttonLabel}>Web (PWA)</span>
              <span className={styles.buttonSubtext}>Available Now</span>
            </span>
          </Link>
          <button
            type="button"
            className={clsx('button button--outline button--lg', styles.platformButton, styles.disabledButton)}
            disabled
            aria-disabled="true"
            title="Android app coming soon">
            <span className={styles.buttonText}>
              <span className={styles.buttonLabel}>Android</span>
              <span className={styles.buttonSubtext}>Coming Soon</span>
            </span>
          </button>
        </div>
      </div>
    </header>
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
        <div className={clsx('row', styles.stepsContainer)}>
          <div className={clsx('col col--4', styles.stepColumn)}>
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
                  Create a bucket and an access token to track one system. 
                  This gives you the foundation to start sending notifications.
                  Or use the bucket's magic code! A personal unique code to quickly send notifications 
                </p>
              </div>
            </div>
          </div>
          <div className={clsx('col col--4', styles.stepColumn)}>
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
                  Send a notification using the newly created entities.
                  Try the push notifications section to build the payload and test it out.
                </p>
              </div>
            </div>
          </div>
          <div className={clsx('col col--4', styles.stepColumn)}>
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
                  All your notifications will be available in the homepage,
                  as hub for all your systems! The medias will be shown in their own gallery.
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
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
  title={`${siteConfig.title} - Native-first notification hub`}
  description="Zentik is a native-first notification hub: unified APIs, device intelligence, multi-channel delivery analytics and secure token management for iOS (TestFlight), Android & Web (coming soon).">
      <HomepageHeader />
      <main>
        <HomepageSteps />
      </main>
    </Layout>
  );
}
