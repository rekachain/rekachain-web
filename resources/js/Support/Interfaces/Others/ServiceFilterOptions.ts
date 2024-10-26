export interface ServiceFilterOptions {
    page?: number;
    perPage?: number;
    orderBy?: string;
    sortDirection?: 'asc' | 'desc';
    column_filters?: { [key: string]: any };
    search?: string;
    relations?: string;

    [key: string]: any; // Allow for additional filter options
}
