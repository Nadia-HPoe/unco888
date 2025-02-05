import Link from 'next/link';
import styles from './button.module.scss';

type Props = {
  text: string;
  link: string;
  className?: string;
};

//Serves as a Button component, opens a new page to a URL provided in link prop. The default font size is 25px, but you can provide any other size as a prop. Width is 100%, so you'll have to wrap the component in a div (for example) to fit wherever you need.

function Button({ text, link, className }: Props) {
  return (
    <Link href={link} className={`${styles.button} ${className}`}>
      {text}
    </Link>
  );
}

export default Button;
