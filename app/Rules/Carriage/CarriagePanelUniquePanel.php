<?php

namespace App\Rules\Carriage;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

class CarriagePanelUniquePanel implements ValidationRule {
    /**
     * Run the validation rule.
     *
     * @param  \Closure(string): \Illuminate\Translation\PotentiallyTranslatedString  $fail
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void {
        $carriage = request()->route('carriage');

        if ($carriage->carriage_panels()->where('panel_id', $value)->exists()) {
            $fail(__('validation.custom.carriage.unique_panel'));
        }
    }
}
