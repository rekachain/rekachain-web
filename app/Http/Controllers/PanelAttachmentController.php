<?php

namespace App\Http\Controllers;

use App\Http\Requests\PanelAttachment\UpdatePanelAttachmentRequest;
use App\Http\Resources\PanelAttachmentHandlerResource;
use App\Http\Resources\PanelAttachmentResource;
use App\Http\Resources\PanelResource;
use App\Http\Resources\RawMaterialResource;
use App\Http\Resources\SerialPanelResource;
use App\Models\PanelAttachment;
use App\Support\Enums\IntentEnum;
use App\Support\Interfaces\Services\CustomAttachmentMaterialServiceInterface;
use App\Support\Interfaces\Services\PanelAttachmentServiceInterface;
use Illuminate\Http\Request;

class PanelAttachmentController extends Controller {
    /**
     * Display a listing of the resource.
     */
    public function __construct(
        protected PanelAttachmentServiceInterface $panelAttachmentService,
        protected CustomAttachmentMaterialServiceInterface $customAttachmentMaterialService
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

        if ($this->ajax()) {
            switch ($intent) {
                case IntentEnum::WEB_PANEL_ATTACHMENT_GET_PANEL->value:
                    return PanelResource::make($panelAttachment->panel);
                case IntentEnum::WEB_PANEL_ATTACHMENT_GET_PANEL_WITH_QTY->value:
                    return PanelAttachmentResource::make($panelAttachment);
                case IntentEnum::WEB_PANEL_ATTACHMENT_GET_SERIAL_PANELS->value:
                    return SerialPanelResource::collection($panelAttachment->serial_panels);
                case IntentEnum::WEB_PANEL_ATTACHMENT_GET_ATTACHMENT_HANDLERS->value:
                    return PanelAttachmentHandlerResource::collection($panelAttachment->panel_attachment_handlers->load('user'));
                case IntentEnum::WEB_PANEL_ATTACHMENT_GET_ATTACHMENT_PROGRESS->value:
                    return PanelAttachmentResource::make($panelAttachment);
                case IntentEnum::WEB_PANEL_ATTACHMENT_GET_PANEL_MATERIALS->value:
                    return RawMaterialResource::collection($panelAttachment->raw_materials);
                case IntentEnum::WEB_PANEL_ATTACHMENT_GET_PANEL_MATERIALS_WITH_QTY->value:
                    return PanelAttachmentResource::make($panelAttachment);
                case IntentEnum::WEB_PANEL_ATTACHMENT_GET_CUSTOM_ATTACHMENT_MATERIAL_IMPORT_TEMPLATE->value:
                    return $this->customAttachmentMaterialService->getImportDataTemplate($panelAttachment);
                default:
                    return PanelAttachmentResource::make($panelAttachment);
            }
        }

        switch ($intent) {
            case IntentEnum::WEB_PANEL_ATTACHMENT_DOWNLOAD_PANEL_ATTACHMENT->value:
                $panelAttachment = PanelAttachmentResource::make($panelAttachment
                    ->load([
                        'raw_materials',
                        'panel_attachment_handlers.user',
                        'source_workstation.workshop',
                        'destination_workstation.workshop',
                        'carriage_panel.panel',
                        'carriage_panel.carriage_trainset.carriage',
                    ]));

                return inertia('PanelAttachment/DocumentPanelAttachment', compact('panelAttachment'));
        }

        return inertia('PanelAttachment/Show', [
            'panelAttachment' => PanelAttachmentResource::make($panelAttachment),
        ]);
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
            case IntentEnum::WEB_PANEL_ATTACHMENT_ASSIGN_REFERENCED_ATTACHMENT->value:
                return $this->customAttachmentMaterialService->addNewAttachment($panelAttachment, $request->validated())->load('parent');
            case IntentEnum::WEB_PANEL_ATTACHMENT_ASSIGN_CUSTOM_ATTACHMENT_MATERIAL->value:
                return $this->panelAttachmentService->assignCustomAttachmentMaterial($panelAttachment, $request->validated());
            case IntentEnum::WEB_PANEL_ATTACHMENT_ASSIGN_REFERENCED_ATTACHMENT_AND_MATERIAL_IMPORT->value:
                return $this->customAttachmentMaterialService->importCustomAttachmentMaterial($panelAttachment, $request->validated())->load('custom_attachment_materials');
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(PanelAttachment $panelAttachment) {
        //
    }
}
