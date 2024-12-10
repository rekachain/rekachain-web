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

        if ($trainsetAttachmentComponent->total_fulfilled == $trainsetAttachmentComponent->total_plan) {
            $fail(__(
                'validation.custom.trainset_attachment.assign_worker.total_fulfilled_exception',
                [
                    'progress' => $trainsetAttachmentComponent->carriage_panel_component->progress->name,
                    'component' => $trainsetAttachmentComponent->carriage_panel_component->component->name,
                ]
            ));

            return;
        }

        $carriagePanelComponentProgressStepIds = $trainsetAttachmentComponent->carriage_panel_component->progress->progress_steps->pluck('step_id')->toArray(); // TODO: check order of steps inside progress
        if (!in_array($user->step->id, $carriagePanelComponentProgressStepIds)) {
            $fail(__(
                'validation.custom.trainset_attachment.assign_worker.step_invalid_exception',
                [
                    'progress' => $trainsetAttachmentComponent->carriage_panel_component->progress->name,
                    'step' => $user->step->name,
                ]
            ));

            return;
        }

        $lastWorkerTrainset = $trainsetAttachmentComponent->detail_worker_trainsets()->orderBy('updated_at', 'desc')->orderBy('id', 'desc')->first();
        $lastWorkerIndex = array_search($lastWorkerTrainset?->progress_step->step_id ?? 0, $carriagePanelComponentProgressStepIds);
        $currentWorkerIndex = array_search($user->step->id, $carriagePanelComponentProgressStepIds);

        $lastWorkerTrainsetCompleted = $lastWorkerTrainset ? $lastWorkerTrainset->work_status->value === DetailWorkerTrainsetWorkStatusEnum::COMPLETED->value : false;
        // check if last work is completed but is not fulfilled yet
        if (array_key_last($carriagePanelComponentProgressStepIds) === $lastWorkerIndex && $lastWorkerTrainsetCompleted) {
            $lastWorkerIndex = -1;
        }
        if (($currentWorkerIndex < $lastWorkerIndex && $trainsetAttachmentComponent->total_current_work_progress > 0)
            || ($currentWorkerIndex === $lastWorkerIndex && $lastWorkerTrainsetCompleted)
        ) {
            $fail(__(
                'validation.custom.trainset_attachment.assign_worker.step_completed_exception',
                [
                    'progress' => $trainsetAttachmentComponent->carriage_panel_component->progress->name,
                    'step' => $user->step->name,
                ]
            ));

            return;
        } elseif ($currentWorkerIndex - $lastWorkerIndex > 1 || ($currentWorkerIndex > $lastWorkerIndex && !$lastWorkerTrainsetCompleted)) {
            $fail(__(
                'validation.custom.trainset_attachment.assign_worker.step_ahead_exception',
                [
                    'progress' => $trainsetAttachmentComponent->carriage_panel_component->progress->name,
                ]
            ));

            return;
        }

        if ($trainsetAttachmentComponent->total_current_work_progress === 0 && $currentWorkerIndex !== 0) {
            $fail(__(
                'validation.custom.trainset_attachment.assign_worker.current_progress_failed_exception',
                [
                    'progress' => $trainsetAttachmentComponent->carriage_panel_component->progress->name,
                ]
            ));

            return;
        }
    }
}
