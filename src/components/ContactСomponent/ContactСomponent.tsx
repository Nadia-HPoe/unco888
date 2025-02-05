"use client";
import Button from "../Button/Button";
import ContactForm from "../ContactForm/ContactForm";
import ModalComponent from "../ModalСomponent/ModalСomponent";
import React, { useMemo, useState } from "react";
import styles from "./ContactСomponent.module.scss";
import { useTranslations } from "next-intl";
import { useWindowSize } from "@/hooks/useWindowSize";

interface Translations {
  contact: (key: string) => string;
  contactForm: (key: string) => string;
}

const Contact_Component: React.FC = () => {
  const t: Translations = {
    contact: useTranslations('contact'),
    contactForm: useTranslations('contactForm'),
  };

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [name, setName] = useState('');
  const [isAgreed, setIsAgreed] = useState<boolean>(false);

  const { width } = useWindowSize();

  const isMobile = useMemo(() => width < 390, [width]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleAgreementChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsAgreed(event.target.checked);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setName('');
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleOpenModal();
  };

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <h1 className={styles.title}>{t.contact('title')}</h1>
        <p className={styles.subtitle}>{t.contact('subtitle')}</p>
        <form className={isMobile ? styles.formMobile : styles.form} onSubmit={handleSubmit}>
          <input
            type='text'
            className={styles.input}
            placeholder={t.contact('placeholderEmail')}
            required
            onChange={handleChange}
            value={name}
          />
          {isMobile && (
            <>
              <textarea
                rows={5}
                className={styles.textarea}
                placeholder={t.contactForm('labelMessage')}
                required
              />

              <Button className={styles.buttonMobile} text={t.contact('btnText')} link='' />

              <label className={styles.container_agree} htmlFor='agree'>
                <input
                  id='agree'
                  className={styles.checkbox_agree}
                  checked={isAgreed}
                  onChange={handleAgreementChange}
                  type='checkbox'
                  required
                />
                <span className={styles.text_agree}>{t.contactForm('agreeText')}</span>
              </label>
            </>
          )}

          {!isMobile && (
            <button onClick={handleOpenModal} className={styles.button}>
              {t.contactForm('btnText')}
            </button>
          )}
        </form>

        <ModalComponent isOpen={isModalOpen} onRequestClose={handleCloseModal}>
          <ContactForm name={name} onClose={handleCloseModal} />
        </ModalComponent>
      </div>
    </main>
  );
};

export default Contact_Component;
