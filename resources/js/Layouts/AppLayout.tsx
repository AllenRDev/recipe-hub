import Footer from '@/Components/Layout/Footer';
import Navbar from '@/Components/Layout/Navbar';
import VerifyEmailBanner from '@/Components/VerifyEmailBanner';

interface Props {
    children: React.ReactNode;
}

export default function AppLayout({ children }: Props) {
    return (
        <div className="min-h-screen bg-stone-50 dark:bg-slate-950">
            <Navbar />

            <VerifyEmailBanner />

            <main>{children}</main>

            <Footer />
        </div>
    );
}
