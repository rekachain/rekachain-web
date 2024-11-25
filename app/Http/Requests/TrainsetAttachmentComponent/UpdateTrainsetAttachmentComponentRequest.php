<?php

namespace App\Http\Requests\TrainsetAttachmentComponent;

use Illuminate\Foundation\Http\FormRequest;

class UpdateTrainsetAttachmentComponentRequest extends FormRequest {
    public function rules(): array {
        return [
            'trainset_attachment_id' => 'nullable|exist:trainset_attachment,id',
            'carriage_panel_component_id' => 'nullable|exist:carriage_panel_components,id',
            'total_required' => 'nullable|integer',
            'total_fulfilled' => 'nullable|integer',
            'total_failed' => 'nullable|integer',
        ];
    }
}
