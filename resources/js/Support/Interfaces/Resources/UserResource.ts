import { Resource } from '@/Support/Interfaces/Resources/Resource';
import { User } from '../Models';
import { RoleResource } from '@/Support/Interfaces/Resources/RoleResource';

export interface UserResource extends Resource, User {
    image: string;
    role_id: number;
    role: RoleResource;
    division_id: number;
}
