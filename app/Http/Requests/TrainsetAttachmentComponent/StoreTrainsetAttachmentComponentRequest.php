<?php

namespace App\Http\Requests\TrainsetAttachmentComponent;

use Illuminate\Foundation\Http\FormRequest;

class StoreTrainsetAttachmentComponentRequest extends FormRequest {
    public function rules(): array {
        return [
            'trainset_attachment_id' => 'required|exist:trainset_attachment,id',
            'carriage_panel_component_id' => 'required|exist:carriage_panel_components,id',
            'total_required' => 'required|integer',
            'total_fulfilled' => 'nullable|integer',
            'total_failed' => 'nullable|integer',
        ];
    }
}
