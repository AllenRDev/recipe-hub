import Navbar from '@/Components/Layout/Navbar';
import Footer from '@/Components/Layout/Footer';

interface Props {
    children: React.ReactNode;
}

export default function GuestLayout({ children }: Props) {
    return (
        <div className="min-h-screen border-gray-200 bg-white dark:border-slate-700 dark:bg-slate-900">
            <Navbar />

            <main>{children}</main>

            <Footer />
        </div>
    );
}
