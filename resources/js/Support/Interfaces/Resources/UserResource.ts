import { User } from '@/Support/Interfaces/Models';
import {
    ProjectResource,
    Resource,
    RoleResource,
    StepResource,
    WorkstationResource,
} from '@/Support/Interfaces/Resources';

export interface UserResource extends Resource, User {
    image: string;
    role_id: number;
    role?: RoleResource;
    division_id: number;
    division: RoleResource;
    workstation_id: number;
    step_id: number;
    workstation?: WorkstationResource;
    step?: StepResource;
    can_be_deleted: boolean;
    is_trashed: boolean;
    projects?: ProjectResource[];
    has_project: boolean;
}
