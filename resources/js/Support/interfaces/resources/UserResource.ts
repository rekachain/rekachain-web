import { Resource } from '@/Support/interfaces/resources/Resource';
import { User } from '@/Support/models';
import { RoleResource } from '@/Support/interfaces/resources/RoleResource';

export interface UserResource extends Resource, User {
    image: string;
    role_id: number;
    role: RoleResource;
    division_id: number;
}
