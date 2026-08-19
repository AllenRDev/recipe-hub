export interface User {
    id: number;
    name: string;
    email: string;
    bio: string | null;
    email_verified_at: string | null;
    created_at?: string;
    updated_at?: string;
    profile_image?: string | null; 
    profile_url?: string | null;
}
export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
    auth: {
        user: User;
    };
};
