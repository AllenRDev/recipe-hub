import { router } from '@inertiajs/react';

interface Props {
    currentPage: number;
    lastPage: number;
    prevUrl: string | null;
    nextUrl: string | null;
}

export default function Pagination({
    currentPage,
    lastPage,
    prevUrl,
    nextUrl,
}: Props) {
    if (lastPage <= 1) {
        return null;
    }

    const navigate = (url: string | null) => {
        if (!url) {
            return;
        }

        router.get(
            url,
            {},
            {
                preserveScroll: true,
                preserveState: true,
            }
        );
    };

    return (
        <div className="mt-10 flex items-center justify-center gap-2">
            <button
                type="button"
                onClick={() => navigate(prevUrl)}
                disabled={!prevUrl}
                className="rounded-lg border border-stone-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:hover:bg-slate-700"
            >
                Previous
            </button>

            <span className="px-4 text-sm text-slate-600 dark:text-slate-300">
                Page {currentPage} of {lastPage}
            </span>

            <button
                type="button"
                onClick={() => navigate(nextUrl)}
                disabled={!nextUrl}
                className="rounded-lg border border-stone-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:hover:bg-slate-700"
            >
                Next
            </button>
        </div>
    );
}
