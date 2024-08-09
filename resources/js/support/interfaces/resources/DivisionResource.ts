import { Resource } from '@/support/interfaces/resources/Resource';
import { Permission } from '@/support/models';
import { Division } from '@/support/models/Division';

export interface DivisionResource extends Resource, Division {}
