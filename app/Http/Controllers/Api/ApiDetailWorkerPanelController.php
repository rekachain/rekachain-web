<?php

namespace App\Http\Controllers\Api;

use App\Models\DetailWorkerPanel;
use Illuminate\Http\Request;
use App\Support\Enums\IntentEnum;
use App\Http\Controllers\Controller;
use App\Http\Resources\DetailWorkerPanelResource;
use App\Support\Interfaces\Services\DetailWorkerPanelServiceInterface;

class ApiDetailWorkerPanelController extends Controller {
    public function __construct(
        protected DetailWorkerPanelServiceInterface $detailWorkerPanelService
    ) {}

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request) {
        $intent = request()->get('intent');

        if ($intent === 'api.detail.worker.panel.get.details.filter.process') {
            $request->merge(['intent' => IntentEnum::API_DETAIL_WORKER_PANEL_GET_DETAILS->value]);

            return DetailWorkerPanelResource::collection($this->detailWorkerPanelService->find(['worker_id'=> $request->logged,
            'work_status' => 'in_progress']));
        } else if ($intent === 'api.panel.attachment.get.attachments.filter.completed') {
            $request->merge(['intent' => IntentEnum::API_DETAIL_WORKER_PANEL_GET_DETAILS->value]);

            return DetailWorkerPanelResource::collection($this->detailWorkerPanelService->find(['worker_id'=> $request->logged,
            'work_status' => 'completed']));
        } else {
            $request->merge(['intent' => IntentEnum::API_DETAIL_WORKER_PANEL_GET_DETAILS->value]);

            return DetailWorkerPanelResource::collection($this->detailWorkerPanelService->find(['worker_id'=> $request->logged]));
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request) {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(DetailWorkerPanel $detailWorkerPanel, Request $request) {
        return $detailWorkerPanel;
        $request->merge(['intent' => IntentEnum::API_DETAIL_WORKER_PANEL_GET_DETAILS->value]);
        
        return DetailWorkerPanelResource::collection($this->detailWorkerPanelService->find(['worker_id'=> $request->logged, 'id' => $detailWorkerPanel->id]));
        // $request->merge(['intent' => IntentEnum::API_PANEL_ATTACHMENT_GET_ATTACHMENT_SERIAL_NUMBER_DETAILS->value]);

        // return new DetailWorkerPanelResource($serialPanel->load('detail_worker_panels.step.progress'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id) {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id) {
        //
    }
}