<?php

namespace App\Http\Controllers;

use App\Models\PresetTrainset;
use Illuminate\Http\Request;

class PresetTrainsetController extends Controller {
    /**
     * Display a listing of the resource.
     */
    public function index() {
        //        return PresetTrainset::with([
        //            'carriagePresets' => [
        //                'carriage',
        //            ],
        //        ])->get();
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
    public function show(PresetTrainset $presetTrainset) {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(PresetTrainset $presetTrainset) {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, PresetTrainset $presetTrainset) {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(PresetTrainset $presetTrainset) {
        //
    }
}
