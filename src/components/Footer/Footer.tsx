import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/functions/cn';
import { GetSocialData } from '@/constants/GetSocialsData';
import styles from './footer.module.scss';
import LinkFooter from './LinkFooter';

function Footer() {
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
                UNCO Club GmbH, Schönenberger Straße 49, 53783 Eitorf, Germany
              </Link>
            </div>

            <nav className={styles.links}>
              <ul className={styles.nav}>
                <div className={styles.col}>
                  <li>
                    <Link href='' className={styles.link}>
                      {t('links.link_1')}
                    </Link>
                  </li>
                  <li>
                    <Link href='' className={styles.link}>
                      {t('links.link_2')}
                    </Link>
                  </li>
                  <li>
                    <Link href='' className={styles.link}>
                      {t('links.link_3')}
                    </Link>
                  </li>
                  <li>
                    <Link href='#news' className={styles.link}>
                      {t('links.link_4')}
                    </Link>
                  </li>
                </div>
                <div className={styles.col}>
                  <li>
                    <Link href='#faq' className={styles.link}>
                      {t('links.link_5')}
                    </Link>
                  </li>
                  <li>
                    <Link href='#roadmap' className={styles.link}>
                      {t('links.link_6')}
                    </Link>
                  </li>
                  <li>
                    <Link href='' className={styles.link}>
                      {t('links.link_7')}
                    </Link>
                  </li>
                </div>
                <div className={styles.col}>
                  <li>
                    <Link
                      href='https://www.unco.club/include/impressum.php'
                      className={styles.link}
                    >
                      {t('links.link_8')}
                    </Link>
                  </li>
                  <li>
                    <Link
                      href='https://www.unco.club/include/licenses_detail.php'
                      className={styles.link}
                    >
                      {t('links.link_9')}
                    </Link>
                  </li>
                  <li>
                    <Link href='https://www.unco.club/company/rckgaberecht' className={styles.link}>
                      {t('links.link_10')}
                    </Link>
                  </li>
                  <li>
                    <Link href='https://www.unco.club/include/abg.php' className={styles.link}>
                      {t('links.link_11')}
                    </Link>
                  </li>
                </div>
              </ul>
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
      <LinkFooter />
      <hr className={styles.line}></hr>

      <p className={styles.text}>{t('text.text_1')}</p>
      <p className={styles.text}>{t('text.text_2')}</p>
    </footer>
  );
}
export default Footer;
