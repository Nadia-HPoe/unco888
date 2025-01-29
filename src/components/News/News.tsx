'use client';

import { useRef } from 'react';
import { useTranslations } from 'next-intl';
import NewsCard from '../NewsCard/NewsCard';
import styles from './news.module.scss';

interface NewsItem {
  title: string;
  text: string;
  caption: string;
}

const News: React.FC = () => {
  const t = useTranslations('news');
  const sliderRef = useRef<HTMLDivElement | null>(null);

  const newsData: NewsItem[] = [
    {
      title: 'Velitsodales egetonec.1',
      text: 'Nnibh ornare accumsan. Nnibh ornare accumsan. Nnibh ornare accumsan. Nnibh ornare accumsan. Nnibh ornare accumsan. Nnibh ornare accumsan. Nnibh ornare accumsan.',
      caption: 'LOUIS NELSON / JULY 10, 2022',
    },
    {
      title: 'Velitsodales egetonec.2',
      text: 'Nnibh ornare accumsan. Nnibh ornare accumsan. Nnibh ornare accumsan. Nnibh ornare accumsan. Nnibh ornare accumsan. Nnibh ornare accumsan. Nnibh ornare accumsan.',
      caption: 'LOUIS NELSON / JULY 10, 2022',
    },
    {
      title: 'Velitsodales egetonec.3',
      text: 'Nnibh ornare accumsan. Nnibh ornare accumsan. Nnibh ornare accumsan. Nnibh ornare accumsan. Nnibh ornare accumsan. Nnibh ornare accumsan. Nnibh ornare accumsan.',
      caption: 'LOUIS NELSON / JULY 10, 2022',
    },
    {
      title: 'Velitsodales egetonec.4',
      text: 'Nnibh ornare accumsan. Nnibh ornare accumsan. Nnibh ornare accumsan. Nnibh ornare accumsan. Nnibh ornare accumsan. Nnibh ornare accumsan. Nnibh ornare accumsan.',
      caption: 'LOUIS NELSON / JULY 10, 2022',
    },
    {
      title: 'Velitsodales egetonec.5',
      text: 'Nnibh ornare accumsan. Nnibh ornare accumsan. Nnibh ornare accumsan. Nnibh ornare accumsan. Nnibh ornare accumsan. Nnibh ornare accumsan. Nnibh ornare accumsan.',
      caption: 'LOUIS NELSON / JULY 10, 2022',
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

  return (
    <div className={styles.container} id='news'>
      <h2 className={styles.title}>
        <span>UNCO</span> {t('title')}
      </h2>
      <div className={styles.slider}>
        <div className={styles.cards} ref={sliderRef}>
          {newsData.map((news, index) => (
            <NewsCard key={index} title={news.title} text={news.text} caption={news.caption} />
          ))}
        </div>
        <div className={styles.buttons}>
          <button
            className={styles.button}
            onClick={() => handleScroll('left')}
            aria-label='Previous'
          />
          <button
            className={styles.button}
            onClick={() => handleScroll('right')}
            aria-label='Next'
          />
        </div>
      </div>
    </div>
  );
};

export default News;
