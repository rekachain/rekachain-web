<?php

namespace App\Http\Controllers;

use App\Http\Requests\TrainsetAttachment\StoreTrainsetAttachmentRequest;
use App\Http\Requests\TrainsetAttachment\UpdateTrainsetAttachmentRequest;
use App\Http\Resources\RawMaterialResource;
use App\Http\Resources\TrainsetAttachmentResource;
use App\Models\TrainsetAttachment;
use App\Support\Enums\IntentEnum;
use App\Support\Interfaces\Services\TrainsetAttachmentServiceInterface;
use Illuminate\Http\Request;

class TrainsetAttachmentController extends Controller {
    public function __construct(protected TrainsetAttachmentServiceInterface $trainsetAttachmentService) {}

    public function index(Request $request) {
        $perPage = $request->get('perPage', 10);
        $data = TrainsetAttachmentResource::collection($this->trainsetAttachmentService->getAllPaginated($request->query(), $perPage));

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
            return $this->trainsetAttachmentService->create($request->validated());
        }
    }

    public function show(Request $request, TrainsetAttachment $trainsetAttachment) {
        $intent = $request->get('intent');

        switch ($intent) {
            case IntentEnum::WEB_TRAINSET_ATTACHMENT_GET_ATTACHMENT_PROGRESS->value:
                return TrainsetAttachmentResource::make($trainsetAttachment);
            case IntentEnum::WEB_TRAINSET_ATTACHMENT_GET_COMPONENT_MATERIALS->value:
                return RawMaterialResource::collection($trainsetAttachment->raw_materials);
            case IntentEnum::WEB_TRAINSET_ATTACHMENT_GET_COMPONENT_MATERIALS_WITH_QTY->value:
                return TrainsetAttachmentResource::make($trainsetAttachment);
            case IntentEnum::WEB_TRAINSET_ATTACHMENT_DOWNLOAD_TRAINSET_ATTACHMENT->value:
                $trainsetAttachment = TrainsetAttachmentResource::make($trainsetAttachment->load('raw_materials'));

                return inertia('TrainsetAttachment/DocumentTrainsetAttachment', compact('trainsetAttachment'));
        }
        $data = TrainsetAttachmentResource::make($trainsetAttachment);

        if ($this->ajax()) {
            return $data;
        }

        return inertia('TrainsetAttachment/Show', compact('data'));
    }

    public function edit(TrainsetAttachment $trainsetAttachment) {
        $data = TrainsetAttachmentResource::make($trainsetAttachment);

        return inertia('TrainsetAttachment/Edit', compact('data'));
    }

    public function update(UpdateTrainsetAttachmentRequest $request, TrainsetAttachment $trainsetAttachment) {
        $intent = $request->get('intent');

        switch ($intent) {
            case IntentEnum::WEB_TRAINSET_ATTACHMENT_ASSIGN_CUSTOM_ATTACHMENT_MATERIAL->value:
                return $this->trainsetAttachmentService->assignCustomAttachmentMaterial($trainsetAttachment, $request->validated());
        }
        if ($this->ajax()) {
            return $this->trainsetAttachmentService->update($trainsetAttachment, $request->validated());
        }
    }

    public function destroy(TrainsetAttachment $trainsetAttachment) {
        if ($this->ajax()) {
            return $this->trainsetAttachmentService->delete($trainsetAttachment);
        }
    }
}
