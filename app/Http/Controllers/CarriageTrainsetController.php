<?php

namespace App\Http\Controllers;

use App\Http\Requests\CarriageTrainset\StoreCarriageTrainsetRequest;
use App\Http\Requests\CarriageTrainset\UpdateCarriageTrainsetRequest;
use App\Http\Resources\CarriageTrainsetResource;
use App\Models\CarriageTrainset;
use App\Support\Enums\PermissionEnum;
use App\Support\Interfaces\Services\CarriageTrainsetServiceInterface;
use Illuminate\Http\Request;

class CarriageTrainsetController extends Controller {
    public function __construct(protected CarriageTrainsetServiceInterface $carriagePresetService) {}

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request) {

        $request->checkPermissionEnum(PermissionEnum::CARRIAGE_PRESET_READ);

        if ($this->ajax()) {
            $perPage = request()->get('perPage', 'All');

            if ($perPage !== 'All') {
                return CarriageTrainsetResource::collection($this->carriagePresetService->getAllPaginated($request->query(), $perPage));
            }

            return CarriageTrainsetResource::collection($this->carriagePresetService->getAll());
        }

        return inertia('CarriageTrainset/Index');

    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request) {
        $request->checkPermissionEnum(PermissionEnum::CARRIAGE_PRESET_CREATE);

        return inertia('CarriageTrainset/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCarriageTrainsetRequest $request) {

        $request->checkPermissionEnum(PermissionEnum::CARRIAGE_PRESET_CREATE);

        return new CarriageTrainsetResource($this->carriagePresetService->create($request->validated()));
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request, CarriageTrainset $carriagePreset) {

        $request->checkPermissionEnum(PermissionEnum::CARRIAGE_PRESET_READ);

        if ($this->ajax()) {
            return new CarriageTrainsetResource($carriagePreset);
        }

        //        return inertia('CarriageTrainset/Show', compact('carriagePreset'));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Request $request, CarriageTrainset $carriagePreset) {

        $request->checkPermissionEnum(PermissionEnum::CARRIAGE_PRESET_UPDATE);

        return inertia('CarriageTrainset/Edit', compact('carriagePreset'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCarriageTrainsetRequest $request, CarriageTrainset $carriagePreset) {

        $request->checkPermissionEnum(PermissionEnum::CARRIAGE_PRESET_UPDATE);

        return new CarriageTrainsetResource($this->carriagePresetService->update($carriagePreset, $request->validated()));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, CarriageTrainset $carriagePreset) {
        $request->checkPermissionEnum(PermissionEnum::CARRIAGE_PRESET_DELETE);

        $this->carriagePresetService->delete($carriagePreset);

        return response()->noContent();
    }
}
