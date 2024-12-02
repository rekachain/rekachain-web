import { Progress } from '@/Support/Interfaces/Models';
import { ProgressStepResource, Resource, StepResource } from '@/Support/Interfaces/Resources';

export interface ProgressResource extends Resource, Progress {
    steps: StepResource[];
    progress_steps: ProgressStepResource[];
}
