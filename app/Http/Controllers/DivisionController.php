<?php

namespace App\Http\Controllers;

use App\Http\Requests\Division\StoreDivisionRequest;
use App\Http\Requests\Division\UpdateDivisionRequest;
use App\Http\Resources\DivisionResource;
use App\Models\Division;
use App\Support\Enums\PermissionEnum;
use App\Helpers\PermissionHelper;
use App\Support\Interfaces\Services\DivisionServiceInterface;
use Illuminate\Http\Request;

class DivisionController extends Controller {
    public function __construct(protected DivisionServiceInterface $divisionService) {}

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request) {

        PermissionHelper::check(PermissionEnum::DIVISION_READ);

        if ($this->ajax()) {
            $perPage = request()->get('perPage', 5);

            if ($perPage !== 'All') {
                return DivisionResource::collection($this->divisionService->getAllPaginated($request->query(), $perPage));
            }

            return DivisionResource::collection($this->divisionService->getAll());
        }

        return inertia('Division/Index');

    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request) {
        PermissionHelper::check(PermissionEnum::DIVISION_CREATE);

        return inertia('Division/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreDivisionRequest $request) {

        PermissionHelper::check(PermissionEnum::DIVISION_CREATE);

        return new DivisionResource($this->divisionService->create($request->validated()));
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request, Division $division) {

        PermissionHelper::check(PermissionEnum::DIVISION_READ);

        if ($this->ajax()) {
            return new DivisionResource($division);
        }

        //        return inertia('Division/Show', compact('division'));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Request $request, Division $division) {

        PermissionHelper::check(PermissionEnum::DIVISION_UPDATE);

        return inertia('Division/Edit', compact('division'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateDivisionRequest $request, Division $division) {

        PermissionHelper::check(PermissionEnum::DIVISION_UPDATE);

        return new DivisionResource($this->divisionService->update($division, $request->validated()));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, Division $division) {
        PermissionHelper::check(PermissionEnum::DIVISION_DELETE);

        $this->divisionService->delete($division);

        return response()->noContent();
    }
}
