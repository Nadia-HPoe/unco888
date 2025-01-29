import styles from './feedbackPopup.module.scss';

interface FeedbackPopupProps {
  feedback: {
    name: string;
    age: string;
    text: string;
  };
  onClose: () => void;
}

const FeedbackPopup: React.FC<FeedbackPopupProps> = ({ feedback, onClose }) => {
  return (
    <div className={styles.popup}>
      <div className={styles.popup__content}>
        <button className={styles.popup__close} onClick={onClose}></button>
        <div className={styles.popup__top}>
          <div className={styles.popup__image}></div>
          <h4 className={styles.popup__title}>{`${feedback.name}, ${feedback.age}`}</h4>
        </div>
        <p className={styles.popup__text}>{feedback.text}</p>
      </div>
    </div>
  );
};

export default FeedbackPopup;
