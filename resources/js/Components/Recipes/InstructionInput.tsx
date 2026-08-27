interface InstructionInputProps {
    step: number;
    instruction: string;
    onChange: (value: string) => void;
    onRemove: () => void;
    canRemove: boolean;
    hasError?: boolean;
}

export default function InstructionInput({
    step,
    instruction,
    onChange,
    onRemove,
    canRemove,
    hasError = false,
}: InstructionInputProps) {
    return (
        <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-orange-100 font-semibold text-orange-600 dark:bg-orange-900/30 dark:text-orange-400">
                {step}
            </div>

            <div className="flex-1">
                <textarea
                    value={instruction}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder={`Step ${step}`}
                    rows={3}
                    className={`block w-full rounded-xl border px-4 py-3 text-slate-900 shadow-sm transition outline-none placeholder:text-slate-400 focus:ring-orange-500 dark:bg-slate-900 dark:text-white dark:placeholder:text-slate-500 ${
                        hasError
                            ? 'border-red-500 focus:border-red-500 dark:border-red-500'
                            : 'border-stone-300 bg-stone-50 dark:border-slate-600'
                    }`}
                />
            </div>

            {canRemove && (
                <button
                    type="button"
                    onClick={onRemove}
                    className="mt-2 rounded-lg p-3 text-slate-400 transition hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-950/30"
                    aria-label={`Remove step ${step}`}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="h-5 w-5"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                </button>
            )}
        </div>
    );
}
