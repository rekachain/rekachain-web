import { Resource } from '@/support/interfaces/resources/Resource';
import { User } from '@/support/models';
import { Role } from '@/support/models/Role';

export interface RoleResource extends Resource, Role {
    users_count: number;
}
