import { getTranslations } from 'next-intl/server';

export async function GetFeedbackData() {
  const t = await getTranslations('feedback');

  return {
    subtitle: t('subtitle'),
    button_text: t('button_text')
  };
}
