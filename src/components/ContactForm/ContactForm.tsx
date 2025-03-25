'use client';
import { sendContactFormData } from '@/app/[locale]/actions';
import Button3 from '../Button3/Button3';
import styles from './contactForm.module.scss';
import { useTranslations } from 'next-intl';
import { ChangeEvent, useState } from 'react';
import { useRecaptcha } from '@/hooks/useRecaptcha';
import ReCAPTCHA from 'react-google-recaptcha';
import { useMediaQuery } from 'react-responsive';
import ModalComponent from '../ModalСomponent/ModalСomponent';

type ContactFormProps = {
  isOpen: boolean;
  onClose: () => void;
  name?: string;
};

interface Translations {
  contact: (key: string) => string;
  contactForm: (key: string) => string;
}

const ContactForm: React.FC<ContactFormProps> = ({ isOpen, onClose, name }) => {
  const t: Translations = {
    contact: useTranslations('contact'),
    contactForm: useTranslations('contactForm'),
  };
  const { recaptchaRef, recaptchaToken, resetRecaptcha, isLoading, setRecaptchaToken } =
    useRecaptcha({
      isOpen,
      onVerify: (token) => {
        console.log('reCAPTCHA verified with token:', token.substring(0, 10) + '...');
      },
    });

  const [isAgreed, setIsAgreed] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  const [nameForm, setNameForm] = useState<string>(name || '');
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1440px)' });
  const [touchedFields, setTouchedFields] = useState({
    name: false,
    message: false,
  });

  const handleCloseClick = () => {
    resetRecaptcha();
    onClose();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!recaptchaToken) {
      console.error('Please complete the reCAPTCHA verification');
      return;
    }

    const response = await sendContactFormData(nameForm, message, recaptchaToken);
    if (response.status === 200) {
      console.log('Данные успешно отправлены');
    } else {
      console.error('Ошибка отправки данных', response.error);
    }

    onClose();
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setIsAgreed(event.target.checked);
  };

  const handleBlur = (fieldName: 'name' | 'message') => {
    setTouchedFields((prev) => ({
      ...prev,
      [fieldName]: true,
    }));
  };

  const isFormValid = message.trim() !== '' && isAgreed && nameForm.trim() !== '' && recaptchaToken;

  return (
    <ModalComponent isOpen={isOpen} onRequestClose={handleCloseClick}>
      <form className={styles.main_container_contact_form} onSubmit={handleSubmit}>
        <div className={styles.wrapper_contact_form}>
          <button className={styles.close} onClick={handleCloseClick} />
          <div className={styles.container_contact_form}>
            <div className={styles.container_name}>
              <p className={styles.container_text}>{t.contactForm('labelName')}</p>
              <input
                placeholder={t.contact('placeholderEmail')}
                type='text'
                className={`${styles.name} ${touchedFields.name && !nameForm ? styles.error : ''}`}
                onChange={(e) => setNameForm(e.target.value)}
                value={nameForm}
                onBlur={() => handleBlur('name')}
                required
              />
            </div>

            <div className={styles.container_message}>
              <p className={styles.container_text}>{t.contactForm('labelMessage')}</p>
              <textarea
                onChange={(e) => setMessage(e.target.value)}
                onBlur={() => handleBlur('message')}
                id='message'
                value={message}
                placeholder={t.contactForm('placeholderMessage')}
                className={styles.message}
              />
            </div>
            <div className={styles.recaptcha_container}>
              {isLoading ? (
                <div className={styles.loading}>Loading reCAPTCHA...</div>
              ) : (
                <ReCAPTCHA
                  ref={recaptchaRef}
                  sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_TOKEN!}
                  theme='dark'
                  size={isTabletOrMobile ? 'compact' : 'normal'}
                  onChange={(token) => setRecaptchaToken(token || '')}
                />
              )}
            </div>
            <div className={styles.btn}>
              <Button3
                className={`${styles.button} ${styles.submit}`}
                type='submit'
                disabled={!isFormValid}
                text={t.contact('btnText')}
              />
            </div>

            <div className={styles.container_agree}>
              <input
                id='agree'
                className={styles.agree}
                checked={isAgreed}
                onChange={handleChange}
                type='checkbox'
                required
              />
              <label className={styles.text_label} htmlFor='agree'>
                {t.contactForm('agreeText')}
              </label>
            </div>
          </div>
        </div>
      </form>
    </ModalComponent>
  );
};

export default ContactForm;
