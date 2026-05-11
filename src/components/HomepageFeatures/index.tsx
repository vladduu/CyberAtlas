import type {ReactNode} from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Tool Mastery',
    Svg: require('@site/static/img/undraw_safe_0mei.svg').default,
    description: (
      <>
        Deep dives into Cyber Security tools.
      </>
    ),
  },
  {
    title: 'Ctf Documentation',
    Svg: require('@site/static/img/undraw_secure-password_9qv4.svg').default,
    description: (
      <>
        Detailed writeups of CTF challenges, covering various categories and difficulty levels.
      </>
    ),
  },
  {
    title: 'Security Research',
    Svg: require('@site/static/img/undraw_firewall_cfej.svg').default,
    description: (
      <>
        Latest findings and analyses in the field of Cyber Security.
      </>
    ),
  },
];

function Feature({title, Svg, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
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
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
