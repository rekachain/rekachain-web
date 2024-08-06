<?php

namespace App\Http\Controllers;

use App\Http\Resources\WorkshopResource;
use App\Models\Workshop;
use App\Support\Interfaces\WorkshopServiceInterface;
use Illuminate\Http\Request;

class WorkshopController extends Controller {
    public function __construct(protected WorkshopServiceInterface $WorkshopService) {}

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
    public function show(Workshop $Workshop) {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Workshop $Workshop) {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Workshop $Workshop) {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Workshop $Workshop) {
        //
    }
}