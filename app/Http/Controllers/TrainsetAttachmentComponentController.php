<?php

namespace App\Http\Controllers;

use App\Http\Requests\TrainsetAttachmentComponent\StoreTrainsetAttachmentComponentRequest;
use App\Http\Requests\TrainsetAttachmentComponent\UpdateTrainsetAttachmentComponentRequest;
use App\Http\Resources\TrainsetAttachmentComponentResource;
use App\Models\TrainsetAttachmentComponent;
use App\Support\Interfaces\Services\TrainsetAttachmentComponentServiceInterface;
use Illuminate\Http\Request;

class TrainsetAttachmentComponentController extends Controller {
    public function __construct(protected TrainsetAttachmentComponentServiceInterface $trainsetAttachmentComponentService) {}

    public function index(Request $request) {
        $perPage = $request->get('perPage', 10);
        $data = TrainsetAttachmentComponentResource::collection($this->trainsetAttachmentComponentService->getAllPaginated($request->query(), $perPage));

        if ($this->ajax()) {
            return $data;
        }

        return inertia('TrainsetAttachmentComponent/Index');
    }

    public function create() {
        return inertia('TrainsetAttachmentComponent/Create');
    }

    public function store(StoreTrainsetAttachmentComponentRequest $request) {
        if ($this->ajax()) {
            return $this->trainsetAttachmentComponentService->create($request->validated());
        }
    }

    public function show(TrainsetAttachmentComponent $trainsetAttachmentComponent) {
        $data = TrainsetAttachmentComponentResource::make($trainsetAttachmentComponent);

        if ($this->ajax()) {
            return $data;
        }

        return inertia('TrainsetAttachmentComponent/Show', compact('data'));
    }

    public function edit(TrainsetAttachmentComponent $trainsetAttachmentComponent) {
        $data = TrainsetAttachmentComponentResource::make($trainsetAttachmentComponent);

        return inertia('TrainsetAttachmentComponent/Edit', compact('data'));
    }

    public function update(UpdateTrainsetAttachmentComponentRequest $request, TrainsetAttachmentComponent $trainsetAttachmentComponent) {
        if ($this->ajax()) {
            return $this->trainsetAttachmentComponentService->update($trainsetAttachmentComponent, $request->validated());
        }
    }

    public function destroy(TrainsetAttachmentComponent $trainsetAttachmentComponent) {
        if ($this->ajax()) {
            return $this->trainsetAttachmentComponentService->delete($trainsetAttachmentComponent);
        }
    }
}