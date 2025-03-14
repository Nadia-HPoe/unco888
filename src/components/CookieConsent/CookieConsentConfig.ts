import type { CookieConsentConfig } from 'vanilla-cookieconsent';

const pluginConfig: CookieConsentConfig = {
  guiOptions: {
    consentModal: {
      layout: 'bar',
      position: 'bottom',
      equalWeightButtons: true,
      flipButtons: false,
    },
    preferencesModal: {
      layout: 'box',
      position: 'left',
      equalWeightButtons: true,
      flipButtons: false,
    },
  },

  onFirstConsent: function () {
    console.log('onFirstAction fired');
  },

  onConsent: function ({ cookie }) {
    console.log('onConsent fired', cookie);

    // Обновляем Google Consent Mode в зависимости от выбранных категорий
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    window.gtag &&
      window.gtag('consent', 'update', {
        analytics_storage: cookie.categories.includes('analytics') ? 'granted' : 'denied',
        ad_storage: cookie.categories.includes('marketing') ? 'granted' : 'denied',
      });
  },

  onChange: function ({ changedCategories, cookie }) {
    console.log('onChange fired', changedCategories, cookie);

    // Обновляем Google Consent Mode
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    window.gtag &&
      window.gtag('consent', 'update', {
        analytics_storage: cookie.categories.includes('analytics') ? 'granted' : 'denied',
        ad_storage: cookie.categories.includes('marketing') ? 'granted' : 'denied',
      });
  },

  categories: {
    necessary: {
      readOnly: true,
      enabled: true,
    },
    functionality: { enabled: true },
    analytics: { enabled: true },
    marketing: { enabled: true },
  },

  language: {
    default: 'en',

    translations: {
      en: {
        consentModal: {
          title: 'This website uses cookies',
          description:
            'We use cookies to personalise content and ads, to provide social media features and to analyse our traffic. We also share information about your use of our site with our social media, advertising and analytics partners who may combine it with other information that you’ve provided to them or that they’ve collected from your use of their services.',
          acceptAllBtn: 'Accept all',
          acceptNecessaryBtn: 'Reject all',
          showPreferencesBtn: 'Manage preferences',
          //closeIconLabel: 'Close',
          footer: `
            <a href="https://static.unco.market/legal/UNCO%20Privacy%20Policy.pdf" target="_blank">Privacy Policy</a>
            <a href="https://static.unco.market/legal/UNCO%20Terms%20and%20Conditions.pdf" target="_blank">Terms and conditions</a>
          `,
        },
        preferencesModal: {
          title: 'Cookie preferences',
          acceptAllBtn: 'Accept all',
          acceptNecessaryBtn: 'Reject all',
          savePreferencesBtn: 'Save preferences',
          closeIconLabel: 'Close',
          sections: [
            {
              title: 'Cookie Usage',
              description:
                "Cookies are small text files that can be used by websites to make a user's experience more efficient.\n\nThe law states that we can store cookies on your device if they are strictly necessary for the operation of this site. For all other types of cookies we need your permission.\n\nThis site uses different types of cookies. Some cookies are placed by third party services that appear on our pages.\n\nYou can at any time change or withdraw your consent from the Cookie Declaration on our website.",
            },
            {
              title: 'Strictly Necessary Cookies <span class="pm__badge">Always Enabled</span>',
              description:
                'Necessary cookies help make a website usable by enabling basic functions like page navigation and access to secure areas of the website. The website cannot function properly without these cookies.',
              linkedCategory: 'necessary',
            },
            {
              title: 'Functionality Cookies',
              description:
                'Functionality cookies enable a website to remember information that changes the way the website behaves or looks, like your preferred language or the region that you are in.',
              linkedCategory: 'functionality',
            },
            {
              title: 'Analytics Cookies',
              description:
                'Analytics cookies help website owners to understand how visitors interact with websites by collecting and reporting information anonymously.',
              linkedCategory: 'analytics',
            },
            {
              title: 'Marketing Cookies',
              description:
                'Marketing cookies are used to track visitors across websites. The intention is to display ads that are relevant and engaging for the individual user and thereby more valuable for publishers and third party advertisers.',
              linkedCategory: 'marketing',
            },
            {
              title: 'More information',
              description:
                'For any query in relation to my policy on cookies and your choices, please <a class="cc__link" href="mailto:cvo@unco.club">contact me</a>.',
            },
          ],
        },
      },
    },
  },
};

export default pluginConfig;
