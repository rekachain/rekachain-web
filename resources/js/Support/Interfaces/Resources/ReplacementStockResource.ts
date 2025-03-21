import { ReplacementStock } from '@/Support/Interfaces/Models';
import { ComponentResource, Resource } from '@/Support/Interfaces/Resources';

export interface ReplacementStockResource extends Resource, ReplacementStock {
    component?: ComponentResource;
}