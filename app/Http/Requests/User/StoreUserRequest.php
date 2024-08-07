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
            'photo_path' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
            'name' => 'required|string|max:255',
            'nip' => 'required|string|max:18|unique:users',
            'email' => 'required|string|email|max:255|unique:users',
            'phone_number' => 'nullable|string|max:15',
            'password' => 'required|string|min:8',
            'role_id' => 'required|exists:roles,id',
        ];
    }
}
