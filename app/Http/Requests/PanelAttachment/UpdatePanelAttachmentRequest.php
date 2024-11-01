<?php

namespace App\Http\Requests\PanelAttachment;

use App\Models\User;
use App\Support\Enums\IntentEnum;
use App\Support\Enums\PanelAttachmentStatusEnum;
use App\Support\Enums\RoleEnum;
use Illuminate\Foundation\Http\FormRequest;

class UpdatePanelAttachmentRequest extends FormRequest {
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
        $intent = $this->get('intent');
            
        switch ($intent){
            case IntentEnum::WEB_PANEL_ATTACHMENT_ASSIGN_CUSTOM_ATTACHMENT_MATERIAL->value:
                return [
                    'raw_material_id' => 'required|integer|exists:raw_materials,id',
                    'qty' => 'required|integer',
                ];
            case IntentEnum::API_PANEL_ATTACHMENT_UPDATE_ATTACHMENT_STATUS->value:
                return [
                    'status' => ['required', 'in:' . implode(',', array_column(PanelAttachmentStatusEnum::cases(), 'value'))],
                    'note' => [
                        'required_if:status,' . PanelAttachmentStatusEnum::PENDING->value,
                    ],
                ];
            case IntentEnum::API_PANEL_ATTACHMENT_CONFIRM_KPM_BY_SPV->value:
                return [
                    'status' => ['required', 'in:' . implode(',', array_column(PanelAttachmentStatusEnum::cases(), 'value'))],
                ];  
            case IntentEnum::API_PANEL_ATTACHMENT_UPDATE_ASSIGN_SPV_AND_RECEIVER->value:
                $arr = [
                    'supervisor_id' => [
                        'nullable',
                        'integer',
                        'exists:users,id',
                        function ($attribute, $value, $fail) {
                            if (!User::find($value)->hasRole(RoleEnum::SUPERVISOR_ASSEMBLY)) {
                                $fail(__('exception.auth.role.role_exception', ['role' => RoleEnum::SUPERVISOR_ASSEMBLY->value]));
                            }
                        },
                    ],
                ];
                if ($this->get('receiver_name')) {
                    $arr['receiver_name'] = 'required|string|max:255';
                } else {
                    $arr['receiver_id'] = 'required|integer|exists:users,id';
                }
                return $arr;
        }
        return [
            'carriage_panel_id' => 'nullable|integer|exists:carriage_panels,id',
            'source_workstation_id' => 'nullable|integer|exists:workstations,id',
            'destination_workstation_id' => 'nullable|integer|exists:workstations,id',
            'attachment_number' => 'nullable|string',
            'qr_code' => 'nullable|string',
            'qr_path' => 'nullable|string',
            'current_step' => 'nullable|string',
            'elapsed_time' => 'nullable|string',
            'status' => 'nullable|in:' . implode(',', PanelAttachmentStatusEnum::toArray()),
            'note' => [
                'required_if:status,' . PanelAttachmentStatusEnum::PENDING->value,
            ],
            'supervisor_id' => 'nullable|integer|exists:users,id',
            'panel_attachment_id' => 'nullable|integer|exists:panel_attachments,id',
        ];
    }
}