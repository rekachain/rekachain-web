<?php

namespace App\Http\Controllers;

use App\Helpers\PermissionHelper;
use App\Http\Requests\CarriagePreset\StoreCarriagePresetRequest;
use App\Http\Requests\CarriagePreset\UpdateCarriagePresetRequest;
use App\Http\Resources\CarriagePresetResource;
use App\Models\CarriagePreset;
use App\Support\Enums\PermissionEnum;
use App\Support\Interfaces\Services\CarriagePresetServiceInterface;
use Illuminate\Http\Request;

class CarriagePresetController extends Controller {
    public function __construct(protected CarriagePresetServiceInterface $carriagePresetService) {}

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request) {

        PermissionHelper::check(PermissionEnum::CARRIAGE_PRESET_READ);

        if ($this->ajax()) {
            $perPage = request()->get('perPage', 'All');

            if ($perPage !== 'All') {
                return CarriagePresetResource::collection($this->carriagePresetService->getAllPaginated($request->query(), $perPage));
            }

            return CarriagePresetResource::collection($this->carriagePresetService->getAll());
        }

        return inertia('CarriagePreset/Index');

    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request) {
        PermissionHelper::check(PermissionEnum::CARRIAGE_PRESET_CREATE);

        return inertia('CarriagePreset/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCarriagePresetRequest $request) {

        PermissionHelper::check(PermissionEnum::CARRIAGE_PRESET_CREATE);

        return new CarriagePresetResource($this->carriagePresetService->create($request->validated()));
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request, CarriagePreset $carriagePreset) {

        PermissionHelper::check(PermissionEnum::CARRIAGE_PRESET_READ);

        if ($this->ajax()) {
            return new CarriagePresetResource($carriagePreset);
        }

        //        return inertia('CarriagePreset/Show', compact('carriagePreset'));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Request $request, CarriagePreset $carriagePreset) {

        PermissionHelper::check(PermissionEnum::CARRIAGE_PRESET_UPDATE);

        return inertia('CarriagePreset/Edit', compact('carriagePreset'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCarriagePresetRequest $request, CarriagePreset $carriagePreset) {

        PermissionHelper::check(PermissionEnum::CARRIAGE_PRESET_UPDATE);

        return new CarriagePresetResource($this->carriagePresetService->update($carriagePreset, $request->validated()));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, CarriagePreset $carriagePreset) {
        PermissionHelper::check(PermissionEnum::CARRIAGE_PRESET_DELETE);

        $this->carriagePresetService->delete($carriagePreset);

        return response()->noContent();
    }
}
