'use client';

import { ChangeEvent, useState } from 'react';
import Button from '../Button/Button';
import styles from './sellForm.module.scss';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

type SellFormProps = {
  onClose: () => void;
};

const SellForm: React.FC<SellFormProps> = ({ onClose }) => {
  const t = useTranslations('sellForm');
  const [isAgreed, setIsAgreed] = useState<boolean>(false);

  const handleCloseClick = (e: React.MouseEvent) => {
    e.preventDefault();
    onClose();
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setIsAgreed(event.target.checked);
  };

  return (
    <form className={styles.container}>
      <button className={styles.close} onClick={handleCloseClick} />
      <div className={styles.container__wrapper}>
        <p className={styles.container__label}>{t('labelQuantity')}</p>
        <input
          placeholder={t('placeholderQuantity')}
          type='number'
          className={styles.container__input}
        />
      </div>

      <div className={styles.container__wrapper}>
        <p className={styles.container__label}>
          {t('labelLink')}
          <Link href={'https://opensea.io/'} className={styles.link} target='_blank'>
            {' '}
            opensea.io
          </Link>
        </p>
        <input placeholder={t('placeholderLink')} type='url' className={styles.container__input} />
      </div>

      <div className={styles.container__wrapper}>
        <p className={styles.container__label}>{t('labelContactInfo')}</p>
        <input
          placeholder={t('placeholderContactInfo')}
          type='text'
          className={styles.container__input}
        />
      </div>
      <div className={styles.container__bottom}>
        <div className={styles.container_agree}>
          <input
            id='agree'
            className={styles.agree}
            checked={isAgreed}
            onChange={handleChange}
            type='checkbox'
          />
          <label className={styles.text_label} htmlFor='agree'>
            {t('agreeText')}
          </label>
        </div>
        <div className={styles.buttonContainer}>
          <Button text={t('btnText')} link='' className={styles.button} />
        </div>
      </div>
    </form>
  );
};

export default SellForm;
