<?php

namespace App\Http\Controllers\Api;

use App\Http\Requests\TrainsetAttachment\StoreTrainsetAttachmentRequest;
use App\Http\Requests\TrainsetAttachment\UpdateTrainsetAttachmentRequest;
use App\Http\Resources\TrainsetAttachmentResource;
use App\Models\TrainsetAttachment;
use App\Support\Interfaces\Services\TrainsetAttachmentServiceInterface;
use Illuminate\Http\Request;

class ApiTrainsetAttachmentController extends ApiController {
    public function __construct(
        protected TrainsetAttachmentServiceInterface $trainsetAttachmentService
    ) {}

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request) {
        $perPage = request()->get('perPage', 5);

        return TrainsetAttachmentResource::collection($this->trainsetAttachmentService->getAllPaginated($request->query(), $perPage));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTrainsetAttachmentRequest $request) {
        return $this->trainsetAttachmentService->create($request->validated());
    }

    /**
     * Display the specified resource.
     */
    public function show(TrainsetAttachment $trainsetAttachment) {
        return new TrainsetAttachmentResource($trainsetAttachment->load(['roles' => ['division', 'permissions']]));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTrainsetAttachmentRequest $request, TrainsetAttachment $trainsetAttachment) {
        return $this->trainsetAttachmentService->update($trainsetAttachment, $request->validated());
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, TrainsetAttachment $trainsetAttachment) {
        return $this->trainsetAttachmentService->delete($trainsetAttachment);
    }
}