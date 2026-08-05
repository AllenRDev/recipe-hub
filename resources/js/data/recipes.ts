export interface Recipe {
    id: number;
    title: string;
    author: string;
    rating: number;
    comments: number;
    category: string;
    image?: string;
}

export const categories = ['All', 'Breakfast', 'Lunch', 'Dinner', 'Dessert'];

export const recipes: Recipe[] = [
    {
        id: 1,
        title: 'Creamy Garlic Pasta',
        author: 'Sarah Johnson',
        rating: 4.9,
        comments: 124,
        category: 'Dinner',
    },
    {
        id: 2,
        title: 'Classic Pancakes',
        author: 'Mike Williams',
        rating: 4.8,
        comments: 86,
        category: 'Breakfast',
    },
    {
        id: 3,
        title: 'Chocolate Brownies',
        author: 'Emma Davis',
        rating: 5,
        comments: 203,
        category: 'Dessert',
    },
];
