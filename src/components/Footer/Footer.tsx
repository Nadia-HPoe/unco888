import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/functions/cn';
import { GetSocialData } from '@/constants/GetSocialsData';
import styles from './footer.module.scss';

export type ArrProps = {
  href: string;
  text: string;
};

type Props = {
  data: {
    links: ArrProps[];
  };
};

function Footer({ data }: Props) {
  const t = useTranslations('footer');
  const socials = GetSocialData();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <Image
          src='/images/Header/logo.png'
          alt='logo'
          width={193}
          height={193}
          className={styles.logo_big}
        />
        <div className={styles.content}>
          <div className={styles.socials}>
            <h2 className={styles.title}>
              <Image
                src='/images/Header/logo.png'
                alt='logo'
                width={156}
                height={146}
                className={styles.logo}
              />
              {t('title')}
            </h2>
            <div className={styles.socials__wrapper}>
              {socials.map((item, i) => (
                <Link
                  key={`${i}_${item}`}
                  className={cn(styles.socials__link, styles[`socials__icon_${i + 1}`])}
                  href={item}
                  target='_blank'
                />
              ))}
            </div>
          </div>
          <div className={styles.info}>
            <div className={styles.contacts}>
              <Link href='tel:+4915777074889' className={styles.phone}>
                +49 157 77074889
              </Link>
              <Link href='mailto:cvo@unco.club' className={styles.email}>
                cvo(at)unco.club
              </Link>
              <Link
                href='https://maps.google.com/?q=Schönenberger Straße 49, 53783 Eitorf, Germany'
                target='_blank'
                className={styles.address}
              >
                UNCO Club
              </Link>
            </div>

            <nav className={styles.links}>
              <div className={styles.nav}>
                <ul className={styles.col}>
                  {data.links.slice(0, 4).map(({ text, href }) => (
                    <li key={text}>
                      <Link className={styles.link} href={href}>
                        {text}
                      </Link>
                    </li>
                  ))}
                </ul>
                <ul className={styles.col}>
                  {data.links.slice(4, 7).map(({ text, href }) => (
                    <li key={text}>
                      <Link className={styles.link} href={href}>
                        {text}
                      </Link>
                    </li>
                  ))}
                </ul>
                <ul className={styles.col}>
                  {data.links.slice(7, 11).map(({ text, href }) => (
                    <li key={text}>
                      <Link className={styles.link} href={href}>
                        {text}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </nav>
          </div>
        </div>
      </div>
      <div className={styles.socials__wrapper_mobile}>
        {socials.map((item, i) => (
          <Link
            key={`${i}_${item}`}
            className={cn(styles.socials__link, styles[`socials__icon_${i + 1}`])}
            href={item}
            target='_blank'
          />
        ))}
      </div>
      <div className={styles.nav_mobile}>
        {data.links.map((item, n) => (
          <li key={n}>
            <Link className={styles.link} href={item.href}>
              {item.text}
            </Link>
          </li>
        ))}
      </div>
      <hr className={styles.line}></hr>
      <p className={styles.text}>{t('text.text_1')}</p>
      <p className={styles.text}>{t('text.text_2')}</p>
    </footer>
  );
}
export default Footer;
