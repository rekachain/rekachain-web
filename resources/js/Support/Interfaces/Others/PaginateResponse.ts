import { PaginateMeta } from './PaginateMeta';

// extends PaginateMeta to handle Collection Paginate Response
export interface PaginateResponse<Resource> extends PaginateMeta {
    data: Resource[];
    meta: PaginateMeta;
}
