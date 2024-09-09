<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\SerialPanelResource;
use App\Models\SerialPanel;
use Illuminate\Http\Request;

class ApiSerialPanelController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
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
    public function show(SerialPanel $serialPanel)
    {
        $qr = request()->get('qr_code');
        if ($qr) {
            if($serialPanel->qr_code == $qr){
                return new SerialPanelResource($serialPanel);
            } else {
                return response()->json(['status' => 'Fail', 'message' => 'Invalid QR code'], 400);
            }
        }
        return response()->json(['status' => 'Fail', 'message' => 'QR code is required' ], 400);
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
