<?php

namespace App\Http\Requests\SerialPanel;

use App\Models\User;
use App\Rules\SerialPanel\SerialPanelAssignWorkerStepValidation;
use App\Support\Enums\IntentEnum;
use Illuminate\Foundation\Http\FormRequest;

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

        switch ($intent){
            case IntentEnum::API_SERIAL_PANEL_UPDATE_PANEL_MANUFACTURE_STATUS->value:
                return [
                    'notes' => 'required|string|max:255'
                ];
        }
        if ($this->get('worker_id')) {
            return [
                'worker_id' => [
                    'integer',
                    'exists:users,id',
                ],
            ];
        }
        return [
            'panel_attachment_id' => 'nullable|string|max:255',
            'qr_code' => 'nullable|string|max:255',
            'qr_path'=> 'nullable|string|max:255',
            'manufacture_status' => 'nullable|string|max:255',
            'notes' => 'nullable|string|max:255',
        ];
    }

    public function after() {
        $serialPanel = $this->route('serial_panel');
        $intent = $this->get('intent');

        switch ($intent) {
            case IntentEnum::API_SERIAL_PANEL_UPDATE_WORKER_PANEL->value:
                return [
                    function ($validator) use ($serialPanel) {
                        $validator->safe()->all();
                        $userId = $validator->getData()['worker_id'] ?? auth()->user()->id;
                        $assignWorkerStepValidation = new SerialPanelAssignWorkerStepValidation();
                        $assignWorkerStepValidation->validate('serialPanel', [
                            $serialPanel,
                            User::find($userId),
                        ], function ($message) use ($validator) {
                            $validator->errors()->add('Serial Panel Worker Assign', $message);
                        });
                    }
                ];
            default:
                return [];
        }
    }
}