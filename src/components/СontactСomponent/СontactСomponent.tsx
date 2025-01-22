'use client'

import React, { useState } from "react";
import styles from "./СontactСomponent.module.scss";
import ModalComponent from "../ModalСomponent/ModalСomponent";
import ContactForm from "../ContactForm/ContactForm";

const Contact_Component: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [name, setName] = useState('');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
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
                <h1 className={styles.title}>
                    Please feel free to contact us with any questions
                </h1>
                <p className={styles.subtitle}>
                    Write your request, a convenient way of communication and we will answer you
                </p>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <input
                        type="text"
                        className={styles.input}
                        placeholder="Enter your name"
                        required
                        onChange={handleChange}
                        value={name}
                    />
                    <button onClick={handleOpenModal} className={styles.button}>
                        CONTACT US
                    </button>
                </form>

                <ModalComponent isOpen={isModalOpen} onRequestClose={handleCloseModal}>
                    <ContactForm name={name} onClose={handleCloseModal} />
                </ ModalComponent>
            </div>
        </main>
    );
};

export default Contact_Component;
