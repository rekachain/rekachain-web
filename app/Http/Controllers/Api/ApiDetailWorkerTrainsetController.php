<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\DetailWorkerTrainset\StoreDetailWorkerTrainsetRequest;
use App\Http\Requests\DetailWorkerTrainset\UpdateDetailWorkerTrainsetRequest;
use App\Http\Resources\DetailWorkerTrainsetResource;
use App\Models\DetailWorkerTrainset;
use App\Support\Enums\DetailWorkerTrainsetWorkStatusEnum;
use App\Support\Enums\IntentEnum;
use App\Support\Enums\RoleEnum;
use App\Support\Interfaces\Services\DetailWorkerTrainsetServiceInterface;
use Illuminate\Http\Request;

class ApiDetailWorkerTrainsetController extends Controller {
    public function __construct(
        protected DetailWorkerTrainsetServiceInterface $detailWorkerTrainsetService
    ) {}

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request) {
        // TODO: use checkPermissions
        $perPage = request()->get('perPage', 5);
        $intent = request()->get('intent');
        if (array_key_exists('worker_id', request()->get('column_filters') ?? [])) {
            $workerId = $request->input('column_filters.worker_id');
            if ($workerId && !\Auth::user()->hasRole([RoleEnum::SUPERVISOR_MEKANIK, RoleEnum::SUPERVISOR_ELEKTRIK])) {// TODO: use checkPermissions
                abort(400, __('exception.auth.role.role_exception', ['role' => RoleEnum::SUPERVISOR_MEKANIK->value . ' / ' . RoleEnum::SUPERVISOR_ELEKTRIK->value]));
            } elseif (!$workerId) {
                $request->merge([
                    'column_filters' => array_merge(
                        $request->get('column_filters') ?? [],
                        [
                            'worker_id' => \Auth::user()->id,
                        ]
                    ),
                ]);
            }
        } elseif (!\Auth::user()->hasRole([RoleEnum::SUPERVISOR_MEKANIK, RoleEnum::SUPERVISOR_ELEKTRIK])) {// TODO: use checkPermissions
            $request->merge([
                'column_filters' => array_merge(
                    $request->get('column_filters') ?? [],
                    [
                        'worker_id' => \Auth::user()->id,
                    ]
                ),
            ]);
        }

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
                        'work_status' => $status,
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
                        'worker_id' => $request->user()->id,
                    ],
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
                        'worker_id' => $request->user()->id,
                        'work_status' => $status,
                    ],
                ]), $perPage));
            default:
                return DetailWorkerTrainsetResource::collection($this->detailWorkerTrainsetService->getAllPaginated($request->query(), $perPage));
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreDetailWorkerTrainsetRequest $request) {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(DetailWorkerTrainset $detailWorkerTrainset, Request $request) {
        $intent = request()->get('intent');

        switch ($intent) {
            case IntentEnum::API_DETAIL_WORKER_TRAINSET_GET_WORK_DETAILS->value:
                return DetailWorkerTrainsetResource::make($detailWorkerTrainset->load(['progress_step.progress', 'progress_step.step']));
            default:
                return DetailWorkerTrainsetResource::make($detailWorkerTrainset);
        }
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
            case IntentEnum::API_DETAIL_WORKER_TRAINSET_REJECT_WORK->value:
                if (!$request->user()->hasRole([RoleEnum::QC_MEKANIK, RoleEnum::QC_ELEKTRIK, RoleEnum::SUPERVISOR_MEKANIK, RoleEnum::SUPERVISOR_ELEKTRIK])) {
                    abort(403, 'Unauthorized');
                }

                return DetailWorkerTrainsetResource::make($this->detailWorkerTrainsetService->rejectWork($detailWorkerTrainset, $request->validated())->load('failed_component_manufactures'));
            case IntentEnum::API_DETAIL_WORKER_TRAINSET_ACCEPT_WORK_WITH_IMAGE->value:
                if (!$request->user()->hasRole([RoleEnum::WORKER_MEKANIK, RoleEnum::WORKER_ELEKTRIK, RoleEnum::QC_MEKANIK, RoleEnum::QC_ELEKTRIK])) {
                    abort(403, 'Unauthorized');
                }

                return $this->detailWorkerTrainsetService->updateAndAcceptWorkWithImage($detailWorkerTrainset, $request->validated());
            default:
                return DetailWorkerTrainsetResource::make($this->detailWorkerTrainsetService->update($detailWorkerTrainset, $request->validated()));
        }

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id) {
        //
    }
}
