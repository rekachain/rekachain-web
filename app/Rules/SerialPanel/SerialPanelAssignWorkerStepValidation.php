<?php

namespace App\Rules\SerialPanel;

use App\Support\Enums\DetailWorkerPanelWorkStatusEnum;
use App\Support\Enums\RoleEnum;
use App\Support\Enums\SerialPanelManufactureStatusEnum;
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
        if ($serialPanel->manufacture_status !== SerialPanelManufactureStatusEnum::FAILED->value || $serialPanel->manufacture_status !== SerialPanelManufactureStatusEnum::COMPLETED->value) {
            $fail(__(
                'validation.custom.serial_panel.assign_worker.manufacture_status_exception',
                [
                    'progress'=>$serialPanel->panel_attachment->carriage_panel->progress->name,
                    'manufacture_status'=>$serialPanel->manufacture_status,
                ]
            ));
            return;
        }
        // if ($user->hasRole([RoleEnum::QC_ASSEMBLY,RoleEnum::WORKER_ASSEMBLY])) {
        $carriagePanelProgressStepIds = $serialPanel->panel_attachment->carriage_panel->progress->progress_steps->pluck('step_id')->toArray(); // TODO: check order of steps inside progress
        if (!in_array($user->step->id, $carriagePanelProgressStepIds)) {
            $fail(__(
                'validation.custom.serial_panel.assign_worker.step_invalid_exception',
                [
                    'progress'=>$serialPanel->panel_attachment->carriage_panel->progress->name,
                    'step'=>$user->step->name
                ]
            ));
            return;
        }

        $lastWorkerPanel = $serialPanel->detail_worker_panels()->orderBy('id', 'desc')->first();
        $lastKey = array_search($lastWorkerPanel?->progress_step->step_id ?? 0, $carriagePanelProgressStepIds);
        $currentKey = array_search($user->step->id, $carriagePanelProgressStepIds);
        $lastWorkerPanelCompleted = $lastWorkerPanel ? $lastWorkerPanel->work_status->value === DetailWorkerPanelWorkStatusEnum::COMPLETED->value : false;
        if ($currentKey < $lastKey || ($currentKey === $lastKey && $lastWorkerPanelCompleted)) {
            $fail(__(
                'validation.custom.serial_panel.assign_worker.step_completed_exception',
                [
                    'progress'=>$serialPanel->panel_attachment->carriage_panel->progress->name, 
                    'step'=>$user->step->name
                ]
            ));
        } elseif ($currentKey - $lastKey > 1 || ($currentKey > $lastKey && !$lastWorkerPanelCompleted)) {
            $fail(__(
                'validation.custom.serial_panel.assign_worker.step_ahead_exception',
                [
                    'progress'=>$serialPanel->panel_attachment->carriage_panel->progress->name, 
                ]
            ));
        }
        // }
    }
}
