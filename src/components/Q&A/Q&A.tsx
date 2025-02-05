'use client';

import React, { useState } from 'react';
import styles from './Q&A.module.scss';
import QandAData from '../../constants/getQ&AData';
import { useTranslations } from 'next-intl';

const QandA: React.FC = () => {
  const t = useTranslations('faq');
  const [activeBlock, setActiveBlock] = useState<number | null>(null);

  const handleClick = (e: React.MouseEvent, index: number) => {
    e.preventDefault();

    if (activeBlock === index) {
      setActiveBlock(null);
    } else {
      setActiveBlock(index);
    }
  };

  return (
    <section className={styles.main} id='faq'>
      <h1 className={styles.title}>{t('title')}</h1>
      <div className={styles.container}>
        {QandAData.map((item, index) => (
          <div
            key={index}
            className={`${styles.block} ${activeBlock === index ? styles.active : ''}`}
          >
            <div className={styles.text}>
              <div className={styles.textsmini}>
                <p
                  className={`${styles.question} ${activeBlock === index ? styles.questionActive : ''}`}
                >
                  {t(item.question)}
                </p>
                <p
                  className={`${styles.explanation} ${activeBlock === index ? styles.explanationActive : ''}`}
                >
                  {t(item.explanation)}
                </p>
              </div>
            </div>
            <button
              className={`${styles.button} ${activeBlock === index ? styles.rotated : ''}`}
              onClick={(e) => handleClick(e, index)}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default QandA;
