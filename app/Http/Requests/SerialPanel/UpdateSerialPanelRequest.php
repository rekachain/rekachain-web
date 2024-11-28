<?php

namespace App\Http\Requests\SerialPanel;

use App\Models\User;
use App\Rules\SerialPanel\SerialPanelAssignWorkerValidation;
use App\Support\Enums\IntentEnum;
use App\Support\Enums\RoleEnum;
use App\Support\Enums\SerialPanelManufactureStatusEnum;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class UpdateSerialPanelRequest extends FormRequest {
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

        switch ($intent) {
            case IntentEnum::API_SERIAL_PANEL_UPDATE_PANEL_MANUFACTURE_STATUS->value:
                return [
                    'manufacture_status' => 'required|in:' . implode(',', SerialPanelManufactureStatusEnum::toArray()),
                    'notes' => 'required_if:manufacture_status,' . SerialPanelManufactureStatusEnum::FAILED->value . '|string',
                ];
            case IntentEnum::API_SERIAL_PANEL_UPDATE_ASSIGN_WORKER_PANEL->value:
                if ($this->get('worker_id')) {
                    if (!Auth::user()->hasRole(RoleEnum::SUPERVISOR_ASSEMBLY)) {
                        abort(403, __('exception.auth.role.role_exception', ['role' => RoleEnum::SUPERVISOR_ASSEMBLY->value]));
                    }

                    return [
                        'worker_id' => [
                            'integer',
                            'exists:users,id',
                        ],
                    ];
                }
        }

        return [
            'panel_attachment_id' => 'nullable|integer',
            'qr_code' => 'nullable|string|max:255',
            'qr_path' => 'nullable|string|max:255',
            'manufacture_status' => 'nullable|in:' . implode(',', SerialPanelManufactureStatusEnum::toArray()),
            'notes' => 'required_if:manufacture_status,' . SerialPanelManufactureStatusEnum::FAILED->value . '|string',
        ];
    }

    public function after() {
        $serialPanel = $this->route('serial_panel');
        $intent = $this->get('intent');

        switch ($intent) {
            case IntentEnum::API_SERIAL_PANEL_UPDATE_ASSIGN_WORKER_PANEL->value:
                return [
                    function ($validator) use ($serialPanel) {
                        $validator->safe()->all();
                        $userId = $validator->getData()['worker_id'] ?? Auth::user()->id;
                        $assignWorkerStepValidation = new SerialPanelAssignWorkerValidation;
                        $assignWorkerStepValidation->validate('serialPanel', [
                            $serialPanel,
                            User::find($userId),
                        ], function ($message) use ($validator) {
                            $validator->errors()->add('Serial Panel Worker Assign', $message);
                        });
                    },
                ];
            default:
                return [];
        }
    }
}
