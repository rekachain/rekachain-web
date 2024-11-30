<?php

namespace App\Http\Requests\User;

use Illuminate\Foundation\Http\FormRequest;

class StoreUserRequest extends FormRequest {
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
        return [
            'image_path' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
            'name' => 'required|string|max:255',
            'nip' => 'required_without:email|string|max:18|unique:users|regex:/^[0-9]+$/',
            'email' => 'required_without:nip|string|email|max:255|unique:users',
            'phone_number' => 'nullable|string|regex:/^([0-9\s\-\+\(\)]*)$/|min:10|max:15',
            'password' => 'required|string|min:8',
            'role_id' => 'nullable|exists:roles,id',
            'workstation_id' => 'nullable|exists:workstations,id',
            'step_id' => 'nullable|exists:steps,id',
        ];
    }
}
