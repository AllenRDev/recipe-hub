import GuestLayout from '@/Layouts/GuestLayout';
import Hero from '@/Components/Landing/Hero';
import FeaturedRecipes from '@/Components/Landing/FeaturedRecipes';
import HowItWorks from '@/Components/Landing/HowItWorks';
import { Recipe } from '@/types/recipe';

interface Props {
    featuredRecipes: Recipe[];
}

export default function Home({ featuredRecipes }: Props) {
    console.log('Featured Recipes:', featuredRecipes); // Debugging line to check the data
    return (
        <GuestLayout>
            <Hero />
            <FeaturedRecipes recipes={featuredRecipes} />
            <HowItWorks />
        </GuestLayout>
    );
}
