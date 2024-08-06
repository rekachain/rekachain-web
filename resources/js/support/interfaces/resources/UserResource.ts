import { Resource } from '@/support/interfaces/resources/Resource';
import { User } from '@/support/models';

export interface UserResource extends Resource, User {
    photo_path: string;
    role_id: number;
    role: string;
    division_id: number;
}
