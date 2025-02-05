'use client';

import { useTranslations } from 'next-intl';
import { useState, useRef } from 'react';
import styles from './buyAndSell.module.scss';
import BuyCard from './BuyCard/BuyCard';
import ModalComponent from '../ModalСomponent/ModalСomponent';
import SellForm from '../SellForm/SellForm';

function BuyAndSell() {
  const t = useTranslations('buyandsell');
  const sliderRef = useRef<HTMLDivElement>(null);

  const buyCards = [
    {
      quantity: '1',
      price: '5 000',
    },
    {
      quantity: '5',
      price: '25 000',
    },
    {
      quantity: '10',
      price: '50 000',
    },
    {
      quantity: '15',
      price: '100 000',
    },
  ];

  const handleScroll = (direction: 'left' | 'right') => {
    const slider = sliderRef.current;
    if (slider) {
      const scrollAmount = slider.offsetWidth / 2;
      slider.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={styles.container} id='buy'>
      <h2 className={styles.title}>
        {t('title')}{' '}
        <span className={styles.subtitle}>
          UNCO<span>888</span>
        </span>
      </h2>
      <p className={styles.disclaimer}>{t('disclaimer')}</p>
      <div className={styles.slider}>
        <div className={styles.cards__buttonDesktopContainer}>
          <button
            className={`${styles.cards__button} ${styles.cards__button_left}`}
            onClick={() => handleScroll('left')}
            aria-label='Previous'
          ></button>
        </div>

        <div ref={sliderRef} className={styles.cards}>
          {buyCards.map((buyCard, index) => (
            <BuyCard key={index} quantity={buyCard.quantity} price={buyCard.price} />
          ))}
        </div>

        <div className={styles.cards__buttonDesktopContainer}>
          <button
            className={`${styles.cards__button} ${styles.cards__button_right}`}
            onClick={() => handleScroll('right')}
            aria-label='Next'
          ></button>
        </div>
      </div>
      <div className={styles.cards__buttonTabletContainer}>
        <button
          className={`${styles.cards__button} ${styles.cards__button_left}`}
          onClick={() => handleScroll('left')}
          aria-label='Previous'
        ></button>
        <button
          className={`${styles.cards__button} ${styles.cards__button_right}`}
          onClick={() => handleScroll('right')}
          aria-label='Next'
        ></button>
      </div>

      <div className={styles.buttonContainer}>
        <button className={styles.button} onClick={handleOpenModal}>
          {t('button_text')}{' '}
        </button>
      </div>

      <ModalComponent isOpen={isModalOpen} onRequestClose={handleCloseModal}>
        <SellForm onClose={handleCloseModal} />
      </ModalComponent>
    </div>
  );
}

export default BuyAndSell;
