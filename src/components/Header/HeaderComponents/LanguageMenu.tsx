import { forwardRef } from 'react';
import { cn } from '@/functions/cn';
import { Locale, usePathname, useRouter } from '@/i18n/routing';

import styles from './styles.module.scss';

type MenuItem = { text: string; code: string };

type Props = {
  menu: MenuItem[];
  closeMenu: () => void;
  isOpenLanguage: boolean;
  isClosing: boolean;
};

const LanguageMenu = forwardRef<HTMLUListElement, Props>(function LanguageMenu(
  { menu, closeMenu, isOpenLanguage, isClosing },
  ref
) {
  const router = useRouter();
  const pathname = usePathname();

  const handleChange = (event: React.MouseEvent<HTMLLIElement>) => {
    const nextLocale = event.currentTarget.dataset.code as Locale;
    router.replace({ pathname }, { locale: nextLocale });
    closeMenu();
  };

  return (
    <ul
      ref={ref}
      className={cn(
        styles.languages,
        styles.language_menu,
        isOpenLanguage && styles.open,
        !isClosing && styles.closing
      )}
    >
      {menu.map(({ text, code }) => (
        <li key={code} data-code={code} className={styles.languages_item} onClick={handleChange}>
          {text}
        </li>
      ))}
    </ul>
  );
});
export default LanguageMenu;
