<?php

namespace App\Http\Resources;

use App\Support\Enums\IntentEnum;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PanelAttachmentResource extends JsonResource {
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array {
        $intent = $request->get('intent');

        switch ($intent) {
            case IntentEnum::API_PANEL_ATTACHMENT_GET_ATTACHMENTS->value:
                return [
                    'id' => $this->id,
                    'attachment_number' => $this->attachment_number,
                    'source_workstation' => new WorkstationResource($this->source_workstation()->with('workshop', 'division')->first()),
                    'destination_workstation' => new WorkstationResource($this->destination_workstation()->with('workshop', 'division')->first()),
                    'project' => $this->carriage_panel->carriage_trainset->trainset->project->name,
                    'trainset' => $this->carriage_panel->carriage_trainset->trainset->name,
                    'carriage' => $this->carriage_panel->carriage_trainset->carriage->type,
                    'panel' => $this->carriage_panel->panel->name,
                    'qr_code' => $this->qr_code,
                    'qr_path' => $this->qr_path,
                    'status' => $this->status,
                    'supervisor_id' => $this->supervisor_id,
                    'supervisor_name' => $this->supervisor?->name,
                    'supervisor' => UserResource::make($this->whenLoaded('supervisor')),
                    'created_at' => $this->created_at,
                    'updated_at' => $this->updated_at,
                ];
            case IntentEnum::API_PANEL_ATTACHMENT_GET_ATTACHMENT_DETAILS->value:
                return [
                    'id' => $this->id,
                    'attachment_number' => $this->attachment_number,
                    'project' => new ProjectResource($this->carriage_panel?->carriage_trainset->trainset->project),
                    'trainset' => new TrainsetResource($this->carriage_panel?->carriage_trainset->trainset),
                    'carriage_trainset' => new CarriageTrainsetResource($this->carriage_panel?->carriage_trainset()->with('carriage')->without('trainset')->first()),
                    'carriage_panel' => new CarriagePanelResource($this->carriage_panel),
                    'source_workstation' => new WorkstationResource($this->source_workstation()->with('workshop', 'division')->first()),
                    'destination_workstation' => new WorkstationResource($this->destination_workstation()->with('workshop', 'division')->first()),
                    'qr_code' => $this->qr_code,
                    'qr_path' => $this->qr_path,
                    'current_step' => $this->current_step,
                    'elapsed_time' => $this->elapsed_time,
                    'status' => $this->status,
                    'supervisor' => new UserResource($this->supervisor),
                    'panel_attachment_handlers' => PanelAttachmentHandlerResource::collection($this->panel_attachment_handlers),
                    'serial_panels' => SerialPanelResource::collection($this->serial_panels),
                    'created_at' => $this->created_at,
                    'updated_at' => $this->updated_at,
                ];
            case IntentEnum::API_PANEL_ATTACHMENT_GET_ATTACHMENT_MATERIALS->value:
                $panelAttachment = $this->load(['carriage_panel' => ['carriage_trainset', 'panel_materials']]);

                $materials = $panelAttachment->carriage_panel->panel_materials->map(function ($panelMaterial) use ($panelAttachment) {
                    $totalQty = $panelAttachment->carriage_panel->carriage_trainset->qty * $panelAttachment->carriage_panel->qty * $panelMaterial->qty;

                    return [
                        'raw_material_id' => $panelMaterial->raw_material_id,
                        'material_code' => $panelMaterial->raw_material->material_code,
                        'material_description' => $panelMaterial->raw_material->description,
                        'total_qty' => $totalQty,
                    ];
                });

                return [
                    'attachment_number' => $this->attachment_number,
                    'total_materials' => $materials->count(),
                    'materials' => $materials,
                ];
            case IntentEnum::API_PANEL_ATTACHMENT_GET_ATTACHMENT_PROGRESS->value:
                $panelAttachment = $this->load(['serial_panels'=> ['detail_worker_panels'=>['progress_step']]]);

                $serialPanels = $panelAttachment->serial_panels->map(function ($serialPanel) use ($panelAttachment) {
                    $steps = collect();
                    $serialPanel->detail_worker_panels->map(function ($detailWorkerPanel) use (&$steps) {
                        $workers = collect();
                        $step = $steps->firstWhere('id', $detailWorkerPanel->progress_step->step->id);
                        if (!$step) {
                            $workers->push([
                                'nip'=>$detailWorkerPanel->worker->nip,
                                'name'=>$detailWorkerPanel->worker->name,
                                'started_at'=>$detailWorkerPanel->created_at->toDateTimeString(),
                            ]);
                            $steps->push([
                                'id' => $detailWorkerPanel->progress_step->step->id,
                                'progress_step_id' => $detailWorkerPanel->progress_step->id,
                                'step_name'=>$detailWorkerPanel->progress_step->step->name,
                                'step_process'=>$detailWorkerPanel->progress_step->step->process,
                                'estimated_time'=>$detailWorkerPanel->progress_step->step->estimated_time,
                                'workers' => $workers
                            ]);
                        } else {
                            $step['workers']->push([
                                'nip'=>$detailWorkerPanel->worker->nip,
                                'name'=>$detailWorkerPanel->worker->name,
                                'started_at'=>$detailWorkerPanel->created_at->toDateTimeString(),
                            ]);
                        }
                    });
                    return [
                        'serial_number' => $serialPanel->id,
                        'progress' => $serialPanel->detail_worker_panels->first()->progress_step->progress->with('work_aspect')->first(),
                        'total_steps' => $steps->count(),
                        'steps' => $steps->sortBy('progress_step_id')->map(function ($step) {
                            unset($step['id']);
                            unset($step['progress_step_id']);
                            return $step;
                        })->values(),
                    ];
                });

                return [
                    'attachment_number' => $this->attachment_number,
                    'total_progresses' => $serialPanels->count(),
                    'serial_panels' => $serialPanels,
                ];
            case IntentEnum::API_PANEL_ATTACHMENT_GET_ATTACHMENT_SERIAL_NUMBER_DETAILS->value:
                return [
                    'attachment_number' => $this->attachment_number,
                    'source_workstation' => $this->source_workstation->name,
                    'status' => $this->status,
                    'destination_workstation' => $this->destination_workstation->name,
                    'trainset' => $this->carriage_panel->carriage_trainset->trainset->name,
                    'carriage' => $this->carriage_panel->carriage_trainset->carriage->type,
                    'panel' => $this->carriage_panel->panel->name,
                    'created_at' => $this->created_at,
                    'updated_at' => $this->updated_at,
                ];
            case IntentEnum::WEB_PANEL_ATTACHMENT_GET_PANEL_MATERIALS->value:
                $panelAttachment = $this->load(['carriage_panel' => ['carriage_trainset', 'panel_materials']]);

                $materialQuantities = $panelAttachment->carriage_panel->panel_materials->map(function ($panelMaterial) use ($panelAttachment) {
                    $totalQty = $panelAttachment->carriage_panel->carriage_trainset->qty * $panelAttachment->carriage_panel->qty * $panelMaterial->qty;

                    return [
                        'id' => $panelMaterial->id,
                        'raw_material_id' => $panelMaterial->raw_material_id,
                        'qty' => $totalQty,
                        'created_at' => $panelMaterial->created_at,
                        'updated_at' => $panelMaterial->updated_at,
                    ];
                });

                return [
                    'id' => $this->id,
                    'carriage_panel_id' => $this->carriage_panel_id,
                    'source_workstation_id' => $this->source_workstation_id,
                    'destination_workstation_id' => $this->destination_workstation_id,
                    'attachment_number' => $this->attachment_number,
                    'qr_code' => $this->qr_code,
                    'qr_path' => $this->qr_path,
                    'current_step' => $this->current_step,
                    'elapsed_time' => $this->elapsed_time,
                    'status' => $this->status,
                    'panel_attachment_id' => $this->panel_attachment_id,
                    'supervisor_id' => $this->supervisor_id,
                    'created_at' => $this->created_at,
                    'updated_at' => $this->updated_at,
                    'panel_materials' => $materialQuantities,
                ];

            default:
                return [
                    'id' => $this->id,
                    'attachment_number' => $this->attachment_number,
                    'source_workstation_id' => $this->source_workstation_id,
                    'source_workstation' => new WorkstationResource($this->whenLoaded('source_workstation')),
                    'destination_workstation_id' => $this->destination_workstation_id,
                    'destination_workstation' => new WorkstationResource($this->whenLoaded('destination_workstation')),
                    'carriage_panel_id' => $this->carriage_panel_id,
                    'carriage_panel' => new CarriagePanelResource($this->whenLoaded('carriage_panel')),
                    'qr_code' => $this->qr_code,
                    'qr_path' => $this->qr_path,
                    'serial_panels' => SerialPanelResource::collection($this->whenLoaded('serial_panels')),
                    // 'current_step' => $this->current_step,
                    'elapsed_time' => $this->elapsed_time,
                    'status' => $this->status,
                    'panel_attachment_id' => $this->panel_attachment_id,
                    'supervisor_id' => $this->supervisor_id,
                    'supervisor' => new UserResource($this->whenLoaded('supervisor')),
                    'panel_attachment_handlers' => PanelAttachmentHandlerResource::collection($this->whenLoaded('panel_attachment_handlers')),
                    'created_at' => $this->created_at,
                    'updated_at' => $this->updated_at,
                ];
        }
    }
}