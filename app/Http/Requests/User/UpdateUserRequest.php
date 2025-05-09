<?php

namespace App\Http\Requests\User;

use App\Support\Enums\IntentEnum;
use Illuminate\Foundation\Http\FormRequest;

class UpdateUserRequest extends FormRequest {
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array {

        $intent = $this->get('intent');

        switch ($intent) {
            case IntentEnum::API_USER_UPDATE_PASSWORD->value:
                return [
                    'old_password' => 'required|string|min:8',
                    'new_password' => 'required|string|min:8|confirmed',
                ];
        }

        $user = $this->route('user')->id;

        return [
            'image_path' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
            'name' => 'nullable|string|max:255',
            'nip' => 'nullable|string|max:18|regex:/^[1-9]\d*$/|unique:users,nip,' . $user,
            'email' => 'nullable|string|email|max:255|unique:users,email,' . $user,
            'phone_number' => 'nullable|string|regex:/^([0-9\s\-\+\(\)]*)$/|min:10|max:15',
            'password' => 'nullable|string|min:8',
            'role_id' => 'nullable|exists:roles,id',
            'workstation_id' => 'nullable|exists:workstations,id',
            'step_id' => 'nullable|exists:steps,id',
        ];
    }
}
