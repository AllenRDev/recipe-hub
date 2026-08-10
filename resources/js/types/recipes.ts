export interface Ingredient {
    amount: string;
    name: string;
}

export interface Instruction {
    step: string;
}

export interface RecipeUser {
    id: number;
    name: string;
}

export interface Recipe {
    id: number;
    title: string;
    description: string;
    category: string;
    prep_time: number | null;
    cook_time: number | null;
    servings: number | null;
    image: string | null;
    ingredients: Ingredient[];
    instructions: Instruction[];
    user: RecipeUser;
    comments_count: number;
    ratings_avg_rating: number | null;
}