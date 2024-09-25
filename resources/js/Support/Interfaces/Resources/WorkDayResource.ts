import { Resource, WorkDayTimeResource } from '@/Support/Interfaces/Resources';
import { WorkDay } from '@/Support/Interfaces/Models';

export interface WorkDayResource extends Resource, WorkDay {
    can_be_deleted: boolean;
    start_time: string;
    end_time: string;
    work_day_times: WorkDayTimeResource[];
}
