interface InstructionInputProps {
    step: number;
    instruction: string;
    onChange: (value: string) => void;
    onRemove: () => void;
    canRemove: boolean;
}

export default function InstructionInput({
    step,
    instruction,
    onChange,
    onRemove,
    canRemove,
}: InstructionInputProps) {
    return (
        <div className="flex items-start gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-orange-100 font-semibold text-orange-600 dark:bg-orange-500/10 dark:text-orange-400">
                {step}
            </div>

            <div className="flex-1">
                <textarea
                    value={instruction}
                    onChange={(e) => onChange(e.target.value)}
                    rows={3}
                    placeholder={`Describe step ${step}...`}
                    className="
                        block
                        w-full
                        rounded-xl
                        border
                        border-stone-300
                        bg-stone-50
                        px-4
                        py-3
                        text-slate-900
                        shadow-sm
                        outline-none
                        transition
                        placeholder:text-slate-400
                        focus:border-orange-500
                        focus:ring-orange-500
                        dark:border-slate-600
                        dark:bg-slate-900
                        dark:text-white
                        dark:placeholder:text-slate-500
                    "
                />
            </div>

            {canRemove && (
                <button
                    type="button"
                    onClick={onRemove}
                    className="
                        mt-2
                        text-sm
                        font-medium
                        text-red-500
                        transition
                        hover:text-red-700
                        dark:text-red-400
                        dark:hover:text-red-300
                    "
                >
                    Remove
                </button>
            )}
        </div>
    );
}
