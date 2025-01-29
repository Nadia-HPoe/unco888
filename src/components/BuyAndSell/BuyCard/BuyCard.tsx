'use client';

import { useTranslations } from 'next-intl';
import Button from '@/components/Button/Button';
import styles from './buyCard.module.scss';
import Image from 'next/image';

interface BuyCardProps {
  quantity: string;
  price: string;
}

function BuyCard({ quantity, price }: BuyCardProps) {
  const t = useTranslations('buyandsell');

  return (
    <div className={styles.card}>
      <div className={styles.card__top}>
        <div className={styles.card__image}>
          <Image src='/images/BuyAndSell/logo.png' alt='logo' width={260} height={260} />
        </div>
        <h3 className={styles.card__title}>
          UNCO<span>888</span>
        </h3>
      </div>
      <div className={styles.card__bottom}>
        <div className={styles.card__text}>
          <p>{t('card.quantity')}:</p>
          <p>{`${quantity}`}</p>
        </div>
        <div className={styles.card__price}>
          <div className={styles.card__text}>
            <p>{t('card.price')}:</p>
            <p className={styles.card__numbers}>
              {`${price}`}
              <span> usdt</span>
            </p>
          </div>
          <div className={styles.buttonContainer}>
            <Button text={t('card.button')} link='' className={styles.button} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default BuyCard;
