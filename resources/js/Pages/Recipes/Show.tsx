import GuestLayout from '@/Layouts/GuestLayout';
import { Link, usePage } from '@inertiajs/react';
import useAuth from '@/hooks/useAuth';

const ingredients = [
    '12 oz pasta',
    '3 cloves garlic',
    '1 cup heavy cream',
    '1/2 cup parmesan cheese',
];

const steps = [
    'Boil pasta until al dente.',
    'Cook garlic in butter until fragrant.',
    'Add cream and parmesan to create sauce.',
    'Combine pasta and sauce before serving.',
];

const comments = [
    {
        user: 'Mike',
        message: 'This recipe was fantastic!',
    },
    {
        user: 'Emma',
        message: 'Added some mushrooms and it was great.',
    },
];

export default function Show() {
    const { user, isAuthenticated } = useAuth();
    return (
        <GuestLayout>
            <main className="bg-stone-50 py-16 dark:bg-slate-950">
                <div className="mx-auto max-w-5xl px-6">
                    <div className="mb-6">
                        <Link
                            href="/recipes"
                            className="inline-flex items-center gap-2 rounded-full border border-stone-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:-translate-x-1 hover:border-orange-300 dark:border-slate-700 dark:bg-slate-800 dark:text-white hover:dark:border-slate-500"
                        >
                            ← Back to Recipes
                        </Link>
                    </div>

                    {/* Header Card */}
                    <section className="overflow-hidden rounded-3xl border border-stone-200 bg-white shadow-md dark:border-slate-700 dark:bg-slate-800">
                        {/* Image */}
                        <div className="flex aspect-video items-center justify-center bg-orange-100 text-7xl dark:bg-orange-500/10">
                            🍝
                        </div>

                        <div className="p-8">
                            <span className="text-sm font-medium text-orange-500">
                                Dinner
                            </span>

                            <h1 className="mt-3 text-4xl font-bold text-slate-900 dark:text-white">
                                Creamy Garlic Pasta
                            </h1>

                            <div className="mt-5 flex flex-wrap gap-5 text-sm text-slate-600 dark:text-slate-300">
                                <span>👤 Sarah Johnson</span>

                                <span>⭐ 4.9</span>

                                <span>💬 124 comments</span>
                            </div>
                        </div>
                    </section>

                    {/* Content */}
                    <div className="mt-10 grid gap-8 md:grid-cols-3">
                        {/* Ingredients */}
                        <section className="rounded-3xl border bg-white p-6 dark:border-slate-700 dark:bg-slate-800">
                            <h2 className="text-2xl font-bold dark:text-white">
                                Ingredients
                            </h2>

                            <ul className="mt-5 space-y-3 text-slate-600 dark:text-slate-300">
                                {ingredients.map((item) => (
                                    <li key={item}>• {item}</li>
                                ))}
                            </ul>
                        </section>

                        {/* Instructions */}
                        <section className="rounded-3xl border bg-white p-6 md:col-span-2 dark:border-slate-700 dark:bg-slate-800">
                            <h2 className="text-2xl font-bold dark:text-white">
                                Instructions
                            </h2>

                            <ol className="mt-5 space-y-5 text-slate-600 dark:text-slate-300">
                                {steps.map((step, index) => (
                                    <li key={step}>
                                        <span className="font-bold text-orange-500">
                                            {index + 1}.
                                        </span>{' '}
                                        {step}
                                    </li>
                                ))}
                            </ol>
                        </section>
                    </div>

                    {/* Comments */}
                    <section className="mt-10 rounded-3xl border bg-white p-8 dark:border-slate-700 dark:bg-slate-800">
                        <h2 className="text-2xl font-bold dark:text-white">
                            Comments
                        </h2>

                        {isAuthenticated ? (
                            <>
                                <textarea
                                    placeholder="Share your thoughts..."
                                    className="mt-5 w-full rounded-xl border p-4 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                                />

                                <button className="mt-3 rounded-lg bg-orange-500 px-5 py-2 font-medium text-white hover:bg-orange-600">
                                    Post Comment
                                </button>
                            </>
                        ) : (
                            <div>
                                <Link
                                    href="/login"
                                    className="mt-3 inline-block rounded-lg bg-orange-500 px-5 py-2 text-sm font-medium text-white hover:bg-orange-600"
                                >
                                    Login to join the conversation
                                </Link>
                            </div>
                        )}

                        <div className="mt-8 space-y-5">
                            {comments.map((comment) => (
                                <div
                                    key={comment.user}
                                    className="border-t pt-5 dark:border-slate-700"
                                >
                                    <p className="font-semibold dark:text-white">
                                        {comment.user}
                                    </p>

                                    <p className="mt-1 text-slate-600 dark:text-slate-300">
                                        {comment.message}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            </main>
        </GuestLayout>
    );
}
