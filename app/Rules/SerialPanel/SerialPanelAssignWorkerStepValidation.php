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
        $user = auth()->user();
        // if ($user->hasRole([RoleEnum::QC_ASSEMBLY,RoleEnum::WORKER_ASSEMBLY])) {
        $carriagePanelProgressStepIds = $value->panel_attachment->carriage_panel->progress->progress_steps->pluck('step_id')->toArray();
        if (!in_array($user->step->id, $carriagePanelProgressStepIds)) {
            $fail(__($value->panel_attachment->carriage_panel->progress->name.' does not have '.$user->step->name.' step'));
        }

        $lastWorkerPanel = $value->detail_worker_panels()->orderBy('id', 'desc')->first();
        $lastKey = array_search($lastWorkerPanel?->progress_step->step_id ?? 0, $carriagePanelProgressStepIds);
        $currentKey = array_search($user->step->id, $carriagePanelProgressStepIds);
        if ($currentKey < $lastKey || $currentKey - $lastKey > 1) {
            $fail(__($currentKey < $lastKey ? 'Step '.$user->step->name.' already done' : 'You are more than 1 step ahead🗿'));
        }
        // }
    }
}
