<?php

namespace App\Http\Requests\HelpdeskContact;

use Illuminate\Foundation\Http\FormRequest;

class UpdateHelpdeskContactRequest extends FormRequest {
    public function rules(): array {
        return [
            'email' => 'nullable|email',
            'phone_number' => 'nullable|string|regex:/^([0-9\s\-\+\(\)]*)$/|min:10|max:15',
            'notice' => 'nullable|string',
        ];
    }
}
