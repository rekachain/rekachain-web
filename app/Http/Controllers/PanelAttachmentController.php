<?php

namespace App\Http\Controllers;

use App\Http\Resources\PanelAttachmentResource;
use App\Models\PanelAttachment;
use Illuminate\Http\Request;

class PanelAttachmentController extends Controller {
    /**
     * Display a listing of the resource.
     */
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
    public function update(Request $request, PanelAttachment $panelAttachment) {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(PanelAttachment $panelAttachment) {
        //
    }
}
