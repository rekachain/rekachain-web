<?php

namespace App\Http\Resources;

use App\Support\Enums\IntentEnum;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CarriagePanelResource extends JsonResource {
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array {
        $intent = $request->get('intent');

        switch ($intent) {
            case IntentEnum::API_PANEL_ATTACHMENT_GET_ATTACHMENT_DETAILS->value:
                return [
                    'id' => $this->id,
                    'progress' => new ProgressResource($this->progress),
                    'panel' => new PanelResource($this->panel),
                    'qty' => $this->qty,
                    'panel_materials' => PanelMaterialResource::collection($this->panel_materials),
                    'created_at' => $this->created_at,
                    'updated_at' => $this->updated_at,
                ];
            case IntentEnum::WEB_CARRIAGE_PANEL_GET_PANEL_PROGRESS->value:
                $attachment = $this->panel_attachments->first();
                $panelSteps = $attachment->carriage_panel->progress->progress_steps->map(function ($progressStep) use (&$steps) {
                    return [
                        'step_id' => $progressStep->step->id,
                        // 'progress_step_id' => $progressStep->id,
                        'step_name' => $progressStep->step->name,
                        'step_process' => $progressStep->step->process,
                        'estimated_time' => $progressStep->step->estimated_time,
                        'workers' => collect(),
                    ];
                });
                unset($attachment->carriage_panel);

                $serialPanels = $attachment->serial_panels->map(function ($serialPanel) use ($panelSteps) {
                    $steps = collect();
                    $serialPanel->detail_worker_panels->map(function ($detailWorkerPanel) use (&$steps) {
                        $workers = collect();
                        $step = $steps->firstWhere('step_id', $detailWorkerPanel->progress_step->step_id);
                        if (!$step) {
                            $workers->push([
                                'nip' => $detailWorkerPanel->worker->nip,
                                'name' => $detailWorkerPanel->worker->name,
                                'started_at' => $detailWorkerPanel->created_at->toDateTimeString(),
                                'acceptance_status' => $detailWorkerPanel->acceptance_status,
                                'work_status' => $detailWorkerPanel->work_status,
                            ]);
                            $steps->push([
                                'step_id' => $detailWorkerPanel->progress_step->step->id,
                                // 'progress_step_id' => $detailWorkerPanel->progress_step->id,
                                'step_name' => $detailWorkerPanel->progress_step->step->name,
                                'step_process' => $detailWorkerPanel->progress_step->step->process,
                                'estimated_time' => $detailWorkerPanel->progress_step->step->estimated_time,
                                'workers' => $workers,
                            ]);
                        } else {
                            $step['workers']->push([
                                'nip' => $detailWorkerPanel->worker->nip,
                                'name' => $detailWorkerPanel->worker->name,
                                'started_at' => $detailWorkerPanel->created_at->toDateTimeString(),
                                'acceptance_status' => $detailWorkerPanel->acceptance_status,
                                'work_status' => $detailWorkerPanel->work_status,
                            ]);
                        }
                    });
                    $panelSteps->each(function ($panelStep) use (&$steps) {
                        $step = $steps->firstWhere('step_id', $panelStep['step_id']);
                        if (!$step) {
                            $steps->push($panelStep);
                        }
                    });

                    return [
                        'serial_number' => $serialPanel->id,
                        'product_number' => $serialPanel->product_no,
                        'steps' => $steps->sortBy('step_id')->map(function ($step) {
                            return $step;
                        })->values(),
                    ];
                });

                return [
                    'progress' => $attachment->carriage_panel->progress->fresh()->load('work_aspect'),
                    'total_steps' => $attachment->carriage_panel->progress->progress_steps->count(),
                    'serial_panels' => $serialPanels->toArray(),
                ];
        }

        return [
            'id' => $this->id,
            'panel' => new PanelResource($this->whenLoaded('panel')),
            'progress' => new ProgressResource($this->whenLoaded('progress')),
            'progress_id' => $this->progress_id,
            'carriage_trainset' => new CarriageTrainsetResource($this->whenLoaded('carriage_trainset')),
            'carriage_panel_components' => CarriagePanelComponentResource::collection($this->whenLoaded('carriage_panel_components')),
            'panel_materials' => PanelMaterialResource::collection($this->whenLoaded('panel_materials')),
            'panel_attachments' => PanelAttachmentResource::collection($this->whenLoaded('panel_attachments')),
            'qty' => $this->qty,
            'carriage_trainset_id' => $this->carriage_trainset_id,
            'panel_id' => $this->panel_id,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
