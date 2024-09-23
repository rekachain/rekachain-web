import { Resource } from '@/Support/Interfaces/Resources/Resource';
import { Permission } from '../Models';

export interface PermissionResource extends Resource, Permission {}

export interface PermissionResourceGrouped {
    group: string;
    permissions: PermissionResource[];
}
