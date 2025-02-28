'use client';

import { useState, useRef, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import NewsPopup from './NewsPopup/NewsPopup';
import { NewsRecords, transformNews } from '@/functions/transformNews';
import { loadNews } from '@/app/[locale]/actions';
import NewsCard from './NewsCard/NewsCard';
import styles from './news.module.scss';

interface NewsItem {
  tag1: string;
  tag2: string;
  tag3: string;
  title: string;
  img: string;
  text: string;
  link_ds: string;
  link_tk: string;
  link_fb: string;
  link_ig: string;
  link_tg: string;
  link_lk: string;
  link_tw: string;
  link_yt: string;
}

const News: React.FC = () => {
  const t = useTranslations('news');
  const sliderRef = useRef<HTMLDivElement>(null);
  const [news, setNews] = useState<NewsRecords[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const res = await loadNews();
        if (res && res.status === 200 && res.data) {
          setNews(transformNews(res.data));
        }
        console.log(res.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const toggleBodyScroll = (disable: boolean) => {
    if (disable) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  };

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

  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);

  const openPopup = (news: NewsItem) => {
    setSelectedNews(news);
  };

  const closePopup = () => {
    setSelectedNews(null);
  };

  useEffect(() => {
    toggleBodyScroll(!!selectedNews);
    return () => toggleBodyScroll(false);
  }, [selectedNews]);

  return (
    <div className={styles.container} id='news'>
      <h2 className={styles.title}>
        <span>UNCO</span> {t('title')}
      </h2>
      <div className={styles.slider}>
        <div className={styles.cards} ref={sliderRef}>
          {news.map((news, index) => (
            <NewsCard
              key={index}
              title={news.title}
              tag1={news.tag1}
              tag2={news.tag2}
              tag3={news.tag3}
              img={news.img}
              text={news.text}
              link_ds={news.link_ds}
              link_tk={news.link_tk}
              link_fb={news.link_fb}
              link_ig={news.link_ig}
              link_tg={news.link_tg}
              link_lk={news.link_lk}
              link_tw={news.link_tw}
              link_yt={news.link_yt}
              onClick={() => openPopup(news)}
            />
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
      {selectedNews && <NewsPopup news={selectedNews} onClose={closePopup} />}
    </div>
  );
};

export default News;
