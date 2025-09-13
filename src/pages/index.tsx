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
          One streamlined platform to design, send and observe mission‑critical push notifications across your native ecosystem.
        </p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/intro">
            Documentation
          </Link>
          <Link
            className={clsx('button button--success button--lg', styles.platformButton)}
            to="https://testflight.apple.com/join/dFqETQEm"
            aria-label="Join the iOS TestFlight beta">
            <span className={styles.buttonIcon} aria-hidden="true">
              {/* Simple iOS glyph */}
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" role="img">
                <path d="M16.365 1.43c0 1.14-.417 2.063-1.25 2.77-.834.708-1.77 1.116-2.807 1.226-.06-.182-.09-.376-.09-.58 0-1.09.39-2.02 1.168-2.79.78-.77 1.72-1.156 2.823-1.156.06.18.09.36.09.53zM21.79 17.32c-.41.94-.9 1.78-1.47 2.52-.78.99-1.43 1.676-1.96 2.06-.63.46-1.31.7-2.05.72-.52 0-1.15-.15-1.9-.45-.75-.3-1.44-.45-2.06-.45-.65 0-1.35.15-2.11.45-.76.3-1.37.46-1.83.48-.71.03-1.41-.21-2.11-.72-.6-.44-1.29-1.15-2.07-2.13-.89-1.14-1.62-2.46-2.19-3.96-.62-1.66-.93-3.27-.93-4.82 0-1.78.39-3.31 1.18-4.57.62-.99 1.45-1.77 2.48-2.33 1.03-.57 2.14-.86 3.32-.88.65 0 1.5.17 2.54.5 1.03.34 1.69.51 1.96.51.21 0 .89-.22 2.05-.66 1.1-.4 2.03-.57 2.79-.53 2.06.17 3.61.98 4.66 2.45-1.84 1.12-2.76 2.69-2.76 4.7 0 1.56.58 2.86 1.73 3.9-.21.6-.43 1.16-.66 1.67z" />
              </svg>
            </span>
            iOS TestFlight
          </Link>
          <button
            type="button"
            className={clsx('button button--outline button--lg', styles.platformButton, styles.disabledButton)}
            disabled
            aria-disabled="true"
            title="Android app coming soon">
            Android · Coming soon
          </button>
          <button
            type="button"
            className={clsx('button button--outline button--lg', styles.platformButton, styles.disabledButton)}
            disabled
            aria-disabled="true"
            title="Web dashboard coming soon">
            Web Dashboard · Coming soon
          </button>
        </div>
      </div>
    </header>
  );
}

function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          <div className="col col--4">
            <div className="text--center">
              <img 
                src="/img/feature1.gif" 
                alt="Feature 1" 
                className={styles.featureGif}
              />
            </div>
            <div className="text--center padding-horiz--md">
              <Heading as="h3">Feature‑rich Native Apps</Heading>
              <p>
                Built for native experiences first: rich media, actionable interactions, 
                background handling and precise device targeting out of the box.
              </p>
            </div>
          </div>
          <div className="col col--4">
            <div className="text--center">
              <img 
                src="/img/feature2.gif" 
                alt="Feature 2" 
                className={styles.featureGif}
              />
            </div>
            <div className="text--center padding-horiz--md">
              <Heading as="h3">Self‑hostable Server</Heading>
              <p>
                Run Zentik on your own infrastructure for compliance and data control, 
                or use the managed cloud. Same APIs, zero vendor lock‑in.
              </p>
            </div>
          </div>
          <div className="col col--4">
            <div className="text--center">
              <img 
                src="/img/feature3.gif" 
                alt="Feature 3" 
                className={styles.featureGif}
              />
            </div>
            <div className="text--center padding-horiz--md">
              <Heading as="h3">Community‑driven</Heading>
              <p>
                Open roadmap, transparent iteration and extensible architecture. 
                Shape features via discussions, plugins and contributions.
              </p>
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
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
