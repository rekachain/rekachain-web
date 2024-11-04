<?php

namespace App\Http\Controllers;

use App\Models\SerialPanel;
use Illuminate\Http\Request;

class SerialPanelController extends Controller {
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request) {
        $intent = $request->get('intent');
        dd($request);
        switch ($intent) {
            case IntentEnum::WEB_SERIAL_PANEL_DOWNLOAD_ALL_QR_CODES->value:
                $this->serialPanelService->exportAllQrCodes($request->file('serial_panel'));

                return response()->noContent();
        }

        return $this->panelService->getAllPaginated();
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
    public function show(SerialPanel $serialPanel) {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(SerialPanel $serialPanel) {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, SerialPanel $serialPanel) {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(SerialPanel $serialPanel) {
        //
    }
}
