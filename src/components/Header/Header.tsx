'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import styles from './header.module.scss';
import LanguageButton from './LanguageButton';
import LanguageMenu from './LanguageMenu';
import { createRef, Ref, useRef, useState } from 'react';
import { languagesList } from '@/constants/GetHeaderData';
import Button from '../Button/Button';

function Header() {
  const t = useTranslations('header');
  const [isOpenLanguage, setIsOpenLanguage] = useState(false);
  const [isClosing, setIsClosing] = useState(true);

  const buttonRef = useRef<HTMLDivElement | null>(null);
  const languageMenuRef: Ref<HTMLUListElement> = createRef();

  const handleCloseMenu = () => {
    setIsClosing(false);
    setTimeout(() => {
      setIsOpenLanguage(false);
      setIsClosing(true);
    }, 450);
  };

  return (
    <header className={styles.header}>
      <Image src='/images/Header/logo-apple.png' alt='logo' width={106} height={106} />{' '}
      <div className={styles.wrapper}>
        <div className={styles.dropdown}>
          <div
            className={styles.dropdown_wrapper}
            onMouseLeave={(e) => {
              if (!e.currentTarget.contains(e.relatedTarget as Node)) {
                handleCloseMenu();
              }
            }}
          >
            <div ref={buttonRef} className={styles.container}>
              <LanguageButton
                onClick={() => {
                  isOpenLanguage ? handleCloseMenu() : setIsOpenLanguage(true);
                }}
              />
            </div>
            <LanguageMenu
              ref={languageMenuRef}
              menu={languagesList}
              isOpenLanguage={isOpenLanguage}
              closeMenu={() => setIsOpenLanguage(false)}
              isClosing={isClosing}
            />
          </div>
        </div>
        <ul className={styles.navigation}>
          <li className={styles.link}>Buy/Sell</li>
          <li className={styles.link}>UFF</li>
          <li className={styles.link}>Pitch-deck</li>
          <li className={styles.link}>News</li>
          <li className={styles.link}>Q&A</li>
          <li className={styles.link}>Roadmap</li>
          <li className={styles.link}>UNCO Eco-System</li>
        </ul>
        <div className={styles.news_button}>
          <Button text={t('button')} link='' />
        </div>
      </div>
    </header>
  );
}
export default Header;
