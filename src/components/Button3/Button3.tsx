import styles from "./Button3.module.scss";
import React from "react";

type Props = {
    text: string;
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    className?: string;
    type?: "button" | "submit";
    disabled?: boolean;
    children?: React.ReactNode;
};

const Button3: React.FC<Props> = ({ text, onClick, className, type = "button", disabled = false, children }) => {
    return (
        <button
            className={`${styles.button} ${className}`}
            type={type}
            onClick={onClick}
            disabled={disabled}
        >
            {text || children}
        </button>
    );
};

export default Button3;