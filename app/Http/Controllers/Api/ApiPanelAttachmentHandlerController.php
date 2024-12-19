<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\PanelAttachmentHandlerResource;
use App\Support\Interfaces\Services\PanelAttachmentHandlerServiceInterface;
use Illuminate\Http\Request;

class ApiPanelAttachmentHandlerController extends Controller {
    public function __construct(
        private PanelAttachmentHandlerServiceInterface $panelAttachmentHandlerService
    ) {}

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request) {
        $perPage = $request->get('perPage', 5);

        return PanelAttachmentHandlerResource::collection($this->panelAttachmentHandlerService->getAllPaginated($request->query(), $perPage));
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
