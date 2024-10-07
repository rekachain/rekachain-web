<?php

namespace App\Http\Controllers;

use App\Http\Requests\Workstation\StoreWorkstationRequest;
use App\Http\Requests\Workstation\UpdateWorkstationRequest;
use App\Http\Resources\WorkstationResource;
use App\Models\Workstation;
use App\Support\Enums\PermissionEnum;
use App\Support\Interfaces\Services\DivisionServiceInterface;
use App\Support\Interfaces\Services\WorkshopServiceInterface;
use App\Support\Interfaces\Services\WorkstationServiceInterface;
use Illuminate\Http\Request;

class WorkstationController extends Controller {
    public function __construct(
        protected WorkstationServiceInterface $workstationService,
        protected WorkshopServiceInterface $workshopService,
        protected DivisionServiceInterface $divisionService
    ) {
        //
    }

    public function index(Request $request) {

        $request->checkPermissionEnum(PermissionEnum::WORKSTATION_READ);

        if ($this->ajax()) {
            $perPage = request()->get('perPage', 5);

            return WorkstationResource::collection($this->workstationService->getAllPaginated($request->query(), $perPage));
        }

        return inertia('Workstation/Index');

    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request) {
        $request->checkPermissionEnum(PermissionEnum::WORKSTATION_CREATE);

        // sementara
        $workshops = $this->workshopService->getAll();
        $divisions = $this->divisionService->getAll();

        return inertia('Workstation/Create', [
            'workshops' => $workshops,
            'divisions' => $divisions,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreWorkstationRequest $request) {

        $request->checkPermissionEnum(PermissionEnum::WORKSTATION_CREATE);

        return new WorkstationResource($this->workstationService->create($request->validated()));
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request, Workstation $workstation) {

        $request->checkPermissionEnum(PermissionEnum::WORKSTATION_READ);

        if ($this->ajax()) {
            return new WorkstationResource($workstation);
        }

        //        return inertia('Workstation/Show', compact('workstation'));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Request $request, Workstation $workstation) {

        $request->checkPermissionEnum(PermissionEnum::WORKSTATION_UPDATE);

        // sementara
        $workshops = $this->workshopService->getAll();
        $divisions = $this->divisionService->getAll();

        return inertia('Workstation/Edit', compact('workstation', 'workshops', 'divisions'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateWorkstationRequest $request, Workstation $workstation) {

        $request->checkPermissionEnum(PermissionEnum::WORKSTATION_UPDATE);

        return new WorkstationResource($this->workstationService->update($workstation, $request->validated()));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, Workstation $workstation) {
        $request->checkPermissionEnum(PermissionEnum::WORKSTATION_DELETE);

        $this->workstationService->delete($workstation);

        return response()->noContent();
    }
}
