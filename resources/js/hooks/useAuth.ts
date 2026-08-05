import { usePage } from '@inertiajs/react';

export default function useAuth() {
    const { auth } = usePage().props;

    return {
        user: auth.user,
        isAuthenticated: !!auth.user,
    };
}
