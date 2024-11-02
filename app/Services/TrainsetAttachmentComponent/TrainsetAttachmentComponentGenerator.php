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

        return $this->iterateWorkAspects($workAspects, $trainsetAttachment);
    }

    private function iterateWorkAspects($workAspects, $trainsetAttachment)
    {
        foreach ($workAspects as $workAspect) {
            $carriageTrainsets = $trainsetAttachment->trainset->carriage_trainsets;
            $result = $this->iterateCarriageTrainsets($carriageTrainsets, $trainsetAttachment, $workAspect);
            if ($result['success'] === false) {
                return $result;
            }
        }

        return ['success' => true];
    }

    private function iterateCarriageTrainsets($carriageTrainsets, $trainsetAttachment, $workAspect)
    {
        foreach ($carriageTrainsets as $carriageTrainset) {
            $carriagePanels = $carriageTrainset->carriage_panels;
            $result = $this->iterateCarriagePanels($carriagePanels, $trainsetAttachment, $carriageTrainset, $workAspect);
            if ($result['success'] === false) {
                return $result;
            }
        }

        return ['success' => true];
    }

    private function iterateCarriagePanels($carriagePanels, $trainsetAttachment, $carriageTrainset, $workAspect)
    {
        foreach ($carriagePanels as $carriagePanel) {
            $carriagePanelComponents = $carriagePanel->carriage_panel_components;
            $result = $this->iterateCarriagePanelComponents(
                $carriagePanelComponents,
                $trainsetAttachment,
                $carriagePanel,
                $carriageTrainset,
                $workAspect
            );
            if ($result['success'] === false) {
                return $result;
            }
        }

        return ['success' => true];
    }

    private function iterateCarriagePanelComponents(
        $carriagePanelComponents,
        $trainsetAttachment,
        $carriagePanel,
        $carriageTrainset,
        $workAspect
    ) {
        foreach ($carriagePanelComponents as $carriagePanelComponent) {
            if (!$carriagePanelComponent->progress) {
                logger('Carriage panel component ' . $carriagePanelComponent->id . ' has no progress');
                return [
                    'success' => false,
                    'code' => 409,
                    'message' => __(
                        'exception.services.trainset_service.update.generate_trainset_attachments.component_progress_not_identified_exception', 
                        ['component' => $carriagePanelComponent->component->name]
                    ),
                ];
            }
            if ($carriagePanelComponent->progress->work_aspect_id === $workAspect->id) {
                $this->trainsetAttachmentComponentService->create([
                    'trainset_attachment_id' => $trainsetAttachment->id,
                    'carriage_panel_component_id' => $carriagePanelComponent->id,
                    'total_required' => $carriageTrainset->qty * $carriagePanel->qty * $carriagePanelComponent->qty,
                ]);
            }
        }

        return ['success' => true];
    }
}