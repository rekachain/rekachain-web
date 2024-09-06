<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\PanelAttachmentResource;
use App\Http\Resources\SerialPanelResource;
use App\Models\PanelAttachment;
use App\Models\SerialPanel;
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

        $request->merge(['intent' => IntentEnum::API_PANEL_ATTACHMENT_INDEX->value]);

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
        $qr = request()->get('qr_code');

        if ($qr) {
            switch ($intent) {
                case IntentEnum::API_PANEL_ATTACHMENT_SERIAL_NUMBER->value:
                    $serialPanel = SerialPanel::wherePanelAttachmentId($panelAttachment->id)->whereQrCode($qr)->first();
                    if ($serialPanel) {
                        $request->merge(['intent' => IntentEnum::API_PANEL_ATTACHMENT_SERIAL_NUMBER->value]);
                        return new SerialPanelResource($serialPanel, $request->all());
                    } else {
                        return response()->json(['status' => 'Fail', 'message' => 'Invalid QR code' ], 400);
                    }
                default:
                    if($panelAttachment->qr_code == $qr){
                        return new PanelAttachmentResource($panelAttachment->load(['source_workstation', 'destination_workstation', 'carriage_panel.panel', 'carriage_panel.panel_materials.raw_material', 'carriage_trainset.carriage', 'carriage_trainset.trainset']));
                    } else {
                        return response()->json(['status' => 'Fail', 'message' => 'Invalid QR code' ], 400);
                    }
            }
        }
        return response()->json(['status' => 'Fail', 'message' => 'QR code is required' ], 400);
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
