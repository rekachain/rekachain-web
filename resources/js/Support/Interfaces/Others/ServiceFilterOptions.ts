import { IntentEnum } from '@/Support/Enums/intentEnum';

export interface ServiceFilterOptions {
    page?: number;
    perPage?: number;
    orderBy?: string;
    sortDirection?: 'asc' | 'desc';
    column_filters?: { [key: string]: any };
    search?: string;
    relations?: string;
    intent?: IntentEnum;

    [key: string]: any; // Allow for additional filter options
}
