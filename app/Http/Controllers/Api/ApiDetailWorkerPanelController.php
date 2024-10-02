<?php

namespace App\Http\Controllers\Api;

use App\Models\DetailWorkerPanel;
use Illuminate\Http\Request;
use App\Support\Enums\IntentEnum;
use App\Http\Controllers\Controller;
use App\Http\Resources\DetailWorkerPanelResource;
use App\Support\Interfaces\Services\DetailWorkerPanelServiceInterface;
use Egulias\EmailValidator\Result\Reason\DetailedReason;

class ApiDetailWorkerPanelController extends Controller {
    public function __construct(
        protected DetailWorkerPanelServiceInterface $detailWorkerPanelService
    ) {}

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request) {
        $intent = request()->get('intent');

        if ($intent === IntentEnum::API_DETAIL_WORKER_PANEL_GET_DETAIL_BY_PROCESS->value) {
            $request->merge(['intent' => IntentEnum::API_DETAIL_WORKER_PANEL_GET_PANELS->value]);

            return DetailWorkerPanelResource::collection($this->detailWorkerPanelService->find(['worker_id'=> request()->user()->id,
            'work_status' => 'in_progress']));
        } else if ($intent === IntentEnum::API_DETAIL_WORKER_PANEL_GET_DETAIL_BY_DONE) {
            $request->merge(['intent' => IntentEnum::API_DETAIL_WORKER_PANEL_GET_PANELS->value]);

            return DetailWorkerPanelResource::collection($this->detailWorkerPanelService->find(['worker_id'=> request()->user()->id,
            'work_status' => 'completed']));
        } else {
            $request->merge(['intent' => IntentEnum::API_DETAIL_WORKER_PANEL_GET_PANELS->value]);

            return DetailWorkerPanelResource::collection($this->detailWorkerPanelService->find(['worker_id'=> request()->user()->id]));
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request) {
        $request->merge(['intent' => IntentEnum::API_DETAIL_WORKER_PANEL_ASSIGN_WORKER->value]);

        return $this->detailWorkerPanelService->assignWorker($request);
    }

    /**
     * Display the specified resource.
     */
    public function show(DetailWorkerPanel $detailWorkerPanel, Request $request) {
        // return $detailWorkerPanel;
        $request->merge(['intent' => IntentEnum::API_DETAIL_WORKER_PANEL_GET_PANEL_DETAILS->value]);
        
        return DetailWorkerPanelResource::collection($this->detailWorkerPanelService->find(['worker_id'=> request()->user()->id, 'id' => $detailWorkerPanel->id]));
        // $request->merge(['intent' => IntentEnum::API_PANEL_ATTACHMENT_GET_ATTACHMENT_SERIAL_NUMBER_DETAILS->value]);

        // return new DetailWorkerPanelResource($serialPanel->load('detail_worker_panels.step.progress'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(DetailWorkerPanel $detailWorkerPanel) {
        $intent = request()->get('intent');
        // return $detailWorkerPanel;
            
        if ($intent === IntentEnum::API_DETAIL_WORKER_PANEL_ACCEPT_ASSIGN_WORKER->value) {
            return $this->detailWorkerPanelService->acceptAssign($detailWorkerPanel->id);
        } else if ($intent === IntentEnum::API_DETAIL_WORKER_PANEL_DECLINE_ASSIGN_WORKER->value) {
            return $this->detailWorkerPanelService->declineAssign($detailWorkerPanel->id);
        }
        
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id) {
        //
    }
}