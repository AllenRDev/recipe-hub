import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { PageProps } from '@/types';
import { Transition } from '@headlessui/react';
import { Link, useForm, usePage } from '@inertiajs/react';
import { FormEventHandler, useState } from 'react';

export default function UpdateProfileInformationForm({
    mustVerifyEmail,
    status,
    className = '',
}: {
    mustVerifyEmail: boolean;
    status?: string;
    className?: string;
}) {
    const user = usePage<PageProps>().props.auth.user;

    // Local state for image preview before upload
    const [previewUrl, setPreviewUrl] = useState<string | null>(user.profile_url ?? null);

    const { data, setData, patch, post, errors, processing, recentlySuccessful, progress } =
        useForm({
        _method: 'patch', 
        name: user.name,
        email: user.email,
        bio: user.bio ?? '',
        profile_image: null as File | null,
        });

const submit: FormEventHandler = (e) => {
    e.preventDefault();

    post(route('profile.update'), {
        preserveScroll: true,
    });
};

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setData('profile_image', file);

            // Create a temporary URL for the preview
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                    Profile Information
                </h2>

                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    Update your account's profile photo, name, bio, and email.
                </p>
            </header>

            <form onSubmit={submit} className="mt-6 space-y-6">
                {/* Styled Profile Photo Upload Zone */}
                <div className="flex items-start gap-6 bg-stone-100 dark:bg-slate-800/50 p-6 rounded-xl border-2 border-dashed border-stone-200 dark:border-slate-700">
                    
                    {/* Preview Circle */}
                    <div className="shrink-0">
                        {previewUrl ? (
                            <img 
                                src={previewUrl} 
                                alt={user.name} 
                                className="h-20 w-20 rounded-full object-cover border-2 border-stone-300 dark:border-slate-600 shadow-inner"
                            />
                        ) : (
                            <div className="h-20 w-20 rounded-full bg-stone-200 dark:bg-slate-700 flex items-center justify-center border-2 border-stone-300 dark:border-slate-600">
                                <svg className="h-10 w-10 text-stone-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                            </div>
                        )}
                    </div>

                    {/* Upload Controls */}
                    <div className="flex-1 space-y-2">
                        <InputLabel htmlFor="profile" value="Profile Photo" className="mb-0" />
                        
                        <p className="text-xs text-stone-600 dark:text-gray-400">
                            JPG, PNG, WEBP. Max 2MB.
                        </p>

                        <div className="flex items-center gap-3 mt-2">
                            {/* Hidden actual file input */}
                            <input
                                id="profile"
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                                className="sr-only" // screen reader only (hidden)
                            />

                            {/* Styled 'Choose File' Button */}
                            <label 
                                htmlFor="profile" 
                                className="inline-flex cursor-pointer items-center rounded-lg bg-white dark:bg-slate-700 px-4 py-2 text-sm font-semibold text-gray-900 dark:text-gray-100 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-slate-600 hover:bg-gray-50 dark:hover:bg-slate-600"
                            >
                                <svg className="-ml-1 mr-2 h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                                </svg>
                                Change Photo
                            </label>

                            {data.profile_image && (
                                <p className="text-xs text-stone-500 truncate max-w-[150px]">
                                    {data.profile_image.name}
                                </p>
                            )}
                        </div>

                        <InputError className="mt-2" message={errors.profile_image} />
                        
                        {/* Optional Upload Progress Bar */}
                        {progress && (
                            <progress value={progress.percentage} max="100" className="mt-2 w-full h-1 rounded overflow-hidden [&::-webkit-progress-bar]:bg-gray-200 [&::-webkit-progress-value]:bg-indigo-600 [&::-moz-progress-bar]:bg-indigo-600">
                                {progress.percentage}%
                            </progress>
                        )}
                    </div>
                </div>

                {/* --- Rest of the form remains essentially the same --- */}

                {/* Name */}
                <div>
                    <InputLabel htmlFor="name" value="Name" />
                    <TextInput
                        id="name"
                        className="mt-1 block w-full"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        required
                        autoComplete="name"
                    />
                    <InputError className="mt-2" message={errors.name} />
                </div>

                {/* Email */}
                <div>
                    <InputLabel htmlFor="email" value="Email" />
                    <TextInput
                        id="email"
                        type="email"
                        className="mt-1 block w-full"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        required
                        autoComplete="username"
                    />
                    <InputError className="mt-2" message={errors.email} />
                </div>

                {/* Bio Field */}
                <div>
                    <InputLabel htmlFor="bio" value="Bio" />
                    <textarea
                        id="bio"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm dark:border-slate-600 dark:bg-slate-900"
                        rows={4}
                        value={data.bio}
                        onChange={(e) => setData('bio', e.target.value)}
                        placeholder="Tell us about yourself..."
                    />
                    <InputError className="mt-2" message={errors.bio} />
                </div>

                {mustVerifyEmail && user.email_verified_at === null && (
                    <div>
                        <p className="mt-2 text-sm text-gray-800 dark:text-gray-200">
                            Your email address is unverified.
                            <Link
                                href={route('verification.send')}
                                method="post"
                                as="button"
                                className="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:text-gray-400 dark:hover:text-gray-100 dark:focus:ring-offset-gray-800"
                            >
                                Click here to re-send the verification email.
                            </Link>
                        </p>

                        {status === 'verification-link-sent' && (
                            <div className="mt-2 text-sm font-medium text-green-600 dark:text-green-400">
                                A new verification link has been sent to your
                                email address.
                            </div>
                        )}
                    </div>
                )}

                <div className="flex items-center gap-4">
                    <PrimaryButton disabled={processing}>Save Changes</PrimaryButton>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            Saved.
                        </p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}