'use client';

import { useTranslations } from 'next-intl';
import { useState, useRef, useEffect } from 'react';
import styles from './feedback.module.scss';
import Button3 from '@/components/Button3/Button3';
import FeedbackCard from './FeedbackCard/FeedbackCard';
import FeedbackForm from '@/components/FeedbackForm/FeedbackForm';
import FeedbackPopup from './FeedbackPopup/FeedbackPopup';
import { loadFeedback } from '@/app/[locale]/actions';
import { FeedbackRecords, transformFeedback } from '@/functions/transformFeedback';

interface FeedbackItem {
  name: string;
  message: string,
  photo: string;
}

const toggleBodyScroll = (disable: boolean) => {
  if (disable) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
  }
};

const Feedback: React.FC = () => {
  const t = useTranslations('feedback');
  const sliderRef = useRef<HTMLDivElement | null>(null);
  const [feedbackData, setfeedbackData] = useState<FeedbackRecords[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const res = await loadFeedback();
        if (res && res.status === 200 && res.data) {
          setfeedbackData(transformFeedback(res.data));
        }
        console.log(res.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

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

  const [selectedFeedback, setSelectedFeedback] = useState<FeedbackItem | null>(null);

  const openPopup = (feedback: FeedbackItem) => {
    setSelectedFeedback(feedback);
  };

  const closePopup = () => {
    setSelectedFeedback(null);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    toggleBodyScroll(!!selectedFeedback);
    return () => toggleBodyScroll(false);
  }, [selectedFeedback]);

  return (
    <div className={styles.container}>
      <div>
        <h2 className={styles.title}>UNCO</h2>
        <hr className={styles.line}></hr>
        <h3 className={styles.subtitle}>{t('subtitle')}</h3>
      </div>
      <div className={styles.cards__wrapper}>
        <button
          className={styles.cards__button}
          onClick={() => handleScroll('left')}
          aria-label='Previous'
        />
        <div className={styles.cards__viewport} ref={sliderRef}>
          <div className={styles.cards}>
            {feedbackData.map((feedback, index) => (
              <FeedbackCard
                key={index}
                name={feedback.name}
                photo={feedback.photo}
                message={feedback.message}
                onClick={() => openPopup(feedback)}
              />
            ))}
          </div>
        </div>
        <button
          className={styles.cards__button}
          onClick={() => handleScroll('right')}
          aria-label='Next'
        />
        <div className={styles.cards__btns}>
          <button
            className={styles.cards__btn}
            onClick={() => handleScroll('left')}
            aria-label='Previous'
          />
          <button
            className={styles.cards__btn}
            onClick={() => handleScroll('right')}
            aria-label='Next'
          />
        </div>
      </div>
      <Button3
        className={`${styles.button} ${styles.review}`}
        type='button'
        onClick={openModal}
        text={t('button_text')}
      />
      <FeedbackForm isOpen={isModalOpen} onClose={closeModal} />
      {selectedFeedback && <FeedbackPopup feedback={selectedFeedback} onClose={closePopup} />}
    </div>
  );
};

export default Feedback;
