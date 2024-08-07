import { Resource } from '@/support/interfaces/resources/Resource';
import { Permission } from '@/support/models';

export interface PermissionResource extends Resource, Permission {}

export interface PermissionResourceGrouped {
    group: string;
    permissions: PermissionResource[];
}
