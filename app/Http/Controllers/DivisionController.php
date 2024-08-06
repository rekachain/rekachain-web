<?php

namespace App\Http\Controllers;

use App\Http\Resources\DivisionResource;
use App\Models\Division;
use App\Support\Enums\PermissionEnum;
use App\Support\Interfaces\DivisionServiceInterface;
use Illuminate\Http\Request;

class DivisionController extends Controller {
    public function __construct(protected DivisionServiceInterface $divisionService) {}

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request) {
        $request->checkPermission(PermissionEnum::DIVISION_READ);

        if ($this->ajax()) {
            return DivisionResource::collection($this->divisionService->getAll());
        }

        return inertia('Division/Index');
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
    public function show(Division $division) {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Division $division) {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Division $division) {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Division $division) {
        //
    }
}
