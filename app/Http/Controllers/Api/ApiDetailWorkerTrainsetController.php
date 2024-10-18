<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Support\Enums\RoleEnum;
use App\Models\DetailWorkerTrainset;
use App\Support\Enums\IntentEnum;
use App\Http\Controllers\Controller;
use App\Http\Requests\DetailWorkerTrainset\UpdateDetailWorkerTrainsetRequest;
use App\Http\Resources\DetailWorkerTrainsetResource;
use App\Support\Enums\DetailWorkerTrainsetWorkStatusEnum;
use App\Support\Interfaces\Services\DetailWorkerTrainsetServiceInterface;

class ApiDetailWorkerTrainsetController extends Controller {
    public function __construct(
        protected DetailWorkerTrainsetServiceInterface $detailWorkerTrainsetService
    ) {}

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request) {
        $perPage = request()->get('perPage', 5);
        $intent = request()->get('intent');

        switch ($intent) {
            case IntentEnum::API_DETAIL_WORKER_TRAINSETS_BY_STATUS->value:
                $status = request()->get('work_status');
                if (!$status) {
                    abort(400, 'Status not identified');
                }
                if (!in_array($status, array_column(DetailWorkerTrainsetWorkStatusEnum::cases(), 'value'), true)) {
                    abort(400, 'Status not included in DetailWorkerTrainsetWorkStatusEnum');
                }
                $request->merge([
                    'intent' => IntentEnum::API_DETAIL_WORKER_TRAINSET_GET_TRAINSETS->value,
                    'column_filters' => [
                        'work_status'=>$status,
                    ],
                ]);
                return DetailWorkerTrainsetResource::collection($this->detailWorkerTrainsetService->getAllPaginated($request->query(), $perPage));
            case IntentEnum::API_DETAIL_WORKER_TRAINSETS_BY_CURRENT_USER->value:
                // if (!$request->user()->hasRole(RoleEnum::QC_ASSEMBLY)) {
                //     abort(403, 'Unauthorized');
                // }

                $request->merge([
                    'intent' => IntentEnum::API_DETAIL_WORKER_TRAINSET_GET_TRAINSETS->value,
                    'column_filters' => [
                        'worker_id'=> $request->user()->id
                    ]
                ]);
                return DetailWorkerTrainsetResource::collection($this->detailWorkerTrainsetService->getAllPaginated($request->query(), $perPage));
            case IntentEnum::API_DETAIL_WORKER_TRAINSETS_BY_STATUS_AND_CURRENT_USER->value:
                $status = request()->get('work_status');
                if (!$status) {
                    abort(400, 'Status not identified');
                }
                if (!in_array($status, DetailWorkerTrainsetWorkStatusEnum::toArray(), true)) {
                    abort(400, 'Status not included in DetailWorkerTrainsetStatusEnum');
                }
                // if (!$request->user()->hasRole(RoleEnum::SUPERVISOR_ASSEMBLY)) {
                //     abort(403, 'Unauthorized');
                // }
                
                $request->merge(['intent' => IntentEnum::API_DETAIL_WORKER_TRAINSET_GET_TRAINSETS->value]);
        
                return DetailWorkerTrainsetResource::collection($this->detailWorkerTrainsetService->getAllPaginated(array_merge($request->query(), [
                    'column_filters' => [
                        'worker_id'=> $request->user()->id,
                        'work_status' => $status
                    ]
                ]), $perPage));
            default:
                return DetailWorkerTrainsetResource::collection($this->detailWorkerTrainsetService->getAllPaginated($request->query(), $perPage));
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
    public function show(DetailWorkerTrainset $detailWorkerTrainset, Request $request) {
        $request->merge(['intent' => IntentEnum::API_DETAIL_WORKER_TRAINSET_GET_WORK_DETAILS->value]);

        return DetailWorkerTrainsetResource::make($detailWorkerTrainset->load(['progress_step.progress','progress_step.step']));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(DetailWorkerTrainset $detailWorkerTrainset, UpdateDetailWorkerTrainsetRequest $request) {
        $intent = request()->get('intent');
        switch ($intent) {
            case IntentEnum::API_DETAIL_WORKER_TRAINSET_ASSIGN_REQUEST_WORKER->value:
                if (!$request->user()->hasRole([RoleEnum::SUPERVISOR_MEKANIK, RoleEnum::SUPERVISOR_ELEKTRIK])) {
                    abort(403, 'Unauthorized');
                }
                return $this->detailWorkerTrainsetService->requestAssign($detailWorkerTrainset, $request);
            case
            IntentEnum::API_DETAIL_WORKER_TRAINSET_REJECT_WORK->value:
                if (!$request->user()->hasRole([RoleEnum::QC_MEKANIK, RoleEnum::QC_ELEKTRIK])) {
                    abort(403, 'Unauthorized');
                }
                return $this->detailWorkerTrainsetService->rejectWork($detailWorkerTrainset->id, $request);
            case IntentEnum::API_DETAIL_WORKER_TRAINSET_ACCEPT_WORK_WITH_IMAGE->value: 
                if (!$request->user()->hasRole([RoleEnum::WORKER_MEKANIK, RoleEnum::WORKER_ELEKTRIK])) {
                    abort(403, 'Unauthorized');
                }
                return $this->detailWorkerTrainsetService->updateAndAcceptWorkWithImage($detailWorkerTrainset, $request->validated());
        }    
        
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id) {
        //
    }
}