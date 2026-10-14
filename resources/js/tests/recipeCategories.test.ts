import { RECIPE_CATEGORIES } from '@/constants/recipeCategories';
import { describe, expect, it } from 'vitest';

describe('RECIPE_CATEGORIES', () => {
    it('includes the core meal categories', () => {
        expect(RECIPE_CATEGORIES).toEqual(
            expect.arrayContaining([
                'Breakfast',
                'Lunch',
                'Dinner',
                'Dessert',
            ]),
        );
    });

    it('contains no duplicates', () => {
        expect(new Set(RECIPE_CATEGORIES).size).toBe(RECIPE_CATEGORIES.length);
    });
});
