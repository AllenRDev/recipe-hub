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

export interface Comment {
    id: number;
    body: string;
    user: RecipeUser;
    created_at: string;
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
    ratings_count: number;
    ratings_avg_rating: number | null;
    comments_count?: number;
    comments?: Comment[];
}

export interface PaginatedRecipes {
    data: Recipe[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    from: number | null;
    to: number | null;
    prev_page_url: string | null;
    next_page_url: string | null;
}
