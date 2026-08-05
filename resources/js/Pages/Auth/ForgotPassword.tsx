import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

export default function ForgotPassword({ status }: { status?: string }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('password.email'));
    };

    return (
        <GuestLayout>
    <Head title="Forgot Password" />

    <div
        className="
            mx-auto
            my-16
            max-w-md
            rounded-3xl
            border
            border-stone-200
            bg-white
            p-8
            shadow-lg

            dark:border-slate-700
            dark:bg-slate-800
        "
    >
        <div className="mb-8 text-center">
            <h1
                className="
                    text-3xl
                    font-bold
                    text-slate-900

                    dark:text-white
                "
            >
                Reset Your Password
            </h1>

            <p
                className="
                    mt-3
                    text-sm
                    text-slate-600

                    dark:text-slate-300
                "
            >
                Forgot your password? Enter your email and we&apos;ll send you a
                link to reset it.
            </p>
        </div>

        {status && (
            <div
                className="
                    mb-4
                    rounded-xl
                    bg-green-50
                    p-3
                    text-sm
                    font-medium
                    text-green-700

                    dark:bg-green-500/10
                    dark:text-green-400
                "
            >
                {status}
            </div>
        )}

        <form onSubmit={submit}>
            <div>
                <InputLabel
                    htmlFor="email"
                    value="Email"
                    className="
                        font-medium
                        text-slate-700

                        dark:text-slate-200
                    "
                />

                <TextInput
                    id="email"
                    type="email"
                    name="email"
                    value={data.email}
                    className="mt-2 block w-full"
                    isFocused={true}
                    onChange={(e) => setData('email', e.target.value)}
                />

                <InputError message={errors.email} className="mt-2" />
            </div>

            <div className="mt-8">
                <PrimaryButton
                    className="w-full justify-center"
                    disabled={processing}
                >
                    Email Password Reset Link
                </PrimaryButton>
            </div>
        </form>
    </div>
</GuestLayout>
    );
}
