<?php

namespace App\Http\Controllers;

use App\Http\Requests\Workshop\StoreWorkshopRequest;
use App\Http\Requests\Workshop\UpdateWorkshopRequest;
use App\Http\Resources\WorkshopResource;
use App\Models\Workshop;
use App\Support\Enums\PermissionEnum;
use App\Support\Interfaces\WorkshopServiceInterface;
use Illuminate\Http\Request;

class WorkshopController extends Controller {
    public function __construct(protected WorkshopServiceInterface $workshopService) {}

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request) {

        $request->checkPermissionEnum(PermissionEnum::WORKSHOP_READ);

        if ($this->ajax()) {
            $perPage = request()->get('perPage', 'All');

            if ($perPage !== 'All') {
                return WorkshopResource::collection($this->workshopService->getAllPaginated($request->query(), $perPage));
            }

            return WorkshopResource::collection($this->workshopService->getAll());
        }

        return inertia('Workshop/Index');

    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request) {
        $request->checkPermissionEnum(PermissionEnum::WORKSHOP_CREATE);

        return inertia('Workshop/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreWorkshopRequest $request) {

        $request->checkPermissionEnum(PermissionEnum::WORKSHOP_CREATE);

        return new WorkshopResource($this->workshopService->create($request->validated()));
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request, Workshop $workshop) {

        $request->checkPermissionEnum(PermissionEnum::WORKSHOP_READ);

        if ($this->ajax()) {
            return new WorkshopResource($workshop);
        }

        //        return inertia('Workshop/Show', compact('workshop'));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Request $request, Workshop $workshop) {

        $request->checkPermissionEnum(PermissionEnum::WORKSHOP_UPDATE);

        $workshop = new WorkshopResource($workshop);

        return inertia('Workshop/Edit', compact('workshop'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateWorkshopRequest $request, Workshop $workshop) {

        $request->checkPermissionEnum(PermissionEnum::WORKSHOP_UPDATE);

        return new WorkshopResource($this->workshopService->update($workshop, $request->validated()));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, Workshop $workshop) {
        $request->checkPermissionEnum(PermissionEnum::WORKSHOP_DELETE);

        $this->workshopService->delete($workshop);

        return response()->noContent();
    }
}
