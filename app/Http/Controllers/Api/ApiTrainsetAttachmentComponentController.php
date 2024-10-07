<?php

namespace App\Http\Controllers\Api;

use App\Http\Requests\TrainsetAttachmentComponent\StoreTrainsetAttachmentComponentRequest;
use App\Http\Requests\TrainsetAttachmentComponent\UpdateTrainsetAttachmentComponentRequest;
use App\Http\Resources\TrainsetAttachmentComponentResource;
use App\Models\TrainsetAttachmentComponent;
use App\Support\Interfaces\Services\TrainsetAttachmentComponentServiceInterface;
use Illuminate\Http\Request;

class ApiTrainsetAttachmentComponentController extends ApiController {
    public function __construct(
        protected TrainsetAttachmentComponentServiceInterface $trainsetAttachmentComponentService
    ) {}

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request) {
        $perPage = request()->get('perPage', 5);

        return TrainsetAttachmentComponentResource::collection($this->trainsetAttachmentComponentService->getAllPaginated($request->query(), $perPage));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTrainsetAttachmentComponentRequest $request) {
        return $this->trainsetAttachmentComponentService->create($request->validated());
    }

    /**
     * Display the specified resource.
     */
    public function show(TrainsetAttachmentComponent $trainsetAttachmentComponent) {
        return new TrainsetAttachmentComponentResource($trainsetAttachmentComponent->load(['roles' => ['division', 'permissions']]));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTrainsetAttachmentComponentRequest $request, TrainsetAttachmentComponent $trainsetAttachmentComponent) {
        return $this->trainsetAttachmentComponentService->update($trainsetAttachmentComponent, $request->validated());
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, TrainsetAttachmentComponent $trainsetAttachmentComponent) {
        return $this->trainsetAttachmentComponentService->delete($trainsetAttachmentComponent);
    }
}