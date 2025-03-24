'use client';

import React, { ChangeEvent, useState } from 'react';
import styles from './sellForm.module.scss';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import Button3 from '@/components/Button3/Button3';
import { sendSellOffer } from '@/app/[locale]/actions';
import { useRecaptcha } from '@/hooks/useRecaptcha';
import ReCAPTCHA from 'react-google-recaptcha';
import { useMediaQuery } from 'react-responsive';
import ModalComponent from '../ModalСomponent/ModalСomponent';

type SellFormProps = {
  isOpen: boolean;
  onClose: () => void;
};

const SellForm: React.FC<SellFormProps> = ({ isOpen, onClose }) => {
  const t = useTranslations('sellForm');
  const [isAgreed, setIsAgreed] = useState<boolean>(false);
  const [quantity, setQuantity] = useState<string>('');
  const [price, setPrice] = useState<string>('');
  const [link, setLink] = useState<string>('');
  const [contact, setContact] = useState<string>('');
  const [touchedFields, setTouchedFields] = useState({
    quantity: false,
    price: false,
    link: false,
    contact: false,
  });
  const [isPending, setIsPending] = useState<boolean>(false);
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 760px)' });

  const { recaptchaRef, recaptchaToken, resetRecaptcha, isLoading, setRecaptchaToken } =
    useRecaptcha({
      isOpen,
      onVerify: (token) => {
        console.log('reCAPTCHA verified with token:', token.substring(0, 10) + '...');
      },
    });

  const handleCloseClick = () => {
    setQuantity('');
    setPrice('');
    setLink('');
    setContact('');
    resetRecaptcha();
    setTouchedFields({
      quantity: false,
      price: false,
      link: false,
      contact: false,
    });
    onClose();
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!recaptchaToken) {
      console.error('Please complete the reCAPTCHA verification');
      return;
    }

    setIsPending(true);

    try {
      const res = await sendSellOffer(quantity, price, link, contact, false, recaptchaToken);
      if (res.status === 200) {
        setQuantity('');
        setPrice('');
        setLink('');
        setContact('');
        setTouchedFields({
          quantity: false,
          price: false,
          link: false,
          contact: false,
        });
        handleCloseClick();
      } else {
        console.error('Error submitting the form');
      }
    } catch (error) {
      console.error('Request error:', error);
    } finally {
      setIsPending(false);
    }
  };

  const handleNumberChange = (
    e: ChangeEvent<HTMLInputElement>,
    setter: React.Dispatch<React.SetStateAction<string>>,
    fieldName: 'quantity' | 'price'
  ) => {
    const value = e.target.value;
    if (/^\d*\.?\d*$/.test(value)) {
      setter(value);
      setTouchedFields((prev) => ({
        ...prev,
        [fieldName]: true,
      }));
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setIsAgreed(event.target.checked);
  };

  const handleBlur = (fieldName: 'quantity' | 'price' | 'link' | 'contact') => {
    setTouchedFields((prev) => ({
      ...prev,
      [fieldName]: true,
    }));
  };

  const isFormValid =
    quantity !== '' &&
    Number(quantity) > 0 &&
    price !== '' &&
    Number(price) > 0 &&
    link.trim() !== '' &&
    contact.trim() !== '' &&
    isAgreed &&
    recaptchaToken;

  return (
    <ModalComponent isOpen={isOpen} onRequestClose={handleCloseClick}>
      <form className={styles.container} onSubmit={handleSubmit}>
        <button className={styles.close} onClick={handleCloseClick} />
        <div className={styles.container__wrapper}>
          <p className={styles.container__label}>{t('labelQuantity')}</p>
          <input
            placeholder={t('placeholderQuantity')}
            type='number'
            id='quantity'
            value={quantity}
            onChange={(e) => handleNumberChange(e, setQuantity, 'quantity')}
            onBlur={() => handleBlur('quantity')}
            className={`${styles.container__input}
          ${touchedFields.quantity && (!quantity || Number(quantity) < 0) ? styles.error : ''}`}
            min='0'
            required
          />
        </div>

        <div className={styles.container__wrapper}>
          <p className={styles.container__label}>{t('labelPrice')}</p>
          <input
            placeholder={t('placeholderPrice')}
            type='number'
            id='price'
            value={price}
            onChange={(e) => handleNumberChange(e, setPrice, 'price')}
            onBlur={() => handleBlur('price')}
            className={`${styles.container__input}
          ${touchedFields.price && (!price || Number(price) < 0) ? styles.error : ''}`}
            min='0'
            required
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
          <input
            placeholder={t('placeholderLink')}
            type='url'
            id='link'
            value={link}
            onChange={(e) => setLink(e.target.value)}
            onBlur={() => handleBlur('link')}
            className={`${styles.container__input} ${touchedFields.link && link.trim() === '' ? styles.error : ''}`}
            required
          />
        </div>

        <div className={styles.container__wrapper}>
          <p className={styles.container__label}>{t('labelContactInfo')}</p>
          <input
            placeholder={t('placeholderContactInfo')}
            type='text'
            id='contact'
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            onBlur={() => handleBlur('contact')}
            className={`${styles.container__input} ${touchedFields.contact && contact.trim() === '' ? styles.error : ''}`}
            required
          />
        </div>
        <div className={styles.recaptcha_container}>
          {isLoading ? (
            <div className={styles.loading}>Loading reCAPTCHA...</div>
          ) : (
            <ReCAPTCHA
              ref={recaptchaRef}
              sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_TOKEN!}
              theme='dark'
              size={isTabletOrMobile ? 'compact' : 'normal'}
              onChange={(token) => setRecaptchaToken(token || '')}
            />
          )}
        </div>
        <div className={styles.container__bottom}>
          <div className={styles.container_agree}>
            <input
              id='agree'
              className={styles.agree}
              checked={isAgreed}
              onChange={handleChange}
              type='checkbox'
              required
            />
            <label className={styles.text_label} htmlFor='agree'>
              {t('agreeText')}
            </label>
          </div>
          <div className={styles.buttonContainer}>
            <Button3
              className={`${styles.button} ${styles.submit}`}
              type='submit'
              disabled={!isFormValid || isPending}
              text={t('btnText')}
            />
          </div>
        </div>
      </form>
    </ModalComponent>
  );
};

export default SellForm;
