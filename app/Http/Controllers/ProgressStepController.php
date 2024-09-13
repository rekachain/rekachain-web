<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProgressStep\StoreProgressStepRequest;
use App\Http\Requests\ProgressStep\UpdateProgressStepRequest;
use App\Http\Resources\ProgressStepResource;
use App\Models\ProgressStep;
use App\Support\Interfaces\Services\ProgressStepServiceInterface;
use Illuminate\Http\Request;

class ProgressStepController extends Controller {
    public function __construct(protected ProgressStepServiceInterface $progressstepService) {}

    public function index(Request $request) {
        $perPage = $request->get('perPage', 10);
        $data = ProgressStepResource::collection($this->progressstepService->getAllPaginated($request->query(), $perPage));

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
            return $this->progressstepService->create($request->validated());
        }
    }

    public function show(ProgressStep $progressstep) {
        $data = ProgressStepResource::make($progressstep);

        if ($this->ajax()) {
            return $data;
        }

        return inertia('ProgressStep/Show', compact('data'));
    }

    public function edit(ProgressStep $progressstep) {
        $data = ProgressStepResource::make($progressstep);

        return inertia('ProgressStep/Edit', compact('data'));
    }

    public function update(UpdateProgressStepRequest $request, ProgressStep $progressstep) {
        if ($this->ajax()) {
            return $this->progressstepService->update($progressstep, $request->validated());
        }
    }

    public function destroy(ProgressStep $progressstep) {
        if ($this->ajax()) {
            return $this->progressstepService->delete($progressstep);
        }
    }
}
