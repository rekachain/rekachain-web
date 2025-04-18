<?php

namespace App\Services;

use App\Models\Component;
use App\Models\Panel;
use App\Support\Enums\ProductRestockStatusEnum;
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
     *     'product_restock_ids' => array,
     * ]
     * @return bool
     */
    public function initiateRestockProject(array $data): bool {
        $productRestocks = $this->productRestockService()->find([
            'id', 'in', $data['product_restock_ids'],
        ]);
        if ($productRestocks->isEmpty()) {
            return false;
        }

        $project = $this->projectService()->create([
            'name' => $data['project_name'],
            'description' => $data['project_description'],
            'initial_date' => $data['project_initial_date'],
            'trainset_needed' => 1,
        ]);

        $carriageTrainset = $this->carriageTrainsetService()->create([
            'trainset_id' => $project->trainsets()->first()->id,
        ]);

        $panelProductRestocks = $productRestocks->filter(function ($product) {
            return $product->product_restockable_type === Panel::class;
        });
        $panelGroups = $panelProductRestocks->groupBy('product_restockable_id')->map(function ($panelIds) {
            return [
                'id' => $panelIds->first()->product_restockable_id, 
                'qty' => $panelIds->count()
            ];
        })->values();
        foreach ($panelGroups as $key => $panelGroup) {
            $panel = $this->panelService()->findOrFail($panelGroup['id']);
            $panelQty = $panelGroup['qty'];

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
                'description' => 'Untuk panel tanpa awakan atau untuk identitas kumpulan komponen selain rakitan panel.',
            ])->id,
            'qty' => 1,
        ]);
        
        $componentProductRestocks = $productRestocks->filter(function ($product) {
            return $product->product_restockable_type === Component::class;
        });
        $componentGroups = $componentProductRestocks->groupBy('product_restockable_id')->map(function ($componentIds) {
            return [
                'id' => $componentIds->first()->product_restockable_id, 
                'qty' => $componentIds->count()
            ];
        })->values();
        foreach ($componentGroups as $key => $componentGroup) {
            $component = $this->componentService()->findOrFail($componentGroup['id']);
            $componentQty = $componentGroup['qty'];

            $carriagePanel->carriage_panel_components()->create([
                'component_id' => $component->id,
                'progress_id' => $component->progress_id,
                'qty' => $componentQty,
            ]);
        }

        $productRestocks->each(function ($product) use ($project) {
            $product->update([
                'project_id' => $project->id,
                'status' => ProductRestockStatusEnum::DRAFT->value,
            ]);
        });

        return true;
    }
}