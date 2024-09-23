import { Resource } from '@/Support/interfaces/resources/Resource';
import { Permission } from '@/Support/models';

export interface PermissionResource extends Resource, Permission {}

export interface PermissionResourceGrouped {
    group: string;
    permissions: PermissionResource[];
}
