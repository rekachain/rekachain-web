<?php

namespace App\Http\Requests\TrainsetAttachment;

use Illuminate\Foundation\Http\FormRequest;
use App\Support\Enums\TrainsetAttachmentTypeEnum;
use App\Support\Enums\TrainsetAttachmentStatusEnum;

class StoreTrainsetAttachmentRequest extends FormRequest {
    public function rules(): array {
        return [
            // Add your validation rules here
            'trainset_id' => 'required|integer|exists:trainsets,id',
            'source_workstation_id' => 'required|integer|exists:workstations,id',
            'destination_workstation_id' => 'required|integer|exists:workstations,id',
            'attachment_number' => 'nullable|string|max:255',
            'type' => 'required|string|in:' . implode(',', TrainsetAttachmentTypeEnum::toArray()),
            'qr_code' => 'nullable|string|max:255',
            'qr_path' => 'nullable|string|max:255',
            'elapsed_time' => 'nullable|string|max:255',
            'status' => 'nullable|string|in:' . implode(',', TrainsetAttachmentStatusEnum::toArray()),
            'trainset_attachment_id' => 'nullable|integer|exists:trainset_attachments,id',

        ];
    }
}
