import { TrainsetStatusEnum } from '@/Support/Enums/trainsetStatusEnum';

export interface Trainset {
    project_id: number;
    name: string;
    preset_trainset_id: number;
    status: TrainsetStatusEnum;
}
