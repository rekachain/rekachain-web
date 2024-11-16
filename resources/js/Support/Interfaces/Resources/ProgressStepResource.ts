import { Resource, StepResource } from '@/Support/Interfaces/Resources';
import { ProgressStep } from '@/Support/Interfaces/Models';

export interface ProgressStepResource extends Resource, ProgressStep {
    step: StepResource;
}
