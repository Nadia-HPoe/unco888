import Link from 'next/link';
import { cn } from '@/functions/cn';
import Image from 'next/image';
import styles from './newsPopup.module.scss';
import useSearchLinks from '@/hooks/useSearchLinks';
import { formatTextWithPoints } from '@/functions/formatLinksStylesNews';

interface NewsCardPopupProps {
  news: {
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
  };
  onClose: () => void;
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

const NewsCardPopup: React.FC<NewsCardPopupProps> = ({ news, onClose }) => {
  const getSearchLinks = useSearchLinks;

  const handleBackgroundClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  const socialLinks = [
    { key: 'link_ds', url: news.link_ds },
    { key: 'link_tk', url: news.link_tk },
    { key: 'link_fb', url: news.link_fb },
    { key: 'link_ig', url: news.link_ig },
    { key: 'link_tg', url: news.link_tg },
    { key: 'link_lk', url: news.link_lk },
    { key: 'link_tw', url: news.link_tw },
    { key: 'link_yt', url: news.link_yt },
  ].filter((item) => item.url);

  const formattedText = formatTextWithPoints(news.text);

  return (
    <div className={styles.popup} onClick={handleBackgroundClick}>
      <div className={styles.popup__content}>
        <button className={styles.popup__close} onClick={onClose}></button>
        <div className={styles.popup__badges}>
          <div className={styles.popup__badge}>{news.tag1}</div>
          <div className={styles.popup__badge}>{news.tag2}</div>
          <div className={styles.popup__badge}>{news.tag3}</div>
        </div>
        <p className={styles.popup__caption}>{news.title}</p>
        <Image
          className={styles.popup__image}
          src={transformGoogleDriveLink(news.img)}
          alt={news.title}
          width={436}
          height={209}
        />
        <div className={styles.popup__text} style={{ whiteSpace: 'pre-wrap' }}>
          {getSearchLinks(formattedText, false, styles.links)}
        </div>
        <div className={styles.popup__bottom}>
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
        </div>
      </div>
    </div>
  );
};

export default NewsCardPopup;
