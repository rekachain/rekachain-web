<?php

namespace App\Http\Controllers;

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
    
    public function index() {
        //
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
    public function show(PanelAttachment $panelAttachment) {
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