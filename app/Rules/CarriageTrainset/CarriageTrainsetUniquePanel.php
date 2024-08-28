<?php

namespace App\Rules\CarriageTrainset;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

class CarriageTrainsetUniquePanel implements ValidationRule {
    /**
     * Run the validation rule.
     *
     * @param  \Closure(string): \Illuminate\Translation\PotentiallyTranslatedString  $fail
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void {
        $carriageTrainset = request()->route('carriage_trainset');

        if ($carriageTrainset->carriage_panels()->where('panel_id', $value)->exists()) {
            $fail(__('validation.custom.carriage_trainset.unique_panel'));
        }
    }
}
