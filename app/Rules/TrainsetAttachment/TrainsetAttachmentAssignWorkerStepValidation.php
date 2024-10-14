<?php

namespace App\Rules\TrainsetAttachment;

use App\Support\Enums\DetailWorkerPanelWorkStatusEnum;
use App\Support\Enums\RoleEnum;
use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

class TrainsetAttachmentAssignWorkerStepValidation implements ValidationRule {
    /**
     * Run the validation rule.
     *
     * @param  \Closure(string): \Illuminate\Translation\PotentiallyTranslatedString  $fail
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void {
        [$trainsetAttachment, $carriagePanelComponent, $user] = $value;
        $carriagePanelComponentProgressStepIds = $carriagePanelComponent->carriage_panel->progress->progress_steps->pluck('step_id')->toArray(); // TODO: check order of steps inside progress
        if (!in_array($user->step->id, $carriagePanelComponentProgressStepIds)) {
            $fail(trans_choice(
                'validation.custom.trainset_attachment.assign_worker.step_invalid_exception', 0, 
                [
                    'progress'=>$carriagePanelComponent->carriage_panel->progress->name,
                    'step'=>$user->step->name
                ]
            ));
        }

        $lastWorkerPanel = $carriagePanelComponent->detail_worker_panels()->orderBy('id', 'desc')->first();
        $lastKey = array_search($lastWorkerPanel?->progress_step->step_id ?? 0, $carriagePanelComponentProgressStepIds);
        $currentKey = array_search($user->step->id, $carriagePanelComponentProgressStepIds);
        $lastWorkerPanelCompleted = $lastWorkerPanel ? $lastWorkerPanel->work_status->value === DetailWorkerPanelWorkStatusEnum::COMPLETED->value : false;
        if ($currentKey < $lastKey || ($currentKey === $lastKey && $lastWorkerPanelCompleted)) {
            $fail(trans_choice(
                'validation.custom.trainset_attachment.assign_worker.step_completed_exception', 0, 
                [
                    'progress'=>$carriagePanelComponent->carriage_panel->progress->name, 
                    'step'=>$user->step->name
                ]
            ));
        } elseif ($currentKey - $lastKey > 1 || ($currentKey > $lastKey && !$lastWorkerPanelCompleted)) {
            $fail(trans_choice(
                'validation.custom.trainset_attachment.assign_worker.step_ahead_exception', 0, 
                [
                    'progress'=>$carriagePanelComponent->carriage_panel->progress->name, 
                ]
            ));
        }
    }
}
