import {
    forwardRef,
    InputHTMLAttributes,
    useEffect,
    useImperativeHandle,
    useRef,
} from 'react';

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
    isFocused?: boolean;
    hasError?: boolean;
}

export default forwardRef(function TextInput(
    {
        type = 'text',
        className = '',
        isFocused = false,
        hasError = false,
        ...props
    }: TextInputProps,
    ref
) {
    const localRef = useRef<HTMLInputElement>(null);

    useImperativeHandle(ref, () => ({
        focus: () => localRef.current?.focus(),
    }));

    useEffect(() => {
        if (isFocused) {
            localRef.current?.focus();
        }
    }, [isFocused]);

    const baseClasses =
        'mt-2 block w-full rounded-xl border bg-stone-50 px-4 py-3 text-slate-900 shadow-sm focus:ring-orange-500 dark:bg-slate-900 dark:text-white';

    const normalClasses =
        'border-stone-300 focus:border-orange-500 dark:border-slate-600';

    const errorClasses =
        'border-red-500 focus:border-red-500 dark:border-red-500';

    return (
        <input
            {...props}
            type={type}
            className={`${baseClasses} ${
                hasError ? errorClasses : normalClasses
            } ${className}`}
            ref={localRef}
        />
    );
});
