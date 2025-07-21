
import React from 'react';
import Link from '@docusaurus/Link';
import styles from './Homepage.module.css';
import * as Icons from 'react-icons/fa';
import { FaCoins } from 'react-icons/fa'; // default icon
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

export default function Homepage() {
  const { i18n } = useDocusaurusContext();
  let sectionData;
  try {
    sectionData = require(`../../../i18n/${i18n.currentLocale}/docusaurus-plugin-content-docs/current/src/data/HomepageData.json`);
  } catch {
    sectionData = require('../../data/HomepageData.json');
  }

  return (
    <section className={styles.heroSection}>
      <div className={styles.overlay}>
        <div className={`container ${styles.heroContainer}`}>
          {/* <h2 className={styles.title}>BLOK Capital Documentation</h2>
          <h1 className={styles.subtitle}>
            The Decentralized Wealth Management Protocol
          </h1> */}
          <div className="row">
            {sectionData.map(({ title, description, href, icon }) => {
              const IconComponent = (Icons as any)[icon] || FaCoins;
              return (
                <div key={href} className="col col--4 margin-bottom--lg">
                  <Link className={styles.card} to={href}>
                    <div className={styles.icon}>
                      <IconComponent />
                    </div>
                    <h3>{title}</h3>
                    <p>{description}</p>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
