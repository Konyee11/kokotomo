import React from "react";
import "./Button.scss";

type ButtonProps = {
    title: string;
    variant?:
        | "primary"
        | "secondary"
        | "success"
        | "danger"
        | "warning"
        | "info"
        | "light"
        | "dark";
    size?: "small" | "middium" | "large";
    onClick?: () => void;
    type?: "button" | "submit" | "reset";
    form?: string;
    disabled?: boolean;
    children?: React.ReactNode;
};

const Button = ({
    title,
    variant = "primary",
    size = "middium",
    onClick,
    type = "button",
    form,
    disabled,
    children,
}: ButtonProps) => {
    const className = `btn btn--${variant} btn--${size}`;
    return (
        <button
            className={className}
            onClick={onClick}
            type={type}
            form={form}
            disabled={disabled}
        >
            {title}
            {children}
        </button>
    );
};

export default Button;
