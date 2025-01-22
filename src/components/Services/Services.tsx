'use client';
import styles from './services.module.scss';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { servicesItems } from '@/constants/GetServicesItems';
import Link from 'next/link';

function Services() {
  const t = useTranslations('services');
  return (
    <section className={styles.container} id='services'>
      <h2 className={styles.title}>
        <span>UNCO</span> {t('title')}
      </h2>
      <ul className={styles.wrapper}>
        {servicesItems.map(({ src, name, width, height, link, button_title, button_text }) => (
          <li key={name} className={styles.item}>
            <Image className={styles.image} src={src} alt={name} width={width} height={height} />
            <div className={styles.button}>
              <Link className={styles.link} href={link}>
                <span>{button_title} </span> {button_text}
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default Services;
