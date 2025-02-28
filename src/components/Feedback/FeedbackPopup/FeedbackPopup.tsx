import styles from './feedbackPopup.module.scss';
import Image from 'next/image';
import noPhoto from '../../../../public/images/Feedback/no-photo.svg';

interface FeedbackPopupProps {
  feedback: {
    name: string;
    photo: string;
    message: string;
  };
  onClose: () => void;
}

const FeedbackPopup: React.FC<FeedbackPopupProps> = ({ feedback, onClose }) => {
  const transformGoogleDriveLink = (url: string) => {
    const match = url.match(/\/d\/(.*?)\//);
    return match ? `https://drive.google.com/uc?export=view&id=${match[1]}` : url;
  };

  return (
    <div className={styles.popup}>
      <div className={styles.popup__content}>
        <button className={styles.popup__close} onClick={onClose}></button>
        <div className={styles.popup__top}>
          <div className={styles.popup__image}>
            <Image
              src={transformGoogleDriveLink(feedback.photo) || noPhoto}
              alt={feedback.name}
              fill
              sizes="120px"
              className={`${styles.image} ${!feedback.photo ? styles.placeholder : ''}`}
              loading="lazy"
            />
          </div>
          <h4 className={styles.popup__title}>{feedback.name}</h4>
        </div>
        <p className={styles.popup__text}>{feedback.message}</p>
      </div>
    </div>
  );
};

export default FeedbackPopup;
