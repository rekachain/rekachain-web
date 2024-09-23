import { Resource } from '@/Support/interfaces/resources/Resource';
import { Division, Role } from '@/Support/models';
import { DivisionResource } from '@/Support/interfaces/resources/DivisionResource';

export interface RoleResource extends Resource, Role {
    users_count: number;
    permissions_count: number;
    division: DivisionResource;
    permissions?: string[]; // only available when editing
}
