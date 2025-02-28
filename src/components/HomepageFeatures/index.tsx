import type { ReactNode } from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';
import { 
  CubeTransparentIcon, 
  ShieldCheckIcon, 
  LightBulbIcon 
} from '@heroicons/react/24/outline';

type FeatureItem = {
  title: string;
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>; // Ensures proper typing
  description: ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Easier',
    Icon: CubeTransparentIcon, // Pass the component, not an instance
    description: <>Experience a seamless and intuitive interface designed for effortless use.</>,
  },
  {
    title: 'Safer',
    Icon: ShieldCheckIcon,
    description: <>Enjoy full control of your assets with self-custody and complete transparency.</>,
  },
  {
    title: 'Smarter',
    Icon: LightBulbIcon,
    description: <>Leverage expert insights and proven strategies to make informed financial decisions.</>,
  },
];

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
  return (
    <section className={styles.features}>
      <div className="container flex justify-center items-center">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
