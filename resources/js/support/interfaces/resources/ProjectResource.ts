import { Resource } from '@/support/interfaces/resources/Resource';
import { Project } from '@/support/models';
import { TrainsetResource } from '@/support/interfaces/resources';

export interface ProjectResource extends Resource, Project {
    trainset_count: number;
    trainsets?: TrainsetResource[];
}
