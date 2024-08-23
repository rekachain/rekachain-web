import { Resource } from '@/support/interfaces/resources/Resource';
import { Carriage } from '@/support/models';
import { CarriagePanelResource, PanelResource } from '@/support/interfaces/resources';
import { CarriageTrainsetPivotResource } from '@/support/interfaces/resources/pivots';

export interface CarriageResource extends Resource, Carriage {
    // trainset_id: number;
    // qty?: number; // available only in intent: web.project.show.project
    panels?: PanelResource[]; // available only in route projects.trainsets.carriages.index
    carriagePanels: CarriagePanelResource[];
    pivot?: CarriageTrainsetPivotResource;
    // carriage_id: number;
}
