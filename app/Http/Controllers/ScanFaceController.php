<?php

namespace App\Http\Controllers;

use App\Models\ScanFace;
use Illuminate\Http\Request;

class ScanFaceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $data =  ScanFace::all();
        return view('vendor.l5-swagger.scanFace', compact('data'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = ScanFace::create([
           'user_id' => $request->user_id,
           'image_path' => $request->image_path,
           'kpm' => $request->kpm,
           'panel' => $request->panel,
           'status' => $request->status
        ]);

        return $data;
    }

    /**
     * Display the specified resource.
     */
    public function show(ScanFace $scanFace)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(ScanFace $scanFace)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, ScanFace $scanFace)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ScanFace $scanFace)
    {
        //
    }
}
