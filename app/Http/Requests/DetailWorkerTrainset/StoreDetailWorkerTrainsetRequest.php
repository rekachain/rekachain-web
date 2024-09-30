<?php

namespace App\Http\Requests\DetailWorkerTrainset;

use Illuminate\Foundation\Http\FormRequest;
use App\Support\Enums\DetailWorkerTrainsetWorkStatusEnum;
use App\Support\Enums\DetailWorkerTrainsetAcceptanceStatusEnum;

class StoreDetailWorkerTrainsetRequest extends FormRequest {
    public function rules(): array {
        return [
            'trainset_attachment_id' => 'required|exists:trainset_attachments,id',
            'worker_id' => 'required|exists:users,id',
            'progress_step_id' => 'required|exists:progress_steps,id',
            'estimated_time' => 'required|integer',
            'work_status' => ['required', 'in:' . implode(',', array_column(DetailWorkerTrainsetWorkStatusEnum::cases(), 'value'))],
            'acceptance_status' => ['required', 'in:' . implode(',', array_column(DetailWorkerTrainsetAcceptanceStatusEnum::cases(), 'value'))],
            // Add your validation rules here
        ];
    }
}
