<?php

namespace App\Http\Requests\PanelAttachment;

use App\Support\Enums\PanelAttachmentStatusEnum;
use Illuminate\Foundation\Http\FormRequest;

class StorePanelAttachmentRequest extends FormRequest {
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
            'carriage_panel_id' => 'required|integer|exists:carriage_panels,id',
            'source_workstation_id' => 'required|integer|exists:workstations,id',
            'destination_workstation_id' => 'required|integer|exists:workstations,id',
            'attachment_number' => 'required|string',
            'qr_code' => 'required|string',
            'qr_path' => 'required|string',
            'current_step' => 'required|string',
            'elapsed_time' => 'required|string',
            'status' => 'required|in:' . implode(',', PanelAttachmentStatusEnum::toArray()),
            'note' => [
                'required_if:status,' . PanelAttachmentStatusEnum::PENDING->value,
            ],
            'supervisor_id' => 'required|integer|exists:users,id',
            'panel_attachment_id' => 'nullable|integer|exists:panel_attachments,id',
        ];
    }
}
