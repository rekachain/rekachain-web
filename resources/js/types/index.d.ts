import { User } from '@/support/models';

interface AuthenticatedUser extends User {
    role: string;
    initials: string;
    photo: string;
}

export type PageProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
    auth: {
        user: AuthenticatedUser;
    };
};
