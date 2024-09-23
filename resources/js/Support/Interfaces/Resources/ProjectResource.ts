import { Resource } from '@/Support/Interfaces/Resources/Resource';
import { Project } from '../Models';
import { TrainsetResource } from '';

export interface ProjectResource extends Resource, Project {
    trainset_count: number;
    trainsets: TrainsetResource[];
    can_be_deleted: boolean;
}
