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
  const [currentIndex, setCurrentIndex] = useState(0);
  const visibleCards = 3;
  const cardWidth = 380 + 69;

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

  const maxIndex = buyCards.length - visibleCards;

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex < maxIndex ? prevIndex + 1 : prevIndex));
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : prevIndex));
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
        {t('title')}
        <span className={styles.subtitle}>
          UNCO<span>888</span>
        </span>
      </h2>
      <p className={styles.disclaimer}>{t('disclaimer')}</p>
      <div className={styles.cards__wrapper}>
        <button className={styles.cards__button} onClick={handlePrev}></button>
        <div className={styles.cards__viewport}>
          <div
            ref={sliderRef}
            className={styles.cards}
            style={{ transform: `translateX(-${currentIndex * cardWidth}px)` }}
          >
            {buyCards.map((buyCard, index) => (
              <BuyCard key={index} quantity={buyCard.quantity} price={buyCard.price} />
            ))}
          </div>
        </div>
        <button className={styles.cards__button} onClick={handleNext}></button>
      </div>

      <button className={styles.button} onClick={handleOpenModal}>
        {t('button_text')}{' '}
      </button>

      <ModalComponent isOpen={isModalOpen} onRequestClose={handleCloseModal}>
        <SellForm onClose={handleCloseModal} />
      </ModalComponent>
    </div>
  );
}

export default BuyAndSell;
