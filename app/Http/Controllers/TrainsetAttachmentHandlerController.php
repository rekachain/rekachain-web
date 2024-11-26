<?php

namespace App\Http\Controllers;

use App\Http\Requests\TrainsetAttachmentHandler\StoreTrainsetAttachmentHandlerRequest;
use App\Http\Requests\TrainsetAttachmentHandler\UpdateTrainsetAttachmentHandlerRequest;
use App\Http\Resources\TrainsetAttachmentHandlerResource;
use App\Models\TrainsetAttachmentHandler;
use App\Support\Interfaces\Services\TrainsetAttachmentHandlerServiceInterface;
use Illuminate\Http\Request;

class TrainsetAttachmentHandlerController extends Controller {
    public function __construct(protected TrainsetAttachmentHandlerServiceInterface $trainsetAttachmentHandlerService) {}

    public function index(Request $request) {
        $perPage = $request->get('perPage', 10);
        $data = TrainsetAttachmentHandlerResource::collection($this->trainsetAttachmentHandlerService->getAllPaginated($request->query(), $perPage));

        if ($this->ajax()) {
            return $data;
        }

        return inertia('TrainsetAttachmentHandler/Index');
    }

    public function create() {
        return inertia('TrainsetAttachmentHandler/Create');
    }

    public function store(StoreTrainsetAttachmentHandlerRequest $request) {
        if ($this->ajax()) {
            return $this->trainsetAttachmentHandlerService->create($request->validated());
        }
    }

    public function show(TrainsetAttachmentHandler $trainsetAttachmentHandler) {
        $data = TrainsetAttachmentHandlerResource::make($trainsetAttachmentHandler);

        if ($this->ajax()) {
            return $data;
        }

        return inertia('TrainsetAttachmentHandler/Show', compact('data'));
    }

    public function edit(TrainsetAttachmentHandler $trainsetAttachmentHandler) {
        $data = TrainsetAttachmentHandlerResource::make($trainsetAttachmentHandler);

        return inertia('TrainsetAttachmentHandler/Edit', compact('data'));
    }

    public function update(UpdateTrainsetAttachmentHandlerRequest $request, TrainsetAttachmentHandler $trainsetAttachmentHandler) {
        if ($this->ajax()) {
            return $this->trainsetAttachmentHandlerService->update($trainsetAttachmentHandler, $request->validated());
        }
    }

    public function destroy(TrainsetAttachmentHandler $trainsetAttachmentHandler) {
        if ($this->ajax()) {
            return $this->trainsetAttachmentHandlerService->delete($trainsetAttachmentHandler);
        }
    }
}
