import styles from './feedbackCard.module.scss';

interface FeedbackCardProps {
  name: string;
  age: string;
  text: string;
}

function FeedbackCard({ name, age, text }: FeedbackCardProps) {
  return (
    <div className={styles.card}>
      <div className={styles.card__top}>
        <div className={styles.card__image}></div>
        <h4 className={styles.card__title}>{`${name}, ${age}`}</h4>
      </div>
      <p className={styles.card__text}>{text}</p>
    </div>
  );
}

export default FeedbackCard;
