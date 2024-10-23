<?php

namespace App\Services\TrainsetAttachmentComponent;

use App\Models\TrainsetAttachment;
use App\Support\Enums\TrainsetAttachmentTypeEnum;
use App\Support\Interfaces\Services\DivisionServiceInterface;
use App\Support\Interfaces\Services\TrainsetAttachmentComponentServiceInterface;
use App\Support\Interfaces\Services\WorkAspectServiceInterface;

class TrainsetAttachmentComponentGenerator
{
    public function __construct(
        protected DivisionServiceInterface $divisionService,
        protected TrainsetAttachmentComponentServiceInterface $trainsetAttachmentComponentService,
        protected WorkAspectServiceInterface $workAspectService,
    ) {}

    public function generate(TrainsetAttachment $trainsetAttachment)
    {
        $division = $this->divisionService->find(['name' => $trainsetAttachment->type->value === TrainsetAttachmentTypeEnum::MECHANIC->value ? 'Mekanik' : 'Elektrik'])->first();

        $workAspects = $this->workAspectService
            ->find(['division_id' => $division->id]);

        $this->iterateWorkAspects($workAspects, $trainsetAttachment);
    }

    private function iterateWorkAspects($workAspects, $trainsetAttachment)
    {
        $workAspects->each(function ($workAspect) use ($trainsetAttachment) {
            $carriageTrainsets = $trainsetAttachment->trainset->carriage_trainsets;
            $this->iterateCarriageTrainsets($carriageTrainsets, $trainsetAttachment, $workAspect);
        });
    }

    private function iterateCarriageTrainsets($carriageTrainsets, $trainsetAttachment, $workAspect)
    {
        $carriageTrainsets->each(function ($carriageTrainset) use ($trainsetAttachment, $workAspect) {
            $carriagePanels = $carriageTrainset->carriage_panels;
            $this->iterateCarriagePanels($carriagePanels, $trainsetAttachment, $carriageTrainset, $workAspect);
        });
    }

    private function iterateCarriagePanels($carriagePanels, $trainsetAttachment, $carriageTrainset, $workAspect)
    {
        $carriagePanels->each(function ($carriagePanel) use ($trainsetAttachment, $carriageTrainset, $workAspect) {
            $carriagePanelComponents = $carriagePanel->carriage_panel_components;
            $this->iterateCarriagePanelComponents(
                $carriagePanelComponents,
                $trainsetAttachment,
                $carriagePanel,
                $carriageTrainset,
                $workAspect
            );
        });
    }

    private function iterateCarriagePanelComponents(
        $carriagePanelComponents,
        $trainsetAttachment,
        $carriagePanel,
        $carriageTrainset,
        $workAspect
    ) {
        $carriagePanelComponents->each(function ($carriagePanelComponent) use (
            $trainsetAttachment,
            $carriagePanel,
            $carriageTrainset,
            $workAspect,
        ) {
            if ($carriagePanelComponent->progress->work_aspect_id === $workAspect->id) {
                $this->trainsetAttachmentComponentService->create([
                    'trainset_attachment_id' => $trainsetAttachment->id,
                    'carriage_panel_component_id' => $carriagePanelComponent->id,
                    'total_required' => $carriageTrainset->qty * $carriagePanel->qty * $carriagePanelComponent->qty,
                ]);
            }
        });
    }
}


