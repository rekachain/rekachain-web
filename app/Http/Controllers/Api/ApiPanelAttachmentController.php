<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\PanelAttachmentResource;
use App\Http\Resources\SerialPanelResource;
use App\Models\PanelAttachment;
use App\Support\Enums\IntentEnum;
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

        $request->merge(['intent' => IntentEnum::API_PANEL_ATTACHMENT_GET_ATTACHMENTS->value]);

        return PanelAttachmentResource::collection($this->panelAttachmentService->getAllPaginated($request->query(), $perPage));
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
    public function show(PanelAttachment $panelAttachment, Request $request) {
        $intent = request()->get('intent');

        switch ($intent) {
            case IntentEnum::API_PANEL_ATTACHMENT_GET_ATTACHMENT_DETAILS->value:
                return new PanelAttachmentResource($panelAttachment);
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
        }
        abort(404, 'NOTHING TO SHOW🗿');
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
