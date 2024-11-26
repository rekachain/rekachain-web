<?php

namespace App\Http\Requests\DetailWorkerTrainset;

use App\Support\Enums\DetailWorkerTrainsetAcceptanceStatusEnum;
use App\Support\Enums\DetailWorkerTrainsetWorkStatusEnum;
use Illuminate\Foundation\Http\FormRequest;

class StoreDetailWorkerTrainsetRequest extends FormRequest {
    public function rules(): array {
        return [
            // 'trainset_attachment_id' => 'required|exists:trainset_attachments,id',
            'trainset_attachment_component_id' => 'required|exists:trainset_attachment_components,id',
            'worker_id' => 'required|exists:users,id',
            'progress_step_id' => 'required|exists:progress_steps,id',
            'estimated_time' => 'required|integer',
            'work_status' => ['required', 'in:' . implode(',', array_column(DetailWorkerTrainsetWorkStatusEnum::cases(), 'value'))],
            'acceptance_status' => ['required', 'in:' . implode(',', array_column(DetailWorkerTrainsetAcceptanceStatusEnum::cases(), 'value'))],
            // Add your validation rules here
        ];
    }
}
