import Navbar from '@/Components/Layout/Navbar';
import Footer from '@/Components/Layout/Footer';

interface Props {
    children: React.ReactNode;
}

export default function AuthenticatedLayout({ children }: Props) {
    return (
        <div className="min-h-screen bg-stone-50">
            <Navbar />

            <main>{children}</main>

            <Footer />
        </div>
    );
}
