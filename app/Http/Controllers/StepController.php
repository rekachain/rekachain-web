<?php

namespace App\Http\Controllers;

use App\Http\Requests\Step\StoreStepRequest;
use App\Http\Requests\Step\UpdateStepRequest;
use App\Http\Resources\StepResource;
use App\Models\Step;
use App\Support\Enums\IntentEnum;
use App\Support\Interfaces\Services\StepServiceInterface;
use Illuminate\Http\Request;

class StepController extends Controller {
    public function __construct(protected StepServiceInterface $stepService) {}

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request) {
        $intent = $request->get('intent');
        $perPage = request()->get('perPage', 5);

        switch ($intent) {
            case IntentEnum::WEB_STEP_GET_TEMPLATE_IMPORT_STEP->value:
                return $this->stepService->getImportDataTemplate();
        }

        $steps = StepResource::collection($this->stepService->getAllPaginated($request->query(), $perPage));

        if ($this->ajax()) {
            return $steps;
        }

        return inertia('Step/Index');
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create() {
        return inertia('Step/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreStepRequest $request) {
        if ($this->ajax()) {
            $intent = $request->get('intent');

            switch ($intent) {
                case IntentEnum::WEB_STEP_IMPORT_STEP->value:
                    $this->stepService->importData($request->file('import_file'));

                    return response()->noContent();
            }

            return $this->stepService->create($request->validated());
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Step $step) {
        // $step = new StepResource($step->load(['progress', 'user']));

        if ($this->ajax()) {
            return new StepResource($step);
        }

        return inertia('Step/Show', ['step' => $step]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Request $request, Step $step) {
        // $step = StepResource::make($step->load(['progress', 'user']));
        $step = StepResource::make($step);

        if ($this->ajax()) {
            return $step;
        }

        return inertia('Step/Edit', ['step' => $step]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateStepRequest $request, Step $step) {
        if ($this->ajax()) {
            return $this->stepService->update($step, $request->validated());
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Step $step) {
        if ($this->ajax()) {
            return $this->stepService->delete($step);
        }
    }
}
