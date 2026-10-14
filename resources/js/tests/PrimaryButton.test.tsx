import PrimaryButton from '@/Components/PrimaryButton';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

describe('PrimaryButton', () => {
    it('renders its children', () => {
        render(<PrimaryButton>Save</PrimaryButton>);

        expect(
            screen.getByRole('button', { name: 'Save' }),
        ).toBeInTheDocument();
    });

    it('merges a custom className with the default styles', () => {
        render(<PrimaryButton className="my-custom-class">Save</PrimaryButton>);

        const button = screen.getByRole('button', { name: 'Save' });

        expect(button).toHaveClass('my-custom-class');
        expect(button).toHaveClass('bg-orange-500');
    });

    it('can be disabled', () => {
        render(<PrimaryButton disabled>Save</PrimaryButton>);

        expect(screen.getByRole('button', { name: 'Save' })).toBeDisabled();
    });
});
