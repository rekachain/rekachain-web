<?php

namespace App\Http\Controllers;

use App\Http\Requests\PanelAttachment\UpdatePanelAttachmentRequest;
use App\Http\Resources\PanelAttachmentResource;
use App\Http\Resources\RawMaterialResource;
use App\Models\PanelAttachment;
use App\Support\Enums\IntentEnum;
use App\Support\Interfaces\Services\PanelAttachmentServiceInterface;
use Illuminate\Http\Request;

class PanelAttachmentController extends Controller {
    /**
     * Display a listing of the resource.
     */
    public function __construct(
        protected PanelAttachmentServiceInterface $panelAttachmentService,
    ) {}

    public function index(Request $request) {
        $perPage = $request->get('perPage', 10);

        return PanelAttachmentResource::collection(
            $this->panelAttachmentService->getAllPaginated($request->query(), $perPage)
        );
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create() {
        //
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
    public function show(Request $request, PanelAttachment $panelAttachment) {
        $intent = $request->get('intent');
        logger($intent);

        switch ($intent) {
            case IntentEnum::WEB_PANEL_ATTACHMENT_GET_PANEL_MATERIALS->value:
                return RawMaterialResource::collection($panelAttachment->raw_materials);
            case IntentEnum::WEB_PANEL_ATTACHMENT_GET_PANEL_MATERIALS_WITH_QTY->value:
                return PanelAttachmentResource::make($panelAttachment);
            case IntentEnum::WEB_PANEL_ATTACHMENT_DOWNLOAD_PANEL_ATTACHMENT->value:
                $panelAttachment = PanelAttachmentResource::make($panelAttachment->load('raw_materials'));

                return inertia('PanelAttachment/DocumentPanelAttachment', compact('panelAttachment'));
        }

        return PanelAttachmentResource::make($panelAttachment);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(PanelAttachment $panelAttachment) {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePanelAttachmentRequest $request, PanelAttachment $panelAttachment) {
        $intent = $request->get('intent');

        switch ($intent) {
            case IntentEnum::WEB_PANEL_ATTACHMENT_ASSIGN_CUSTOM_ATTACHMENT_MATERIAL->value:
                return $this->panelAttachmentService->assignCustomAttachmentMaterial($panelAttachment, $request->validated());
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(PanelAttachment $panelAttachment) {
        //
    }
}
