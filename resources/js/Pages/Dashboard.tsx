import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { Recipe } from '@/types/recipes';
import { User } from '@/types'; 

interface Props {
    user: {
        id: number;
        name: string;
        email: string;
        bio: string | null;
        profile_image: string | null;
    };
    recipes: Recipe[];
}

export default function Dashboard({ user, recipes }: Props) {
    return (
        <AuthenticatedLayout>
            <Head title="Account" />

            <main className="bg-stone-50 py-12 dark:bg-slate-950">
                <div className="mx-auto max-w-6xl px-6">
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
                        Your Account
                    </h1>

                    <p className="mt-2 mb-4 text-slate-600 dark:text-slate-300">
                        Manage your profile, recipes, ratings, and activity.
                    </p>

                   <section className="rounded-3xl border border-stone-200 bg-white p-8 shadow-sm dark:border-slate-700 dark:bg-slate-800">
    <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-5">
            {/* Profile Picture */}
            <div className="flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-full bg-orange-100 text-3xl font-bold text-orange-600 dark:bg-orange-500/10 dark:text-orange-400">
                {user.profile_image ? (
                    <img
                        src={user.profile_image}
                        alt={user.name}
                        className="h-full w-full object-cover"
                    />
                ) : (
                    user.name.charAt(0).toUpperCase()
                )}
            </div>

            {/* User Info */}
            <div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                    {user.name}
                </h2>

                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                    {user.email}
                </p>

                <p className="mt-3 max-w-xl text-slate-600 dark:text-slate-300">
                    {user.bio || 'No bio added yet.'}
                </p>
            </div>
        </div>

        {/* Edit Profile */}
        <Link
    href={route('profile.edit')}
    className="inline-flex items-center justify-center rounded-xl border border-stone-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-stone-100 dark:border-slate-600 dark:text-slate-200 dark:hover:bg-slate-700"
>
    Edit Profile
</Link>
    </div>
</section>
                </div>
            </main>
        </AuthenticatedLayout>
    );
}