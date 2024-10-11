<?php

namespace App\Rules\SerialPanel;

use App\Support\Enums\RoleEnum;
use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

class SerialPanelAssignWorkerStepValidation implements ValidationRule {
    /**
     * Run the validation rule.
     *
     * @param  \Closure(string): \Illuminate\Translation\PotentiallyTranslatedString  $fail
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void {
        [$serialPanel, $user] = $value;
        // if ($user->hasRole([RoleEnum::QC_ASSEMBLY,RoleEnum::WORKER_ASSEMBLY])) {
        $carriagePanelProgressStepIds = $serialPanel->panel_attachment->carriage_panel->progress->progress_steps->pluck('step_id')->toArray(); // TODO: check order of steps insinde progress
        if (!in_array($user->step->id, $carriagePanelProgressStepIds)) {
            $fail(trans_choice(
                'validation.custom.serial_panel.assign_worker.step_invalid_exception', 0, 
                [
                    'progress'=>$serialPanel->panel_attachment->carriage_panel->progress->name,
                    'step'=>$user->step->name
                ]
            ));
        }

        $lastWorkerPanel = $serialPanel->detail_worker_panels()->orderBy('id', 'desc')->first();
        $lastKey = array_search($lastWorkerPanel?->progress_step->step_id ?? 0, $carriagePanelProgressStepIds);
        $currentKey = array_search($user->step->id, $carriagePanelProgressStepIds);
        if ($currentKey < $lastKey || $currentKey - $lastKey > 1) {
            $fail(trans_choice(
                'validation.custom.serial_panel.assign_worker.step_completed_exception', 0, 
                [
                    'progress'=>$serialPanel->panel_attachment->carriage_panel->progress->name, 
                    'step'=>$user->step->name
                ]
            ));
        } elseif ($currentKey - $lastKey > 1) {
            $fail(trans_choice(
                'validation.custom.serial_panel.assign_worker.step_ahead_exception', 0, 
                [
                    'progress'=>$serialPanel->panel_attachment->carriage_panel->progress->name, 
                ]
            ));
        }
        // }
    }
}
