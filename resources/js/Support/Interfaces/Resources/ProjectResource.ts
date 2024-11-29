import { Project } from '@/Support/Interfaces/Models';
import { Resource, TrainsetResource } from '@/Support/Interfaces/Resources';

export interface ProjectResource extends Resource, Project {
    trainset_count: number;
    trainsets: TrainsetResource[];
    can_be_deleted: boolean;
}
