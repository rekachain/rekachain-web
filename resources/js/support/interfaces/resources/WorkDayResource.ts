import { WorkDay } from '@/support/models';
import { Resource, WorkDayTimeResource } from '@/support/interfaces/resources';

export interface WorkDayResource extends Resource, WorkDay {
    can_be_deleted: boolean;
    start_time: string;
    end_time: string;
    work_day_times: WorkDayTimeResource[];
}
