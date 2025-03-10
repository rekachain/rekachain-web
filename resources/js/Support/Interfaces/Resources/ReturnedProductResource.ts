import { ReturnedProduct } from '@/Support/Interfaces/Models';
import { ComponentResource, PanelResource, ProductProblemResource, Resource, UserResource } from '@/Support/Interfaces/Resources';

export interface ReturnedProductResource extends Resource, ReturnedProduct {
    product_return?: ComponentResource|PanelResource;
    buyer?: UserResource;
    product_problems?: ProductProblemResource[];
}