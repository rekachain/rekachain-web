import { ProgressStepResource, Resource, StepResource } from '@/Support/Interfaces/Resources';
import { Progress } from '@/Support/Interfaces/Models';

export interface ProgressResource extends Resource, Progress {
    steps: StepResource[];
    progress_steps: ProgressStepResource[];
}
