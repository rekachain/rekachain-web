import { Resource } from '@/support/interfaces/resources/Resource';
import { User } from '@/support/models';
import { RoleResource } from '@/support/interfaces/resources/RoleResource';

export interface UserResource extends Resource, User {
    image: string;
    role_id: number;
    role: RoleResource;
    division_id: number;
}
