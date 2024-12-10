<?php

namespace App\Http\Controllers;

use App\Helpers\PermissionHelper;
use App\Http\Requests\Feedback\StoreFeedbackRequest;
use App\Http\Requests\Feedback\UpdateFeedbackRequest;
use App\Http\Resources\FeedbackResource;
use App\Models\Feedback;
use App\Support\Enums\PermissionEnum;
use App\Support\Interfaces\Services\FeedbackServiceInterface;
use Illuminate\Http\Request;

class FeedbackController extends Controller {
    public function __construct(protected FeedbackServiceInterface $feedbackService) {}

    public function index(Request $request) {
        PermissionHelper::check(PermissionEnum::FEEDBACK_READ);

        $perPage = $request->get('perPage', 10);
        $data = FeedbackResource::collection($this->feedbackService->getAllPaginated($request->query(), $perPage));

        if ($this->ajax()) {
            return $data;
        }

        return inertia('Feedback/Index');
    }

    public function create() {
        PermissionHelper::check(PermissionEnum::FEEDBACK_CREATE);

        return inertia('Feedback/Create');
    }

    public function store(StoreFeedbackRequest $request) {
        if ($this->ajax()) {
            return $this->feedbackService->create($request->validated());
        }
    }

    public function show(Feedback $feedback) {
        PermissionHelper::check(PermissionEnum::FEEDBACK_READ);
        $data = FeedbackResource::make($feedback);

        if ($this->ajax()) {
            return $data;
        }

        return inertia('Feedback/Show', compact('data'));
    }

    public function edit(Feedback $feedback) {
        PermissionHelper::check(PermissionEnum::FEEDBACK_UPDATE);
        $data = FeedbackResource::make($feedback);

        return inertia('Feedback/Edit', compact('data'));
    }

    public function update(UpdateFeedbackRequest $request, Feedback $feedback) {
        PermissionHelper::check(PermissionEnum::FEEDBACK_UPDATE);
        if ($this->ajax()) {
            return $this->feedbackService->update($feedback, $request->validated());
        }
    }

    public function destroy(Feedback $feedback) {
        PermissionHelper::check(PermissionEnum::FEEDBACK_DELETE);
        if ($this->ajax()) {
            return $this->feedbackService->delete($feedback);
        }
    }
}
