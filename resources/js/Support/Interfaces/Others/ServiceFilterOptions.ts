import { IntentEnum } from '@/Support/Enums/intentEnum';
import {
    ServiceFilterSortDirectionType,
    ServiceFilterTrashedType,
} from '@/Support/Interfaces/Types';

export interface ServiceFilterOptions {
    page?: number;
    perPage?: number;
    orderBy?: string;
    sortDirection?: ServiceFilterSortDirectionType;
    column_filters?: { [key: string]: any };
    search?: string;
    relations?: string;
    intent?: IntentEnum;
    trashed?: ServiceFilterTrashedType; // must implement soft delete, and handled in controller, e.g. UserController@index

    [key: string]: any; // Allow for additional filter options
}
