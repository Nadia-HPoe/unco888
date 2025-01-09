"use client";
import Button from "../Button/Button";
import styles from "./contactForm.module.scss";
import { useTranslations } from "next-intl";
import { ChangeEvent, useState } from "react";

const ContactForm = () => {
    const t = useTranslations('contactForm');

    const [isAgreed, setIsAgreed] = useState<boolean>(false);
    const [visibleWindow, setIsVisibleWindow] = useState<boolean>(true);

    const handleClickClose = () => {
        setIsVisibleWindow(false);
    }

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setIsAgreed(event.target.checked);
    };

    if (!visibleWindow) return null;

    return (
        <form className={styles.main_container_contact_form}>
            <div className={styles.wrapper_contact_form}>
                <button className={styles.close} onClick={handleClickClose} />
                <div className={styles.container_contact_form}>
                    <div className={styles.container_name}>
                        <p className={styles.container_text}>{t('labelName')}</p>
                        <input placeholder={t('placeholderName')} type='text' className={styles.name} />
                    </div>

                    <div className={styles.container_message}>
                        <p className={styles.container_text}>{t('labelMessage')}</p>
                        <textarea placeholder={t('placeholderMessage')} className={styles.message} />
                    </div>
                    <div className={styles.btn}>
                        <Button
                            text={t('btnText')}
                            link=''
                        />
                    </div>

                    <div className={styles.container_agree}>
                        <input
                            id="agree"
                            className={styles.agree}
                            checked={isAgreed}
                            onChange={handleChange}
                            type="checkbox"
                        />
                        <label className={styles.text_label} htmlFor="agree">{t('agreeText')}</label>
                    </div>
                </div>
            </div>
        </form>
    )
}

export default ContactForm;
