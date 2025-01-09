import { useTranslations } from 'next-intl';
import styles from './news.module.scss';
import NewsCard from '../NewsCard/NewsCard';

function News() {
  const t = useTranslations('news');

  const newsData = [
    {
      title: 'Velitsodales egetonec.',
      text: 'Nnibh ornare accumsan. Nnibh ornare accumsan. Nnibh ornare accumsan. Nnibh ornare accumsan. Nnibh ornare accumsan. Nnibh ornare accumsan. Nnibh ornare accumsan.',
      caption: 'LOUIS NELSON / JULY 10, 2022',
    },
    {
      title: 'Velitsodales egetonec.',
      text: 'Nnibh ornare accumsan. Nnibh ornare accumsan. Nnibh ornare accumsan. Nnibh ornare accumsan. Nnibh ornare accumsan. Nnibh ornare accumsan. Nnibh ornare accumsan.',
      caption: 'LOUIS NELSON / JULY 10, 2022',
    },
    {
      title: 'Velitsodales egetonec.',
      text: 'Nnibh ornare accumsan. Nnibh ornare accumsan. Nnibh ornare accumsan. Nnibh ornare accumsan. Nnibh ornare accumsan. Nnibh ornare accumsan. Nnibh ornare accumsan.',
      caption: 'LOUIS NELSON / JULY 10, 2022',
    },
    {
      title: 'Velitsodales egetonec.',
      text: 'Nnibh ornare accumsan. Nnibh ornare accumsan. Nnibh ornare accumsan. Nnibh ornare accumsan. Nnibh ornare accumsan. Nnibh ornare accumsan. Nnibh ornare accumsan.',
      caption: 'LOUIS NELSON / JULY 10, 2022',
    },
    {
      title: 'Velitsodales egetonec.',
      text: 'Nnibh ornare accumsan. Nnibh ornare accumsan. Nnibh ornare accumsan. Nnibh ornare accumsan. Nnibh ornare accumsan. Nnibh ornare accumsan. Nnibh ornare accumsan.',
      caption: 'LOUIS NELSON / JULY 10, 2022',
    },
  ];

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>
        <span>UNCO</span> {t('title')}
      </h2>
      <div className={styles.cards}>
        {newsData.map((news, index) => (
          <NewsCard key={index} title={news.title} text={news.text} caption={news.caption} />
        ))}
      </div>
    </div>
  );
}

export default News;
