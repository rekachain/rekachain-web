<?php

namespace App\Http\Controllers;

use App\Http\Requests\Feedback\StoreFeedbackRequest;
use App\Http\Requests\Feedback\UpdateFeedbackRequest;
use App\Http\Resources\FeedbackResource;
use App\Models\Feedback;
use App\Support\Interfaces\Services\FeedbackServiceInterface;
use Illuminate\Http\Request;

class FeedbackController extends Controller {
    public function __construct(protected FeedbackServiceInterface $feedbackService) {}

    public function index(Request $request) {
        $perPage = $request->get('perPage', 10);
        $data = FeedbackResource::collection($this->feedbackService->getAllPaginated($request->query(), $perPage));

        if ($this->ajax()) {
            return $data;
        }

        return inertia('Feedback/Index');
    }

    public function create() {
        return inertia('Feedback/Create');
    }

    public function store(StoreFeedbackRequest $request) {
        if ($this->ajax()) {
            return $this->feedbackService->create($request->validated());
        }
    }

    public function show(Feedback $feedback) {
        $data = FeedbackResource::make($feedback);

        if ($this->ajax()) {
            return $data;
        }

        return inertia('Feedback/Show', compact('data'));
    }

    public function edit(Feedback $feedback) {
        $data = FeedbackResource::make($feedback);

        return inertia('Feedback/Edit', compact('data'));
    }

    public function update(UpdateFeedbackRequest $request, Feedback $feedback) {
        if ($this->ajax()) {
            return $this->feedbackService->update($feedback, $request->validated());
        }
    }

    public function destroy(Feedback $feedback) {
        if ($this->ajax()) {
            return $this->feedbackService->delete($feedback);
        }
    }
}
