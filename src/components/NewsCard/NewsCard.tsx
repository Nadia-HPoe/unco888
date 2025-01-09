import Link from 'next/link';
import { cn } from '@/functions/cn';
import { GetSocialData } from '@/constants/GetSocialsData';
import styles from './newsCard.module.scss';

interface NewsCardProps {
  title: string;
  text: string;
  caption: string;
}

function NewsCard({ title, text, caption }: NewsCardProps) {
  const socials = GetSocialData();
  return (
    <div className={styles.card}>
      <div className={styles.card__badges}>
        <div className={styles.card__badge}>SPACE</div>
        <div className={styles.card__badge}>SPACE</div>
        <div className={styles.card__badge}>SPACE</div>
      </div>
      <h3 className={styles.card__title}>{title}</h3>
      <div className={styles.card__image}></div>
      <p className={styles.card__text}>{text}</p>
      <div className={styles.card__bottom}>
        <p className={styles.card__caption}>{caption}</p>
        <div className={styles.socials__wrapper}>
          {socials.map((item, i) => (
            <Link
              key={`${i}_${item}`}
              className={cn(styles.socials__link, styles[`socials__icon_${i + 1}`])}
              href={item}
              target='_blank'
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default NewsCard;
