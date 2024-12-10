<?php

namespace App\Http\Controllers;

use App\Helpers\PermissionHelper;
use App\Http\Requests\CarriagePanel\StoreCarriagePanelRequest;
use App\Http\Requests\CarriagePanel\UpdateCarriagePanelRequest;
use App\Http\Resources\CarriagePanelResource;
use App\Models\CarriagePanel;
use App\Support\Enums\IntentEnum;
use App\Support\Enums\PermissionEnum;
use App\Support\Interfaces\Services\CarriagePanelServiceInterface;
use Illuminate\Http\Request;

class CarriagePanelController extends Controller {
    // TODO: update trainset_preset_id to null

    public function __construct(protected CarriagePanelServiceInterface $carriagePanelService) {}

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request) {

        PermissionHelper::check(PermissionEnum::CARRIAGE_PANEL_READ);

        if ($this->ajax()) {
            $perPage = request()->get('perPage', 'All');

            if ($perPage !== 'All') {
                return CarriagePanelResource::collection($this->carriagePanelService->getAllPaginated($request->query(), $perPage));
            }

            return CarriagePanelResource::collection($this->carriagePanelService->getAll());
        }

        return inertia('CarriagePanel/Index');

    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request) {
        PermissionHelper::check(PermissionEnum::CARRIAGE_PANEL_CREATE);

        return inertia('CarriagePanel/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCarriagePanelRequest $request) {

        PermissionHelper::check(PermissionEnum::CARRIAGE_PANEL_CREATE);

        return new CarriagePanelResource($this->carriagePanelService->create($request->validated()));
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request, CarriagePanel $CarriagePanel) {

        PermissionHelper::check(PermissionEnum::CARRIAGE_PANEL_READ);

        if ($this->ajax()) {
            return new CarriagePanelResource($CarriagePanel);
        }

        //        return inertia('CarriagePanel/Show', compact('CarriagePanel'));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Request $request, CarriagePanel $CarriagePanel) {

        PermissionHelper::check(PermissionEnum::CARRIAGE_PANEL_UPDATE);

        return inertia('CarriagePanel/Edit', compact('CarriagePanel'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCarriagePanelRequest $request, CarriagePanel $CarriagePanel) {
        if ($this->ajax()) {
            $intent = $request->get('intent');

            switch ($intent) {
                case IntentEnum::WEB_CARRIAGE_PANEL_IMPORT_PROGRESS_AND_MATERIAL->value:
                    return $this->carriagePanelService->importProgressMaterialData($request->file('file'), $CarriagePanel);
                case IntentEnum::WEB_CARRIAGE_PANEL_ADD_COMPONENT->value:
                    return $this->carriagePanelService->addComponent($CarriagePanel, $request->validated());
                case IntentEnum::WEB_CARRIAGE_PANEL_ADD_RAW_MATERIAL->value:
                    return $this->carriagePanelService->addRawMaterial($CarriagePanel, $request->validated());
                case IntentEnum::WEB_CARRIAGE_PANEL_CHANGE_PROGRESS->value:
                    return $this->carriagePanelService->changeProgress($CarriagePanel, $request->validated());
            }

            return new CarriagePanelResource($this->carriagePanelService->update($CarriagePanel, $request->validated()));
        }

        PermissionHelper::check(PermissionEnum::CARRIAGE_PANEL_UPDATE);

        return new CarriagePanelResource($this->carriagePanelService->update($CarriagePanel, $request->validated()));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, CarriagePanel $CarriagePanel) {
        PermissionHelper::check(PermissionEnum::CARRIAGE_PANEL_DELETE);

        $this->carriagePanelService->delete($CarriagePanel);

        return response()->noContent();
    }
}
