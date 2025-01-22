'use client';

import styles from './footer.module.scss';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

export default function LinkFooter() {
  const t = useTranslations('footer');

  const data = {
    links: [
      { text: t('links.link_1'), href: '#buy' },
      { text: t('links.link_2'), href: '#uff' },
      { text: t('links.link_3'), href: '#pitchdeck' },
      { text: t('links.link_4'), href: '#news' },
      { text: t('links.link_5'), href: '#faq' },
      { text: t('links.link_6'), href: '#roadmap' },
      { text: t('links.link_7'), href: '#services' },
      { text: t('links.link_8'), href: 'https://www.unco.club/include/impressum.php' },
      { text: t('links.link_9'), href: 'https://www.unco.club/include/licenses_detail.php' },
      { text: t('links.link_10'), href: 'https://www.unco.club/company/rckgaberecht' },
      { text: t('links.link_11'), href: 'https://www.unco.club/include/abg.php' },
    ],
  };

  return (
    <>
      <ul className={styles.nav_mobile}>
        {data.links.map((item, n) => (
          <li key={n}>
            <Link className={styles.link} href={item.href}>
              {item.text}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
