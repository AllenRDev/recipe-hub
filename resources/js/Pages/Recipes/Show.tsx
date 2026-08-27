import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, router } from '@inertiajs/react';
import { FormEvent, useState } from 'react';
import useAuth from '@/hooks/useAuth';
import { Recipe } from '@/types/recipes';

interface Props {
    recipe: Recipe;
    userRating: number | null;
    isFavorited: boolean;
}

export default function Show({ recipe, userRating, isFavorited }: Props) {
    const { user, isAuthenticated } = useAuth();

    const [rating, setRating] = useState(userRating ?? 0);
    const [hoverRating, setHoverRating] = useState(0);
    const [comment, setComment] = useState('');
    const [commentSubmitting, setCommentSubmitting] = useState(false);

    const submitComment = (event: FormEvent) => {
        event.preventDefault();

        if (!comment.trim()) {
            return;
        }

        setCommentSubmitting(true);

        router.post(
            route('recipes.comments.store', recipe.id),
            {
                body: comment,
            },
            {
                preserveScroll: true,
                onSuccess: () => {
                    setComment('');
                },
                onFinish: () => {
                    setCommentSubmitting(false);
                },
            }
        );
    };

    const submitRating = (value: number) => {
        setRating(value);

        router.post(
            route('recipes.rating.store', recipe.id),
            {
                rating: value,
            },
            {
                preserveScroll: true,
            }
        );
    };

    return (
        <GuestLayout>
            <Head title={recipe.title} />

            <main className="bg-stone-50 py-12 dark:bg-slate-950">
                <div className="mx-auto max-w-5xl px-6">
                    {/* Back Button */}
                    <Link
                        href={route('recipes.index')}
                        className="mb-6 inline-flex items-center text-sm font-medium text-slate-600 transition hover:text-orange-500 dark:text-slate-300 dark:hover:text-orange-400"
                    >
                        ← Back to Recipes
                    </Link>

                    {/* Header Card */}
                    <section className="overflow-hidden rounded-3xl border border-stone-200 bg-white shadow-md dark:border-slate-700 dark:bg-slate-800">
                        {/* Image */}
                        <div className="flex aspect-video items-center justify-center overflow-hidden bg-orange-100 text-7xl dark:bg-orange-500/10">
                            {recipe.image ? (
                                <img
                                    src={`/storage/${recipe.image}`}
                                    alt={recipe.title}
                                    className="h-full w-full object-cover"
                                />
                            ) : (
                                <span>🍝</span>
                            )}
                        </div>

                        <div className="p-8">
                            <span className="text-sm font-medium text-orange-500">
                                {recipe.category}
                            </span>

                            <h1 className="mt-3 text-4xl font-bold text-slate-900 dark:text-white">
                                {recipe.title}
                            </h1>

                            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                                By{': '}
                                <Link
                                    href={route('users.show', recipe.user.id)}
                                    className="font-medium text-orange-500 hover:text-orange-600 dark:text-orange-400 dark:hover:text-orange-300"
                                >
                                    {recipe.user.name}
                                </Link>
                            </p>
                            {isFavorited ? (
                                <button
                                    type="button"
                                    onClick={() =>
                                        router.delete(
                                            route(
                                                'recipes.unfavorite',
                                                recipe.id
                                            )
                                        )
                                    }
                                    className="mt-4 rounded-xl border border-orange-500 px-4 py-2 font-medium text-orange-500 transition hover:bg-orange-50 dark:hover:bg-orange-950"
                                >
                                    ♥ Saved
                                </button>
                            ) : (
                                <button
                                    type="button"
                                    onClick={() =>
                                        router.post(
                                            route('recipes.favorite', recipe.id)
                                        )
                                    }
                                    className="mt-4 rounded-xl bg-orange-500 px-4 py-2 font-medium text-white transition hover:bg-orange-600"
                                >
                                    ♡ Save
                                </button>
                            )}

                            {user && user.id === recipe.user.id && (
                                <div className="mt-5 flex gap-3">
                                    <Link
                                        href={route('recipes.edit', recipe.id)}
                                        className="rounded-lg border border-stone-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-orange-500 hover:text-orange-500 dark:border-slate-600 dark:text-slate-200 dark:hover:border-orange-400 dark:hover:text-orange-400"
                                    >
                                        Edit Recipe
                                    </Link>

                                    <button
                                        type="button"
                                        onClick={() => {
                                            if (
                                                confirm(
                                                    'Are you sure you want to delete this recipe? This cannot be undone.'
                                                )
                                            ) {
                                                router.delete(
                                                    route(
                                                        'recipes.destroy',
                                                        recipe.id
                                                    )
                                                );
                                            }
                                        }}
                                        className="rounded-lg border border-red-200 px-4 py-2 text-sm font-medium text-red-500 transition hover:bg-red-50 dark:border-red-500/50 dark:hover:bg-red-950/30"
                                    >
                                        Delete Recipe
                                    </button>
                                </div>
                            )}

                            <div className="mt-6">
                                <div className="flex items-center gap-3">
                                    <div className="flex">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <button
                                                key={star}
                                                type="button"
                                                onClick={() => {
                                                    if (isAuthenticated) {
                                                        submitRating(star);
                                                    }
                                                }}
                                                onMouseEnter={() =>
                                                    setHoverRating(star)
                                                }
                                                onMouseLeave={() =>
                                                    setHoverRating(0)
                                                }
                                                className={`text-2xl transition-transform ${
                                                    isAuthenticated
                                                        ? 'hover:scale-110'
                                                        : 'cursor-default'
                                                }`}
                                                aria-label={`Rate ${star} out of 5`}
                                            >
                                                <span
                                                    className={
                                                        star <=
                                                        (hoverRating || rating)
                                                            ? 'text-orange-500'
                                                            : 'text-slate-300 dark:text-slate-600'
                                                    }
                                                >
                                                    ★
                                                </span>
                                            </button>
                                        ))}
                                    </div>

                                    <div className="text-sm text-slate-600 dark:text-slate-300">
                                        <span className="font-semibold">
                                            {Number(
                                                recipe.ratings_avg_rating ?? 0
                                            ).toFixed(1)}
                                        </span>
                                        <span className="mx-1">·</span>
                                        {recipe.ratings_count ?? 0}{' '}
                                        {recipe.ratings_count === 1
                                            ? 'rating'
                                            : 'ratings'}
                                    </div>
                                </div>

                                {isAuthenticated && rating > 0 && (
                                    <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                                        Your rating: {rating}/5
                                    </p>
                                )}

                                {!isAuthenticated && (
                                    <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                                        <Link
                                            href={route('login')}
                                            className="font-medium text-orange-500 hover:text-orange-600"
                                        >
                                            Log in
                                        </Link>{' '}
                                        to rate this recipe.
                                    </p>
                                )}
                            </div>

                            <p className="mt-4 max-w-3xl text-slate-600 dark:text-slate-300">
                                {recipe.description}
                            </p>

                            <div className="mt-5 flex flex-wrap gap-5 text-sm text-slate-600 dark:text-slate-300">
                                {recipe.prep_time !== null && (
                                    <span>
                                        <strong className="text-slate-900 dark:text-white">
                                            Prep:
                                        </strong>{' '}
                                        {recipe.prep_time} min
                                    </span>
                                )}

                                {recipe.cook_time !== null && (
                                    <span>
                                        <strong className="text-slate-900 dark:text-white">
                                            Cook:
                                        </strong>{' '}
                                        {recipe.cook_time} min
                                    </span>
                                )}

                                {recipe.servings !== null && (
                                    <span>
                                        <strong className="text-slate-900 dark:text-white">
                                            Servings:
                                        </strong>{' '}
                                        {recipe.servings}
                                    </span>
                                )}

                                <span>
                                    <strong className="text-slate-900 dark:text-white">
                                        By:
                                    </strong>{' '}
                                    {recipe.user.name}
                                </span>
                            </div>
                        </div>
                    </section>

                    {/* Content */}
                    <div className="mt-10 grid gap-8 md:grid-cols-3">
                        {/* Ingredients */}
                        <section className="rounded-3xl border border-stone-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800">
                            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                                Ingredients
                            </h2>

                            <ul className="mt-5 space-y-3 text-slate-600 dark:text-slate-300">
                                {recipe.ingredients.map(
                                    (
                                        item: { amount: string; name: string },
                                        index: number
                                    ) => (
                                        <li key={index} className="flex gap-2">
                                            <span className="font-medium text-orange-500">
                                                •
                                            </span>

                                            <span>
                                                {item.amount} {item.name}
                                            </span>
                                        </li>
                                    )
                                )}
                            </ul>
                        </section>

                        {/* Instructions */}
                        <section className="rounded-3xl border border-stone-200 bg-white p-6 shadow-sm md:col-span-2 dark:border-slate-700 dark:bg-slate-800">
                            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                                Instructions
                            </h2>

                            <ol className="mt-5 space-y-5 text-slate-600 dark:text-slate-300">
                                {recipe.instructions.map(
                                    (
                                        instruction: { step: string },
                                        index: number
                                    ) => (
                                        <li key={index} className="flex gap-4">
                                            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-orange-100 text-sm font-bold text-orange-600 dark:bg-orange-500/10 dark:text-orange-400">
                                                {index + 1}
                                            </span>

                                            <span className="pt-1">
                                                {instruction.step}
                                            </span>
                                        </li>
                                    )
                                )}
                            </ol>
                        </section>
                    </div>

                    {/* Comments */}
                    <section className="mt-10 rounded-3xl border border-stone-200 bg-white p-8 shadow-sm dark:border-slate-700 dark:bg-slate-800">
                        <div className="flex items-center justify-between">
                            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                                Comments
                            </h2>

                            <span className="text-sm text-slate-500 dark:text-slate-400">
                                {recipe.comments_count ?? 0}{' '}
                                {recipe.comments_count === 1
                                    ? 'comment'
                                    : 'comments'}
                            </span>
                        </div>

                        {isAuthenticated ? (
                            <form onSubmit={submitComment} className="mt-5">
                                <textarea
                                    value={comment}
                                    onChange={(event) =>
                                        setComment(event.target.value)
                                    }
                                    placeholder="Share your thoughts..."
                                    maxLength={1000}
                                    rows={4}
                                    className="w-full rounded-xl border border-stone-300 bg-stone-50 p-4 text-slate-900 transition outline-none placeholder:text-slate-400 focus:border-orange-500 focus:ring-orange-500 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                                />

                                <div className="mt-3 flex items-center justify-between">
                                    <span className="text-xs text-slate-400">
                                        {comment.length}/1000
                                    </span>

                                    <button
                                        type="submit"
                                        disabled={
                                            commentSubmitting || !comment.trim()
                                        }
                                        className="rounded-lg bg-orange-500 px-5 py-2 font-medium text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-50"
                                    >
                                        {commentSubmitting
                                            ? 'Posting...'
                                            : 'Post Comment'}
                                    </button>
                                </div>
                            </form>
                        ) : (
                            <div className="mt-5">
                                <p className="text-sm text-slate-600 dark:text-slate-400">
                                    Log in to leave a comment and join the
                                    conversation.
                                </p>

                                <Link
                                    href={route('login')}
                                    className="mt-3 inline-block rounded-lg bg-orange-500 px-5 py-2 text-sm font-medium text-white transition hover:bg-orange-600"
                                >
                                    Login to Join the Conversation
                                </Link>
                            </div>
                        )}

                        <div className="mt-8 border-t border-stone-200 pt-6 dark:border-slate-700">
                            {recipe.comments && recipe.comments.length > 0 ? (
                                <div className="space-y-6">
                                    {recipe.comments.map((comment) => (
                                        <article
                                            key={comment.id}
                                            className="border-b border-stone-200 pb-6 last:border-b-0 dark:border-slate-700"
                                        >
                                            <div className="flex items-start justify-between gap-4">
                                                <div>
                                                    <p className="font-semibold text-slate-900 dark:text-white">
                                                        {comment.user.name}
                                                    </p>

                                                    <p className="mt-1 text-xs text-slate-400">
                                                        {new Date(
                                                            comment.created_at
                                                        ).toLocaleDateString()}
                                                    </p>
                                                </div>

                                                {user &&
                                                    comment.user.id ===
                                                        user.id && (
                                                        <button
                                                            type="button"
                                                            onClick={() => {
                                                                if (
                                                                    confirm(
                                                                        'Are you sure you want to delete this comment?'
                                                                    )
                                                                ) {
                                                                    router.delete(
                                                                        route(
                                                                            'comments.destroy',
                                                                            comment.id
                                                                        ),
                                                                        {
                                                                            preserveScroll: true,
                                                                        }
                                                                    );
                                                                }
                                                            }}
                                                            className="text-sm text-slate-400 transition hover:text-red-500"
                                                        >
                                                            Delete
                                                        </button>
                                                    )}
                                            </div>

                                            <p className="mt-3 whitespace-pre-wrap text-slate-600 dark:text-slate-300">
                                                {comment.body}
                                            </p>
                                        </article>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-sm text-slate-500 dark:text-slate-400">
                                    No comments yet. Be the first to share your
                                    thoughts!
                                </p>
                            )}
                        </div>
                    </section>
                </div>
            </main>
        </GuestLayout>
    );
}
