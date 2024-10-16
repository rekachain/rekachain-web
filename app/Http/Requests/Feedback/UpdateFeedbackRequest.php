<?php

namespace App\Http\Requests\Feedback;

use App\Support\Enums\FeedbackStatusEnum;
use Illuminate\Foundation\Http\FormRequest;

class UpdateFeedbackRequest extends FormRequest {
    public function rules(): array {
        return [
            'user_id' => 'nullable|exists:users,id',
            'name' => 'nullable|string|max:255',
            'email' => 'nullable|email|max:255',
            'message' => 'required|string',
            'rating' => 'required|integer|min:1|max:5',
            'status' => 'nullable|in:' .
                implode(',', FeedbackStatusEnum::toArray()),
        ];
    }
}
