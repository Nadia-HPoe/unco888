import { useRef } from 'react';
import styles from './styles.module.scss';
import { cn } from '@/functions/cn';
import Link from 'next/link';
import { ArrProps } from '../Header';
import ButtonHeader from './ButtonHeader';

type Props = {
  links: ArrProps[];
  style: 'links_desktop' | 'links_mobile';
  onClick?: () => void | undefined;
  isOpenBurger?: boolean;
};

export default function LinkHeader({ links, style, onClick, isOpenBurger }: Props) {
  const linkRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  const setLinkRef = (index: number) => (element: HTMLAnchorElement) => {
    linkRefs.current[index] = element;
  };

  const scrollToSection = (index: number) => {
    const element = linkRefs.current[index];
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <nav className={cn(styles[style], isOpenBurger && styles.open)}>
      {style === 'links_mobile' && (
        <ButtonHeader style={'close_icon'} onClick={onClick as () => void | undefined} />
      )}
      <ul className={styles.navigation}>
        {links.map(({ text, href }, index) => (
          <li key={text}>
            <Link
              ref={setLinkRef(index)}
              className={styles.link}
              href={href}
              onClick={(e) => {
                e.stopPropagation();
                scrollToSection(index);
                if (onClick) onClick();
              }}
            >
              {text}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
