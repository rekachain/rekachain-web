<?php

namespace App\Http\Controllers;

use App\Http\Requests\CarriagePanelComponent\StoreCarriagePanelComponentRequest;
use App\Http\Requests\CarriagePanelComponent\UpdateCarriagePanelComponentRequest;
use App\Http\Resources\CarriagePanelComponentResource;
use App\Models\CarriagePanelComponent;
use App\Support\Enums\IntentEnum;
use App\Support\Interfaces\Services\CarriagePanelComponentServiceInterface;
use Illuminate\Http\Request;

class CarriagePanelComponentController extends Controller {
    public function __construct(
        private CarriagePanelComponentServiceInterface $carriagePanelComponentService
    ) {}

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request) {
        $perPage = request()->get('perPage', 5);

        $carriagePanelComponents = CarriagePanelComponentResource::collection($this->carriagePanelComponentService->getAllPaginated($request->query(), $perPage));

        if ($this->ajax()) {
            return $carriagePanelComponents;
        }

        return inertia('CarriagePanelComponent/Index');
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create() {
        return inertia('Panel/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCarriagePanelComponentRequest $request) {
        $this->carriagePanelComponentService->create($request->validated());
    }

    /**
     * Display the specified resource.
     */
    public function show(CarriagePanelComponent $carriagePanelComponent) {
        if ($this->ajax()) {
            return new CarriagePanelComponentResource($carriagePanelComponent);
        }

        return inertia('CarriagePanelComponent/Show', [
            'carriagePanelComponent' => new CarriagePanelComponentResource($carriagePanelComponent),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(CarriagePanelComponent $carriagePanelComponent) {
        return inertia('CarriagePanelComponent/Edit', [
            'carriagePanelComponent' => new CarriagePanelComponentResource($carriagePanelComponent),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCarriagePanelComponentRequest $request, CarriagePanelComponent $carriagePanelComponent) {
        if ($this->ajax()) {
            $intent = $request->get('intent');

            switch ($intent) {
                case IntentEnum::WEB_CARRIAGE_PANEL_COMPONENT_IMPORT_PROGRESS_AND_MATERIAL->value:
                    return $this->carriagePanelComponentService->importProgressMaterialData($request->file('file'), $carriagePanelComponent, $request->get('work_aspect_id'));
                case IntentEnum::WEB_CARRIAGE_PANEL_COMPONENT_ADD_RAW_MATERIAL->value:
                    return $this->carriagePanelComponentService->addRawMaterial($carriagePanelComponent, $request->validated());
                case IntentEnum::WEB_CARRIAGE_PANEL_COMPONENT_CHANGE_PROGRESS->value:
                    return $this->carriagePanelComponentService->changeProgress($carriagePanelComponent, $request->validated());
            }

            return $this->carriagePanelComponentService->update($carriagePanelComponent, $request->validated());
        }

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(CarriagePanelComponent $carriagePanelComponent) {
        $this->carriagePanelComponentService->delete($carriagePanelComponent);
    }
}
