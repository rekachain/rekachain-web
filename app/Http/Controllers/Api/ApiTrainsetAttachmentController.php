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
                    abort(403, 'Unauthorized');
                }

                $request->merge([
                    'intent' => IntentEnum::API_TRAINSET_ATTACHMENT_GET_ATTACHMENTS->value,
                    'column_filters' => [
                        'supervisor_id' => $request->user()->id,
                    ]
                ]);
                return TrainsetAttachmentResource::collection($this->trainsetAttachmentService->getAllPaginated($request->query(), $perPage));
            case IntentEnum::API_TRAINSET_ATTACHMENT_GET_ATTACHMENTS_BY_STATUS_AND_CURRENT_USER->value:
                if (!$request->user()->hasRole([RoleEnum::SUPERVISOR_MEKANIK, RoleEnum::SUPERVISOR_ELEKTRIK])) {
                    abort(403, 'Unauthorized');
                }

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
                        'supervisor_id' => $request->user()->id,
                    ]
                ]);
                return TrainsetAttachmentResource::collection($this->trainsetAttachmentService->getAllPaginated($request->query(), $perPage));
            default:
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
        $perPage = request()->get('perPage', 5);
        
        switch ($intent) {
            case IntentEnum::API_TRAINSET_ATTACHMENT_GET_ATTACHMENT_DETAILS->value:
                // if (!$request->user()->hasRole(RoleEnum::SUPERVISOR_ASSEMBLY)) {
                //     abort(403, 'Unauthorized');
                // }
                $request->merge(['intent' => IntentEnum::API_TRAINSET_ATTACHMENT_GET_ATTACHMENT_DETAILS->value]);
                return TrainsetAttachmentResource::collection($this->trainsetAttachmentService->getAllPaginated(array_merge($request->query(), [
                    'column_filters' => [
                        'supervisor_id'=> $request->user()->id,
                        'id' => $trainsetAttachment->id
                    ]
                ]), $perPage));
            // case IntentEnum::API_PANEL_ATTACHMENT_GET_ATTACHMENT_DETAILS_WITH_QR->value:
            //     $qr = request()->get('qr_code');
            //     if ($qr) {
            //         if ($panelAttachment->qr_code == $qr) {
            //             $request->merge(['intent' => IntentEnum::API_PANEL_ATTACHMENT_GET_ATTACHMENT_DETAILS->value]);
            //             return new PanelAttachmentResource($panelAttachment);
            //         }
            //         abort(400, 'Invalid KPM QR code');
            //     } else {
            //         abort(400, 'QR code not identified');
            //     }
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTrainsetAttachmentRequest $request, TrainsetAttachment $trainsetAttachment) {
        return $this->trainsetAttachmentService->update($trainsetAttachment, $request->validated());
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, TrainsetAttachment $trainsetAttachment) {
        return $this->trainsetAttachmentService->delete($trainsetAttachment);
    }
}