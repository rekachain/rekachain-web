<?php

namespace App\Rules\CarriagePanel;

use App\Models\CarriagePanel;
use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

class CarriagePanelUniqueComponent implements ValidationRule {
    /**
     * Run the validation rule.
     *
     * @param  \Closure(string): \Illuminate\Translation\PotentiallyTranslatedString  $fail
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void {
        /** @var CarriagePanel $carriagePanel */
        $carriagePanel = request()->route('carriage_panel');

        if ($carriagePanel->carriage_panel_components()->where('component_id', $value)->exists()) {
            $fail(__('validation.custom.carriage_panel.unique_component'));
        }
    }
}
