import styles from './feedbackCard.module.scss';
import Image from 'next/image';
import noPhoto from '../../../../public/images/Feedback/no-photo.svg';

interface FeedbackCardProps {
  name: string;
  message: string,
  photo: string;
  onClick: () => void;
}

function FeedbackCard({ name, message, photo, onClick }: FeedbackCardProps) {
  const transformGoogleDriveLink = (url: string) => {
    const match = url.match(/\/d\/(.*?)\//);
    return match ? `https://drive.google.com/uc?export=view&id=${match[1]}` : url;
  };

  return (
    <div className={styles.card} onClick={onClick}>
      <div className={styles.card__top}>
        <div className={styles.card__image}>
          <Image
            src={transformGoogleDriveLink(photo) || noPhoto}
            alt={name}
            fill
            sizes="120px"
            className={`${styles.image} ${!photo ? styles.placeholder : ''}`}
            loading="lazy"
          />
        </div>
        <h4 className={styles.card__title}>{name}</h4>
      </div>
      <p className={styles.card__text}>{message}</p>
    </div>
  );
}

export default FeedbackCard;
