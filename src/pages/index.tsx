import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import styles from './index.module.css';
import translations from '../data/translations.json';
import Homepage from "../components/Homepage/Homepage"
import homepageStyles from '../components/Homepage/Homepage.module.css'
function HomepageHeader() {
  const {siteConfig, i18n} = useDocusaurusContext();
  const t = translations[i18n.currentLocale]?.homepage || translations.en.homepage;

  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className={homepageStyles.title}>{t.title}</Heading>
<p className={homepageStyles.subtitle}>{t.subtitle}</p>

    
      </div>
    </header>
  );
}

export default function Home(): ReactNode {
  const {siteConfig, i18n} = useDocusaurusContext();
  const t = translations[i18n.currentLocale]?.homepage || translations.en.homepage;

  return (
    <Layout title={t.helloFrom.replace('{title}', siteConfig.title)} description={t.metaDescription}>
      <HomepageHeader />
      <main>
        <Homepage />
      </main>
    </Layout>
  );
}
