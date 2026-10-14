import useAuth from '@/hooks/useAuth';
import { Link, usePage } from '@inertiajs/react';

export default function VerifyEmailBanner() {
    const { user } = useAuth();
    const { component } = usePage();

    if (!user || user.email_verified_at !== null) {
        return null;
    }

    if (component === 'Auth/VerifyEmail') {
        return null;
    }

    return (
        <div className="border-b border-orange-200 bg-orange-50 dark:border-orange-900/40 dark:bg-orange-900/20">
            <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-2 gap-y-1 px-6 py-2 text-center text-sm text-orange-800 dark:text-orange-200">
                <span aria-hidden="true">📧</span>
                <span>
                    Please verify your email address to post recipes, rate and
                    comment.
                </span>
                <Link
                    href={route('verification.notice')}
                    className="font-semibold underline hover:text-orange-900 dark:hover:text-white"
                >
                    Verify now
                </Link>
            </div>
        </div>
    );
}
