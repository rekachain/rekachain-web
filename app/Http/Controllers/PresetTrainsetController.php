<?php

namespace App\Http\Controllers;

use App\Http\Requests\PresetTrainset\StorePresetTrainsetRequest;
use App\Http\Requests\PresetTrainset\UpdatePresetTrainsetRequest;
use App\Http\Resources\PresetTrainsetResource;
use App\Models\PresetTrainset;
use App\Support\Enums\PermissionEnum;
use App\Support\Interfaces\Services\PresetTrainsetServiceInterface;
use Illuminate\Http\Request;

class PresetTrainsetController extends Controller {
    public function __construct(protected PresetTrainsetServiceInterface $presetTrainsetService) {}

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request) {

        $request->checkPermissionEnum(PermissionEnum::PRESET_TRAINSET_READ);

        if ($this->ajax()) {
            $perPage = request()->get('perPage', 'All');

            if ($perPage !== 'All') {
                return PresetTrainsetResource::collection($this->presetTrainsetService->getAllPaginated($request->query(), $perPage));
            }

            return PresetTrainsetResource::collection($this->presetTrainsetService->getAll());
        }

        return inertia('PresetTrainset/Index');

    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request) {
        $request->checkPermissionEnum(PermissionEnum::PRESET_TRAINSET_CREATE);

        return inertia('PresetTrainset/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePresetTrainsetRequest $request) {

        $request->checkPermissionEnum(PermissionEnum::PRESET_TRAINSET_CREATE);

        return new PresetTrainsetResource($this->presetTrainsetService->create($request->validated()));
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request, PresetTrainset $presetTrainset) {

        $request->checkPermissionEnum(PermissionEnum::PRESET_TRAINSET_READ);

        if ($this->ajax()) {
            return new PresetTrainsetResource($presetTrainset);
        }

        //        return inertia('PresetTrainset/Show', compact('presetTrainset'));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Request $request, PresetTrainset $presetTrainset) {

        $request->checkPermissionEnum(PermissionEnum::PRESET_TRAINSET_UPDATE);

        return inertia('PresetTrainset/Edit', compact('presetTrainset'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePresetTrainsetRequest $request, PresetTrainset $presetTrainset) {

        $request->checkPermissionEnum(PermissionEnum::PRESET_TRAINSET_UPDATE);

        return new PresetTrainsetResource($this->presetTrainsetService->update($presetTrainset, $request->validated()));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, PresetTrainset $presetTrainset) {
        $request->checkPermissionEnum(PermissionEnum::PRESET_TRAINSET_DELETE);

        $this->presetTrainsetService->delete($presetTrainset);

        return response()->noContent();
    }
}
