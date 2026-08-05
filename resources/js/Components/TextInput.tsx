import {
    forwardRef,
    InputHTMLAttributes,
    useEffect,
    useImperativeHandle,
    useRef,
} from 'react';

export default forwardRef(function TextInput(
    {
        type = 'text',
        className = '',
        isFocused = false,
        ...props
    }: InputHTMLAttributes<HTMLInputElement> & { isFocused?: boolean },
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

    return (
        <input
            {...props}
            type={type}
            className={
                'mt-2 block w-full rounded-xl border border-stone-300 bg-stone-50 px-4 py-3 text-slate-900 shadow-sm focus:border-orange-500 focus:ring-orange-500 dark:border-slate-600 dark:bg-slate-900 dark:text-white ' +
                className
            }
            ref={localRef}
        />
    );
});
