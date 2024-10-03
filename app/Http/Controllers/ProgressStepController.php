<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProgressStep\StoreProgressStepRequest;
use App\Http\Requests\ProgressStep\UpdateProgressStepRequest;
use App\Http\Resources\ProgressStepResource;
use App\Models\ProgressStep;
use App\Support\Interfaces\Services\ProgressStepServiceInterface;
use Illuminate\Http\Request;

class ProgressStepController extends Controller {
    public function __construct(protected ProgressStepServiceInterface $progressStepService) {}

    public function index(Request $request) {
        $perPage = $request->get('perPage', 10);
        $data = ProgressStepResource::collection($this->progressStepService->getAllPaginated($request->query(), $perPage));

        if ($this->ajax()) {
            return $data;
        }

        return inertia('ProgressStep/Index');
    }

    public function create() {
        return inertia('ProgressStep/Create');
    }

    public function store(StoreProgressStepRequest $request) {
        if ($this->ajax()) {
            return $this->progressStepService->create($request->validated());
        }
    }

    public function show(ProgressStep $progress_step) {
        $data = ProgressStepResource::make($progress_step);

        if ($this->ajax()) {
            return $data;
        }

        return inertia('ProgressStep/Show', compact('data'));
    }

    public function edit(ProgressStep $progress_step) {
        $data = ProgressStepResource::make($progress_step);

        return inertia('ProgressStep/Edit', compact('data'));
    }

    public function update(UpdateProgressStepRequest $request, ProgressStep $progress_step) {
        if ($this->ajax()) {
            return $this->progressStepService->update($progress_step, $request->validated());
        }
    }

    public function destroy(ProgressStep $progress_step) {
        if ($this->ajax()) {
            return $this->progressStepService->delete($progress_step);
        }
    }
}
