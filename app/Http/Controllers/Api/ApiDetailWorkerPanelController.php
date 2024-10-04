<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Support\Enums\RoleEnum;
use App\Models\DetailWorkerPanel;
use App\Support\Enums\IntentEnum;
use App\Http\Controllers\Controller;
use App\Http\Resources\DetailWorkerPanelResource;
use App\Support\Enums\DetailWorkerPanelWorkStatusEnum;
use App\Support\Interfaces\Services\DetailWorkerPanelServiceInterface;

class ApiDetailWorkerPanelController extends Controller {
    public function __construct(
        protected DetailWorkerPanelServiceInterface $detailWorkerPanelService
    ) {}

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request) {
        $perPage = request()->get('perPage', 5);
        $intent = request()->get('intent');

        switch ($intent) {
            case IntentEnum::API_DETAIL_WORKER_PANELS_BY_STATUS->value:
                $status = request()->get('work_status');
                if (!$status) {
                    abort(400, 'Status not identified');
                }
                if (!in_array($status, array_column(DetailWorkerPanelWorkStatusEnum::cases(), 'value'), true)) {
                    abort(400, 'Status not included in DetailWorkerPanelWorkStatusEnum');
                }
                $request->merge([
                    'intent' => IntentEnum::API_DETAIL_WORKER_PANEL_GET_PANELS->value,
                    'column_filters' => [
                        'work_status'=>$status,
                    ],
                ]);
                return DetailWorkerPanelResource::collection($this->detailWorkerPanelService->getAllPaginated($request->query(), $perPage));
            case IntentEnum::API_DETAIL_WORKER_PANELS_BY_CURRENT_USER->value:
                // if (!$request->user()->hasRole(RoleEnum::QC_ASSEMBLY)) {
                //     abort(403, 'Unauthorized');
                // }

                $request->merge([
                    'intent' => IntentEnum::API_DETAIL_WORKER_PANEL_GET_PANELS->value,
                    'column_filters' => [
                        'worker_id'=> $request->user()->id
                    ]
                ]);
                return DetailWorkerPanelResource::collection($this->detailWorkerPanelService->getAllPaginated($request->query(), $perPage));
            case IntentEnum::API_DETAIL_WORKER_PANELS_BY_STATUS_AND_CURRENT_USER->value:
                $status = request()->get('work_status');
                if (!$status) {
                    abort(400, 'Status not identified');
                }
                if (!in_array($status, DetailWorkerPanelWorkStatusEnum::toArray(), true)) {
                    abort(400, 'Status not included in PanelAttachmentStatusEnum');
                }
                // if (!$request->user()->hasRole(RoleEnum::SUPERVISOR_ASSEMBLY)) {
                //     abort(403, 'Unauthorized');
                // }
                
                $request->merge(['intent' => IntentEnum::API_DETAIL_WORKER_PANEL_GET_PANELS->value]);
        
                return DetailWorkerPanelResource::collection($this->detailWorkerPanelService->getAllPaginated(array_merge($request->query(), [
                    'column_filters' => [
                        'worker_id'=> $request->user()->id,
                        'work_status' => $status
                    ]
                ]), $perPage));
        }

        // if ($intent === IntentEnum::API_DETAIL_WORKER_PANEL_GET_DETAIL_BY_PROCESS->value) {
        //     $request->merge(['intent' => IntentEnum::API_DETAIL_WORKER_PANEL_GET_PANELS->value]);

        //     return DetailWorkerPanelResource::collection($this->detailWorkerPanelService->find(['worker_id'=> request()->user()->id,
        //     'work_status' => 'in_progress']));
        // } else if ($intent === IntentEnum::API_DETAIL_WORKER_PANEL_GET_DETAIL_BY_DONE) {
        //     $request->merge(['intent' => IntentEnum::API_DETAIL_WORKER_PANEL_GET_PANELS->value]);

        //     return DetailWorkerPanelResource::collection($this->detailWorkerPanelService->find(['worker_id'=> request()->user()->id,
        //     'work_status' => 'completed']));
        // } else {
        //     $request->merge(['intent' => IntentEnum::API_DETAIL_WORKER_PANEL_GET_PANELS->value]);

        //     return DetailWorkerPanelResource::collection($this->detailWorkerPanelService->find(['worker_id'=> request()->user()->id]));
        // }
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