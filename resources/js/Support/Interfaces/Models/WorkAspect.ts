import { DivisionResource } from '../Resources';

export interface WorkAspect {
    id: number;
    name: string;
    description: string;
    division_id: number;
    division: DivisionResource;
    created_at: string;
    updated_at: string;
}
