import { Resource } from '@/Support/Interfaces/Resources';
import { Permission } from '@/Support/Interfaces/Models';

export interface PermissionResource extends Resource, Permission {}

export interface PermissionResourceGrouped {
    group: string;
    permissions: PermissionResource[];
}
