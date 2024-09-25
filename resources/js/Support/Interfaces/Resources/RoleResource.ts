import { DivisionResource, Resource } from '@/Support/Interfaces/Resources';
import { Role } from '@/Support/Interfaces/Models';

export interface RoleResource extends Resource, Role {
    users_count: number;
    permissions_count: number;
    division: DivisionResource;
    permissions?: string[]; // only available when editing
}
