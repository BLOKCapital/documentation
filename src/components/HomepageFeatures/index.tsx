import type { ReactNode } from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';
import { 
  CubeTransparentIcon, 
  ShieldCheckIcon, 
  LightBulbIcon 
} from '@heroicons/react/24/outline';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import translations from '../../data/translations.json'; // Adjust path as needed

type FeatureItem = {
  title: string;
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  description: string;
};

function Feature({ title, Icon, description }: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center h-20 flex justify-center items-center">
        <Icon className="w-10 h-10 text-gray-400" style={{ maxWidth: '100px', maxHeight: '100px' }} /> 
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  const { i18n } = useDocusaurusContext();
  const currentLocale = i18n.currentLocale; // 'en', 'es', or 'fr'
  
  // Load features based on the current locale, fallback to 'en' if locale not found
  const featureList: FeatureItem[] = [
    {
      title: translations[currentLocale]?.features[0]?.title || translations['en'].features[0].title,
      Icon: CubeTransparentIcon,
      description: translations[currentLocale]?.features[0]?.description || translations['en'].features[0].description,
    },
    {
      title: translations[currentLocale]?.features[1]?.title || translations['en'].features[1].title,
      Icon: ShieldCheckIcon,
      description: translations[currentLocale]?.features[1]?.description || translations['en'].features[1].description,
    },
    {
      title: translations[currentLocale]?.features[2]?.title || translations['en'].features[2].title,
      Icon: LightBulbIcon,
      description: translations[currentLocale]?.features[2]?.description || translations['en'].features[2].description,
    },
  ];

  return (
    <section className={styles.features}>
      <div className="container flex justify-center items-center">
        <div className="row">
          {featureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}