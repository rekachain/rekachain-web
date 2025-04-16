<?php

namespace App\Services;

use App\Models\Panel;
use App\Support\Interfaces\Repositories\ProductRestockRepositoryInterface;
use App\Support\Interfaces\Services\ProductRestockServiceInterface;

class ProductRestockService extends BaseCrudService implements ProductRestockServiceInterface {
    protected function getRepositoryClass(): string {
        return ProductRestockRepositoryInterface::class;
    }

    /**
     * Initiate a restock project
     *
     * @param array $data = [
     *     'project_name' => string,
     *     'project_description' => string,
     *     'project_initial_date' => string,
     *     'panel_ids' => array,
     *     'panel_qtys' => array,
     *     'component_ids' => array,
     *     'component_qtys' => array
     * ]
     * @return bool
     */
    public function initiateRestockProject(array $data): bool {
        $project = $this->projectService()->create([
            'name' => $data['project_name'],
            'description' => $data['project_description'],
            'initial_date' => $data['project_initial_date'],
            'trainset_needed' => 1,
        ]);

        $carriageTrainset = $this->carriageTrainsetService()->create([
            'trainset_id' => $project->trainsets()->first()->id,
        ]);

        foreach ($data['panel_ids'] as $key => $panelId) {
            $panel = $this->panelService()->findOrFail($panelId);
            $panelQty = $data['panel_qtys'][$key];

            $carriagePanel = $carriageTrainset->carriage_panels()->create([
                'panel_id' => $panel->id,
                'progress_id' => $panel->progress_id,
                'qty' => $panelQty,
            ]);

            $carriagePanelComponents = $this->carriagePanelService()->find([
                'panel_id' => $panel->id,
            ])->first()->carriage_panel_components()->get();

            if (count($carriagePanelComponents) > 0) {
                foreach ($carriagePanelComponents as $carriagePanelComponent) {
                    $carriagePanel->carriage_panel_components()->create([
                        'component_id' => $carriagePanelComponent->component_id,
                        'progress_id' => $carriagePanelComponent->progress_id,
                        'qty' => $carriagePanelComponent->qty,
                    ]);
                }
            }

        }
        $carriagePanel = $carriageTrainset->carriage_panels()->create([
            'panel_id' => Panel::firstOrCreate([
                'name' => 'Custom',
            ], [
                'description' => 'Untuk panel tanpa awakan atau untuk identitas kumpulan komponen selain rakitan.',
            ])->id,
            'qty' => 1,
        ]);
        
        foreach ($data['component_ids'] as $key => $componentId) {
            $component = $this->componentService()->findOrFail($componentId);
            $componentQty = $data['component_qtys'][$key];

            $carriagePanel->carriage_panel_components()->create([
                'component_id' => $component->id,
                'progress_id' => $component->progress_id,
                'qty' => $componentQty,
            ]);
        }

        return true;
    }
}