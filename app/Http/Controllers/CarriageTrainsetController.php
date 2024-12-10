<?php

namespace App\Http\Controllers;

use App\Helpers\PermissionHelper;
use App\Http\Requests\CarriageTrainset\StoreCarriageTrainsetRequest;
use App\Http\Requests\CarriageTrainset\UpdateCarriageTrainsetRequest;
use App\Http\Resources\CarriageTrainsetResource;
use App\Models\CarriageTrainset;
use App\Support\Enums\IntentEnum;
use App\Support\Enums\PermissionEnum;
use App\Support\Interfaces\Services\CarriageTrainsetServiceInterface;
use Illuminate\Http\Request;

class CarriageTrainsetController extends Controller {
    // TODO: update trainset_preset_id to null

    public function __construct(protected CarriageTrainsetServiceInterface $carriageTrainsetService) {}

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request) {

        PermissionHelper::check(PermissionEnum::CARRIAGE_PRESET_READ);

        if ($this->ajax()) {
            $perPage = request()->get('perPage', 'All');

            if ($perPage !== 'All') {
                return CarriageTrainsetResource::collection($this->carriageTrainsetService->getAllPaginated($request->query(), $perPage));
            }

            return CarriageTrainsetResource::collection($this->carriageTrainsetService->getAll());
        }

        return inertia('CarriageTrainset/Index');

    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request) {
        PermissionHelper::check(PermissionEnum::CARRIAGE_PRESET_CREATE);

        return inertia('CarriageTrainset/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCarriageTrainsetRequest $request) {

        PermissionHelper::check(PermissionEnum::CARRIAGE_PRESET_CREATE);

        return new CarriageTrainsetResource($this->carriageTrainsetService->create($request->validated()));
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request, CarriageTrainset $carriageTrainset) {

        PermissionHelper::check(PermissionEnum::CARRIAGE_PRESET_READ);

        if ($this->ajax()) {
            return new CarriageTrainsetResource($carriageTrainset);
        }

        //        return inertia('CarriageTrainset/Show', compact('carriagePreset'));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Request $request, CarriageTrainset $carriageTrainset) {

        PermissionHelper::check(PermissionEnum::CARRIAGE_PRESET_UPDATE);

        return inertia('CarriageTrainset/Edit', compact('carriageTrainset'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCarriageTrainsetRequest $request, CarriageTrainset $carriageTrainset) {

        PermissionHelper::check(PermissionEnum::CARRIAGE_PRESET_UPDATE);

        $intent = $request->get('intent');

        switch ($intent) {
            case IntentEnum::WEB_CARRIAGE_TRAINSET_ADD_CARRIAGE_PANEL->value:
                return $this->carriageTrainsetService->addPanel($carriageTrainset, $request->validated());
        }

        return new CarriageTrainsetResource($this->carriageTrainsetService->update($carriageTrainset, $request->validated()));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, CarriageTrainset $carriageTrainset) {
        PermissionHelper::check(PermissionEnum::CARRIAGE_PRESET_DELETE);

        $this->carriageTrainsetService->delete($carriageTrainset);

        return response()->noContent();
    }
}
