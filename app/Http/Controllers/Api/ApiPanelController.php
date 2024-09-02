<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Panel\StorePanelRequest;
use App\Http\Requests\Panel\UpdatePanelRequest;
use App\Http\Resources\PanelResource;
use App\Models\Panel;
use App\Support\Enums\IntentEnum;
use App\Support\Interfaces\Services\PanelServiceInterface;
use Illuminate\Http\Request;

// use App\Support\Enums\PermissionEnum;

class ApiPanelController extends Controller {
    public function __construct(
        protected PanelServiceInterface $panelService
    ) {}

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request) {
        $perPage = request()->get('perPage', 15);

        return PanelResource::collection(
            $this->panelService->getAllPaginated(request()->query(), $perPage)
        )->additional(['message' => 'Success']);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePanelRequest $request) {
        $intent = $request->get('intent');

        switch ($intent) {
            case IntentEnum::API_PANEL_IMPORT_PANEL->value:
                $this->panelService->importData($request->file('import_file'));

                return response()->noContent();
        }

        return $this->panelService->create($request->validated());
    }

    /**
     * Display the specified resource.
     */
    public function show(Panel $panel) {
        return new PanelResource($panel);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePanelRequest $request, Panel $panel) {
        return $this->panelService->update($panel, $request->validated());
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Panel $panel) {
        //
    }
}
