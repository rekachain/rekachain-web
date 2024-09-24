import { Resource } from '@/Support/Interfaces/Resources/Resource';
import { Carriage } from '../Models';
import { CarriagePanelResource, CarriageTrainsetResource, PanelResource } from '';

export interface CarriageResource extends Resource, Carriage {
    // trainset_id: number;
    // qty?: number; // available only in intent: web.project.show.project
    panels?: PanelResource[]; // available only in route projects.trainsets.carriages.index
    carriage_panels: CarriagePanelResource[];
    pivot: CarriageTrainsetResource;
    can_be_deleted: boolean;
}
