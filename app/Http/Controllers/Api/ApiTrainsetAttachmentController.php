<?php

namespace App\Http\Controllers\Api;

use App\Http\Requests\TrainsetAttachment\StoreTrainsetAttachmentRequest;
use App\Http\Requests\TrainsetAttachment\UpdateTrainsetAttachmentRequest;
use App\Http\Resources\TrainsetAttachmentResource;
use App\Models\TrainsetAttachment;
use App\Support\Enums\IntentEnum;
use App\Support\Enums\RoleEnum;
use App\Support\Enums\TrainsetAttachmentStatusEnum;
use App\Support\Interfaces\Services\TrainsetAttachmentServiceInterface;
use Illuminate\Http\Request;

class ApiTrainsetAttachmentController extends ApiController {
    public function __construct(
        protected TrainsetAttachmentServiceInterface $trainsetAttachmentService
    ) {}

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request) {
        $perPage = request()->get('perPage', 5);
        $intent = request()->get('intent');

        switch ($intent) {
            case IntentEnum::API_TRAINSET_ATTACHMENT_GET_ATTACHMENTS->value:
                return TrainsetAttachmentResource::collection($this->trainsetAttachmentService->getAllPaginated($request->query(), $perPage));
            case IntentEnum::API_TRAINSET_ATTACHMENT_GET_ATTACHMENTS_BY_STATUS->value:
                $status = request()->get('status');
                if (!$status) {
                    abort(400, 'Status not identified');
                }
                if (!in_array($status, TrainsetAttachmentStatusEnum::toArray(), true)) {
                    abort(400, 'Status not included in TrainsetAttachmentStatusEnum');
                }
                $request->merge([
                    'intent' => IntentEnum::API_TRAINSET_ATTACHMENT_GET_ATTACHMENTS->value,
                    'column_filters' => [
                        'status'=>$status,
                    ],
                ]);
                return TrainsetAttachmentResource::collection($this->trainsetAttachmentService->getAllPaginated($request->query(), $perPage));
            case IntentEnum::API_TRAINSET_ATTACHMENT_GET_ATTACHMENTS_BY_CURRENT_USER->value:
                if (!$request->user()->hasRole([RoleEnum::SUPERVISOR_MEKANIK, RoleEnum::SUPERVISOR_ELEKTRIK])) {
                    if (!$request->user()->hasRole([RoleEnum::WORKER_MEKANIK, RoleEnum::WORKER_ELEKTRIK, RoleEnum::QC_MEKANIK, RoleEnum::QC_ELEKTRIK])) {
                        abort(403, 'Unauthorized');
                    }
                    $request->merge([
                        'intent' => IntentEnum::API_TRAINSET_ATTACHMENT_GET_ATTACHMENTS->value,
                        'relation_column_filters' => [
                            'detail_worker_trainsets' => ['worker_id' => $request->user()->id],
                        ]
                    ]);
                    return TrainsetAttachmentResource::collection($this->trainsetAttachmentService->getAllPaginated($request->query(), $perPage));
                }

                $request->merge([
                    'intent' => IntentEnum::API_TRAINSET_ATTACHMENT_GET_ATTACHMENTS->value,
                    'column_filters' => [
                        'supervisor_id' => $request->user()->id,
                    ]
                ]);
                return TrainsetAttachmentResource::collection($this->trainsetAttachmentService->getAllPaginated($request->query(), $perPage));
            case IntentEnum::API_TRAINSET_ATTACHMENT_GET_ATTACHMENTS_BY_STATUS_AND_CURRENT_USER->value:
                $status = request()->get('status');
                if (!$status) {
                    abort(400, 'Status not identified');
                }
                if (!in_array($status, TrainsetAttachmentStatusEnum::toArray(), true)) {
                    abort(400, 'Status not included in TrainsetAttachmentStatusEnum');
                }
                if (!$request->user()->hasRole([RoleEnum::SUPERVISOR_MEKANIK, RoleEnum::SUPERVISOR_ELEKTRIK])) {
                    if (!$request->user()->hasRole([RoleEnum::WORKER_MEKANIK, RoleEnum::WORKER_ELEKTRIK, RoleEnum::QC_MEKANIK, RoleEnum::QC_ELEKTRIK])) {
                        abort(403, 'Unauthorized');
                    }
                    $request->merge([
                        'intent' => IntentEnum::API_TRAINSET_ATTACHMENT_GET_ATTACHMENTS->value,
                        'column_filters' => [
                            'status'=>$status,
                        ],
                        'relation_column_filters' => [
                            'detail_worker_trainsets' => ['worker_id' => $request->user()->id],
                        ]
                    ]);
                    return TrainsetAttachmentResource::collection($this->trainsetAttachmentService->getAllPaginated($request->query(), $perPage));
                }
                $request->merge([
                    'intent' => IntentEnum::API_TRAINSET_ATTACHMENT_GET_ATTACHMENTS->value,
                    'column_filters' => [
                        'status'=>$status,
                        'supervisor_id' => $request->user()->id,
                    ]
                ]);
                return TrainsetAttachmentResource::collection($this->trainsetAttachmentService->getAllPaginated($request->query(), $perPage));
            default:
                $request->merge([
                    'intent' => IntentEnum::API_TRAINSET_ATTACHMENT_GET_ATTACHMENTS->value
                ]);
                return TrainsetAttachmentResource::collection($this->trainsetAttachmentService->getAllPaginated($request->query(), $perPage));
        }

    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTrainsetAttachmentRequest $request) {
        return $this->trainsetAttachmentService->create($request->validated());
    }

    /**
     * Display the specified resource.
     */
    public function show(TrainsetAttachment $trainsetAttachment, Request $request) {
        $intent = request()->get('intent');
        
        switch ($intent) {
            case IntentEnum::API_TRAINSET_ATTACHMENT_GET_ATTACHMENT_DETAILS->value:
                return TrainsetAttachmentResource::make($trainsetAttachment);
            case IntentEnum::API_TRAINSET_ATTACHMENT_GET_ATTACHMENT_MATERIALS->value:
                return TrainsetAttachmentResource::make($trainsetAttachment);
            case IntentEnum::API_TRAINSET_ATTACHMENT_GET_ATTACHMENT_DETAILS_WITH_QR->value:
                $qr = request()->get('qr_code');
                if ($qr) {
                    if ($trainsetAttachment->qr_code == $qr) {
                        $request->merge(['intent' => IntentEnum::API_TRAINSET_ATTACHMENT_GET_ATTACHMENT_DETAILS->value]);
                        return TrainsetAttachmentResource::make($trainsetAttachment);
                    }
                    abort(400, 'Invalid KPM QR code');
                } else {
                    abort(400, 'QR code not identified');
                }
            default:
                return TrainsetAttachmentResource::make($trainsetAttachment);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTrainsetAttachmentRequest $request, TrainsetAttachment $trainsetAttachment) {
        $intent = request()->get('intent');

        switch ($intent) {
            case IntentEnum::API_TRAINSET_ATTACHMENT_ASSIGN_WORKER->value:
                if (!$request->user()->hasRole([RoleEnum::SUPERVISOR_ELEKTRIK, RoleEnum::SUPERVISOR_MEKANIK])) {
                    abort(403, 'Unauthorized');
                }
                return $this->trainsetAttachmentService->assignWorker($trainsetAttachment, $request->validated());
            case IntentEnum::API_TRAINSET_ATTACHMENT_CONFIRM_KPM_BY_SPV->value:
                if (!$request->user()->hasRole([RoleEnum::SUPERVISOR_ELEKTRIK, RoleEnum::SUPERVISOR_MEKANIK])) {
                    abort(403, 'Unauthorized');
                }
                return $this->trainsetAttachmentService->confirmKPM($trainsetAttachment, $request->validated());    
            case IntentEnum::API_TRAINSET_ATTACHMENT_UPDATE_ASSIGN_SPV_AND_RECEIVER->value:
                if (!$request->user()->hasRole(RoleEnum::SUPERVISOR_MEKANIK) || !$request->user()->hasRole(RoleEnum::SUPERVISOR_ELEKTRIK)) {
                    abort(403, __('validation.custom.auth.role_exception', ['role' => RoleEnum::SUPERVISOR_MEKANIK->value . ' / ' . RoleEnum::SUPERVISOR_ELEKTRIK->value]));
                    
                }
                return TrainsetAttachmentResource::make($this->trainsetAttachmentService->assignSpvAndReceiver($trainsetAttachment, $request->validated())->load('trainset_attachment_handlers'));
            default:
                return $this->trainsetAttachmentService->update($trainsetAttachment, $request->validated());
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, TrainsetAttachment $trainsetAttachment) {
        return $this->trainsetAttachmentService->delete($trainsetAttachment);
    }
}