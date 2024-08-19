import { Resource } from '@/support/interfaces/resources/Resource';
import { Division, Role } from '@/support/models';
import { DivisionResource } from '@/support/interfaces/resources/DivisionResource';

export interface RoleResource extends Resource, Role {
    users_count: number;
    permissions_count: number;
    division: DivisionResource;
    permissions?: string[]; // only available when editing
}
