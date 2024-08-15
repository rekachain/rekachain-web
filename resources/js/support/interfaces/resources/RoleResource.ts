import { Resource } from '@/support/interfaces/resources/Resource';
import { Role } from '@/support/models/Role';

export interface RoleResource extends Resource, Role {
    users_count: number;
    permissions_count: number;
    division: string;
    permissions?: string[]; // only available when editing
}
