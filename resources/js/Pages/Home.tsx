import GuestLayout from '@/Layouts/GuestLayout';
import Hero from '@/Components/Landing/Hero';
import FeaturedRecipes from '@/Components/Landing/FeaturedRecipes';
import HowItWorks from '@/Components/Landing/HowItWorks';

export default function Home() {
    return (
        <GuestLayout>
            <Hero />
            <FeaturedRecipes />
            <HowItWorks />
        </GuestLayout>
    );
}
