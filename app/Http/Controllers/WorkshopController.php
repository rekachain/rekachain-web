<?php

namespace App\Http\Controllers;

use App\Http\Resources\WorkshopResource;
use App\Models\Workshop;
use App\Support\Interfaces\WorkshopServiceInterface;
use Illuminate\Http\Request;

class WorkshopController extends Controller {
    public function __construct(protected WorkshopServiceInterface $workshopService) {}

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request) {

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
    public function show(Workshop $workshop) {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Workshop $workshop) {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Workshop $workshop) {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Workshop $workshop) {
        //
    }
}