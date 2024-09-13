<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\PanelAttachmentHandlerResource;
use App\Models\PanelAttachmentHandler;
use Illuminate\Http\Request;

class ApiPanelAttachmentHandlerController extends Controller {
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request) {
        $panelAttachmentId = $request->get('panel_attachment_id');

        return PanelAttachmentHandlerResource::collection(PanelAttachmentHandler::wherePanelAttachmentId($panelAttachmentId)->get());
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
    public function show(string $id) {
        //
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
