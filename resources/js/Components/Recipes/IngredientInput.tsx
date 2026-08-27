import TextInput from '@/Components/TextInput';

interface IngredientInputProps {
    amount: string;
    name: string;
    onAmountChange: (value: string) => void;
    onNameChange: (value: string) => void;
    onRemove: () => void;
    canRemove: boolean;
    hasAmountError?: boolean;
    hasNameError?: boolean;
}

export default function IngredientInput({
    amount,
    name,
    onAmountChange,
    onNameChange,
    onRemove,
    canRemove,
    hasAmountError = false,
    hasNameError = false,
}: IngredientInputProps) {
    return (
        <div className="flex items-start gap-3">
            <div className="w-1/3">
                <TextInput
                    type="text"
                    value={amount}
                    onChange={(e) => onAmountChange(e.target.value)}
                    placeholder="Amount"
                    hasError={hasAmountError}
                />
            </div>

            <div className="flex-1">
                <TextInput
                    type="text"
                    value={name}
                    onChange={(e) => onNameChange(e.target.value)}
                    placeholder="Ingredient"
                    hasError={hasNameError}
                />
            </div>

            {canRemove && (
                <button
                    type="button"
                    onClick={onRemove}
                    className="mt-2 rounded-lg p-3 text-slate-400 transition hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-950/30"
                >
                    Remove
                </button>
            )}
        </div>
    );
}
