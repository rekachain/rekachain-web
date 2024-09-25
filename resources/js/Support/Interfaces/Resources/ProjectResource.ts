import { Resource, TrainsetResource } from '@/Support/Interfaces/Resources';
import { Project } from '@/Support/Interfaces/Models';

export interface ProjectResource extends Resource, Project {
    trainset_count: number;
    trainsets: TrainsetResource[];
    can_be_deleted: boolean;
}
