<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\PanelAttachment\StorePanelAttachmentRequest;
use App\Http\Requests\PanelAttachment\UpdatePanelAttachmentRequest;
use App\Http\Resources\PanelAttachmentResource;
use App\Http\Resources\SerialPanelResource;
use App\Models\PanelAttachment;
use App\Support\Enums\IntentEnum;
use App\Support\Enums\PanelAttachmentStatusEnum;
use App\Support\Enums\PermissionEnum;
use App\Support\Enums\RoleEnum;
use App\Support\Interfaces\Services\PanelAttachmentServiceInterface;
use App\Support\Interfaces\Services\SerialPanelServiceInterface;
use Illuminate\Http\Request;

class ApiPanelAttachmentController extends Controller {
    public function __construct(
        protected PanelAttachmentServiceInterface $panelAttachmentService,
        protected SerialPanelServiceInterface $serialPanelService
    ) {}

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request) {
        $perPage = request()->get('perPage', 5);
        $intent = request()->get('intent');

        switch ($intent) {
            case IntentEnum::API_PANEL_ATTACHMENT_GET_ATTACHMENTS_BY_STATUS->value:
                $status = request()->get('status');
                if (!$status) {
                    abort(400, 'Status not identified');
                }
                if (!in_array($status, array_column(PanelAttachmentStatusEnum::cases(), 'value'), true)) {
                    abort(400, 'Status not included in PanelAttachmentStatusEnum');
                }
                $request->merge([
                    'intent' => IntentEnum::API_PANEL_ATTACHMENT_GET_ATTACHMENTS->value,
                    'column_filters' => [
                        'status' => $status,
                    ],
                ]);

                return PanelAttachmentResource::collection($this->panelAttachmentService->getAllPaginated($request->query(), $perPage));

            case IntentEnum::API_PANEL_ATTACHMENT_GET_ATTACHMENTS_BY_CURRENT_USER->value:
                if (!$request->user()->hasRole(RoleEnum::SUPERVISOR_ASSEMBLY)) {
                    if (!$request->user()->hasRole([RoleEnum::WORKER_ASSEMBLY, RoleEnum::QC_ASSEMBLY])) {
                        abort(403, 'Unauthorized');
                    }
                    $request->merge([
                        'intent' => IntentEnum::API_PANEL_ATTACHMENT_GET_ATTACHMENTS->value,
                        'relation_column_filters' => [
                            'detail_worker_panels' => [
                                'worker_id' => $request->user()->id,
                            ],
                        ],
                    ]);

                    return PanelAttachmentResource::collection($this->panelAttachmentService->getAllPaginated($request->query(), $perPage));
                }

                $request->merge([
                    'intent' => IntentEnum::API_PANEL_ATTACHMENT_GET_ATTACHMENTS->value,
                    'column_filters' => [
                        'supervisor_id' => $request->user()->id,
                    ],
                ]);

                return PanelAttachmentResource::collection($this->panelAttachmentService->getAllPaginated($request->query(), $perPage));

            case IntentEnum::API_PANEL_ATTACHMENT_GET_ATTACHMENTS_BY_STATUS_AND_CURRENT_USER->value:
                $status = request()->get('status');
                if (!$status) {
                    abort(400, 'Status not identified');
                }
                if (!in_array($status, PanelAttachmentStatusEnum::toArray(), true)) {
                    abort(400, 'Status not included in PanelAttachmentStatusEnum');
                }
                if (!$request->user()->hasRole(RoleEnum::SUPERVISOR_ASSEMBLY)) {
                    if (!$request->user()->hasRole([RoleEnum::WORKER_ASSEMBLY, RoleEnum::QC_ASSEMBLY])) {
                        abort(403, 'Unauthorized');
                    }
                    $request->merge([
                        'intent' => IntentEnum::API_PANEL_ATTACHMENT_GET_ATTACHMENTS->value,
                        'column_filters' => [
                            'status' => $status,
                        ],
                        'relation_column_filters' => [
                            'detail_worker_panels' => [
                                'worker_id' => $request->user()->id,
                            ],
                        ],
                    ]);

                    return PanelAttachmentResource::collection($this->panelAttachmentService->getAllPaginated($request->query(), $perPage));
                }

                $request->merge(['intent' => IntentEnum::API_PANEL_ATTACHMENT_GET_ATTACHMENTS->value]);

                return PanelAttachmentResource::collection($this->panelAttachmentService->getAllPaginated(array_merge($request->query(), [
                    'column_filters' => [
                        'supervisor_id' => $request->user()->id,
                        'status' => $status,
                    ],
                ]), $perPage));

            default:
                $request->merge(['intent' => IntentEnum::API_PANEL_ATTACHMENT_GET_ATTACHMENTS->value]);

                return PanelAttachmentResource::collection($this->panelAttachmentService->getAllPaginated($request->query(), $perPage));
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePanelAttachmentRequest $request) {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(PanelAttachment $panelAttachment, Request $request) {
        $intent = request()->get('intent');
        $perPage = request()->get('perPage', 5);

        switch ($intent) {
            case IntentEnum::API_PANEL_ATTACHMENT_GET_ATTACHMENT_DETAILS->value:
                if (!$request->user()->hasRole(RoleEnum::SUPERVISOR_ASSEMBLY)) {
                    abort(403, 'Unauthorized');
                }

                $request->merge(['intent' => IntentEnum::API_PANEL_ATTACHMENT_GET_ATTACHMENT_DETAILS->value]);

                return PanelAttachmentResource::make($panelAttachment);
            case IntentEnum::API_PANEL_ATTACHMENT_GET_ATTACHMENT_MATERIALS->value:
                return PanelAttachmentResource::make($panelAttachment);
            case IntentEnum::API_PANEL_ATTACHMENT_GET_ATTACHMENT_DETAILS_WITH_QR->value:
                $qr = request()->get('qr_code');
                if ($qr) {
                    if ($panelAttachment->qr_code == $qr) {
                        $request->merge(['intent' => IntentEnum::API_PANEL_ATTACHMENT_GET_ATTACHMENT_DETAILS->value]);

                        return new PanelAttachmentResource($panelAttachment);
                    }
                    abort(400, 'Invalid KPM QR code');
                } else {
                    abort(400, 'QR code not identified');
                }

            case IntentEnum::API_PANEL_ATTACHMENT_GET_ATTACHMENT_SERIAL_NUMBERS->value:
                $request->merge(['intent' => IntentEnum::API_PANEL_ATTACHMENT_GET_ATTACHMENT_SERIAL_NUMBERS->value]);

                return SerialPanelResource::collection($this->serialPanelService->find([
                    'panel_attachment_id' => $panelAttachment->id,
                ]));
            case IntentEnum::API_PANEL_ATTACHMENT_GET_ATTACHMENT_SERIAL_NUMBER_DETAILS_WITH_QR->value:
                $qr = request()->get('qr_code');
                if ($qr) {
                    $serialPanel = $this->serialPanelService->find([
                        'panel_attachment_id' => $panelAttachment->id,
                        'qr_code' => $qr,
                    ])->first();

                    if ($serialPanel) {
                        $request->merge(['intent' => IntentEnum::API_PANEL_ATTACHMENT_GET_ATTACHMENT_SERIAL_NUMBER_DETAILS->value]);

                        return new SerialPanelResource($serialPanel);
                    }
                    abort(400, 'Invalid SN QR code');
                }
                abort(400, 'QR code not identified');
            case IntentEnum::API_RETURNED_PRODUCT_GET_ATTACHMENT_SERIAL_NUMBER_DETAILS_WITH_QR->value:
                $qr = request()->get('qr_code');
                if ($qr) {
                    $serialPanel = $this->serialPanelService->find([
                        'panel_attachment_id' => $panelAttachment->id,
                        'qr_code' => $qr,
                    ])->first();

                    if ($serialPanel) {
                        $request->merge(['intent' => IntentEnum::API_RETURNED_PRODUCT_GET_RETURNED_PRODUCT_DETAILS->value]);

                        return SerialPanelResource::make($serialPanel);
                    }
                    abort(400, 'Invalid SN QR code');
                }
                abort(400, 'QR code not identified');
            default:
                return PanelAttachmentResource::make($panelAttachment);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(PanelAttachment $panelAttachment, UpdatePanelAttachmentRequest $request) {
        $intent = request()->get('intent');
        switch ($intent) {
            case IntentEnum::API_PANEL_ATTACHMENT_CONFIRM_KPM_BY_SPV->value:
                if (!$request->user()->hasRole(RoleEnum::SUPERVISOR_ASSEMBLY)) {
                    abort(403, 'Unauthorized');
                }

                return $this->panelAttachmentService->confirmKPM($panelAttachment, $request->validated());
            case IntentEnum::API_PANEL_ATTACHMENT_UPDATE_ATTACHMENT_STATUS->value:
                if (!checkPermissions(PermissionEnum::PANEL_ATTACHMENT_UPDATE, true) && !\Auth::user()->hasRole(RoleEnum::SUPERVISOR_ASSEMBLY)) {
                    return response()->json([
                        'message' => [
                            __('exception.auth.permission.permission_exception', ['permission' => PermissionEnum::PANEL_ATTACHMENT_UPDATE->value]),
                            __('exception.auth.role.role_exception', ['role' => RoleEnum::SUPERVISOR_ASSEMBLY->value]),
                        ],
                    ], 403);
                }

                return PanelAttachmentResource::make($this->panelAttachmentService->update($panelAttachment, $request->validated())->load('attachment_notes', 'panel_attachment_handlers'));
            case IntentEnum::API_PANEL_ATTACHMENT_REJECT_KPM->value:
                if (!$request->user()->hasRole(RoleEnum::SUPERVISOR_ASSEMBLY)) {
                    abort(403, 'Unauthorized');
                }
                $rejectedKpm = $this->panelAttachmentService->rejectKpm($panelAttachment->id, $request);

                return PanelAttachmentResource::make($rejectedKpm);
            case IntentEnum::API_PANEL_ATTACHMENT_UPDATE_ASSIGN_SPV_AND_RECEIVER->value:
                if (!$request->user()->hasRole(RoleEnum::SUPERVISOR_ASSEMBLY)) {
                    abort(403, __('exception.auth.role.role_exception', ['role' => RoleEnum::SUPERVISOR_ASSEMBLY->value]));
                }

                return PanelAttachmentResource::make(($this->panelAttachmentService->assignSpvAndReceiver($panelAttachment, $request->validated())->load('panel_attachment_handlers')));
            case IntentEnum::API_PANEL_ATTACHMENT_ASSIGN_HANDLER->value:
                return PanelAttachmentResource::make(($this->panelAttachmentService->assignHandler($panelAttachment, $request->validated())->load('panel_attachment_handlers')));
            default:
                return PanelAttachmentResource::make($this->panelAttachmentService->update($panelAttachment, $request->validated()));
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id) {
        //
    }
}
