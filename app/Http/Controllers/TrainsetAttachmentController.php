<?php

namespace App\Http\Controllers;

use App\Http\Requests\TrainsetAttachment\StoreTrainsetAttachmentRequest;
use App\Http\Requests\TrainsetAttachment\UpdateTrainsetAttachmentRequest;
use App\Http\Resources\TrainsetAttachmentResource;
use App\Models\TrainsetAttachment;
use App\Support\Interfaces\Services\TrainsetAttachmentServiceInterface;
use Illuminate\Http\Request;

class TrainsetAttachmentController extends Controller {
    public function __construct(protected TrainsetAttachmentServiceInterface $trainsetattachmentService) {}

    public function index(Request $request) {
        $perPage = $request->get('perPage', 10);
        $data = TrainsetAttachmentResource::collection($this->trainsetattachmentService->getAllPaginated($request->query(), $perPage));

        if ($this->ajax()) {
            return $data;
        }

        return inertia('TrainsetAttachment/Index');
    }

    public function create() {
        return inertia('TrainsetAttachment/Create');
    }

    public function store(StoreTrainsetAttachmentRequest $request) {
        if ($this->ajax()) {
            return $this->trainsetattachmentService->create($request->validated());
        }
    }

    public function show(TrainsetAttachment $trainsetattachment) {
        $data = TrainsetAttachmentResource::make($trainsetattachment);

        if ($this->ajax()) {
            return $data;
        }

        return inertia('TrainsetAttachment/Show', compact('data'));
    }

    public function edit(TrainsetAttachment $trainsetattachment) {
        $data = TrainsetAttachmentResource::make($trainsetattachment);

        return inertia('TrainsetAttachment/Edit', compact('data'));
    }

    public function update(UpdateTrainsetAttachmentRequest $request, TrainsetAttachment $trainsetattachment) {
        if ($this->ajax()) {
            return $this->trainsetattachmentService->update($trainsetattachment, $request->validated());
        }
    }

    public function destroy(TrainsetAttachment $trainsetattachment) {
        if ($this->ajax()) {
            return $this->trainsetattachmentService->delete($trainsetattachment);
        }
    }
}
