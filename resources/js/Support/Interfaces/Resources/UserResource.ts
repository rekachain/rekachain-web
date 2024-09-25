import { Resource, RoleResource } from '@/Support/Interfaces/Resources';
import { User } from '@/Support/Interfaces/Models';

export interface UserResource extends Resource, User {
    image: string;
    role_id: number;
    role: RoleResource;
    division_id: number;
}
