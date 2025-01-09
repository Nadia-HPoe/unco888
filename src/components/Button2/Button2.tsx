import Link from 'next/link';
import styles from './button2.module.scss';

type Props = {
  text: string;
  font?: string;
  link: string;
};

//Serves as a Button component, opens a new page to a URL provided in link prop. The default font size is 25px, but you can provide any other size as a prop. Width is 100%, so you'll have to wrap the component in a div (for example) to fit wherever you need.

function Button2({ text, link, font = '25px' }: Props) {
  return (
    <Link href={link} className={styles.button} style={{ fontSize: font }} target='_blank'>
      {text}
    </Link>
  );
}

export default Button2;
