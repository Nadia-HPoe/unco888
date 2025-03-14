import Script from 'next/script';

interface GoogleTrackingProps {
  GA_ID?: string; // ID Google Analytics
  ADS_ID?: string; // ID Google Ads
}

const GoogleTracking: React.FC<GoogleTrackingProps> = ({ GA_ID, ADS_ID }) => {
  return (
    <>
      {/* Загружаем gtag.js */}
      {GA_ID && (
        <Script
          strategy='afterInteractive'
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        />
      )}

      {/* Настраиваем Google Analytics */}
      {GA_ID && (
        <Script
          id='google-analytics'
          strategy='afterInteractive'
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){ dataLayer.push(arguments); }
              gtag('js', new Date());
              gtag('config', '${GA_ID}', { page_path: window.location.pathname });
            `,
          }}
        />
      )}

      {/* Настраиваем Google Ads */}
      {ADS_ID && (
        <Script
          id='google-ads'
          strategy='afterInteractive'
          dangerouslySetInnerHTML={{
            __html: `
              gtag('config', '${ADS_ID}');
            `,
          }}
        />
      )}
    </>
  );
};

export default GoogleTracking;
