import styles from './styles.module.scss';

type Props = {
  style:
    | 'hamburger_mobile'
    | 'check_card'
    | 'language_icon'
    | 'close_icon'
    | 'nav_button_where_buy';
  onClick: () => void;
  text?: string;
};

const ButtonHeader = ({ style, onClick, text }: Props) => {
  return (
    <button className={styles[style]} onClick={onClick}>
      {text}
    </button>
  );
};

export default ButtonHeader;
