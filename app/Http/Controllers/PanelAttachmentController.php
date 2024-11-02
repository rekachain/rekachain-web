<?php

namespace App\Http\Controllers;

use App\Http\Requests\PanelAttachment\UpdatePanelAttachmentRequest;
use App\Http\Resources\RawMaterialResource;
use App\Support\Enums\IntentEnum;
use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Models\PanelAttachment;
use App\Http\Resources\PanelAttachmentResource;
use App\Support\Interfaces\Services\PanelAttachmentServiceInterface;

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
                return $panelAttachment->panel_materials
                ->groupBy(['raw_material_id'])->map(function ($panelMaterials) {
                    return [
                        'raw_material' => RawMaterialResource::make($panelMaterials->first()->raw_material),
                        'total_qty' => $panelMaterials->sum(function ($panelMaterial) {
                            return $panelMaterial->qty * $panelMaterial->carriage_panel->carriage_trainset->qty;
                        }),
                    ];
                })->values();
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