export interface ServiceFilterOptions {
    page?: number;
    perPage?: number;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
    column_filters?: { [key: string]: any };

    [key: string]: any; // Allow for additional filter options
}
