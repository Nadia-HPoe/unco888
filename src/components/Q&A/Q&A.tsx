'use client';
import React, { useEffect, useState } from 'react';
import styles from './Q&A.module.scss';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import { getQaData, TransformedObject } from '@/app/[locale]/actions';
import useSearchLinks from '@/hooks/useSearchLinks';

const QandA: React.FC = () => {
  const t = useTranslations('faq');
  const getSearchLinks = useSearchLinks;

  const [activeBlock, setActiveBlock] = useState<number | null>(null);

  const [response, setResponse] = useState<TransformedObject[] | null>([]);
  const { locale } = useParams();

  console.log(locale);

  const handleClick = (e: React.MouseEvent, index: number) => {
    e.preventDefault();

    if (activeBlock === index) {
      setActiveBlock(null);
    } else {
      setActiveBlock(index);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getQaData();

        setResponse(response?.data || []);
      } catch (error) {
        console.error('Fetch error:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <section className={styles.main} id='faq'>
      <h1 className={styles.title}>{t('title')}</h1>
      <div className={styles.container}>
        {response?.map((item, index) => (
          <div
            key={index}
            className={`${styles.block} ${activeBlock === index ? styles.active : ''}`}
          >
            <div className={styles.text}>
              <div className={styles.textsmini}>
                <p
                  className={`${styles.question} ${activeBlock === index ? styles.questionActive : ''}`}
                >
                  {item.question}
                </p>
                <p
                  className={`${styles.explanation} ${activeBlock === index ? styles.explanationActive : ''}`}
                >
                  {getSearchLinks(item.answer, false)}
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
