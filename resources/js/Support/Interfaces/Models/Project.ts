export interface Project {
    name: string;
    description?: string | null;
    initial_date: string;
    buyer_id?: number | null;
    estimated_start_date?: string | null;
    estimated_end_date?: string | null;
}
