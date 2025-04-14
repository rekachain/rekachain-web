import { PERMISSION_ENUM } from '@/Support/Enums/permissionEnum';
import { UserResource } from '@/Support/Interfaces/Resources';

interface AuthenticatedUser extends Omit<UserResource, 'role'> {
    role: string;
    initials: string;
    permissions: PERMISSION_ENUM[];
}

export type PageProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
    auth: {
        user: AuthenticatedUser;
    };
    data: any;
};
