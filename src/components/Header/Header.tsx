'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import styles from './header.module.scss';
import LanguageButton from './HeaderComponents/LanguageButton';
import LanguageMenu from './HeaderComponents/LanguageMenu';
import LinkHeader from './HeaderComponents/LinkHeader';
import ButtonHeader from './HeaderComponents/ButtonHeader';
import { createRef, Ref, useRef, useState } from 'react';
import { languagesList } from '@/constants/GetHeaderData';
import Button from '../Button/Button';

export type ArrProps = {
  href: string;
  text: string;
};

type Props = {
  data: {
    links: ArrProps[];
  };
};

function Header({ data }: Props) {
  const t = useTranslations('header');
  const [isOpenLanguage, setIsOpenLanguage] = useState(false);
  const [isClosing, setIsClosing] = useState(true);
  const [isOpenBurger, setIsOpenBurger] = useState(false);
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
      <Image
        className={styles.logo}
        src='/images/Header/logo.png'
        alt='logo'
        width={106}
        height={106}
      />{' '}
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
        <LinkHeader links={data.links} style={'links_desktop'} />
        <ButtonHeader style={'hamburger_mobile'} onClick={() => setIsOpenBurger((prev) => !prev)} />

        <LinkHeader
          links={data.links}
          style={'links_mobile'}
          isOpenBurger={isOpenBurger}
          onClick={() => setIsOpenBurger((prev) => !prev)}
        />

        <div className={styles.news_button}>
          <Button text={t('button')} link='#news' />
        </div>
      </div>
    </header>
  );
}
export default Header;
