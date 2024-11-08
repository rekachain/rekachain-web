<?php

namespace App\Http\Controllers;

use App\Http\Requests\Trainset\StoreTrainsetRequest;
use App\Http\Requests\Trainset\UpdateTrainsetRequest;
use App\Http\Resources\PanelResource;
use App\Http\Resources\TrainsetResource;
use App\Models\Trainset;
use App\Support\Enums\IntentEnum;
use App\Support\Interfaces\Services\TrainsetServiceInterface;
use Illuminate\Http\Request;
use Psr\Container\ContainerExceptionInterface;
use Psr\Container\NotFoundExceptionInterface;

class TrainsetController extends Controller {
    public function __construct(protected TrainsetServiceInterface $trainsetService) {}

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request) {
        if ($this->ajax()) {
            $intent = $request->get('intent');

            switch ($intent) {
                case IntentEnum::WEB_TRAINSET_GET_TEMPLATE_IMPORT_TRAINSET->value:
                    return $this->trainsetService->getImportDataTemplate();
            }

            try {
                $perPage = request()->get('perPage', 5);

                return TrainsetResource::collection($this->trainsetService->getAllPaginated($request->query(), $perPage));
            } catch (NotFoundExceptionInterface|ContainerExceptionInterface $e) {
            }
        }

        return inertia('Trainset/Index');
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create() {
        return inertia('Project/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTrainsetRequest $request) {
        if ($this->ajax()) {
            $intent = $request->get('intent');

            switch ($intent) {
                case IntentEnum::WEB_TRAINSET_IMPORT_TRAINSET->value:
                    $this->trainsetService->importData($request->file('import_file'));

                    return response()->noContent();
            }

            return $this->trainsetService->create($request->validated());
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request, Trainset $trainset) {
        if ($this->ajax()) {
            $intent = $request->get('intent');

            switch ($intent) {
                case IntentEnum::WEB_TRAINSET_GET_ALL_COMPONENTS->value:
                    return TrainsetResource::make($trainset);
                case IntentEnum::WEB_TRAINSET_GET_ALL_COMPONENTS_WITH_QTY->value:
                    return TrainsetResource::make($trainset);
                case IntentEnum::WEB_TRAINSET_GET_COMPONENT_MATERIALS_WITH_QTY->value:
                    return TrainsetResource::make($trainset);
                case IntentEnum::WEB_TRAINSET_GET_ALL_PANELS->value:
                    return PanelResource::collection($trainset->panels()->distinct()->get());
                case IntentEnum::WEB_TRAINSET_GET_ALL_PANELS_WITH_QTY->value:
                    return TrainsetResource::make($trainset);
                case IntentEnum::WEB_TRAINSET_GET_PANEL_MATERIALS_WITH_QTY->value:
                    return TrainsetResource::make($trainset);
                case IntentEnum::WEB_TRAINSET_EXPORT_SERIAL_NUMBERS->value:
                    return $this->trainsetService->exportSerialNumbers($trainset);
            }

            return new TrainsetResource($trainset->load(['carriages', 'trainset_attachments', 'panel_attachments']));
        }
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Trainset $trainset) {
        return inertia('Trainset/Edit', ['trainset' => new TrainsetResource($trainset)]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTrainsetRequest $request, Trainset $trainset) {
        $intent = $request->get('intent');

        switch ($intent) {
            case IntentEnum::WEB_PROJECT_CHANGE_TRAINSET_PRESET->value:
                return $this->trainsetService->updatePreset($trainset, $request->validated());

            case IntentEnum::WEB_PROJECT_SAVE_TRAINSET_PRESET->value:
                return $this->trainsetService->savePreset($trainset, $request->validated());

            case IntentEnum::WEB_TRAINSET_DELETE_CARRIAGE_TRAINSET->value:
                return $this->trainsetService->deleteCarriageTrainset($trainset, $request->validated());

            case IntentEnum::WEB_TRAINSET_ADD_CARRIAGE_TRAINSET->value:
                return $this->trainsetService->addCarriageTrainset($trainset, $request->validated());

            case IntentEnum::WEB_TRAINSET_UPDATE_CARRIAGE_TRAINSET->value:
                return $this->trainsetService->updateCarriageTrainset($trainset, $request->validated());

            case IntentEnum::WEB_TRAINSET_GENERATE_PANEL_ATTACHMENTS->value:
                $result = $this->trainsetService->generatePanelAttachment($trainset, $request->validated());

                return is_array($result) ? response($result, $result['code']) : $result;

            case IntentEnum::WEB_TRAINSET_GENERATE_TRAINSET_ATTACHMENTS->value:
                $result = $this->trainsetService->generateTrainsetAttachment($trainset, $request->validated());

                return is_array($result) ? response($result, $result['code']) : $result;
        }

        //        if ($intent === IntentEnum::WEB_PROJECT_CHANGE_TRAINSET_PRESET->value) {
        //            return $this->trainsetService->updatePreset($trainset, $request->validated());
        //        }
        if ($this->ajax()) {
            return $this->trainsetService->update($trainset, $request->validated());
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, Trainset $trainset) {
        if ($this->ajax()) {
            return $this->trainsetService->delete($trainset);
        }
    }
}
