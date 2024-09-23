import { Resource } from '@/Support/interfaces/resources/Resource';
import { Project } from '@/Support/models';
import { TrainsetResource } from '@/Support/interfaces/resources';

export interface ProjectResource extends Resource, Project {
    trainset_count: number;
    trainsets: TrainsetResource[];
    can_be_deleted: boolean;
}
