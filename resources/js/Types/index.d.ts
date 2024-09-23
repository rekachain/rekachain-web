import { User } from '@/Support/models';
import { PERMISSION_ENUM } from '@/Support/enums/permissionEnum';

interface AuthenticatedUser extends User {
    role: string;
    initials: string;
    image: string;
    permissions: PERMISSION_ENUM[];
}

export type PageProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
    auth: {
        user: AuthenticatedUser;
    };
};
