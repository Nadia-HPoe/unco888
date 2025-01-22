import { getTranslations } from 'next-intl/server';

export async function GetHeaderData() {
  const t = await getTranslations('header');

  return {
    links: [
      { text: t('links.link_1'), href: '#buy' },
      { text: t('links.link_2'), href: '#uff' },
      { text: t('links.link_3'), href: '#pitchdeck' },
      { text: t('links.link_4'), href: '#news' },
      { text: t('links.link_5'), href: '#faq' },
      { text: t('links.link_6'), href: '#roadmap' },
      { text: t('links.link_7'), href: '#services' },
    ],
  };
}

export const languagesList = [
  { text: 'English', code: 'en' },
  // { text: 'Deutsch', code: 'de' },
  // { text: 'Русский', code: 'ru' },
  // { text: 'Українська', code: 'uk' },
  // { text: 'Français', code: 'fr' },
  // { text: 'Español', code: 'es' },
  // { text: 'Italiano', code: 'it' },
];
