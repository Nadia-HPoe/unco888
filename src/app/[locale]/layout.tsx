import type { Metadata } from 'next';
import './globals.css';
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages } from 'next-intl/server';
import 'vanilla-cookieconsent/dist/cookieconsent.css';
import CookieConsentComponent from '@/components/CookieConsent/CookieConsent';
import GoogleTracking from '@/components/GoogleTracking/GoogleTracking';

export const metadata: Metadata = {
  title: 'Unco-888',
  description: 'Unco-888',
};

type Props = {
  children: React.ReactNode;
};

// Объявляем gtag глобально для TypeScript
declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    gtag?: (...args: any[]) => void;
  }
}

export default async function RootLayout({ children }: Props) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <head>
        <meta
          name='viewport'
          content='width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0'
        />
        <GoogleTracking
          GA_ID={process.env.GOOGLE_ANALYTICS_ID}
          ADS_ID={process.env.GOOGLE_ADS_ID}
        />
      </head>
      <body>
        <NextIntlClientProvider messages={messages}>
          <CookieConsentComponent />
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
