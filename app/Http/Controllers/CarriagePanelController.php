<?php

namespace App\Http\Controllers;

use App\Http\Requests\CarriagePanel\StoreCarriagePanelRequest;
use App\Http\Requests\CarriagePanel\UpdateCarriagePanelRequest;
use App\Http\Resources\CarriagePanelResource;
use App\Models\CarriagePanel;
use App\Support\Enums\PermissionEnum;
use App\Support\Interfaces\Services\CarriagePanelServiceInterface;
use Illuminate\Http\Request;

class CarriagePanelController extends Controller {
    public function __construct(protected CarriagePanelServiceInterface $CarriagePanelService) {}

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request) {

        $request->checkPermissionEnum(PermissionEnum::CARRIAGE_PANEL_READ);

        if ($this->ajax()) {
            $perPage = request()->get('perPage', 'All');

            if ($perPage !== 'All') {
                return CarriagePanelResource::collection($this->CarriagePanelService->getAllPaginated($request->query(), $perPage));
            }

            return CarriagePanelResource::collection($this->CarriagePanelService->getAll());
        }

        return inertia('CarriagePanel/Index');

    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request) {
        $request->checkPermissionEnum(PermissionEnum::CARRIAGE_PANEL_CREATE);

        return inertia('CarriagePanel/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCarriagePanelRequest $request) {

        $request->checkPermissionEnum(PermissionEnum::CARRIAGE_PANEL_CREATE);

        return new CarriagePanelResource($this->CarriagePanelService->create($request->validated()));
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request, CarriagePanel $CarriagePanel) {

        $request->checkPermissionEnum(PermissionEnum::CARRIAGE_PANEL_READ);

        if ($this->ajax()) {
            return new CarriagePanelResource($CarriagePanel);
        }

        //        return inertia('CarriagePanel/Show', compact('CarriagePanel'));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Request $request, CarriagePanel $CarriagePanel) {

        $request->checkPermissionEnum(PermissionEnum::CARRIAGE_PANEL_UPDATE);

        return inertia('CarriagePanel/Edit', compact('CarriagePanel'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCarriagePanelRequest $request, CarriagePanel $CarriagePanel) {

        $request->checkPermissionEnum(PermissionEnum::CARRIAGE_PANEL_UPDATE);

        return new CarriagePanelResource($this->CarriagePanelService->update($CarriagePanel, $request->validated()));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, CarriagePanel $CarriagePanel) {
        $request->checkPermissionEnum(PermissionEnum::CARRIAGE_PANEL_DELETE);

        $this->CarriagePanelService->delete($CarriagePanel);

        return response()->noContent();
    }
}
