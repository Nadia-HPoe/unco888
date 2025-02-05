import Button from '../Button/Button';
import Image from 'next/image';
import styles from './banner2.module.scss';
import { useTranslations } from 'next-intl';

function Banner2() {
  const t = useTranslations('banner2');

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>
        <Image
          className={styles.icon}
          src='/images/BuyAndSell/logo.png'
          alt='icon-apple'
          width={50}
          height={50}
        />
        {t('title')}
        <span>888</span>
      </h2>
      <div className={styles.cards}>
        <div className={styles.card}>
          <h3 className={styles.subtitle}>{t('card_1.subtitle')}</h3>
          <p className={styles.text}>{t('card_1.text')}</p>
        </div>
        <div className={styles.card}>
          <h3 className={styles.subtitle}>{t('card_2.subtitle')}</h3>
          <div>
            <p className={styles.text}>{t('card_2.text_1')}</p>
            <ul>
              <li className={styles.text}>{t('card_2.text_2')}</li>
              <li className={styles.text}>{t('card_2.text_3')}</li>
            </ul>
          </div>
        </div>
        <div className={styles.card}>
          <h3 className={styles.subtitle}>{t('card_3.subtitle')}</h3>
          <p className={styles.text}>{t('card_3.text_1')}</p>
          <p className={styles.caption}>{t('card_3.text_2')}</p>
        </div>
      </div>
      <div className={styles.button}>
        <Button text={t('button_text')} link='#buy' />
      </div>
    </div>
  );
}

export default Banner2;
