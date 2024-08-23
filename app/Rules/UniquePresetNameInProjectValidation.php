<?php

namespace App\Rules;

use App\Models\PresetTrainset;
use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

// class UniquePresetNameInProject implements Rule
// {
//    protected int $projectId;
//
//    public function __construct(int $projectId)
//    {
//        $this->projectId = $projectId;
//    }
//
//    public function passes($attribute, $value)
//    {
//        return !PresetTrainset::where('preset_name', $value)
//            ->where('project_id', $this->projectId)
//            ->exists();
//    }
//
//    public function message()
//    {
//        return 'The combination of preset name and project ID must be unique.';
//    }
// }
class UniquePresetNameInProjectValidation implements ValidationRule {
    /**
     * Run the validation rule.
     *
     * @param  \Closure(string): \Illuminate\Translation\PotentiallyTranslatedString  $fail
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void {
        $projectId = request()->get('project_id');

        if (PresetTrainset::where('name', $value)
            ->where('project_id', $projectId)
            ->exists()) {
            $fail(__('validation.custom.preset_trainset.unique_preset_name_in_project', ['attribute' => $attribute]));
        }
    }
}
