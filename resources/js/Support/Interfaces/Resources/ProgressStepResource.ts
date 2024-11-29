import { ProgressStep } from '@/Support/Interfaces/Models';
import { Resource, StepResource } from '@/Support/Interfaces/Resources';

export interface ProgressStepResource extends Resource, ProgressStep {
    step: StepResource;
}
