import { ButtonHTMLAttributes } from 'react';

export default function PrimaryButton({
    className = '',
    disabled,
    children,
    ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
    return (
        <button
            {...props}
            className="w-full justify-center rounded-xl bg-orange-500 py-3 text-white transition hover:bg-orange-600"
            disabled={disabled}
        >
            {children}
        </button>
    );
}
