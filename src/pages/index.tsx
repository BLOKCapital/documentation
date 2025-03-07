import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import Heading from '@theme/Heading';
import styles from './index.module.css';
import translations from '../data/translations.json'; // Adjust path as needed

function HomepageHeader() {
  const {siteConfig, i18n} = useDocusaurusContext();
  const currentLocale = i18n.currentLocale; // 'en' or 'es'
  const t = translations[currentLocale]?.homepage || translations['en'].homepage; // Fallback to English

  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          {siteConfig.title} {/* Brand name, no translation needed */}
        </Heading>
        {/* Uncomment and translate tagline if needed */}
        {/* <p className="hero__subtitle">{siteConfig.tagline}</p> */}
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/intro">
            {t.startDocumentation}
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home(): ReactNode {
  const {siteConfig, i18n} = useDocusaurusContext();
  const currentLocale = i18n.currentLocale; // 'en' or 'es'
  const t = translations[currentLocale]?.homepage || translations['en'].homepage; // Fallback to English

  return (
    <Layout
      title={t.helloFrom.replace('{title}', siteConfig.title)} // Replace placeholder manually
      description={t.metaDescription}>
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}