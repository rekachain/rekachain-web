<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\PanelAttachmentResource;
use App\Models\PanelAttachment;
use App\Support\Interfaces\Services\PanelAttachmentServiceInterface;
use Illuminate\Http\Request;

class ApiPanelAttachmentController extends Controller
{
    public function __construct(
        protected PanelAttachmentServiceInterface $panelAttachmentService
    ) {
    }
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $perPage = request()->get('perPage', 5);

        return PanelAttachmentResource::collection(
            $this->panelAttachmentService
                ->with(['source_workstation', 'destination_workstation','carriage_panel.panel', 'carriage_panel.panel_materials','carriage_trainset.carriage', 'carriage_trainset.trainset'])
                ->getAllPaginated($request->query(), $perPage)
        )->additional(['message' => 'Success']);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(PanelAttachment $panelAttachment)
    {
        return new PanelAttachmentResource($panelAttachment->load(['source_workstation', 'destination_workstation','carriage_panel.panel', 'carriage_panel.panel_materials.raw_material','carriage_trainset.carriage', 'carriage_trainset.trainset']));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
