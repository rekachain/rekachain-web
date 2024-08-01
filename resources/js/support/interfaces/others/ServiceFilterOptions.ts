export interface ServiceFilterOptions {
    page?: number;
    perPage?: number;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';

    [key: string]: any; // Allow for additional filter options
}
