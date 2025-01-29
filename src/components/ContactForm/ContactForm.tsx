"use client";
import { name } from "eslint-plugin-prettier/recommended";
import Button from "../Button/Button";
import styles from "./contactForm.module.scss";
import { useTranslations } from "next-intl";
import { ChangeEvent, useState } from "react";

type ContactFormProps = {
    onClose: () => void; 
    name?: string;
};

const ContactForm: React.FC<ContactFormProps> = ({ onClose, name }) => {
    const t = useTranslations('contactForm');
    const [isAgreed, setIsAgreed] = useState<boolean>(false);

    const handleCloseClick = (e: React.MouseEvent) => {
        e.preventDefault(); 
        onClose();
    };

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setIsAgreed(event.target.checked);
    };

    return (
        <form className={styles.main_container_contact_form}>
            <div className={styles.wrapper_contact_form}>
                <button className={styles.close} onClick={handleCloseClick} />
                <div className={styles.container_contact_form}>
                    <div className={styles.container_name}>
                        <p className={styles.container_text}>{t('labelName')}</p>
                        <input placeholder={t('placeholderName')} type='text' className={styles.name} defaultValue={name}/>

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
