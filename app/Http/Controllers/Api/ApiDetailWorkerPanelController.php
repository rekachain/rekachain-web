<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\DetailWorkerPanel\StoreDetailWorkerPanelRequest;
use App\Http\Requests\DetailWorkerPanel\UpdateDetailWorkerPanelRequest;
use App\Http\Resources\DetailWorkerPanelResource;
use App\Models\DetailWorkerPanel;
use App\Support\Enums\DetailWorkerPanelWorkStatusEnum;
use App\Support\Enums\IntentEnum;
use App\Support\Enums\RoleEnum;
use App\Support\Interfaces\Services\DetailWorkerPanelServiceInterface;
use Illuminate\Http\Request;

class ApiDetailWorkerPanelController extends Controller {
    public function __construct(
        protected DetailWorkerPanelServiceInterface $detailWorkerPanelService
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
            if ($workerId && !\Auth::user()->hasRole(RoleEnum::SUPERVISOR_ASSEMBLY)) {// TODO: use checkPermissions
                abort(400, __('exception.auth.role.role_exception', ['role' => RoleEnum::SUPERVISOR_ASSEMBLY->value]));
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
        } elseif (!\Auth::user()->hasRole(RoleEnum::SUPERVISOR_ASSEMBLY)) {// TODO: use checkPermissions
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
                        'work_status' => $status,
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
                        'worker_id' => $request->user()->id,
                    ],
                ]);

                return DetailWorkerPanelResource::collection($this->detailWorkerPanelService->getAllPaginated($request->query(), $perPage));
            case IntentEnum::API_DETAIL_WORKER_PANELS_BY_STATUS_AND_CURRENT_USER->value:
                $status = request()->get('work_status');
                if (!$status) {
                    abort(400, 'Status not identified');
                }
                if (!in_array($status, DetailWorkerPanelWorkStatusEnum::toArray(), true)) {
                    abort(400, 'Status not included in DetailWorkerPanelStatusEnum');
                }
                // if (!$request->user()->hasRole(RoleEnum::SUPERVISOR_ASSEMBLY)) {
                //     abort(403, 'Unauthorized');
                // }

                $request->merge(['intent' => IntentEnum::API_DETAIL_WORKER_PANEL_GET_PANELS->value]);

                return DetailWorkerPanelResource::collection($this->detailWorkerPanelService->getAllPaginated(array_merge($request->query(), [
                    'column_filters' => [
                        'worker_id' => $request->user()->id,
                        'work_status' => $status,
                    ],
                ]), $perPage));
            case IntentEnum::API_DETAIL_WORKER_PANELS_GET_ALL_REQUEST_WORKER->value:
                $acceptance_status = request()->get('acceptance_status');
                if (!$request->user()->hasRole(RoleEnum::SUPERVISOR_ASSEMBLY)) {
                    abort(403, 'Unauthorized');
                }

                $request->merge([
                    'intent' => IntentEnum::API_DETAIL_WORKER_PANEL_GET_PANEL_DETAILS->value,
                ]);

                if ($acceptance_status == 'all') {
                    return DetailWorkerPanelResource::collection($this->detailWorkerPanelService->getAllPaginated($request->query(), $perPage));
                } elseif ($acceptance_status == 'pending') {
                    return DetailWorkerPanelResource::collection($this->detailWorkerPanelService->getAllPaginated(array_merge($request->query(), [
                        'column_filters' => [
                            'acceptance_status' => null,
                        ],
                    ]), $perPage));
                }

                return DetailWorkerPanelResource::collection($this->detailWorkerPanelService->getAllPaginated(array_merge($request->query(), [
                    'column_filters' => [
                        'acceptance_status' => $acceptance_status,
                    ],
                ]), $perPage));

            default:
                return DetailWorkerPanelResource::collection($this->detailWorkerPanelService->getAllPaginated($request->query(), $perPage));
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreDetailWorkerPanelRequest $request) {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(DetailWorkerPanel $detailWorkerPanel, Request $request) {
        $intent = request()->get('intent');
        switch ($intent) {
            case IntentEnum::API_DETAIL_WORKER_PANEL_GET_WORK_DETAILS->value:
                return DetailWorkerPanelResource::make($detailWorkerPanel->load('progress_step.progress', 'progress_step.step', 'panel_attachment'));
            case IntentEnum::API_DETAIL_WORKER_PANEL_GET_PANEL_DETAILS->value:
                $request->merge(['intent' => IntentEnum::API_DETAIL_WORKER_PANEL_GET_PANEL_DETAILS->value]);

                return DetailWorkerPanelResource::collection($this->detailWorkerPanelService->getAllPaginated(array_merge($request->query(), [
                    'column_filters' => [
                        'worker_id' => $request->user()->id,
                        'id' => $detailWorkerPanel->id,
                    ],
                ])));
            default:
                return DetailWorkerPanelResource::make($detailWorkerPanel);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateDetailWorkerPanelRequest $request, DetailWorkerPanel $detailWorkerPanel) {
        $intent = $request->get('intent');

        switch ($intent) {
            case IntentEnum::API_DETAIL_WORKER_PANEL_ASSIGN_REQUEST_WORKER->value:
                if (!$request->user()->hasRole(RoleEnum::SUPERVISOR_ASSEMBLY)) {
                    abort(403, 'Unauthorized');
                }

                $request->merge([
                    'intent' => IntentEnum::API_DETAIL_WORKER_PANEL_GET_PANEL_DETAILS->value,
                ]);

                $data = $this->detailWorkerPanelService->requestAssign($detailWorkerPanel->id, $request);

                return (new DetailWorkerPanelResource($data))->toArray($request);
            case IntentEnum::API_DETAIL_WORKER_PANEL_ACCEPT_WORK_WITH_IMAGE->value:
                if (!$request->user()->hasRole([RoleEnum::WORKER_ASSEMBLY, RoleEnum::QC_ASSEMBLY])) {
                    abort(403, 'Unauthorized');
                }

                return $this->detailWorkerPanelService->updateAndAcceptWorkWithImage($detailWorkerPanel, $request->validated());
            default:
                return DetailWorkerPanelResource::make($this->detailWorkerPanelService->update($detailWorkerPanel, $request->validated()));
        }

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id) {
        //
    }
}
