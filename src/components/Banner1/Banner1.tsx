'use client';
import Image from 'next/image';
import Link from 'next/link';
import styles from './banner1.module.scss';
import { useState } from 'react';
import { useTranslations } from 'next-intl';

function Banner1() {
  const t = useTranslations('banner1');
  const [arrowHover, setArrowHover] = useState(false);

  return (
    <section className={styles.banner}>
      <div className={styles.container}>
        <h1 className={styles.title}>
          NFT UNCO<span>888</span>
        </h1>
        <h3 className={styles.subtitle}>{t('subtitle')}</h3>
        <div className={styles.wrapper}>
          <div className={styles.card_left}>
            <h4 className={styles.card_title}>{t('card_1.subtitle')}</h4>
            <p className={styles.card_text}>{t('card_1.text')}</p>
            <Link className={styles.card_links} href='#clevel'>
              <p className={styles.card_link}>{t('card_1.link')}</p>
              <button
                className={styles.card_button}
                onMouseEnter={() => setArrowHover(true)}
                onMouseLeave={() => setArrowHover(false)}
              >
                <Image
                  className={styles.card_arrow}
                  src={arrowHover ? '/images/Banner1/arrow-hover.svg' : '/images/Banner1/arrow.svg'}
                  alt='arrow'
                  width={14}
                  height={14}
                />
              </button>
            </Link>
          </div>
          <div className={styles.card_right}>
            <h4 className={styles.card_title}>{t('card_2.subtitle')}</h4>
            <p className={styles.card_text}>{t('card_2.text')}</p>
            <p className={styles.card_text}>{t('card_2.text_2')}</p>
            <Link className={styles.card_links} href='#investors'>
              <p className={styles.card_link}>{t('card_2.link')}</p>
              <button
                className={styles.card_button}
                onMouseEnter={() => setArrowHover(true)}
                onMouseLeave={() => setArrowHover(false)}
              >
                <Image
                  className={styles.card_arrow}
                  src={
                    arrowHover
                      ? '/images/Banner1/arrow-hover.svg'
                      : '/images/Banner1/arrow-black.svg'
                  }
                  alt='arrow'
                  width={14}
                  height={14}
                />
              </button>
            </Link>
          </div>
        </div>
        <p className={styles.text}>{t('text')}</p>
      </div>
    </section>
  );
}

export default Banner1;
