<?php

namespace App\Http\Requests\Permission;

use Illuminate\Foundation\Http\FormRequest;

class StorePermissionRequest extends FormRequest {
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
            // 'name' => 'required|string|unique:permissions,name,' . $this->permission->id,
            'name' => 'required|string|unique:permissions,name',
            'guard_name' => 'required|string',
            'group' => 'required|string',
        ];
    }
}
