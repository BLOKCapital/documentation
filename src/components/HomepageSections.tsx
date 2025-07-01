// import React from 'react';
// import Link from '@docusaurus/Link';
// import styles from './HomepageSections.module.css';

// type Section = {
//   title: string;
//   description: string;
//   href: string;
// };

// const sections: Section[] = [
//   { title: 'Tokenomics', description: 'Token flow & distribution', href: '/docs/tokenomics' },
//   { title: 'Brand Guidelines', description: 'Logo, fonts, colors', href: '/docs/brand-guidelines' },
//   { title: 'Audits', description: 'Security & contract audits', href: '/docs/audits' },
//   { title: 'Ecosystem', description: 'Our growing integrations', href: '/docs/ecosystem' },
//   { title: 'Governance', description: 'Protocol governance rules', href: '/docs/governance' },
//   { title: 'SDK', description: 'Developer SDK guides', href: '/docs/sdk' },
//   { title: 'API Reference', description: 'Complete API docs', href: '/docs/api' },
//   { title: 'Tutorials', description: 'Step‑by‑step guides', href: '/docs/tutorials' },
//   { title: 'Community', description: 'Join our channels', href: '/docs/community' },
// ];

// export default function HomepageSections() {
//   return (
//     <section className="container margin-vert--lg">
//       <div className="row">
//         {sections.map(({title, description, href}) => (
//           <div key={href} className="col col--4 margin-bottom--lg">
//             <Link className={styles.card} to={href}>
//               <h3>{title}</h3>
//               <p>{description}</p>
//             </Link>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// }


// import React from 'react';
// import Link from '@docusaurus/Link';
// import styles from './HomepageSections.module.css';
// import { FaCoins, FaPalette, FaShieldAlt, FaNetworkWired, FaGavel, FaCogs, FaCode, FaChalkboardTeacher, FaUsers } from 'react-icons/fa';

// type Section = {
//   title: string;
//   description: string;
//   href: string;
//   icon: React.ReactNode;
// };

// const sections: Section[] = [
//   { title: 'What is BLOK Capital?', description: 'Token flow & distribution', href: '/intro', icon: <FaCoins /> },
//   { title: 'Overview', description: 'Developer SDK guides', href: '/category/overview', icon: <FaCogs /> },
//   { title: 'Audits', description: 'Security & contract audits', href: '/resources/category/audits--security', icon: <FaShieldAlt /> },
//   { title: 'Smart Contract Wallet (SWA)', description: 'Our growing integrations', href: '/educ/Smart%20Contract%20Wallets', icon: <FaNetworkWired /> },
//   { title: 'Tokenomics', description: 'Protocol governance rules', href: '/resources/category/tokenomics', icon: <FaGavel /> },
//   { title: 'Brand Guidelines', description: 'Logo, fonts, colors', href: '/resources/category/brand-guidelines', icon: <FaPalette /> },
//   { title: 'Builder', description: 'Complete API docs', href: '/builders/intro', icon: <FaCode /> },
//   { title: 'Contribute', description: 'Step‑by‑step guides', href: '/resources/CreateVideo', icon: <FaChalkboardTeacher /> },
//   { title: 'FAQ', description: 'Join our channels', href: '/resources/FAQs/', icon: <FaUsers /> },
// ];

// export default function HomepageSections() {
//   return (
//     <section className={styles.heroSection}>
//       <div className={styles.overlay}>
//         <div className="container padding-vert--xl">
//           <h1 className={styles.subtitle}>The Decentralised Wealth Management Protocol</h1>
//           <div className="row">
//             {sections.map(({ title, description, href, icon }) => (
//               <div key={href} className="col col--4 margin-bottom--lg">
//                 <Link className={styles.card} to={href}>
//                   <div className={styles.icon}>{icon}</div>
//                   <h3>{title}</h3>
//                   <p>{description}</p>
//                 </Link>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }
import React from 'react';
import Link from '@docusaurus/Link';
import styles from './HomepageSections.module.css';
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

export default function HomepageSections() {
  return (
    <section className={styles.heroSection}>
      <div className={styles.overlay}>
        <div className="container padding-vert--xl">
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
