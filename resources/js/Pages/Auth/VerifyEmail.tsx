import PrimaryButton from '@/Components/PrimaryButton';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

export default function VerifyEmail({ status }: { status?: string }) {
    const { post, processing } = useForm({});

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('verification.send'));
    };

    return (
        <GuestLayout>
            <Head title="Email Verification" />

            <div className="mx-auto my-16 max-w-md rounded-3xl border border-stone-200 bg-white p-8 shadow-lg dark:border-slate-700 dark:bg-slate-800">
                <div className="mb-8 text-center">
                    <div
                        aria-hidden="true"
                        className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-orange-100 text-3xl dark:bg-orange-900/30"
                    >
                        📧
                    </div>

                    <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
                        Verify Your Email
                    </h1>

                    <p className="mt-2 text-slate-600 dark:text-slate-300">
                        Thanks for signing up! Before getting started, please
                        verify your email address by clicking the link we just
                        emailed you.
                    </p>
                </div>

                {status === 'verification-link-sent' && (
                    <div className="mb-4 rounded-lg bg-green-50 p-4 text-sm font-medium text-green-700 dark:bg-green-900/30 dark:text-green-400">
                        A new verification link has been sent to the email
                        address you provided during registration.
                    </div>
                )}

                <form onSubmit={submit}>
                    <PrimaryButton
                        className="w-full justify-center"
                        disabled={processing}
                    >
                        Resend Verification Email
                    </PrimaryButton>
                </form>

                <div className="mt-6 text-center">
                    <p className="text-sm text-slate-600 dark:text-slate-300">
                        Didn't receive the email? Check your spam folder or{' '}
                        <Link
                            href={route('logout')}
                            method="post"
                            as="button"
                            className="font-medium text-orange-500 hover:text-orange-600"
                        >
                            log out
                        </Link>
                        .
                    </p>
                </div>
            </div>
        </GuestLayout>
    );
}
