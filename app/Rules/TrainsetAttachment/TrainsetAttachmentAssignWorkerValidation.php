<?php

namespace App\Rules\TrainsetAttachment;

use App\Models\TrainsetAttachmentComponent;
use App\Support\Enums\DetailWorkerTrainsetWorkStatusEnum;
use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

class TrainsetAttachmentAssignWorkerValidation implements ValidationRule {
    /**
     * Run the validation rule.
     *
     * @param  \Closure(string): \Illuminate\Translation\PotentiallyTranslatedString  $fail
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void {
        [$trainsetAttachment, $carriagePanelComponentId, $user] = $value;
        $trainsetAttachmentComponent = TrainsetAttachmentComponent::whereCarriagePanelComponentId($carriagePanelComponentId)->whereTrainsetAttachmentId($trainsetAttachment->id)->first();

        if ($trainsetAttachmentComponent->total_fulfilled == $trainsetAttachmentComponent->total_required) {
            $fail(__(
                'validation.custom.trainset_attachment.assign_worker.total_fulfilled_exception',
                [
                    'progress'=>$trainsetAttachmentComponent->carriage_panel_component->progress->name,
                    'component'=>$trainsetAttachmentComponent->carriage_panel_component->component->name
                ]
            ));
        }

        $carriagePanelComponentProgressStepIds = $trainsetAttachmentComponent->carriage_panel_component->progress->progress_steps->pluck('step_id')->toArray(); // TODO: check order of steps inside progress
        if (!in_array($user->step->id, $carriagePanelComponentProgressStepIds)) {
            $fail(__(
                'validation.custom.trainset_attachment.assign_worker.step_invalid_exception',
                [
                    'progress'=>$trainsetAttachmentComponent->carriage_panel_component->progress->name,
                    'step'=>$user->step->name
                ]
            ));
            return;
        }

        $lastWorkerTrainset = $trainsetAttachmentComponent->detail_worker_trainsets()->orderBy('id', 'desc')->first();
        $lastKey = array_search($lastWorkerTrainset?->progress_step->step_id ?? 0, $carriagePanelComponentProgressStepIds);
        $currentKey = array_search($user->step->id, $carriagePanelComponentProgressStepIds);
        $lastWorkerTrainsetCompleted = $lastWorkerTrainset ? $lastWorkerTrainset->work_status->value === DetailWorkerTrainsetWorkStatusEnum::COMPLETED->value : false;
        if ($currentKey < $lastKey || ($currentKey === $lastKey && $lastWorkerTrainsetCompleted)) {
            $fail(__(
                'validation.custom.trainset_attachment.assign_worker.step_completed_exception',
                [
                    'progress'=>$trainsetAttachmentComponent->carriage_panel_component->progress->name, 
                    'step'=>$user->step->name
                ]
            ));
        } elseif ($currentKey - $lastKey > 1 || ($currentKey > $lastKey && !$lastWorkerTrainsetCompleted)) {
            $fail(__(
                'validation.custom.trainset_attachment.assign_worker.step_ahead_exception',
                [
                    'progress'=>$trainsetAttachmentComponent->carriage_panel_component->progress->name, 
                ]
            ));
        }
    }
}
