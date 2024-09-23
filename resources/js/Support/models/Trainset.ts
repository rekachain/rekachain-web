import { TrainsetStatusEnum } from '@/Support/enums/trainsetStatusEnum';

export interface Trainset {
    project_id: number;
    name: string;
    preset_trainset_id: number;
    status: TrainsetStatusEnum;
}
