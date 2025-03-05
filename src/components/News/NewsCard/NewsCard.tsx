import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/functions/cn';
import styles from './newsCard.module.scss';
import useSearchLinks from '@/hooks/useSearchLinks';
import { formatTextWithPoints } from '@/functions/formatLinksStylesNews';

interface NewsCardProps {
  tag1: string;
  tag2: string;
  tag3: string;
  title: string;
  img: string;
  text: string;
  link_ds?: string;
  link_tk?: string;
  link_fb?: string;
  link_ig?: string;
  link_tg?: string;
  link_lk?: string;
  link_tw?: string;
  link_yt?: string;
  onClick: () => void;
}

const socialIcons = {
  link_ds: 'discord',
  link_tk: 'tiktok',
  link_fb: 'facebook',
  link_ig: 'instagram',
  link_tg: 'telegram',
  link_lk: 'linkedin',
  link_tw: 'twitter',
  link_yt: 'youtube',
};

const transformGoogleDriveLink = (url: string) => {
  const match = url.match(/\/d\/(.*?)\//);
  return match ? `https://drive.google.com/uc?export=view&id=${match[1]}` : url;
};

const NewsCard: React.FC<NewsCardProps> = ({
  tag1,
  tag2,
  tag3,
  title,
  img,
  text,
  link_ds,
  link_tk,
  link_fb,
  link_ig,
  link_tg,
  link_lk,
  link_tw,
  link_yt,
  onClick,
}) => {
  const getSearchLinks = useSearchLinks;

  const socialLinks = [
    { key: 'link_ds', url: link_ds },
    { key: 'link_tk', url: link_tk },
    { key: 'link_fb', url: link_fb },
    { key: 'link_ig', url: link_ig },
    { key: 'link_tg', url: link_tg },
    { key: 'link_lk', url: link_lk },
    { key: 'link_tw', url: link_tw },
    { key: 'link_yt', url: link_yt },
  ].filter((item) => item.url);

  const formattedText = formatTextWithPoints(text);

  return (
    <div className={styles.card} onClick={onClick}>
      <div className={styles.card__top}>
        <div className={styles.card__badges}>
          {tag1 && <div className={styles.card__badge}>{tag1}</div>}
          {tag2 && <div className={styles.card__badge}>{tag2}</div>}
          {tag3 && <div className={styles.card__badge}>{tag3}</div>}
        </div>
        <p className={styles.card__caption}>{title}</p>
        <Image
          className={styles.card__image}
          src={transformGoogleDriveLink(img)}
          alt={title}
          width={436}
          height={209}
        />
        <p className={styles.card__text} style={{ whiteSpace: 'pre-wrap' }}>
          {getSearchLinks(formattedText, false, styles.links)}
        </p>
      </div>
      <div className={styles.card__bottom}>
        <a className={styles.card__link} href='#'>
          READ MORE
        </a>
        {socialLinks.length > 0 && (
          <div className={styles.socials__wrapper}>
            {socialLinks.map(({ key, url }) => (
              <Link
                key={key}
                className={cn(
                  styles.socials__link,
                  styles[`socials__icon_${socialIcons[key as keyof typeof socialIcons]}`]
                )}
                href={url as string}
                target='_blank'
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default NewsCard;
