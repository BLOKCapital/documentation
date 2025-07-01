import React from 'react';
import Link from '@docusaurus/Link';
import styles from './Homepage.module.css';
import {
  FaCoins, FaPalette, FaShieldAlt, FaNetworkWired,
  FaGavel, FaCogs, FaCode, FaChalkboardTeacher, FaQuestionCircle
} from 'react-icons/fa';

type Section = {
  title: string;
  description: string;
  href: string;
  icon: React.ReactNode;
};

const sections: Section[] = [
  {
    title: 'What is BLOK Capital?',
    description: 'Intro to token utility & flow',
    href: '/intro',
    icon: <FaCoins />,
  },
  {
    title: 'Overview',
    description: 'Developer SDK & platform vision',
    href: '/category/overview',
    icon: <FaCogs />,
  },
  {
    title: 'Audits',
    description: 'Security & contract audit reports',
    href: '/resources/category/audits--security',
    icon: <FaShieldAlt />,
  },
  {
    title: 'Smart Contract Wallet (SWA)',
    description: 'Modular account abstraction wallet',
    href: '/educ/Smart%20Contract%20Wallets',
    icon: <FaNetworkWired />,
  },
  {
    title: 'Tokenomics',
    description: 'Token supply & governance distribution',
    href: '/resources/category/tokenomics',
    icon: <FaGavel />,
  },
  {
    title: 'Brand Guidelines',
    description: 'Logo, colors & design system',
    href: '/resources/category/brand-guidelines',
    icon: <FaPalette />,
  },
  {
    title: 'Builder',
    description: 'SDK, APIs and modules for developers',
    href: '/builders/intro',
    icon: <FaCode />,
  },
  {
    title: 'Contribute',
    description: 'Create tutorials, guides & videos',
    href: '/resources/CreateVideo',
    icon: <FaChalkboardTeacher />,
  },
  {
    title: 'FAQ',
    description: 'Common questions answered',
    href: '/resources/FAQs/',
    icon: <FaQuestionCircle />,
  },
];

export default function Homepage() {
  return (
    <section className={styles.heroSection}>
      <div className={styles.overlay}>
     <div className={`container ${styles.heroContainer}`}>
          <h1 className={styles.subtitle}>
            The Decentralised Wealth Management Protocol
          </h1>
          <div className="row">
            {sections.map(({ title, description, href, icon }) => (
              <div key={href} className="col col--4 margin-bottom--lg">
                <Link className={styles.card} to={href}>
                  <div className={styles.icon}>{icon}</div>
                  <h3>{title}</h3>
                  <p>{description}</p>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}