import styles from '../header.module.scss';
import Image from 'next/image';

type Props = {
  onClick: () => void;
};

function LanguageButton({ onClick }: Props) {
  return (
    <button className={styles.lang__button} onClick={onClick}>
      <Image
        src='/images/Header/language.png'
        alt='icon-language'
        width={28}
        height={28}
        className={styles.lang__icon}
      />
    </button>
  );
}

export default LanguageButton;
