<?php

namespace App\Rules\TrainsetAttachment;

use App\Models\TrainsetAttachmentComponent;
use App\Support\Enums\DetailWorkerTrainsetWorkStatusEnum;
use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

class TrainsetAttachmentAssignWorkerStepValidation implements ValidationRule {
    /**
     * Run the validation rule.
     *
     * @param  \Closure(string): \Illuminate\Translation\PotentiallyTranslatedString  $fail
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void {
        [$trainsetAttachment, $carriagePanelComponentId, $user] = $value;
        $trainsetAttachmentComponent = TrainsetAttachmentComponent::find(['carriage_panel_component_id' => $carriagePanelComponentId, 'trainset_attachment_id' => $trainsetAttachment->id])->first();

        if ($trainsetAttachmentComponent->total_fulfilled == $trainsetAttachmentComponent->total_required) {
            $fail(trans_choice(
                'validation.custom.trainset_attachment.assign_worker.total_fulfilled_exception', 0, 
                ['progress'=>$trainsetAttachmentComponent->carriage_panel_component->progress->name, 'component'=>$trainsetAttachmentComponent->carriage_panel_component->component->name]
            ));
        }

        $carriagePanelComponentProgressStepIds = $trainsetAttachmentComponent->carriage_panel_component->progress->progress_steps->pluck('step_id')->toArray(); // TODO: check order of steps inside progress
        if (!in_array($user->step->id, $carriagePanelComponentProgressStepIds)) {
            $fail(trans_choice(
                'validation.custom.trainset_attachment.assign_worker.step_invalid_exception', 0, 
                [
                    'progress'=>$trainsetAttachmentComponent->carriage_panel_component->progress->name,
                    'step'=>$user->step->name
                ]
            ));
            return;
        }

        $lastWorkerTrainset = $trainsetAttachmentComponent->carriage_panel_component->detail_worker_panels()->orderBy('id', 'desc')->first();
        $lastKey = array_search($lastWorkerTrainset?->progress_step->step_id ?? 0, $carriagePanelComponentProgressStepIds);
        $currentKey = array_search($user->step->id, $carriagePanelComponentProgressStepIds);
        $lastWorkerTrainsetCompleted = $lastWorkerTrainset ? $lastWorkerTrainset->work_status->value === DetailWorkerTrainsetWorkStatusEnum::COMPLETED->value : false;
        if ($currentKey < $lastKey || ($currentKey === $lastKey && $lastWorkerTrainsetCompleted)) {
            $fail(trans_choice(
                'validation.custom.trainset_attachment.assign_worker.step_completed_exception', 0, 
                [
                    'progress'=>$trainsetAttachmentComponent->carriage_panel_component->progress->name, 
                    'step'=>$user->step->name
                ]
            ));
        } elseif ($currentKey - $lastKey > 1 || ($currentKey > $lastKey && !$lastWorkerTrainsetCompleted)) {
            $fail(trans_choice(
                'validation.custom.trainset_attachment.assign_worker.step_ahead_exception', 0, 
                [
                    'progress'=>$trainsetAttachmentComponent->carriage_panel_component->progress->name, 
                ]
            ));
        }
    }
}
