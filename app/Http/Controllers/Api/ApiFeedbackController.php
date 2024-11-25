<?php

namespace App\Http\Controllers\Api;

use App\Http\Requests\Feedback\StoreFeedbackRequest;
use App\Http\Requests\Feedback\UpdateFeedbackRequest;
use App\Http\Resources\FeedbackResource;
use App\Models\Feedback;
use App\Support\Interfaces\Services\FeedbackServiceInterface;
use Illuminate\Http\Request;

class ApiFeedbackController extends ApiController {
    public function __construct(
        protected FeedbackServiceInterface $feedbackService
    ) {}

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request) {
        $perPage = request()->get('perPage', 5);

        return FeedbackResource::collection($this->feedbackService->getAllPaginated($request->query(), $perPage));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreFeedbackRequest $request) {
        return $this->feedbackService->create($request->validated());
    }

    /**
     * Display the specified resource.
     */
    public function show(Feedback $feedback) {
        return new FeedbackResource($feedback->load(['roles' => ['division', 'permissions']]));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateFeedbackRequest $request, Feedback $feedback) {
        return $this->feedbackService->update($feedback, $request->validated());
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, Feedback $feedback) {
        return $this->feedbackService->delete($feedback);
    }
}
