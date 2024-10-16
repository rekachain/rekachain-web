<?php

namespace App\Http\Requests\DetailWorkerTrainset;

use Illuminate\Foundation\Http\FormRequest;
use App\Support\Enums\DetailWorkerTrainsetWorkStatusEnum;
use App\Support\Enums\DetailWorkerTrainsetAcceptanceStatusEnum;

class UpdateDetailWorkerTrainsetRequest extends FormRequest {
    public function rules(): array {
        return [
            'trainset_attachment_id' => 'nullable|exists:trainset_attachments,id',
            'worker_id' => 'nullable|exists:users,id',
            'progress_step_id' => 'nullable|exists:progress_steps,id',
            'estimated_time' => 'nullable|integer',
            'work_status' => ['nullable', 'in:' . implode(',', array_column(DetailWorkerTrainsetWorkStatusEnum::cases(), 'value'))],
            'acceptance_status' => ['nullable', 'in:' . implode(',', array_column(DetailWorkerTrainsetAcceptanceStatusEnum::cases(), 'value'))],
            // Add your validation rules here
        ];
    }
}
