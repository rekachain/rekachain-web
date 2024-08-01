import { PaginateMeta } from './PaginateMeta';

export interface PaginateResponse<Resource> {
    data: Resource[];
    meta: PaginateMeta;
}
