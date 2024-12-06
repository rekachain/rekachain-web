<?php

namespace App\Repositories;

use App\Models\Feedback;
use App\Support\Interfaces\Repositories\FeedbackRepositoryInterface;

class FeedbackRepository extends BaseRepository implements FeedbackRepositoryInterface {
    protected function getModelClass(): string {
        return Feedback::class;
    }
}
