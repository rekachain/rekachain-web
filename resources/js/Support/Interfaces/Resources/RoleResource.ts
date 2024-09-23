import { Resource } from '@/Support/Interfaces/Resources/Resource';
import { Division, Role } from '../Models';
import { DivisionResource } from '@/Support/Interfaces/Resources/DivisionResource';

export interface RoleResource extends Resource, Role {
    users_count: number;
    permissions_count: number;
    division: DivisionResource;
    permissions?: string[]; // only available when editing
}
