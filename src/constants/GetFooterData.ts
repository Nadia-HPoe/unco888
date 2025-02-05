import { getTranslations } from 'next-intl/server';

export async function GetFooterData() {
  const t = await getTranslations('footer');

  return {
    links: [
      { text: t('links.link_1'), href: '#buy' },
      { text: t('links.link_2'), href: '#uff' },
      { text: t('links.link_3'), href: '#pitchdeck' },
      { text: t('links.link_4'), href: '#news' },
      { text: t('links.link_5'), href: '#faq' },
      { text: t('links.link_6'), href: '#roadmap' },
      { text: t('links.link_7'), href: '#services' },
      { text: t('links.link_8'), href: 'https://club.unco.market/files/Impressum.pdf' },
      { text: t('links.link_9'), href: 'https://club.unco.market/files/Datenschutz.pdf' },
      { text: t('links.link_10'), href: 'https://club.unco.market/files/Ru%CC%88ckgaberecht.pdf' },
      { text: t('links.link_11'), href: 'https://club.unco.market/files/AGB.pdf' },
    ],
  };
}
