<?php

namespace App\Rules;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

class PermissionNameValidation implements ValidationRule {
    /**
     * Run the validation rule.
     *
     * @param  \Closure(string): \Illuminate\Translation\PotentiallyTranslatedString  $fail
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void {
        $pattern = '/^[a-z]+-[a-z]+$/';

        if (!preg_match($pattern, $value)) {
            $fail(__('validation.custom.permission.permission_name.regex', ['attribute' => $attribute]));
        }
    }
}
