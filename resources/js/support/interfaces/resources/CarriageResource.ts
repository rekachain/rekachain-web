import { Resource } from '@/support/interfaces/resources/Resource';
import { Carriage } from '@/support/models';
import { CarriagePanelResource, CarriageTrainsetResource, PanelResource } from '@/support/interfaces/resources';

export interface CarriageResource extends Resource, Carriage {
    // trainset_id: number;
    // qty?: number; // available only in intent: web.project.show.project
    panels?: PanelResource[]; // available only in route projects.trainsets.carriages.index
    carriage_panels: CarriagePanelResource[];
    pivot: CarriageTrainsetResource;
}
