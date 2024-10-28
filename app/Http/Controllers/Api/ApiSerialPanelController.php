<?php

namespace App\Http\Controllers\Api;

use App\Models\SerialPanel;
use App\Support\Enums\PermissionEnum;
use Illuminate\Http\Request;
use App\Support\Enums\RoleEnum;
use App\Support\Enums\IntentEnum;
use App\Http\Controllers\Controller;
use App\Http\Resources\SerialPanelResource;
use App\Http\Resources\DetailWorkerPanelResource;
use App\Http\Requests\SerialPanel\StoreSerialPanelRequest;
use App\Http\Requests\SerialPanel\UpdateSerialPanelRequest;
use App\Support\Interfaces\Services\SerialPanelServiceInterface;

class ApiSerialPanelController extends Controller {
    public function __construct(
        protected SerialPanelServiceInterface $serialPanelService
    ) {}
    /**
     * Display a listing of the resource.
     */
    public function index() {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreSerialPanelRequest $request) {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(SerialPanel $serialPanel, Request $request) {
        $request->merge(['intent' => IntentEnum::API_PANEL_ATTACHMENT_GET_ATTACHMENT_SERIAL_NUMBER_DETAILS->value]);

        return new SerialPanelResource($serialPanel->load('detail_worker_panels.progress_step.progress'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateSerialPanelRequest $request, SerialPanel $serialPanel,) {
        $intent = request()->get('intent');

        switch ($intent) {
            case IntentEnum::API_SERIAL_PANEL_UPDATE_PANEL_MANUFACTURE_STATUS->value:
                if (!$request->user()->hasRole([RoleEnum::QC_ASSEMBLY, RoleEnum::SUPERVISOR_ASSEMBLY])) {
                    abort(403, __('exception.auth.role.role_exception', ['role' => RoleEnum::QC_ASSEMBLY->value . ' / ' . RoleEnum::SUPERVISOR_ASSEMBLY->value]));
                }
                return $this->serialPanelService->update($serialPanel, $request->validated());    
            case IntentEnum::API_SERIAL_PANEL_UPDATE_ASSIGN_WORKER_PANEL->value:
                return DetailWorkerPanelResource::make($this->serialPanelService->assignWorker($serialPanel, $request->validated()));
            default:
                // checkPermissions(PermissionEnum::SERIAL_PANEL_UPDATE);
                if (!$request->user()->hasRole([RoleEnum::QC_ASSEMBLY, RoleEnum::SUPERVISOR_ASSEMBLY])) {
                    abort(403, __('exception.auth.role.role_exception', ['role' => RoleEnum::QC_ASSEMBLY->value . ' / ' . RoleEnum::SUPERVISOR_ASSEMBLY->value]));
                }
                return $this->serialPanelService->update($serialPanel, $request->validated());
        }

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id) {
        //
    }
}
