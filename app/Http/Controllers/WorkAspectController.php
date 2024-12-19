<?php

namespace App\Http\Controllers;

use App\Http\Requests\WorkAspect\StoreWorkAspectRequest;
use App\Http\Requests\WorkAspect\UpdateWorkAspectRequest;
use App\Http\Resources\WorkAspectResource;
use App\Models\WorkAspect;
use App\Support\Interfaces\Services\WorkAspectServiceInterface;
use Illuminate\Http\Request;

class WorkAspectController extends Controller {
    public function __construct(protected WorkAspectServiceInterface $workAspectService) {}

    public function index(Request $request) {
        $perPage = $request->get('perPage', 10);
        $data = WorkAspectResource::collection($this->workAspectService->getAllPaginated($request->query(), $perPage));

        if ($this->ajax()) {
            return $data;
        }

        return inertia('WorkAspect/Index');
    }

    public function create() {
        return inertia('WorkAspect/Create');
    }

    public function store(StoreWorkAspectRequest $request) {
        if ($this->ajax()) {
            return $this->workAspectService->create($request->validated());
        }
    }

    public function show(WorkAspect $workAspect) {
        $data = WorkAspectResource::make($workAspect);

        if ($this->ajax()) {
            return $data;
        }

        return inertia('WorkAspect/Show', compact('data'));
    }

    public function edit(WorkAspect $workAspect) {
        $data = WorkAspectResource::make($workAspect);

        return inertia('WorkAspect/Edit', compact('data'));
    }

    public function update(UpdateWorkAspectRequest $request, WorkAspect $workAspect) {
        if ($this->ajax()) {
            return $this->workAspectService->update($workAspect, $request->validated());
        }
    }

    public function destroy(WorkAspect $workAspect) {
        if ($this->ajax()) {
            return $this->workAspectService->delete($workAspect);
        }
    }
}
