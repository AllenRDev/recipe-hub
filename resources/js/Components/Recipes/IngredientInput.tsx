import TextInput from '@/Components/TextInput';

interface IngredientInputProps {
    amount: string;
    name: string;
    onAmountChange: (value: string) => void;
    onNameChange: (value: string) => void;
    onRemove: () => void;
    canRemove: boolean;
}

export default function IngredientInput({
    amount,
    name,
    onAmountChange,
    onNameChange,
    onRemove,
    canRemove,
}: IngredientInputProps) {
    return (
        <div className="flex flex-col gap-3 sm:flex-row">
            <TextInput
                type="text"
                value={amount}
                onChange={(e) => onAmountChange(e.target.value)}
                placeholder="Amount"
                className="sm:w-1/3"
            />

            <TextInput
                type="text"
                value={name}
                onChange={(e) => onNameChange(e.target.value)}
                placeholder="Ingredient"
                className="flex-1"
            />

            <button
                type="button"
                onClick={onRemove}
                disabled={!canRemove}
                className="
                    rounded-xl
                    border
                    border-stone-200
                    px-4
                    py-2
                    text-sm
                    font-medium
                    text-red-600
                    transition
                    hover:bg-red-50
                    disabled:cursor-not-allowed
                    disabled:opacity-40
                    dark:border-slate-600
                    dark:text-red-400
                    dark:hover:bg-red-500/10
                "
            >
                Remove
            </button>
        </div>
    );
}