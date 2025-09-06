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
          {siteConfig.title}
        </Heading>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/intro">
            Get Started 🚀
          </Link>
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
              <Heading as="h3">Advanced Push Notifications</Heading>
              <p>
                Complete notification system with support for iOS and Android, 
                intelligent token management and reliable delivery.
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
              <Heading as="h3">Intuitive Dashboard</Heading>
              <p>
                Modern web interface to manage notifications, 
                monitor statistics and configure webhooks in real-time.
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
              <Heading as="h3">Simple Integration</Heading>
              <p>
                REST and GraphQL APIs to integrate Zentik into your app 
                with just a few lines of code and maximum flexibility.
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
      title={`${siteConfig.title} - ${siteConfig.tagline}`}
      description="Advanced notification system for mobile apps with web dashboard, REST/GraphQL APIs and iOS/Android support">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
