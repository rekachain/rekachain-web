<?php

namespace App\Http\Controllers;

use App\Helpers\PermissionHelper;
use App\Http\Requests\Panel\StorePanelRequest;
use App\Http\Requests\Panel\UpdatePanelRequest;
use App\Http\Resources\PanelResource;
use App\Models\Panel;
use App\Support\Enums\IntentEnum;
use App\Support\Enums\PermissionEnum;
use App\Support\Interfaces\Services\PanelServiceInterface;
use Illuminate\Http\Request;
use Psr\Container\ContainerExceptionInterface;
use Psr\Container\NotFoundExceptionInterface;

class PanelController extends Controller {
    public function __construct(protected PanelServiceInterface $panelService) {}

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request) {
        PermissionHelper::check(PermissionEnum::PANEL_READ);
        if ($this->ajax()) {
            $intent = $request->get('intent');

            switch ($intent) {
                case IntentEnum::WEB_PANEL_GET_TEMPLATE_IMPORT_PANEL->value:
                    PermissionHelper::check(PermissionEnum::PANEL_IMPORT);

                    return $this->panelService->getImportDataTemplate();
            }
            try {
                $perPage = request()->get('perPage', 5);

                return PanelResource::collection($this->panelService->getAllPaginated($request->query(), $perPage));
            } catch (NotFoundExceptionInterface|ContainerExceptionInterface $e) {
            }
        }

        return inertia('Panel/Index');
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create() {
        PermissionHelper::check(PermissionEnum::PANEL_READ);

        return inertia('Panel/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePanelRequest $request) {
        PermissionHelper::check(PermissionEnum::PANEL_CREATE);
        if ($this->ajax()) {
            $intent = $request->get('intent');

            switch ($intent) {
                case IntentEnum::WEB_PANEL_IMPORT_PANEL->value:
                    PermissionHelper::check(PermissionEnum::PANEL_IMPORT);
                    $this->panelService->importData($request->file('import_file'));

                    return response()->noContent();
            }

            return $this->panelService->create($request->validated());
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request, Panel $panel) {
        PermissionHelper::check(PermissionEnum::PANEL_READ);
        $intent = $request->get('intent');
        if ($this->ajax()) {
            switch ($intent) {
                case IntentEnum::WEB_PANEL_GET_PANEL_MATERIAL_AND_PROGRESS_TEMPLATE->value:
                    PermissionHelper::check(PermissionEnum::PANEL_IMPORT);

                    return $this->panelService->getImportDataRawMaterialAndProgressTemplate($panel);
            }

            return new PanelResource($panel->load('progress'));
        }
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Panel $panel) {
        PermissionHelper::check(PermissionEnum::PANEL_IMPORT);

        return inertia('Panel/Edit', ['panel' => new PanelResource($panel->load('progress'))]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePanelRequest $request, Panel $panel) {
        PermissionHelper::check(PermissionEnum::PANEL_DELETE);
        if ($this->ajax()) {
            return $this->panelService->update($panel, $request->validated());
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, Panel $panel) {
        if ($this->ajax()) {
            return $this->panelService->delete($panel);
        }
    }
}
