import { getTranslations } from 'next-intl/server';

export async function GetBanner2Data() {
  const t = await getTranslations('banner2');

  return {
    title: t('title'),
    card_1: {
      subtitle: t('card_1.subtitle'),
      text: t('card_1.text')
    },
    card_2: {
      subtitle: t('card_2.subtitle'),
      text_1: t('card_2.text_1'),
      text_2: t('card_2.text_2'),
      text_3: t('card_3.text_3')
    },
    card_3: {
      subtitle: t('card_3.subtitle'),
      text_1: t('card_3.text_1'),
      text_2: t('card_3.text_2')
    },
    button_text: t('button_text')
  };
}
